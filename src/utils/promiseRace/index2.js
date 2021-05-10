/*
 * @Author: Ella
 * @Date: 2021-04-01 11:28:34
 * @LastEditTime: 2021-04-01 11:42:42
 * @LastEditors: Ella
 * @FilePath: /promise-demo/src/utils/promiseRace/index2.js
 */

/**
 * 请求超时的提示处理
 */
//请求
function request() {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve("请求成功");
    }, 4000);
  });
}

//请求超时提醒
function timeout() {
  var p = new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject("网络不佳");
    }, 3000);
  });
  return p;
}

Promise.race([request(), timeout()])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err); //网络不佳
  });
