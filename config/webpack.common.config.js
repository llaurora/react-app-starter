const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽取所有js中的css独立打包到一个css中,减少http请求
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackBar = require('webpackbar');
const threadLoader = require('thread-loader');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const aliasConfig = require('./alias.config');
const devMode = process.env.NODE_ENV === 'development';

function resolve(dir) {
  return path.resolve(process.cwd(), dir);
}

const jsWorkerPool = {
  workers: 2,
  poolTimeout: 2000,
};

threadLoader.warmup(jsWorkerPool, ['babel-loader']);

const webpackCommonConfig = {
  mode: devMode ? 'development' : 'production', // 模式
  entry: './src/main.jsx',
  module: {
    rules: [
      {
        test: /\.jsx|js$/,
        include: [resolve('src')],
        use: [
          {
            loader: 'thread-loader',
            options: jsWorkerPool,
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: [resolve('src')],
        use: [
          devMode
            ? 'style-loader'
            : {
              /* eslint-disable */
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../', // 修改css中如背景图片的路径引用
              },
            },
          /* eslint-enable */
          {
            loader: 'css-loader',
            // 开启CSS Modules
            options: {
              importLoaders: 4,
              modules: {
                localIdentName: devMode
                  ? '[path][name]__[local]'
                  : '[contenthash:base64]',
              },
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // 配置source map是为了当出现错误时候方便我们进行定位调试
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: resolve('src/asset/styles/variable.scss'),
            },
          },
          {
            loader: 'postcss-loader', // 自动给css添加浏览器兼容前缀
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href'],
            },
          },
        ],
      },
      {
        // 匹配 favicon.png,上面的 html-loader 会把入口 Index.html 引用的 favicon.png 图标文件解析出来进行打包
        test: /favicon\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: devMode ? '[name].[ext]' : '[name].[contenthash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg|ico)$/,
        // 生产环境排除 favicon.png, 因为它已经有loader处理过了,如果不排除掉，它会被这个loader再处理一遍
        exclude: /favicon\.png$/,
        include: [resolve('src')],
        use: [
          {
            // url-loader是file-loader的加强版，除了能做file-loader的事情外，在文件大小低于指定的限制时，可以返回一个 DataURL
            // url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader
            loader: 'url-loader',
            options: {
              // 小于5000b的图片文件将被url-loader编码成base64写进css或者js里,从而减少服务器请求，当然css或者js文件体积更大;
              // 大于5000b的图片文件，url-loader会调用file-loader进行处理，参数也会直接传给file-loader
              limit: 5000,
              name: devMode ? '[name].[ext]' : '[name].[contenthash:8].[ext]',
              outputPath: 'images', // 设置最终images路径;
              esModules: true,
              query: `random=${new Date().getTime()}`,
            },
          },
          {
            // 压缩图片(另一个压缩图片：img-loader) 先压缩再判断是否小于上面的limit再决定是否转base64;
            loader: 'image-webpack-loader',
            options: {
              disable: true,
            },
          },
        ],
      },
      {
        test: /\.(eot|woff|ttf|woff2|appcache)(\?|$)/,
        include: [resolve('src')],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: devMode ? '[name].[ext]' : '[name].[contenthash:8].[ext]',
              outputPath: 'fonts',
              esModules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: aliasConfig.resolve.alias,
    mainFields: ['jsnext:main', 'browser', 'main'], // 优先采用 ES6 的那份代码
  },
  plugins: [
    new WebpackBar(),
    new HardSourceWebpackPlugin(), // 缩短连续构建时间
    new StyleLintPlugin({
      context: 'src',
      files: ['**/*.s?(a|c)ss'],
      fix: true, // 设置为true时，stylelint会在源文件中尽可能多的修复发现的错误，不能修复的错误才会被报告出来
    }),
    new MiniCssExtractPlugin({
      /*
        filename 是指在你入口文件entry中引入生成出来的文件名;
        chunkname是指那些未被在入口文件entry引入，但又通过按需加载（异步）模块的时候引入的文件;
        使用contenthash代替hash以解决js内容改变引起css文件的哈希值变化；
        contenthash的出现主要是为了解决，让css文件不受js文件的影响。比如foo.css被foo.js引用了，所以它们共用相同的chunkhash值。但这样子是有问题的，如果foo.js修改了代码，css文件就算内容没有任何改变，由于是该模块的 hash 发生了改变，其css文件的hash也会随之改变。
        这个时候我们就可以使用contenthash了，保证即使css文件所处的模块里有任何内容的改变，只要 css 文件内容不变，那么它的hash就不会发生变化。
        contenthash 你可以简单理解为是 moduleId + content 所生成的 hash。
       */
      filename: devMode ? '[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: devMode ? '[id].css' : 'css/[id].[contenthash].css',
    }),
  ],
};

module.exports = webpackCommonConfig;
