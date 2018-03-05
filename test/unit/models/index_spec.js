const { expect } = require('chai')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const path = require('path')

class mockSequelize {
  import(fpath) {
    const name = path.basename(fpath, path.extname(fpath))
    const associate = sinon.spy()
    return { name, associate }
  }
}

describe('models', () => {
  const models = proxyquire('../../../src/models', {
    sequelize: mockSequelize
  })

  const testModel = mName => {
    it(`loaded the ${mName} model`, () => {
      expect(models).to.have.property(mName)
    })

    it(`associated ${mName}`, () => {
      expect(models[mName].associate).to.have.been.calledOnce
    })
  }
  ;['User', 'Role'].forEach(testModel)
})
