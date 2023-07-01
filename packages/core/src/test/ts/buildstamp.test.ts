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
  const ciRunId = '123'
  const ciRunUrl = 'https://cicd.com/123'
  const expected = {ci_run_id: ciRunId, ci_run_url: ciRunUrl}
  const cases: [string, Record<string, string>, Record<string, string>][] = [
    [
      'detects TeamCity env',
      {
        BUILD_NUMBER: ciRunId,
        BUILD_URL: ciRunUrl
      },
      expected
    ],
    [
      'detects GitLab env',
      {
        CI_JOB_ID: ciRunId,
        CI_JOB_URL: ciRunUrl
      },
      expected
    ],
    [
      'detects GitHub env',
      {
        GITHUB_RUN_ID: ciRunId,
        GITHUB_SERVER_URL: 'https://cicd.com',
        GITHUB_REPOSITORY: 'foo/bar'
      },
      {
        ci_run_id: ciRunId,
        ci_run_url: `https://cicd.com/foo/bar/actions/runs/${ciRunId}`
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
