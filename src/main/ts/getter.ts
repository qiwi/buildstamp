import { readFileToString } from './utils'
import { TStamp } from './interfaces'

export const readBuildstamp = (stampPath: string): TStamp | undefined => {
  try {
    return JSON.parse(readFileToString(stampPath))
  } catch (e) {
    console.error('Buildstamp reading error:', e.message)
  }
  return undefined
}
