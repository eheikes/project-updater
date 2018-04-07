const execa = require('execa')
const { isDisabled, isNpmPackage, isYarnInstalled } = require('../lib/checks')

module.exports = {
  title: 'yarn.lock',
  skip: ctx => {
    if (isDisabled(__filename, ctx.tasks)) { return 'Disabled' }
    if (!isYarnInstalled()) { return 'Yarn is not installed' }
    if (!isNpmPackage(ctx.cwd)) { return 'No package.json found' }
  },
  task: ctx => execa('yarn', [
    'install',
    '--ignore-scripts',
    '--non-interactive'
  ], { cwd: ctx.cwd })
}
