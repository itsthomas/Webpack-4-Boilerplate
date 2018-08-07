const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
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
              publicPath: '../', // relative path to the dist folder starting from css folder
            },
          },
          { loader: 'css-loader', options: { url: true, sourceMap: true } },
          { loader: 'postcss-loader', options: { url: true, sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      // Copy all images to dist folder and minify them
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            // url-loader converts a file (if it’s smaller than the specified size) into
            // a Base64 URL and inserts this URL into the bundle to reduce the number of http requests
            // it increases the build time, so it’s better to use it only for production
            // for all the other images it uses file-loader, hence file-loader must be installed too
            loader: 'url-loader',
            options: {
              // Images larger than 40 KB won’t be inlined
              limit: 40 * 1024,
              name: '[name].[ext]',
              outputPath: 'images/',
            },
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
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
});
