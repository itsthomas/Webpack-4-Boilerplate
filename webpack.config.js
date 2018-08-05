const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

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
  },
  devtool: 'source-map',
  module: {
    rules: [
      // Sass and CSS
      {
        test: /\.s?css/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
            options: { name: '[name].[hash][ext]', outputPath: 'images/' },
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
    new HtmlWebPackPlugin({
      title: 'My App',
      // HTMl source
      template: './src/index.html',
      // HTML output
      filename: './index.html',
    }),
  ],
};
