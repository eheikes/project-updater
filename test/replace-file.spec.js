const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { addFixtures, createTempFolder } = require('./helpers/fixture')
const { replaceFile } = require('../lib/replace-file')

describe('replace-file routines', () => {
  let folder

  describe('replaceFile', () => {
    beforeEach(async () => {
      folder = createTempFolder()
      addFixtures(folder, 'package.json', 'test.txt')
      await replaceFile(
        path.join(folder, 'test.txt'),
        path.join(folder, 'package.json')
      )
    })

    it('should replace the destination file with the source', async () => {
      const contents = await promisify(fs.readFile)(path.join(folder, 'package.json'), 'utf8')
      expect(contents).toContain('This is a test')
    })
  })
})
