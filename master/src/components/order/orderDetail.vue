<template>
   <tracking-model :param="trackingParam" v-if="trackingParam.show"></tracking-model>
<div class="client_body">
      <div @click="param.show=false" class="top-title">
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
                        <a class="navbar-brand navbar-name" href="#">{{initOrderDetail.no}}</a>
                    </div>
                    <ul class="nav navbar-nav navbar-right" style="margin-top:8px;">
                        <li>
                            <button type="button" class="btn btn-base" @click="createTracking()">新建跟进</button>
                        </li>
                        <li>
                            <button type="button" class="btn btn-base" @click="modifyOrder({
                                               consignee:initOrderDetail.consignee,
                                               consigneePhone:initOrderDetail.consigneePhone,
                                               consigneeAddr:initOrderDetail.consigneeAddr,
                                               show:true,                                          
                                               })">编辑</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <section>
            <div class="client-section clearfix" >
                <div class="col-md-8 client-detail">
                    <h4 class="section_title">相关</h4>
                    <article>
                        <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:'',
                                              crete:'goods'
                                              })">
                                        <img class="pull-left" src="/static/images/chance.png" height="26" width="28" style="margin-top:4px;" />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          商品订单列表（{{initOrderDetail.goods.arr.length}}）
                                        </a>
                                        <!-- <button type="button" class="btn btn-base pull-right"  @click.stop="createChance()">新建</button> -->
                                    </h4>
                                </div>
                                <div class="panel-collapse" v-show="initOrderDetail.goods.show">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                          <thead>
                                            <th>商品名称</th>
                                            <th>产地</th>
                                            <th>规格</th>
                                            <th>数量</th>
                                            <th>质量</th>
                                            <th>价格</th>
                                            <th>单位</th>
                                            <th>总价</th>
                                            <th>商品图片</th>
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initOrderDetail.goods.arr">
                                                <td>{{item.brredName}}</td>
                                                <td>{{item.location}}</td>
                                                <td>{{item.spec}}</td>
                                                <td>{{item.number}}</td>
                                                <td>{{item.quality}}</td>
                                                <td>{{item.price}}元</td>
                                                <td>{{item.unit}}</td>
                                                <td>{{item.amount}}元</td>
                                                <td>
                                                    <img v-bind:src="item.image" />
                                                </td>
                                                <td  @click="clickShow($index,{
                                                      concrete:'goods'
                                                      })">
                                                      <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                    <div class="breed_action" v-show="item.show">
                                                        <dl>
                                                           <dt @click="createChance(item,$index)">编辑</dt>
                                                       </dl>
                                                    </div>
                                                </td> 
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>    
                        </div>
                        <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:'',
                                              crete:'payPics'
                                              })">
                                        <img class="pull-left" src="/static/images/chance.png" height="26" width="28" style="margin-top:4px;" />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          支付凭证（{{initOrderDetail.payPics.arr.length}}）
                                        </a>
                                        <button type="button" class="btn btn-base pull-right"  @click.stop="createChance()">新建</button> 
                                    </h4>
                                </div>
                                <div class="panel-collapse" v-show="initOrderDetail.payPics.show">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                          <thead>
                                            <th>商品名称</th>
                                            <th>产地</th>
                                            <th>规格</th>
                                            <th>数量</th>
                                            <th>质量</th>
                                            <th>价格</th>
                                            <th>单位</th>
                                            <th>总价</th>
                                            <th>商品图片</th>
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initOrderDetail.payPics.arr">
                                                <td>{{item.brredName}}</td>
                                                <td>{{item.location}}</td>
                                                <td>{{item.spec}}</td>
                                                <td>{{item.number}}</td>
                                                <td>{{item.quality}}</td>
                                                <td>{{item.price}}元</td>
                                                <td>{{item.unit}}</td>
                                                <td>{{item.amount}}元</td>
                                                <td>
                                                    <img v-bind:src="item.image" />
                                                </td>
                                                <td  @click="clickShow($index,{
                                                      concrete:'goods'
                                                      })">
                                                      <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                    <div class="breed_action" v-show="item.show">
                                                        <dl>
                                                           <dt @click="createChance(item,$index)">编辑</dt>
                                                       </dl>
                                                    </div>
                                                </td> 
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>    
                        </div>
                         <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:'',
                                              crete:'attachFiles'
                                              })">
                                        <img class="pull-left" src="/static/images/chance.png" height="26" width="28" style="margin-top:4px;" />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          上传附件（{{initOrderDetail.attachFiles.arr.length}}）
                                        </a>
                                        <button type="button" class="btn btn-base pull-right"  @click.stop="createChance()">新建</button>
                                    </h4>
                                </div>
                                <div class="panel-collapse" v-show="initOrderDetail.attachFiles.show">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                          <thead>
                                            <th>商品名称</th>
                                            <th>产地</th>
                                            <th>规格</th>
                                            <th>数量</th>
                                            <th>质量</th>
                                            <th>价格</th>
                                            <th>单位</th>
                                            <th>总价</th>
                                            <th>商品图片</th>
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initOrderDetail.attachFiles.arr">
                                                <td>{{item.brredName}}</td>
                                                <td>{{item.location}}</td>
                                                <td>{{item.spec}}</td>
                                                <td>{{item.number}}</td>
                                                <td>{{item.quality}}</td>
                                                <td>{{item.price}}元</td>
                                                <td>{{item.unit}}</td>
                                                <td>{{item.amount}}元</td>
                                                <td>
                                                    <img v-bind:src="item.image" />
                                                </td>
                                                <td  @click="clickShow($index,{
                                                      concrete:'goods'
                                                      })">
                                                      <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                    <div class="breed_action" v-show="item.show">
                                                        <dl>
                                                           <dt @click="createChance(item,$index)">编辑</dt>
                                                       </dl>
                                                    </div>
                                                </td> 
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>    
                        </div>
                        <div class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading" >
                                    <h4 class="panel-title clearfix" @click="enfoldment({
                                              link:'',
                                              crete:'sendPics'
                                              })">
                                        <img class="pull-left" src="/static/images/chance.png" height="26" width="28" style="margin-top:4px;" />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          物流凭证（{{initOrderDetail.sendPics.arr.length}}）
                                        </a>
                                        <button type="button" class="btn btn-base pull-right"  @click.stop="createChance()">新建</button>
                                    </h4>
                                </div>
                                <div class="panel-collapse" v-show="initOrderDetail.sendPics.show">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                          <thead>
                                            <th>商品名称</th>
                                            <th>产地</th>
                                            <th>规格</th>
                                            <th>数量</th>
                                            <th>质量</th>
                                            <th>价格</th>
                                            <th>单位</th>
                                            <th>总价</th>
                                            <th>商品图片</th>
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initOrderDetail.sendPics.arr">
                                                <td>{{item.brredName}}</td>
                                                <td>{{item.location}}</td>
                                                <td>{{item.spec}}</td>
                                                <td>{{item.number}}</td>
                                                <td>{{item.quality}}</td>
                                                <td>{{item.price}}元</td>
                                                <td>{{item.unit}}</td>
                                                <td>{{item.amount}}元</td>
                                                <td>
                                                    <img v-bind:src="item.image" />
                                                </td>
                                                <td  @click="clickShow($index,{
                                                      concrete:'goods'
                                                      })">
                                                      <img src="/static/images/default_arrow.png" height="24" width="24" />
                                                    <div class="breed_action" v-show="item.show">
                                                        <dl>
                                                           <dt @click="createChance(item,$index)">编辑</dt>
                                                       </dl>
                                                    </div>
                                                </td> 
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>    
                        </div>
                    </article>
                </div>
                <div class="col-md-4" style="border-left: 1px solid #ddd;">
                    <h4 class="section_title">详情</h4>
                    <article>
                        <div class="edit-detail">
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>订单ID</label>
                                    <input type="text" class="form-control" v-model="initOrderDetail.id" value="{{initOrderDetail.id}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>订单号</label>
                                    <input type="text" class="form-control" v-model="initOrderDetail.no" value="{{initOrderDetail.no}}" disabled="disabled"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>订单类别</label>
                                    <input type="text" class="form-control"  value="{{initOrderDetail.type}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>订单来源</label>
                                    <input type="text" class="form-control"  value="{{initOrderDetail.sourceType}}" disabled="disabled"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>收货人姓名</label>
                                    <input type="text" class="form-control"  v-model="initOrderDetail.consignee" value="{{initOrderDetail.consignee}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>收货人电话</label>
                                    <input type="text" class="form-control" v-model="initOrderDetail.consigneePhone" value="{{initOrderDetail.consigneePhone}}" disabled="disabled"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>国家</label>
                                    <input type="text" class="form-control"  value="{{initOrderDetail.country}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>所在省</label>
                                    <input type="text" class="form-control"  value="{{initOrderDetail.province}}" disabled="disabled"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>所在市</label>
                                    <input type="text" class="form-control"  value="{{initOrderDetail.city}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>邮政编码</label>
                                    <input type="text" class="form-control"  value="{{initOrderDetail.zipCode}}" disabled="disabled"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>收货人地址</label>
                                    <input type="text" class="form-control" v-model="initOrderDetail.consigneeAddr" value="{{initOrderDetail.consigneeAddr}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>备注</label>
                                    <input type="text" class="form-control" v-model="initOrderDetail.comments" value="{{initOrderDetail.comments}}" disabled="disabled"/>
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
import {
  initOrderDetail
} from '../../vuex/getters'
import {
  getOrderDetail
} from '../../vuex/actions'
export default {
    components: {
      trackingModel
    },
    props:['param'],
    data(){
      return {
        trackingParam:{
          show:false
        },
        show:true
      }
    },
    vuex:{
      getters:{
        initOrderDetail
      },
      actions:{
        getOrderDetail
      }
    },
    methods:{
          enfoldment:function(param){
          	console.log(this.$store.state.table.orderDetail[param.crete].show)
            if(this.$store.state.table.orderDetail[param.crete].arr.length==0){
                    this.$store.state.table.orderDetail[param.crete].show=true;
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
         clickShow: function(index,param) {
            if (this.$store.state.table.orderDetail[param.concrete].arr[index].show) {
                this.$store.state.table.orderDetail[param.concrete].arr[index].show = false;
            } else {
                this.$store.state.table.orderDetail[param.concrete].arr[index].show = true
            }

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

.navbar-client {
    margin-bottom: 0;
    padding-top: 10px;
    background-color: #f5f5f5;
}

.navbar-img {
    float: left;
    margin-right: 10px;
}

.navbar-name {
    color: #fa6705;
    font-size: 20px;
}

.btn-base {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #003077;
    margin-right: 5px;
    font-size: 14px;
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
.top-title{
  z-index: 100;
  width: 100%;
  right: 0;
  top: 130px;
}
.client-section {
    padding: 10px 5px 40px 5px;
}

.section_title {
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid #ddd;
    padding: 15px 0;
    margin: 0;
}
.contactSet thead{
  color:#fa6705;
}
.panel-title-set {
    margin-top: 6px;
    margin-left: 26px;
    display: inline-block;
    font-size: 20px;
    color: #333;
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

/* .client-detailInfo {
    padding: 0 15px 14px 15px;
}

.client-detailInfo img {
    margin-right: 8px;
}
.client-detailInfo label {
    display: block;
    color: #333;
    font-size: 16px;
} */

.btn-orange {
    background-color: #fa6705;
    color: #fff;
    font-size: 18px;
}
.label_action{
  position: absolute;
  top:13px;
  right: 32px;
  border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 1000;
    min-width: 90px;
    cursor: pointer;
    padding: 5px 10px;
    max-width: 200px;
}
.client-editbtn {
    text-align: right;
    margin-top: 15px;
}
.client-image {
    display: inline-block;
}
</style>
