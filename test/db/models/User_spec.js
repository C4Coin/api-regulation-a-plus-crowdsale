const { expect } = require("chai")

const models = require("../../../src/models")
const dummyData = require("../../utils/dummyData")

const { User } = models

describe("User", () => {
  afterEach(async () => {
    await User.destroy({ where: {} })
  })

  describe("create", () => {
    describe("given basic valid data", () => {
      const data = dummyData.userData()

      it("creates a user", async () => {
        const instance = await User.create(data, { include: [{ all: true }] })
        const js = instance.get({ plain: true })
        expect(js).to.have.property("username", data.username)
        expect(js).to.have.property("name", data.name)
        expect(js).to.have.property("email", data.email.toLowerCase())
        expect(js).to.have.property("passwordHash")
      })
    })
  })
})
