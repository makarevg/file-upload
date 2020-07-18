const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const DEVELOPMENT_MODE = 'development';
const PRODUCTION_MODE = 'production';
const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === PRODUCTION_MODE;

const SOURCE_PATH = './src/';
const DIST_PATH = './dist/';

module.exports = {
  mode: isProduction ? PRODUCTION_MODE : DEVELOPMENT_MODE,
  entry: path.join(__dirname, SOURCE_PATH, 'index.ts'),
  output: {
    path: path.join(__dirname, DIST_PATH),
    filename: 'js/[name].js',
    chunkFilename: 'js/chunk.[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: !isProduction,
              modules: {
                localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer'),
              ],
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: DEVELOPMENT_MODE, // use 'development' unless process.env.NODE_ENV is defined
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'File upload Demo',
      // template: 'include-template.ejs',
      meta: {
        charset: 'UTF-8',
        viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui',
        'format-detection': 'telephone=no',
      },
      hash: true,
      filename: 'include.html',
      scriptLoading: 'defer',
    }),
  ],
  watch: !isProduction,
  devtool: isProduction ? false : 'inline-source-map',
  node: {
    fs: 'empty',
    net: 'empty',
  },
};
