const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.config.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = merge(config, {
    mode: "development",
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
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
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'), // 本地服务器所加载的页面所在的目录
        host: '127.0.0.1',
        port: 6688,
        publicPath: '/page/static/',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        disableHostCheck: true  // 解决Invalid Host Header错误
        // historyApiFallback: true,  // 不跳转
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new StyleLintPlugin({
            configFile: '.stylelintrc.js',
            failOnError: false, // 是否开启css存在不规范，直接构建失败
            syntax: 'scss',
            cache: true, // 再次运行时只对改变的文件进行检查(提升stylelint效率)
            fix: true // 是否开启构建自动修复
        })
    ]
});
