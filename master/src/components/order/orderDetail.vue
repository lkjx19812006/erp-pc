<template>
    <tracking-model :param="trackingParam" v-if="trackingParam.show"></tracking-model>
    <credence-model :param="credenceParam" v-if="credenceParam.show"></credence-model>
    <dispose-model :param="disposeParam" v-if="disposeParam.show"></dispose-model>
    <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
<!--     <div class="client_body" v-show="!disposeParam.show"> -->
      <div class="top-title">
            <span class="glyphicon glyphicon-remove-circle" @click="param.show=false"></span>
        </div>
        <div class="cover_loading">
            <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <div class="client_nav">
            <nav class="navbar navbar-client" role="navigation">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                        <span class="navbar-brand navbar-name" href="#">{{initOrderDetail.customerName}}</span>
                    </div>
                   <!--  <ul class="nav navbar-nav navbar-right" style="margin-top:8px;margin-right:20px;">
                       <li>
                           <button type="button" class="btn btn-base" @click="pendingOrder(param,param.tips='订单已提交，请审核！')" v-if="initOrderDetail.orderStatus==0&&param.contact=='/order/myList'">处理中</button>
                           <button type="button" class="btn btn-base" @click="pendingOrder(param,param.tips='{{$t('static.related_information')}}订单正在处理，商家将进行电话确认，请保持电话通畅！',param.sales=true)" v-if="initOrderDetail.orderStatus==10&&param.contact=='/order/myList'">等待处理</button>
                           <button type="button" class="btn btn-base" @click="pendingOrder(param,param.tips='订单处理完成，等待买家付款！',param.payment=true)" v-if="initOrderDetail.orderStatus==20&&param.contact=='/order/myList'">待客户付款</button>
                           <button type="button" class="btn btn-base" @click="pendingOrder(param,param.tips='您的订单已支付，请等待商家发货！',param.sendoff=true)" v-if="initOrderDetail.orderStatus==40&&param.contact=='/order/myList'">待发货</button>
                           <button type="button" class="btn btn-base" @click="pendingOrder(param,param.tips='您的订单已发货，请注意保持电话通畅，等待收货确认！',param.express=true)" v-if="initOrderDetail.orderStatus==50&&param.contact=='/order/myList'">待客户收货</button>
                   
                           <button type="button" class="btn btn-base"  v-if="initOrderDetail.orderStatus>=60"  @click="pendingOrder(param,param.tips='买家已收货，订单已完成！')">已完成</button>
                           <button type="button" class="btn btn-base"  v-if="initOrderDetail.orderStatus==-1" @click="pendingOrder(param,param.tips='订单已取消！')">已取消</button>
                           <button type="button" class="btn btn-base"  v-if="initOrderDetail.orderStatus==-2" @click="pendingOrder(param,param.tips='订单已过期！')">已过期</button>
                       </li>
                   </ul> -->
                </div>
            </nav>
        </div>
        <section>
            <div class="client-section clearfix" >
                <div class="col-md-8 client-detail">
                    <h4 class="section_title">{{$t('static.related_information')}}</h4>
                    <article>
                        <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:'',
                                              crete:'goods'
                                              })">
                                        <img class="pull-left" src="/static/images/order.png" height="30" width="30" style="margin-top:4px;" />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set" >
                                          {{$t('static.commodity_order')}}（{{initOrderDetail.goods.arr.length}}）
                                        </a>
                                        <!-- <button type="button" class="btn btn-base pull-right"  @click.stop="createChance()">新建</button> -->
                                    </h4>
                                </div>
                                <div class="panel-collapse" v-if="initOrderDetail.goods.arr.length!==null" v-show="initOrderDetail.goods.show">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                          <thead>
                                            <th>{{$t('static.breed')}}</th>
                                            <th>{{$t('static.origin')}}</th>
                                            <th>{{$t('static.specification')}}</th>
                                            <th>{{$t('static.quantity')}}</th>
                                            <th>{{$t('static.quality')}}</th>
                                            <th>{{$t('static.price')}}</th>
                                            <th>{{$t('static.unit')}}</th>
                                            <th>{{$t('static.total')}}</th>
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initOrderDetail.goods.arr">
                                                <td>{{item.breedName}}</td>
                                                <td>{{item.location}}</td>
                                                <td>{{item.spec}}</td>
                                                <td>{{item.number}}</td>
                                                <td>{{item.quality}}</td>
                                                <td>{{item.price}}元</td>
                                                <td>{{item.unit}}</td>
                                                <td>{{item.amount}}元</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                                <div class="panel-collapse" v-else v-show="initOrderDetail.goods.show">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                          <thead>
                                            <th>{{$t('static.breed')}}</th>
                                            <th>{{$t('static.origin')}}</th>
                                            <th>{{$t('static.specification')}}</th>
                                            <th>{{$t('static.quantity')}}</th>
                                            <th>{{$t('static.quality')}}</th>
                                            <th>{{$t('static.price')}}</th>
                                            <th>{{$t('static.unit')}}</th>
                                            <th>{{$t('static.total')}}</th>
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initOrderDetail.goods.arr">
                                                <td>{{item.breedName}}</td>
                                                <td>{{item.location}}</td>
                                                <td>{{item.spec}}</td>
                                                <td>{{item.number}}</td>
                                                <td>{{item.quality}}</td>
                                                <td>{{item.price}}元</td>
                                                <td>{{item.unit}}</td>
                                                <td>{{item.amount}}元</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                           
                            <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:'',
                                              crete:'payPics'
                                              })">
                                        <img class="pull-left" src="/static/images/pay.png" height="26" width="26" style="margin-top:4px;" />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set pull-left" v-if="initOrderDetail.payPics.arr.length!==null">
                                          {{$t('static.pay_evidence')}}（{{initOrderDetail.payPics.arr.length}}）<span v-if="param.orderStatus<30&&param.contact=='/order/myList'" class="system_danger">{{$t('static.pay_tips')}}</span>
                                        </a>
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set" v-else>
                                        {{$t('static.pay_evidence')}}（0）<span class="system_danger" v-if="param.orderStatus<30&&param.contact=='/order/myList'">{{$t('static.pay_tips')}}</span>
                                        </a>
                                        <button type="button" class="btn btn-base pull-right"  @click.stop="createcredence({
                                            show:true,
                                            orderId:initOrderDetail.id,
                                            callback:uploadDocument,
                                            link:'/order/attachSubmit/',
                                            description:'',
                                            fileType:'image',
                                            bizType:'order_pay',
                                            payPics:'',
                                            titles:'上传支付凭证'
                                            })"  v-if="(initOrderDetail.payPics.arr.length!==null&&param.contact=='/order/myList')&&param.orderStatus>=30">{{$t('static.new')}}</button>
                                        <!--<button type="button" class="btn btn-base pull-right" v-if="param.contact=='/order/myList'"  @click.stop="">新建</button>-->
                                        <a v-else></a>
                                    </h4>
                                </div>
                                <div class="panel-collapse" v-if="initOrderDetail.payPics.arr.length&&!initOrderDetail.payPics.show" v-cloak>
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                          <thead>
                                            <th>{{$t('static.file_type')}}</th>
                                            <th>{{$t('static.file_origin')}}</th>
                                            <th>{{$t('static.file_path')}}</th>
                                            <th>{{$t('static.description')}}</th>
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initOrderDetail.payPics.arr">
                                                <td>{{item.fileType}}</td>
                                                <td>{{item.bizType}}</td>
                                                <td><img :src="item.url" v-if="item.fileType=='image'" @click="clickBig(item.url)"/>
                                                    <img src="/static/images/pdf.png" height="20" width="20" v-else/>
                                                </td>
                                                <td>{{item.description}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                                 <!--<div class="panel-collapse" v-else v-show="!initOrderDetail.payPics.show" v-cloak>-->
                                    <!--<div class="panel-body panel-set">-->
                                        <!--<table class="table  contactSet">-->
                                          <!--<thead>-->
                                            <!--<th>文件类型</th>-->
                                            <!--<th>文件来源</th>-->
                                            <!--<th>文件图片或路径</th>-->
                                            <!--<th>描述</th>-->
                                          <!--</thead>-->
                                        <!--<tbody>-->
                                            <!--<tr v-for="item in initOrderDetail.payPics.arr">-->
                                                <!--<td>{{item.fileType}}</td>-->
                                                <!--<td>{{item.bizType}}</td>-->
                                                <!--<td><img :src="item.path" v-if="item.fileType=='image'"/>-->
                                                    <!--<img src="/static/images/pdf.png" height="20" width="20" v-else/>-->
                                                <!--</td>-->
                                                <!--<td>{{item.description}}</td>-->
                                            <!--</tr>-->
                                        <!--</tbody>-->
                                    <!--</table>-->
                                    <!--</div>-->
                                <!--</div>-->
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:'',
                                              crete:'attachFiles'
                                              })">
                                        <img class="pull-left" src="/static/images/appendix.png"  style="margin-top:4px;" />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set pull-left" >
                                          {{$t('static.upload_attachments')}}（{{initOrderDetail.attachFiles.arr.length}}）
                                        </a>
                                        <!--<a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set " v-else>-->
                                          <!--上传附件（0）-->
                                        <!--</a>-->
                                        <button type="button" class="btn btn-base pull-right"  @click.stop="createcredence({
                                            show:true,
                                            orderId:param.id,
                                            link:'/order/attachSubmit/',
                                            callback:uploadDocument,
                                            description:'',
                                            fileType:'image',
                                            bizType:'attach_files',
                                            attachFiles:'',
                                            titles:'上传附件凭证'
                                            })" v-if="initOrderDetail.attachFiles.arr.length!==null&&param.contact=='/order/myList'">{{$t('static.new')}}</button>
                                        <a v-else ></a>
                                    </h4>
                                </div>
                                <div class="panel-collapse" v-show="!initOrderDetail.attachFiles.show">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                          <thead>
                                           <th>{{$t('static.file_type')}}</th>
                                            <th>{{$t('static.file_origin')}}</th>
                                            <th>{{$t('static.file_path')}}</th>
                                            <th>{{$t('static.description')}}</th>
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initOrderDetail.attachFiles.arr">
                                                <td>{{item.fileType}}</td>
                                                <td>{{item.bizType}}</td>
                                                <td><img :src="item.url" v-if="item.fileType=='image'" @click="clickBig(item.url)"/>
                                                    <img src="/static/images/pdf.png" height="20" width="20" v-else/>
                                                </td>
                                                <td>{{item.description}}</td>
                                                <td>
                                                    <img v-bind:src="item.image" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:'',
                                              crete:'sendPics'
                                              })">
                                        <img class="pull-left" src="/static/images/logist.png"  style="margin-top:4px;" />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set pull-left" v-if="initOrderDetail.sendPics.arr.length">
                                          {{$t('static.logistics')}}（{{initOrderDetail.sendPics.arr.length}}）<span class="system_danger" v-if="param.orderStatus<50&&param.contact=='/order/myList'">{{$t('static.logistics_tips')}}</span>
                                        </a>
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set" v-else>
                                          {{$t('static.logistics')}}（0） <span class="system_danger" v-if="param.orderStatus<50&&param.contact=='/order/myList'">{{$t('static.logistics_tips')}}</span>
                                        </a>
                                        <button type="button" class="btn btn-base pull-right"  @click.stop="createcredence({
                                            show:true,
                                            orderId:param.id,
                                            link:'/order/attachSubmit/',
                                            description:'',
                                            fileType:'image',
                                            bizType:'order_send',
                                            sendPics:'',
                                            callback:uploadDocument,
                                            titles:'上传物流凭证'
                                            })" v-if="initOrderDetail.sendPics.arr.length!==null&&param.contact=='/order/myList'&&param.orderStatus>=50">{{$t('static.new')}}</button>
                                        <!--<button type="button" class="btn btn-base pull-right" v-if="param.contact=='/order/myList'"  @click.stop="">新建</button>-->
                                        <a v-else></a>
                                    </h4>
                                </div>
                                <div class="panel-collapse" v-if="initOrderDetail.sendPics.arr.length!==null&&!initOrderDetail.sendPics.show" >
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                          <thead>
                                            <th>{{$t('static.file_type')}}</th>
                                            <th>{{$t('static.file_origin')}}</th>
                                            <th>{{$t('static.file_path')}}</th>
                                            <th>{{$t('static.description')}}</th>
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initOrderDetail.sendPics.arr">
                                                <td>{{item.fileType}}</td>
                                                <td>{{item.bizType}}</td>
                                                <td><img :src="item.url" v-if="item.fileType=='image'" @click="clickBig(item.url)"/>
                                                    <img src="/static/images/pdf.png" height="20" width="20" v-else/>
                                                </td>
                                                <td>{{item.description}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                                <!--<div class="panel-collapse" v-else v-show="!initOrderDetail.sendPics.show">-->
                                    <!--<div class="panel-body panel-set">-->
                                        <!--<table class="table  contactSet">-->
                                          <!--<thead>-->
                                            <!--<th>文件类型</th>-->
                                            <!--<th>文件来源</th>-->
                                            <!--<th>文件图片或路径</th>-->
                                            <!--<th>描述</th>-->
                                          <!--</thead>-->
                                        <!--<tbody>-->
                                            <!--<tr v-for="item in initOrderDetail.sendPics.arr">-->
                                                <!--<td>{{item.fileType}}</td>-->
                                                <!--<td>{{item.bizType}}</td>-->
                                                <!--<td><img :src="item.path" v-if="item.fileType=='image'"/>-->
                                                    <!--<img src="/static/images/pdf.png" height="20" width="20" v-else/>-->
                                                <!--</td>-->
                                                <!--<td>{{item.description}}</td>-->
                                            <!--</tr>-->
                                        <!--</tbody>-->
                                    <!--</table>-->
                                    <!--</div>-->
                                <!--</div>-->
                            </div>
                        </div>
                    </article>
                </div>
                <div class="col-md-4" style="border-left: 1px solid #ddd;">
                    <h4 class="section_title">{{$t('static.details')}}</h4>
                    <article>
                        <div class="edit-detail">
                            <div class="clearfix">
                                <!-- <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>订单ID</label>
                                    <input type="text" class="form-control" v-model="initOrderDetail.id" value="{{initOrderDetail.id}}" disabled="disabled" />
                                </div> -->
                                <div class="client-detailInfo   col-xs-12">
                                    <label>{{$t('static.order_no')}}</label>
                                    <input type="text" class="form-control" v-model="initOrderDetail.no" value="{{initOrderDetail.no}}" disabled="disabled"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>{{$t('static.order_type')}}</label>
                                    <input type="text" class="form-control"   value="{{type[initOrderDetail.type]}}" disabled="disabled"/>
                                </div>
<!--                                 <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
    <label>{{$t('static.order_source')}}</label>
    <input type="text" class="form-control"  value="{{sourceType[initOrderDetail.sourceType]}}" disabled="disabled" v-if="sourceType[initOrderDetail.sourceType]"/>
    <input type="text" class="form-control"  value="未说明" disabled="disabled" v-else/>
</div>
                            </div>
                            <div class="clearfix"> -->
                                <div class="client-detailInfo  col-md-6 col-xs-12">
                                    <label>{{$t('static.consignee_name')}}</label>
                                    <input type="text" class="form-control"  v-model="initOrderDetail.consignee" value="{{initOrderDetail.consignee}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo   col-md-6 col-xs-12">
                                    <label>{{$t('static.consignee_phone')}}</label>
                                    <input type="text" class="form-control" v-model="initOrderDetail.consigneePhone" value="{{initOrderDetail.consigneePhone}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo  col-md-6 col-xs-12">
                                    <label>{{$t('static.country')}}</label>
                                    <input type="text" class="form-control"  value="{{initOrderDetail.country}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo   col-md-6 col-xs-12">
                                    <label>{{$t('static.province')}}</label>
                                    <input type="text" class="form-control"  value="{{initOrderDetail.province}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-6 col-xs-12">
                                    <label>{{$t('static.city')}}</label>
                                    <input type="text" class="form-control"  value="{{initOrderDetail.city}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo   col-md-6 col-xs-12">
                                    <label>{{$t('static.postcodes')}}</label>
                                    <input type="text" class="form-control"  value="{{initOrderDetail.zipCode}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo col-md-6 col-xs-12">
                                    <label>{{$t('static.detailed_address')}}</label>
                                    <input type="text" class="form-control" value="{{initOrderDetail.consigneeAddr}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo  col-md-6 col-xs-12">
                                    <label>{{$t('static.comment')}}</label>
                                    <input type="text" class="form-control"  value="{{initOrderDetail.comments}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo  col-md-6 col-xs-12">
                                    <label>{{$t('static.sundry_fees')}}</label>
                                    <input type="text" class="form-control"  value="{{initOrderDetail.incidentals}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo   col-md-6 col-xs-12">
                                    <label>{{$t('static.fee_explain')}}</label>
                                    <input type="text" class="form-control" value="{{initOrderDetail.incidentalsDesc}}" disabled="disabled"/>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
       </div>
</template>
<script>
import trackingModel from '../order/ordergoods'
import credenceModel from '../order/createcredence'
import disposeModel  from  '../order/orderStatus'
import pictureModel  from  '../tips/pictureDialog'
import {
  initOrderDetail
} from '../../vuex/getters'
import {
  getOrderDetail,
  uploadDocument
} from '../../vuex/actions'
export default {
    components: {
      trackingModel,
      credenceModel,
      disposeModel,
      pictureModel 
    },
    props:['param'],
    data(){
      return {
        trackingParam:{
          show:false
        },
        sourceType:{
          0:'PC',
          1:'android',
          2:'wechart',
          3:'ios'
        },
        type:{
          0:'采购',
          1:'销售'
        },
        show:true,
        credenceParam:{
           show:false
        },
        disposeParam:{ //订单处理各个状态
            show:false,
            sales:false,
            handle:false,
            payment:false,
            Auditing:false,
            sendoff:false,
            express:false,
            delivery:false,
            tips:''
        },
        pictureParam:{
            show:false,
            img:''
        }
      }
    },
    vuex:{
      getters:{
        initOrderDetail
      },
      actions:{
        getOrderDetail,
        uploadDocument
      }
    },
    methods:{
          enfoldment:function(param){
          	console.log(this.$store.state.table.orderDetail[param.crete])
            if(this.$store.state.table.orderDetail[param.crete].arr.length==0){
                this.$store.state.table.orderDetail[param.crete].show=false;
            }
            this.$store.state.table.orderDetail[param.crete].show = !this.$store.state.table.orderDetail[param.crete].show;
          },
          createChance:function(item,index){
            console.log(item)
                item.show=!item.show;
                item.index = index;
                this.trackingParam = item;
                this.trackingParam.show = true;
          },
         createcredence:function(initOrderDetail){
            console.log(initOrderDetail)
             this.credenceParam=initOrderDetail;
         },
         clickBig:function(img){
              this.pictureParam.show=true;
              this.pictureParam.img = img;
          },
        pendingOrder:function(initOrderDetail){
            console.log(initOrderDetail)
            console.log(this.disposeParam)
            this.disposeParam = initOrderDetail;
            /*this.disposeParam = this.param;*/
            this.disposeParam.show = true;

        }
    },
   created(){
   	  this.getOrderDetail(this.param);
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
    width: 70%;
    right: 0;
    left: 0;
    margin: auto;
    z-index: 1083
}
.modal_con{
    width: 70%;
}
.navbar-client {
    margin-bottom: 0;
    padding-top: 10px;
    background-color: #f5f5f5;
}

.navbar-img {
    float: left;
    margin-right: 10px;
}

.btn-base {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #003077;
    margin-right: 5px;
}

section {
    background-color: #fff;
}
.breed_action{
  top: 10px;
  right: 35px;
  padding: 0 2px;
}
.breed_action dl dt{
    display: block;
    padding: 3px;
    font-size: 14px;
    cursor: pointer;
}
section article {
    margin-top: 30px;
}

.client-section {
    padding: 10px 5px 40px 5px;
}

.contactSet thead{
  color:#fa6705;
}

.contact-view {
    color: #fa6705;
    margin-bottom: 0;
    cursor: pointer;
}

.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{
  text-align: left;
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
.table>tbody>tr>td img{
    width: 100px;
    margin: 0
}
.table{display: table;}
.btn-orange {
    background-color: #fa6705;
    color: #fff;
    font-size: 18px;
}
.client-editbtn {
    text-align: right;
    margin-top: 15px;
}
.client-image {
    display: inline-block;
}
</style>
