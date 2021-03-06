import { mkdirSync } from 'fs'
import { join } from 'path'

import { defaultFilename } from '../constants'
import { hasTrailingSeparator } from '../utils'

export const resolveFilePath = (path: string, sep: string): string => {
  if (hasTrailingSeparator(path, sep)) {
    mkdirSync(path, { recursive: true })

    return join(path, defaultFilename)
  }

  const segments = path.split(sep)

  if (segments.length === 1) {
    return path
  }

  const lastIndex = segments.length - 1
  const directoryPath = segments.slice(0, lastIndex).join(sep)
  mkdirSync(directoryPath, { recursive: true })

  return join(directoryPath, segments[lastIndex])
}
