import fs from 'fs'
import rimraf from 'rimraf'
import { write } from '../../../main/ts/output/writer'
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

describe('writer', () => {
  it('is properly exported', () => expect(write).toBeDefined())

  it('prints info to stdout when out is not defined', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => undefined)

    write(ctx, { cwd: process.cwd() }, defaultEnv)

    expect(log).toHaveBeenCalledWith(output)
  })

  it('prints info to file when out is defined', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined)
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => undefined)
    const opts: TStampOptions = {
      cwd: process.cwd(),
      out: 'some/path/buildstamp.json',
    }

    write(ctx, opts, defaultEnv)

    expect(writeFileSyncSpy).toHaveBeenCalledWith('some/path/buildstamp.json', output)
    expect(logSpy).toHaveBeenCalled()
  })

  it('logs write error', () => {
    const writeError = new Error('write error')
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined)
    const opts: TStampOptions = {
      cwd: process.cwd(),
      out: 'some/path/buildstamp.json',
    }
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw writeError
    })

    write(ctx, opts, defaultEnv)

    expect(logSpy).toHaveBeenCalledWith(writeError)
  })
})
