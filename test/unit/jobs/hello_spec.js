const { expect } = require('chai')

const hello = require('../../../src/jobs/hello')

describe('hello', () => {
  const data = 'Bob'
  const expected = `Hello ${data}`

  it('returns the expected result', async () => {
    expect(await hello({ data })).to.equal(expected)
  })
})
