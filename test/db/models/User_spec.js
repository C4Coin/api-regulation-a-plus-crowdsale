const { expect } = require('chai')

const models = require('../../../src/models')
const dummyData = require('../../utils/dummyData')

const { User } = models

describe('User', () => {
  afterEach(async () => {
    await User.destroy({ where: {} })
  })

  describe('create', () => {
    context('given basic valid data', () => {
      let data
      let instance
      before(async () => {
        data = dummyData.userData()
        instance = await User.create(data, { include: [{ all: true }] })
      })

      it('created a user correctly', () => {
        const js = instance.get({ plain: true })
        expect(js).to.have.property('username', data.username)
        expect(js).to.have.property('name', data.name)
        expect(js).to.have.property('email', data.email.toLowerCase())
        expect(js).to.have.property('passwordHash')
        expect(js.passwordHash).to.exist
      })

      it('authenticates the user', async () => {
        expect(await instance.authenticate(data.password)).to.be.true
      })
    })
  })
})
