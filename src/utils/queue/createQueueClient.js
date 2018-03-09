const Redis = require('ioredis')

const createQueueClient = (url = process.env.REDIS_URL) => {
  const client = new Redis(url)
  const subscriber = new Redis(url)

  const REDII = {
    client,
    subscriber
  }

  const createClient = type => {
    if (REDII[type]) return REDII[type]
    return new Redis()
  }

  return createClient
}

module.exports = createQueueClient
