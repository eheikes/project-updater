const { copyFileSync } = require('fs')
const { join } = require('path')
const tempy = require('tempy')

const fixturesPath = join(__dirname, '..', 'fixtures')

exports.addFixtures = (destPath, ...filenames) => {
  filenames.forEach(filename => {
    const sourceFilename = join(fixturesPath, filename)
    const destFilename = join(destPath, filename)
    copyFileSync(sourceFilename, destFilename)
  })
}

exports.createTempFolder = () => {
  return tempy.directory()
}
