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
  git = true,
  date = true,
  extra = {}
}: IBuildstampOptions = {}): IBuildstampOptionsNormalized => ({
  cwd,
  output,
  git,
  date,
  extra,
})

export const buildstamp = async (opts?: IBuildstampOptions): Promise<IBuildstamp> => {
  const {git, date, cwd, output, extra} = normalizeOpts(opts)
  const stamp: IBuildstamp = {...extra}

  if (date) {
    stamp.date = new Date().toISOString()
  }
  if (git) {
    Object.assign(stamp, await getGitInfo(cwd))
  }
  if (output) {
    await fs.writeFile(path.resolve(cwd, output), JSON.stringify(stamp, null, 2))
  }

  return stamp
}

const getGitInfo = async (cwd: string): Promise<IGitInfo> => {
  const { stdout: git_commit_id } = await spawn('git', ['rev-parse', 'HEAD'], cwd)
  const { stdout: git_repo_url } = await spawn('git', ['config', '--get', 'remote.origin.url'], cwd)
  const git_repo_name = (git_repo_url.match(/([^/:.]+\/[^/.]+)(\.git)?$/) || [])[1]

  return {
    git_commit_id,
    git_repo_url,
    git_repo_name
  }
}

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
