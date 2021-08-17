module.exports = {
  token: 'any_token',
  id: '',
  secret: '',
  sign (id, secret) {
    this.secret = secret
    this.id = id
    return this.token
  }
}
