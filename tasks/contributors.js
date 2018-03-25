const execa = require('execa')
const path = require('path')
const { isNpmPackage } = require('../lib/checks')
const { updateJsonProperty } = require('../lib/json')

module.exports = {
  title: 'contributors',
  skip: ctx => {
    if (!isNpmPackage(ctx.cwd)) { return 'No package.json found' }
  },
  task: ctx => {
    const pkg = path.join(ctx.cwd, 'package.json')
    return execa(
      'git',
      ['--no-pager', 'shortlog', '-se', 'HEAD'],
      { cwd: ctx.cwd }
    ).then(response => {
      return response.stdout.split('\n').map(line => {
        const matches = /^\s+\d+\s+(.+)$/.exec(line)
        return matches && matches[1]
      })
    }).then(contributors => {
      return updateJsonProperty(pkg, 'contributors', contributors)
    })
  }
}
