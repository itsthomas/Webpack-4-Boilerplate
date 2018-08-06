const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  // For a single entry js file
  // entry: ['babel-polyfill', './src/scripts/index.js'],

  // For multiple entry js files, which get generated directyly in dist folder
  // entry: {
  //   app: "./src/scripts/app.js",
  //   vendor: "./src/scripts/app.js",
  // },
  // output: {
  //   filename: "./dist/[name].bundle.js"
  // },

  // Generating multiple js files
  entry: {
    'js/index': './src/scripts/index', // generates index.js inside dist/js folder
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].bundle.js',
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
      // Copy all images to dist folder and minify them
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]', outputPath: 'images/' },
          },
          // Minify PNG, JPEG, GIF, SVG and WEBP images with imagemin
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
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
    new HtmlWebPackPlugin({
      title: 'My App',
      // HTMl source
      template: './src/index.html',
      // HTML output
      filename: './index.html',
    }),
  ],
};