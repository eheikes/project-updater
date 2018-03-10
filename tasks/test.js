const mkdirp = require('mkdirp')
const { join } = require('path')
const { promisify } = require('util')
const { replaceFile } = require('../lib/replace-file')

module.exports = opts => {
  const testPath = join(opts.cwd, 'test')
  return {
    title: 'testing framework',
    task: () => {
      // Create the test folders, if necessary.
      return promisify(mkdirp)(join(testPath, 'helpers')).then(() => {
        // Copy the template files.
        const files = [{
          src: join(opts.templateDir, 'jasmine.json'),
          dest: join(testPath, 'jasmine.json')
        }, {
          src: join(opts.templateDir, 'reporter.js'),
          dest: join(testPath, 'helpers', 'reporter.js')
        }]
        return Promise.all(files.map(fileInfo => replaceFile(fileInfo.src, fileInfo.dest)))
      })
    }
  }
}
