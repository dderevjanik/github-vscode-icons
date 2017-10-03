const path = require('path');
const Webpack = require('webpack');

const config = {
    entry: {
        'content': './src/Index.ts'
    },
    target: 'web',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    devServer: {
        contentBase: __dirname + '/public'
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json']
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                test: /\.tsx?$/,
                loader: 'ts-loader?configFile="tsconfig.json"',
                options: {
                    configFile: 'tsconfig.json'
                }
            }
        ]
    },
    plugins: []
};

module.exports = config;
