const webpack=require('webpack');
const path=require('path');
const _ = require('lodash');
const merge = require('webpack-merge');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');//生产打包清空目录下文件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//包体组成分析
const webpackCommonConfig = require('./webpack.common.config');

const wepackBuildConfig = {
    entry:{
        main:'./src/main.jsx',
        vendor: ['react', 'react-dom','react-router-dom','moment','react-particles-js','whatwg-fetch']
    },
    output:{
        // path.resolve()方法可以将多个路径解析为一个规范化的绝对路径;
        // path.join()方法可以连接任意多个路径字符串;
        // process.cwd() 是当前执行node命令时候的文件夹地址 ——工作目录，保证了文件在不同的目录下执行时，路径始终不变;
        // __dirname 是被执行的js文件的地址 ——文件所在目录
        path:path.resolve(process.cwd(),'build'),
        filename:'[name].min.js',
        publicPath:'./',
        chunkFilename: '[name].[chunkhash:5].js'
    },
    plugins:[
        new CleanWebpackPlugin(['build/*.*']),
        new BundleAnalyzerPlugin({
            generateStatsFile: true
        }),//包体分析
        new webpack.ContextReplacementPlugin(
            /moment[\\\/]locale$/,
            /^\.\/(zh-cn)$/
        ),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production'), //production & development,
                'PUBLIC_PATH': JSON.stringify('http://127.0.0.1')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',//公共模块的名称，与entry里的名字对应
            filename:'vendor.min.js',//公开模块的文件名（生成的文件名）
            chunks: ['main'],
            minChunks: Infinity//为Infinity 仅仅创建公共组件块，不会把任何modules打包进去
        }),
        //webpack内置js压缩插件
        new webpack.optimize.UglifyJsPlugin({
            sourceMap:true,
            output:{
                ascii_only:true
            },
            compress: {//去处警告，打印登调试信息
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        }),
        new HtmlWebpackPlugin({
            title:'Collect',
            template:'./public/indexModal.html',
            // favicon:'./public/favicon.ico',
            inject:'body',
            chunks:['main','vendor'],
            hash:true,//防止缓存
            filename:path.resolve(process.cwd(),'./build/index.html'),
            minify:{
                removeComments:true,
                collapseWhitespace:true
            }
        })
    ],
    devtool:'sourceMap'
};

module.exports = merge(
    {
        customizeArray(common, dev, key) {
            if (key === 'plugins') {
                return _.uniq([...common, ...dev]);
            }
            return undefined;
        },
        customizeObject(common, dev, key) {
            if (key === 'module') {
                return _.merge({}, common, dev);
            }
            return undefined;
        }
    }
)(webpackCommonConfig,wepackBuildConfig);
