import fs from 'fs'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'

import { defaultFilename } from '../../../main/ts/constants'
import { resolveFilePath } from '../../../main/ts/output/pathResolver'

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
    expect(resolveFilePath(path, '/')).toEqual(`${path}${defaultFilename}`)
  })

  it('creates intermediate directories and returns full path when given path with file name', () => {
    const fullPath = `${path}foo/bar/baz.json`
    expect(resolveFilePath(fullPath, '/'))
      .toEqual(fullPath)
    expect(fs.lstatSync(`${path}/foo/bar`).isDirectory()).toEqual(true)
    expect(fs.existsSync(fullPath)).toEqual(false)
  })

  it('creates intermediate directories and returns full path when given path without file name', () => {
    const fullPath = `${path}foo/baz/buildstamp.json`
    expect(resolveFilePath(`${path}foo/baz/`, '/'))
      .toEqual(fullPath)
    expect(fs.lstatSync(`${path}/foo/baz`).isDirectory()).toEqual(true)
    expect(fs.existsSync(fullPath)).toEqual(false)
  })
})
