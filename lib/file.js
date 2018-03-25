const { copy, pathExistsSync, readFile, writeFile } = require('fs-extra')
const pify = require('pify')

exports.fileExists = (filename) => {
  return pathExistsSync(filename)
}

exports.readFile = (filename) => {
  return pify(readFile)(filename, 'utf8')
}

exports.replaceFile = (srcFilename, destFilename) => {
  return pify(copy)(srcFilename, destFilename)
}

exports.writeFile = (destFilename, data) => {
  return pify(writeFile)(destFilename, data, 'utf8')
}
