const createRole = require('./createRole')

const createRoles = async roles => Promise.all(roles.map(createRole))

const createBaseData = ({ roles }) => Promise.all([createRoles(roles)])

module.exports = createBaseData
