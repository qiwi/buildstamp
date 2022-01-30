import {
  dateChunk,
  dockerChunk,
  gitChunk,
  loggerChunk,
  normalizeChunk,
  writerChunk,
} from './chunks'
import { TEnv, TStamp, TStampChunk, TStampOptions } from './interfaces'

export const chunks: TStampChunk[] = [
  normalizeChunk,
  gitChunk,
  dockerChunk,
  dateChunk,
  loggerChunk,
  writerChunk,
]

export const execute = (
  options: TStampOptions,
  env: TEnv = process.env,
): TStamp =>
  chunks.reduce((ctx, chunk) => chunk(ctx, env), { options, stamp: {} }).stamp

export default { chunks, execute }
