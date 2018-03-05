const { expect } = require('chai')
const sinon = require('sinon')

const asyncRoute = require('../../../src/utils/asyncRoute')

describe('asyncRoute', () => {
  let asyncFn

  context('when the route resolves', () => {
    asyncFn = sinon.stub().returnsPromise()

    before(async () => {
      asyncFn.resolves()
      const route = asyncRoute(asyncFn)
      await route()
    })

    it('invoked the async function', () => {
      expect(asyncFn).to.have.been.calledOnce
    })
  })

  context('when the route throws an error', () => {
    asyncFn = sinon.stub().returnsPromise()

    const errorHandler = sinon.spy()
    const err = 'oops'

    before(async () => {
      asyncFn.rejects(err)
      const route = asyncRoute(asyncFn)
      await route(undefined, undefined, errorHandler)
    })

    it('triggered the error handler', () => {
      expect(errorHandler).to.have.been.calledWith(err)
    })
  })
})
