const execa = require('execa')
const path = require('path')
const { isNpmPackage } = require('../lib/checks')
const { updateJsonProperty } = require('../lib/json')

module.exports = opts => {
  const pkg = path.join(opts.cwd, 'package.json')
  return {
    title: 'contributors',
    skip: () => {
      if (!isNpmPackage(opts.cwd)) { return 'No package.json found' }
    },
    task: () => {
      return execa('git', ['--no-pager', 'shortlog', '-se', 'HEAD']).then(response => {
        return response.stdout.split('\n').map(line => {
          const matches = /^\s+\d+\s+(.+)$/.exec(line)
          return matches && matches[1]
        })
      })
        .then(contributors => {
          return updateJsonProperty(pkg, 'contributors', contributors)
        })
    }
  }
}
