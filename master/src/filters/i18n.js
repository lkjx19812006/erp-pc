/**
 * Created by wei on 16-11-3.
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.config.lang = 'zh_CN'
var locales = {
  zh_CN: {
    static: {
      hello: '你好',
      userName:'用户名',
      passWord:'密  码',
      systemlogin:'系统登录',
      submit:'提交',
      account_or_password:'请输入帐号或密码',
      logout:'退出登录',
      login_time_recently:'最近登录时间'
      
    }
  },
  en: {
    static: {
      hello: 'hello',
      userName:'Account',
      passWord:'Password',
      systemlogin:'System login',
      submit:'Submit',
      account_or_password:'Please enter account and password',
      logout:'Log out',
      login_time_recently:'The login time recently'
    }
  }
}



Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})
