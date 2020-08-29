export type TGitDetails = {
  commitId: string,
  repoName: string
  repoUrl: string
}

export type TVcsInfoCreator = (opts: TStampOptions, env?: TStampEnv) => TGitDetails

export type TStampContext = Record<string, any> & {
  date?: string | number
  docker?: TDockerDetails
  git?: TGitDetails
}

export type TDockerDetails = {
  imageTag?: string
}

export type TDate = {
  format: 'iso' | 'instant'
  value?: string | number
}

export type TStampOptions = {
  git?: boolean
  docker?: TDockerDetails
  date?: TDate
  cwd: string
  out?: string
  jsonSpace?: string
}

export type TStampEnv = Record<string, any>

export type TStampChunk = (ctx: TStampContext, opts: TStampOptions, env: TStampEnv) => TStampContext
