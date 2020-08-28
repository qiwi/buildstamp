import { gitChunk } from './chunks/git'
import { dockerChunk } from './chunks/docker'
import { timestampChunk } from './chunks/timestamp'
import { TStampContext, TStampEnv, TStampOptions } from './interfaces'
import { writeFile, log } from './output'

export const chunks = [
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
  return chunks.reduce((ctx, chunk) => chunk(ctx, normalizedOpts, env), {})
}

export const write = (
  opts: TStampOptions,
  env: TStampEnv
) => writeFile(create(opts, env), opts)

export const print = (
  opts: TStampOptions,
  env: TStampEnv
) => log(create(opts, env), opts)

export const execute = (
  opts: TStampOptions,
  env: TStampEnv
) => {
  if (opts.out) {
    write(opts, env)
  } else {
    print(opts, env)
  }
}
