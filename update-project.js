#!/usr/bin/env node
const Listr = require('listr')

const tasks = new Listr([
])

tasks.run().catch(err => {
  console.error(err);
})
