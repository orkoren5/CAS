const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
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
                    MiniCssExtractPlugin.loader, //"style-loader",
                    { loader: 'css-loader', options: { url: true }},
                    "sass-loader",
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                type: "asset"
                // use: [
                //     {
                //         loader: 'file-loader',
                //         options: {
                //             name: '[path][name].[ext]',
                //             outputPath: 'fonts/'
                //         },
                //     }
                // ]
            },
            {
                test: /\.svg$/,
                exclude: [
                    path.resolve(__dirname, "src/client/assets/images")
                ],
                use: ['@svgr/webpack'],
            },
            {
                test: /\.svg$/,
                include: [
                    path.resolve(__dirname, "src/client/assets/images")
                ],
                type: "asset/inline"
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts']
    }
};