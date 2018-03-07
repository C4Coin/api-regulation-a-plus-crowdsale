const path = require('path')

const env = process.env.NODE_ENV || 'development'

// eslint-disable-next-line import/no-dynamic-require
let config = require(path.join(
  __dirname,
  '..',
  '..',
  '..',
  'config',
  'config.json'
))[env]

if (process.env.REDIS_URL) {
  config = {
    ...config,
    ...parseQueueUrl(process.env.REDIS_URL)
  }
}

const queueName =
  process.env.QUEUE_NAME || config.queueName || `c4coin-api-queue-${env}`

const options = {
  redis: {
    host: process.env.QUEUE_HOST || config.host || 'localhost',
    port: process.env.QUEUE_PORT || config.port || 6379,
    password: process.env.QUEUE_PWD || config.pwd || ''
  }
}

module.exports = {
  queueName,
  options
}
