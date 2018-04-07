const path = require('path')
const { getFileContents, getTaskOpts } = require('../helpers/fixture')
const task = require('../../tasks/editorconfig')

describe('editorconfig task', () => {
  let opts

  beforeEach(() => {
    opts = getTaskOpts()
  })

  describe('skip test', () => {
    it('should be truthy if the task is disabled', () => {
      opts.tasks = { editorconfig: false }
      expect(task.skip(opts)).toBeTruthy()
    })

    it('should be falsy otherwise', () => {
      expect(task.skip(opts)).toBeFalsy()
    })
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
