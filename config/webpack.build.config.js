const webpack=require('webpack');
const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//独立打包css模块;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//包体组成分析
const CleanWebpackPlugin = require('clean-webpack-plugin');//生产打包清空目录下文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩CSS模块;
module.exports={
    entry:{
        main:'./src/main.jsx',
        vendor: ['react', 'react-dom','react-router-dom','moment','react-particles-js','whatwg-fetch']
    },
    output:{
        // path.resolve()方法可以将多个路径解析为一个规范化的绝对路径;
        // path.join()方法可以连接任意多个路径字符串;
        // process.cwd() 是当前执行node命令时候的文件夹地址 ——工作目录，保证了文件在不同的目录下执行时，路径始终不变;
        // __dirname 是被执行的js 文件的地址 ——文件所在目录
        path:path.resolve(process.cwd(),'build'),
        filename:'[name].min.js',
        publicPath:'./',
        chunkFilename: '[name].[chunkhash:5].js'
    },
    resolve: {
        extensions: ['.js','.jsx']
    },
    module:{
        rules:[
            {
                test: /\.jsx|js$/,
                exclude: /(node_modules)/,
                use:[
                    {
                        loader:'babel-loader',
                    }
                ]
            },
            {
                test: /\.css|scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader:'css-loader' ,
                            options:{
                                importLoaders: 1
                            }
                        },
                        'resolve-url-loader',
                        'sass-loader?sourceMap',
                        {
                            loader: 'postcss-loader',//自动补全css浏览器前缀
                            options: {
                                sourceMap: true,
                                plugins: function () {
                                    return [
                                        require('autoprefixer')({browsers:['last 20 versions']})]
                                }
                            }
                        }
                    ],
                    publicPath: './' //修改css中如背景图片的路径引用
                })
            },
            {
                test: /\.png|jpg|gif|jpeg|ico$/,
                use:[
                    {
                        loader : 'url-loader', //url-loader是file-loader的加强版。url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader
                        options:{
                            limit : 5000, //小于5000b的图片文件将被url-loader编码成base64写进css里,从而减少服务器请求，当然css文件体积更大;
                            name : 'images/[name].[hash:8].[ext]', //设置最终images路径(文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader);
                            query: 'random=' + new Date().getTime()
                        }
                    },
                    { //压缩图片(另一个压缩图片：image-webpack-loader) 先压缩再判断是否小于上面的limit再决定是否转base64;
                        loader : 'img-loader?minimize&optimizationLevel=5&progressive=true'
                    }
                ]
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|appcache)(\?|$)/, //解析字体文件
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
        ]
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
        //从js中抽离css,属性disable为true表示禁用此插件并不抽离css，为false表示不禁用此插件，抽离css并打包成单独的css文件
        new ExtractTextPlugin({
            filename: '[name].min.css',
            disable: false,
            allChunks: true
        }),
       //压缩css（注:因为没有用style-loader打包到js里所以webpack.optimize.UglifyJsPlugin的压缩本身对独立css不管用）;
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,//正则匹配后缀.css文件;
            cssProcessor: require('cssnano'),//加载‘cssnano’css优化插件;
            cssProcessorOptions: { discardComments: {removeAll: true } }, //插件设置,删除所有注释;
            canPrint: true //设置是否可以向控制台打日志,默认为true;
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
