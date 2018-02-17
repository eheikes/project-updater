const path = require('path')
const { replaceFile } = require('../lib/replace-file')

module.exports = opts => {
  const source = path.join(opts.templateDir, 'gitignore')
  const dest = path.join(opts.cwd, '.gitignore')
  return {
    title: '.gitignore',
    task: () => replaceFile(source, dest)
  }
}
