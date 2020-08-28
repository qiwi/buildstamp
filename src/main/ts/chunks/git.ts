import { TStampChunk } from '../interfaces'
import { getGitInfo } from '../gitInfo'

export const gitChunk: TStampChunk = (ctx, opts, env) => {
  if (!opts.git) {
    return ctx
  }

  const git = getGitInfo(opts, env)

  return { ...ctx, git }
}
