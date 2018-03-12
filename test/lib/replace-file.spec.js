const path = require('path')
const { addFixtures, createTempFolder, getFileContents } = require('../helpers/fixture')
const { replaceFile } = require('../../lib/replace-file')

describe('replace-file routines', () => {
  let folder

  describe('replaceFile', () => {
    beforeEach(() => {
      folder = createTempFolder()
      addFixtures(folder, 'package.json', 'test.txt')
      return replaceFile(
        path.join(folder, 'test.txt'),
        path.join(folder, 'package.json')
      )
    })

    it('should replace the destination file with the source', () => {
      const contents = getFileContents(path.join(folder, 'package.json'))
      expect(contents).toContain('This is a test')
    })
  })
})
