import findGitRoot from 'find-git-root'
import { readFileToString } from './utils'
import { TVcsInfoCreator } from './interfaces'

export const getGitInfo: TVcsInfoCreator = ({ cwd }, { SEP }) => {
  const gitFolder = findGitRoot(cwd)

  const rev = readFileToString(`${gitFolder}${SEP}HEAD`).trim()

  const commitId = !rev.includes(':')
    ? rev
    : readFileToString(`${gitFolder}${SEP}` + rev.substring(5)).trim()

  const repoName = readFileToString(`${gitFolder}${SEP}config`)
    .split('\n')
    .filter((line) => /\turl =/.exec(line))
    .reduce((acc, line) => acc + line.split(SEP).slice(-2).join(SEP), '')

  return {
    commitId,
    repoName,
  }
}
