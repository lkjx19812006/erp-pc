<template>
	<div class="nav_tab">
        <ul class="nav nav-tabs" role="tablist"  >
          <li role="presentation" v-for="item in tabs">
              <a  v-link="item.url" role="tab" data-toggle="tab" class="{{$route.path==item.url?'active_font':''}}" @click="setIsTop()">{{item.cname}}<span @click.stop="closeTab($index)" class="glyphicon glyphicon-remove"></span></a>
          </li>
        </ul>
    </div>
</template>
<script>
import Vue from 'vue'
import {
    
} from '../../../vuex/getters'

import {
    
} from '../../../vuex/actions'
export default {
  components: {
    
  },
  props:['param'],
  data() {
      return {
        tabs:[]
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
    setIsTop:function(){
      this.$store.state.table.isTop = true;
    },
    closeTab:function(index){
      this.tabs.splice(index,1);
    }
  },

  events:{
    topTab:function(tab){
      var arr = [];
       for(var i = 0;i<this.tabs.length;i++){
        
          arr.push(this.tabs[i].id);
       }
       console.log(arr);
       if(arr.indexOf(tab.id) == -1){
          this.tabs.push(tab);
       }
       
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