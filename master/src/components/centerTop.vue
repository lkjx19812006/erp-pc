<template>
    <alert-model :param="tipParam" v-if="tipParam.show"></alert-model>
    <password-model :param="pwdParam" v-if="pwdParam.show"></password-model>
    <setting-model :param="personalParam" v-if="personalParam.show"></setting-model>
    <div class="center_top light_bg mui-clearfix" v-bind:class="{'center_top':getMenu==240,'center_nav':getMenu==50}" transition="expand">
        <div class="title_top mui-clearfix">
            <div class="new_time left">{{$t('static.login_time_recently')}}:{{ initLogin.time }}</div>
            <div class="right head_info" style="margin-top:8px;">
                <language-model> </language-model>
            </div>
            <div class="right head_info clearfix">
                <span style="float:left;margin:15px 10px 0 0 ">{{initLogin.name}}<span v-if="!initEmployeeDetail.weixinId" style="color:red">（未绑定微信）</span></span>
                <img src="/static/images/head.png" class="left" height="52" width="52" @click="show=!show" />
                <div class="component_action" v-show="show">
                    <ul>
                        <li @click="personalSet()">
                            {{$t('static.setting')}}
                        </li>
                        <li @click="upwd()">
                            {{$t('static.modify_password')}}
                        </li>
                        <li @click="exit()">
                            {{$t('static.logout')}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div>
            <tabs-model></tabs-model>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import alertModel from './tips/tipDialog'
import languageModel from '../components/tools/language'
import passwordModel from '../components/tips/updatePwd'
import tabsModel from '../components/tools/tabs/tabs.vue'
import settingModel from '../components/tips/personalSet.vue'
import {
    initLogin,
    getMenu,
    getList,
    getTabs,
    initEmployeeDetail
} from '../vuex/getters'
import {
    initList,
    getEmployeeDetail
} from '../vuex/actions'
export default {
    components: {
        languageModel,
        passwordModel,
        alertModel,
        tabsModel,
        settingModel
    },
    data() {
        return {
            show: false,
            pwdParam: {
                show: false,
                callback: this.callback
            },
            tipParam: {
                show: false,
                name: '新密码两次输入不一致！',
                alert: true
            },
            loadParam: {
                id: this.initLogin.id,
                loading: false
            },

            personalParam: {
                show: false,
                gender: '',
                mobile: '',
                extno: '',
                qq: '',
                wechat: '',
                goodfield: '',
                name: '',
                weixinId: '',
                image_f_show: '',
                path: '',
                id: this.initLogin.id
            }
        }
    },
    vuex: {
        getters: {
            getMenu,
            initLogin,
            getList,
            getTabs,
            initEmployeeDetail
        },
        actions: {
            initList,
            getEmployeeDetail
        }
    },
    methods: {
        exit: function() {
            document.cookie = "no=;expires=";
            document.cookie = "id=;expires=";
            document.cookie = "orgId=;expires=";
            document.cookie = "name=;expires=";
            this.$route.router.go({
                name: 'login'
            });
        },
        upwd: function() {
            this.pwdParam.show = true;
        },
        personalSet: function() {
            this.personalParam.gender = this.initEmployeeDetail.gender;
            this.personalParam.mobile = this.initEmployeeDetail.mobile;
            this.personalParam.extno = this.initEmployeeDetail.extno;
            this.personalParam.qq = this.initEmployeeDetail.qq;
            this.personalParam.wechat = this.initEmployeeDetail.wechat;
            this.personalParam.goodfield = this.initEmployeeDetail.goodfield;
            this.personalParam.name = this.initEmployeeDetail.name;
            this.personalParam.email = this.initEmployeeDetail.email;
            this.personalParam.photo = this.initEmployeeDetail.photo;
            this.personalParam.weixinId = this.initEmployeeDetail.weixinId;
            this.personalParam.url = '/employee/';
            this.personalParam.key = 'employeeList';
            this.personalParam.title = 'first';
            this.personalParam.show = true;
            this.personalParam.callback = this.personCallback;
        },
        callback: function(title) {
            this.tipParam.show = true;
            this.tipParam.name = title;
            this.tipParam.alert = true;
        },
        personCallback: function(title) {
            this.tipParam.show = true;
            this.tipParam.name = title;
            this.tipParam.alert = true;
            this.getEmployeeDetail(this.loadParam)
        },
        close: function(index) {
            this.tabs.splice(index, 1);
        }
    },
    created() {
        this.getEmployeeDetail(this.loadParam);
    }
    /*events:{
        lang:function(val){
            console.log('TOP切换语言：'+val);
        }
    }*/
}
</script>
<style scoped>
.center_top {
    height: 84px;
    position: fixed;
    right: 0;
    white-space: nowrap;
    left: 200px;
    box-shadow: 0px 2px 2px #999;
    z-index: 999;
}

.nav_tab {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}

.nav_tab ul {
    margin-bottom: 0px;
}

.nav_tab ul li {
    font-size: 14px;
}

.nav_tab ul li a {
    color: #333;
}

.nav_tab ul li span:hover {
    transform: scale(1.2);
    -moz-transform: scale(1.2);
    -webkit-transform: scale(1.2);
    -ms-transform: scale(1.2);
    color: red;
}

.center_nav {
    height: 88px;
    position: fixed;
    right: 0;
    white-space: nowrap;
    left: 50px;
    box-shadow: 0px 2px 2px #ccc;
}

.title_top {
    position: absolute;
    left: 0;
    right: 0;
}

.center_left {
    left: 50px;
}

.new_time {
    margin-left: 40px;
    font-size: 14px;
    color: #666;
    padding-top: 20px;
}

.head_info {
    padding-right: 16px;
    padding-top: 7px;
}

.component_action {
    min-width: 75px;
    padding: 0;
    text-align: center;
    margin-top: 28px;
    right: 120px;
}
</style>
