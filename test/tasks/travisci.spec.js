const path = require('path')
const { getFileContents, getTaskOpts } = require('../helpers/fixture')
const createTask = require('../../tasks/travisci')

describe('travisci task', () => {
  let opts
  let task

  beforeEach(() => {
    opts = getTaskOpts()
    task = createTask(opts)
  })

  describe('action', () => {
    it('should add an .travis.yml file', () => {
      return task.task().then(() => {
        const contents = getFileContents(path.join(opts.cwd, '.travis.yml'))
        expect(contents).toContain('sudo: false')
      })
    })
  })
})
