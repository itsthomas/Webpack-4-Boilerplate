const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      // Sass and CSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      // Copy all images to dist folder
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]', outputPath: 'images/' },
          },
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    // Serve this folder
    contentBase: path.resolve(__dirname, 'dist'),
    // If you don't specify a port, port 8080 will be used by default
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
    overlay: true,
  },
});
