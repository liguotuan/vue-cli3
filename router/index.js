import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

let mapArr = require.context('./map', true, /\.js$/);

const moduleList = process.constant.MODULEBLOCK;
const moduleListFlag = moduleList && moduleList.length;

let routerList = [];
mapArr.keys().forEach(item => {
  if (moduleListFlag) {
    let flag = moduleList.some(module => {
      return `./${module}.js` == item
    })
    flag && routerList.push(...mapArr(item).default)
  } else {
    routerList.push(...mapArr(item).default)
  }
})

import index from '@components/index';

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/index',
      component: index,
    },
    ...routerList
  ]
})