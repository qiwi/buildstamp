import * as fs from 'node:fs'
import { rmSync, mkdirSync } from 'node:fs'

import { defaultFilename } from '../../../main/ts/constants'
import { resolveFilePath } from '../../../main/ts/output/pathResolver'

const root = 'temp'
const path = `${root}/test/`

beforeAll(() => mkdirSync(path, {recursive: true}))

afterAll(() => rmSync(root, {recursive: true}))

describe('resolveFilePath', () => {
  it('is properly exported', () => expect(resolveFilePath).toBeDefined())

  it('returns path with default filename when it refers to a directory', () => {
    expect(resolveFilePath(path, '/')).toEqual(`${path}${defaultFilename}`)
  })

  it('just returns filename', () => {
    expect(resolveFilePath('filename.json', '/')).toEqual('filename.json')
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
