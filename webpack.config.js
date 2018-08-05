const path = require('path');

module.exports = {
  entry: {
    bundle: './src/scripts/index', // generates bundle.js inside dist/js folder
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // Sass and CSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: 'style-loader' },

          // Generate a link CSS
          // { loader: 'css-loader', options: { url: true, sourceMap: true } },

          // Generate inline CSS
          { loader: 'css-loader' },

          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      // {
      //   test: /\.s?css/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'sass-loader'
      //   ]
      // }
    ],
  },
  devServer: {
    // Serve this folder
    contentBase: path.join(__dirname, 'dist'),
  },
  devtool: 'source-map',
};
