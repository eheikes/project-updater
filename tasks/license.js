const { join } = require('path')
const licenseList = require('spdx-license-list/spdx-full.json')
const { isNpmPackage } = require('../lib/checks')
const { writeFile } = require('../lib/file')
const { getJson } = require('../lib/json')

module.exports = {
  title: 'LICENSE',
  skip: ctx => {
    if (!isNpmPackage(ctx.cwd)) { return 'No package.json found' }
  },
  task: ctx => getJson(join(ctx.cwd, 'package.json')).then(({ license }) => {
    if (!license) { return }
    if (!licenseList[license]) {
      throw new Error(`No match for ${license} found in SPDX licenses list`)
    }
    return writeFile(join(ctx.cwd, 'LICENSE'), licenseList[license].licenseText)
  })
}
