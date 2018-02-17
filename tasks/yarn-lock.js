const execa = require('execa')
const { isNpmPackage, isYarnInstalled } = require('../lib/checks')

module.exports = opts => {
  return {
    title: 'yarn.lock',
    skip: () => {
      if (!isYarnInstalled()) { return 'Yarn is not installed' }
      if (!isNpmPackage(opts.cwd)) { return 'No package.json found' }
    },
    task: () => execa('yarn', [
      'install',
      '--ignore-scripts',
      '--non-interactive'
    ])
  }
}
