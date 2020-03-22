const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PORT = 3000;

const ROOT_PATH = path.resolve(__dirname);

module.exports = env => ({
    'entry': path.join(ROOT_PATH, 'src/js/index.js'),
    'output': {
        'path': path.join(ROOT_PATH, 'build'),
        'filename': env.production ? 'static/js/bundle.min.js' : 'static/js/bundle.js'
    },
    'mode': env.production ? 'production' : 'development',
    'devtool': env.production ? false : 'source-map',
    'devServer': {
        'compress': true,
        'hot': true,
        'inline': true,
        'open': true,
        'port': PORT,
        'overlay': true,
        'historyApiFallback': true
    },
    'optimization': {
        'minimize': true
    },
    'performance': {
        'hints': false
    },
    'resolve': {
        'extensions': [
            '.js',
            '.jsx'
        ],
        //  Sets relative import path to src as root
        'modules': [
            path.join(ROOT_PATH, 'src'),
            'node_modules'
        ]
    },
    'plugins': [
        new HtmlWebpackPlugin({
            'inject': true,
            'template': path.join(ROOT_PATH, 'src/html/index.html'),
            'filename': './index.html'
        }),
        new MiniCssExtractPlugin({
            'filename': 'static/css/[name].css',
            'chunkFilename': 'static/css/[id].css'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    'module': {
        'rules': [
            {
                'test': /\.(js|jsx)$/,
                'exclude': /node_modules/,
                'use': [
                    {
                        'loader': 'babel-loader',
                        'options': {
                            'presets': [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ]
                        }
                    }
                ]
            },
            {
                'test': /\.html$/,
                'use': ['html-loader']
            },
            {
                'test': /\.css$/,
                'use': [
                    {
                        'loader': MiniCssExtractPlugin.loader,
                        'options': {
                            'publicPath': (resourcePath, context) =>
                                `${path.relative(path.dirname(resourcePath), context)}/`
                        }
                    },
                    'css-loader'
                ]
            },
            {
                'test': /\.(jpe?g|png|svg|gif)$/i,
                'use': [
                    {
                        'loader': 'file-loader',
                        'options': {
                            'name': '[name].[ext]',
                            'publicPath': 'static/images',
                            'outputPath': 'static/images'
                        }
                    }
                ]
            }
        ]
    }
});
