const dotProp = require('dot-prop')

const templateRegExp = /{{(.+?)}}/g

const fillText = (text, data) => {
  return text.replace(templateRegExp, (match, name) => dotProp.get(data, name))
}

const fillJson = (json, data) => {
  const clone = JSON.parse(JSON.stringify(json))
  for (let prop in clone) {
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
