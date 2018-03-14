const execa = require('execa')
const { readFile } = require('fs')
const { join } = require('path')
const { safeLoad } = require('js-yaml')
const pify = require('pify')
const { isNpmPackage, isYarnInstalled } = require('../lib/checks')

module.exports = {
  title: 'package.json dependencies',
  skip: ctx => {
    if (!isYarnInstalled()) { return 'Yarn is not installed' }
    if (!isNpmPackage(ctx.cwd)) { return 'No package.json found' }
  },
  task: ctx => {
    return pify(readFile)(join(ctx.templateDir, 'dependencies.yaml'), 'utf8').then(fileData => {
      return safeLoad(fileData)
    }).then(pkgs => {
      return Promise.all([
        pkgs.dependencies.length > 0
          /* istanbul ignore next */ ? execa('yarn', ['add', ...pkgs.dependencies], { cwd: ctx.cwd })
          : null,
        pkgs.devDependencies.length > 0
          ? execa('yarn', ['add', ...pkgs.devDependencies, '--dev'], { cwd: ctx.cwd })
          /* istanbul ignore next */ : null
      ])
    })
  }
}
