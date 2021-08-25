const MongoHelper = require('../helpers/mongo-helper')
const { MissingParamError } = require('../../utils/errors')
const UpdateAccessTokenRepository = require('./update-access-token-repository')

let db
let userModel

const makeSut = () => {
  const sut = new UpdateAccessTokenRepository()

  return sut
}

describe('UpdateAcessTokenRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
    userModel = await db.collection('users')
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await db.collection('users').deleteMany()
    await MongoHelper.disconnect()
  })
  test('should update the user with the given access token ', async () => {
    const sut = makeSut(userModel)

    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    await sut.update(fakeUser.insertedId, 'valid_token')
    const updatedUser = await userModel.findOne({ email: 'valid_email@mail.com' })
    expect(updatedUser.accessToken).toBe('valid_token')
  })

  test('should throw if no userId is provided', () => {
    const sut = makeSut()
    const promise = sut.update()

    expect(promise).rejects.toThrow(new MissingParamError('userId'))
  })

  test('should throw if no userId is provided', () => {
    const sut = makeSut()
    const promise = sut.update('valid_id')

    expect(promise).rejects.toThrow(new MissingParamError('accessToken'))
  })

  test('should throw if no userModel is provided', () => {
    const sut = new UpdateAccessTokenRepository()
    const promise = sut.update('valid_id', 'valid_accessToken')
    expect(promise).rejects.toThrow()
  })
})
