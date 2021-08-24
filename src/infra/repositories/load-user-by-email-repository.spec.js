const { ObjectId } = require('mongodb')
const { MissingParamError } = require('../../utils/errors')
const MongoHelper = require('../helpers/mongo-helper')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')

let db
let userModel

const makeSut = () => {
  userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return sut
}

describe('LoadUserByEmailRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany({})
  })

  afterAll(async () => {
    await db.collection('users').deleteMany()
    await MongoHelper.disconnect()
  })
  test('should return if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('should return an user if user is found', async () => {
    const sut = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    const createdUser = await userModel.findOne({ _id: ObjectId(fakeUser.insertedId) })
    const user = await sut.load('valid_email@mail.com')
    expect(user).toEqual({
      _id: createdUser._id,
      password: createdUser.password
    })
  })

  test('should throw if no email is provided', () => {
    const sut = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('should throw if no userModel is provided', () => {
    const sut = new LoadUserByEmailRepository()
    const promise = sut.load('valid_email@mail.com')
    expect(promise).rejects.toThrow(new MissingParamError('userModel'))
  })
})
