import { TStampChunk } from '../interfaces'

export const normalizeChunk: TStampChunk = (ctx, _env) => {
  const env = _env || process.env

  return {
    options: ctx.options,
    env,
    stamp: {},
  } as typeof ctx
}
