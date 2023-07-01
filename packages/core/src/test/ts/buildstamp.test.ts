import {describe, it, expect} from '@abstractest/core'
import {buildstamp, getCIInfo} from '../../main/ts/buildstamp'

describe('buildstamp', () => {
  it('returns a result corresponding the passed opts', async () => {
    const result = await buildstamp({
      output: false,
      extra: {
        foo: 'bar'
      }
    })
    expect(result.git_repo_name).toEqual('qiwi/buildstamp')
    expect(result.foo).toEqual('bar')
  })
})

describe('getCIInfo()', () => {
  const expected = {ci_run_id: '123', ci_run_url: 'https://cicd.com/123'}
  const cases: [string, Record<string, string>, Record<string, string>][] = [
    [
      'detects TeamCity env',
      {
        BUILD_NUMBER: '123',
        BUILD_URL: 'https://cicd.com/123'
      },
      expected
    ],
    [
      'detects GitLab env',
      {
        CI_JOB_ID: '123',
        CI_JOB_URL: 'https://cicd.com/123'
      },
      expected
    ],
    [
      'detects GitHub env',
      {
        GITHUB_RUN_ID: '123',
        GITHUB_SERVER_URL: 'https://cicd.com',
        GITHUB_REPOSITORY: 'foo/bar'
      },
      {
        ci_run_id: '123',
        ci_run_url: 'https://cicd.com/foo/bar/actions/runs/123'
      }
    ],
    [
      'returns empty otherwise',
      {},
      {
        ci_run_id: undefined,
        ci_run_url: undefined
      }
    ]
  ];

  cases.forEach(([name, input, output]) =>
    it(name, () => {
      expect(getCIInfo(input)).toEqual(output)
    })
  )
})
