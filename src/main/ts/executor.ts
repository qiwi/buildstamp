import { gitChunk } from './chunks/git'
import { dockerChunk } from './chunks/docker'
import { timestampChunk } from './chunks/timestamp'
import { TStampContext, TStampEnv, TStampOptions } from './interfaces'
import { write } from './output/writer'

export const pipeline = [
  gitChunk,
  dockerChunk,
  timestampChunk,
]

export const create = (
  opts: TStampOptions,
  env: TStampEnv
): TStampContext => {
  const normalizedOpts = { ...opts }
  normalizedOpts.cwd = normalizedOpts.cwd || process.cwd()
  return pipeline.reduce((ctx, chunk) => chunk(ctx, normalizedOpts, env), {})
}

export const print = (
  opts: TStampOptions,
  env: TStampEnv
) => {
  if (!env.SEP) {
    throw new Error('You need to specify path separator in SEP environment variable')
  }
  const stamp = create(opts, env)
  write(stamp, opts, env)
}
