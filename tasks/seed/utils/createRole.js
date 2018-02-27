const { Role } = require("../../../src/models")

const createRole = async ({ name }) => Role.create({ name })

module.exports = createRole
