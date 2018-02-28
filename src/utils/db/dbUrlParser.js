const url = require('url')

const parseDatabaseUrl = dbUrl => {
  const dbURL = url.parse(dbUrl)
  const authArr = dbURL.auth.split(':')
  const hostArr = dbURL.host.split(':')

  return {
    database: dbURL.path.substring(1),
    username: authArr[0],
    password: authArr[1],
    host: hostArr[0],
    port: hostArr[1],
    dialect: 'postgres',
    protocol: 'postgtres'
  }
}

module.exports = parseDatabaseUrl
