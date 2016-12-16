<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="close()" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="cover_loading">
            <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <div class="client_nav">
            <nav class="navbar navbar-client" role="navigation">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                        <span class="navbar-brand navbar-name" href="#">{{initFundDetail.payUserName}}</span>
                    </div>
                </div>
            </nav>
        </div>
        <section>
            <div class="client-section clearfix" >
              <h4 class="section_title">{{$t('static.details')}}</h4>
                <ul class="clearfix" style="margin-top:20px;font-size: 13px">
                  <li class="col-md-4">支付类型：<label>{{initFundDetail.bizType | bizType}}{{initFundDetail.type | payMent}}</li>
                  <li class="col-md-4">支付名称：<label>{{initFundDetail.payName}}</label></li>
                  <li class="col-md-4">用户名：<label>{{initFundDetail.payUserName}}</li>
                  <li class="col-md-4">账&nbsp;&nbsp;&nbsp;&nbsp;号：<label>{{initFundDetail.payNumber}}</li>
                  <li class="col-md-4" v-show="initFundDetail.payWay==2">支付分行：<label>{{initFundDetail.payName}}</li>
                  <li class="col-md-4">支付金额：<label>{{initFundDetail.amount}}</li>
                  <li class="col-md-4" v-if="initFundDetail.pr==0">收/付款状态：<label>未收款/付款</li>
                  <li class="col-md-4" v-if="initFundDetail.pr==1&&initFundDetail.type==1">支付状态：<label>已确认收款</li>
                  <li class="col-md-4" v-if="initFundDetail.pr==1&&initFundDetail.type==0">支付状态：<label>已确认付款</li>
                  <li class="col-md-4">创建时间：<label>{{initFundDetail.ctime}}</li>
                </ul>
                <ul class="clearfix">
                  <li v-for="img in initFundDetail.images" class="col-md-4">
                      <img :src="img.url" />
                  </li>
                </ul>
            </div>
        </section>
    </div>
</template>
<script>
import{
    initFundDetail
} from '../../../vuex/getters'
import {
    getFundDetail
} from '../../../vuex/actions'
export default {
    components: {
        
    },
    data() {
        return {
            changeShow: true,
            
        }
    },
    props:['param'],
    vuex: {
        getters:{
            initFundDetail
        },
        actions:{
            getFundDetail
        }
    },
    methods:{
      close:function(){
        console.log(this.param)
        this.param.show=false;
      }
    },
    created(){
       this.getFundDetail(this.param);
    }
}
</script>
<style scoped>
.navbar-client {
    margin-bottom: 0;
    padding-top: 10px;
    background-color: #f5f5f5;
}
.modal_con{
  height: 600px;
}
.navbar-img {
    float: left;
    margin-right: 10px;
}
.client-line{
  border-left: 1px solid #ddd;
}
.navbar-name {
    color: #fa6705;
    font-size: 20px;
}

.top-title{
  width:800px;
  left: 0;
  right:0;
  z-index: 1081;
}

</style>
