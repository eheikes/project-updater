const { join } = require('path')
const { isDisabled, isNpmPackage } = require('../lib/checks')
const { getJson, updateJsonProperties } = require('../lib/json')
const { fillTemplate, getProjectData } = require('../lib/template')

module.exports = {
  title: 'package.json subproperties',
  skip: ctx => {
    if (isDisabled(__filename, ctx.tasks)) { return 'Disabled' }
    if (!isNpmPackage(ctx.cwd)) { return 'No package.json found' }
  },
  task: ctx => {
    const template = join(ctx.templateDir, 'package-subprops.json')
    const pkgFilename = join(ctx.cwd, 'package.json')
    return Promise.all([
      getProjectData(ctx.cwd),
      getJson(template)
    ]).then(([templateData, originalTemplate]) => {
      const templateValues = fillTemplate(originalTemplate, templateData)
      return updateJsonProperties(pkgFilename, templateValues)
    })
  }
}
