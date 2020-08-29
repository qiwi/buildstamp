import { now } from '../../main/ts/generators'

describe('now', () => {
  it('is properly exported', () => {
    expect(now).toBeDefined()
  })

  it('returns instance of Date', () => {
    const timestamp = Date.now()
    expect(now()).toBeGreaterThanOrEqual(timestamp)
  })
})
