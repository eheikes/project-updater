const path = require('path')
const proxyquire = require('proxyquire')
const { addFixtures, getFileContents, getTaskOpts, setJsonContents } = require('../helpers/fixture')

describe('package.json subproperties', () => {
  const gitConfig = {
    github: {
      user: 'jdoe'
    },
    user: {
      name: 'Jane Doe',
      email: 'jdoe@example.com'
    }
  }

  let createTask
  let gitStub
  let opts
  let task

  beforeEach(() => {
    gitStub = jasmine.createSpyObj('git lib', ['getGitConfig'])
    gitStub.getGitConfig.and.returnValue(Promise.resolve(gitConfig))
    createTask = proxyquire('../../tasks/package-subprops', {
      '../lib/git': gitStub
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
    let pkg

    beforeEach(() => {
      addFixtures(opts.cwd, 'package.json')
    })

    it('should add missing properties', () => {
      return task.task().then(() => {
        pkg = JSON.parse(getFileContents(path.join(opts.cwd, 'package.json')))
        expect(pkg.scripts.lint).toBeDefined()
        expect(pkg.scripts.test).toBeDefined()
      })
    })

    it('should change existing properties', () => {
      setJsonContents(path.join(opts.cwd, 'package.json'), 'scripts.lint', 'lint script')
      setJsonContents(path.join(opts.cwd, 'package.json'), 'scripts.test', 'lint script')
      return task.task().then(() => {
        pkg = JSON.parse(getFileContents(path.join(opts.cwd, 'package.json')))
        expect(pkg.scripts.lint).not.toBe('lint script')
        expect(pkg.scripts.test).not.toBe('test script')
      })
    })
  })
})
