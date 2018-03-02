const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

const encrypt = async password => bcrypt.hash(password, SALT_ROUNDS)
const authenticate = async (password, hash) => bcrypt.compare(password, hash)

module.exports = {
  encrypt,
  authenticate
}
