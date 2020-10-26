import { readBuildstamp, TStamp } from '../../main/ts'
import * as utils from '../../main/ts/utils'

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
    jest.spyOn(utils, 'readFileToString')
      .mockImplementation(() => JSON.stringify(stamp))
    expect(readBuildstamp('some/path')).toEqual(stamp)
  })

  it('logs an error', () => {
    jest.spyOn(utils, 'readFileToString')
      .mockImplementation(() => {
        throw new Error('foo')
      })
    const errorSpy = jest.spyOn(console, 'error')
      .mockImplementation(() => { /* noop */ })
    expect(readBuildstamp('some/path')).toBeUndefined()
    expect(errorSpy).toHaveBeenCalled()
  })
})
