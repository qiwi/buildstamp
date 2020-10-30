import { dateChunk } from './chunks/date'
import { dockerChunk } from './chunks/docker'
import { gitChunk } from './chunks/git'
import { loggerChunk } from './chunks/logger'
import { normalizeChunk } from './chunks/normalize'
import { writerChunk } from './chunks/writer'
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
