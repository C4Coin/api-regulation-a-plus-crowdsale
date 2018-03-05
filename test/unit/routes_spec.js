const { expect } = require('chai')

const routes = require('../../src/routes')

describe('routes', () => {
  const testRoute = method => path => {
    it(`has a route for path '${method.toUpperCase()} ${path}'`, () => {
      expect(routes[method][path]).to.be.a('function')
    })
  }
  describe('get', () => {
    ;['/', '/ping'].forEach(testRoute('get'))
  })

  describe('post', () => {
    ;['/api/v1/login', '/api/v1/logout'].forEach(testRoute('post'))
  })
})
