const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const cssnano = require('cssnano');
const CopyWebpackPlugin = require('copy-webpack-plugin');//复制静态资源的插件
const TerserPlugin = require('terser-webpack-plugin');//Js压缩插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//主要用于Css压缩、去重
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');//生产打包清空目录下文件
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//包体组成分析
const webpackCommonConfig = require('./webpack.common.config');

const wepackBuildConfig = {
    output:{
        // path.resolve()方法可以将多个路径解析为一个规范化的绝对路径;
        // path.join()方法可以连接任意多个路径字符串;
        // process.cwd() 是当前执行node命令时候的文件夹地址 ——工作目录，保证了文件在不同的目录下执行时，路径始终不变;
        // __dirname 是被执行的js文件的地址 ——文件所在目录
        path: path.resolve(process.cwd(),'build'),
        publicPath: './',
        //contenthash替代chunhash或者hash解决css模块修改后，js哈希值变动
        filename: 'js/[name].[contenthash:12].js',
        chunkFilename: 'js/[id].[contenthash:12].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'link:href']
                        }
                    }
                ]
            },
            {
                //匹配 favicon.png,上面的 html-loader 会把入口 index.html 引用的 favicon.png 图标文件解析出来进行打包
                test: /favicon\.png$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/favicon.[hash:8].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    optimization: {
        minimize: true,//生产环境production下，默认为true，告诉webpack使用TerserPlugin压缩模块
        minimizer: [
            new TerserPlugin({
                cache: true,//启用文件缓存，默认为false
                parallel: true,//使用多进程并行运行来提高构建速度,默认并发运行数：os.cpus().length - 1,不设置parallel默认为false
                sourceMap: true,
                terserOptions:{
                    warnings: false,
                    output: {
                        comments: false,//不移除代码注释
                    },
                    compress:{
                        drop_console: true,//移除console
                        drop_debugger: true,//移除debugger
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css\.*(?!.*map)/g,
                cssProcessor: cssnano,//加载‘cssnano’css优化插件;
                cssProcessorOptions: {
                    autoprefixer: false,
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true // 移除注释
                            },
                            normalizeUnicode: false // 建议设置为false,否则在使用unicode-range的时候会产生乱
                        }
                    ]
                }
            })
        ],
        runtimeChunk: true,
        splitChunks: {
            chunks: 'async',
            minSize: 30000,//模块在压缩前大于30k会被抽离到公共模块
            minChunks: 1,//模块出现1次就会被抽离到公共模块
            maxAsyncRequests: 5,//异步模块，一次最多只能被加载5个
            maxInitialRequests: 3,//入口模块最多只能加载3个
            name: false,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /node_modules\/(.*)\.js/
                },
                styles: {
                    name: 'styles',
                    test: /\.s?css$/,
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    plugins:[
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin({
        //     generateStatsFile: true
        // }),//包体分析
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(zh-cn)$/),
        new CopyWebpackPlugin([
            {from:'mokeJson',to:'mokeJson'}
        ]),
        new HtmlWebpackPlugin({
            title: 'react-redux-app',
            template: path.resolve(process.cwd(),'./public/indexModal.html'),
            filename: path.resolve(process.cwd(),'./build/index.html'),
            inject: true,//true或者body：所有JavaScript资源插入到body元素的底部
            chunks: 'all',//允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中
            /*
                hash:true|false，是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值，添加hash形式如下所示：
                html <script type="text/javascript" src="common.js?a3e1396b501cdd9041be"></script>
             */
            hash: true,//给生成的js文件一个独特的 hash 值
            chunksSortMode: 'none',
            minify:{
                removeComments: true,//移除注释
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),
        new CompressionPlugin({//开启gizp压缩，减小文件体积，传输速度更快
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
    devtool:'sourceMap'
};

module.exports = webpackMerge(webpackCommonConfig,wepackBuildConfig);
