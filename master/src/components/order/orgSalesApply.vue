<template>
  <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
  <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
  <audit-model :param="financeParam" v-if="financeParam.show"></audit-model>

  <mglist-model>
      <!-- 头部搜索 -->
      <div slot="top">
          <div class="clearfix">
            <dl class="clear left transfer">
               <dt class="left transfer marg_top">订单类型：</dt>
               <dd class="left">
                  <select class="form-control" v-model="loadParam.orderType" @change="selectSearch()">
                    <option value="">全部</option>
                    <option value="0">采购</option>
                    <option value="1">销售</option>
                  </select>
               </dd>
            </dl>
            <dl class="clear left transfer">
               <dt class="left  marg_top">商品名称：</dt>
               <dd class="left">
                  <input type="text"  class="form-control" v-model="loadParam.orderDesc"  @keyup.enter="selectSearch()"/>
               </dd>
            </dl>
            <dl class="clear left transfer">
               <dt class="left transfer marg_top">订单号：</dt>
               <dd class="left">
                  <input type="text"  class="form-control" v-model="loadParam.orderNo"  @keyup.enter="selectSearch()"/>
               </dd>
            </dl>
            
            <dl class="clear left transfer">
               <dt class="left transfer marg_top">客户名称：</dt>
               <dd class="left">
                  <input type="text"  class="form-control" v-model="loadParam.customerName"  @keyup.enter="selectSearch()"/>
               </dd>
            </dl>
            <dl class="clear left transfer">
               <dt class="left transfer marg_top">客户手机：</dt>
               <dd class="left">
                  <input type="text"  class="form-control" v-model="loadParam.customerPhone"  @keyup.enter="selectSearch()"/>
               </dd>
            </dl>
            <button type="button" class="new_btn transfer pull-left"  @click="resetTime()">{{$t('static.clear_all')}}</button>
            <button class="new_btn transfer pull-left" @click="selectSearch()">{{$t('static.search')}}</button>
            <div class="clearfix right" >
              <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
            </div>
          </div>
      </div>
      <!-- 中间列表 -->
      <div slot="form">
          <div class="cover_loading">
              <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
          </div>
          <table class="table table-hover table_color table-striped" v-cloak id="tab">
            <thead>
                <tr>
                  <th>日期</th>
                  <th>售后类型</th>
                  <th>客户名称</th>
                  <th>客户电话</th>
                  <th>订单商品</th>
                  <th>订单号</th>
                  <th>订单类型</th>
                  <th>收货人</th>
                  <th>发货人</th>
                  <th>备注</th>
                  <th>审核状态</th>
                  <th>操作</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="item in initOrgAfterSales">
                <td>{{item.ctime | dateTime}}</td>
                <td v-if="item.type==0">换货</td>
                <td v-if="item.type==1">退货</td>
                <td>{{item.customerName}}</td>
                <td>{{item.customerPhone}}</td>
                <td>{{item.orderDesc}}</td>
                <td>{{item.orderNo}}</td>
                <td v-if="item.orderType==0">采购</td>
                <td v-if="item.orderType==1">销售</td>
                <td>{{item.consigneeName}}</td>
                <td>{{item.shipperName}}</td>
                <td>{{item.comment}}</td>
                <td v-if="item.taskKey===''||item.taskKey=='after_sales_governor_validate'">{{item.validate | Auditing}}</td>
                <td v-if="item.validate==-1&&item.taskKey=='after_sales_employee_handle'">{{item.validate | Auditing}}</td>
                <td v-if="item.validate==1&&item.taskKey=='after_sales_receipt'">{{item.validate | Auditing}}（待{{item.handlerName}}收货确认）</td>
                <td v-if="item.taskKey=='after_sales_resend'&&item.logistics==0">待{{item.handlerName}}发货</td>
                <td v-if="item.taskKey=='after_sales_resend'&&item.logistics==2">已发货，请到我的订单确认收货</td>
                <td v-if="item.validate==-2&&item.taskKey=='after_sales_employee_handle'">{{item.validate | Auditing}}（待{{item.handlerName}}处理）</td>
                <td v-if="item.taskKey=='after_sales_refund'&&item.validate==1">待{{item.handlerName}}处理</td>
                <td v-if="item.taskKey=='after_sales_disputed_handle'&&item.validate==-1">{{item.validate | Auditing}}</td>
                <td>
                    <a class="operate" v-if="item.validate==1&&(item.taskKey===''||item.taskKey=='after_sales_governor_validate')" @click="applyInfo({
                          show:true,
                          sub:$index,
                          id:item.id,
                          validate:item.validate,
                          description:'',
                          url:'/order/quality/after/sales/validate',
                          titles:'售后审核',
                          link:contractCheck
                      })"><img src="/static/images/orgcheck.png"/></a>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
       <!-- 底部分页 -->
      <pagination :combination="loadParam"  slot="page"></pagination>
  </mglist-model>

