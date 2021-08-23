const { ObjectId } = require('mongodb')
const { MissingParamError } = require('../../utils/errors')

module.exports = class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, accessToken) {
    if (!userId) throw new MissingParamError('userId')
    if (!accessToken) throw new MissingParamError('accessToken')

    await this.userModel.updateOne({
      _id: ObjectId(userId)
    }, {
      $set: {
        accessToken
      }
    })
  }
}
