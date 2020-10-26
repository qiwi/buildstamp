import { readFileToString } from './utils'
import { TStamp } from './interfaces'

export const getBuildstamp = (stampPath: string): TStamp | undefined => {
  try {
    return JSON.parse(readFileToString(stampPath))
  } catch (e) {
    console.error('Buildstamp getting error:', e.message)
  }
  return undefined
}
