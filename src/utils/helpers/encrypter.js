const bcrypt = require('bcrypt')
module.exports = class Encrypter {
  async compare (value, hash) {
    const isvalid = bcrypt.compare(value, hash)
    return isvalid
  }
}
