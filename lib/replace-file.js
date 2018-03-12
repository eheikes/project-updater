const { copy } = require('fs-extra')
const pify = require('pify')

exports.replaceFile = (srcFilename, destFilename) => {
  return pify(copy)(srcFilename, destFilename)
}
