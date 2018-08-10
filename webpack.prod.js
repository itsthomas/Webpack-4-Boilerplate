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
      // Copy all images to dist folder
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        exclude: [/fonts/],
        use: [
          {
            /* url-loader converts an image (if it's smaller than the specified size) into a Base64 URL 
            and inserts this URL into the bundle to reduce the number of http requests.
            For all the other images it uses file-loader to upload them to dist/images folder, 
            hence file-loader must be installed too.
            It increases the build time, so it’s better to use it only for production. */
            loader: 'url-loader',
            options: {
              // Images larger than 30 KB won’t be inlined
              limit: 40 * 1024,
              name: '[name].[hash:8].[ext]',
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
                enabled: true,
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
      filename: 'css/[name].[contentHash:8].css',
      // filename: 'css/[name].css',
      // chunkFilename: 'css/[id].css',
    }),
  ],
});
