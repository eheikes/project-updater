const dotProp = require('dot-prop')
const { copySync, readFileSync, writeFileSync } = require('fs-extra')
const { join } = require('path')
const tempy = require('tempy')

const fixturesPath = join(__dirname, '..', 'fixtures')

exports.addFixtures = (destPath, ...filenames) => {
  filenames.forEach(filename => {
    const sourceFilename = join(fixturesPath, filename)
    const destFilename = join(destPath, filename)
    copySync(sourceFilename, destFilename)
  })
}

exports.createTempFolder = () => {
  return tempy.directory()
}

exports.getFileContents = (filename) => {
  return readFileSync(filename, 'utf8')
}

exports.getTaskOpts = () => {
  const folder = tempy.directory()
  return {
    cwd: folder,
    templateDir: join(__dirname, '..', '..', 'templates')
  }
}

exports.setJsonContents = (filename, prop, val) => {
  let data = JSON.parse(exports.getFileContents(filename))
  dotProp.set(data, prop, val)
  writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8')
}
