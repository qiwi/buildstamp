import fs from 'fs'
import { TStampContext, TStampEnv, TStampOptions } from '../interfaces'
import { resolveFilePath } from './pathResolver'

export const write = (
  ctx: TStampContext,
  opts: TStampOptions,
  env: TStampEnv
) => {
  const { out } = opts
  const body = JSON.stringify(
    ctx,
    null,
    opts.jsonSpace || '\t'
  )

  try {
    if (out) {
      const filePath = resolveFilePath(out, env.SEP)
      fs.writeFileSync(filePath, body)
      console.log('build-info.json was created')
    } else {
      console.log(body)
    }
  } catch (e) {
    console.log(e)
  }
}
