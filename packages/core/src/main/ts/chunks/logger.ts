import { defaultJsonSpace, spaceTypes } from '../constants'
import { TStampChunk } from '../interfaces'
import { formatOutput } from '../utils'

export const loggerChunk: TStampChunk = (ctx) => {
  if (ctx.stamp) {
    console.log(formatOutput(ctx.stamp, spaceTypes[defaultJsonSpace]))
  }

  return ctx
}
