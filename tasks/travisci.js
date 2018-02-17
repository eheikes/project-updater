const path = require('path')
const { replaceFile } = require('../lib/replace-file')

module.exports = opts => {
  const source = path.join(opts.templateDir, 'travis.yml')
  const dest = path.join(opts.cwd, '.travis.yml')
  return {
    title: '.travis.yml',
    task: () => replaceFile(source, dest)
  }
}
