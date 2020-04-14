const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const alias = require('./alias');
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

console.log('NODE_ENV: ', process.env.NODE_ENV);

// 入口文件
const entryFileConfig = {
    // 首页
    'index': 'index'
};

// *输出文件
const outputFileConfig = {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].js',
    publicPath: '/page/static/',        // 这里设置ares资源前缀
    // chunkFilename: '[name].chunk.js'
};

const config = {
    context: path.resolve(__dirname, '../src'),
    entry: entryFileConfig,
    output: outputFileConfig,
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
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: [
                    /node_modules/
                ],
                use: {
                    loader: 'eslint-loader'
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|svg|gif|eot|otf|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new LoadablePlugin({
            writeToDisk: IS_DEVELOPMENT ? true : false
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                react: {
                    name: "react.chunk",
                    test: (module) => {
                        return /react|react-dom|react-router-dom|history/.test(module.context);
                    },
                    chunks: "all",
                    priority: 10 // 优先级
                },
                common: { // 打包其余的的公共代码
                    minChunks: 2, // 引入三次及以上被打包
                    name: 'common', // 分离包的名字
                    chunks: 'all',
                    priority: 5,
                    // test: () => {
                    //     return !/react|react-dom|history/.test(module.context);
                    // }
                }
            }
        }
    }
};

module.exports = config;
