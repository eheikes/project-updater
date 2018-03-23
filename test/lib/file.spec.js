const { join } = require('path')
const { addFixtures, createTempFolder, getFileContents } = require('../helpers/fixture')
const { replaceFile, writeFile } = require('../../lib/file')

describe('file routines', () => {
  let folder

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
