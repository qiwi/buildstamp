import { defaultJsonSpace, spaceTypes } from '../constants'
import { TStampChunk } from '../interfaces'
import { formatOutput } from '../utils'

export const loggerChunk: TStampChunk = (ctx) => {
  if (ctx.stamp) {
    const jsonSpace = ctx.options?.out?.jsonSeparator
    console.log(formatOutput(ctx.stamp, spaceTypes[jsonSpace || defaultJsonSpace]))
  }

  return ctx
}
