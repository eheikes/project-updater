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
  loadTask('gitignore'),
  loadTask('editorconfig'),
  loadTask('travisci'),
  loadTask('yarn-lock')
])

tasks.run().catch(err => {
  console.error(err);
})
