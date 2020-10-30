import fs from 'fs'

import { TChunkContext } from '../../../main/ts'
import { writerChunk } from '../../../main/ts/chunks'
import * as pathResolver from '../../../main/ts/output/pathResolver'
import { formatOutput } from '../../../main/ts/utils'

type TInactiveTestCase = {
  description: string,
  ctx?: TChunkContext
}

const inactiveTestCases: TInactiveTestCase[] = [
  {
    description: 'context is not given',
    ctx: undefined,
  },
  {
    description: 'options are not given',
    ctx: {},
  },
  {
    description: 'out option is not given',
    ctx: {
      options: {},
    },
  },
  {
    description: 'stamp is not given',
    ctx: {
      options: {
        out: {
          path: 'foo/bar',
        },
      },
    },
  },
]

describe('writer', () => {
  describe('inactive test cases', () => {
    inactiveTestCases.forEach(testCase => it(`does nothing when ${testCase.description}`, () => {
      const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync')
      expect(writerChunk(testCase.ctx as TChunkContext)).toEqual(testCase.ctx)
      expect(writeFileSyncSpy).not.toHaveBeenCalled()
    }))
  })

  it('logs writeFile error', () => {
    const logSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* noop */ })
    const ctx: TChunkContext = {
      cwd: process.cwd(),
      options: {
        out: {
          path: 'some/path/buildstamp.json',
        },
      },
      stamp: {
      },
    }
    const writeError = new Error('writeFile error')
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw writeError
    })
    jest.spyOn(pathResolver, 'resolveFilePath')
      .mockImplementation(() => 'some/path/buildstamp.json')

    writerChunk(ctx)

    expect(logSpy).toHaveBeenCalledWith(writeError)
  })

  it('writes stamp to file', () => {
    const logSpy = jest.spyOn(console, 'log')
      .mockImplementation(() => { /* noop */ })
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync')
      .mockImplementation(() => { /* noop */ })
    jest.spyOn(pathResolver, 'resolveFilePath')
      .mockImplementation(() => 'some/path/buildstamp.json')
    const ctx = {
      cwd: process.cwd(),
      options: {
        out: {
          path: 'some/path/buildstamp.json',
        },
      },
      stamp: {
      },
    }

    writerChunk(ctx)

    expect(writeFileSyncSpy).toHaveBeenCalledWith(ctx.options.out.path, formatOutput(ctx.stamp, '\t'))
    expect(logSpy).toHaveBeenCalledWith('Buildstamp has been written to some/path/buildstamp.json')
  })
})
