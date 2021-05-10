/*
 * @Author: Ella
 * @Date: 2021-04-01 10:17:18
 * @LastEditTime: 2021-04-01 10:36:49
 * @LastEditors: Ella
 * @FilePath: /promise-demo/src/utils/promiseAll/index1.js
 */
/*
 * 合并请求结果并处理错误
 * 描述：我们需求单独处理一个请求的数据渲染和错误处理逻辑，有多个请求，我们就需要在多个地方写
*/
//1.获取轮播图数据列表
function getBannerList() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      // resolve('轮播图数据')
      reject("获取轮播图数据失败啦");
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
  // loading.show()
  Promise.all([
    getBannerList().catch((err) => err),
    getStoreList().catch((err) => err),
    getCategoryList().catch((err) => err),
  ]).then((res) => {
    console.log(res); // ["获取轮播图数据失败啦", "店铺数据", "分类数据"]

    if (res[0] == "轮播图数据") {
      //渲染
    } else {
      //获取 轮播图数据 失败的逻辑
    }
    if (res[1] == "店铺数据") {
      //渲染
    } else {
      //获取 店铺列表数据 失败的逻辑
    }
    if (res[2] == "分类数据") {
      //渲染
    } else {
      //获取 分类列表数据 失败的逻辑
    }
    // loading.hide()
  });
}

initLoad();
