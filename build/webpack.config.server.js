const path = require('path');
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const alias = require('./alias');
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 入口文件
const entryFileConfig = {
    'index': 'pages/index'
};

// *输出文件
const outputFileConfig = {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    libraryTarget: "commonjs2",
    publicPath: '/page/static/'     // 这里设置ares资源前缀
};

const config = {
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname, '../src'),
    entry: entryFileConfig,
    output: outputFileConfig,
    target: 'node',
    externals: [
        '@loadable/component',
        nodeExternals()
    ],
    resolve: {
        alias,
        extensions: ['.js', '.jsx', '.css', '.scss'],
        modules: [
            // 告诉 webpack 解析模块时应该搜索的目录
            path.resolve(__dirname, '../src'),
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            caller: {
                                target: 'node'
                            }
                        }
                    }
                ]
            },
            // {
            //     test: /\.(scss|css)$/,
            //     use: [
            //         {
            //             loader: 'ignore-loader'
            //         }
            //     ]
            // }
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new LoadablePlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};

module.exports = config;
