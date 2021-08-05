module.exports = class UnauthorizedError extends Error {
  constructor (paramName) {
    super('unauthorized')
    this.name = 'UnauthorizedError'
  }
}
