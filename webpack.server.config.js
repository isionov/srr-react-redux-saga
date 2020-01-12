const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin')

const output = path.resolve(__dirname, 'assets/server');
const entry = path.resolve(__dirname, 'src/server/index.js');

const plugins = [
    new LoadablePlugin(),
]

const rules = [
    {
        test: /\.(html)$/,
        use: {
            loader: 'html-loader'
        }
    },
    {
        test: /\.js|jsx?$/,
        exclude: /(node_modules)/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    caller: { target: 'node' }
                }
            }
        ]
    }
]

module.exports = {
    entry,
    target: 'node',
    output: {
        filename: '[name].js',
        path: output,
        publicPath: '/assets/server/',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules
    },
    plugins,
    externals: nodeExternals(),
}