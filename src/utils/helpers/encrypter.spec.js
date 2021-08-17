const bcrypt = require('bcrypt')

class Encrypter {
  async compare (value, hash) {
    const isvalid = bcrypt.compare(value, hash)
    return isvalid
  }
}

describe('Encrypter', () => {
  test('should return true if bcrypt returns true', async () => {
    const sut = new Encrypter()
    const isValid = await sut.compare('any_value', 'hased_value')
    expect(isValid).toBe(true)
  })

  test('should return false if bcrypt returns false', async () => {
    const sut = new Encrypter()
    bcrypt.isValid = false
    const isValid = await sut.compare('any_password', 'hased_value')
    expect(isValid).toBe(false)
  })

  test('should call bcrypt with correct values', async () => {
    const sut = new Encrypter()
    await sut.compare('any_password', 'hased_value')
    expect(bcrypt.value).toBe('any_password')
    expect(bcrypt.hash).toBe('hased_value')
  })
})
