/* 可以直接在webpack.common.config.js resolve alias设置别名
   此js是为Idea或WebStrom配置webpack以能识别设置的alias别名
   而能在编写代码的时候提示路径
 */
const path = require('path');

function resolve(dir) {
  return path.resolve(process.cwd(), dir);
}

module.exports = {
  context: resolve('./'),
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@': resolve('src'),
      '@api': resolve('src/api'),
      '@util': resolve('src/util'),
    },
  },
};
