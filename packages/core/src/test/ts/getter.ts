import { jest } from '@jest/globals'
import fs from 'fs'

import { readBuildstamp, TStamp } from '../../main/ts'

const stamp: TStamp = {
  git: {
    commitId: 'foo',
    repoName: 'bar',
    repoUrl: 'baz',
  },
  date: 0,
  docker: {
    imageTag: 'bat',
  },
}

describe('readBuildstamp', () => {
  it('reads and parses file', () => {
    jest.spyOn(fs, 'readFileSync')
      .mockImplementation(() => JSON.stringify(stamp))
    expect(readBuildstamp('some/path')).toEqual(stamp)
  })

  it('logs an error', () => {
    jest.spyOn(fs, 'readFileSync')
      .mockImplementation(() => {
        throw new Error('foo')
      })
    const errorSpy = jest.spyOn(console, 'error')
      .mockImplementation(() => { /* noop */ })
    expect(readBuildstamp('some/path')).toBeUndefined()
    expect(errorSpy).toHaveBeenCalled()
  })

  afterAll(jest.resetAllMocks)
})
