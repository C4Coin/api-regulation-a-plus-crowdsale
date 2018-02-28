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

  describe('Ping', () => {
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
})
