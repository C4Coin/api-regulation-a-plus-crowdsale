const dbInit = require('../../src/utils/db/dbInit')
const models = require('../../src/models')
const loadData = require('./utils/loadData')
const createBaseData = require('./utils/createBaseData')

// eslint-disable-next-line max-len
const PREFLIGHT_ERROR =
  'Seeding the database is a DESTRUCTIVE operation. To run this task you must set the environment variable I_KNOW_WHAT_I_AM_DOING to true.'

const { I_KNOW_WHAT_I_AM_DOING } = process.env

const seed = async () => {
  const { roles } = loadData()

  await createBaseData({ roles })
}

const reportError = err => {
  console.error('Caught error', err) // eslint-disable-line no-console
  process.exit(1)
}

const preflight = async () => {
  if (I_KNOW_WHAT_I_AM_DOING) {
    await dbInit()
    await models.sequelize.sync({ force: true })
  } else {
    throw new Error(PREFLIGHT_ERROR)
  }
}

preflight()
  .then(seed)
  .then(() => models.sequelize.close())
  .catch(reportError)
