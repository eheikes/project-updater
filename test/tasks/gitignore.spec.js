const path = require('path')
const { getFileContents, getTaskOpts } = require('../helpers/fixture')
const task = require('../../tasks/gitignore')

describe('gitignore task', () => {
  let opts

  beforeEach(() => {
    opts = getTaskOpts()
  })

  describe('action', () => {
    it('should add an .gitignore file', () => {
      return task.task(opts).then(() => {
        const contents = getFileContents(path.join(opts.cwd, '.gitignore'))
        expect(contents).toContain('node_modules/')
      })
    })
  })
})
