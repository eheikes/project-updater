const path = require('path')
const { replaceFile } = require('../lib/replace-file')

module.exports = {
  title: '.gitignore',
  task: ctx => replaceFile(
    path.join(ctx.templateDir, 'gitignore'),
    path.join(ctx.cwd, '.gitignore')
  )
}
