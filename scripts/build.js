const path = require('path');
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const resolve = dir => path.join(__dirname, '..', dir)

const webpackConfig = {
  mode: "production",
  devtool: 'source-map',
  entry: "./src/index.js",
  externals: {
    quill: 'quill',
    vue: 'vue',
    axios: 'axios'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
    publicPath: '/',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'quill': 'quill/dist/quill.js',
    }
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
};

module.exports = webpackConfig;
