import { TStampChunk } from '../interfaces'

export const loggerChunk: TStampChunk = (ctx) => {
  if (ctx.stamp) {
    console.log(ctx.stamp)
  }

  return ctx
}
