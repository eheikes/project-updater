const execa = require('execa')
const { readFile } = require('fs')
const { join } = require('path')
const { safeLoad } = require('js-yaml')
const pify = require('pify')
const { isNpmPackage, isYarnInstalled } = require('../lib/checks')

module.exports = opts => {
  const depsFile = join(opts.templateDir, 'dependencies.yaml')
  return {
    title: 'package.json dependencies',
    skip: () => {
      if (!isYarnInstalled()) { return 'Yarn is not installed' }
      if (!isNpmPackage(opts.cwd)) { return 'No package.json found' }
    },
    task: () => {
      return pify(readFile)(depsFile, 'utf8').then(fileData => {
        return safeLoad(fileData)
      }).then(pkgs => {
        return Promise.all([
          pkgs.dependencies.length > 0
            /* istanbul ignore next */ ? execa('yarn', ['add', ...pkgs.dependencies], { cwd: opts.cwd })
            : null,
          pkgs.devDependencies.length > 0
            ? execa('yarn', ['add', ...pkgs.devDependencies, '--dev'], { cwd: opts.cwd })
            /* istanbul ignore next */ : null
        ])
      })
    }
  }
}
