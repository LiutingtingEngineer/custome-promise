/*
 * @Author: Ella
 * @Date: 2021-04-01 11:28:20
 * @LastEditTime: 2021-04-01 11:31:39
 * @LastEditors: Ella
 * @FilePath: /promise-demo/src/utils/promiseRace/index1.js
 */

/**
 * 图片请求超时处理
 */

//请求某个图片资源
function requestImg() {
  var p = new Promise(function(resolve, reject) {
    var img = new Image();
    img.onload = function() {
      resolve(img);
    };
    //img.src = "https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg"; 正确的
    img.src = "https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg1";
  });
  return p;
}

//延时函数，用于给请求计时
function timeout() {
  var p = new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject("图片请求超时");
    }, 5000);
  });
  return p;
}

Promise.race([requestImg(), timeout()])
  .then(function(results) {
    console.log(results);
  })
  .catch(function(reason) {
    console.log(reason);
  });
