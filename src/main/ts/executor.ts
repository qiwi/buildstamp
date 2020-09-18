import { normalizeChunk } from './chunks/normalize'
import { gitChunk } from './chunks/git'
import { dockerChunk } from './chunks/docker'
import { dateChunk } from './chunks/date'
import { loggerChunk } from './chunks/logger'
import { writerChunk } from './chunks/writer'
import { TStamp, TEnv, TStampOptions } from './interfaces'

export const chunks = [
  normalizeChunk,
  gitChunk,
  dockerChunk,
  dateChunk,
  loggerChunk,
  writerChunk,
]

export const execute = (
  options: TStampOptions,
  env: TEnv = process.env
): TStamp =>
  chunks.reduce((ctx, chunk) => chunk(ctx, env), { options, stamp: {} }).stamp
