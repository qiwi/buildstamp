import { execute, TStampOptions } from '../../main/ts'

describe('execute', () => {
  it('is properly exported', () => {
    expect(execute).toBeDefined()
  })

  it('returns empty stamp when options are empty', () => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined)
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

    expect(execute(options, {})).toMatchObject({
      docker,
      date,
      git: {
        repoName: 'qiwi/buildstamp',
        repoUrl: 'https://github.com/qiwi/buildstamp.git',
      },
    })
  })
})
