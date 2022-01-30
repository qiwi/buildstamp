import fs from 'fs'
import { sep } from 'path'

import { defaultJsonSpace, spaceTypes } from '../constants'
import { TStampChunk } from '../interfaces'
import { resolveFilePath } from '../output/pathResolver'
import { formatOutput } from '../utils'

export const writerChunk: TStampChunk = (ctx) => {
  const out = ctx?.options?.out

  if (out && ctx.stamp && out.path) {
    const { path, jsonSeparator } = out

    const body = formatOutput(
      ctx.stamp,
      spaceTypes[jsonSeparator || defaultJsonSpace],
    )

    try {
      const filePath = resolveFilePath(path, sep)
      fs.writeFileSync(filePath, body)
      console.log(`Buildstamp has been written to ${filePath}`)
    } catch (e) {
      console.error(e)
    }
  }

  return ctx
}
