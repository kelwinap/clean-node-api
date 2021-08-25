const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../../infra/helpers/mongo-helper')
module.exports = class LoadUserByEmailRepository {
  async load (email) {
    if (!email) {
      throw new MissingParamError('email')
    }

    const db = await MongoHelper.getDb()
    const userModel = await db.collection('users')

    const user = await userModel.findOne({
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
