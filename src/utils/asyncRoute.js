// eslint-disable-next-line no-console
const defaultErrorHandler = console.error

const asyncRoute = fn => (req, res, next = defaultErrorHandler) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = asyncRoute
