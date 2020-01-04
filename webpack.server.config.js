const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin')

const output = path.resolve(__dirname, 'dist/server');
const entry = path.resolve(__dirname, 'src/server/index.js');

const plugins = [
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendor',
    //     minChunks: Infinity,
    // }),
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
                    babelrc: true
                }
            }
        ]
    }
]

module.exports = {
    entry: {
        main: entry
    },
    target: 'node',
    output: {
        filename: '[name].bundle.js',
        path: output,
        globalObject: 'this'
    },
    module: {
        rules
    },
    plugins,
    devtool: 'source-map',
    externals: nodeExternals(),
}