import findGitRoot from 'find-git-root'
import path from 'path'
import { readFileToString } from './utils'
import { TVcsInfoCreator } from './interfaces'

export const getGitInfo: TVcsInfoCreator = ({ cwd }) => {
  const { sep } = path
  const gitFolder = findGitRoot(cwd)

  const rev = readFileToString(`${gitFolder}${sep}HEAD`).trim()

  const commitId = !rev.includes(':')
    ? rev
    : readFileToString(`${gitFolder}${sep}` + rev.replace('ref: ', '')).trim()

  const repoName = readFileToString(`${gitFolder}${sep}config`)
    .split('\n')
    .filter((line) => /\turl =/.exec(line))
    .reduce((acc, line) => acc + line.split(sep).slice(-2).join(sep), '')

  return {
    commitId,
    repoName,
  }
}
