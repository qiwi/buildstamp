import fs from 'fs'
import { TStampContext, TStampEnv, TStampOptions } from '../interfaces'
import { resolveFilePath } from './pathResolver'
import { formatOutput } from '../utils'

export const writeFile = (
  ctx: TStampContext,
  opts: TStampOptions,
  env: TStampEnv
) => {
  const { out } = opts
  if (!out) {
    throw new Error('Output path is not specified')
  }

  const body = formatOutput(
    ctx,
    opts.jsonSpace || '\t'
  )

  try {
    const filePath = resolveFilePath(out, env.SEP)
    fs.writeFileSync(filePath, body)
    console.log('build-info.json was created')
  } catch (e) {
    console.log(e)
  }
}
