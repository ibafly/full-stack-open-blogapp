require("module-alias/register") // active module-alias
//const config = require("./utils/config")
const config = require("@utils/config")
const app = require("./server/app")
const http = require("http")
//const logger = require("./utils/logger")
const logger = require("@utils/logger")


/**
 * For frontend use hot loading when in development, else serve the static content
 */
if (!config.inProduction) {
  /* eslint-disable */
  const webpack = require('webpack')
  const middleware = require('webpack-dev-middleware')
  const hotMiddleWare = require('webpack-hot-middleware')
  const webpackConf = require('@root/webpack.config')
  /* eslint-enable */
  const compiler = webpack(webpackConf('development', { mode: 'development' }))

  const devMiddleware = middleware(compiler)
  app.use(devMiddleware)
  app.use(hotMiddleWare(compiler))
  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html')
    devMiddleware.waitUntilValid(() => {
      compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) return next(err)
        res.set('content-type', 'text/html')
        res.send(result)
        return res.end()
      })
    })
  })
} else {
  const DIST_PATH = path.resolve(__dirname, './dist')
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

  app.use(express.static(DIST_PATH))
  app.get('*', (req, res) => res.sendFile(INDEX_PATH))
}


const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on PORT ${config.PORT}`)
})
