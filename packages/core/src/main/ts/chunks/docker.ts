import { TStampChunk } from '../interfaces'

export const dockerChunk: TStampChunk = (ctx) => {
  const { options, stamp } = ctx

  if (!options || !options.docker) {
    return ctx
  }

  return {
    ...ctx,
    stamp: {
      ...stamp, docker: options.docker,
    },
  }
}
