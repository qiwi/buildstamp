import {describe, it, expect} from '@abstractest/core'
import {buildstamp} from '../../main/ts/buildstamp'

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
