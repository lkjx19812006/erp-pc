<template>
    <cancle-model :param="cancleReason" v-if="cancleReason.show"></cancle-model>
    <undeline-model :param="undelinePay" v-if="undelinePay.show"></undeline-model>
    <logistics-model :param="logisticsDetail" v-if="logisticsDetail.show"></logistics-model>
    <editorder-model :param="editorder" v-if="editorder.show"></editorder-model>
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
                    <div class="left message_front" style="margin-top:5px;">订单号：{{initOrderDetail.no}}</div>
                    <div class="left message_front"><img src="../../../static/images/contacter.png" height="30" width="23"  class="left"/><span class="tips">收件人：{{initOrderDetail.consignee}} | {{initOrderDetail.consigneePhone}}</span></div>
                    <div class="left message_front"><img src="../../../static/images/address.png" class="left" height="34" width="24"  /><span class="tips">收件人地址：{{initOrderDetail.consigneeAddr}}</span></div>
                </div>
            </div>
            <div class="order_info clearfix">
              <div class="col-xs-6 pull-left">
                  <p>{{initOrderDetail.goods.arr[0].brredName}}</p>
                  <p>{{initOrderDetail.goods.arr[0].price}}元/{{initOrderDetail.goods.arr[0].unit}}</p>
                  <p>数量：{{initOrderDetail.goods.arr[0].number}}</p>
                  <p>下单时间：{{initOrderDetail.ctime}}</p>
              </div>
              <div class="col-xs-6 pull-left">
                 <p><label>杂费：</label><span style="color:#fa6705">¥{{initOrderDetail.incidentals}}</span>（运费）</p>
                 <p><span  style="color:#fa6705">合计：¥{{initOrderDetail.total.toFixed(2)}}</span></p>
              </div> 
            </div>
            <!-- 处理订单0 -->
            <div class="clearfix" v-if="param.handle">
                <input type="button" class="btn  btn-confirm right"  @click="accept({
                    id:initOrderDetail.id,
                    show:true,
                    orderStatus:'',
                    link:'/order/handle',
                    images:''
                   },param.show=false)"  value="接受订单" />
                <button type="button" class="btn btn-default btn-close right"  @click="cancleBtn({
                    id:initOrderDetail.id,
                    cancleCauses:'',
                    show:true,
                    headline:'取消订单原因',
                    orderStatus:'',
                    link:'/order/cancle',
                    callback:orderCancle
                  })">取消</button>
            </div>
            <!-- 订单确认10 -->
            <div class="clearfix" v-if="param.sales">
                <input type="button" class="btn  btn-confirm right"  @click="confirmEdit({
                        id:initOrderDetail.id,
                        show:true,
                        orderStatus:'',
                        link:'/order/confirm',
                        images:'',
                       },param.show=false)"  value="确定" />
                 <!--  <input type="button" class="btn  btn-confirm  right"  @click="orderEdit({
                       id:param.id,
                       show:true,
                       no:param.no,
                       consignee:param.consignee,
                       consigneePhone:param.consigneePhone,
                       consigneeAddr:param.consigneeAddr,
                       brredName:param.goods[0].brredName,
                       price:param.goods[0].price,
                       unit:param.goods[0].unit,
                       number:param.goods[0].number,
                       ctime:param.ctime,
                       incidentals:param.incidentals,
                       spec:param.goods[0].spec,
                       location:param.goods[0].location,
                       total:param.total,
                       images:'',
                       callback:alterOrder
                      })"  value="编辑订单" /> -->
                <button type="button" class="btn btn-default btn-close right"  @click="param.show = false">取消</button>
            </div>
            <!-- 订单财务审核 -->
            <div class="clearfix" v-if="param.Auditing">
                <img v-for="item in initOrderDetail.payPics.arr" class="col-xs-3" :src="item.path" alt="支付凭证"/>
                <input type="button" class="btn  btn-confirm right"  @click="accept({
                    id:initOrderDetail.id,
                    show:true,
                    link:'/order/payConfirm',
                    orderStatus:'',
                    images:'',
                    sub:$index
                   },param.show=false)"  value="通过核查" />
                <button type="button" class="btn btn-default btn-close right"  @click="param.show = false">取消</button>
            </div>
        </div>
        <!-- 订单支付 -->
        <div class="navbar-client" v-if="param.payment">
            <div class="message clearfix">
                <p class="order-message">支付方式</p>
                <div class="space_15 clearfix">
                    <div class="col-xs-6 clearfix"   @click="paychoice(3)">
                         <img src="/static/images/checked.png" v-if="yaokuanPaySelected" height="25" width="25"  class="left margin-10" />
                        <img src="/static/images/unchecked.png" height="25" width="25"  class="left margin-10" v-else/>
                         <img src="/static/images/drugs.png" height="39" width="50" class="left margin-10" />
                         <p>
                            <span>药款支付</span><br>
                            <span>推荐已开通药款账户用户使用</span>
                         </p>
                    </div>
                    <div class="col-xs-6 clearfix"  @click="paychoice(0)">
                        <img src="/static/images/checked.png" v-if="undelinePaySelect" height="25" width="25"  class="left margin-10" />
                         <img src="/static/images/unchecked.png" height="25" width="25"  class="left margin-10" v-else/>
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
                    id:initOrderDetail.id,
                    show:true,
                    link:'/order/pay',
                    payWay:'',
                    orderStatus:'',
                    images:'',
                    callback:yankuanPayorder
                    })"  value="支付" />
                <button type="button" class="btn btn-default btn-close right"  @click="param.show = false">取消</button>
            </div>
        </div>
        <!-- 订单发货上传物流信息 -->
        <div class="navbar-client" v-if="param.sendoff">
          <div class="message clearfix">
              <p class="order-message">物流信息</p>
              <div class="space_15 clearfix">
                <div class="logical_color">
                  <span class="mui-pull-left">物流公司：</span> 
                  <select v-model="uploadLogistic.lcompanyId">
                    <option v-for="item in initExpresslist"  value="{{item.id}}">{{item.name}}</option>
                  </select>
                </div>
                <div class="logical_color">
                  <span class="mui-pull-left">物流单号：</span> 
                  <input type="number" placeholder="请输入运单号" v-model="uploadLogistic.lcompanyNo"/>
                </div>
                <div class="logical_color">
                  <label class="editlabel">请上传物流单凭证照片</label>
                  <div class="clearfix">
                      <press-image :value.sync="uploadLogistic.image_f" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:14%"></press-image>
                     <press-image :value.sync="uploadLogistic.image_s" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:14%"></press-image>
                     <press-image :value.sync="uploadLogistic.image_t" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:14%"></press-image>
                  </div>
                </div>
              </div>
          </div>
          <div class="clearfix">
              <input type="button" class="btn  btn-confirm right"  @click="accept(uploadLogistic,param.show=false)"  value="确认发货" />
          </div>
        </div>
        <!-- 订单待收货查看物流 -->
        <div class="navbar-client" v-if="param.delivery">
          <div class="message clearfix">
              <p class="order-message">物流信息</p>
              <div class="space_15 clearfix">
                <div class="logical_color">
                  <span>物流公司：{{initOrderDetail.logisticses.arr[0].logistics}}</span>
                </div>
                <div class="logical_color">
                  <span>物流单号：{{initOrderDetail.logisticses.arr[0].number}}</span>
                </div>
                <div class="logical_color clearfix">
                  <p>物流凭证：</p>
                  <img  class="picture" v-for="item in initOrderDetail.sendPics.arr"  v-bind:src="item.path"/>
                </div>
              </div>
              <div class="order_info clearfix">
                <input type="button" class="btn  btn-confirm right"  @click="accept({
                  id:param.id,
                  show:true,
                  orderStatus:'',
                  link:'/order/receiveConfirm'
                },param.show=false)"  value="确认收货" />
                <input type="button" class="btn  btn-confirm right margin-10"  @click="Viewlogistics({
                  id:initOrderDetail.logisticses.arr[0].id,
                  lcompanyId:initOrderDetail.logisticses.arr[0].logistics,
                  lcompanyCode:initOrderDetail.logisticses.arr[0].code,
                  number:initOrderDetail.logisticses.arr[0].number,
                  show:true,
                  loading:true,
                  callback:logisticsInfo
                  })" value="查看物流" />
                 
              </div>
          </div>
        </div>
        <!-- 买家订单待收货查看物流 -->
        <div class="navbar-client" v-if="param.express">
          <div class="message clearfix">
              <p class="order-message">物流信息</p>
              <div class="space_15 clearfix">
                <div class="logical_color">
                  <span>物流公司：{{initOrderDetail.logisticses.arr[0].logistics}}</span>
                </div>
                <div class="logical_color">
                  <span>物流单号：{{initOrderDetail.logisticses.arr[0].number}}</span>
                </div>
                <div class="logical_color clearfix">
                  <p>物流凭证：</p>
                  <img  class="picture" v-for="item in initOrderDetail.sendPics.arr"  v-bind:src="item.path"/>
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
                  })"  value="查看物流" />
                 
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
        editorderModel
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
               callback:'undelinePayorder',
               images:''
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
            type:"image/*",
            uploadLogistic:{
              images:'',
              orderStatus:'',
              lcompanyId:'',
              lcompanyNo:'',
              id:this.param.id,
              show:true,
              link:'/order/send',
              image_f:'',
              image_s:'',
              image_t:''
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
            this.param.show=true;
            /*this.orderCancle(this.cancleReason)*/
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
            }else if(payWay ==3){
              this.yaokuanPaySelected = true; //药款
              this.undelinePaySelect = false;
            }
        },
        payOrder:function(payorder){
          payorder.payWay = this.payWay;
          console.log(payorder.payWay)

         if(payorder.payWay==0){
             this.undelinePay=payorder;
             console.log(payorder)
             this.$broadcast('getImageData');
          }else if(payorder.payWay==3){
             console.log('33333')
             this.yankuanPayorder(payorder);
             console.log(this.param)
             this.param.show=false;
          }else {
             console.log('请选择支付方式');
          }

          console.log(payorder)

        }
    },
    created() {
        this.getExpressList(this.loadParam); 
        this.getOrderDetail(this.param)
    }
}
</script>
<style scoped>
.client_body {
  position: relative;
  background-color: #f5f5f5;
}
.logical_color{
  margin-bottom: 10px;
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
.top-title{
  z-index: 100;
  width: 100%;
  right: 0;
  top: 70px;
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
  padding-left: 13%;
}
</style>
