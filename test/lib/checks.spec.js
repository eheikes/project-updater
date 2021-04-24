const proxyquire = require('proxyquire')
const { addFixtures, createTempFolder } = require('../helpers/fixture')

describe('checks routines', () => {
  let check
  let execaSpy
  let folder

  beforeEach(() => {
    execaSpy = jasmine.createSpyObj('exec', ['sync'])
    check = proxyquire('../../lib/checks', {
      execa: execaSpy
    })
    folder = createTempFolder()
  })

  describe('isDisabled', () => {
    it('should return true if the basename is in the tasks and is false', () => {
      expect(check.isDisabled('foo.js', { foo: false })).toBe(true)
    })

    it('should return false if the basename is different', () => {
      expect(check.isDisabled('foobar.js', { foo: false })).toBe(false)
    })

    it('should return false if the tasks is not false', () => {
      expect(check.isDisabled('foo.js', { foo: true })).toBe(false)
      expect(check.isDisabled('foo.js', { foo: null })).toBe(false)
      expect(check.isDisabled('foo.js', { foo: null })).toBe(false)
    })

    it('should return false if the task is not defined', () => {
      expect(check.isDisabled('foo.js', {})).toBe(false)
    })

    it('should return false if tasks aren\'t given', () => {
      expect(check.isDisabled('foo.js')).toBe(false)
    })
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
