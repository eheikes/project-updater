const path = require('path')
const { replaceFile } = require('../lib/replace-file')

module.exports = {
  title: '.editorconfig',
  task: ctx => replaceFile(
    path.join(ctx.templateDir, 'editorconfig'),
    path.join(ctx.cwd, '.editorconfig')
  )
}
