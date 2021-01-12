// Imports: Dependencies
const path = require('path');
// Webpack Configuration
const config = {
  mode: 'production',
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
  }
};
// Exports
module.exports = config;