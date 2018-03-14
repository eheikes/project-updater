const execa = require('execa')
const { isNpmPackage } = require('../lib/checks')

module.exports = {
  title: 'package-lock.json',
  skip: ctx => {
    if (!isNpmPackage(ctx.cwd)) { return 'No package.json found' }
  },
  task: ctx => execa('npm', [
    'install',
    '--package-lock-only'
  ], { cwd: ctx.cwd })
}
