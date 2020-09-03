import { TStampChunk } from '../interfaces'

export const writerChunk: TStampChunk = (ctx) => {
  const out = ctx?.options?.out

  if (out) {
    // ...
  }

  return ctx
}
