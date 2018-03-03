const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

exports.getJson = filename => {
  return promisify(readFile)(filename, 'utf8').then(data => {
    return JSON.parse(data)
  })
}

const writeJson = (filename, json) => {
  const data = JSON.stringify(json, null, 2)
  return promisify(writeFile)(filename, data, 'utf8')
}

/**
 * Adds top-level properties to a file, if they are missing.
 */
exports.addJsonIfMissing = (filename, values) => {
  return exports.getJson(filename).then(data => {
    for (let prop in values) {
      if (typeof values[prop] === 'undefined') {
        data[prop] = values[prop]
      }
    }
    return writeJson(filename, data)
  })
}

exports.updateJsonProperty = (filename, property, value) => {
  return exports.getJson(filename).then(json => {
    const change = {}
    change[property] = value
    return Object.assign({}, json, change)
  }).then(json => {
    return writeJson(filename, json)
  })
}
