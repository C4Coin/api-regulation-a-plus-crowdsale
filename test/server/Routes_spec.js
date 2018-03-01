const { expect } = require('chai')
const request = require('supertest')
const { start } = require('../../src/server')

describe('Routes', () => {
  let server
  let db

  before(async () => {
    ;({ server, db } = await start())
  })

  after(() => {
    server.close()
    db.close()
  })

  describe('/', () => {
    it('returns a list of versions and status code 200', done => {
      request(server)
        .get('/')
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.statusCode).to.equal(200)
          expect(res.body[0].version).to.equal(1)
          expect(res.body[0].path).to.equal('/api/v1')
          done()
        })
    })
  })

  describe('/ping', () => {
    it('returns an Okay result and status code 200', done => {
      request(server)
        .get('/ping')
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.statusCode).to.equal(200)
          expect(res.body.response).to.equal('Okay')
          done()
        })
    })
  })

  describe('/api/v1/login', () => {
    it('returns a test result and status code 200', done => {
      request(server)
        .post('/api/v1/login', {
          username: 'testy@mctestface.tes',
          password: 'Password1'
        })
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.statusCode).to.equal(200)
          expect(res.body.test).to.equal('test')
          done()
        })
    })
  })

  describe('/api/v1/logout', () => {
    it('returns a test result and status code 200', done => {
      request(server)
        .post('/api/v1/logout')
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.statusCode).to.equal(200)
          expect(res.body.test).to.equal('test')
          done()
        })
    })
  })
})
