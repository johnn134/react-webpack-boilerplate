const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const ENTRY_PATH = path.resolve(ROOT_PATH, 'src/js/index');
const TEMPLATE_PATH = path.resolve(ROOT_PATH, 'src/index.html');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

const PORT = 8080;

const plugins = [
    new HtmlWebpackPlugin({
        inject: 'body',
        template: TEMPLATE_PATH
    }),
    new ExtractTextPlugin('css/styles.css'),
    new OpenBrowserPlugin({
        url: `http://localhost:${PORT}/`
    }),
    new webpack.HotModuleReplacementPlugin()
];

if (fs.existsSync('./src/images')) {

    plugins.push(
        new CopyWebpackPlugin([
            {
                from: './src/images',
                to: './images'
            }
        ]),
    );

}

var config = {
    entry: ENTRY_PATH,
    devtool: 'source-map',
    plugins: plugins,
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['babel-preset-env', 'babel-preset-react', 'babel-preset-stage-2']
                }
            },
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css?$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.png$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=images/[name].[ext]'
            }
        ]
    }
};

module.exports = config;
