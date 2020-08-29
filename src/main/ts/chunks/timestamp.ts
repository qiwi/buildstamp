import { TStampChunk } from '../interfaces'
import { now } from '../generators'

export const timestampChunk: TStampChunk = (ctx, opts) => {
  if (!opts.date) {
    return ctx
  }
  const value = new Date(opts.date.value || now())
  const date = opts.date.format === 'instant' ? value.getTime() : value.toISOString()
  return { ...ctx, date }
}
