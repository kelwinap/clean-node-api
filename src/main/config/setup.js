const corsMiddleware = require('./middlewares/cors')
const jsonParserMiddleware = require('./middlewares/json-parser')
const contentTypeMiddleware = require('./middlewares/content-type')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(corsMiddleware)
  app.use(jsonParserMiddleware)
  app.use(contentTypeMiddleware)
}
