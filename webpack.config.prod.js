const path = require('path');
const Webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const prodConfig = {
  plugins: [new Webpack.optimize.AggressiveMergingPlugin(), new UglifyJsPlugin()]
};

module.exports = Object.assign(baseConfig, prodConfig);
