<template>
  <div id="app">
    <div>
      <button class="bingfa"
        @click="handleBingFa">并发</button>
    </div>
    <p>
      <button @click="handleSort">执行顺序</button>
    </p>
    <p>
      <button @click="handleSync">Promise实现原理(同步)</button>
    </p>
    <p>
      <van-button @click="handleAsync"
        size='mini'
        type='info'>Promise实现原理异步</van-button>
    </p>
    <p>
      <van-button @click="handleThen"
        size='mini'
        type='info'>Promises实现原理链式调用</van-button>
    </p>
    <p>
      <van-button @click="handleAll"
        size='mini'
        type='info'>Promise实现原理all</van-button>
    </p>
    <p>
      <van-button @click="handleRace"
        size='mini'
        type='info'>Promise实现原理race</van-button>
    </p>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { urls, loadImg, limitLoad } from './utils/promiseRace'
import { PromiseCus } from './utils/cusPromise/index3'
import { createDemo } from './utils/zhixing'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  created() {
  },
  methods: {
    /**
     * @description:
     * @param {*}
     * @return {*}
     */
    handleBingFa() {
      // 执行顺序
      createDemo()
      // race 图片加载的演示
      // limitLoad(urls, loadImg, 3)
    },
    handleSort() { },
    // 同步执行的promise
    syncPromise() {
      return new PromiseCus((resolve, reject) => {
        resolve('成功');
      }).then(
        (data) => {
          console.log('success', data)
        },
        (err) => {
          console.log('faild', err)
        }
      )
    },
    // 异步promise的执行
    asyncPromise() {
      return new PromiseCus((resolve, reject) => {
        setTimeout(() => {
          resolve('成功');
        }, 3000)
      }).then(
        (data) => {
          console.log('success', data)
        },
        (err) => {
          console.log('faild', err)
        }
      )
    },
    thenPromise() {
      return new PromiseCus((resolve, reject) => {
        resolve(2)
      }).then((res) => {
        console.log('res', res);
        return res + 1
      }).then((res1) => {
        console.log('222::'), '没传递值';
        return 'res1 + 2'
      }).then((res2) => {
        console.log('res3', res2);
        return res2 + 3
      })
    },
    allPromise() {
      let promiseOne = new PromiseCus((resolve, reject) => {
        setTimeout(() => {
          resolve('one')
        }, 1000)
      })
      let promiseTwo = new PromiseCus((resolve, reject) => {
        setTimeout(() => {
          resolve('two')
        }, 2000)
      })
      let dataArray = [promiseOne, promiseTwo]
      return PromiseCus.all(dataArray).then((res) => {
        console.log('all::', res);
      }).catch((err) => {
        console.log(err || '');
      })
    },
    // 返回race的promise
    racePromise() {
      let promiseOne = new PromiseCus((resolve, reject) => {
        setTimeout(() => {
          resolve('one')
        }, 1000)
      })
      let promiseTwo = new PromiseCus((resolve, reject) => {
        setTimeout(() => {
          resolve('two')
        }, 2000)
      })
      let dataArray = [promiseOne, promiseTwo]
      return PromiseCus.race(dataArray).then((res) => {
        console.log('race:::', res);
      })
    },
    // 同步测试数据
    handleSync() {
      this.syncPromise()
    },
    // promise的实现执行
    handleAsync() {
      this.asyncPromise()
    },
    // 验证链式结构
    handleThen() {
      this.thenPromise()
    },
    // 验证all
    handleAll() {
      this.allPromise()
    },
    // 验证race
    handleRace() {
      this.racePromise()
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  overflow: scroll;
}
.bingfa {
  width: 60px;
  height: 20px;
}
</style>
