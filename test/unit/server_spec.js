const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire').noCallThru()

describe('server', () => {
  const mockApp = {
    listen: sinon.stub().returnsPromise()
  }
  const mockMakeApp = sinon.stub().returns(mockApp)
  const mockDbInit = sinon.stub().returnsPromise()
  const mockModels = {
    sequelize: {
      sync: sinon.stub().returnsPromise()
    }
  }
  const mockJobs = {
    on: sinon.spy(),
    add: sinon.spy()
  }

  const server = proxyquire('../../src/server', {
    './utils/appMaker': mockMakeApp,
    './utils/db/dbInit': mockDbInit,
    './models': mockModels,
    './jobs': mockJobs
  })

  const mockServer = 'a server'

  let outcome

  before(async () => {
    mockDbInit.resolves({ message: 'yay' })
    mockModels.sequelize.sync.resolves()
    mockApp.listen.resolves(mockServer)
    outcome = await server.start()
  })

  it('invoked dbInit', () => {
    expect(mockDbInit).to.have.been.calledOnce
  })

  it('invoked sequelize.sync', () => {
    expect(mockModels.sequelize.sync).to.have.been.calledOnce
  })

  it('invoked app.listen', () => {
    expect(mockApp.listen).to.have.been.calledOnce
  })

  it('returns the server, database, and jobs', () => {
    expect(outcome).to.have.property('server', mockServer)
    expect(outcome).to.have.property('db', mockModels.sequelize)
    expect(outcome).to.have.property('jobs', mockJobs)
  })
})
