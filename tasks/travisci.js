const path = require('path')
const { replaceFile } = require('../lib/file')

module.exports = {
  title: '.travis.yml',
  task: ctx => replaceFile(
    path.join(ctx.templateDir, 'travis.yml'),
    path.join(ctx.cwd, '.travis.yml')
  )
}
