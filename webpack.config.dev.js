const path = require('path');
const Webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

const devConfig = {
    devtool: 'source-map',
};

module.exports = Object.assign(baseConfig, devConfig);
