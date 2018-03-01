/* eslint-disable camelcase */
const { getPing, getVersions, v1_postLogin, v1_postLogout } = require('./api')

module.exports = {
  get: {
    '/': getVersions,
    '/ping': getPing
  },
  post: {
    '/api/v1/login': v1_postLogin,
    '/api/v1/logout': v1_postLogout
  }
}
