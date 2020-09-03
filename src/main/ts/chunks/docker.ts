import { TStampChunk } from '../interfaces'

export type IDockerStampOptions = {
  imageTag?: string
}

export type TDockerStamp = IDockerStampOptions

export const dockerChunk: TStampChunk = (ctx) => {
  const { options, stamp } = ctx

  if (!options.docker) {
    return ctx
  }

  return {
    ...ctx,
    stamp: {
      ...stamp, docker: options.docker,
    },
  }
}
