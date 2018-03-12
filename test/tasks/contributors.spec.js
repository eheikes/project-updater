const path = require('path')
const proxyquire = require('proxyquire')
const { addFixtures, getFileContents, getTaskOpts } = require('../helpers/fixture')

describe('contributors task', () => {
  const contributors = [
    '    37 Jane Doe <jdoe@example.com>',
    '    13 John Doe <jqdoe@example.com>',
    '     8 Robert Roe <rroe@example.com>'
  ].join('\n')

  let createTask
  let execaStub
  let opts
  let task

  beforeEach(() => {
    execaStub = jasmine.createSpy('execa').and.returnValue(Promise.resolve({ stdout: contributors }))
    createTask = proxyquire('../../tasks/contributors', {
      execa: execaStub
    })
    opts = getTaskOpts()
    task = createTask(opts)
  })

  describe('skip test', () => {
    it('should be falsy if a package.json exists', () => {
      addFixtures(opts.cwd, 'package.json')
      expect(task.skip()).toBeFalsy()
    })

    it('should be truthy if a package.json does NOT exist', () => {
      expect(task.skip()).toBeTruthy()
    })
  })

  describe('action', () => {
    beforeEach(() => {
      addFixtures(opts.cwd, 'package.json')
      return task.task()
    })

    it('should retrieve the contributors using git', () => {
      expect(execaStub).toHaveBeenCalledWith(
        'git',
        jasmine.any(Array),
        { cwd: opts.cwd }
      )
    })

    it('should update the package.json contributors with the git contributors list', () => {
      const pkg = JSON.parse(getFileContents(path.join(opts.cwd, 'package.json')))
      expect(pkg.contributors).toEqual([
        'Jane Doe <jdoe@example.com>',
        'John Doe <jqdoe@example.com>',
        'Robert Roe <rroe@example.com>'
      ])
    })
  })
})
