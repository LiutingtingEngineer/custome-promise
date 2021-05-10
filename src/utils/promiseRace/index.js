/*
 * @Author: your name
 * @Date: 2021-03-25 17:10:11
 * @LastEditTime: 2021-04-01 11:30:22
 * @LastEditors: Ella
 * @Description: In User Settings Edit
 * @FilePath: /promise-demo/src/utils/promiseRace/index.js
 */

/**
 * 控制接口请求的最大控制数
 */
export const urls = [
  {
    info: "1",
    time: "2000",
  },
  {
    info: "2",
    time: "2500",
  },
  {
    info: "3",
    time: "3000",
  },
  {
    info: "4",
    time: "3500",
  },
  {
    info: "5",
    time: "4000",
  },
  {
    info: "6",
    time: "4500",
  },
];

export const limitLoad = function(urls, handler, limit) {
  const sequence = [].concat(urls);
  let promises= [];
  promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index;
    });
  });

  let p = Promise.race(promises);
  for (let i = 0; i < sequence.length; i++) {
    p = p.then((res) => {
      promises[res] = handler(sequence[i]).then(() => {
        return res;
      });
      return Promise.race(promises);
    });
  }
};

//加载图片
export const loadImg = function(url) {
  return new Promise((resolve) => {
    console.log("----" + (url.info || "") + "start");
    setTimeout(() => {
      console.log(url.info + "OK");
      resolve(url.info);
    }, url.time);
  });
};
