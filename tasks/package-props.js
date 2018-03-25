const { join } = require('path')
const { isNpmPackage } = require('../lib/checks')
const { addJsonIfMissing, getJson } = require('../lib/json')
const { fillTemplate, getProjectData } = require('../lib/template')

module.exports = {
  title: 'package.json properties',
  skip: ctx => {
    if (!isNpmPackage(ctx.cwd)) { return 'No package.json found' }
  },
  task: ctx => {
    const template = join(ctx.templateDir, 'package-props.json')
    const pkgFilename = join(ctx.cwd, 'package.json')
    return Promise.all([
      getProjectData(ctx.cwd),
      getJson(template)
    ]).then(([templateData, originalTemplate]) => {
      const templateValues = fillTemplate(originalTemplate, templateData)
      return addJsonIfMissing(pkgFilename, templateValues)
    })
  }
}
