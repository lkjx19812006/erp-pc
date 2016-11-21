<template>
    <cancle-model :param="cancleReason" v-if="cancleReason.show"></cancle-model>
    <alert-model :param="tipParam" v-if="tipParam.show"></alert-model>
    <undeline-model :param="undelinePay" v-if="undelinePay.show"></undeline-model>
    <logistics-model :param="logisticsDetail" v-if="logisticsDetail.show"></logistics-model>
    <editorder-model :param="editorder" v-if="editorder.show"></editorder-model>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con client_body" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="order_contain">{{$t('static.order_status')}}</div>
        <div class="navbar-client" style="margin-top:0">
            <div class="message">
               <p class="order-message">{{$t('static.order_message')}}</p>
               <p class="clearfix space_15">
                  <img src="/static/images/tips.png" height="30" width="30" class="left" />
                  <span class="tips">{{param.tips}}</span>
               </p>
            </div>
        </div>
        <div class="navbar-client">
            <div class="message clearfix">
                <p class="order-message">{{$t('static.order_info')}}</p>
                <div class="space_15 clearfix">
                    <div class="left message_front" style="margin-top:5px;">{{$t('static.order_no')}}：{{initOrderDetail.no}}</div>
                    <div class="left message_front"><img src="../../../static/images/contacter.png" height="30" width="23"  class="left"/><span class="tips">{{$t('static.consignee')}}：{{initOrderDetail.consignee}} | {{initOrderDetail.consigneePhone}}</span></div>
                    <div class="left message_front"><img src="../../../static/images/address.png" class="left" height="34" width="24"  /><span class="tips">{{$t('static.consignee_address')}}：{{initOrderDetail.consigneeAddr}}</span></div>
                </div>
            </div>
            <div class="order_info clearfix">
              <div class="col-xs-6 pull-left" v-for="item in initOrderDetail.goods.arr">
                  <p>{{item.brredName}}</p>
                  <p>{{item.price}}元/{{item.unit}}</p>
                  <p>{{$t('static.quantity')}}：{{item.number}}</p>
                  <p>{{$t('static.order_time')}}：{{item.ctime}}</p>
              </div>
              <div class="col-xs-6 pull-left">
                 <div>
                      <label>{{$t('static.sundry_fees')}}：</label><span style="color:#fa6705">¥{{initOrderDetail.incidentals}}</span>（运费）<br>
                      <label>{{$t('static.fee_explain')}}：</label><span style="color:#fa6705">{{initOrderDetail.incidentalsDesc}}</span><br>
                      <label>{{$t('static.preferential')}}：</label><span style="color:#fa6705">¥{{initOrderDetail.preferential}}</span>
                      <br><label>{{$t('static.discount_note')}}：</label><span style="color:#fa6705">{{initOrderDetail.preferentialDesc}}</span>
                 </div>
                 <p><span  style="color:#fa6705">{{$t('static.total')}}：¥{{initOrderDetail.total.toFixed(2)}}</span></p>
              </div>
            </div>
            <!-- 处理订单0 -->
            <div class="clearfix logical_color" v-if="param.handle">
                <input type="button" class="btn  btn-confirm right"  @click="accept({
                    id:initOrderDetail.id,
                    show:true,
                    orderStatus:'',
                    link:'/order/handle',
                    images:''
                   },param.show=false)"  value="{{$t('static.take_order')}}" />
                <button type="button" class="btn btn-default btn-close right"  @click="cancleBtn({
                    id:initOrderDetail.id,
                    cancleCauses:'',
                    show:true,
                    reason:true,
                    headline:'取消订单原因',
                    orderStatus:'',
                    link:'/order/cancle',
                    callback:cancel
                  })">{{$t('static.cancel_order')}}</button>
            </div>
            <!-- 订单确认10 -->
            <div class="clearfix logical_color" v-if="param.sales">
                <input type="button" class="btn  btn-confirm right"  @click="confirmEdit({
                        id:initOrderDetail.id,
                        show:true,
                        orderStatus:'',
                        link:'/order/confirm',
                        images:'',
                       },param.show=false)"  value="{{$t('static.confirm')}}" />
                <button type="button" class="btn btn-default btn-close right"  @click="param.show = false">{{$t('static.cancel')}}</button>
            </div>
            <!-- 订单财务审核 -->
            <div class="clearfix logical_color"  v-if="param.Auditing">
               <div class="clearfix">
                  <img v-for="item in initOrderDetail.payPics.arr" class="col-xs-3" v-bind:src="item.url" />
               </div>
                
                <input type="button" class="btn  btn-confirm right"  @click="accept({
                    id:initOrderDetail.id,
                    show:true,
                    link:'/order/payConfirm',
                    orderStatus:'',
                    images:'',
                    sub:$index
                   },param.show=false)"  value="{{$t('static.pass_checked')}}" />
                <button type="button" class="btn btn-default btn-close right"  @click="param.show = false">{{$t('static.cancel')}}</button>
            </div>
        </div>

      <!-- 订单支付 -->
      <div class="navbar-client" v-if="param.confirmReceipt">
        <div class="clearfix logical_color">
          <input type="button" class="btn  btn-confirm right"  @click="accept({
                    id:initOrderDetail.id,
                    show:true,
                    link:'/order/payConfirm',
                    orderStatus:'',
                    images:'',
                    sub:$index
                    }),param.show = false"  value="{{$t('static.confirm_accept')}}" />
          <button type="button" class="btn btn-default btn-close right"  @click="param.show = false">{{$t('static.cancel')}}</button>
        </div>
      </div>

        <!-- 订单支付 -->
        <div class="navbar-client" v-if="param.payment">
            <div class="message clearfix">
                <p class="order-message">{{$t('static.payment_method')}}</p>
                <div class="space_15 clearfix">
                    <div class="col-xs-6 clearfix"   @click="paychoice(3)">
                         <img src="/static/images/checked.png" v-if="yaokuanPaySelected" height="25" width="25"  class="left margin-10" />
                        <img src="/static/images/unchecked.png" height="25" width="25"  class="left margin-10" v-else/>
                         <img src="/static/images/drugs.png" height="39" width="50" class="left margin-10" />
                         <p>
                            <span>{{$t('static.yaokuan')}}</span><br>
                            <span>{{$t('static.recommend_drugs')}}</span>
                         </p>
                    </div>
                    <div class="col-xs-6 clearfix"  @click="paychoice(0)">
                        <img src="/static/images/checked.png" v-if="undelinePaySelect" height="25" width="25"  class="left margin-10" />
                         <img src="/static/images/unchecked.png" height="25" width="25"  class="left margin-10" v-else/>
                         <img src="/static/images/alipay.png" height="37" width="61" class="left margin-10" />
                         <p>
                            <span>{{$t('static.line_down')}}</span><br>
                            <span>{{$t('static.recommend_line')}}</span>
                         </p>
                    </div>
                </div>
            </div>
            <div class="clearfix logical_color">
                <input type="button" class="btn  btn-confirm right"  @click="payOrder({
                    id:initOrderDetail.id,
                    show:true,
                    link:'/order/pay',
                    payWay:'',
                    orderStatus:'',
                    images:'',
                    callback:underPay
                    })"  value="{{payName}}" />
                <button type="button" class="btn btn-default btn-close right"  @click="param.show = false">{{$t('static.cancel')}}</button>
            </div>
        </div>
        <!-- 订单发货上传物流信息 -->
        <div class="navbar-client" v-if="param.sendoff">
          <div class="message clearfix">
              <p class="order-message">{{$t('static.logistics_info')}}</p>
              <div class="space_15 clearfix">
                <div class="logical_color">
                  <span class="mui-pull-left">{{$t('static.logistics_company')}}：</span>
                  <select v-model="uploadLogistic.b">
                    <option v-for="item in initExpresslist" value="{{item.id + ',' + item.name}}">{{item.name}}</option>
                  </select>
                </div>
                <div class="logical_color">
                  <span class="mui-pull-left">{{$t('static.logistics_no')}}：</span>
                  <input type="number" placeholder="请输入运单号" v-model="uploadLogistic.lcompanyNo"/>
                </div>
                <div class="logical_color">
                  <label class="editlabel">{{$t('static.upload_logistcs')}}</label>
                  <div class="clearfix">
                      <press-image :value.sync="uploadLogistic.image_f" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:14%"></press-image>
                     <press-image :value.sync="uploadLogistic.image_s" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:14%"></press-image>
                     <press-image :value.sync="uploadLogistic.image_t" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:14%"></press-image>
                  </div>
                </div>
              </div>
          </div>
          <div class="clearfix logical_color">
              <input type="button" class="btn  btn-confirm right"  @click="accept(uploadLogistic,param.show=false)"  value="{{$t('static.confirmation_delivery')}}" />
          </div>
        </div>
        <!-- 订单待收货查看物流 -->
        <div class="navbar-client" v-if="param.delivery">
          <div class="message clearfix">
              <p class="order-message">{{$t('static.logistics_info')}}</p>
              <div class="space_15 clearfix">
                <div class="logical_color">
                  <span>{{$t('static.logistics_company')}}：{{initOrderDetail.logisticses.arr[0].name}}</span>
                </div>
                <div class="logical_color">
                  <span>{{$t('static.logistics_no')}}：{{initOrderDetail.logisticses.arr[0].number}}</span>
                </div>
                <div class="logical_color clearfix">
                  <p>{{$t('static.logistics')}}：</p>
                  <img  class="picture" v-for="item in initOrderDetail.sendPics.arr"  v-bind:src="item.url"/>
                </div>
              </div>
              <div class="order_info clearfix">
                <input type="button" class="btn  btn-confirm right"  @click="accept({
                  id:param.id,
                  show:true,
                  orderStatus:'',
                  link:'/order/receiveConfirm'
                },param.show=false)"  value="{{$t('static.confirm_receipt')}}" />
                <input type="button" class="btn  btn-confirm right margin-10"  @click="Viewlogistics({
                  id:initOrderDetail.logisticses.arr[0].id,
                  lcompanyId:initOrderDetail.logisticses.arr[0].logistics,
                  lcompanyCode:initOrderDetail.logisticses.arr[0].code,
                  number:initOrderDetail.logisticses.arr[0].number,
                  show:true,
                  loading:true,
                  callback:logisticsInfo
                  })" value="{{$t('static.view_logistics')}}" />

              </div>
          </div>
        </div>
        <!-- 买家订单待收货查看物流 -->
        <div class="navbar-client" v-if="param.express">
          <div class="message clearfix">
              <p class="order-message">{{$t('static.logistics_info')}}</p>
              <div class="space_15 clearfix">
                <div class="logical_color">
                  <span>{{$t('static.logistics_company')}}：{{initOrderDetail.logisticses.arr[0].name}}</span>
                </div>
                <div class="logical_color">
                  <span>{{$t('static.logistics_no')}}：{{initOrderDetail.logisticses.arr[0].number}}</span>
                </div>
                <div class="logical_color clearfix">
                  <p>{{$t('static.logistics')}}：</p>
                  <img  class="picture" v-for="item in initOrderDetail.sendPics.arr"  v-bind:src="item.url"/>
                </div>
              </div>
              <div class="order_info clearfix">
                <input type="button" class="btn  btn-confirm right margin-10"  @click="Viewlogistics({
                  id:initOrderDetail.logisticses.arr[0].id,
                  lcompanyId:initOrderDetail.logisticses.arr[0].logistics,
                  lcompanyCode:initOrderDetail.logisticses.arr[0].code,
                  number:initOrderDetail.logisticses.arr[0].number,
                  show:true,
                  loading:true,
                  callback:logisticsInfo
                  })"  value="{{$t('static.view_logistics')}}" />

              </div>
          </div>
        </div>

    </div>
