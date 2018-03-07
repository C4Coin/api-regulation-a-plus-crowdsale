const makeApp = require('./utils/appMaker')
const dbInit = require('./utils/db/dbInit')
const { env } = require('./utils/config')
const models = require('./models')
const jobs = require('./jobs')

const PORT = process.env.PORT || 3000

const isDevelopment = env === 'development'

const forceSync = () =>
  process.env.NODE_ENV === 'test' /* istanbul ignore next */ ||
  (process.env.FORCE_DATABASE_RESET && process.env.I_KNOW_WHAT_I_AM_DOING)

const start = async () => {
  const result = await dbInit()

  /* istanbul ignore if */
  if (isDevelopment) console.log(result.message) // eslint-disable-line no-console

  await models.sequelize.sync({ force: forceSync() })
  const app = makeApp()
  const server = await app.listen(PORT)
  // just a test
  jobs.on('completed', (job, result) => {
    console.debug('result', result)
  })
  jobs.add('hello', 'Yeehahaaa')
  return { server, db: models.sequelize, jobs }
}

module.exports = {
  start
}
