/*
 * @Author: your name
 * @Date: 2021-03-26 16:56:08
 * @LastEditTime: 2021-04-07 17:33:42
 * @LastEditors: Ella
 * @Description: In User Settings Edit
 * @FilePath: /promise-demo/postcss.config.js
 */
module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 10,
      propList: ['*']
    }
  }
}