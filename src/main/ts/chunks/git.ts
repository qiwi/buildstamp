import { TStampChunk, TVcsInfoCreator } from '../interfaces'
import { sep } from 'path'
import findGitRoot from 'find-git-root'
import { readFileToString } from '../utils'

export const getGitInfo: TVcsInfoCreator = ({ cwd }) => {
  const gitFolder = findGitRoot(cwd)

  const rev = readFileToString(`${gitFolder}${sep}HEAD`).trim()

  const commitId = !rev.includes(':')
    ? rev
    : readFileToString(`${gitFolder}${sep}` + rev.slice('ref: '.length)).trim()

  const repoUrlRegexp = /\turl = (.+)$/
  const repoNameRegexp = /\turl =.+[/:](\w+\/\w+).*$/

  const origin = readFileToString(`${gitFolder}${sep}config`)
    .split('\n')
    .find((line) => repoUrlRegexp.test(line)) + ''

  const repoName = (repoNameRegexp.exec(origin) || [])[1] + ''
  const repoUrl = (repoUrlRegexp.exec(origin) || [])[1] + ''

  return {
    commitId,
    repoUrl,
    repoName,
  }
}

export const gitChunk: TStampChunk = (ctx, opts) => {
  if (!opts.git) {
    return ctx
  }

  const git = getGitInfo(opts)

  return { ...ctx, git }
}
