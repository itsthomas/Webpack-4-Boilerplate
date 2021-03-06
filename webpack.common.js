/* eslint-disable prettier/prettier */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'; // devMode = undefined

module.exports = {
  // For a single entry js file
  // entry: ['babel-polyfill', './src/scripts/index.js'],

  // entry: {
  //   index: './src/scripts/index', // generates index.js inside dist/js folder
  //   users: './src/scripts/users', // generates users.js inside dist/js folder
  // },

  entry: {
    index: ['babel-polyfill', './src/scripts/index'], // generates index.js inside dist/js folder
    users: ['babel-polyfill', './src/scripts/users'] // generates users.js inside dist/js folder
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    // filename: 'js/[name].[hash:8].bundle.js',
    filename: devMode
      ? 'js/[name].bundle.js'
      : 'js/[name].[chunkhash:8].bundle.js' // use [chunkhash] only for production
  },
  // asset size limit. Default 250000 bytes
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    hints: 'warning' // false | "error" | "warning"
  },
  // Code splitting (Bundle splitting)
  // Seperates third party code from our bundle.js & uses them to generate a new file called vendor.js
  optimization: {
    runtimeChunk: 'single',
    namedModules: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
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
          configFile: './.eslintrc'
        }
      },
      // Babel for js and jsx files
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // HTML - Pars (understand) the HTML code
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      // Font loader - Uploads all fonts to dist/fonts folder
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: [/images/],
        use: [
          {
            loader: 'file-loader',
            options: {
              // name: '[name].[ext]',
              name: devMode ? '[name].[ext]' : '[name].[hash:8].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      // Good for not removing shared files from build directories.
      // exclude: ['index.html'],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // Generate index.html
    new HtmlWebPackPlugin({
      // HTMl source
      template: './src/index.html',
      // HTML output
      filename: './index.html',
      title: 'My App - Main',
      // hash: true,
      excludeChunks: ['users'], // vendor.css and vendor.bundle.js get added automaticaly
      // chunks: ['index', 'vendor'], // is exactly the same as above line
      favicon: './src/images/apple-icon-120x120.png'
    }),
    // Generate users.html
    new HtmlWebPackPlugin({
      // HTMl source
      template: './src/users.html',
      // HTML output
      filename: './users.html',
      title: 'My App - Users',
      // hash: true,
      chunks: ['users', 'vendor'], // Adding vendor.css and vendor.bundle.js to users.html
      favicon: './src/images/apple-icon-120x120.png'
    })
  ]
};
