const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';    //devMode = undefined

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
    // filename: 'js/[name].[hash:8].bundle.js',
    filename: devMode ? 'js/[name].bundle.js' : 'js/[name].[chunkhash:8].bundle.js', // use [chunkhash] only for production
  },
  // asset size limit. Default 250000 bytes
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    hints: 'warning', // false | "error" | "warning"
  },
  // Bundle splitting
  optimization: {
    runtimeChunk: 'single',
    namedModules: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
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
      // Font loader - Uploads all fonts to dist/fonts folder
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: { 
              // name: '[name].[ext]', 
              name: devMode ? '[name].[ext]' : '[name].[hash:8].[ext]',
              outputPath: 'fonts/' },
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
    // Generate index.html
    new HtmlWebPackPlugin({
      title: 'My App - Main',
      // HTMl source
      template: './src/index.html',
      // HTML output
      filename: './index.html',
      excludeChunks: ['users'],
      favicon: './src/images/apple-icon-120x120.png',
    }),
    // Generate users.html
    new HtmlWebPackPlugin({
      title: 'My App - Users',
      // HTMl source
      template: './src/users.html',
      // HTML output
      filename: './users.html',
      chunks: ['users'],
      favicon: './src/images/apple-icon-120x120.png',
    }),
  ],
};
