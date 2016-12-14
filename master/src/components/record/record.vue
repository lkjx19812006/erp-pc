<template>
    
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div class="top-title">
            <span class="glyphicon glyphicon-remove-circle" @click="param.show=false"></span>
        </div>
        <div class="cover_loading">
            <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <div style="margin-top:30px"></div>
       <!--  <div v-for="item in initFlowRecord" style="margin-left:20px">
           <div class="" style="float:left"><img src="/static/images/blackselect.png"></div>
           <div class="">{{item.bizType}}订单审核</div>
           <div style="height:50px;border-left:5px solid red;margin-left:10px"></div>
       </div> -->

        <div class="track-rcol">
            <div class="track-list">
                <ul>
                    <li class="first" v-for="item in initFlowRecord" v-if="$index==0">
                        <i class="node-icon"></i>
                        <span class="time">{{item.ctime}}</span>
                        <span class="txt">{{item.creater}} {{item.description}}！</span>
                    </li>
                    <li class="node-icon" v-for="item in initFlowRecord" v-if="$index!=0">
                        <i class="node-icon"></i>
                        span class="time">{{item.ctime}}</span>
                        <span class="txt">{{item.creater}} {{item.description}}！</span>
                    </li>
                </ul>
            </div>
        </div>


        <!-- <div class="track-rcol">
            <div class="track-list">
                <ul>
                    <li class="first">
                        <i class="node-icon"></i>
                        <span class="time">2016-03-10 18:07:15</span>
                        <span class="txt">感谢您在京东购物，欢迎您再次光临！</span>
                    </li>
                    <li>
                        <i class="node-icon"></i>
                        <span class="time">2016-03-10 18:07:15</span>
                        <span class="txt">【京东到家】京东配送员【申国龙】已出发，联系电话【18410106883，感谢您的耐心等待，参加评价还能赢取京豆呦】</span>
                    </li>
                    <li>
                        <i class="node-icon"></i>
                        <span class="time">2016-03-10 18:07:15</span>
                        <span class="txt">感谢您在京东购物，欢迎您再次光临！</span>
                    </li>
                    <li>
                        <i class="node-icon"></i>
                        <span class="time">2016-03-10 18:07:15</span>
                        <span class="txt">感谢您在京东购物，欢迎您再次光临！</span>
                    </li>
                    <li>
                        <i class="node-icon"></i>
                        <span class="time">2016-03-10 18:07:15</span>
                        <span class="txt">感谢您在京东购物，欢迎您再次光临！</span>
                    </li>
                    <li>
                        <i class="node-icon"></i>
                        <span class="time">2016-03-10 18:07:15</span>
                        <span class="txt">感谢您在京东购物，欢迎您再次光临！</span>
                    </li>
                </ul>
            </div>
        </div> -->

    </div>
</template>
<script>


import {
    initFlowRecord
} from '../../vuex/getters'
import {
    getFlowRecord
} from '../../vuex/actions'
export default {
    components: {
     
    },
    props:['param'],
    data(){
      return {
        
         
      }
    },
    vuex:{
      getters:{
          initFlowRecord
      },
      actions:{
          getFlowRecord
      }
    },
    methods:{
          
    },
   created(){
      this.getFlowRecord(this.param);
   }
}
</script>
<style scoped>
.client_body {
    position: relative;
    background-color: #fff;
    padding: 20px;
}
.top-title{
    position: fixed;
    width: 550px;
    right: 0;
    left: 0;
    margin: auto;
    z-index: 1083
}
.modal_con{
    width: 550px;
    min-height:400px;
    top:200px;
    bottom:auto;

}


.edit-detail {
    border: 1px solid #ddd;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    position: relative;
    padding: 10px;
}

img {
    display: inline-block;
}

ul li{list-style: none;}
.track-rcol{width: 600px; border: 1px solid #eee;}
.track-list{margin: 20px; padding-left: 5px; position: relative;}
.track-list li{position: relative; padding: 9px 0 0 25px; line-height: 18px; border-left: 1px solid #d9d9d9; color: #999;}
.track-list li.first{color: red; padding-top: 0; border-left-color: #fff;}
.track-list li .node-icon{position: absolute; left: -6px; top: 50%; width: 11px; height: 11px; background: url(/static/images/order-icons.png)  -21px -72px no-repeat;}
.track-list li.first .node-icon{background-position:0 -72px;}
.track-list li .time{margin-right: 20px; position: relative; top: 4px; display: inline-block; vertical-align: middle;}
.track-list li .txt{max-width: 600px; position: relative; top: 4px; display: inline-block; vertical-align: middle;}
.track-list li.first .time{margin-right: 20px; }
.track-list li.first .txt{max-width: 600px; }


</style>
