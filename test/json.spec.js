const { join } = require('path')
const { addFixtures, createTempFolder } = require('./helpers/fixture')
const { addJsonIfMissing, getJson, updateJsonProperties, updateJsonProperty } = require('../lib/json')

describe('JSON routines', () => {
  let folder

  beforeEach(() => {
    folder = createTempFolder()
    addFixtures(folder, 'package.json')
  })

  describe('addJsonIfMissing', () => {
    let filename
    let json

    beforeEach(async () => {
      filename = join(folder, 'package.json')
      await addJsonIfMissing(filename, {
        name: 'new name',
        foo: 'bar'
      })
      json = await getJson(filename)
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
    it('should return the parsed JSON of a file', async () =>{
      json = await getJson(join(folder, 'package.json'))
      expect(json.name).toBe('foobar')
      expect(json.version).toBe('1.0.0')
    })
  })

  describe('updateJsonProperties', () => {
    let filename
    let json

    beforeEach(async () => {
      filename = join(folder, 'package.json')
      await updateJsonProperties(filename, {
        name: 'new name',
        foo: 'bar',
        dependencies: {
          mkdirp: '^0.5.1',
        }
      })
      json = await getJson(filename)
    })

    it('should add a property that is missing', () => {
      expect(json.foo).toBe('bar')
    })

    it('should update existing properties', () => {
      expect(json.name).toBe('new name')
    })

    it('should not change other properties', () => {
      expect(json.version).toBe('1.0.0')
    })

    it('should merge subproperties', () => {
      expect(json.dependencies.extend).toBeDefined()
      expect(json.dependencies.mkdirp).toBeDefined()
    })
  })

  describe('updateJsonProperty', () => {
    let filename
    let json

    beforeEach(async () => {
      filename = join(folder, 'package.json')
      await updateJsonProperty(filename, 'name', 'new name')
      await updateJsonProperty(filename, 'foo', 'bar')
      json = await getJson(filename)
    })

    it('should add a property that is missing', () => {
      expect(json.foo).toBe('bar')
    })

    it('should update existing properties', () => {
      expect(json.name).toBe('new name')
    })

    it('should not change other properties', () => {
      expect(json.version).toBe('1.0.0')
    })
  })
})
