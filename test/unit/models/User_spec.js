const { expect } = require('chai')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists,
  checkHandlerDefined
} = require('../../utils/modelTestHelpers')

const mockAuthentication = {
  encrypt: sinon.stub().returnsPromise(),
  authenticate: sinon.stub().returnsPromise()
}

const UserModel = proxyquire('../../../src/models/User', {
  '../utils/authentication': mockAuthentication
})

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
        mockAuthentication.encrypt.resolves('some encrypted value')
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

  context('authenticate', () => {
    let authenticated

    before(async () => {
      mockAuthentication.authenticate.resolves(true)
      authenticated = await user.authenticate(user.password)
    })

    it('called the authenticate library', () => {
      expect(mockAuthentication.authenticate).to.have.been.calledOnce
    })

    it('returned true', () => {
      expect(authenticated).to.be.true
    })
  })
})
