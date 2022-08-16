const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/Didact.js',
  mode: 'development',
  devServer: {
    compress: true,
    port: 9000,
  },
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
    })
  ]
}