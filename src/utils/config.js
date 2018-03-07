const Config = require('../../config/config.json')
const parseDbUrl = require('./db/dbUrlParser')
const parseQueueUrl = require('./queue/queueUrlParser')

const env = process.env.NODE_ENV || /* istanbul ignore next */ 'development'
const base = Config[env]

const db = process.env.DATABASE_URL
  ? { ...base.db, ...parseDbUrl(process.env.DATABASE_URL) }
  : base.db

const queue = process.env.QUEUE_URL
  ? { ...base.queue, ...parseQueueUrl(process.env.QUEUE_URL) }
  : base.queue

module.exports = { db, queue, env }
