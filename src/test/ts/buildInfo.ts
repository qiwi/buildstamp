import { getGitInfo, createBuildInfo, TCliArguments, TEnvParams } from '../../main/ts'
import * as generators from '.././../main/ts/generators'
import fs from 'fs'

describe('getGitInfo', () => {
  it('is properly exported', () => {
    expect(getGitInfo).toBeDefined()
  })

  it('returns correct git info', () => {
    const data = getGitInfo()

    expect(data.commitId).toMatch(/^[\dA-Fa-f]{40}/)
    expect(data.repoName).toEqual('qiwi/buildstamp.git')
  })
})

describe('createBuildInfo', () => {
  it('is properly exported', () => {
    expect(createBuildInfo).toBeDefined()
  })

  const cases: Array<{cli: TCliArguments, env?: TEnvParams}> = [
    {
      cli: {
        ci: true,
      },
    },
    {
      cli: {
        ci: true,
        out: 'somename.json',
      },
    },
    {
      cli: {
      },
      env: {
        CI: true,
      },
    },
    {
      cli: {
      },
      env: {
        TEAMCITY_VERSION: 'foo',
      },
    },
  ]
  const gitInfo = getGitInfo()

  it('creates build info file', () => {
    cases.forEach(({ cli, env }) => {
      const envParams = { ...env, IMAGE_TAG: 'IMAGE_TAG' }
      const today = new Date()
      const filePath = cli.out || `${process.cwd()}/build-info.json`
      jest
        .spyOn(generators, 'today')
        .mockImplementation(() => today)

      createBuildInfo(cli, envParams)

      expect(fs.existsSync(filePath)).toEqual(true)
      const fileContent = JSON.parse(
        fs.readFileSync(filePath).toString()
      )
      expect(fileContent).toEqual({
        imageTag: envParams.IMAGE_TAG,
        timestamp: today.toISOString(),
        gitInfo,
      })
      fs.unlinkSync(filePath)
    })
  })

  it('does not create build info file', () => {
    createBuildInfo({})
    expect(fs.existsSync(`${process.cwd()}/build-info.json`))
      .toEqual(false)
  })

  it('logs error', () => {
    const error = new Error('some error')
    const logSpy = jest.spyOn(console, 'log')
    jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation(() => {
        throw new Error('some error')
      })

    createBuildInfo({ ci: true })
    expect(logSpy).toHaveBeenCalledWith(error)
  })
})
