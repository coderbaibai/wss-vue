import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import router from './router/index.js'
import * as echarts from 'echarts'
import axios from 'axios'
Vue.prototype.$echarts = echarts

axios.defaults.baseURL = '/api'
axios.defaults.withCredentials= true

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueRouter)
new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')