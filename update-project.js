#!/usr/bin/env node
const path = require('path')
const Listr = require('listr')

const opts = {
  cwd: process.cwd(),
  templateDir: path.resolve(__dirname, 'templates')
}

const loadTask = name => {
  const task = require(`./tasks/${name}`)
  return task(opts)
}

const tasks = new Listr([
  loadTask('gitignore'), // add .gitignore
  loadTask('editorconfig'), // add .editorconfig
  loadTask('travisci'), // add .travis.yml
  loadTask('package-props'), // normalize package.json
  loadTask('package-subprops'), // normalize package.json
  loadTask('yarn-lock'), // generate yarn.lock
  loadTask('package-deps'), // add npm deps
  loadTask('upgrade-deps'), // upgrade npm deps
  loadTask('package-lock'), // sync package-lock.json
  loadTask('contributors'), // update package.json contributors
  loadTask('test') // test files
])

tasks.run().catch(err => {
  console.error(err)
})
