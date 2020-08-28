import { gitChunk } from './chunks/git'
import { dockerChunk } from './chunks/docker'
import { timestampChunk } from './chunks/timestamp'
import { TStampContext, TStampEnv, TStampOptions } from './interfaces'
import { writeFile, log } from './output'
import { defaultEnv } from './constants'

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

export const write = (
  opts: TStampOptions,
  env: TStampEnv = defaultEnv
) => writeFile(create(opts, env), opts, env)

export const print = (
  opts: TStampOptions,
  env: TStampEnv = defaultEnv
) => log(create(opts, env), opts)

export const execute = (
  opts: TStampOptions,
  env: TStampEnv = defaultEnv
) => {
  if (!env.SEP) {
    throw new Error('You need to specify path separator in SEP environment variable')
  }
  if (opts.out) {
    write(opts, env)
  } else {
    print(opts, env)
  }
}
