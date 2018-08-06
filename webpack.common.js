const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  // For a single entry js file
  // entry: ['babel-polyfill', './src/scripts/index.js'],

  // entry: {
  //   index: './src/scripts/index', // generates index.js inside dist/js folder
  //   users: './src/scripts/users', // generates users.js inside dist/js folder
  // },

  entry: {
    index: ['babel-polyfill', './src/scripts/index'], // generates index.js inside dist/js folder
    users: ['babel-polyfill', './src/scripts/users'], // generates users.js inside dist/js folder
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash:8].bundle.js',
  },
  module: {
    rules: [
      // ESlint
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          emitWarning: true,
          configFile: './.eslintrc',
        },
      },
      // Babel for js and jsx files
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // HTML - Pars (understand) the HTML code
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      // Font loader
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]', outputPath: 'fonts/' },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('dist', {
      // Good for not removing shared files from build directories.
      // exclude: ['index.html'],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new HtmlWebPackPlugin({
      title: 'My App - Main',
      // HTMl source
      template: './src/index.html',
      // HTML output
      filename: './index.html',
      excludeChunks: ['users'],
    }),
    new HtmlWebPackPlugin({
      title: 'My App - Users',
      // HTMl source
      template: './src/users.html',
      // HTML output
      filename: './users.html',
      chunks: ['users'],
    }),
  ],
};
