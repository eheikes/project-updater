const path = require('path')
const { isNpmPackage } = require('../lib/checks')
const { getGitConfig } = require('../lib/git')
const { getJson, updateJsonProperties } = require('../lib/json')
const { enhanceNpmPackage } = require('../lib/npm')
const { fillTemplate } = require('../lib/template')

module.exports = opts => {
  const template = path.join(opts.cwd, 'templates', 'package-subprops.json')
  const pkgFilename = path.join(opts.cwd, 'package.json')
  return {
    title: 'package.json subproperties',
    skip: () => {
      if (!isNpmPackage(opts.cwd)) { return 'No package.json found' }
    },
    task: () => {
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
}
