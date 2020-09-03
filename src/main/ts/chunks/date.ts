import { TStampChunk } from '../interfaces'
import { now } from '../generators'

export type IDateStampOptions = {
  format: 'iso' | 'instant'
  value?: string | number
}

export type TDateStamp = string | number

export const dateChunk: TStampChunk = (ctx) => {
  const { options, stamp } = ctx

  if (!options.date) {
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
