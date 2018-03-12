const proxyquire = require('proxyquire')
const { addFixtures, getTaskOpts } = require('../helpers/fixture')

describe('package.json dependencies task', () => {
  const expectedDevDependencies = [
    'jasmine',
    'jasmine-spec-reporter',
    'nyc',
    'standard'
  ]

  let createTask
  let execaStub
  let checksStub
  let opts
  let task

  beforeEach(() => {
    execaStub = jasmine.createSpy('execa')
    checksStub = jasmine.createSpyObj('checks', ['isNpmPackage', 'isYarnInstalled'])
    checksStub.isNpmPackage.and.returnValue(true)
    checksStub.isYarnInstalled.and.returnValue(true)
    createTask = proxyquire('../../tasks/package-deps', {
      '../lib/checks': checksStub,
      execa: execaStub
    })
    opts = getTaskOpts()
    task = createTask(opts)
    addFixtures(opts.cwd, 'package.json')
  })

  describe('skip test', () => {
    it('should be truthy if Yarn is not installed', () => {
      checksStub.isYarnInstalled.and.returnValue(false)
      expect(task.skip()).toBeTruthy()
    })

    it('should be truthy if a package.json does not exist', () => {
      checksStub.isNpmPackage.and.returnValue(false)
      expect(task.skip()).toBeTruthy()
    })

    it('should be falsy otherwise', () => {
      expect(task.skip()).toBeFalsy()
    })
  })

  describe('action', () => {
    beforeEach(() => {
      return task.task()
    })

    it('should add the dev dependencies to the working directory', () => {
      expect(execaStub).toHaveBeenCalledWith('yarn', [
        'add',
        ...expectedDevDependencies,
        '--dev'
      ], { cwd: opts.cwd })
    })
  })
})
