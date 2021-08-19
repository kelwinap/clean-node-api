const { MongoClient } = require('mongodb')
const { MissingParamError } = require('../../utils/errors')

let connection
let db
let userModel

class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    if (!email) {
      throw new MissingParamError('email')
    }

    const user = await this.userModel.findOne({ email })

    if (!user) return null

    return user
  }
}

const makeSut = () => {
  userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return sut
}

describe('LoadUserByEmailRepository', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    db = await connection.db()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await connection.close()
  })
  test('should return if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('should return an user if user is found', async () => {
    const sut = makeSut()
    await userModel.insertOne({
      email: 'valid_email@mail.com'
    })
    const user = await sut.load('valid_email@mail.com')
    expect(user.email).toBe('valid_email@mail.com')
  })

  test('should return error if no email is provided', () => {
    const sut = new LoadUserByEmailRepository()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})
