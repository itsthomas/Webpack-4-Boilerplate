const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    'js/index': './src/scripts/index', // generates index.js inside dist/js folder
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    // Serve this folder
    contentBase: path.join(__dirname, 'dist'),
    // overlay: true,
    port: 3000,
    compress: true,
    // must be `true` for SPAs
    historyApiFallback: true,
    // open browser on server start
    open: true,
    // Activating HMR (Hot Module Replacement)
    hot: true,
    // Control messages in browser console
    clientLogLevel: 'none',
    // Console messages in terminal
    noInfo: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      // Sass and CSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
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
          // Copies all inline and background-images to dist/images folder
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
      // Fonts
      {
        test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
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
    new HtmlWebPackPlugin({
      title: 'My App',
      // HTMl source
      template: './src/index.html',
      // HTML output
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/styles.[contenthash].css',
    }),
    new CleanWebpackPlugin('dist', {}),
  ],
};
