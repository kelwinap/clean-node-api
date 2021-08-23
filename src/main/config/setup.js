const corsMiddleware = require('./middlewares/cors')
const jsonParserMiddleware = require('./middlewares/json-parser')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(corsMiddleware)
  app.use(jsonParserMiddleware)
}
