const { expect } = require('chai')
const sinon = require('sinon')

const sequelize = {
  define: (modelName, modelDefn, metaData) => {
    const model = function() {}
    model.prototype.handlers = {}

    const attachHandler = name => handler => {
      model.prototype.handlers[name] = handler
    }

    const attachProp = key => {
      model.prototype[key] = 'some value'
    }

    model.beforeCreate = attachHandler('beforeCreate')
    model.beforeUpdate = attachHandler('beforeUpdate')
    model.belongsToMany = sinon.spy()

    model.modelName = modelName

    model.prototype.set = sinon.spy()
    Object.keys(modelDefn).forEach(attachProp)

    model.prototype.indexes = metaData.indexes
    return model
  }
}

const dataTypes = {
  STRING: 'STRING',
  VIRTUAL: 'VIRTUAL',
  TEXT: 'TEXT'
}

const checkModelName = model => modelName => {
  it(`is named '${modelName}'`, () => {
    expect(model.modelName).to.equal(modelName)
  })
}

const checkPropertyExists = instance => propName => {
  it(`has property ${propName}`, () => {
    expect(instance).to.have.property(propName)
  })
}

const checkUniqueIndex = instance => indexName => {
  it(`indexed a unique ${indexName}`, () => {
    expect(
      instance.indexes.find(
        index => index.unique === true && index.fields[0] === indexName
      )
    ).not.to.be.undefined
  })
}

const checkHandlerDefined = instance => handlerName => {
  it(`defined a ${handlerName} handler`, () => {
    expect(instance.handlers[handlerName]).to.be.a('function')
  })
}

module.exports = {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
  checkUniqueIndex,
  checkHandlerDefined
}
