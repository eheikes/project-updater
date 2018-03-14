const path = require('path')
const { getFileContents, getTaskOpts } = require('../helpers/fixture')
const task = require('../../tasks/editorconfig')

describe('editorconfig task', () => {
  let opts

  beforeEach(() => {
    opts = getTaskOpts()
  })

  describe('action', () => {
    it('should add an .editorconfig file', () => {
      return task.task(opts).then(() => {
        const contents = getFileContents(path.join(opts.cwd, '.editorconfig'))
        expect(contents).toContain('root = true')
      })
    })
  })
})
