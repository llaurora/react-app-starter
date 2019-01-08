const ExtractTextPlugin = require('extract-text-webpack-plugin');//独立打包css模块;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩CSS模块;
const webpackCommonConfig = {
    module:{
        rules:[
            {
                test: /\.jsx|js$/,
                exclude: /(node_modules)/,
                use:[
                    {
                        loader:'babel-loader'
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
                            loader: 'postcss-loader', //自动给css添加浏览器兼容前缀
                            options: {
                                sourceMap: true,
                                plugins: function () {
                                    return [
                                        require('autoprefixer')({browsers:['last 40 versions']})]
                                }
                            }
                        }
                    ],
                    // publicPath: './asset' //修改css中如背景图片的路径引用
                })
            },
            {
                test: /\.png|jpg|gif|svg|jpeg|ico$/,
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
                test: /\.(eot|woff|ttf|woff2|appcache)(\?|$)/,
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
    resolve: {
        extensions: ['.js','.jsx']
    },
    plugins:[
        //从js中抽离css,属性disable为true表示禁用此插件并不抽离css，为false表示不禁用此插件，抽离css并打包成单独的css文件
        new ExtractTextPlugin({
            filename: '[name].min.css',
            disable: false,
            allChunks: true
        }),
        //压缩css（注:因为没有用style-loader打包到js里所以webpack.optimize.UglifyJsPlugin的压缩本身对独立css不管用）;
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,                //正则匹配后缀.css文件;
            cssProcessor: require('cssnano'),            //加载‘cssnano’css优化插件;
            cssProcessorOptions: { discardComments: {removeAll: true } }, //插件设置,删除所有注释;
            canPrint: true                             //设置是否可以向控制台打日志,默认为true;
        }),
    ],
};
module.exports = webpackCommonConfig;

