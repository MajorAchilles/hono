// Imports: Dependencies
const path = require('path');
const webpack = require("webpack");

// Webpack Configuration
const config = {
  mode: 'development',
  // Entry
  entry: ['./lib/index.js'],
  target: 'node',
  // Output
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'hono.js',
  },
  // Loaders
  module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ]
  },
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
  ],
  devtool: 'source-map'
};
// Exports
module.exports = config;