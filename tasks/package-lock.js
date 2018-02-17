const execa = require('execa')
const { isNpmPackage } = require('../lib/checks')

module.exports = opts => {
  return {
    title: 'package-lock.json',
    skip: () => {
      if (!isNpmPackage(opts.cwd)) { return 'No package.json found' }
    },
    task: () => execa('npm', [
      'install',
      '--package-lock-only'
    ])
  }
}
