/*
 * @Author: your name
 * @Date: 2021-03-25 17:08:56
 * @LastEditTime: 2021-03-29 15:19:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /promise-demo/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import './libs/rem'
import { Button } from 'vant';

Vue.use(Button);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
