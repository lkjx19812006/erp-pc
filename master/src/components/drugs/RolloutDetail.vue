
<template>
    <drugs-model :param="disposeParam" v-if="disposeParam.show"></drugs-model>
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
                        <span class="navbar-brand navbar-name" href="#">{{initDrugsDetail.userName}}</span>
                    </div>
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
                                              crete:'moneyRecords'
                                              })">
                                        <img class="pull-left" src="/static/images/roll.png" height="26" width="26" style="margin-top:4px;" />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                          {{$t('static.drugsrecord')}}（{{initDrugsDetail.moneyRecords.arr.length}}）
                                        </a>
                                        <!-- <button type="button" class="btn btn-base pull-right"  @click.stop="createChance()">新建</button> -->
                                    </h4>
                                </div>
                                <div class="panel-collapse" v-if="initDrugsDetail.moneyRecords.arr.length!=null" v-show="initDrugsDetail.moneyRecords.show">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                          <thead>
                                            <th>{{$t('static.link_types')}}</th>
                                            <th>{{$t('static.order_source')}}</th>
                                            <th>{{$t('static.out_instatus')}}</th>
                                            <th>{{$t('static.status')}}</th>
                                            <th>{{$t('static.create_time')}}</th>
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initDrugsDetail.moneyRecords.arr">
                                                <td>{{item.linkType | linktype}}</td>
                                                <td>{{item.desc}}</td>
                                                <td>{{item.amount.toFixed(2)}}</td>
                                                <td>{{item.status | drugsStatus}}</td>
                                                <td>{{item.createTime}}</td>
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
                                              crete:'moneyRollIns'
                                              })">
                                        <img class="pull-left" src="/static/images/rollin.png" height="26" width="26" style="margin-top:4px;" />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set pull-left">
                                          {{$t('static.rollin')}}（{{initDrugsDetail.moneyRollIns.arr.length}}）
                                        </a>
                                       <!--  <button type="button" class="btn btn-base pull-right"  @click.stop="createcredence({
                                           show:true,
                                           orderId:initDrugsDetail.id,
                                           callback:uploadDocument,
                                           link:'/order/attachSubmit/',
                                           description:'',
                                           fileType:'image',
                                           bizType:'order_pay',
                                           payPics:'',
                                           titles:'上传支付凭证'
                                           })"  v-if="(initDrugsDetail.moneyRollIns.arr.length!==null&&param.contact=='/order/myList')&&param.orderStatus>=30">新建</button> -->
                                    </h4>
                                </div>
                                <div class="panel-collapse" v-if="initDrugsDetail.moneyRollIns.arr.length&&!initDrugsDetail.moneyRollIns.show" v-cloak>
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                          <thead>
                                            <th>{{$t('static.payment_method')}}</th>
                                            <th>{{$t('static.normal_amount')}}</th>
                                            <th>{{$t('static.freezing_amount')}}</th>
                                            <th>{{$t('static.roll_in')}}</th>
                                            <th>{{$t('static.paystatus')}}</th>
                                            <th>{{$t('static.status')}}</th>
                                            <th>{{$t('static.create_time')}}</th>
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initDrugsDetail.moneyRollIns.arr">
                                                <td>{{item.payType | payType}}</td>
                                                <td>{{item.normalMoney.toFixed(2)}}</td>
                                                <td>{{item.freezeMoney.toFixed(2)}}</td>
                                                <td>{{item.amount.toFixed(2)}}</td>
                                                <td>{{item.payStatus}}</td>
                                                <td>{{item.status | drugsStatus}}</td>
                                                <td>{{item.createTime}}</td>
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
                                              crete:'moneyRollOuts'
                                              })">
                                        <img class="pull-left" src="/static/images/rollout.png" height="26" width="26" style="margin-top:4px;" />
                                        <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set pull-left" >
                                          {{$t('static.rollout')}}（{{initDrugsDetail.moneyRollOuts.arr.length}}）
                                        </a>
                                    </h4>
                                </div>
                                <div class="panel-collapse" v-show="!initDrugsDetail.moneyRollOuts.show">
                                    <div class="panel-body panel-set">
                                        <table class="table  contactSet">
                                          <thead>
                                            <th>{{$t('static.client_name')}}</th>
                                            <th>{{$t('static.account_number')}}</th>
                                            <th>{{$t('static.normal_amount')}}</th>
                                            <th>{{$t('static.freezing_amount')}}</th>
                                            <th>{{$t('static.transfer_amount')}}</th>
                                            <th>{{$t('static.status')}}</th>
                                            <th>{{$t('static.create_time')}}</th>
                                            <th>{{$t('static.handle')}}</th>
                                          </thead>
                                        <tbody>
                                            <tr v-for="item in initDrugsDetail.moneyRollOuts.arr">
                                                <td>{{item.name}}</td>
                                                <td>{{item.bank}}</td>
                                                <td>{{item.normalMoney.toFixed(2)}}</td>
                                                <td>{{item.freezeMoney.toFixed(2)}}</td>
                                                <td>{{item.amount.toFixed(2)}}</td>
                                                <td>{{item.status | drugsStatus}}</td>
                                                <td>{{item.ctime}}</td>
                                                <td>
									                <a class="operate" v-if="item.status==2" @click="drugs({
									                	status:item.status,
									                	id:item.id,
									                	moneyId:item.moneyId,
									                	userId:item.userId,
									                	show:false,
                                                		sub:$index,
                                                		key:'moneyRollOuts'
									                	})"><img src="/static/images/Financialtransfer.png" height="18" width="48" title="转账处理中" alt="转账处理中"></a>
									                <a class="operate" v-if="item.status==3" @click="drugs({
									                	status:item.status,
									                	id:item.id,
									                	moneyId:item.moneyId,
									                	userId:item.userId,
									                	show:false,
                                                		sub:$index,
                                                		key:'moneyRollOuts'
									                	})"><img src="/static/images/Financialover.png" height="18" width="48" title="转出成功" alt="转出成功"></a>
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
                    <h4 class="section_title">{{$t('static.description')}}</h4>
                    <article>
                        <div class="edit-detail">
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>{{$t('static.client_name')}}</label>
                                    <input type="text" class="form-control" v-model="initDrugsDetail.userName" value="{{initDrugsDetail.userName}}" disabled="disabled" />
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>{{$t('static.normal_amount')}}</label>
                                    <input type="text" class="form-control" v-model="initDrugsDetail.credit" value="{{initDrugsDetail.credit}}" disabled="disabled"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>{{$t('static.freezing_amount')}}</label>
                                    <input type="text" class="form-control"   value="{{initDrugsDetail.freezeMoney}}" disabled="disabled"/>
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                    <label>{{$t('static.status')}}</label>
                                    <input type="text" class="form-control"  value="{{initDrugsDetail.status | drugsStatus}}" disabled="disabled"/>
                                </div>
                            </div>
                            <div class="clearfix">
                                <div class="client-detailInfo pull-left col-md-6 col-xs-12">
                                    <label>{{$t('static.transfer_amount')}}</label>
                                    <input type="text" v-if="param.rollOutMoney" class="form-control"  v-model="initDrugsDetail.rollOutMoney" value="{{initDrugsDetail.rollOutMoney}}" disabled="disabled"/>
                                <input type="text" class="form-control"  v-if="!param.rollOutMoney" value="0" disabled="disabled">
                                </div>
                                <div class="client-detailInfo  pull-right col-md-6 col-xs-12">
                                   <label>{{$t('static.create_time')}}</label>
                                    <input type="text" class="form-control"  v-model="initDrugsDetail.createTime" value="{{initDrugsDetail.createTime}}" disabled="disabled"/>
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
import  drugsModel  from  '../drugs/drugsStatus'
import {
  initDrugsDetail
} from '../../vuex/getters'
import {
  getDrugsDetail
} from '../../vuex/actions'
export default {
    components: {
       drugsModel
    },
    props:['param'],
    data(){
      return {
        show:true,
        disposeParam:{
          show:false,
          title:'',
          link:'/money/rollOutHandle'
        }
      }
    },
    vuex:{
      getters:{
        initDrugsDetail
      },
      actions:{
        getDrugsDetail,
      }
    },
    methods:{
         enfoldment:function(param){
          	console.log(this.$store.state.table.rolloutDetail[param.crete])
            if(this.$store.state.table.rolloutDetail[param.crete].arr.length==0){
                this.$store.state.table.rolloutDetail[param.crete].show=false;
            }
            this.$store.state.table.rolloutDetail[param.crete].show = !this.$store.state.table.rolloutDetail[param.crete].show;
        },
        drugs:function(initDrugsDetail){
	          this.disposeParam = initDrugsDetail;
	          console.log(this.disposeParam)
	          this.disposeParam.show = true;
	          this.disposeParam.title = '药款转出操作';
	          this.disposeParam.link = '/money/rollOutHandle';
	          if(initDrugsDetail.status==0){
	               this.disposeParam.tips='申请成功，请等待审核';
	          }else if(initDrugsDetail.status==1){
	               this.disposeParam.tips='审核通过，请等待转账';
	          }else if(initDrugsDetail.status==2){
	               this.disposeParam.tips='转账成功，操作完成';
	          }else if(initDrugsDetail.status==3){
	               this.disposeParam.tips='操作已完成，药款已转出';
	          }
	    }
    },
   created(){
   	  this.getDrugsDetail(this.param);
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
