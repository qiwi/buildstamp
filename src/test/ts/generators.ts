import { today } from '../../main/ts/generators'

describe('today', () => {
  it('is properly exported', () => {
    expect(today).toBeDefined()
  })

  it('returns instance of Date', () => {
    expect(today()).toBeInstanceOf(Date)
  })
})
