const path = require('path')
const { getFileContents, getTaskOpts } = require('../helpers/fixture')
const createTask = require('../../tasks/gitignore')

describe('gitignore task', () => {
  let opts
  let task

  beforeEach(() => {
    opts = getTaskOpts()
    task = createTask(opts)
  })

  describe('action', () => {
    it('should add an .gitignore file', () => {
      return task.task().then(() => {
        const contents = getFileContents(path.join(opts.cwd, '.gitignore'))
        expect(contents).toContain('node_modules/')
      })
    })
  })
})
