// const Queue = require('bull')

// const { queueName, options } = require('./queueConfig')

// const queue = new Queue( queueName , options )

// module.exports = (task) => queue.process(task)

const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('appMaker', () => {
  const fakeOptions = 'cors'
  const mockQueue = sinon.stub().returns(fakeOptions)
  // const mockUse = sinon.spy()

  const fakeExpress = () => ({
    use: mockUse
  })

  const makeApp = proxyquire('../../../src/utils/queue/dbInit', {
    Queue: mockQueue,
    '.queueConfig': mockQueueConfig
  })
})

// const parseQueueUrl = require('../../../../src/utils/queue/queueUrlParser')

// describe('parseQueueUrl', () => {
//   const queueUrl = 'redis://pub-redis-12345.us-central1-2-3.gce.garantiadata.com'
//   const expected = {
//     key: 'redis_key',
//     host: 'ec2-23-21-91-97.compute-1.amazonaws.com',
//     port: '5432'
//   }

//   // TODO: verify Heroku style matches
//   it('parses an Heroku style redis queue url', () => {
//     expect(parseQueueUrl(queueUrl)).to.deep.equal(expected)
//   })
// })
