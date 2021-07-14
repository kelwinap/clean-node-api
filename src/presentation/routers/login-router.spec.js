class LoginRouter {
  route (httpResponse) {
    if (!httpResponse.body.email) {
      return {
        statusCode: 400
      }
    }
  }
}

describe('Login router', () => {
  it('should return 400 if no email is provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
