import baseUrl from '../../config/baseUrl.config';

let loginUrl = `${baseUrl}/mock/login.json`;
if (
  process.env.NODE_ENV === 'development' &&
  process.env.NODE_STAGE === 'mock'
) {
  loginUrl = `${baseUrl}/devmock/login/checkLogin`;
}

/*
  以上loginUrl所做内容仅仅是为了此示例在各种开发环境下能正常登陆而已；

  假定后端给的登陆接口地址为 'login/checkLogin'，登陆请求URL即为`${baseUrl}/login/checkLogin`;

  在本地开发(开发环境)的时候要是想登陆接口代理到mock服务，只需要在接口地址前面加上'devmock'，
  即变成 `${baseUrl}/devmock/login/checkLogin`，并且启动mock服务(yarn run dev:mock)即可，
  在要上生产的时候，再去掉'devmock'；
  而且在package.json文件中的'dev:mock'脚本是不需要设置cross-env NODE_STAGE=mock，这儿只是为了此示例才添加的。

  如果在本地开发（开发环境）的时候，还需要代理接口到其他服务，去config/webpack.dev.config.js中的
  devServer属性下面设置代理proxy
 */

export default {
  loginUrl,
};
