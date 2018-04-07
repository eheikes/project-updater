#!/usr/bin/env node
const colors = require('colors/safe')
const { pathExistsSync } = require('fs-extra')
const parseArgs = require('minimist')
const { homedir } = require('os')
const path = require('path')
const Listr = require('listr')
const { getEnv } = require('./lib/env')

const args = parseArgs(process.argv.slice(2))
const homeTemplatesPath = path.join(homedir(), 'templates')

const templateDir = args.templates ||
  getEnv('TEMPLATES') ||
  (pathExistsSync(homeTemplatesPath) && homeTemplatesPath) ||
  path.resolve(__dirname, 'templates')

const tasksFilename = path.join(templateDir, 'tasks.json')
let tasksConfig = {}
if (pathExistsSync(tasksFilename)) {
  tasksConfig = require(tasksFilename)
}

const opts = {
  cwd: process.cwd(),
  tasks: tasksConfig,
  templateDir: templateDir
}

const tasks = new Listr([
  require(`./tasks/gitignore`), // add .gitignore
  require(`./tasks/editorconfig`), // add .editorconfig
  require(`./tasks/travisci`), // add .travis.yml
  require(`./tasks/package-props`), // normalize package.json
  require(`./tasks/package-subprops`), // normalize package.json
  require(`./tasks/readme`), // generate README
  require(`./tasks/license`), // generate LICENSE
  require(`./tasks/yarn-lock`), // generate yarn.lock
  require(`./tasks/package-deps`), // add npm deps
  require(`./tasks/upgrade-deps`), // upgrade npm deps
  require(`./tasks/package-lock`), // sync package-lock.json
  require(`./tasks/contributors`), // update package.json contributors
  require(`./tasks/test`) // test files
])

/* istanbul ignore if */
if (require.main === module) {
  console.log('Using', colors.white.bold(opts.templateDir), 'for templates.')
  tasks.run(opts).catch(err => {
    console.error(err)
  })
}

module.exports = { // for testing
  opts,
  tasks
}
