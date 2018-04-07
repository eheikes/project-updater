const { join } = require('path')
const { isDisabled } = require('../lib/checks')
const { fileExists, readFile, writeFile } = require('../lib/file')
const { fillTemplate, getProjectData } = require('../lib/template')

module.exports = {
  title: 'README.md',
  skip: ctx => {
    if (isDisabled(__filename, ctx.tasks)) { return 'Disabled' }
    if (fileExists(join(ctx.cwd, 'README.md'))) { return 'README already exists' }
  },
  task: ctx => {
    const template = join(ctx.templateDir, 'README.md')
    const readmeFilename = join(ctx.cwd, 'README.md')
    return Promise.all([
      getProjectData(ctx.cwd),
      readFile(template)
    ]).then(([templateData, originalTemplate]) => {
      const templateValues = fillTemplate(originalTemplate, templateData)
      return writeFile(readmeFilename, templateValues)
    })
  }
}
