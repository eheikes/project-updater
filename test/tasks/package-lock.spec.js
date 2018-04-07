const proxyquire = require('proxyquire')
const { addFixtures, getTaskOpts } = require('../helpers/fixture')

describe('package-lock.json', () => {
  let execaStub
  let opts
  let task

  beforeEach(() => {
    execaStub = jasmine.createSpy('execa').and.returnValue(Promise.resolve())
    task = proxyquire('../../tasks/package-lock', {
      execa: execaStub
    })
    opts = getTaskOpts()
  })

  describe('skip test', () => {
    it('should be truthy if a package.json does not exist', () => {
      expect(task.skip(opts)).toBeTruthy()
    })

    it('should be falsy if a package.json does exist', () => {
      addFixtures(opts.cwd, 'package.json')
      expect(task.skip(opts)).toBeFalsy()
    })

    it('should be truthy if the task is disabled', () => {
      addFixtures(opts.cwd, 'package.json')
      opts.tasks = { 'package-lock': false }
      expect(task.skip(opts)).toBeTruthy()
    })
  })

  describe('action', () => {
    it('should create a package-lock.json', () => {
      return task.task(opts).then(() => {
        expect(execaStub).toHaveBeenCalledWith('npm', [
          'install',
          '--package-lock-only'
        ], { cwd: opts.cwd })
      })
    })
  })
})
