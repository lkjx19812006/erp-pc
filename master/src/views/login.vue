<template>
    <tipsdialog-model :param="loginParam" v-if="loginParam.show"></tipsdialog-model>
    <div class="login_container clearfix">
        <div>
            <img src="/static/images/login.png" class="pull-left" margin-top="100%" />
        </div>
        <div class="cover_loading">
            <pulse-loader :loading="loginParam.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <validator name="validation">
            <div class="container modal_con">
                <div class="model-header">
                    <div class="pull-left" style="font-size:16px;margin:10px">{{$t('static.systemlogin')}}</div>
                    <div class="pull-right" style="font-size:16px;margin:10px;color:#FA6705;width:100px">
                        <language-model></language-model>
                    </div>
                    <div class="model-tips clearfix">
                        <div class="tips_name"></div>
                    </div>
                    <div class="client-detailInfo  col-xs-12" style="margin-top:30px">
                        <div class="pull-left col-xs-3" style="font-size:16px;">{{$t('static.userName')}}:</div>
                        <input type="text" class="form-control" v-model="loginParam.no" v-validate:no="['required']" @keyup.enter="confirm()" />
                    </div>
                    <div class="client-detailInfo  col-xs-12" style="margin-top:10px">
                        <div class="pull-left col-xs-3" style="font-size:16px;">{{$t('static.passWord')}}:</div>
                        <input type="password" class="form-control" v-model="loginParam.password" v-validate:password="['required']" @keyup.enter="confirm()" />
                    </div>
                    <div class="client-detailInfo  col-xs-12" style="margin-top:10px" v-if="loginParam.required">
                        <div class="pull-left col-xs-3" style="font-size:16px;">验证码:</div>
                        <input type="text" class="form-control pull-left" style="width:120px" v-model="loginParam.captcha" @keyup.enter="confirm()" />
                        <span class="system_danger pull-left" style="line-height:32px" v-show="loginParam.captcha===''">请输入验证码</span>
                    </div>
                    <div class="model-footer col-xs-12" v-if="true">
                        <!-- <span class="pull-left" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}"  @click="checked=!checked"></span>
                    <span class="pull-left">记住密码</span> -->
                        <!-- <span v-if="validation.valid" class="pull-left system_danger">请输入账号和密码</span> -->
                        <button type="button" class="btn btn-default btn-close" v-if="$validation.valid" @click="confirm()">{{$t('static.submit')}}</button>
                        <div v-else>
                            <button type="button" class="btn btn-default btn-close" disabled="disabled">{{$t('static.submit')}}</button>
                            <span class="pull-left system_danger">{{$t('static.account_or_password')}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </validator>
    </div>
</template>
<script>
import languageModel from '../components/tools/language'
import tipsdialogModel from '../components/tips/tipDialog'
import {

} from '../vuex/getters'
import {
    login
} from '../vuex/actions'
export default {
    components: {
        tipsdialogModel,
        languageModel
    },
    data() {
        return {
            checked: false,
            loginParam: {
                no: '',
                password: '',
                captcha: '', //验证码
                link: '/employee/login',
                required: false, //是否需要验证
                loading: false,
                show: false,
                alert: true
            },

            base64DecodeChars: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
                52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
            ],
        }
    },
    props: ['param'],
    vuex: {
        getters: {

        },
        actions: {
            login
        }
    },
    watch: {
        'loginParam.required': function(curr, old) {
            if (curr) {
                document.getElementsByClassName("container")[0].style.height = "305px";
            } else {
                document.getElementsByClassName("container")[0].style.height = "247px";
            }
        }
    },
    methods: {
        confirm: function() {
            if (this.loginParam.no && this.loginParam.password) {
                this.loginParam.loading = true;
                this.loginParam.loginCallback = this.loginCallback;
                this.login(this.loginParam);
            }
        },
        getCookie: function(name) { //获取cookie
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
        },
        base64decode: function(str) {
            var c1, c2, c3, c4;
            var i, len, out;

            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                /* c1 */
                do {
                    c1 = this.base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c1 == -1);
                if (c1 == -1)
                    break;

                /* c2 */
                do {
                    c2 = this.base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c2 == -1);
                if (c2 == -1)
                    break;

                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

                /* c3 */
                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61)
                        return out;
                    c3 = this.base64DecodeChars[c3];
                } while (i < len && c3 == -1);
                if (c3 == -1)
                    break;

                out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

                /* c4 */
                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61)
                        return out;
                    c4 = this.base64DecodeChars[c4];
                } while (i < len && c4 == -1);
                if (c4 == -1)
                    break;
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            return out;
        },

        uncompile: function(code) {
            var test = this.base64decode(code);
            test = unescape(test);
            return test;
        },
        loginCallback: function() {
            this.$route.router.go({
                name: 'home'
            });
        }

    },
    created() {
        this.loginParam.no = this.uncompile(this.getCookie('no'));
        this.loginParam.password = this.uncompile(this.getCookie('password'));
    }
}
</script>
<style scoped>
.login_container {
    min-width: 1200px;
    margin: auto;
    width: 1200px;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    margin-top: -213px;
    background-color: #fff;
}

.form-control {
    width: 200px;
}

.container {
    height: 247px;
    width: 400px;
    border: 1px solid #ddd;
}

.modal_con {
    top: 40px;
    right: -500px;
}

.model-tips {
    padding: 2px 10px;
}

.checkbox_unselect {
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}

.checkbox_select {
    background-image: url(/static/images/selected.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}
</style>
