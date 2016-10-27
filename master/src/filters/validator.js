
import Vue from 'vue'
import Validator from 'vue-validator'
Vue.use(Validator)

//表单验证
Vue.validator('tel', function (val) {    //电话
  return (/^[0-9]{11}$/.test(val)||(val===''));
});

Vue.validator('phone', function (val) {    //手机
  return (/^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}$/.test(val));
});

Vue.validator('IDCard', function (val) {    //身份证
  return (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(val)||/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(val)||(val===''));
});

Vue.validator('email', function (val) {    //邮箱
  return (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(val)||(val===''));
});

Vue.validator('qq', function (val) {    //qq
  return (/^[1-9]\d{4,10}$/.test(val)||(val===''));
});

Vue.validator('money', function (val) {    //单价
  return (/^(([1-9]\d*)|0)(\.\d{1,2})?$/.test(val)||(val===''));
});

Vue.validator('quantity', function (val) {    //数量
  return (/^(([1-9]\d*)|0)(\.\d{1,4})?$/.test(val));
});

Vue.validator('wechart', function (val) {    //微信
  return (/^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/.test(val)||(val===''));
});

Vue.validator('postcode', function (val) {    //邮编
  return (/^[1-9][0-9]{5}$/.test(val)||(val===''));
});

Vue.validator('test', function (val) {    //邮编
  var start="'img':'a,b,c'";
  var end='';
  end = start.replace(/:/g,":[").replace(/,/g,"','")+"]";
  console.log(end);
  return false;
});
