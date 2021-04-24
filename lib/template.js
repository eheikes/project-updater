const dotProp = require('dot-prop')
const { join } = require('path')
const { getGitConfig } = require('./git')
const { getJson } = require('./json')
const { enhanceNpmPackage } = require('./npm')

const templateRegExp = /{{(.+?)}}/g

const fillText = (text, data) => {
  return text.replace(templateRegExp, (match, name) => dotProp.get(data, name) || '')
}

const fillJson = (json, data) => {
  const clone = JSON.parse(JSON.stringify(json))
  for (const prop in clone) {
    if (typeof clone[prop] === 'object') {
      clone[prop] = fillJson(clone[prop], data)
    } else if (typeof clone[prop] === 'string') {
      clone[prop] = fillText(clone[prop], data)
    }
  }
  return clone
}

exports.fillTemplate = (jsonOrText, jsonData) => {
  if (typeof jsonOrText === 'string') {
    return fillText(jsonOrText, jsonData)
  } else {
    return fillJson(jsonOrText, jsonData)
  }
}

exports.getProjectData = (projectPath) => {
  const pkgFilename = join(projectPath, 'package.json')
  return Promise.all([
    getGitConfig(projectPath),
    getJson(pkgFilename)
  ]).then(([git, pkg]) => {
    pkg = enhanceNpmPackage(pkg)
    const date = {
      currentYear: (new Date()).getFullYear()
    }
    return Object.assign({}, { git }, { pkg }, { date })
  })
}
