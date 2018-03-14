#!/usr/bin/env node
const path = require('path')
const Listr = require('listr')

const opts = {
  cwd: process.cwd(),
  templateDir: path.resolve(__dirname, 'templates')
}

const tasks = new Listr([
  require(`./tasks/gitignore`), // add .gitignore
  require(`./tasks/editorconfig`), // add .editorconfig
  require(`./tasks/travisci`), // add .travis.yml
  require(`./tasks/package-props`), // normalize package.json
  require(`./tasks/package-subprops`), // normalize package.json
  require(`./tasks/yarn-lock`), // generate yarn.lock
  require(`./tasks/package-deps`), // add npm deps
  require(`./tasks/upgrade-deps`), // upgrade npm deps
  require(`./tasks/package-lock`), // sync package-lock.json
  require(`./tasks/contributors`), // update package.json contributors
  require(`./tasks/test`) // test files
])

tasks.run(opts).catch(err => {
  console.error(err)
})
