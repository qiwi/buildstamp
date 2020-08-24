import * as buildInfo from '../../main/ts/buildInfo'

describe('cli', () => {
  it('calls createBuildInfo', () => {
    const fn = jest
      .spyOn(buildInfo, 'createBuildInfo')
      .mockImplementation(() => undefined)
    require('../../main/ts/cli')
    expect(fn).toHaveBeenCalled()
  })
})
