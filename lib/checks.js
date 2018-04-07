const execa = require('execa')
const fs = require('fs')
const { basename, extname, join } = require('path')

exports.isDisabled = (filename, tasks = {}) => {
  const ext = extname(filename)
  const name = basename(filename, ext)
  return tasks[name] === false
}

exports.isNpmPackage = dir => {
  return fs.existsSync(join(dir, 'package.json'))
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
