export interface IBuildstampOptionsNormalized {
  cwd:    string
  output: false | string
  date:   boolean | string
  git:    boolean
  extra:  Record<string, string>
}

export type IBuildstampOptions = Partial<IBuildstampOptionsNormalized>

export interface IGitInfo {
  git_commit_id:  string
  git_repo_url:   string
  git_repo_name:  string
}

export interface IBuildstamp extends Partial<IGitInfo> {
  date?: string
  [e: string]: string | undefined
}
