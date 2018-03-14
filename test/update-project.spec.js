const Listr = require('listr')
const { opts, tasks } = require('../update-project')

describe('update-project script', () => {
  describe('opts', () => {
    it('should set the working directory', () => {
      expect(opts.cwd).toBe(process.cwd())
    })

    it('should set the template directory', () => {
      expect(opts.templateDir).toBeDefined()
    })
  })

  describe('tasks', () => {
    it('should be a Listr collection of tasks', () => {
      expect(tasks).toEqual(jasmine.any(Listr))
    })
  })
})
