import { mkdirSync } from 'fs'
import { join } from 'path'
import { hasTrailingSeparator } from '../utils'
import { defaultFilename } from '../constants'

export const resolveFilePath = (path: string, sep: string): string => {
  if (hasTrailingSeparator(path, sep)) {
    mkdirSync(path, { recursive: true })

    return join(path, defaultFilename)
  }

  const segments = path.split(sep)
  const lastIndex = segments.length - 1
  const directoryPath = segments.slice(0, lastIndex).join(sep)
  mkdirSync(directoryPath, { recursive: true })

  return join(directoryPath, segments[lastIndex])
}
