const { expect } = require('chai')
const sinon = require('sinon')

const postLogin = require('../../../../src/api/v1/postLogin')

describe('postLogin', () => {
  const req = {
    params: {
      username: 'some-username',
      password: 'some-password'
    }
  }

  const res = {
    json: sinon.spy()
  }

  const expected = {
    token: 'some-awesome-jwt'
  }

  before(() => {
    postLogin(req, res)
  })

  it('calls res.json with the correct data', () => {
    expect(res.json).to.have.been.calledWith(expected)
  })
})
