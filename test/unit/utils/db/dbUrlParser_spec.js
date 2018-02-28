const { expect } = require('chai')

const parseDatabaseUrl = require('../../../../src/utils/db/dbUrlParser')

describe('parseDatabaseUrl', () => {
  const dbUrl =
    'postgres://pfforbjhkrletg:aic5oO6Cran1g3hk6mJa5QqNZB@ec2-23-21-91-97.compute-1.amazonaws.com:5432/dek11b2j1g3mfb'
  const expected = {
    database: 'dek11b2j1g3mfb',
    username: 'pfforbjhkrletg',
    password: 'aic5oO6Cran1g3hk6mJa5QqNZB',
    host: 'ec2-23-21-91-97.compute-1.amazonaws.com',
    port: '5432',
    dialect: 'postgres',
    protocol: 'postgtres'
  }

  it('parses an Heroku style database url', () => {
    expect(parseDatabaseUrl(dbUrl)).to.deep.equal(expected)
  })
})
