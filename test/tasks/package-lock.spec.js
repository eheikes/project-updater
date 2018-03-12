const proxyquire = require('proxyquire')
const { addFixtures, getTaskOpts } = require('../helpers/fixture')

describe('package-lock.json', () => {
  let createTask
  let execaStub
  let opts
  let task

  beforeEach(() => {
    execaStub = jasmine.createSpy('execa').and.returnValue(Promise.resolve())
    createTask = proxyquire('../../tasks/package-lock', {
      execa: execaStub
    })
    opts = getTaskOpts()
    task = createTask(opts)
  })

  describe('skip test', () => {
    it('should be truthy if a package.json does not exist', () => {
      expect(task.skip()).toBeTruthy()
    })

    it('should be falsy if a package.json does exist', () => {
      addFixtures(opts.cwd, 'package.json')
      expect(task.skip()).toBeFalsy()
    })
  })

  describe('action', () => {
    it('should create a package-lock.json', () => {
      return task.task().then(() => {
        expect(execaStub).toHaveBeenCalledWith('npm', [
          'install',
          '--package-lock-only'
        ], { cwd: opts.cwd })
      })
    })
  })
})
