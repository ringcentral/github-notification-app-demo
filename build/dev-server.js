
const { env } = process
const devPort = env.devPort || 6066
const host = env.host || '127.0.0.1'

module.exports = {
  contentBase: '../deploy/dist/static',
  historyApiFallback: true,
  hot: true,
  inline: true,
  host,
  port: devPort,
  disableHostCheck: true,
  proxy: {
    '/': {
      target: `http://${env.RINGCENTRAL_HOST}:${env.RINGCENTRAL_PORT}`,
      bypass: function (req, res, proxyOptions) {
        if (req.path.includes('.bundle.')) {
          return req.path
        }
      }
    }
  }
}
