import fs from 'fs'
import findGitRoot from 'find-git-root'
import { today } from './generators'

const readFileToString = (path: string): string => fs.readFileSync(path).toString()

export const getGitInfo = (): { commitId: string, repoName: string} => {
  const gitFolder = findGitRoot(process.cwd())

  const rev = readFileToString(`${gitFolder}/HEAD`).trim()

  const commitId = !rev.includes(':')
    ? rev
    : readFileToString(`${gitFolder}/` + rev.substring(5)).trim()

  const repoName = readFileToString(`${gitFolder}/config`)
    .split('\n')
    .filter((line) => /\turl =/.exec(line))
    .reduce((acc, line) => acc + line.split('/').slice(-2).join('/'), '')

  return {
    commitId,
    repoName,
  }
}

export type TCliArguments = {
  ci?: boolean
  out?: string
}

export type TEnvParams = {
  CI?: boolean,
  TEAMCITY_VERSION?: string,
  BUILD_INFO_FILE_PATH?: string,
  IMAGE_TAG?: string
}

export const createBuildInfo = (
  cliArgs: TCliArguments,
  env: TEnvParams = process.env
) => {
  const generateBuildInfo = cliArgs.ci ?? (env.CI || env.TEAMCITY_VERSION)
  const outputFile = cliArgs.out || env.BUILD_INFO_FILE_PATH || `${process.cwd()}/build-info.json`
  try {
    if (generateBuildInfo) {
      fs.writeFileSync(
        outputFile,
        JSON.stringify({
          imageTag: env.IMAGE_TAG,
          timestamp: today().toISOString(),
          gitInfo: getGitInfo(),
        })
      )

      console.log('build-info.json was created')
    }
  } catch (e) {
    console.log(e)
  }
}
