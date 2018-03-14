const path = require('path')
const { isNpmPackage } = require('../lib/checks')
const { getGitConfig } = require('../lib/git')
const { getJson, updateJsonProperties } = require('../lib/json')
const { enhanceNpmPackage } = require('../lib/npm')
const { fillTemplate } = require('../lib/template')

module.exports = {
  title: 'package.json subproperties',
  skip: ctx => {
    if (!isNpmPackage(ctx.cwd)) { return 'No package.json found' }
  },
  task: ctx => {
    const template = path.join(ctx.templateDir, 'package-subprops.json')
    const pkgFilename = path.join(ctx.cwd, 'package.json')
    return Promise.all([
      getGitConfig(),
      getJson(pkgFilename),
      getJson(template)
    ]).then(([git, pkg, originalTemplate]) => {
      pkg = enhanceNpmPackage(pkg)
      const templateData = Object.assign({}, { git }, { pkg })
      const templateValues = fillTemplate(originalTemplate, templateData)
      return updateJsonProperties(pkgFilename, templateValues)
    })
  }
}
