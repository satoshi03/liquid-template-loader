const HtmlWebpackPlugin = require('html-webpack-plugin');
const Liquid = require('liquid');

module.exports = {
  mode: 'development',
  output: {
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: require.resolve('../../dist/cjs.js'),
            options: {
              data: {
                name: 'satoshi',
              },
              tags: {
                MyTagFoo: class MyTag extends Liquid.Tag {
                  render () {
                    return 'Hello World Foo';
                  }
                },
                MyTagBar: class MyTag extends Liquid.Tag {
                  render () {
                    return 'Hello World Bar';
                  }
                }
              }
            }
          }
        ]
      },
    ],
  },
  devServer: {
    hot: true,
    contentBase: __dirname,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html'
    })
  ]
}
