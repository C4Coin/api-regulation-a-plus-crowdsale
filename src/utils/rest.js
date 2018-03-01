const routes = require('../routes')

const METHODS = ['get', 'post', 'patch', 'put', 'delete']

const rest = app => {
  const mapRoute = method => {
    if (routes[method]) {
      Object.keys(routes[method]).forEach(route => {
        app[method](route, routes[method][route])
      })
    }
  }

  METHODS.forEach(mapRoute)
}

module.exports = rest
