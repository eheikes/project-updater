const { join } = require('path')
const { addFixtures, createTempFolder, fixturesPath, getFileContents } = require('../helpers/fixture')
const { fileExists, readFile, replaceFile, writeFile } = require('../../lib/file')

describe('file routines', () => {
  let folder

  describe('fileExists', () => {
    beforeEach(() => {
      folder = createTempFolder()
    })

    it('should return true if the file exists', () => {
      addFixtures(folder, 'test.txt')
      expect(fileExists(join(folder, 'test.txt'))).toBe(true)
    })

    it('should return false if the file does not exist', () => {
      expect(fileExists(join(folder, 'test.txt'))).toBe(false)
    })
  })

  describe('readFile', () => {
    it('should return the file contents', () => {
      return readFile(join(fixturesPath, 'test.txt')).then(contents => {
        expect(contents).toContain('This is a test')
      })
    })
  })

  describe('replaceFile', () => {
    beforeEach(() => {
      folder = createTempFolder()
      addFixtures(folder, 'package.json', 'test.txt')
      return replaceFile(
        join(folder, 'test.txt'),
        join(folder, 'package.json')
      )
    })

    it('should replace the destination file with the source', () => {
      const contents = getFileContents(join(folder, 'package.json'))
      expect(contents).toContain('This is a test')
    })
  })

  describe('writeFile', () => {
    beforeEach(() => {
      folder = createTempFolder()
      return writeFile(
        join(folder, 'test.txt'),
        'This is a test'
      )
    })

    it('should write the data to the destination file', () => {
      const contents = getFileContents(join(folder, 'test.txt'))
      expect(contents).toBe('This is a test')
    })
  })
})
