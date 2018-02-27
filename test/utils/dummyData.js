const faker = require("faker")

const userData = fields => ({
  username: faker.lorem.word(),
  name: faker.company.companyName(),
  password: faker.lorem.word(),
  email: faker.internet.exampleEmail(),
  ...fields
})

const roleData = fields => ({
  name: faker.lorem.word(),
  ...fields
})

module.exports = {
  userData,
  roleData
}
