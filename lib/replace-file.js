const { copyFile } = require('fs')
const { promisify } = require('util')

exports.replaceFile = (srcFilename, destFilename) => {
  return promisify(copyFile)(srcFilename, destFilename)
}
