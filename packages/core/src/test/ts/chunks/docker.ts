import { TDockerDetails, TStampOptions } from '../../../main/ts'
import { dockerChunk } from '../../../main/ts/chunks/docker'

describe('docker', () => {
  it('returns properly context value if options are not passed', () => {
    const ctx = {}
    expect(dockerChunk(ctx)).toEqual(ctx)
  })

  it('returns context with image tag when it is given in options', () => {
    const docker: TDockerDetails = {
      imageTag: 'bar',
    }
    const options: TStampOptions = {
      docker,
    }
    expect(dockerChunk({ options })).toEqual({ options, stamp: { docker } })
  })
})
