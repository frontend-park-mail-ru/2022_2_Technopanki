const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')

module.exports = {
    entry: './SReact/tess.js',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
}