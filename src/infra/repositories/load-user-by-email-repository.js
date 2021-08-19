const { MissingParamError } = require('../../utils/errors')

module.exports = class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    if (!email) {
      throw new MissingParamError('email')
    }

    if (!this.userModel) {
      throw new MissingParamError('userModel')
    }

    const user = await this.userModel.findOne({
      email
    },
    {
      projection: {
        password: 1
      }
    })

    if (!user) return null

    return user
  }
}
