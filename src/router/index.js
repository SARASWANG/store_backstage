import Vue from 'vue';
import Router from 'vue-router';
// 1 引入登录组件
import Login from '@/views/login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
});
