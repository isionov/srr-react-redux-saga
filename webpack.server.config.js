const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin')

const getConfig = serverType => {
    const plugins = []

    if(serverType === 'clientNode') {
        plugins.push(new LoadablePlugin());
    }
    
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
    const config = {
        entry: {
            [serverType]: path.resolve(__dirname, `src/server/${serverType}.js`),
        },
        target: 'node',
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, `assets/${serverType}`),
            publicPath: `/assets/${serverType}/`,
            libraryTarget: 'commonjs2'
        },
        module: {
            rules
        },
        plugins,
        externals: nodeExternals(),
    }

    return config;
};
module.exports = [getConfig('clientNode'), getConfig('serverNode')]
