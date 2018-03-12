const path = require('path')
const { getFileContents, getTaskOpts } = require('../helpers/fixture')
const createTask = require('../../tasks/editorconfig')

describe('editorconfig task', () => {
  let opts
  let task

  beforeEach(() => {
    opts = getTaskOpts()
    task = createTask(opts)
  })

  describe('action', () => {
    it('should add an .editorconfig file', () => {
      return task.task().then(() => {
        const contents = getFileContents(path.join(opts.cwd, '.editorconfig'))
        expect(contents).toContain('root = true')
      })
    })
  })
})
