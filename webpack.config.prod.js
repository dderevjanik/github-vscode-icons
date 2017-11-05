const path = require('path');
const Webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

const prodConfig = {
    plugins: [
        new Webpack.optimize.AggressiveMergingPlugin(),
        new Webpack.optimize.UglifyJsPlugin({
            // compress: (process.env.NODE_ENV === 'production'),
            beautify: false,
            output: {
                comments: false
            },
            mangle: {
                screw_ie8: true
            },
            compress: {
                screw_ie8: true,
                warnings: false,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                negate_iife: false
            },
        })
    ]
};

module.exports = Object.assign(baseConfig, prodConfig);
