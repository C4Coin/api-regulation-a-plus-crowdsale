const loadYAML = require('./loadYAML')

const loadData = () => {
  const roles = loadYAML('roles')
  return { roles }
}

module.exports = loadData
