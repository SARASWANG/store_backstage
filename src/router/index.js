import Vue from 'vue';
import Router from 'vue-router';
// 1 引入登录组件
import Login from '@/views/login';
// 2 引入home组件
import Home from '@/views/Home';
// 3 home_ 用户列表组件
import Users from '@/views/users/Users';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      //  配置子路由，在父路由加载完以后才会加载子路由
      children: [
        // 用户列表
        {
          name: 'users',
          path: '/users',
          component: Users
        }
      ]
    }
  ]
});
