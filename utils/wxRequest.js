
function wxPromisify(fn) {
  return function(obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function(res) {
        //成功
        resolve(res)
      }
      obj.fail = function(res) {
        //失败
        reject(res)
      }
      fn(obj)
    })
  }
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function(callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  );
};
/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data) {
  var getRequest = wxPromisify(wx.request)
  return getRequest({
    url: url,
    method: 'GET',
    data: data,
    header: {
      "content-type": "application/json",
      "token":"eyJhbGciOiJIUzI1NiIsIlR5cGUiOiJKd3QiLCJ0eXAiOiJKV1QifQ.eyJwYXNzV29yZCI6IjQ5ZWRjZGI0YjlhNjI2MTI1YjgyNjMyNjQ3MmJlMTI4IiwidXNlck5hbWUiOiJqYXNvbkZ6aCIsImV4cCI6MTU5OTk4NzY2M30.uFH7j7GijLsXC67RFs6SlZp5on5lx-a3-ZS9zyFUPx8",
      "userName":"jasonFzh"
    }
  })
}

/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data) {
  var postRequest = wxPromisify(wx.request)
  return postRequest({
    url: url,
    method: 'POST',
    data: data,
    header: {
      "content-type": "application/json",
      "token":"eyJhbGciOiJIUzI1NiIsIlR5cGUiOiJKd3QiLCJ0eXAiOiJKV1QifQ.eyJwYXNzV29yZCI6IjQ5ZWRjZGI0YjlhNjI2MTI1YjgyNjMyNjQ3MmJlMTI4IiwidXNlck5hbWUiOiJqYXNvbkZ6aCIsImV4cCI6MTU5OTk4NzY2M30.uFH7j7GijLsXC67RFs6SlZp5on5lx-a3-ZS9zyFUPx8",
      "userName":"jasonFzh"
    },
  })
}

module.exports = {
  postRequest: postRequest,
  getRequest: getRequest
}