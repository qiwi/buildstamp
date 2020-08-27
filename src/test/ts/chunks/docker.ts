import { dockerChunk } from '../../../main/ts/chunks/docker'
import { TDockerDetails, TStampOptions } from '../../../main/ts'
import { defaultEnv } from '../../../main/ts/constants'

const ctx = {
  foo: 'foo',
}

const opts: TStampOptions = {
  git: true,
  cwd: process.cwd(),
}

describe('docker', () => {
  it('returns properly context value if options are not passed', () => {
    expect(dockerChunk(ctx, opts, defaultEnv)).toEqual(ctx)
  })

  it('returns context with image tag when it is given in options', () => {
    const dockerInfo: TDockerDetails = {
      imageTag: 'bar',
    }
    const opts: TStampOptions = {
      docker: dockerInfo,
      cwd: process.cwd(),
    }
    expect(dockerChunk(ctx, opts, defaultEnv)).toEqual({ ...ctx, dockerInfo })
  })
})
