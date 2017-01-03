<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show" @click="param.show=false">
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
                        <span class="navbar-brand navbar-name" href="#">{{initReceiptDetail.customerName}}</span>
                    </div>
                </div>
            </nav>
        </div>
        <section>
            <div class="client-section clearfix" @click.stop="">
              <h4 class="section_title">{{$t('static.details')}}</h4>
                <ul class="clearfix" style="margin-top:20px;font-size: 13px; white-space: normal;">
                  <li class="col-md-6 col-xs-6">商品名称：<label>{{initReceiptDetail.orderDesc}}</li>
                  <li class="col-md-6 col-xs-6">客户名称：<label>{{initReceiptDetail.customerName}}</label></li>
                  <li class="col-md-6 col-xs-6">客户手机：<label>{{initReceiptDetail.customerPhone}}</li>
                  <li class="col-md-6 col-xs-6">订单流水号：<label>{{initReceiptDetail.orderNo}}</li>
                  <li class="col-md-6 col-xs-6" v-if="param.url=='/order/contract/details/'">合同文本：<label>{{initReceiptDetail.contractText}}</li>
                  <li class="col-md-6 col-xs-6" v-if="param.url=='/order/contract/details/'">调整差额：<label>{{initReceiptDetail.adjusted}}</li>
                  <li class="col-md-6 col-xs-6">备注：<label>{{initReceiptDetail.comment}}</li>
                  <li class="col-md-6 col-xs-6">创建时间：<label>{{initReceiptDetail.ctime | dateTime}}</li>
                </ul>
            </div>
        </section>
    </div>
</template>
<script>
import{
    initReceiptDetail
} from '../../../vuex/getters'
import {
    getReceiptDetail
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
            initReceiptDetail
        },
        actions:{
            getReceiptDetail
        }
    },
    methods:{
      close:function(){
        console.log(this.param)
        this.param.show=false;
      }
    },
    created(){
       this.getReceiptDetail(this.param);
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
