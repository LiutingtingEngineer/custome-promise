/*
 * @Author: Ella
 * @Date: 2021-03-30 17:37:44
 * @LastEditTime: 2021-04-01 11:51:42
 * @LastEditors: Ella
 * @FilePath: /promise-demo/src/utils/macroAndmicro.js
 */

/**
 * 验证自己是否对微任务和宏任务的理解到位了
 */
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function() {
  console.log("setTimeout1");
}, 200);

setTimeout(function() {
  console.log("setTimeout2");
  new Promise(function(resolve) {
    resolve();
  }).then(function() {
    console.log("then1");
  });
  new Promise(function(resolve) {
    console.log("Promise1");
    resolve();
  }).then(function() {
    console.log("then2");
  });
}, 0);

async1();

new Promise(function(resolve) {
  console.log("promise2");
  resolve();
}).then(function() {
  console.log("then3");
});

console.log("script end");
