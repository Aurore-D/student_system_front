// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import http from './http/http.js'
// 引入 element-ui 的 css 文件
import 'element-ui/lib/theme-chalk/index.css';

/*import axios from 'axios'  //已在http中配置baseURL


axios.defaults.baseURL='http://localhost:8081/'
Vue.prototype.axios = axios*/



Vue.use(ElementUI);

Vue.config.productionTip = false

// 全局挂载 http（axios）,使用的时候直接使用 this.$http 即可。
Vue.prototype.$http=http

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
