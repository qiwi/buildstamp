import { TStampEnv, TStampOptions } from '../../main/ts'
import * as executor from '../../main/ts/executor'
import * as writer from '../../main/ts/output/writer'
import * as logger from '../../main/ts/output/logger'
import { defaultEnv } from '../../main/ts/constants'
import * as generators from '../../main/ts/generators'

const { create, execute, write, print } = executor

const opts = {
  cwd: process.cwd(),
}

describe('create', () => {
  it('is properly exported', () => {
    expect(create).toBeDefined()
  })

  it('uses default pipeline', () => {
    const currentTimestamp = Date.now()
    jest.spyOn(generators, 'now').mockImplementation(() => currentTimestamp)
    const input = {
      git: true,
      docker: { imageTag: 'bar' },
      date: { format: 'instant' },
    }
    const output = {
      date: currentTimestamp,
      docker: {
        imageTag: 'bar',
      },
      git: {
        repoName: 'qiwi/buildstamp.git',
      },
    }
    expect(create({ ...input, cwd: process.cwd() } as TStampOptions, defaultEnv)).toMatchObject(output)
    expect(create(input as TStampOptions, defaultEnv)).toMatchObject(output)
  })
})

describe('execute', () => {
  it('is properly exported', () => {
    expect(execute).toBeDefined()
  })

  it('throws an error when SEP is not defined', () => {
    expect(() => execute(opts, {} as TStampEnv))
      .toThrowError('You need to specify path separator in SEP environment variable')
  })

  it('calls create and writeFile when out is given', () => {
    const createSpy = jest.spyOn(executor, 'create').mockImplementation(() => ({}))
    const writeSpy = jest.spyOn(writer, 'writeFile').mockImplementation(() => undefined)
    const opts = {
      cwd: process.cwd(),
      out: 'some/path',
    }
    execute(opts, defaultEnv)
    expect(createSpy).toHaveBeenCalledWith(opts, defaultEnv)
    expect(writeSpy).toHaveBeenCalled()

    execute(opts)
    expect(createSpy).toHaveBeenCalledWith(opts, defaultEnv)
    expect(writeSpy).toHaveBeenCalled()
  })

  it('calls create and log when out is not given', () => {
    const createSpy = jest.spyOn(executor, 'create').mockImplementation(() => ({}))
    const loggerSpy = jest.spyOn(logger, 'log').mockImplementation(() => undefined)
    execute(opts, defaultEnv)
    expect(createSpy).toHaveBeenCalledWith(opts, defaultEnv)
    expect(loggerSpy).toHaveBeenCalled()

    execute(opts)
    expect(createSpy).toHaveBeenCalledWith(opts, defaultEnv)
    expect(loggerSpy).toHaveBeenCalled()
  })
})

describe('write', () => {
  it('is properly exported', () => expect(write).toBeDefined())

  it('calls writeFile', () => {
    const writeFileSpy = jest.spyOn(writer, 'writeFile').mockImplementation(() => undefined)
    write(opts, defaultEnv)
    expect(writeFileSpy).toHaveBeenCalled()

    write(opts)
    expect(writeFileSpy).toHaveBeenCalled()
  })
})

describe('print', () => {
  it('is properly exported', () => expect(print).toBeDefined())

  it('calls log', () => {
    const logSpy = jest.spyOn(logger, 'log').mockImplementation(() => undefined)
    print(opts, defaultEnv)
    expect(logSpy).toHaveBeenCalled()

    print(opts)
    expect(logSpy).toHaveBeenCalled()
  })
})
