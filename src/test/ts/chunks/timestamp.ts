import { timestampChunk } from '../../../main/ts/chunks/timestamp'
import { TStampContext, TStampOptions } from '../../../main/ts'
import * as generators from '../../../main/ts/generators'

type TTestCase = {
  description: string
  input: TStampContext
  opts: Omit<TStampOptions, 'cwd'>
  output: TStampContext
  currentTimestamp?: number
}

const opts: TStampOptions = {
  cwd: process.cwd(),
}

const cases: Array<TTestCase> = [
  {
    description: 'appends date as ISO string for corresponding format when value is given',
    input: {
      foo: 'foo',
    },
    opts: {
      date: {
        format: 'iso',
        value: 1598428388395,
      },
    },
    output: {
      foo: 'foo',
      date: '2020-08-26T07:53:08.395Z',
    },
  },
  {
    description: 'appends date as instant for appropriate format when value is given',
    input: {
      foo: 'foo',
    },
    opts: {
      date: {
        format: 'instant',
        value: 1598428388395,
      },
    },
    output: {
      foo: 'foo',
      date: 1598428388395,
    },
  },
  {
    description: 'appends current date as instant for appropriate format when value is not given',
    input: {
      foo: 'foo',
    },
    opts: {
      date: {
        format: 'instant',
      },
    },
    output: {
      foo: 'foo',
      date: 1598428388395,
    },
    currentTimestamp: 1598428388395,
  },
  {
    description: 'appends current date as ISO string for appropriate format when value is not given',
    input: {
      foo: 'foo',
    },
    opts: {
      date: {
        format: 'iso',
      },
    },
    output: {
      foo: 'foo',
      date: '2020-08-26T07:53:08.395Z',
    },
    currentTimestamp: 1598428388395,
  },
]

describe('timestampChunk', () => {
  it('returns properly context value', () => {
    const ctx = {}
    expect(timestampChunk(ctx, opts, process.env)).toEqual(ctx)
  })

  it('returns context as is if options are not passed', () => {
    const ctx = {}
    expect(timestampChunk(ctx, opts, process.env)).toEqual(ctx)
  })

  cases.forEach(({ description, input, opts, output, currentTimestamp }) => {
    it(description, () => {
      if (currentTimestamp) {
        jest.spyOn(generators, 'now').mockImplementation(() => currentTimestamp)
      }
      expect(timestampChunk(input, { ...opts, cwd: process.cwd() }, process.env)).toEqual(output)
    })
  })
})
