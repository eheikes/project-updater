const dotProp = require('dot-prop')
const execa = require('execa')
const extend = require('extend')
const {stat} = require('fs')
const {join} = require('path')
const pify = require('pify')

/**
 * Parses `git config --list` output into JS object format.
 */
const parseGitConfig = str => {
  const configRegExp = /^(.+?)=(.+)$/
  return str.split(/\n+/).filter(line => configRegExp.test(line)).reduce((obj, line) => {
    const [, name, value] = configRegExp.exec(line)
    dotProp.set(obj, name, value)
    return obj
  }, {})
}

const getGlobalGitConfig = () => {
  return execa('git', ['config', '--global', '--list']).then(result => parseGitConfig(result.stdout))
}

const getLocalGitConfig = () => {
  // Check if there is a local .git folder. If not, return an empty object.
  const gitPath = join(process.cwd(), '.git')
  return pify(stat)(gitPath).then(stats => {
    if (stats.isDirectory()) {
      return execa('git', ['config', '--local', '--list'])
    }
    return { stdout: '' }
  }).then(result => parseGitConfig(result.stdout))
}

/**
 * Returns the global + CWD git config, in JS object format.
 */
exports.getGitConfig = () => {
  return Promise.all([
    getGlobalGitConfig(),
    getLocalGitConfig()
  ]).then(results => extend(true, ...results))
}
