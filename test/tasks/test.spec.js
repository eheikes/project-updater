const path = require('path')
const { getFileContents, getTaskOpts } = require('../helpers/fixture')
const task = require('../../tasks/test')

describe('testing framework', () => {
  let opts

  beforeEach(() => {
    opts = getTaskOpts()
  })

  describe('action', () => {
    beforeEach(() => {
      return task.task(opts)
    })

    it('should add the testing files', () => {
      const jasmineFilename = path.join(opts.cwd, 'test', 'jasmine.json')
      const reporterFilename = path.join(opts.cwd, 'test', 'helpers', 'reporter.js')
      expect(getFileContents(jasmineFilename)).toContain('spec_dir')
      expect(getFileContents(reporterFilename)).toContain('const SpecReporter')
    })
  })
})
