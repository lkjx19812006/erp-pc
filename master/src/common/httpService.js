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
		addSID:function addSID(url){
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
        getDate: function getDate(cb) {
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
        getSign: function getSign(body) {
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
        commonGet: function commonGet(url) {
            return new Promise(function(resolve, reject) {
                axios.get(url).then(function(response) {
                    resolve(response.data);
                }).catch(function(error) {
                    reject(error);
                });       
            });
        },
        commonPOST:function commonPOST(url,body){
        	var _self = this
        	return new Promise(function(resolve,reject){
        		axios.post(_self.addSID(url), body).then(function (response) {//vue-resource无法抓取403错误，所以用axios
				  	console.log("请求成功")
				  	_self.getDate();
				    resolve(response.data);
				  }).catch(function (error) {
				  	console.log("请求失败")
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
        		/*Vue.http({
        			method: 'POST',
			        url: _self.addSID(url),
			        emulateHTTP: true,
			        body: body,
			        emulateJSON: false,
			        headers: {
			            "X-Requested-With": "XMLHttpRequest",
			            'Content-Type': 'application/json;charset=UTF-8'
			        }
        		}).then((res)=>{
        			console.log(res)
        			resolve(JSON.parse(res.data))
        		},(error)=>{
        			console.log(error)
        			if (error.response !== undefined && error.response !== '') {
                        if (error.response.status === 403) {
                            window.localStorage.KEY = '';
                            window.localStorage.SID = '';
                            _self.KEY = '';
                            _self.SID = '';
                            window.location.href = '/login';
                        };
                    };
                    reject(error);
        		})*/
        	})
        },
        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
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