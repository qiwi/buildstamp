import { gitChunk } from '../../../main/ts/chunks/git'
import { TGitDetails, TStampOptions } from '../../../main/ts'
import * as gitInfo from '../../../main/ts/gitInfo'
import { defaultEnv } from '../../../main/ts/constants'

const ctx = {
  foo: 'foo',
}

describe('gitChunk', () => {
  it('returns properly context value if options are not passed', () => {
    const opts: TStampOptions = {
      cwd: process.cwd(),
    }
    expect(gitChunk(ctx, opts, defaultEnv)).toEqual(ctx)
  })

  it('appends gitDetails to context', () => {
    const opts: TStampOptions = {
      git: true,
      cwd: process.cwd(),
    }
    const git: TGitDetails = {
      commitId: 'bar',
      repoName: 'baz',
    }
    jest.spyOn(gitInfo, 'getGitInfo').mockImplementation(() => git)
    expect(gitChunk(ctx, opts, defaultEnv)).toEqual({ foo: 'foo', git })
  })
})
