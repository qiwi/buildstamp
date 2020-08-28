import { TStampChunk } from '../interfaces'

export const dockerChunk: TStampChunk = (ctx, opts) => {
  if (!opts.docker) {
    return ctx
  }

  return { ...ctx, docker: opts.docker }
}
