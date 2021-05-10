/*
 * @Author: Ella
 * @Date: 2021-03-29 19:29:03
 * @LastEditTime: 2021-04-01 17:17:00
 * @LastEditors: Ella
 * @FilePath: /promise-demo/src/utils/cusPromise/index3.js
 */

// 实现其他的API
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

const resolvePromise = (promise2, x, resolve, reject) => {
  // 【2.3.1】
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  // 只执行一次的标识 【2.2.2】【2.2.3】
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
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 如果x是个普通的值，就直接返回 【2.3.3.4】
        resolve(x);
      }
    } catch (e) {
      // 【2.3.3.2】
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
      if (value instanceof Promise) {
        // 递归解析
        return value.then(resolve, reject);
      }
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
              reject(e);
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

  catch(errCallback) {
    return this.then(null, errCallback);
  }

  finally(callback) {
    return this.then(
      (value) => {
        return PromiseCus.resolve(callback()).then(() => value);
      },
      (reason) => {
        return PromiseCus.resolve(callback()).then((reason) => {
          throw reason;
        });
      }
    );
  }

  // resolve
  static resolve(data) {
    return new PromiseCus((resolve) => {
      return resolve(data);
    });
  }

  static reject(reason) {
    return new PromiseCus((resolve, reject) => {
      return reject(reason);
    });
  }

  // 失败会出现中断，任何一个reject出现，结果返回
  // 按照数据的原有顺序进行返回
  static all(values) {
    // 边界判断
    if (!Array.isArray(values)) {
      let type = typeof values;
      // 弹出迭代类型的错误
      throw TypeError(`TypeError: ${type} ${values} is not iterable`);
    }
    return new PromiseCus((resolve, reject) => {
      let resultArray = []; //结果集数组
      let orderIndex = 0; //结果集
      debugger;
      const processResultByKey = (value, index) => {
        resultArray[index] = value;
        if (++orderIndex == values.length) {
          resolve(resultArray);
        }
      };
      for (let i = 0; i < values.length; i++) {
        let item = values[i];
        if (item && typeof item.then === "function") {
          item.then((value) => {
            processResultByKey(value, i);
          }, reject);
        } else {
          processResultByKey(item, i);
        }
      }
    });
  }
  //有一个成功就可以成功
  // 属于赛跑性质
  static race(promises) {
    // 返回的结果是一个数值
    return new PromiseCus((resolve, reject) => {
      for (let index = 0; index < promises.length; index++) {
        const element = promises[index];
        if (element && typeof element.then === "function") {
          element.then(resolve, reject);
        } else {
          resolve(element);
        }
      }
    });
  }
};

PromiseCus.deferred =  function() {
  let dtd = {};
  dtd.promise = new PromiseCus((resolve, reject) => {
    dtd.resolve = resolve;
    dtd.reject = reject;
  });
  return dtd;
};
