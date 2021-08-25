const { ObjectId } = require('mongodb')
const { MissingParamError } = require('../../utils/errors')
const mongoHelper = require('../helpers/mongo-helper')

module.exports = class UpdateAccessTokenRepository {
  async update (userId, accessToken) {
    const db = await mongoHelper.getDb()
    const userModel = await db.collection('users')

    if (!userId) throw new MissingParamError('userId')
    if (!accessToken) throw new MissingParamError('accessToken')

    await userModel.updateOne({
      _id: ObjectId(userId)
    }, {
      $set: {
        accessToken
      }
    })
  }
}
