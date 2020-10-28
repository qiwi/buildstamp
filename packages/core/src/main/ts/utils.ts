import { readFileSync } from 'fs'

export const readFileToString = (path: string): string => readFileSync(path, 'utf-8')

export const hasTrailingSeparator = (path: string, sep: string): boolean => {
  return path.slice(-sep.length) === sep
}

export const formatOutput = (output: any, space: string) => JSON.stringify(output, null, space)
