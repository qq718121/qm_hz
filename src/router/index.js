import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

//组件异步加载

//青芒盒子活动页
const Activity = function (resolve) {
  require.ensure([], function () {
    resolve(require('@/components/activity/activity'))
  })
};

//配置路由路径
export default new Router({
  //历史模式，可以划掉路径里边得‘/#/’字符
  // mode: 'history',
  // base: '/CooperateHouse/',
  routes: [
    //主页跳转评分系统
    {
      path: '/activity',
      name: 'activity',
      component: Activity
    }

    // { path: '*', component: NotFoundComponent },
  ]
})



