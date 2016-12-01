//webpack.config.js
var webpack = require("webpack");

module.exports = {
  context: __dirname + '/public/javascripts',
  entry: {
    'main': './main.js',
    'join': './join.js',
    'prediction': './prediction.js',
    'stat': './stat.js',
    'ranking': './ranking.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|libs)/,
        loader: 'babel', // 'babel-loader' is also a valid name to reference
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  output: {
    filename: './dist/[name].bundle.js'
  },
  devtool: '#inline-source-map'
};