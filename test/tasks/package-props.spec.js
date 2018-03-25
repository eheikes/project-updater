const path = require('path')
const proxyquire = require('proxyquire')
const { addFixtures, getFileContents, getTaskOpts } = require('../helpers/fixture')

describe('package.json properties', () => {
  const templateData = {
    date: {
      currentYear: 2001
    }
  }

  let templateStub
  let opts
  let task

  beforeEach(() => {
    templateStub = jasmine.createSpy('getProjectData').and.returnValue(Promise.resolve(templateData))
    task = proxyquire('../../tasks/package-props', {
      '../lib/template': {
        getProjectData: templateStub
      }
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
  })

  describe('action', () => {
    let pkg

    beforeEach(() => {
      addFixtures(opts.cwd, 'package.json')
      return task.task(opts).then(() => {
        pkg = JSON.parse(getFileContents(path.join(opts.cwd, 'package.json')))
      })
    })

    it('should add the missing properties', () => {
      expect(pkg.author).toBeDefined()
      expect(pkg.license).toBeDefined()
      expect(pkg.keywords).toBeDefined()
      expect(pkg.repository).toBeDefined()
      expect(pkg.homepage).toBeDefined()
      expect(pkg.bugs).toBeDefined()
      expect(pkg.files).toBeDefined()
      expect(pkg.scripts).toBeDefined()
      expect(pkg.standard).toBeDefined()
      expect(pkg.nyc).toBeDefined()
    })

    it('should not change existing properties', () => {
      expect(pkg.version).not.toBe('1.0.0')
    })
  })
})
