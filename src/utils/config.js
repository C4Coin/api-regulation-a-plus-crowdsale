const Config = require('../../config/config.json')
const parseDbUrl = require('./db/dbUrlParser')
const createQueueClient = require('./queue/createQueueClient')

const env = process.env.NODE_ENV || /* istanbul ignore next */ 'development'
const base = Config[env]

const db = process.env.DATABASE_URL /* istanbul ignore next */
  ? { ...base.db, ...parseDbUrl(process.env.DATABASE_URL) }
  : base.db

const { queue } = base

/* istanbul ignore if */
if (process.env.REDIS_URL) {
  queue.options = { createClient: createQueueClient() }
}

module.exports = { db, queue, env }
