const { MongoClient } = require('mongodb')

module.exports = {
  async connect (uri) {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = await this.client.db()
  },
  async disconnect () {
    await this.client.close
    this.client = null
    this.db = null
  },
  async getDb () {
    if (!this.client || !this.isConnected()) {
      await this.connect(this.uri)
    }
    return this.db
  },

  async isConnected () {
    this.client.on('topologyClosed', _ => { return false })
  }
}
