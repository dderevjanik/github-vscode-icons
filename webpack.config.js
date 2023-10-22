const fs = require('fs');

const path = require('path');
const Webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = {
  devtool: 'source-map',
  entry: {
    content: './packages/content/Content.ts',
    popup: './packages/popup/Popup.tsx',
    background: './packages/background/Background.ts',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  devServer: {
    contentBase: __dirname + '/public',
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/vscode-icons-ts/build/icons/**/*',
          to: 'icons/[base]',
        },
      ],
    }),
  ],
};

module.exports = baseConfig;
