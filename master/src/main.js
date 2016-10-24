import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import VueRouter from 'vue-router'
import configRouter from './router'
import VueAnimatedList from 'vue-animated-list'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import treeview from './components/tree/tree.vue'


require('./assets/css/style.css')
require('./components/calendar/vue.datepicker.css')


Vue.component('PulseLoader',PulseLoader);
Vue.component('treeview',treeview);

Vue.directive('echarts', require('./directives/echarts'));

Vue.use(VueValidator)
Vue.use(VueAnimatedList)
Vue.use(VueRouter)
Vue.use(VueResource)


Vue.http.options.root = '/src/assets/data'
Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
const router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  suppressTransitionError: true
})

configRouter(router)//注入路由规则

router.beforeEach(function ({ to, next }) {
 console.log(to);
    next()
})

router.start(Vue.extend(App),'#app')


Vue.validator('phone', function (val) {    //手机
  return (/^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}$/.test(val)||(val===''));
});








 
