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
                  <p>{{item.breedName}}</p>
                  <p>{{item.price}}元/{{item.unit}}</p>
                  <p>{{$t('static.quantity')}}：{{item.number}}</p>
                  <p>{{$t('static.order_time')}}：{{item.ctime}}</p>
              </div>
              <div class="col-xs-6 pull-left">
                 <div>
                      <label>{{$t('static.sundry_fees')}}：</label><span style="color:#fa6705">¥{{initOrderDetail.incidentals}}</span><br>
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
                    key:param.key,
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
                    key:param.key,
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
                        key:param.key,
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
                    key:param.key,
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
                    key:param.key,
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
                    key:param.key,
                    payWay:'',
                    orderStatus:'',
                    images:'',
                    callback:underPay
                    })"  value="{{payName}}" />
                <button type="button" class="btn btn-default btn-close right"  @click="param.show = false">{{$t('static.cancel')}}</button>
            </div>
        </div>
        <!-- 订单采购发货上传物流信息 -->
        <div class="navbar-client" v-if="param.sendoff&&initOrderDetail.type==0">
        <validator name="validation">
          <div class="message clearfix">
              <p class="order-message">{{$t('static.logistics_info')}}</p>
              <!-- 上传物流 -->
              <div class="space_15 clearfix col-md-12">
                <div class="logical_color clearfix col-md-6">
                  <span class="pull-left">{{$t('static.logistics_company')}} <span class="system_danger" v-if="$validation.logisticname.required">{{$t('static.required')}}</span></span>
                  <input type="text" v-model="uploadLogistic.b"  v-show="false"  v-validate:logisticname="{required:true}"/>
                  <select v-model="uploadLogistic.b" class="form-control left">
                    <option v-for="item in initExpresslist" value="{{item.id + ',' + item.name}}">{{item.name}}{{item.code}}</option>
                  </select>
                </div>
                <div class="logical_color clearfix col-md-6">
                  <span class="pull-left">{{$t('static.logistics_no')}} <span class="system_danger" v-if="$validation.logisticno.required">{{$t('static.required')}}</span></span>
                  <input type="number" class="form-control left" placeholder="{{$t('static.willpay')}}" v-model="uploadLogistic.lcompanyNo" v-validate:logisticno="{required:true}" />
                </div>
                <div class="logical_color col-md-12">
                  <label class="editlabel">{{$t('static.upload_logistcs')}}</label>
                  <div class="clearfix">
                      <press-image :value.sync="uploadLogistic.image_f" :type="type" :param="imageParam" style="float:left;width:15%"></press-image>
                     <press-image :value.sync="uploadLogistic.image_s" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:15%"></press-image>
                     <press-image :value.sync="uploadLogistic.image_t" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:15%"></press-image>
                  </div>
                </div>
              </div>
          </div>
          <div class="clearfix logical_color">
              <input type="button" class="btn  btn-confirm right"  @click="accept(uploadLogistic,param.show=false)" v-if="$validation.valid"  value="{{$t('static.confirmation_delivery')}}" />
              <input type="button" class="btn  btn-confirm right"  v-else disabled="true"  value="{{$t('static.confirmation_delivery')}}" />
          </div>
        </validator>
        </div>
        <!-- 订单销售发货上传物流信息 -->
        <div class="navbar-client" v-if="param.sendoff&&initOrderDetail.type==1">
        <validator name="validation">
          <div class="message clearfix">
              <p class="order-message">{{$t('static.logistics_info')}}</p>
              <div class="clearfix col-md-6">
                <span class="pull-left">选择发货方式：</span>
                <select v-model="salesLogistic.way" class="form-control left">
                   <option value="0" selected>第三方物流</option>
                   <option value="1">包车自运</option>
                </select>
              </div>
              <!-- 上传物流 -->
              <div class="space_15 clearfix col-md-12" v-if="salesLogistic.way==0">
                <div class="logical_color clearfix col-md-6">
                  <span class="pull-left">{{$t('static.logistics_company')}} <span class="system_danger" v-if="$validation.logisticname.required">{{$t('static.required')}}</span></span>
                  <input type="text" v-model="salesLogistic.b"  v-show="false"  v-validate:logisticname="{required:true}"/>
                  <select v-model="salesLogistic.b" class="form-control left">
                    <option v-for="item in initExpresslist" value="{{item.id + ',' + item.name}}">{{item.name}}{{item.code}}</option>
                  </select>
                </div>
                <div class="logical_color clearfix col-md-6">
                  <span class="pull-left">{{$t('static.logistics_no')}} <span class="system_danger" v-if="$validation.logisticno.required">{{$t('static.required')}}</span></span>
                  <input type="number" class="form-control left" placeholder="{{$t('static.willpay')}}" v-model="salesLogistic.lcompanyNo" v-validate:logisticno="{required:true}" />
                </div>
                <div class="logical_color col-md-12">
                  <label class="editlabel">{{$t('static.upload_logistcs')}}</label>
                  <div class="clearfix">
                      <press-image :value.sync="salesLogistic.image_f" :type="type" :param="imageParam" style="float:left;width:15%"></press-image>
                     <press-image :value.sync="salesLogistic.image_s" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:15%"></press-image>
                     <press-image :value.sync="salesLogistic.image_t" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:15%"></press-image>
                  </div>
                </div>
              </div>
              <!-- 司机信息 -->
              <div class="space_15 clearfix col-md-12" v-if="salesLogistic.way==1">
                <div class="logical_color clearfix col-md-6">
                  <span class="pull-left">司机姓名 <span class="system_danger" v-if="$validation.drivername.required">{{$t('static.required')}}</span></span>
                  <input type="text" class="form-control left" placeholder="请输入司机姓名" v-model="salesLogistic.driverName" v-validate:drivername="{required:true}" />
                </div>
                <div class="logical_color clearfix col-md-6">
                  <span class="pull-left">身份证号 <span class="system_danger" v-if="$validation.drivernumber.IDCard">{{$t('static.required')}}</span></span>
                  <input type="text" class="form-control left" placeholder="请输入司机身份证号" v-model="salesLogistic.driverPid" v-validate:drivernumber="['IDCard']" />
                </div>
                <div class="logical_color clearfix col-md-6">
                  <span class="pull-left">司机联系方式 <span class="system_danger" v-if="$validation.drivertel.phone">{{$t('static.required')}}</span></span>
                  <input type="tel" class="form-control left" placeholder="请输入司机联系方式" v-model="salesLogistic.driverTel" v-validate:drivertel="['phone']" />
                </div>
                <div class="logical_color clearfix col-md-6">
                  <span class="pull-left">车辆车牌号 <span class="system_danger" v-if="$validation.driverno.required">{{$t('static.required')}}</span></span>
                  <input type="text" class="form-control left" placeholder="请输入车牌号" v-model="salesLogistic.vehicleNo" v-validate:driverno="{required:true}" />
                </div>
                <div class="logical_color col-md-12">
                  <label class="editlabel">{{$t('static.upload_logistcs')}}</label>
                  <div class="clearfix">
                      <press-image :value.sync="salesLogistic.image_f" :type="type" :param="imageParam" style="float:left;width:15%"></press-image>
                     <press-image :value.sync="salesLogistic.image_s" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:15%"></press-image>
                     <press-image :value.sync="salesLogistic.image_t" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:15%"></press-image>
                  </div>
                </div>
              </div>
          </div>
          <div class="clearfix logical_color">
              <input type="button" class="btn  btn-confirm right"  @click="accept(salesLogistic,param.show=false)" v-if="$validation.valid"  value="{{$t('static.confirmation_delivery')}}" />
              <input type="button" class="btn  btn-confirm right"  v-else disabled="true"  value="{{$t('static.confirmation_delivery')}}" />
          </div>
        </validator>
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
                    link:'/order/receiveConfirm',
                    key:param.key
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
                  key:param.key,
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
                size: '15px',
                key:'orderDetail',
                id:this.param.id,
            },
            cancleReason:{
               show:false,
               key:this.param.key
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
               orderStatus:'',
               key:this.param.key
            },
            payorder:{
              show:false,
              key:this.param.key
            },
            imageParam:{
                url:'/crm/api/v1/file/',
                qiniu:false
            },
            logisticsDetail:{
              show:false,
              key:this.param.key
            },
            editorder:{
              show:false,
              key:this.param.key
            },
            payName: "去支付/To pay",
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
              key:this.param.key,
              image_f:'',
              image_s:'',
              image_t:'',
              name:''
            },
            salesLogistic:{
              images:'',
              b:'',
              orderStatus:'',
              lcompanyId:'',
              lcompanyNo:'',
              id:this.param.id,
              driverName:'',
              driverPid:'',
              driverTel:'',
              vehicleNo:'',
              show:true,
              way:0,
              link:'/order/sendflowSend',
              key:this.param.key,
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
            confirm.callback = this.param.callback;
            this.orderStatu(confirm);
        },
        confirmEdit:function(confirm){
            confirm.callback = this.param.callback;
            this.orderStatu(confirm)
        },
        orderEdit:function(edit){
 
          this.editorder = edit;
        },
        Viewlogistics:function(logistics){
         
            this.logisticsDetail = logistics;
            this.logisticsInfo(this.logisticsDetail)
        },
        paychoice:function(payWay){
            
            this.payWay = payWay;
            if(payWay ==0){
              this.undelinePaySelect = true; //线下
              this.yaokuanPaySelected = false;
              this.payName="申请审核";
            }else if(payWay ==3){
              this.yaokuanPaySelected = true; //药款
              this.undelinePaySelect = false;
              this.payName="去支付/To pay";
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
               payorder.callback = this.param.callback;
               this.yankuanPayorder(this.param,payorder);
               console.log(payorder)
               //this.param.show=false;
            }else {
                this.tipParam.show = true;
                this.tipParam.name='请选择支付方式/Select order status';
                this.tipParam.alert=true;
            }
        },
        underPay:function(){
            this.yankuanPayorder(this.param,this.undelinePay);
        },
    },
    created() {
        this.getExpressList(this.loadParam);
        this.getOrderDetail(this.loadParam);
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
.edit-input{
  width: 30%;
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
