import { log } from '../../../main/ts/output'
import { TStampContext } from '../../../main/ts'

const ctx: TStampContext = {
  gitInfo: {
    commitId: 'foo',
    repoName: 'bar',
  },
  dockerInfo: {
    imageTag: 'baz',
  },
  timestamp: Date.now(),
}

const output = JSON.stringify(
  ctx,
  null,
  '\t'
)

describe('log', () => {
  it('is properly exported', () => expect(log).toBeDefined())

  it('prints info to stdout when out is not defined', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined)

    log(ctx, { cwd: process.cwd() })

    expect(consoleLogSpy).toHaveBeenCalledWith(output)
  })
})
