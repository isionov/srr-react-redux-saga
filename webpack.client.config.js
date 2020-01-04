const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin')

const output = path.resolve(__dirname, 'dist/client');
const entry = path.resolve(__dirname, 'src/client/index.js');

const plugins = [
    new HtmlWebpackPlugin({
        template: './src/client/index.pug'
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendor',
    //     minChunks: Infinity,
    // }),
    new LoadablePlugin(),
]

const rules = [
    {
        test: /\.pug?$/,
        use: 'pug-loader'
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
        main: entry,
        // vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'redux-saga', 'react-redux'],
    },
    output: {
        filename: '[name].bundle.js',
        path: output,
        publicPath: '/assets/',
    },
    module: {
        rules
    },
    plugins,
    devtool: 'source-map',
}