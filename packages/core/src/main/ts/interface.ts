export interface IBuildstampOptionsNormalized {
  cwd:    string
  output: false | string
  date:   boolean | string
  git:    boolean
  ci:     boolean
  safe:   boolean
  extra:  Record<string, string>
}

export type IBuildstampOptions = Partial<IBuildstampOptionsNormalized>

export interface ICIInfo {
  ci_run_id:  string
  ci_run_url: string
}

export interface IGitInfo {
  git_commit_branch:  string
  git_commit_id:      string
  git_repo_url:       string
  git_repo_name:      string
}

export interface IBuildstamp extends Partial<IGitInfo>, Partial<ICIInfo> {
  date?: string
  [e: string]: string | undefined
}

export interface ICallable { (...args: any[]): any }
