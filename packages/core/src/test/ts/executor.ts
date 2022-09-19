import { jest } from '@jest/globals'

import { execute, TStampOptions } from '../../main/ts'

describe('execute', () => {
  it('is properly exported', () => {
    expect(execute).toBeDefined()
  })

  it('returns empty stamp when options are empty', () => {
    jest.spyOn(console, 'log').mockImplementation(() => { /* noop */ })
    const docker = {
      imageTag: 'foo',
    }
    const date = 1599225650789
    const options: TStampOptions = {
      git: true,
      docker,
      date: {
        format: 'instant',
        value: date,
      },
    }
    const buildstamp = execute(options, {})

    expect(buildstamp).toEqual({
      docker,
      date,
      git: {
        commitId: expect.any(String),
        repoName: 'qiwi/buildstamp',
        repoUrl: expect.stringMatching(/^.+github\.com[/:]qiwi\/buildstamp\.git$/),
      },
    })
  })
})
