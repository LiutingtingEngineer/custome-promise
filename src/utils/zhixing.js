/*
 * @Author: your name
 * @Date: 2021-03-25 18:13:25
 * @LastEditTime: 2021-04-01 16:46:04
 * @LastEditors: Ella
 * @Description: In User Settings Edit
 * @FilePath: /promise-demo/src/utils/zhixing.js
 */

export const createDemo = function() {
  const p = new Promise((res) => {
    setTimeout(() => {
      res(1);
    }, 1000);
  });
  p.then((res) => {
    console.log("1::", res);
  });
  p.then((res) => {
    console.log("2::", res);
  });
  p.then((res) => {
    console.log("3::", res);
  });
  setTimeout(() => {
    p.then((res) => {
      console.log("res::", res);
    });
  });
};
