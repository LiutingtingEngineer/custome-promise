/*
 * @Author: your name
 * @Date: 2021-03-26 17:04:13
 * @LastEditTime: 2021-03-26 17:56:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /promise-demo/src/libs/rem.js
 */

(function() {
  const baseSize = 10; // 32
  function setRem() {
    const scale = document.documentElement.clientWidth / 375; // 750
    document.documentElement.style.fontSize =
      baseSize * Math.min(scale, 2) + "px";
  }

  window.onresize = function() {
    setRem();
  };
})();
