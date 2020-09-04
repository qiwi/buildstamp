export type TEnv = Record<string, any>

export type TStamp = Record<string, any> & {
  date?: string | number
  docker?: TDockerDetails
  git?: TGitDetails
}

export type TGitDetails = {
  commitId: string,
  repoName: string
  repoUrl: string
}

export type TChunkContext = {
  context?: TChunkContext
  stamp?: TStamp
  env?: TEnv
  options?: TStampOptions
  cwd?: string
}

export type TDockerDetails = {
  imageTag?: string
}

export type TDateOptions = {
  format: 'iso' | 'instant'
  value?: string | number
}

export type TOutputOptions = {
  path: string
  jsonSeparator?: 'tab' | 'space' | 'double-space'
}

export type TStampOptions = Record<string, any> & {
  date?: TDateOptions
  docker?: TDockerDetails
  git?: boolean
  out?: TOutputOptions
}

export type TStampChunk = <T extends TChunkContext = TChunkContext>(ctx: T, env?: TEnv) => T
