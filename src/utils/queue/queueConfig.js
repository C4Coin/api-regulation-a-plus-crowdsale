const { queue: config, env } = require('../config')

const name = process.env.QUEUE_NAME || config.name || `c4coin-api-queue-${env}`

const options = {
  redis: {
    host: process.env.QUEUE_HOST || config.host || 'localhost',
    port: process.env.QUEUE_PORT || config.port || 6379,
    password: process.env.QUEUE_PWD || config.pwd || ''
  }
}

module.exports = { name, options }
