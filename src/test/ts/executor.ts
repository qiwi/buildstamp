import { TStampEnv, TStampOptions } from '../../main/ts'
import * as executor from '../../main/ts/executor'
import * as writer from '../../main/ts/output/writer'
import { defaultEnv } from '../../main/ts/constants'
import * as generators from '../../main/ts/generators'

const { create, print } = executor

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
      timestamp: currentTimestamp,
      dockerInfo: {
        imageTag: 'bar',
      },
      gitInfo: {
        repoName: 'qiwi/buildstamp.git',
      },
    }
    expect(create({ ...input, cwd: process.cwd() } as TStampOptions, defaultEnv)).toMatchObject(output)
    expect(create(input as TStampOptions, defaultEnv)).toMatchObject(output)
  })
})

describe('print', () => {
  it('is properly exported', () => {
    expect(print).toBeDefined()
  })

  it('throws an error when SEP is not defined', () => {
    expect(() => print(opts, {} as TStampEnv))
      .toThrowError('You need to specify path separator in SEP environment variable')
  })

  it('calls create and write', () => {
    const createSpy = jest.spyOn(executor, 'create').mockImplementation(() => ({}))
    const writeSpy = jest.spyOn(writer, 'write').mockImplementation(() => undefined)
    print(opts, defaultEnv)
    expect(createSpy).toHaveBeenCalledWith(opts, defaultEnv)
    expect(writeSpy).toHaveBeenCalled()
  })
})
