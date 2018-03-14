const proxyquire = require('proxyquire')
const { addFixtures, getTaskOpts } = require('../helpers/fixture')

describe('yarn.lock task', () => {
  let checksStub
  let execaStub
  let opts
  let task

  beforeEach(() => {
    execaStub = jasmine.createSpy('execa')
    checksStub = jasmine.createSpyObj('checks', ['isNpmPackage', 'isYarnInstalled'])
    checksStub.isNpmPackage.and.returnValue(true)
    checksStub.isYarnInstalled.and.returnValue(true)
    task = proxyquire('../../tasks/yarn-lock', {
      '../lib/checks': checksStub,
      execa: execaStub
    })
    opts = getTaskOpts()
    addFixtures(opts.cwd, 'package.json')
  })

  describe('skip test', () => {
    it('should be truthy if Yarn is not installed', () => {
      checksStub.isYarnInstalled.and.returnValue(false)
      expect(task.skip(opts)).toBeTruthy()
    })

    it('should be truthy if a package.json does not exist', () => {
      checksStub.isNpmPackage.and.returnValue(false)
      expect(task.skip(opts)).toBeTruthy()
    })

    it('should be falsy otherwise', () => {
      expect(task.skip(opts)).toBeFalsy()
    })
  })

  describe('action', () => {
    beforeEach(() => {
      return task.task(opts)
    })

    it('should run `yarn install`', () => {
      const args = execaStub.calls.mostRecent().args
      expect(args[0]).toBe('yarn')
      expect(args[1]).toContain('install')
      expect(args[2]).toEqual({ cwd: opts.cwd })
    })

    it('should run in non-interactive mode', () => {
      expect(execaStub.calls.mostRecent().args[1]).toContain('--non-interactive')
    })

    it('should not run any npm scripts', () => {
      expect(execaStub.calls.mostRecent().args[1]).toContain('--ignore-scripts')
    })
  })
})
