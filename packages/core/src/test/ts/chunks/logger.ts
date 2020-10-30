import { TChunkContext } from '../../../main/ts'
import { loggerChunk } from '../../../main/ts/chunks'

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
    expect(logSpy).toHaveBeenCalledWith(ctx.stamp)
  })
})
