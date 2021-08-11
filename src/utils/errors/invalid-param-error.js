module.exports = class InvalidParamError extends Error {
  constructor (paramName) {
    super('InvalidParamError')
    this.name = 'InvalidParamError'
  }
}
