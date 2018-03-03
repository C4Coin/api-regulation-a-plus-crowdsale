const { expect } = require('chai')
// const sinon = require('sinon')
// const proxyquire = require('proxyquire')
// removed as this doesn't support the latest version of sequelize.
// const SequelizeMock = require('sequelize-mock')

describe('models', () => {
  const models = 'replace me'
  // const models = proxyquire('../../src/models', {
  //   'sequelize': SequelizeMock
  // })

  xit('loaded the User model', () => {
    expect(models).to.have.property('User')
  })

  xit('loaded the Role model', () => {
    expect(models).to.have.property('Role')
  })
})
