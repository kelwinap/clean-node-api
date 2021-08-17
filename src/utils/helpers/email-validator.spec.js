const EmailValidator = require('./email-validator')
const validator = require('validator')
const { MissingParamError } = require('../errors')

describe('Email Validator', () => {
  test('should return true if validators return true', () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })

  test('should return false if validators return false', () => {
    validator.isEmalValid = false
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('invalid_email@mail.com')
    expect(isEmailValid).toBe(false)
  })

  test('should call validator with correct email', () => {
    const sut = new EmailValidator()
    const email = 'email@mail.com'
    sut.isValid(email)

    expect(validator.email).toBe(email)
  })

  test('should throw if no params are provided', () => {
    const sut = new EmailValidator()
    expect(() => { sut.isValid() }).toThrow(new MissingParamError('email'))
  })
})
