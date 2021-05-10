/*
 * @Author: Ella
 * @Date: 2021-04-01 10:16:27
 * @LastEditTime: 2021-04-01 16:40:51
 * @LastEditors: Ella
 * @FilePath: /promise-demo/src/utils/promiseAll/index.js
 */

// 多个请求合并在一起
// 具体描述：一个页面，有多个请求，我们需求所有的请求都返回数据后再一起处理渲染

//1.获取轮播数据列表
function getBannerList() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve("轮播数据");
    }, 300);
  });
}

//2.获取店铺列表
function getStoreList() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve("店铺数据");
    }, 500);
  });
}

//3.获取分类列表
function getCategoryList() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve("分类数据");
    }, 700);
  });
}

function initLoad() {
  // loading.show() //加载loading
  Promise.all([getBannerList(), getStoreList(), getCategoryList()])
    .then((res) => {
      console.log(res);
      // loading.hide() //关闭loading
    })
    .catch((err) => {
      console.log(err);
      // loading.hide()//关闭loading
    });
}
//数据初始化
initLoad();
