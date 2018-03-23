const { join } = require('path')
const {
  addFixtures,
  getFileContents,
  getTaskOpts,
  setJsonContents
} = require('../helpers/fixture')
const task = require('../../tasks/license')

describe('LICENSE task', () => {
  let opts
  let filename

  beforeEach(() => {
    opts = getTaskOpts()
    filename = join(opts.cwd, 'LICENSE')
  })

  describe('skip test', () => {
    it('should be truthy if a package.json does not exist', () => {
      expect(task.skip(opts)).toBeTruthy()
    })

    it('should be falsy otherwise', () => {
      addFixtures(opts.cwd, 'package.json')
      expect(task.skip(opts)).toBeFalsy()
    })
  })

  describe('action', () => {
    beforeEach(() => {
      addFixtures(opts.cwd, 'package.json')
    })

    describe('when the package.json has a "license" property', () => {
      beforeEach(() => {
        return task.task(opts)
      })

      it('should create the appropriate LICENSE file', () => {
        expect(getFileContents(filename)).toContain('MIT')
      })
    })

    describe('when the package.json does NOT have a "license" property', () => {
      beforeEach(() => {
        setJsonContents(join(opts.cwd, 'package.json'), 'license', null)
        return task.task(opts)
      })

      it('should NOT create a LICENSE file', () => {
        expect(() => getFileContents(filename)).toThrowError(/ENOENT/)
      })
    })

    describe('when the package license cannot be matched', () => {
      beforeEach(() => {
        setJsonContents(join(opts.cwd, 'package.json'), 'license', 'NONEXISTENT')
      })

      it('should return an error', () => {
        return task.task(opts).then(() => {
          throw new Error('should not have succeeded')
        }).catch(err => {
          expect(err.message).toMatch('No match')
        })
      })
    })
  })
})
