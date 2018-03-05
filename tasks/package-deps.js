const execa = require('execa')
const { readFile } = require('fs')
const { join } = require('path')
const { safeLoad } = require('js-yaml')
const { promisify } = require('util')
const { isNpmPackage, isYarnInstalled } = require('../lib/checks')

module.exports = opts => {
  const depsFile = join(opts.cwd, 'templates', 'dependencies.yaml')
  const package = join(opts.cwd, 'package.json')
  return {
    title: 'package.json dependencies',
    skip: () => {
      if (!isYarnInstalled()) { return 'Yarn is not installed' }
      if (!isNpmPackage(opts.cwd)) { return 'No package.json found' }
    },
    task: () => {
      return promisify(readFile)(depsFile, 'utf8').then(fileData => {
        return safeLoad(fileData)
      }).then(pkgs => {
        return Promise.all([
          pkgs.dependencies.length > 0 ? execa('yarn', ['add', ...pkgs.dependencies]) : null,
          pkgs.devDependencies.length > 0 ? execa('yarn', ['add', ...pkgs.devDependencies, '--dev']) : null
        ])
      })
    }
  }
}
