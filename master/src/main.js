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


//表单验证
Vue.validator('tel', function (val) {    //电话
  return (/^[0-9]{11}$/.test(val)||(val===''));
});

Vue.validator('phone', function (val) {    //手机
  return (/^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}$/.test(val)||(val===''));
});

Vue.validator('IDCard', function (val) {    //身份证
  return (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(val)||/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(val)||(val===''));
});
Vue.validator('IDCard', function (val) {    //邮箱
  return (/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/.test(val)||(val===''));
});
