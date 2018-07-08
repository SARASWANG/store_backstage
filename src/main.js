// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// 配置element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入公共css样式
import '@/assets/css/style.css';
// 引入MyAxios
import Myaxios from '@/plugins/myaxios';
// 引入日期格式化组件
import moment from 'moment';
// 组册Axios插件
Vue.use(Myaxios);

Vue.use(ElementUI);

Vue.config.productionTip = false;
// 全局过滤器，格式化日期
Vue.filter('fmtDate', (v, fmtString) => {
  return moment(v).format(fmtString);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
