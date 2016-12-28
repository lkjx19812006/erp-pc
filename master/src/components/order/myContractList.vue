<template>
  <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
  <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
  <audit-model :param="financeParam" v-if="financeParam.show"></audit-model>
  <div>
    <div class="service-nav clearfix">
      <div class="clearfix">
        <dl class="clear left">
           <dt class="left  marg_top">类型：</dt>
           <dd class="left">
                <select class="form-control" v-model="loadParam.type" @change="selectSearch()">
                    <option value="">{{$t('static.please_select')}}</option>
                    <option value="0">付款</option>
                    <option value="1">收款</option>
                </select>
           </dd>
        </dl>
        <dl class="clear left transfer">
           <dt class="left transfer marg_top">支付名称：</dt>
           <dd class="left">
              <input type="text"  class="form-control" v-model="loadParam.payName"  @keyup.enter="selectSearch()"/>
           </dd>
        </dl>
        <dl class="clear left transfer">
           <dt class="left transfer marg_top">金额：</dt>
           <dd class="left">
              <input type="text"  class="form-control" v-model="loadParam.amount"  @keyup.enter="selectSearch()"/>
           </dd>
        </dl>
        <dl class="clear left transfer">
           <dt class="left transfer marg_top">用户名：</dt>
           <dd class="left">
              <input type="text"  class="form-control" v-model="loadParam.payUserName"  @keyup.enter="selectSearch()"/>
           </dd>
        </dl>
        <dl class="clear left transfer">
           <dt class="left transfer marg_top">账号：</dt>
           <dd class="left">
              <input type="text"  class="form-control" v-model="loadParam.payNumber"  @keyup.enter="selectSearch()"/>
           </dd>
        </dl>
      </div>
      <div class="clearfix left">
        <div class="btn-group ">
            <button class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.validate===''}" @click="clickday('')">{{$t('static.please_select')}}</button>
            <button class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.validate===0}" @click="clickday(0)">未审核</button>
            <button  class="btn btn-default" v-bind:class="{ 'btn-warning':  this.loadParam.validate===1}" @click="clickday(1)">申请中</button>
            <button  class="btn btn-default" v-bind:class="{ 'btn-warning':  this.loadParam.validate===2}" @click="clickday(2)">审核通过</button>
            <button class="btn btn-default"  v-bind:class="{ 'btn-warning':  this.loadParam.validate===3}" @click="clickday(3)">审核未通过</button>
            <button type="button" class="new_btn transfer pull-left"  @click="resetTime()">{{$t('static.clear_all')}}</button>
            <button class="new_btn transfer pull-left" @click="selectSearch()">{{$t('static.search')}}</button>
        </div>
      </div>
      <div class="clearfix right" >
          <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
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
              <th>审核状态</th>
              <th>操作</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="item in initMyContractList">
            <td>{{item.ctime}}</td>
            <td><a @click="clickOn({
                sub:$index,
                id:item.id,
                loading:true,
                show:true,
                key:'fundRecord'
              })">{{item.customerName}}</a>
            </td>
            <td>{{item.customerPhone}}</td>
            <td>{{item.orderDesc}}</td>
            <td>{{item.orderNo}}</td>
            <td>{{item.orderType}}</td>
            <td>{{item.validate}}</td>
            <td>
              <a class="operate" v-if="item.type==0&&item.pr==0&&item.validate==2" @click="applyInfo({
                          show:true,
                          sub:$index,
                          id:item.id,
                          image_f:'',
                          image_s:'',
                          image_t:'',
                          images:'',
                          url:'/fund/proceedsConfirm',
                          titles:'确定收款',
                          link:paymentConfirm
                      })"><img src="/static/images/surePayment.png"/></a>
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
    initMyContractList
  } from '../../vuex/getters'
  import {
    getMyContractList,
    paymentConfirm
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
        initMyContractList
      },
      actions: {
        getMyContractList,
        paymentConfirm
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
          link:'/order/contract/list/employee',
          type:'',
          amount:'',
          payName:'',
          payUserName:'',
          payNumber:'',
          payWay:'',
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
      clickOn: function(initMyContractList) {
        this.changeParam = initMyContractList;
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
        this.loadParam.amount='';
        this.loadParam.type='';
        this.loadParam.payName='';
        this.loadParam.payUserName='';
        this.loadParam.payNumber='';
        this.loadParam.payWay='';
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
  .breed_action {
    top: 33px;
    right: 106px;
  }
  .transfer{
    margin-left: 18px;
  }
  .service-nav{
    padding-bottom:5px;
    padding-left:10px;
    padding-right:10px;
  }
  .my_order_search{
    width: 170px;
    float: left;
    margin-right: 10px;
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
    width:156px;
    min-width: 156px;
  }
</style>
