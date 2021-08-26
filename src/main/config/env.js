module.exports = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  tokenSecret: process.env.TOKEN_SECRET || 'token_secret',
  port: process.env.PORT || 5858
}
