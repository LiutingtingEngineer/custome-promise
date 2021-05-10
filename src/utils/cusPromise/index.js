/*
 * @Author: your name
 * @Date: 2021-03-25 19:46:01
 * @LastEditTime: 2021-03-31 11:30:10
 * @LastEditors: Ella
 * @Description: In User Settings Edit
 * @FilePath: /promise-demo/src/utils/cusPromise/index.js
 */

// 基础框架的实现
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

export const PromiseCus = class PromiseCus {
  constructor(executor) {
    this.status = PENDING; // 默认状态为 PENDING
    this.value = undefined; // 存放成功状态的值，默认为 undefined
    this.reason = undefined; // 存放失败状态的值，默认为 undefined

    // 调用此方法就是成功
    let resolve = (value) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
      }
    };

    // 调用此方法就是失败
    let reject = (reason) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
      }
    };

    try {
      // 立即执行，将 resolve 和 reject 函数传给使用者
      executor(resolve, reject);
    } catch (error) {
      // 发生异常时执行失败逻辑
      reject(error);
    }
  }

  // 包含一个 then 方法，并接收两个参数 onFulfilled、onRejected
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }

    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
};
