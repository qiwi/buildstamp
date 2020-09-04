import { normalizeChunk } from '../../../main/ts/chunks'

describe('normalize', () => {
  it('returns properly context value if options are not passed', () => {
    const ctx = {}
    expect(normalizeChunk(ctx)).toEqual({
      env: process.env,
      stamp: {},
    })
  })

  it('returns properly context value if options are not passed', () => {
    const env = {
      bar: 'bar',
    }
    const ctx = {
      options: {
        foo: 'foo',
      },
    }
    expect(normalizeChunk(ctx, env)).toEqual({
      ...ctx,
      env,
      stamp: {},
    })
  })
})
