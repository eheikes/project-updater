const { fillTemplate } = require('../../lib/template')

describe('template routines', () => {
  const data = {
    a: {
      b: 1,
      c: 'see'
    },
    d: {
      f: 'fee'
    }
  }

  describe('fillTemplate', () => {
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
})
