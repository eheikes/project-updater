const execa = require('execa')
const fs = require('fs')
const path = require('path')

exports.isNpmPackage = dir => {
  return fs.existsSync(path.join(dir, 'package.json'))
}

exports.isYarnInstalled = () => {
  let found = false
  try {
    execa.sync('yarn', ['--version'])
    found = true
  } catch (err) {
    found = false
  }
  return found
}
