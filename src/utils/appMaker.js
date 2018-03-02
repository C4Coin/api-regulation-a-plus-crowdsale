const express = require('express')
const cors = require('cors')

const rest = require('./rest')

// TODO: In the real app we'll want to pay more attention to site security
// but for now I'm choosing to ignore this.

const makeApp = () => {
  const app = express()
  app.use(cors())
  // add any other middlewares here

  rest(app) // apply the routes
  return app
}

module.exports = makeApp
