import path from 'path'
import { TStampEnv } from './interfaces'

export const defaultFilename = 'buildstamp.json'

export const defaultEnv: TStampEnv = {
  SEP: path.sep,
}

export const defaultJsonSpace = '\t'
