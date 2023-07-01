import * as cp from 'node:child_process'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as process from 'node:process'

import {
  IBuildstamp,
  IBuildstampOptions,
  IBuildstampOptionsNormalized,
  IGitInfo
} from './interface'

export const normalizeOpts = ({
  cwd = process.cwd(),
  output = 'buildstamp.json',
  ci = true,
  git = true,
  date = true,
  extra = {}
}: IBuildstampOptions = {}): IBuildstampOptionsNormalized => ({
  ci,
  cwd,
  output,
  git,
  date,
  extra,
})

export const buildstamp = async (opts?: IBuildstampOptions): Promise<IBuildstamp> => {
  const {ci, git, date, cwd, output, extra} = normalizeOpts(opts)
  const stamp: IBuildstamp = {...extra}

  if (date) {
    stamp.date = new Date().toISOString()
  }
  if (git) {
    Object.assign(stamp, await getGitInfo(cwd))
  }
  if (ci) {
    Object.assign(stamp, await getCIInfo(process.env))
  }
  if (output) {
    await fs.writeFile(path.resolve(cwd, output), JSON.stringify(stamp, null, 2))
  }

  return stamp
}

export const getGitInfo = async (cwd: string): Promise<IGitInfo> => {
  const { stdout: git_commit_id } = await spawn('git', ['rev-parse', 'HEAD'], cwd)
  const { stdout: git_repo_url } = await spawn('git', ['config', '--get', 'remote.origin.url'], cwd)
  const git_repo_name = (git_repo_url.match(/([^./:]+\/[^./]+)(\.git)?$/) || [])[1]

  return {
    git_commit_id,
    git_repo_url,
    git_repo_name
  }
}

// https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables
// https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
// https://www.jetbrains.com/help/teamcity/predefined-build-parameters.html#Predefined+Server+Build+Parameters
export const getCIInfo = (env: Record<string, string | undefined>) => ({
  ci_run_id: env.BUILD_NUMBER || env.CI_JOB_ID || env.GITHUB_RUN_ID,
  ci_run_url: env.BUILD_URL || env.CI_JOB_URL || (env.GITHUB_RUN_ID && `${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}`)
})

export const spawn = (
  cmd: string,
  args: ReadonlyArray<string>,
  cwd: string
): Promise<{stdout: string, stderr: string, status: number | null, signalCode: string | null, duration: number}> => new Promise((resolve, reject) => {
  let status: number | null = 0
  const now = Date.now()
  const stderr: string[] = []
  const stdout: string[] = []
  const p = cp.spawn(cmd, args, {cwd})

  p.stdout.on('data', (data) => stdout.push(data.toString()))
  p.stderr.on('data', (data) => stderr.push(data.toString()))

  p
    .on('error', (e) => stderr.push(e.toString()))
    .on('exit', (code) => { status = code })
    .on('close', () => {
      (status ? reject : resolve)({
        stderr: stderr.join('').trim(),
        stdout: stdout.join('').trim(),
        status,
        signalCode: p.signalCode,
        duration: Date.now() - now,
      })
    })
})
