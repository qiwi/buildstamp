import fs from 'fs'
import { hasTrailingSeparator } from '../utils'
import { defaultFilename } from '../constants'

export const resolveFilePath = (path: string, sep: string): string => {
  if (hasTrailingSeparator(path, sep)) {
    fs.mkdirSync(path, { recursive: true })
    return `${path}${defaultFilename}`
  }

  const segments = path.split(sep)
  const lastIndex = segments.length - 1
  const directoryPath = segments.slice(0, lastIndex).join(sep)
  fs.mkdirSync(directoryPath, { recursive: true })
  return `${directoryPath}${sep}${segments[lastIndex]}`
}
