const Listr = require('listr')
const { homedir } = require('os')
const { join, resolve } = require('path')
const proxyquire = require('proxyquire')

describe('update-project script', () => {
  describe('opts', () => {
    const tasksConfig = {
      "package-lock": false,
      "travisci": false
    }
    const tasksFilename = join(homedir(), 'templates', 'tasks.json')

    let opts

    beforeEach(() => {
      opts = require('../update-project').opts
    })

    it('should set the working directory', () => {
      expect(opts.cwd).toBe(process.cwd())
    })

    describe('template directory', () => {
      const fakeTemplatesPath = 'fake-templates-folder'

      it('should be set to the `--templates` folder if it is specified', () => {
        opts = proxyquire('../update-project', {
          minimist: () => ({ templates: fakeTemplatesPath })
        }).opts
        expect(opts.templateDir).toBe(fakeTemplatesPath)
      })

      it('should be set to the TEMPLATES folder if it exists in env', () => {
        opts = proxyquire('../update-project', {
          './lib/env': {
            getEnv: () => fakeTemplatesPath
          }
        }).opts
        expect(opts.templateDir).toBe(fakeTemplatesPath)
      })

      it('should be set to the $HOME "templates" folder if it exists', () => {
        opts = proxyquire.noCallThru().load('../update-project', {
          'fs-extra': {
            pathExistsSync: () => true
          },
          [tasksFilename]: tasksConfig
        }).opts
        expect(opts.templateDir).toBe(`${homedir()}/templates`)
      })

      it('should otherwise be set to the built-in "templates" folder', () => {
        opts = proxyquire('../update-project', {
          'os': {
            homedir: () => './nonexistent'
          }
        }).opts
        expect(opts.templateDir).toBe(resolve(__dirname, '..', 'templates'))
      })
    })

    describe('enabled tasks', () => {
      it('should be set to the tasks.json file in the templates directory', () => {
        opts = proxyquire.noCallThru().load('../update-project', {
          'fs-extra': {
            pathExistsSync: () => true
          },
          [tasksFilename]: tasksConfig
        }).opts
        expect(opts.tasks).toEqual(tasksConfig)
      })

      it('should default to {} if there is no tasks.json', () => {
        expect(opts.tasks).toEqual({})
      })
    })
  })

  describe('tasks', () => {
    let tasks

    beforeEach(() => {
      tasks = require('../update-project').tasks
    })

    it('should be a Listr collection of tasks', () => {
      expect(tasks).toEqual(jasmine.any(Listr))
    })
  })
})
