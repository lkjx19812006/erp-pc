import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueValidator from './filters/validator'
import VueRouter from 'vue-router'
import configRouter from './router'
import VueAnimatedList from 'vue-animated-list'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import treeview from './components/tree/tree.vue'
import tabs from './components/tools/tabs/tabs.vue'
import VueI18n from './filters/i18n'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import fullCalendar from 'vue-fullcalendar';
import InfiniteLoading from 'vue-infinite-loading';


/*import alert from 'vue-strap/src/alert'*/


require('./assets/css/style.css')
require('./components/calendar/vue.datepicker.css')
require('./components/tools/util.js')


Vue.component('PulseLoader', PulseLoader);
Vue.component('treeview', treeview);
Vue.component('tabs', tabs);
Vue.component('full-calendar', fullCalendar);
Vue.component('InfiniteLoading', InfiniteLoading);

Vue.directive('echarts', require('./directives/echarts'));

// Vue.use(VueValidator)
Vue.use(VueAnimatedList)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(iView)

Vue.config.debug = false
Vue.http.options.root = '/src/assets/data'
Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
const router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    suppressTransitionError: true
})

configRouter(router) //注入路由规则



function getCookie(name) { //获取cookie
    var search = name + "=";
    var offset = document.cookie.indexOf(search);
    if (offset == -1) { //cookie中不存在这个变量
        return '';
    } else {
        offset += search.length;
        var end = document.cookie.indexOf(";", offset);
        if (end == -1) {
            end = document.cookie.length;
        }
        return (document.cookie.substring(offset, end));
    }
}

//路由拦截器判断是否登录
router.beforeEach(function({ to, next }) {
    if (to.name == "login") {
        next();
    } else {
        if (!getCookie('no')) {
            router.go({ name: 'login' });
        } else {
            next();
        }
    }

})

Vue.http.interceptors.push((request, next) => {
    // ...
    // 请求发送前的处理逻辑
    // ...
    next((response) => {
        if (response.json() && response.json().code == 100070) {
            return router.go({ name: 'login' });
        }

        return response
    })
})




router.start(Vue.extend(App), '#app')
