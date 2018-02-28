const pgtools = require('pgtools')

const { dbName, dbUser, dbPass, options } = require('./dbConfig')

const dbInit = () => {
  const config = {
    user: dbUser,
    password: dbPass,
    port: options.port,
    host: options.host
  }

  return new Promise((resolve, reject) => {
    pgtools.createdb(config, dbName, err => {
      if (err) {
        if (err.name && err.name === 'duplicate_database') {
          return resolve({
            dbNew: false,
            message: `Database '${dbName}' already exists`
          })
        } else if (process.env.NODE_ENV === 'production') {
          return resolve({
            dbNew: false,
            message: "Running in production. It's okay to keep going."
          })
        }

        // eslint-disable-next-line no-console
        console.error('createdb failed because', err)
        return reject(err)
      }
      return resolve({
        dbNew: true,
        message: `createdb created database '${dbName}'`
      })
    })
  })
}

module.exports = dbInit
