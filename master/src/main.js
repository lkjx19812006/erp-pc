import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import configRouter from './router'
import VueAnimatedList from 'vue-animated-list'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'



require('./assets/css/style.css') 

Vue.component('PulseLoader',PulseLoader);

Vue.directive('echarts', require('./directives/echarts'));

Vue.use(VueAnimatedList)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.http.options.root = '/src/assets/data'
Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
const router = new VueRouter({
  hashbang: true,
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true
})

configRouter(router)//注入路由规则

router.beforeEach(function ({ to, next }) {
 console.log(to);
    next()
})

router.start(Vue.extend(App),'#app')