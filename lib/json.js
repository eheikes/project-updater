const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const getJson = filename => {
  return promisify(readFile)(filename, 'utf8').then(data => {
    return JSON.parse(data)
  })
}

const writeJson = (filename, json) => {
  const data = JSON.stringify(json, null, 2)
  return promisify(writeFile)(filename, data, 'utf8')
}

exports.updateJsonProperty = (filename, property, value) => {
  return getJson(filename).then(json => {
    const change = {}
    change[property] = value
    return Object.assign({}, json, change)
  }).then(json => {
    return writeJson(filename, json)
  })
}
