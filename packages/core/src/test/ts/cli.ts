import { jest } from '@jest/globals'

import executor from '../../main/ts/executor'
// import { run } from '../../main/ts'

const fakeExec = jest.fn(() => ({/* noop */}))
beforeAll(() => {
  jest.spyOn(executor, 'execute').mockImplementation(fakeExec)
})

describe('cli', () => {
  it('calls createBuildInfo', async () => {
    process.env.SEP = '/'
    await import('../../main/ts/cli')
    expect(fakeExec).toHaveBeenCalled()
  })
})
