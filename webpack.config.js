const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/client/index.tsx",
    mode: "development",
    devtool: "source-map",
    output: {
        path: path.join(__dirname, "dist", "client"),
        filename: "[name].[chunkhash].js",
        library: "AltiusDemo",
        libraryTarget: "umd"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'index.html'),
            favicon: path.join(__dirname, 'public', 'favicon.ico')
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from:  path.join(__dirname, "public"), to: "" }
            ]
        })
    ],
    optimization: {
        minimize: false, // disables minify
        runtimeChunk: true,
        splitChunks: {
            chunks: "all",
            minSize: 0,
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: "react",
                    chunks: "all"
                },
                material: {
                    test: /[\\/]node_modules[\\/]@material-ui[\\/]/,
                    name: "material",
                    chunks: "all"
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: -10
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts']
    }
};