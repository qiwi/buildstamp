import { getGitInfo } from '../../main/ts'

describe('getGitInfo', () => {
  it('is properly exported', () => {
    expect(getGitInfo).toBeDefined()
  })

  it('returns correct git info', () => {
    const data = getGitInfo({ cwd: process.cwd() }, process.env)

    expect(data.commitId).toMatch(/^[\dA-Fa-f]{40}/)
    expect(data.repoName).toEqual('qiwi/buildstamp.git')
  })
})