</template>
<script>
import cancleModel from  '../order/cancleMsg'
import undelineModel from  '../order/uploadPayment'
/*import yaokuanModel from  '../order/orderpayPassword'*/
import pressImage from '../imagePress'
import logisticsModel  from  '../order/logisticsDetail'
import editorderModel  from  '../order/ordergoods'
import alertModel from  '../tips/tipDialog'
import {
  initExpresslist,
  initOrderDetail
} from '../../vuex/getters'
import {
    getOrderDetail,
    orderCancle,
    orderStatu,
    yankuanPayorder,
    getExpressList,
    alterOrder,
    logisticsInfo
} from '../../vuex/actions'
export default {
    components: {
        cancleModel,
        undelineModel,
        pressImage,
        logisticsModel,
        editorderModel,
        alertModel
    },
    props:['param'],
    data() {
        return {
            changeShow: true,
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px'
            },
            cancleReason:{
               show:false,
            },
            undelinePaySelect:false,
            yaokuanPaySelected:false,
            undelinePay:{
               show:false,
               images:'',
               callback:'',
               id:'',
               link:'',
               payWay:'',
               orderStatus:''
            },
            payorder:{
              show:false,
            },
            imageParam:{
                url:'/crm/api/v1/file/',
                qiniu:false
            },
            logisticsDetail:{
              show:false
            },
            editorder:{
              show:false
            },
            payName: "{{$t('static.to_pay')}}",
          type:"image/jpeg,image/jpg,image/png",
            uploadLogistic:{
              images:'',
              b:'',
              orderStatus:'',
              lcompanyId:'',
              lcompanyNo:'',
              id:this.param.id,
              show:true,
              link:'/order/send',
              image_f:'',
              image_s:'',
              image_t:'',
              name:''
            },
            tipParam:{
              show:false,
              alert:true,
              name:''
            }
        }
    },

    vuex: {
        getters:{
            initExpresslist,
            initOrderDetail
        },
        actions:{
          getOrderDetail,
            orderCancle,
            orderStatu,
            yankuanPayorder,
            getExpressList,
            alterOrder,
            logisticsInfo
        }
    },
    methods: {
        cancleBtn:function(cancle){
            console.log(cancle)
            this.cancleReason = cancle;
            this.param.reason=true;
            /*this.orderCancle(this.cancleReason)*/
        },
        cancel:function(){
            this.orderCancle(this.cancleReason,this.param);
        },
        accept:function(confirm){
            console.log(confirm)
            this.orderStatu(confirm)
        },
        confirmEdit:function(confirm){
          console.log(confirm)
            this.orderStatu(confirm)
        },
        orderEdit:function(edit){
          console.log(edit)
          this.editorder = edit;
        },
        Viewlogistics:function(logistics){
          console.log(logistics)
            this.logisticsDetail = logistics;
            this.logisticsInfo(this.logisticsDetail)
        },
        paychoice:function(payWay){
            console.log(payWay)
            this.payWay = payWay;
            if(payWay ==0){
              this.undelinePaySelect = true; //线下
              this.yaokuanPaySelected = false;
              this.payName="申请审核";
            }else if(payWay ==3){
              this.yaokuanPaySelected = true; //药款
              this.undelinePaySelect = false;
              this.payName="去支付";
            }
        },
        payOrder:function(payorder){
          payorder.payWay = this.payWay;
          console.log(payorder.payWay)

           if(payorder.payWay==0){    //线下打款
               this.undelinePay=payorder;
               console.log(payorder)
               this.$broadcast('getImageData');
            }else if(payorder.payWay==3){    //药款支付
               this.yankuanPayorder(this.param,payorder);
               console.log(payorder)
               //this.param.show=false;
            }else {
               console.log('请选择支付方式');
                this.tipParam.show = true;
                this.tipParam.name='请选择支付方式';
                this.tipParam.alert=true;
            }

        },
        underPay:function(){
            this.yankuanPayorder(this.param,this.undelinePay);
        },
    },
    created() {
        this.getExpressList(this.loadParam);
        this.getOrderDetail(this.param);
    }
}
</script>
<style scoped>
.client_body {
  background-color: #f5f5f5;
}
.modal{
  z-index: 1100;
}
.modal_con{
  z-index: 1101;
  width: 60%;
}
.top-title{
   position: fixed;
   right: 0;
   width: 60%;
   margin: auto;
   left: 0;
}
.order_contain{
  text-align: center;
  padding:20px 0 20px 0;
  font-size: 16px;
}
.logical_color{
  margin: 10px 0 ;
}
.logical_color input{
  border: 1px solid #ddd;
}
.logical_color select{
  border: 1px solid #ddd;
}
.picture{
  float: left;
  width: 14%;
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
.btn-confirm{
  margin-right: 10px;
}
.order-message{
  border-bottom: 1px solid #ddd;
  line-height:45px;
  font-size: 14px;
}
.message_front{
  width: 33.33%;
}
.tips{
  margin-left: 13px;
  margin-top: 5px;
  display: inline-block;
  white-space: normal;
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

.order_info{
  border-top: 1px solid #ddd;
  padding: 20px 0;
 }
.order_info div:nth-child(2){
  padding-left: 13%;
  border-left: 1px solid #ddd;
}
</style>
