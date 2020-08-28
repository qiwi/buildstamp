import fs from 'fs'

export const readFileToString = (path: string): string => fs.readFileSync(path).toString()

export const hasTrailingSeparator = (path: string, sep: string): boolean => {
  return path.slice(-sep.length) === sep
}

export const formatOutput = (output: any, space: string) => JSON.stringify(output, null, space)
