import fs from 'fs'
import { sep } from 'path'
import { TStampContext, TStampOptions } from '../interfaces'
import { resolveFilePath } from './pathResolver'
import { formatOutput } from '../utils'
import { defaultJsonSpace } from '../constants'

export const writeFile = (
  ctx: TStampContext,
  opts: TStampOptions
) => {
  const { out } = opts
  if (!out) {
    throw new Error('Output path is not specified')
  }

  const body = formatOutput(
    ctx,
    opts.jsonSpace || defaultJsonSpace
  )

  try {
    const filePath = resolveFilePath(out, sep)
    fs.writeFileSync(filePath, body)
    console.log('build-info.json was created')
  } catch (e) {
    console.log(e)
  }
}
