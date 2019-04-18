const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");



module.exports = {
    name: "DEVELOPMENT_CLIENT",
    target: "web",
    node: {
        __dirname: false
    },
    entry: ["@babel/polyfill", "./src/client.js"],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "client.js"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ["babel-loader"]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract([
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    "less-loader"
                ])
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};
