
const request = require('supertest')
const app = require('../app')
describe('Content Type', () => {
  test('should return json content type as default', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })

    await request(app).get('/test_content_type').expect('content-type', /json/)
  })
})
