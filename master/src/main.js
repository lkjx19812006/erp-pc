import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import configRouter from './router'
require('./assets/style.css')


Vue.use(VueRouter)
const router = new VueRouter()
configRouter(router)//注入路由规则

router.start(Vue.extend(App),'#app')