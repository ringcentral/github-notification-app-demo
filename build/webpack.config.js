require('dotenv').config()
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const { identity } = require('lodash')
const path = require('path')
const { env } = require('./common')
const isProd = env === 'production'
const {
  extractTextPlugin1,
  stylusSettingPlugin
} = require('./plugins')
const devServer = require('./dev-server')
const rules = require('./rules')
const prod = require('./production')

let config = {
  mode: 'development',
  entry: {
    app: './src/client/app.js'
  },
  output: {
    path: path.resolve(__dirname, '../deploy/dist/static'),
    filename: 'js/[name].bundle.js',
    publicPath: '/',
    chunkFilename: 'js/[name].bundle.js',
    libraryTarget: 'var',
    library: 'Rc'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  target: 'web',
  watch: true,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.json']
  },
  module: {
    rules
  },
  devtool: 'source-map',
  plugins: [
    stylusSettingPlugin,
    extractTextPlugin1,
    new AntdDayjsWebpackPlugin()
  ].filter(identity),
  devServer
}

if (isProd) {
  config = prod(config)
}

module.exports = config
