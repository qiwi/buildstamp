import { TStampChunk } from '../interfaces'
import { now } from '../generators'

export const timestampChunk: TStampChunk = (ctx, opts) => {
  if (!opts.date) {
    return ctx
  }
  const value = new Date(opts.date.value || now())
  const timestamp = opts.date.format === 'iso' ? value.toISOString() : value.getTime()
  return { ...ctx, timestamp }
}
