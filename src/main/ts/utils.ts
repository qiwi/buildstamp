import fs from 'fs'

export const readFileToString = (path: string): string => fs.readFileSync(path).toString()

export const hasTrailingSeparator = (path: string, sep: string): boolean => {
  const regExp = new RegExp(`\\${sep}$`)
  return regExp.test(path)
}

export const formatOutput = (output: any, space: string) => JSON.stringify(output, null, space)
