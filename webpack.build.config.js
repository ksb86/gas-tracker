const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');

module.exports = [
    {
        entry: {
            client: './src/index.js'
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: `js/${pkg.name}.${pkg.version}.min.js`,
            chunkFilename: "[chunkhash].[id].chunk.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: ['babel-loader']
                }, {
                    test: /\.less$/,
                    exclude: /node_modules/,
                    loader: ExtractTextPlugin.extract([
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                minimize: true
                            }
                        },
                        'less-loader'
                    ])
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin(`css/${pkg.name}.${pkg.version}.min.css`),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    }
];
