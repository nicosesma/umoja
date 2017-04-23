require('./config/environment')

// const config = require('./config')
// const path = require('path')

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

// const webpackErrorNotificationPlugin = (process.env.NODE_ENV === 'development')
//   ? new require('webpack-error-notification')
//   : new webpack.DefinePlugin({})

// const APP_ROOT = config.APP_ROOT

// console.log('APP_ROOT', APP_ROOT)

const root = __dirname

const babelConfig = {
  babelrc: true,
  presets: [
    'es2015',
    'react'
  ]
}

module.exports = {
  context: root + '/client',
  entry: root + '/client/main.js',
  output: {
    path: root + '/build/public',
    filename: 'browser.js'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: babelConfig
      },
      {
        test: /.css?$/,
        loader: 'style-loader!css-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(ico|jpg|jpeg|png)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'assets/[name].[ext]'
        }
      }
    ]
  },
  devtool: 'sourcemap',
  plugins: [
    new HTMLWebpackPlugin({
      inject: true,
      template: root + '/client/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new ExtractTextPlugin('browser.css'),
    // new webpackErrorNotificationPlugin
  ]
}
