const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


function resolve(dir) {
  return path.join(__dirname, './', dir);
}

module.exports = {
  entry: {
    // vendor: ['vue']
    vendor: ['vue', 'vuex', "vue-router"]
  },
  output: {
    path: resolve('static'), // 生成的绝对路径
    filename: '[name].dll.js', //生成的文件名
    library: '[name]_[hash]' //打包对外暴露的方法名称
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin({
      root: resolve('static')
    }),
    // 打包生成manifest.json文件,生成映射路径
    new webpack.DllPlugin({
      path: resolve('static/manifest.json'),
      name: '[name]_[hash]', //保持与outPubliclibrary一致
      context: __dirname
    })
  ]
};