require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const chaiString = require('chai-string')

const prepare = require('mocha-prepare-promise')
const dbInit = require('../../src/utils/db/dbInit')
const models = require('../../src/models')

chai.use(sinonChai)
chai.use(chaiString)

prepare(
  async () => {
    await dbInit()
    await models.sequelize.sync({ force: true })
  },
  () => {
    models.sequelize.close()
  }
)
