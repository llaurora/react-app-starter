const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common.config');

const wepackDevConfig = {
    entry:[
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/main.jsx'
    ],
    output:{
        path:path.join(__dirname,'dist'), // 将构建打包输出的app.js放到build目录下
        // 可以对构建输出的app.js进行二次定制化命名，比如加时间戳等
        filename:'[name].js',
        // webpack构建输出的临时文件存放到内存中，而且是以publicPath作为相对路径。
        // publicPath并不会影响输出目录
        // 此外，如果指定路径下已经存在了相同文件，webpack会优先使用内存的临时文件
        publicPath:'/static/',
        chunkFilename: '[name].[chunkhash:5].js'
    },
    plugins:[
        //热加载
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('development'), //production & development,
                'PUBLIC_PATH': JSON.stringify('http://127.0.0.1')
            }
        }),
    ],
    devtool:'inline-source-map'
};

module.exports = webpackMerge(webpackCommonConfig,wepackDevConfig);
