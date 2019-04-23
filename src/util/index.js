import 'whatwg-fetch';

export function fetchRequest(payload) {
  // fetch请求封装
  function setOptions() {
    const headers = payload.headers || {
      'Content-Type': 'application/json;charset=utf-8',
    };
    const body = payload.body || {};
    return {
      url: payload.url,
      method: payload.type || 'post',
      credentials: 'include',
      headers,
      body:
        payload.type === 'get' || payload.type === 'head'
          ? undefined
          : JSON.stringify(body),
    };
  }
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  function parseJSON(response) {
    return response.json();
  }
  const options = setOptions(payload);
  return fetch(options.url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => (data.success ? data.result : Promise.reject(data)))
    .catch(data => {
      alert(data.msg || data.errorMsg || '网络异常，稍后再试');
      console.log('request failed');
      Promise.reject(data);
    });
}
