const { expect } = require('chai')
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists,
  checkHandlerDefined
} = require('../../utils/modelTestHelpers')

const UserModel = require('../../../src/models/User')

describe('User', () => {
  const User = UserModel(sequelize, dataTypes)
  const user = new User()

  checkModelName(User)('User')

  context('properties', () => {
    ;[
      'username',
      'password',
      'passwordHash',
      'email',
      'name',
      'address'
    ].forEach(checkPropertyExists(user))
  })

  context('handlers', () => {
    ;['beforeCreate', 'beforeUpdate'].forEach(checkHandlerDefined(user))

    context('preprocessor', () => {
      before(async () => {
        await user.handlers.beforeCreate(user, {})
      })

      it('called set twice', () => {
        expect(user.set).to.have.been.calledTwice
      })
    })
  })

  context('associations', () => {
    const Role = 'some dummy role'

    before(() => {
      User.associate({ Role })
    })

    it('defined a belongsToMany association with Role', () => {
      expect(User.belongsToMany).to.have.been.calledWith(Role, {
        through: 'RoleUser'
      })
    })
  })

  context('indexes', () => {
    ;['username', 'email'].forEach(checkUniqueIndex(user))
  })

  context('authenticate', async () => {
    expect(await user.authenticate(user.password)).to.be.true
  })
})
