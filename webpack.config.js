const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const PRODUCTION = 'production';
const DEVELOPMENT = 'development';

module.exports = {
    entry: {
        main: './src/App.tsx',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'resolve-url-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(png|jpe?g)$/i,
                loader: 'file-loader',
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.d.ts', '.ts', '.tsx', '.js', '.scss'],
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
    },
    devtool: 'source-map',
    devServer: {
        static: './dist',
        hot: true,
        allowedHosts: 'all',
        port: 8000,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                'server/server.js',
                './src/static/index.html',
                './src/static/favicon.ico',
                { from: './src/static/image', to: 'image' },
            ],
        }),
        new webpack.DefinePlugin({
            __DEV__: process.env.NODE_ENV === DEVELOPMENT,
        }),
    ],
    mode: process.env.NODE_ENV === PRODUCTION ? PRODUCTION : DEVELOPMENT,
};
