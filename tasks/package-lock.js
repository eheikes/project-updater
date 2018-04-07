const execa = require('execa')
const { isDisabled, isNpmPackage } = require('../lib/checks')

module.exports = {
  title: 'package-lock.json',
  skip: ctx => {
    if (isDisabled(__filename, ctx.tasks)) { return 'Disabled' }
    if (!isNpmPackage(ctx.cwd)) { return 'No package.json found' }
  },
  task: ctx => execa('npm', [
    'install',
    '--package-lock-only'
  ], { cwd: ctx.cwd })
}
