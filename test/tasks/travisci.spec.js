const path = require('path')
const { getFileContents, getTaskOpts } = require('../helpers/fixture')
const task = require('../../tasks/travisci')

describe('travisci task', () => {
  let opts

  beforeEach(() => {
    opts = getTaskOpts()
  })

  describe('skip test', () => {
    it('should be truthy if the task is disabled', () => {
      opts.tasks = { travisci: false }
      expect(task.skip(opts)).toBeTruthy()
    })

    it('should be falsy otherwise', () => {
      expect(task.skip(opts)).toBeFalsy()
    })
  })

  describe('action', () => {
    it('should add an .travis.yml file', () => {
      return task.task(opts).then(() => {
        const contents = getFileContents(path.join(opts.cwd, '.travis.yml'))
        expect(contents).toContain('sudo: false')
      })
    })
  })
})
