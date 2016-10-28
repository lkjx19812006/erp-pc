import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueValidator from './filters/validator'
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

// Vue.use(VueValidator)
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

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str) {
  var out, i, len;
  var c1, c2, c3;

  len = str.length;
  i = 0;
  out = "";
  while(i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if(i == len)
    {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if(i == len)
    {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
}

function base64decode(str) {
  var c1, c2, c3, c4;
  var i, len, out;

  len = str.length;
  i = 0;
  out = "";
  while(i < len) {
    /* c1 */
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c1 == -1);
    if(c1 == -1)
      break;

    /* c2 */
    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c2 == -1);
    if(c2 == -1)
      break;

    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

    /* c3 */
    do {
      c3 = str.charCodeAt(i++) & 0xff;
      if(c3 == 61)
        return out;
      c3 = base64DecodeChars[c3];
    } while(i < len && c3 == -1);
    if(c3 == -1)
      break;

    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

    /* c4 */
    do {
      c4 = str.charCodeAt(i++) & 0xff;
      if(c4 == 61)
        return out;
      c4 = base64DecodeChars[c4];
    } while(i < len && c4 == -1);
    if(c4 == -1)
      break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
  }
  return out;
}


var data='he欢a颜b他c';



function compile(code)
{
  var test= escape(code);
  console.log(test);
  test=base64encode(test);
  console.log(test);
  return test;

}

function uncompile(code){

  var test=base64decode(code);
  console.log(test);
  test=unescape(test);
  console.log(test);
  return test;

}

uncompile(compile(data));

function getCookie(name){          //获取cookie
    var search = name + "=" ;
    var offset = document.cookie.indexOf(search);
    if(offset==-1){     //cookie中不存在这个变量
        return '';
    }else{
        offset += search.length;
        var end = document.cookie.indexOf(";", offset);
        if(end == -1) {
            end = document.cookie.length;
        }
        return(document.cookie.substring(offset, end));
    }
}



//路由拦截器判断是否登录
router.beforeEach(function ({ to, next }) {

    console.log('登录拦截器');
    console.log(to);
    if(to.name=="login"){

    }else{
      if(!getCookie('no')){
        console.log('无cookie');
        router.go({name: 'login'});
      }else{
        console.log("有cookie");
        console.log(getCookie('id'));

        /*$store.state.table.login.id = getCookie('id');
        $store.state.table.login.name = getCookie('name');
        $store.state.table.login.no = uncompile(getCookie('no'));
        $store.state.table.login.orgId = getCookie('orgId');*/

      }
    }

    next()
})



router.start(Vue.extend(App),'#app')










