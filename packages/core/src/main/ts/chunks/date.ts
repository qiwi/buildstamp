import { now } from '../generators'
import { TStampChunk } from '../interfaces'

export const dateChunk: TStampChunk = (ctx) => {
  const { options, stamp } = ctx

  if (!options || !options.date) {
    return ctx
  }

  const value = new Date(options.date.value || now())
  const date = options.date.format === 'instant'
    ? value.getTime()
    : value.toISOString()

  return {
    ...ctx,
    stamp: {
      ...stamp,
      date,
    },
  }
}
