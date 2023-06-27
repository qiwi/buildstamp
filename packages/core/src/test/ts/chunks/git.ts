import { jest } from '@jest/globals'
import { mkdirSync, writeFileSync } from 'node:fs'
import rimraf from 'rimraf'

import { TChunkContext, TGitDetails } from '../../../main/ts'
import { getGitInfo, gitChunk } from '../../../main/ts/chunks'

const artifactsFolder = 'testArtifactsFolder'

type TGitInfoTestCase = {
  description: string
  head: string
  config: string,
  repoName: string,
  repoUrl: RegExp,
  commitId: string,
}

const testCases: TGitInfoTestCase[] = [
  {
    description: 'head does not contain colon',
    head: '1234567890abcdef1234567890abcdef12345678',
    config: '\turl = https://github.com/foo/bar.git',
    repoName: 'foo/bar',
    repoUrl: /foo\/bar\.git$/,
    commitId: '1234567890abcdef1234567890abcdef12345678',
  },
  {
    description: 'head contains colon',
    head: 'rev: 1234567890abcdef1234567890abcdef12345678',
    config: '\turl = https://github.com/foo/bar.git',
    repoName: 'foo/bar',
    repoUrl: /foo\/bar\.git$/,
    commitId: '1234567890abcdef1234567890abcdef12345678',
  },
  {
    description: 'config does not contain url',
    head: 'rev: 1234567890abcdef1234567890abcdef12345678',
    config: '',
    repoName: 'undefined',
    repoUrl: /^undefined$/,
    commitId: '1234567890abcdef1234567890abcdef12345678',
  },
  {
    description: 'config contains gerrit url',
    head: 'rev: 1234567890abcdef1234567890abcdef12345678',
    config: '\turl = ssh://d.abramov@gerrit.foo.ru:4242/foo/bar-baz-bat',
    repoName: 'foo/bar-baz-bat',
    repoUrl: /^ssh:\/\/d.abramov@gerrit.foo.ru:4242\/foo\/bar-baz-bat$/,
    commitId: '1234567890abcdef1234567890abcdef12345678',
  },
  {
    description: 'config contains url with kebab-named org',
    head: 'rev: 1234567890abcdef1234567890abcdef12345678',
    config: '\turl = ssh://d.abramov@gerrit.foo.ru:4242/foo-qux/bar-baz-bat',
    repoName: 'foo-qux/bar-baz-bat',
    repoUrl: /^ssh:\/\/d.abramov@gerrit.foo.ru:4242\/foo-qux\/bar-baz-bat$/,
    commitId: '1234567890abcdef1234567890abcdef12345678',
  },
]

afterAll(() => rimraf.sync(artifactsFolder))

describe('getGitInfo', () => {
  it('is properly exported', () => {
    expect(getGitInfo).toBeDefined()
  })

  describe('returns correct git info', () => {
    testCases.forEach((testCase, i) => it(testCase.description, () => {
      const gitFolderPath = `${artifactsFolder}/case${i}/.git`
      mkdirSync(gitFolderPath, { recursive: true })
      writeFileSync(`${gitFolderPath}/HEAD`, testCase.head)
      writeFileSync(`${gitFolderPath}/config`, testCase.config)
      writeFileSync(`${gitFolderPath}/${testCase.commitId}`, testCase.commitId)

      const data = getGitInfo(gitFolderPath)

      expect(data.commitId).toEqual(testCase.commitId)
      expect(data.repoName).toBe(testCase.repoName)
      expect(data.repoUrl).toMatch(testCase.repoUrl)
    }))

    it('uses process.cwd when cwd is not given', () => {
      const data = getGitInfo()

      expect(data.commitId).toMatch(/^[\dA-Fa-f]{40}/)
      expect(data.repoName).toBe('qiwi/buildstamp')
      expect(data.repoUrl).toMatch(/^.+github\.com[/:]qiwi\/buildstamp\.git$/)
    })
  })
})

describe('gitChunk', () => {
  afterAll(jest.resetAllMocks)

  it('returns properly context value if options are not passed', () => {
    const ctx: TChunkContext = {
      cwd: process.cwd(),
    }
    expect(gitChunk(ctx)).toEqual(ctx)
  })

  it('appends gitDetails to context', () => {
    const ctx: TChunkContext = {
      options: {
        git: true,
      },
      cwd: process.cwd(),
    }
    const git: TGitDetails = {
      commitId: 'bar',
      repoName: 'baz',
      repoUrl: 'qux',
    }
    jest.spyOn(gitChunk, 'getGitInfo').mockImplementation(() => git)
    expect(gitChunk(ctx)).toEqual({ ...ctx, stamp: { git } })
  })
})
