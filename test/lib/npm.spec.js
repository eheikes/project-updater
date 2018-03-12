const { enhanceNpmPackage } = require('../../lib/npm')

describe('npm routines', () => {
  describe('enhanceNpmPackage', () => {
    let pkg

    beforeEach(() => {
      pkg = enhanceNpmPackage({
        name: '@eheikes/foobar',
        version: '1.0.0'
      })
    })

    it('should add a fullName property that excludes the module\'s scope', () => {
      expect(pkg.fullName).toBe('foobar')
    })

    it('should not change existing properties', () => {
      expect(pkg.name).toBe('@eheikes/foobar')
      expect(pkg.version).toBe('1.0.0')
    })
  })
})
