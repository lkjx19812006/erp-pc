<template>
    <alert-model :param="tipParam" v-if="tipParam.show"></alert-model> 
    <password-model :param="pwdParam" v-if="pwdParam.show"></password-model>
    
    <div class="center_top light_bg mui-clearfix" v-bind:class="{'center_top':getMenu==240,'center_nav':getMenu==50}" transition="expand">
        <div class="title_top mui-clearfix">
          <div class="new_time left">{{$t('static.login_time_recently')}}:{{ initLogin.time }}</div>
          <div class="right head_info" style="margin-top:8px;"> <language-model> </language-model></div>
          <div class="right head_info clearfix" >
              <span style="float:left;margin:15px 10px 0 0 ">{{initLogin.name}}</span>
              <img src="/static/images/head.png" class="left" height="52" width="52" @click="show=!show"/>
              <div class="component_action" v-show="show">
                <ul>
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
import passwordModel  from '../components/tips/updatePwd'
import tabsModel  from '../components/tools/tabs/tabs.vue'
import {
    initLogin,
    getMenu,
    getList,
    getTabs,
    
} from '../vuex/getters'
import {
    initList,
} from '../vuex/actions'
export default {
  components: {
    languageModel,
    passwordModel,
    alertModel,
    tabsModel
  },
  data() {
      return {
         show:false,
         pwdParam:{
           show:false,
           callback:this.callback
         },
         tipParam:{
            show:false,
            name:'新密码两次输入不一致！',
            alert:true
         },

         
      }
  },
  vuex: {
      getters: {
        getMenu,
        initLogin,
        getList,
        getTabs
      },
      actions:{
        initList
      }
  },
  methods:{
    exit:function(){
      document.cookie = "no=;expires=" ;
      document.cookie = "id=;expires=" ;
      document.cookie = "orgId=;expires=";
      document.cookie = "name=;expires=";
      this.$route.router.go({name: 'login'});
    },
    upwd:function(){
        this.pwdParam.show = true;
    },
    callback:function(title){
      console.log(title)
             // this.param.show=false;
            this.tipParam.show = true;
            this.tipParam.name=title;
            this.tipParam.alert=true;
            console.log(this.tipParam);
    },
    close:function(index){
      this.tabs.splice(index,1);
    }
  },
  created(){
    
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
    left:200px;
    box-shadow: 0px 2px 2px #999;
    z-index: 1000;
}
.nav_tab{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.nav_tab ul{
  margin-bottom: 0px;
}
.nav_tab ul li{
  font-size: 14px;
}
.nav_tab ul li a{
  color: #333;
}

.nav_tab ul li span:hover{
   transform: scale(1.2);
   -moz-transform: scale(1.2);
   -webkit-transform: scale(1.2);
   -ms-transform: scale(1.2);
   color: red;
}
.center_nav {
    height:88px;
    position: fixed;
    right: 0;
    white-space: nowrap;
    left: 50px;
    box-shadow: 0px 2px 2px #ccc;
}
.title_top{
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

.component_action{
  min-width: 75px;
  padding: 0;
  text-align: center;
  margin-top: 28px;
  right:120px;
}
</style>
