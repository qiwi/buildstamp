import { getGitInfo } from '../../main/ts'
import { defaultEnv } from '../../main/ts/constants'

describe('getGitInfo', () => {
  it('is properly exported', () => {
    expect(getGitInfo).toBeDefined()
  })

  it('returns correct git info', () => {
    const data = getGitInfo({ cwd: process.cwd() }, defaultEnv)

    expect(data.commitId).toMatch(/^[\dA-Fa-f]{40}/)
    expect(data.repoName).toEqual('qiwi/buildstamp.git')
  })
})
