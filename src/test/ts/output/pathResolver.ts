import fs from 'fs'
import mkdirp from 'mkdirp'
import { resolveFilePath } from '../../../main/ts/output/pathResolver'
import { defaultEnv, defaultFilename } from '../../../main/ts/constants'
import rimraf from 'rimraf'

const root = 'temp'
const path = `${root}/test/`

beforeAll(() => {
  mkdirp.sync(path)
})

afterAll(() => {
  rimraf.sync(root)
})

describe('resolveFilePath', () => {
  it('is properly exported', () => expect(resolveFilePath).toBeDefined())

  it('returns path with default filename when it refers to a directory', () => {
    expect(resolveFilePath(path, defaultEnv.SEP)).toEqual(`${path}${defaultFilename}`)
  })

  it('throws an error when path refers to an existing file', () => {
    const filePath = `${path}temp.json`
    fs.writeFileSync(filePath, JSON.stringify({ foo: 'foo ' }))
    expect(() => resolveFilePath(filePath, defaultEnv.SEP))
      .toThrowError(`File ${filePath} already exists`)
  })

  it('throws an error when path with default filename refers to an existing file', () => {
    const filePath = `${path}${defaultFilename}`
    fs.writeFileSync(filePath, JSON.stringify({ foo: 'foo ' }))
    expect(() => resolveFilePath(path, defaultEnv.SEP))
      .toThrowError(`File ${filePath} already exists`)
  })

  it('creates intermediate directories and returns full path', () => {
    const fullPath = `${path}foo/bar/baz.json`
    expect(resolveFilePath(fullPath, defaultEnv.SEP))
      .toEqual(fullPath)
    expect(fs.lstatSync(`${path}/foo/bar`).isDirectory()).toEqual(true)
    expect(fs.existsSync(fullPath)).toEqual(false)
  })
})
