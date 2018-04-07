const path = require('path')
const { isDisabled } = require('../lib/checks')
const { replaceFile } = require('../lib/file')

module.exports = {
  title: '.editorconfig',
  skip: ctx => {
    if (isDisabled(__filename, ctx.tasks)) { return 'Disabled' }
  },
  task: ctx => replaceFile(
    path.join(ctx.templateDir, 'editorconfig'),
    path.join(ctx.cwd, '.editorconfig')
  )
}
