import fs from 'fs'
import { hasTrailingSeparator } from '../utils'
import { defaultFilename } from '../constants'

export const resolveFilePath = (path: string, sep: string): string => {
  if (hasTrailingSeparator(path, sep)) {
    const fullPath = `${path}${defaultFilename}`
    if (fs.mkdirSync(path, { recursive: true }) === undefined && fs.existsSync(fullPath)) {
      throw new Error(`File ${fullPath} already exists`)
    }
    return fullPath
  }

  if (fs.existsSync(path)) {
    throw new Error(`File ${path} already exists`)
  }

  const segments = path.split(sep)
  const lastIndex = segments.length - 1
  const directoryPath = segments.slice(0, lastIndex).join(sep)
  fs.mkdirSync(directoryPath, { recursive: true })
  return `${directoryPath}/${segments[lastIndex]}`
}
