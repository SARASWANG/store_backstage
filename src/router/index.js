import Vue from 'vue';
import Router from 'vue-router';
// 1 引入登录组件
import Login from '@/views/login';
// 2 引入home组件
import Home from '@/views/Home';
// 3 home_ 用户列表组件
import Users from '@/views/users/Users';
// 4 rights_权限管理列表
import Rights from '@/views/rights/Rights';
// 5 roles_角色管理列表
import Roles from '@/views/rights/Roles';
Vue.use(Router);

export default new Router({
  routes: [
    // 登录路由
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    // 根页面路由
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
        },
        // 权限列表
        {
          name: 'rights',
          path: '/rights',
          component: Rights
        },
        // 权限列表
        {
          name: 'roles',
          path: '/roles',
          component: Roles
        }
      ]
    }
  ]
});
