const express = require("express")
const cors = require("cors")

// TODO: In the real app we'll want to pay more attention to site security
// but for now I'm choosing to ignore this.
const makeApp = () => {
  const app = express()
  app.use(cors())
  app.get("/ping", (req, res) => {
    res.json({
      response: "Okay"
    })
  })
  // API routes
  // app.get('/api/v1', getAPI)

  return app
}

module.exports = makeApp
