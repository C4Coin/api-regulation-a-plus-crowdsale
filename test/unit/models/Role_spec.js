const { expect } = require('chai')
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} = require('../../utils/modelTestHelpers')

const RoleModel = require('../../../src/models/Role')

describe('Role', () => {
  const Role = RoleModel(sequelize, dataTypes)
  const role = new Role()

  checkModelName(Role)('Role')

  context('properties', () => {
    ;['name'].forEach(checkPropertyExists(role))
  })

  context('associations', () => {
    const User = 'some dummy user'

    before(() => {
      Role.associate({ User })
    })

    it('defined a belongsToMany association with User', () => {
      expect(Role.belongsToMany).to.have.been.calledWith(User, {
        through: 'RoleUser'
      })
    })
  })

  context('indexes', () => {
    ;['name'].forEach(checkUniqueIndex(role))
  })
})