</template>
<script>
  import pagination from '../pagination'
  import detailModel from '../order/second_order/fundDetail'
  import common from '../../common/common'
  import changeMenu from '../../components/tools/tabs/tabs.js'
  import auditModel  from './second_order/financeAudit'
  import tipsModel from '../../components/tips/tipDialog'
  import mglistModel from '../mguan/mgListComponent.vue'
  import {
    initOrgAfterSales
  } from '../../vuex/getters'
  import {
    getSalesApplyList,
    paymentConfirm,
    contractCheck
  } from '../../vuex/actions'
  export default {
    components: {
      pagination,
      detailModel,
      auditModel,
      tipsModel,
      mglistModel
    },
    vuex: {
      getters: {
        initOrgAfterSales
      },
      actions: {
        getSalesApplyList,
        paymentConfirm,
        contractCheck
      }
    },
    data() {
      return {
        loadParam: {
          loading: true,
          show:false,
          color: '#5dc596',
          size: '15px',
          cur: 1,
          all: 1,
          link:'/order/after/sales/list/org',
          orderDesc:'',
          customerName:'',
          customerPhone:'',
          orderNo:'',
          orderType:'',
          validate:'',
          total:0
        },
        changeParam: {
          show: false
        },
        tipsParam:{
          show:false,
          alert:true,
          name:''
        },
        financeParam:{
          show:false
        },
        checked:false
      }
    },
    methods: {
      clickOn: function(initOrgAfterSales) {
        this.changeParam = initOrgAfterSales;
        this.changeParam.show = true;
      },
      selectSearch:function(){
           this.getSalesApplyList(this.loadParam);
      },
      clickday:function(validate){
         this.loadParam.validate = validate;
         this.getSalesApplyList(this.loadParam);
      },
      resetTime:function(){
        this.loadParam.orderDesc='';
        this.loadParam.customerName='';
        this.loadParam.customerPhone='';
        this.loadParam.orderNo='';
        this.loadParam.orderType='';
        this.getSalesApplyList(this.loadParam);
      },
      applyInfo:function(item){
        this.financeParam.show = true;
        this.financeParam = item;
        this.financeParam.callback = this.callback;
      },
      callback:function(title){
          this.tipsParam.show= true;
          this.tipsParam.alert= true;
          this.tipsParam.name= title;
          this.getSalesApplyList(this.loadParam);
      }
    },
    events: {
      fresh: function(input) {
        this.loadParam.cur = input;
        this.getSalesApplyList(this.loadParam);
      }
    },
    ready(){
        common('tab','table_box',1);
      },
    created() {
      changeMenu(this.$store.state.count.isTop,this.getSalesApplyList,this.loadParam,localStorage.myFundParam); 
    }
  }
</script>
<style scoped>
  .transfer{
    margin-right: 10px;
  }
  .service-nav{
    padding-bottom:0px;
    padding-left:10px;
    padding-right:10px;
  }
   #table_box  table th,#table_box  table td{
    width:144px;
    min-width: 144px;
  }
</style>
