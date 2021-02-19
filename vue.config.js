const path = require('path');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
// const imageWebpackLoader = require('image-webpack-loader');
const getConfig = require('./getConfig');


function resolve(dir) {
  return path.join(__dirname, './', dir);
}
// console.log('getConfig.getArgv()', getConfig.getArgv());
// const BLOCK = getConfig.getArgv();
module.exports = {
  productionSourceMap: false,
  publicPath: './',
  devServer: {
    port: 8888,
    host: getConfig.getIPaddress(),
    proxy: {
      '/api': {
        target: '0.0.0.0',
        pathRewrite: { "^/api": "" }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@components', resolve('src/components'));
    // 对项目图片进行压缩
    config.module.rule('image')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options()
  },

  configureWebpack: {
    //TODO 在每次启动服务添加常量
    plugins: [
      new webpack.DefinePlugin({
        "process.constant": {
          environment: { test: process.env.NODE_ENV == 'PRODUCTION' ? '"PRODUCTION"' : '"DEVELOPMENT"' },
          MODULEBLOCK: JSON.stringify(getConfig.getArgv())
        },
      }),
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, './', 'static/manifest.json')
      }),
      // 在html里面加载公共库提取出来的的dll文件
      new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, './', 'static/*.js')
      })
    ]
  }
};
