<template>
    <div class="center_top light_bg mui-clearfix" v-bind:class="{'center_top':getMenu==240,'center_nav':getMenu==50}" transition="expand">
        <div class="new_time left">{{$t('static.login_time_recently')}}:{{ initLogin.time }}</div>
      <div class="right head_info" style="margin-top:10px"> <language-model> </language-model></div>
        <div class="right head_info clearfix" >

            <span style="float:left;margin:20px 10px 0 0 ">{{initLogin.name}}</span>
            <img src="/static/images/head.png" class="left" height="52" width="52" @click="show=!show"/>
            <div class="component_action" v-show="show">
              <ul>
                <li @click="exit()">
                  {{$t('static.logout')}}
                </li>
              </ul>
            </div>

        </div>
    </div>
</template>
<script>
  import languageModel from '../components/tools/language'
import {
    getMenu,
    initLogin
} from '../vuex/getters'
export default {
  components: {
    languageModel
  },
    data() {
            return {
                  show:false
            }
        },
        vuex: {
            getters: {
                getMenu,
              initLogin
            }
        },
  methods:{
    exit:function(){
      document.cookie = "no=;expires=" ;
      document.cookie = "id=;expires=" ;
      document.cookie = "orgId=;expires=";
      document.cookie = "name=;expires=";
      this.$route.router.go({name: 'login'});

    }
  }
}
</script>
<style scoped>
.center_top {
    height: 70px;
    position: fixed;
    right: 0;
    white-space: nowrap;
    left: 170px;
    box-shadow: 0px 2px 2px #999;
    z-index: 1000;
}

.center_nav {
    height: 70px;
    position: fixed;
    right: 0;
    white-space: nowrap;
    left: 50px;
    box-shadow: 0px 2px 2px #ccc;
}

.center_left {
    left: 50px;
}

.new_time {
    margin-left: 40px;
    font-size: 14px;
    color: #666;
    padding-top: 30px;
}

.head_info {
    padding-right: 16px;
    padding-top: 10px;
}

.component_action{
  min-width: 75px;
  padding: 0;
  text-align: center;
  margin-top: 28px;
  right:120px;
}
</style>
