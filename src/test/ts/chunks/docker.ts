import { dockerChunk } from '../../../main/ts/chunks/docker'
import { TDockerDetails, TStampOptions } from '../../../main/ts'

const ctx = {
  foo: 'foo',
}

const opts: TStampOptions = {
  git: true,
  cwd: process.cwd(),
}

describe('docker', () => {
  it('returns properly context value if options are not passed', () => {
    expect(dockerChunk(ctx, opts, process.env)).toEqual(ctx)
  })

  it('returns context with image tag when it is given in options', () => {
    const docker: TDockerDetails = {
      imageTag: 'bar',
    }
    const opts: TStampOptions = {
      docker,
      cwd: process.cwd(),
    }
    expect(dockerChunk(ctx, opts, process.env)).toEqual({ ...ctx, docker })
  })
})
