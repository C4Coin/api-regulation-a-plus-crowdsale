const { queue: config, env } = require('../config')

const name = process.env.QUEUE_NAME || config.name || `c4coin-api-queue-${env}`

const { options } = config

module.exports = { name, options }
