import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import App from './App.vue'
import routes from './routers'

const router = new VueRouter({
	mode: 'hash',
	routes,
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")