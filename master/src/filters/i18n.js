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
      login_time_recently:'最近登录时间',
      type:'类型',
      special:'特殊的',
      client_name:'客户名称',
      client_phone:'客户手机号',
      certificate:'资质证书',
      country:'国家',
      province:'所在省',
      city:'所在市',
      area:'所在区',
      dealing_address:'交收地址',
      pre_payment:'预付比例',
      invoice:'发票',
      come_to_see_product:'上门看货',
      packaging:'包装',
      international:'是否国际',
      Number_of_inquiries:'询价次数',
      quotation_number:'报价次数',
      issued_time:'发布时间',
      review_status:'审核状态',
      description:'描述',
      handle:'操作',
      commodity_items:'商品条目'
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
      login_time_recently:'The login time recently',
      type:'Type',
      special:'Special',
      client_name:'Client name',
      client_phone:'Client phone',
      certificate:'Certificate',
      country:'Country',
      province:'Province',
      city:'City',
      area:'Area',
      dealing_address:'Dealing address',
      pre_payment:'Pre-payment',
      invoice:'Invoice',
      come_to_see_product:'Come to see product',
      packaging:'Packaging',
      international:'International?',
      Number_of_inquiries:'Number of inquiries',
      quotation_number:'Quotation number',
      issued_time:'Issued time',
      review_status:'Review status',
      description:'Description',
      handle:'Handle',
      commodity_items:'Commodity items'
    }
  }
}



Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})
