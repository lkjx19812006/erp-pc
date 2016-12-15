<template>
  <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
  <div>
    <div class="service-nav clearfix">
      <div class="left">
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
        <button type="button" class="new_btn transfer pull-left"  @click="resetTime()">{{$t('static.clear_all')}}</button>
        <button class="new_btn transfer pull-left" @click="selectSearch()">{{$t('static.search')}}</button>
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
              <th>类型</th>
              <th>业务类型</th>
              <th>金额</th>
              <th>支付方式</th>
              <th>支付名称</th>
              <th>用户名</th>
              <th>账号</th>
              <th>付款时间</th>
              <th>备注</th>
              <th>操作</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="item in initMyFundList">
            <td>{{item.ctime}}</td>
            <td v-if="item.type==0">付款</td>
            <td v-if="item.type==1">收款</td>
            <td>{{item.bizType}}</td>
            <td>{{item.amount}}</td>
            <td>{{item.payWay}}</td>
            <td>{{item.payName}}</td>
            <td>{{item.payUserName}}</td>
            <td>{{item.payNumber}}</td>
            <td>{{item.ctime}}</td>
            <td>{{item.comment}}</td>
            <td v-if="item.type==1">
              <a class="operate">核查收款</a>
            </td>
            <td v-if="item.type==0">
              <a class="operate">申请支付</a>
              <a class="operate">确认收款</a>
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
  import detailModel from '../supply/productDetail'
  import common from '../../common/common'
  import changeMenu from '../../components/tools/tabs/tabs.js'
  import {
    initMyFundList
  } from '../../vuex/getters'
  import {
    getMyFundList
  } from '../../vuex/actions'
  export default {
    components: {
      pagination,
      detailModel,
    },
    vuex: {
      getters: {
        initMyFundList
      },
      actions: {
        getMyFundList
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
          type:'',
          amount:'',
          payName:'',
          payUserName:'',
          payNumber:'',
          payWay:'',
          total:0
        },
        changeParam: {
          show: false
        },
        checked:false
      }
    },
    methods: {
      clickOn: function(initMyFundList) {
        this.changeParam = initMyFundList;
       /* this.getProductDetail(this.changeParam);*/
      },
      selectSearch:function(){
           this.getMyFundList(this.loadParam);
      },
      resetTime:function(){
        this.loadParam.amount='';
        this.loadParam.type='';
        this.loadParam.payName='';
        this.loadParam.payUserName='';
        this.loadParam.payNumber='';
        this.loadParam.payWay='';
        this.getMyFundList(this.loadParam);
      }
    },
    events: {
      fresh: function(input) {
        this.loadParam.cur = input;
        this.getMyFundList(this.loadParam);
      }
    },
    ready(){
        common('tab','table_box',1);
      },
    created() {
      changeMenu(this.$store.state.count.isTop,this.getMyFundList,this.loadParam,localStorage.myFundParam); 
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
    padding-bottom:10px;
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
