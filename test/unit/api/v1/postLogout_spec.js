const { expect } = require('chai')
const sinon = require('sinon')

const postLogout = require('../../../../src/api/v1/postLogout')

describe('postLogout', () => {
  const req = {}

  const res = {
    json: sinon.spy()
  }

  const expected = {
    test: 'test'
  }

  before(() => {
    postLogout(req, res)
  })

  it('calls res.json with the correct data', () => {
    expect(res.json).to.have.been.calledWith(expected)
  })
})
