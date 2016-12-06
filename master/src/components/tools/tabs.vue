<template>
	<div class="nav_tab">
        <ul class="nav nav-tabs" role="tablist"  >
          <li role="presentation" v-for="item in tabs">
              <div  v-link="item.url" role="tab" data-toggle="tab" class="{{$route.path==item.url?'active_font':''}}">{{item.cname}}<span @click.stop="closeTab($index)" class="glyphicon glyphicon-remove"></span></div>
          </li>
        </ul>
    </div>
</template>
<script>
import Vue from 'vue'
import {
    getList
} from '../../vuex/getters'
import {
    
} from '../../vuex/actions'
export default {
  components: {
    
  },
  props:['param'],
  data() {
      return {
     
      	 callback:this.pushTab,
         tabs:[{"id":12,"cname":"我的客户","url":"/home/client?id=0","top":true},{"id":13,"cname":"部门客户","url":"/home/client?id=1","top":true},{"id":14,"cname":"全部客户","url":"/home/client?id=2","top":true}]
         //tabs:[]

         
      }
  },
  vuex: {
      getters: {
        getList
      },
      actions:{
        
      }
  },
  methods:{
    pushTab:function(){
    	
    },
    closeTab:function(index){
      this.tabs.splice(index,1);
    }
  },
  created(){
    
  }
  
}
</script>
<style scoped>
.center_top {
    height: 88px;
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
.nav_tab ul li div{
  color: #333;
  padding:5px 8px;
}
.nav_tab ul li span:hover{
   transform: scale(1.2);
   -moz-transform: scale(1.2);
   -webkit-transform: scale(1.2);
   -ms-transform: scale(1.2);
   color: red;
}
.active_font {
    background: #fff !important;
    border-top: 1px solid #fa6705;
}
.v-link-active {
     color: #333;
    background: #aaa;
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