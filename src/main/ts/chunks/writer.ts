import { TStampChunk } from '../interfaces'
import { formatOutput } from '../utils'
import { defaultJsonSpace } from '../constants'
import { resolveFilePath } from '../output/pathResolver'
import { sep } from 'path'
import { writeFileSync } from 'fs'

const spaceTypes = {
  tab: '\t',
  space: ' ',
  'double-space': '  ',
}

export const writerChunk: TStampChunk = (ctx) => {
  const out = ctx?.options?.out

  if (out && ctx.stamp) {
    const { path, jsonSeparator } = out

    const body = formatOutput(
      ctx.stamp,
      spaceTypes[jsonSeparator || defaultJsonSpace]
    )

    try {
      const filePath = resolveFilePath(path, sep)
      writeFileSync(filePath, body)
      console.log(`Buildstamp has been written to ${filePath}`)
    } catch (e) {
      console.log(e)
    }
  }

  return ctx
}
