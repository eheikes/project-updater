const { join } = require('path')
const proxyquire = require('proxyquire')
const {
  addFixtures,
  getFileContents,
  getTaskOpts
} = require('../helpers/fixture')

describe('README task', () => {
  const templateData = {
    date: {
      currentYear: 2001
    }
  }

  let templateStub
  let opts
  let task
  let filename

  beforeEach(() => {
    templateStub = jasmine.createSpy('getProjectData').and.returnValue(Promise.resolve(templateData))
    task = proxyquire('../../tasks/readme', {
      '../lib/template': {
        getProjectData: templateStub
      }
    })
    opts = getTaskOpts()
    filename = join(opts.cwd, 'README.md')
  })

  describe('skip test', () => {
    it('should be truthy if a README already exists', () => {
      addFixtures(opts.cwd, 'README.md')
      expect(task.skip(opts)).toBeTruthy()
    })

    it('should be falsy otherwise', () => {
      expect(task.skip(opts)).toBeFalsy()
    })

    it('should be truthy if the task is disabled', () => {
      opts.tasks = { readme: false }
      expect(task.skip(opts)).toBeTruthy()
    })
  })

  describe('action', () => {
    beforeEach(() => {
      return task.task(opts)
    })

    it('should write the README.md file', () => {
      expect(getFileContents(filename)).toContain('## Installation')
    })

    it('should fill in the template with the project data', () => {
      expect(getFileContents(filename)).toContain('Copyright © 2001')
    })
  })
})
