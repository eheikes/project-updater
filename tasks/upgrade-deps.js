const execa = require('execa')
const { isDisabled, isNpmPackage, isYarnInstalled } = require('../lib/checks')

module.exports = {
  title: 'upgrade dependencies',
  skip: ctx => {
    if (isDisabled(__filename, ctx.tasks)) { return 'Disabled' }
    if (!isYarnInstalled()) { return 'Yarn is not installed' }
    if (!isNpmPackage(ctx.cwd)) { return 'No package.json found' }
  },
  task: ctx => execa('yarn', ['upgrade'], { cwd: ctx.cwd })
}
