const matchMode = (env, stage) => {
  let modeName;
  if (env === 'development') {
    modeName = 'development';
  } else if (env === 'production' && !stage) {
    modeName = 'production';
  } else if (env === 'production' && stage === 'test0') {
    modeName = 'test0';
  }

  return modeName;
};
const apiUrl = {
  development: `http://${window.location.host}`,
  production: `http://${window.location.host}`,
  // 线上环境可能会存在不同的地址，比如线上test0的环境的请求地址可能为 http://www.github.com
  // test0: `http://www.github.com`,
  test0: `http://${window.location.host}`,
};
const modeName = matchMode(process.env.NODE_ENV, process.env.NODE_STAGE);
const baseUrl = apiUrl[modeName];

export default baseUrl;
