const proxyquire = require('proxyquire')

const globalGit = `
core.autocrlf=input
core.safecrlf=true
core.pager=less -x3,5
core.attributesfile=~/.gitattributes
`

const localGit = `
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.safecrlf=false
`

describe('git routines', () => {
  let getGitConfig
  let execaStub, fsStub

  beforeEach(() => {
    execaStub = jasmine.createSpy('exec').and.callFake((cmd, args) => {
      return Promise.resolve({
        stdout: args.includes('--global') ? globalGit : localGit
      })
    })
    fsStub = jasmine.createSpyObj('fs', ['stat'])
    fsStub.stat.and.callFake((file, callback) => {
      callback(null, { isDirectory: () => true })
    })
    getGitConfig = proxyquire('../../lib/git', {
      'execa': execaStub,
      'fs': fsStub
    }).getGitConfig
  })

  describe('getGitConfig', () => {
    let config

    beforeEach(() => {
      return getGitConfig().then(data => {
        config = data
      })
    })

    it('should include the global (parsed) git config', () => {
      expect(config.core.autocrlf).toBe('input')
      expect(config.core.pager).toBe('less -x3,5')
      expect(config.core.attributesfile).toBe('~/.gitattributes')
    })

    describe('when the CWD is a git repo', () => {
      it('should include the local (parsed) git config', () => {
        expect(config.core.repositoryformatversion).toBe('0')
        expect(config.core.filemode).toBe('true')
        expect(config.core.bare).toBe('false')
      })

      it('should have the local config overwrite the global config', () => {
        expect(config.core.safecrlf).toBe('false')
      })
    })

    describe('when the CWD is NOT a git repo', () => {
      beforeEach(() => {
        fsStub.stat.and.callFake((file, callback) => {
          callback(null, { isDirectory: () => false })
        })
        return getGitConfig().then(data => {
          config = data
        })
      })

      it('should return only the global config', () => {
        expect(config.core.safecrlf).toBe('true')
        expect(config.core.repositoryformatversion).toBeUndefined()
        expect(config.core.filemode).toBeUndefined()
        expect(config.core.bare).toBeUndefined()
      })
    })
  })
})
