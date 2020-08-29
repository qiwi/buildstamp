import * as gitModule from '../../../main/ts/chunks/git'
import { gitChunk, getGitInfo } from '../../../main/ts/chunks/git'
import { TGitDetails, TStampOptions } from '../../../main/ts'

const ctx = {
  foo: 'foo',
}

describe('getGitInfo', () => {
  it('is properly exported', () => {
    expect(getGitInfo).toBeDefined()
  })

  it('returns correct git info', () => {
    const data = getGitInfo({ cwd: process.cwd() }, process.env)

    expect(data.commitId).toMatch(/^[\dA-Fa-f]{40}/)
    expect(data.repoName).toBe('qiwi/buildstamp')
    expect(data.repoUrl).toMatch(/qiwi\/buildstamp\.git$/)
  })
})

describe('gitChunk', () => {
  afterAll(jest.clearAllMocks)

  it('returns properly context value if options are not passed', () => {
    const opts: TStampOptions = {
      cwd: process.cwd(),
    }
    expect(gitChunk(ctx, opts, process.env)).toEqual(ctx)
  })

  it('appends gitDetails to context', () => {
    const opts: TStampOptions = {
      git: true,
      cwd: process.cwd(),
    }
    const git: TGitDetails = {
      commitId: 'bar',
      repoName: 'baz',
      repoUrl: 'qux',
    }
    jest.spyOn(gitModule, 'getGitInfo').mockImplementation(() => git)
    expect(gitChunk(ctx, opts, process.env)).toEqual({ foo: 'foo', git })
  })
})
