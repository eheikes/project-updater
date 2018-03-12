const { join } = require('path')
const { addFixtures, createTempFolder } = require('../helpers/fixture')
const { addJsonIfMissing, getJson, updateJsonProperties, updateJsonProperty } = require('../../lib/json')

describe('JSON routines', () => {
  let folder
  let json

  beforeEach(() => {
    folder = createTempFolder()
    addFixtures(folder, 'package.json')
  })

  describe('addJsonIfMissing', () => {
    let filename

    beforeEach(() => {
      filename = join(folder, 'package.json')
      return addJsonIfMissing(filename, {
        name: 'new name',
        foo: 'bar'
      }).then(() => {
        return getJson(filename)
      }).then(data => {
        json = data
      })
    })

    it('should add a property that is missing', () => {
      expect(json.foo).toBe('bar')
    })

    it('should not change an existing property', () => {
      expect(json.name).toBeDefined()
      expect(json.name).not.toBe('new name')
    })
  })

  describe('getJson', () => {
    it('should return the parsed JSON of a file', () => {
      return getJson(join(folder, 'package.json')).then(json => {
        expect(json.name).toBe('foobar')
        expect(json.version).toBe('0.1.0')
      })
    })
  })

  describe('updateJsonProperties', () => {
    let filename
    let json

    beforeEach(() => {
      filename = join(folder, 'package.json')
      return updateJsonProperties(filename, {
        name: 'new name',
        foo: 'bar',
        dependencies: {
          mkdirp: '^0.5.1'
        },
        obj: {
          foo: 1,
          bar: 2
        },
        null: null
      }).then(() => {
        return getJson(filename)
      }).then(data => {
        json = data
      })
    })

    it('should add a property that is missing', () => {
      expect(json.foo).toBe('bar')
      expect(json.obj.foo).toBe(1)
      expect(json.obj.bar).toBe(2)
    })

    it('should update existing properties', () => {
      expect(json.name).toBe('new name')
    })

    it('should not change other properties', () => {
      expect(json.version).toBe('0.1.0')
    })

    it('should merge subproperties', () => {
      expect(json.dependencies.extend).toBeDefined()
      expect(json.dependencies.mkdirp).toBeDefined()
    })

    it('should work with null values', () => {
      expect(json.null).toBe(null)
    })
  })

  describe('updateJsonProperty', () => {
    let filename
    let json

    beforeEach(() => {
      filename = join(folder, 'package.json')
      return updateJsonProperty(filename, 'name', 'new name').then(() => {
        return updateJsonProperty(filename, 'foo', 'bar')
      }).then(() => {
        return getJson(filename)
      }).then(data => {
        json = data
      })
    })

    it('should add a property that is missing', () => {
      expect(json.foo).toBe('bar')
    })

    it('should update existing properties', () => {
      expect(json.name).toBe('new name')
    })

    it('should not change other properties', () => {
      expect(json.version).toBe('0.1.0')
    })
  })
})
