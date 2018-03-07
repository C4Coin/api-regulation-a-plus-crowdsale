const { expect } = require('chai')

const parseQueueUrl = require('../../../../src/utils/queue/queueUrlParser')

describe('parseQueueUrl', () => {
  const queueUrl =
    'redis://pub-redis-12345.us-central1-2-3.gce.garantiadata.com'
  const expected = {
    key: 'redis_key',
    host: 'ec2-23-21-91-97.compute-1.amazonaws.com',
    port: '5432'
  }

  // TODO: not implemented yet
  xit('parses an Heroku style redis queue url', () => {
    expect(parseQueueUrl(queueUrl)).to.deep.equal(expected)
  })
})
