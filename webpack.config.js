const path = require('path');
const Webpack = require('webpack');

const baseConfig = {
  entry: {
    content: './packages/content/Content.ts',
    popup: './packages/popup/Index.ts',
    background: './packages/background/Index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: __dirname + '/public'
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: []
};

module.exports = baseConfig;
