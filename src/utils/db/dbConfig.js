const { db: config, env } = require('../config')

const dbName = process.env.DB_NAME || config.database || `c4coin-api-${env}`
const dbUser = process.env.DB_USER || config.username || null
const dbPass = process.env.DB_PASS || config.password || null

const poolOptions = config.pool
  ? {
      max: process.env.DB_POOL_MAX || config.pool.max || 5,
      min: process.env.DB_POOL_MIN || config.pool.min || 1,
      idle: process.env.DB_POOL_IDLE || config.pool.idle || 10000
    }
  : {
      max: process.env.DB_POOL_MAX || 5,
      min: process.env.DB_POOL_MIN || 1,
      idle: process.env.DB_POOL_IDLE || 10000
    }

const options = {
  host: process.env.DB_HOST || config.host || 'localhost',
  port: process.env.DB_PORT || config.port || 5432,
  dialect: process.env.DB_TYPE || config.dialect || 'postgres',
  pool: poolOptions,
  operatorsAliases: false, // see https://github.com/sequelize/sequelize/issues/8417
  logging: false // this can be a logging function.
}

if (process.env.DATABASE_URL) options.protocol = config.protocol

module.exports = {
  dbName,
  dbUser,
  dbPass,
  options
}
