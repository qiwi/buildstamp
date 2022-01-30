import fs from 'fs'
import p from 'path'

import { defaultFilename } from '../constants'
import { hasTrailingSeparator } from '../utils'

export const resolveFilePath = (path: string, sep: string): string => {
  if (hasTrailingSeparator(path, sep)) {
    fs.mkdirSync(path, { recursive: true })

    return p.join(path, defaultFilename)
  }

  const segments = path.split(sep)

  if (segments.length === 1) {
    return path
  }

  const lastIndex = segments.length - 1
  const directoryPath = segments.slice(0, lastIndex).join(sep)
  fs.mkdirSync(directoryPath, { recursive: true })

  return p.join(directoryPath, segments[lastIndex])
}
