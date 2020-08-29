import { TStampOptions } from '../../main/ts'
import * as executor from '../../main/ts/executor'
import * as writer from '../../main/ts/output/writer'
import * as logger from '../../main/ts/output/logger'
import * as generators from '../../main/ts/generators'

const { create, execute, write, print } = executor

const opts = {
  cwd: process.cwd(),
}

describe('create', () => {
  it('is properly exported', () => {
    expect(create).toBeDefined()
  })

  it('uses default chunks', () => {
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
    expect(create({ ...input, cwd: process.cwd() } as TStampOptions, process.env)).toMatchObject(output)
    expect(create(input as TStampOptions, process.env)).toMatchObject(output)
  })
})

describe('execute', () => {
  it('is properly exported', () => {
    expect(execute).toBeDefined()
  })

  it('calls create and writeFile when out is given', () => {
    const createSpy = jest.spyOn(executor, 'create').mockImplementation(() => ({}))
    const writeSpy = jest.spyOn(writer, 'writeFile').mockImplementation(() => undefined)
    const opts = {
      cwd: process.cwd(),
      out: 'some/path',
    }
    execute(opts, process.env)
    expect(createSpy).toHaveBeenCalledWith(opts, process.env)
    expect(writeSpy).toHaveBeenCalled()
  })

  it('calls create and log when out is not given', () => {
    const createSpy = jest.spyOn(executor, 'create').mockImplementation(() => ({}))
    const loggerSpy = jest.spyOn(logger, 'log').mockImplementation(() => undefined)
    execute(opts, process.env)
    expect(createSpy).toHaveBeenCalledWith(opts, process.env)
    expect(loggerSpy).toHaveBeenCalled()
  })
})

describe('write', () => {
  it('is properly exported', () => expect(write).toBeDefined())

  it('calls writeFile', () => {
    const writeFileSpy = jest.spyOn(writer, 'writeFile').mockImplementation(() => undefined)
    write(opts, process.env)
    expect(writeFileSpy).toHaveBeenCalled()
  })
})

describe('print', () => {
  it('is properly exported', () => expect(print).toBeDefined())

  it('calls log', () => {
    const logSpy = jest.spyOn(logger, 'log').mockImplementation(() => undefined)
    print(opts, process.env)
    expect(logSpy).toHaveBeenCalled()
  })
})
