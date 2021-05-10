/*
 * @Author: Ella
 * @Date: 2021-04-01 10:55:17
 * @LastEditTime: 2021-04-01 10:57:19
 * @LastEditors: Ella
 * @FilePath: /promise-demo/src/utils/promiseAll/index2.js
 */

/**
 * 表单的多项内容验证
 * 内容安全校验结果
 */
function verify1(content) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(true);
    }, 200);
  });
}

function verify2(content) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(true);
    }, 700);
  });
}

function verify3(content) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(true);
    }, 300);
  });
}

Promise.all([
  verify1("校验字段1的内容"),
  verify2("校验字段2的内容"),
  verify3("校验字段3的内容"),
])
  .then((result) => {
    console.log(result); //[true, true, true]

    let verifyResult = result.every((item) => item);
    //验证结果
    console.log(verifyResult ? "通过验证" : "未通过验证"); // 通过验证
  })
  .catch((err) => {
    console.log(err);
  });
