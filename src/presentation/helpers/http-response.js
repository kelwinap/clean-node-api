const UnauthorizedError = require('./unauthorized-error')
module.exports = class HttpResponse {
  static ok (acessToken) {
    return {
      statusCode: 200,
      body: acessToken
    }
  }

  static badRequest (error) {
    return {
      statusCode: 400,
      body: error
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }

  static unauthorized () {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    }
  }
}
