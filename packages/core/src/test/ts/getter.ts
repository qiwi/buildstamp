import { jest } from '@jest/globals'
import fs from 'node:fs'

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

const readFileSpy = jest.spyOn(fs, 'readFileSync')

afterAll(jest.resetAllMocks)

describe('readBuildstamp', () => {
  it('reads and parses file', () => {
    readFileSpy.mockImplementationOnce(() => JSON.stringify(stamp))
    expect(readBuildstamp('some/path')).toEqual(stamp)
  })

  it('logs an error', () => {
    readFileSpy
      .mockImplementation(() => {
        throw new Error('foo')
      })
    const errorSpy = jest.spyOn(console, 'error')

    expect(readBuildstamp('some/path')).toBeUndefined()
    expect(errorSpy).toHaveBeenCalledWith('Buildstamp reading error:', 'foo')
  })
})
