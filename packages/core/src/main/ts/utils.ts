import fs from 'fs'

export const readFileToString = (path: string): string => fs.readFileSync(path, 'utf-8')

export const hasTrailingSeparator = (path: string, sep: string): boolean =>
  path.slice(-sep.length) === sep

// eslint-disable-next-line unicorn/no-null
export const formatOutput = (output: any, space: string) => JSON.stringify(output, null, space)
