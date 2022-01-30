import { jest } from '@jest/globals'

import { TChunkContext } from '../../../main/ts'
import { loggerChunk } from '../../../main/ts/chunks'
import { defaultJsonSpace, spaceTypes } from '../../../main/ts/constants'
import { formatOutput } from '../../../main/ts/utils'

describe('logger', () => {
  it('returns properly context value if options are not passed', () => {
    const ctx = {}
    expect(loggerChunk(ctx)).toEqual(ctx)
  })

  it('calls console.log when stamp is given', () => {
    const logSpy = jest.spyOn(console, 'log')
      .mockImplementation(() => { /* noop */ })
    const ctx: TChunkContext = {
      stamp: {
        docker: {
          imageTag: 'foo',
        },
      },
    }
    loggerChunk(ctx)
    expect(logSpy).toHaveBeenCalledWith(formatOutput(ctx.stamp, spaceTypes[defaultJsonSpace]))
  })
})
