<template>
  <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
  <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
  <audit-model :param="financeParam" v-if="financeParam.show"></audit-model>
  <div>
    <div class="service-nav clearfix">
      <div class="clearfix">
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
    <div class="order_table" id="table_box">
      <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
      </div>
      <table class="table table-hover table_color table-striped" v-cloak id="tab">
        <thead>
            <tr>
              <th>日期</th>
              <th>客户名称</th>
              <th>客户电话</th>
              <th>订单商品</th>
              <th>订单号</th>
              <th>订单类型</th>
              <th>调整差额</th>
              <th>补充合同文本</th>
              <th>备注</th>
              <th>审核说明</th>
              <th>审核状态</th>
              <th>操作</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="item in initOrgContractList">
            <td>{{item.ctime | dateTime}}</td>
            <td>{{item.customerName}}</td>
            <!-- <td><a @click="clickOn({
                sub:$index,
                id:item.id,
                loading:true,
                show:true,
                key:'fundRecord'
              })">{{item.customerName}}</a>
            </td> -->
            <td>{{item.customerPhone}}</td>
            <td>{{item.orderDesc}}</td>
            <td>{{item.orderNo}}</td>
            <td v-if="item.orderType==0">采购</td>
            <td v-if="item.orderType==1">销售</td>
            <td>{{item.adjusted}}</td>
            <td>{{item.contractText}}</td>
            <td>{{item.comment}}</td>
            <td>{{item.description}}</td>
            <td>{{item.validate | Auditing}}</td>
            <td>
                <a class="operate" v-if="item.validate==1" @click="applyInfo({
                      show:true,
                      sub:$index,
                      id:item.id,
                      validate:item.validate,
                      adjusted:item.adjusted,
                      description:'',
                      url:'/order/quality/contract/validate',
                      titles:'审核合同',
                      link:contractCheck
                  })"><img src="/static/images/orgcheck.png"/></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="base_pagination">
      <pagination :combination="loadParam"></pagination>
    </div>
  </div>
</template>
<script>
  import pagination from '../pagination'
  import detailModel from '../order/second_order/fundDetail'
  import common from '../../common/common'
  import changeMenu from '../../components/tools/tabs/tabs.js'
  import auditModel  from './second_order/financeAudit'
  import tipsModel from '../../components/tips/tipDialog'
  import {
    initOrgContractList
  } from '../../vuex/getters'
  import {
    getMyContractList,
    paymentConfirm,
    contractCheck
  } from '../../vuex/actions'
  export default {
    components: {
      pagination,
      detailModel,
      auditModel,
      tipsModel
    },
    vuex: {
      getters: {
        initOrgContractList
      },
      actions: {
        getMyContractList,
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
          link:'/order/contract/list/org',
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
      clickOn: function(initOrgContractList) {
        this.changeParam = initOrgContractList;
        this.changeParam.show = true;
      },
      selectSearch:function(){
           this.getMyContractList(this.loadParam);
      },
      clickday:function(validate){
         this.loadParam.validate = validate;
         this.getMyContractList(this.loadParam);
      },
      resetTime:function(){
        this.loadParam.orderDesc='';
        this.loadParam.customerName='';
        this.loadParam.customerPhone='';
        this.loadParam.orderNo='';
        this.loadParam.orderType='';
        this.getMyContractList(this.loadParam);
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
      }
    },
    events: {
      fresh: function(input) {
        this.loadParam.cur = input;
        this.getMyContractList(this.loadParam);
      }
    },
    ready(){
        common('tab','table_box',1);
      },
    created() {
      changeMenu(this.$store.state.count.isTop,this.getMyContractList,this.loadParam,localStorage.myFundParam); 
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
  .checkbox_unselect{
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
  }
  .checkbox_select{
    background-image: url(/static/images/selected.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
  }
   #table_box  table th,#table_box  table td{
    width:144px;
    min-width: 144px;
  }
</style>
