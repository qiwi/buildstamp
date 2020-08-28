import fs from 'fs'
import rimraf from 'rimraf'
import { writeFile } from '../../../main/ts/output/writer'
import { TStampContext, TStampOptions } from '../../../main/ts'
import { defaultEnv } from '../../../main/ts/constants'

const ctx: TStampContext = {
  gitInfo: {
    commitId: 'foo',
    repoName: 'bar',
  },
  dockerInfo: {
    imageTag: 'baz',
  },
  timestamp: Date.now(),
}

const output = JSON.stringify(
  ctx,
  null,
  '\t'
)

afterAll(() => rimraf.sync('some'))

describe('write', () => {
  it('is properly exported', () => expect(writeFile).toBeDefined())

  it('writes info to file when out is defined', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined)
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => undefined)
    const opts: TStampOptions = {
      cwd: process.cwd(),
      out: 'some/path/buildstamp.json',
    }

    writeFile(ctx, opts, defaultEnv)

    expect(writeFileSyncSpy).toHaveBeenCalledWith('some/path/buildstamp.json', output)
    expect(logSpy).toHaveBeenCalled()
  })

  it('throws an error when out is not defined', () => {
    expect(() => writeFile(ctx, { cwd: process.cwd() }, defaultEnv))
      .toThrowError('Output path is not specified')
  })

  it('logs writeFile error', () => {
    const writeError = new Error('writeFile error')
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined)
    const opts: TStampOptions = {
      cwd: process.cwd(),
      out: 'some/path/buildstamp.json',
    }
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw writeError
    })

    writeFile(ctx, opts, defaultEnv)

    expect(logSpy).toHaveBeenCalledWith(writeError)
  })
})
