module.exports = {
  isEmalValid: true,
  email: '',
  isEmail (email) {
    this.email = email
    return this.isEmalValid
  }
}
