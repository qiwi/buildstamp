import { TStamp } from './interfaces'
import { readFileToString } from './utils'

export const readBuildstamp = (stampPath: string): TStamp | undefined => {
  try {
    return JSON.parse(readFileToString(stampPath))
  } catch (e) {
    console.error('Buildstamp reading error:', e.message)
  }
}
