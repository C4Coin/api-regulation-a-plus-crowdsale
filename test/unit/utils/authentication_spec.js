const { expect } = require('chai')
const { lorem } = require('faker')

const { encrypt, authenticate } = require('../../../src/utils/authentication')

describe('authentication', () => {
  const password = lorem.word()
  let hash

  before(async () => {
    hash = await encrypt(password)
  })

  it('created a hash from the password', () => {
    expect(hash).to.exist
  })

  it('can authenticate the password against the hash', async () => {
    expect(await authenticate(password, hash)).to.be.true
  })

  it("won't authenticate a bad passwword against the hash", async () => {
    expect(await authenticate('bad password', hash)).to.be.false
  })
})
