/*
 * @Author: Ella
 * @Date: 2021-03-29 16:56:53
 * @LastEditTime: 2021-04-01 14:51:15
 * @FilePath: /promise-demo/src/utils/cusPromise/index2.js
 */
/*
 * @Author: your name
 * @Date: 2021-03-29 16:56:53
 * @LastEditTime: 2021-03-30 11:02:09
 * @LastEditors: Ella
 * @Description: In User Settings Edit
 * @FilePath: /promise-demo/src/utils/cusPromise/index2.js
 */

// then方法的链式调用&值穿透性
// 通过的递归的方式实现链式调用

const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

/**
 * @description:
 * @param {*} promise2   then 新生成的promise
 * @param {*} x          前一个promise的返回值
 * @param {*} resolve    Promise的resolve方法
 * @param {*} reject    promise的reject方法
 * @return {*}
 */
const resolvePromise = (promise2, x, resolve, reject) => {
  // 自己等待自己完成是错误的，避免循环引用
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  // 只执行一次的标识
  let called;
  if ((typeof x === "object" && x != null) || typeof x === "function") {
    try {
      let then = x.then;
      // 如果是方法，按照方法的方式去处理
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // 递归解析的过程
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 如果是值就直接返回
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
};

export let PromiseCus = class PromiseCus {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
    // 当参数不是函数类型时，需要创建一个函数赋值给对应的参数
    // 这也就实现了 透传
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e); // 抛出了异常，就把异常作为参数传递给下一个then的回调
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }

      if (this.status === REJECTED) {
        //Promise/A+ 2.2.3
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
    });

    return promise2;
  }
};
