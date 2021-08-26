
const request = require('supertest')
const app = require('../config/app')
const MongoHelper = require('../../infra/helpers/mongo-helper')

describe('Login Routes', () => {
  let db

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

  test('should return 200 when valid credentials are provided', async () => {
    await db.collection('users').insertOne({
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })

    await request(app)
      .post('/api/login')
      .send({
        email: 'valid_email@mail.com',
        password: 'hashed_password'
      })
      .expect(200)
  })
})
