const { ProgressPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/Didact.js',
  mode: 'development',
  stats: 'errors-only',
  devServer: {
    client: {
      progress: true
    },
    port: 9000,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'mini-react',
      template: './public/index.html'
    }),
    new ProgressPlugin()
  ]
}