import * as executor from '../../main/ts/executor'

describe('cli', () => {
  it('calls createBuildInfo', () => {
    process.env.SEP = '/'
    const fn = jest.spyOn(executor, 'execute')
      .mockImplementation(() => undefined)
    require('../../main/ts/cli')
    expect(fn).toHaveBeenCalled()
  })
})
