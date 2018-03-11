const proxyquire = require('proxyquire')
const { addFixtures, createTempFolder } = require('./helpers/fixture')

describe('checks routines', () => {
  let check
  let execaSpy
  let folder

  beforeEach(() => {
    execaSpy = jasmine.createSpyObj('exec', ['sync'])
    check = proxyquire('../lib/checks', {
      'execa': execaSpy
    })
    folder = createTempFolder()
  })

  describe('isNpmPackage', () => {
    it('should return true if a package.json file exists in the directory', () => {
      addFixtures(folder, 'package.json')
      expect(check.isNpmPackage(folder)).toBe(true)
    })

    it('should return false if a package.json file does NOT exist in the directory', () => {
      expect(check.isNpmPackage(folder)).toBe(false)
    })
  })

  describe('isYarnInstalled', () => {
    it('should return true if yarn is installed', () => {
      expect(check.isYarnInstalled()).toBe(true)
    })

    it('should return false if yarn is not installed', () => {
      execaSpy.sync.and.throwError('yarn not installed')
      expect(check.isYarnInstalled()).toBe(false)
    })
  })
})
