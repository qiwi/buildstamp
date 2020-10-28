import { dateChunk } from '../../../main/ts/chunks/date'
import { TChunkContext, TStamp } from '../../../main/ts'
import * as generators from '../../../main/ts/generators'

type TTestCase = {
  description: string
  input: TChunkContext
  stamp: TStamp
  currentTimestamp?: number
}

const cases: Array<TTestCase> = [
  {
    description: 'appends date as ISO string for corresponding format when value is given',
    input: {
      options: {
        date: {
          format: 'iso',
          value: 1598428388395,
        },
      },
    },
    stamp: {
      date: '2020-08-26T07:53:08.395Z',
    },
  },
  {
    description: 'appends date as instant for appropriate format when value is given',
    input: {
      options: {
        date: {
          format: 'instant',
          value: 1598428388395,
        },
      },
    },
    stamp: {
      date: 1598428388395,
    },
  },
  {
    description: 'appends current date as instant for appropriate format when value is not given',
    input: {
      options: {
        date: {
          format: 'instant',
        },
      },
    },
    stamp: {
      date: 1598428388395,
    },
    currentTimestamp: 1598428388395,
  },
  {
    description: 'appends current date as ISO string for appropriate format when value is not given',
    input: {
      options: {
        date: {
          format: 'iso',
        },
      },
    },
    stamp: {
      date: '2020-08-26T07:53:08.395Z',
    },
    currentTimestamp: 1598428388395,
  },
]

describe('timestampChunk', () => {
  it('returns properly context value', () => {
    const ctx = {}
    expect(dateChunk(ctx)).toEqual(ctx)
  })

  cases.forEach(({ description, input, stamp, currentTimestamp }) => {
    it(description, () => {
      if (currentTimestamp) {
        jest.spyOn(generators, 'now').mockImplementation(() => currentTimestamp)
      }
      expect(dateChunk(input)).toEqual({ ...input, stamp })
    })
  })
})
