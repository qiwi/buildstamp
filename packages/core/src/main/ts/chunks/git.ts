import findGitRoot from 'find-git-root'
import { sep } from 'path'

import { TStampChunk } from '../interfaces'
import { readFileToString } from '../utils'

export type TGitStamp = {
  commitId: string,
  repoName: string
  repoUrl: string
}

export type TVcsInfoCreator = (cwd?: string) => TGitStamp

export type IGitStampOptions = {
  git?: boolean
}

export const getGitInfo: TVcsInfoCreator = (argCwd) => {
  const cwd = argCwd || process.cwd()
  const gitFolder = findGitRoot(cwd)

  const rev = readFileToString(`${gitFolder}${sep}HEAD`).trim()

  const commitId = !rev.includes(':')
    ? rev
    : readFileToString(`${gitFolder}${sep}` + rev.slice('ref: '.length)).trim()

  const repoUrlRegexp = /\turl = (.+)$/
  const repoNameRegexp = /\turl =.+[/:]([\w-]+\/[\w-]+).*$/

  const origin = readFileToString(`${gitFolder}${sep}config`)
    .split('\n')
    .find((line) => repoUrlRegexp.test(line)) + ''

  const repoName = (repoNameRegexp.exec(origin) || [])[1] + ''
  const repoUrl = (repoUrlRegexp.exec(origin) || [])[1] + ''

  const checkEndRepoUrl = /\.git$/

  return {
    commitId,
    repoUrl: checkEndRepoUrl.test(repoUrl) || argCwd ? repoUrl : repoUrl + '.git',
    repoName,
  }
}

export const gitChunk: TStampChunk = (ctx) => {
  const { options, stamp, cwd } = ctx

  if (!options || !options.git) {
    return ctx
  }

  return {
    ...ctx,
    stamp: {
      ...stamp,
      git: gitChunk.getGitInfo(cwd as string),
    },
  }
}

gitChunk.getGitInfo = getGitInfo
