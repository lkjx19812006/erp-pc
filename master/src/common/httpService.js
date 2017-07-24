'use strict';
import Vue from 'vue';
var cryptoJs = require('crypto-js')
var axios = require('axios')
var httpService = new Vue({
	data:{
		urlCommon: '/front',
		KEY:window.localStorage.KEY,
		SID:window.localStorage.SID,
		difTime:0,
		apiUrl: {
            login: '/account/login.do',
            code_login: '/account/verifiLogin.do',
            getDate: '/system/date.do',
            most: '/handle/control.do'
        }
	},
	methods:{
		addSID:function(url){
			if(this.SID&&this.SID != undefined){
				return url + ';jsessionid=' + this.SID;
			}else{
				return url;
			}
		},
		getSID: function (req, redirect) {
            if (req) {
                var cookiesObj = {};
                var cookie = req.headers.cookie;
                cookie && cookie.split(';').forEach(function(Cookie) {
                    function Trim(str) {
                        return str.replace(/(^\s*)|(\s*$)/g, "");
                    }
                    Cookie = Trim(Cookie);
                    var parts = [];
                    parts[0] = Cookie.substr(0, 3);
                    parts[1] = Cookie.substr(4, Cookie.length);
                    if (parts[1]) cookiesObj[parts[0].trim()] = (parts[1] || '').trim();
                });
                this.SID = cookiesObj.SID;
                this.KEY = cookiesObj.KEY;
            } else {
                this.KEY = window.localStorage.KEY;
                this.SID = window.localStorage.SID;
            }
            if (!this.SID) {
                redirect('/login');
            }
        },
        getDate: function(cb) {
            var _self = this;
            if (_self.difTime && cb) {
                return cb();
            } else if (_self.difTime) {
                return;
            } else {
                this.commonGet(this.urlCommon + this.apiUrl.getDate).then(function(response) {
                    if (response.code == '1c01') {
                        var timestamp = Date.parse(new Date());
                        window.localStorage.difTime = response.biz_result.time - timestamp;
                        _self.difTime = response.biz_result.time - timestamp;
                        if (cb) cb();
                    } else {

                    }
                }, function(err) {
                    
                });
            }
        },
        getSign: function(body) {
        	var str = 'biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time
            var _self = this;
            if (!_self.KEY) {
                _self.KEY = 'test';
            }
            if (!str) {
                str = 'test';
            }
            var signStr = cryptoJs.HmacSHA1(str, _self.KEY).toString(cryptoJs.enc.Base64);
            return signStr;
        },
        commonGet: function(url) {
            return new Promise(function(resolve, reject) {
                axios.get(url).then(function(response) {
                    resolve(response.data);
                }).catch(function(error) {
                    reject(error);
                });       
            });
        },
        commonPOST:function(body,url){
        	var _self = this
        	url = url?url:'/front/handle/control.do';
            body = this.commonBody(body)
        	return new Promise(function(resolve,reject){
        		axios.post(_self.addSID(url), body).then(function (response) {//vue-resource无法抓取403错误，所以用axios
				  	_self.getDate();//获取时间戳
				    resolve(response.data);
				  }).catch(function (error) {
				  	if (error.response !== undefined && error.response !== '') {
                        if (error.response.status === 403) {
                            window.localStorage.KEY = '';
                            window.localStorage.SID = '';
                            _self.KEY = '';
                            _self.SID = '';
                            document.cookie = "no=;expires=";
				            document.cookie = "id=;expires=";
				            document.cookie = "orgId=;expires=";
				            document.cookie = "name=;expires=";
                            window.location.href = '/login';
                        };
                    };
                    reject(error);
				  });
        	})
        },
        commonBody:function(body){
    		body.time = Date.parse(new Date()) + parseInt(this.difTime),
        	body.sign = this.getSign(body)
        	return body
        },
        getCookie(name) {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			    if(arr=document.cookie.match(reg)){
			        return unescape(arr[2]);
			    }else{
			        return '';
			    }  
        },
        setCookie(name, value) {
            var Days = 1;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
        }
	}
})

export default httpService;