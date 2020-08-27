import fs from 'fs'
import { hasTrailingSeparator } from '../utils'
import { defaultFilename } from '../constants'
import mkdirp from 'mkdirp'

export const resolveFilePath = (path: string, sep: string): string => {
  if (hasTrailingSeparator(path, sep)) {
    const fullPath = `${path}${defaultFilename}`
    if (mkdirp.sync(path) === undefined && fs.existsSync(fullPath)) {
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
  mkdirp.sync(directoryPath)
  return `${directoryPath}/${segments[lastIndex]}`
}
