const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const pkg = require("./package.json");

module.exports = {
    name: "PRODUCTION_CLIENT",
    target: "web",
    node: {
        __dirname: false
    },
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
        path: path.join(__dirname, "dist"),
        filename: `${pkg.name}.${pkg.version}.min.js`
    },
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
                            importLoaders: 1,
                            minimize: true
                        }
                    },
                    "less-loader"
                ])
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(`${pkg.name}.${pkg.version}.min.css`),
        new UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};
