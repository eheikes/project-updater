const path = require('path')
const { replaceFile } = require('../lib/replace-file')

module.exports = opts => {
  const source = path.join(opts.templateDir, 'editorconfig')
  const dest = path.join(opts.cwd, '.editorconfig')
  return {
    title: '.editorconfig',
    task: () => replaceFile(source, dest)
  }
}
