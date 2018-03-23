const { copy, writeFile } = require('fs-extra')
const pify = require('pify')

exports.replaceFile = (srcFilename, destFilename) => {
  return pify(copy)(srcFilename, destFilename)
}

exports.writeFile = (destFilename, data) => {
  return pify(writeFile)(destFilename, data, 'utf8')
}
