const path = require('path');

module.exports = {
  entry: {
    bundle: './src/scripts/index', // generates bundle.js inside dist folder
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
      // Image loader
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          { loader: 'file-loader', options: { name: '[name].[hash][ext]', outputPath: 'images/' } },
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
};
