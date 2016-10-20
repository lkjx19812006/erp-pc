<template>
    <cancle-model :param="cancleReason" v-if="cancleReason.show"></cancle-model>
    <div class="client_body">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="navbar-client">
            <div class="message">
               <p class="order-message">订单消息</p>
               <p class="clearfix space_15">
                  <img src="/static/images/tips.png" height="30" width="30" class="left" />
                  <span class="tips">{{param.tips}}</span>
               </p>
            </div>
        </div>
        <div class="navbar-client">
            <div class="message clearfix">
                <p class="order-message">订单信息</p>
                <div class="space_15 clearfix">
                    <div class="left message_front" style="margin-top:5px;">订单号：{{param.no}}</div>
                    <div class="left message_front"><img src="../../../static/images/contacter.png" height="30" width="23"  class="left"/><span class="tips">收件人：{{param.consignee}} | {{param.consigneePhone}}</span></div>
                    <div class="left message_front"><img src="../../../static/images/address.png" class="left" height="34" width="24"  /><span class="tips">收件人地址：{{param.consigneeAddr}}</span></div>
                </div>
            </div>
            <div class="order_info clearfix">
              <div class="col-xs-6 pull-left">
                  <p>{{param.goods[0].brredName}}</p>
                  <p>{{param.goods[0].price}}元/{{param.goods[0].unit}}</p>
                  <p>数量：{{param.goods[0].number}}</p>
                  <p>下单时间：{{param.goods[0].ctime}}</p>
              </div>
              <div class="col-xs-6 pull-left">
                 <p><label>杂费：</label><span style="color:#fa6705">¥{{param.incidentals.toFixed(2)}}</span>（运费）</p>
                 <p><label>合计：</label><span  style="color:#fa6705">¥{{param.goods[0].amount.toFixed(2)}}</span></p>
              </div> 
            </div>
            <div class="clearfix" v-if="param.sales">
                <input type="button" class="btn  btn-confirm right"  @click="accept({
                    id:param.id,
                    show:true,
                    link:'/order/confirm'
                   },param.show=false)"  value="接单" />
                <button type="button" class="btn btn-default btn-close right"  @click="cancleBtn({
                    id:param.id,
                    cancleCauses:'',
                    show:true,
                    headline:'取消订单原因',
                    link:'/order/cancle',
                    callback:orderCancle
                  })">取消</button>
            </div>
        </div>
        <div class="navbar-client" v-if="param.payment">
            <div class="message clearfix">
                <p class="order-message">支付方式</p>
                <div class="space_15 clearfix">
                    <div class="col-xs-6 clearfix"   @click="paychoice(3)">
                         <img src="/static/images/checked.png" v-if="undelinePaySelect.show" height="25" width="25"  class="left margin-10" />
                        <img src="/static/images/unchecked.png" height="25" width="25"  class="left margin-10" v-else/>
                         <img src="/static/images/drugs.png" height="39" width="50" class="left margin-10" />
                         <p>
                            <span>药款支付</span><br>
                            <span>推荐已开通药款账户用户使用</span>
                         </p>
                    </div>
                    <div class="col-xs-6 clearfix"  @click="paychoice(0)">
                         <img src="/static/images/unchecked.png" height="25" width="25"  class="left margin-10" />
                         <img src="/static/images/alipay.png" height="37" width="61" class="left margin-10" />
                         <p>
                            <span>线下打款</span><br>
                            <span>金额较大或企业账户</span>
                         </p>
                    </div>
                </div>
            </div>
            <div class="clearfix">
                <input type="button" class="btn  btn-confirm right"  @click="payOrder({
                    id:param.id,
                    show:true,
                    link:'/order/pay'
                   },param.show=false)"  value="支付" />
                <button type="button" class="btn btn-default btn-close right"  @click="cancleBtn({
                    id:param.id,
                    cancleCauses:'',
                    show:true,
                    headline:'取消订单原因',
                    link:'/order/cancle',
                    callback:orderCancle
                  })">取消</button>
            </div>
        </div>
    </div>
</template>
<script> 
import cancleModel from  '../order/cancleMsg'
import {
    orderCancle,
    orderStatu
} from '../../vuex/actions'
export default {
    components: {
        cancleModel
    },
    data() {
        return {
            changeShow: true,
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            cancleReason:{
               show:false
            },
            undelinePaySelect:false,
            yaokuanPaySelected:false,
        }
    },
    props:['param'],
    vuex: {
        getters:{
            
        },
        actions:{
            orderCancle,
            orderStatu
        }
    },
    methods: {
        cancleBtn:function(cancle){
            console.log(cancle)
            this.cancleReason = cancle;
            /*this.orderCancle(this.cancleReason)*/
        },
        accept:function(confirm){
          console.log(confirm)
            this.orderStatu(confirm)
        },
        paychoice:function(payWay){
          console.log(payWay)
            this.payWay = payWay;
            if(payWay ==0){
              this.undelinePaySelect = true; //线下
            }else if(payWay ==3){
              this.yaokuanPaySelected = true; //药款
            }
        },
        payOrder:function(){

        }
    },
    created(){
        
    }
}
</script>
<style scoped>
.client_body {
    position: relative;
    background-color: #f5f5f5;
}

.navbar-client {
    margin-bottom: 0;
    padding-top: 10px;
    background-color: #fff;
    padding:0 20px;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    margin-top: 20px;
}
.order-message{
  border-bottom: 1px solid #ddd;
  line-height:45px;
  font-size: 16px;
}
.message_front{
  width: 33.33%;
}
.tips{
  margin-left: 20px;
  margin-top: 5px;
  display: inline-block;
}
.btn-close,.margin-10{
  margin-right:10px;
}
.btn-base {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #003077;
    margin-right: 5px;
    font-size: 14px;
}
.space_15{
  margin:15px 0;
}
.top-title{
  z-index: 100;
  width: 100%;
  right: 0;
  top: 130px;
}
.order_info{
  border-top: 1px solid #ddd;
  padding: 20px 0;
 }
.order_info div:first-child{
  border-right: 1px solid #ddd;
}
.order_info div:nth-child(2){
  margin-top: 20px;
}
</style>
