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

export type TVcsInfoCreator = (opts: TStampOptions, env?: TEnv) => TGitDetails

export type TChunkContext = {
  context?: TChunkContext
  stamp?: TStamp
  env?: TEnv
  options?: TStampOptions
  cwd?: string
}

export type TStampContext = Record<string, any> & {
  date?: string | number
  docker?: TDockerDetails
  git?: TGitDetails
}

export type TDockerDetails = {
  imageTag?: string
}

export type TDateOptions = {
  format: 'iso' | 'instant'
  value?: string | number
}

export type TStampOptions = Record<string, any>

export type TStampChunk = <T extends TChunkContext>(ctx: T, env?: TEnv) => T
