const path = require('path'),
  webpack = require('webpack'),
  nodeExternals = require('webpack-node-externals')
  console.log('using /test/webpack.test.js')

module.exports = {
  entry: path.resolve(__dirname, '/.quasar/entry.js'),
  resolve: {
    alias: {
      src: path.resolve(__dirname, '/src'),
      components: path.resolve(__dirname, '/src/components'),
      layouts: path.resolve(__dirname, '/src/layouts'),
      pages: path.resolve(__dirname, '/src/pages'),
      assets: path.resolve(__dirname, '/src/assets'),
      variables: path.resolve(__dirname, '/.quasar/variables.styl'),
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: '/spec\.js', // /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: 'inline-cheap-module-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

// test specific setups
if (process.env.NODE_ENV === 'test') {
  module.exports.externals = [nodeExternals()]
  module.exports.devtool = 'inline-cheap-module-source-map'
}
