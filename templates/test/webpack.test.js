const path = require('path'),
  nodeExternals = require('webpack-node-externals');

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
      '@quasar': 'quasar-framework/dist/quasar.mat.esm.js', // is this right? seems hacky
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
        test: /\.js$|\.vue$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: {
            esModules: true,
            produceSourceMap: true,
            fixWebpackSourcePaths: true
          }
        },
        enforce: 'post',
        exclude: /node_modules|\.spec\.js$/,
      }
    ]
  },
  // target: 'node',  // webpack should compile node compatible code (breaks stuff)
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: "inline-cheap-module-source-map"
}
