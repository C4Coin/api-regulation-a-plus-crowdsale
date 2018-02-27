const { expect } = require("chai")

const models = require("../../../src/models")
const dummyData = require("../../utils/dummyData")

const { Role } = models

describe("Role", () => {
  afterEach(async () => {
    await Role.destroy({ where: {} })
  })

  describe("create", () => {
    describe("given basic valid data", () => {
      const data = dummyData.roleData()

      it("creates a role", async () => {
        const instance = await Role.create(data, { include: [{ all: true }] })
        const js = instance.get({ plain: true })
        expect(js).to.have.property("name", data.name)
      })
    })
  })
})
