const proxyquire = require('proxyquire')
const { addFixtures, getTaskOpts } = require('../helpers/fixture')

describe('template routines', () => {
  describe('fillTemplate', () => {
    const { fillTemplate } = require('../../lib/template')
    const data = {
      a: {
        b: 1,
        c: 'see'
      },
      d: {
        f: 'fee'
      }
    }

    let result

    describe('for strings', () => {
      beforeEach(() => {
        const text = 'Can you {{a.c}} the {{d.f}}? {{a.b}} not found: {{foo.bar}}'
        result = fillTemplate(text, data)
      })

      it('should replace mustache tags with the given data', () => {
        expect(result).toContain('Can you see the fee?')
        expect(result).toContain('? 1 not found')
      })

      it('should fill missing template data with a blank string', () => {
        expect(result).toMatch(/not found: $/)
      })
    })

    describe('for objects', () => {
      beforeEach(() => {
        const json = {
          one: 'Can you {{a.c}} the {{d.f}}?',
          two: {
            msg: '{{a.b}} not found',
            val: '{{foo.bar}}'
          },
          three: 'foobar',
          four: 4,
          five: null
        }
        result = fillTemplate(json, data)
      })

      it('should replace mustache tags with the given data', () => {
        expect(result.one).toBe('Can you see the fee?')
        expect(result.two.msg).toBe('1 not found')
      })

      it('should fill missing template data with a blank string', () => {
        expect(result.two.val).toBe('')
      })

      it('should not change strings without template tags', () => {
        expect(result.three).toBe('foobar')
      })

      it('should not change non-strings', () => {
        expect(result.four).toBe(4)
        expect(result.five).toBe(null)
      })
    })
  })

  describe('getProjectData', () => {
    const gitConfig = {
      github: {
        user: 'jdoe'
      },
      user: {
        name: 'Jane Doe',
        email: 'jdoe@example.com'
      }
    }

    let data

    beforeEach(() => {
      const gitStub = jasmine.createSpy('getGitConfig').and.returnValue(Promise.resolve(gitConfig))
      const { getProjectData } = proxyquire('../../lib/template', {
        './git': {
          getGitConfig: gitStub
        }
      })
      const opts = getTaskOpts()
      addFixtures(opts.cwd, 'package.json')
      return getProjectData(opts.cwd).then(projectData => {
        data = projectData
      })
    })

    it('should include the git data under a "git" property', () => {
      expect(data.git.github.user).toBe(gitConfig.github.user)
      expect(data.git.user.name).toBe(gitConfig.user.name)
      expect(data.git.user.email).toBe(gitConfig.user.email)
    })

    it('should include the package data under a "pkg" property', () => {
      expect(data.pkg.name).toBe('foobar')
      expect(data.pkg.version).toBe('0.1.0')
      expect(data.pkg.license).toBe('MIT')
    })

    it('should include the date data under a "date" property', () => {
      expect(data.date.currentYear).toBe((new Date()).getFullYear())
    })
  })
})
