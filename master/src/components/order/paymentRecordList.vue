<template>
  <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
  <div v-show="!changeParam.show">
    <div class="service-nav clearfix">
      <div class="my_enterprise col-xs-2">订单支付记录</div>
      <div class="my_order_search">
          <select  v-model="loadParam.payWay" class="form-control" @change="searchProduct()">
              <option selected value="">请选择支付方式</option>
              <option value="0">线下打款</option>
              <option value="1">支付宝</option>
              <option value="2">平安支付</option>
              <option value="3">药款支付</option>
          </select>
      </div>
      <div class="col-xs-2 clearfix">
         <input type="text"  class="form-control" v-model="loadParam.orderNo" placeholder="请输入订单流水号查询" @keyUp.enter="searchProduct()" />
      </div>
      <div class="col-xs-1">
         <button class="new_btn transfer" @click="searchProduct()">搜索</button>
     </div>
    </div>
    <div class="order_table">
      <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
      </div>
      <table class="table table-hover table_color table-striped " v-cloak>
        <thead>
            <tr>
              <th>支付方式</th>
              <th>订单流水号</th>
              <th>支付流水号</th>
              <th>交易状态</th>
              <th>订单金额</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="item in initOrderPaylist">
            <td v-if="item.payWay==0">线下打款</td>
            <td v-if="item.payWay==1">支付宝</td>
            <td v-if="item.payWay==2">平安支付</td>
            <td v-if="item.payWay==3">药款支付</td>
            <td>{{item.orderNo}}</td>
            <td>{{item.payNo}}</td>
            <td>{{item.payStatus}}</td>
            <td>{{item.payFee}}</td>
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
  import {
    initOrderPaylist
  } from '../../vuex/getters'
  import {
    getOrderPayList
  } from '../../vuex/actions'

  export default {
    components: {
      pagination,
      detailModel
    },
    vuex: {
      getters: {
        initOrderPaylist
      },
      actions: {
        getOrderPayList
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
          link:'/order/payList',
          orderNo:'',
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
      clickOn: function(initOrderPaylist) {
        this.changeParam = initOrderPaylist;
       /* this.getProductDetail(this.changeParam);*/
      },
      searchProduct:function(){
           this.getOrderPayList(this.loadParam);
      }
    },
    events: {
      fresh: function(input) {
        this.loadParam.cur = input;
        this.getOrderPayList(this.loadParam);
      }
    },
    created() {
      this.getOrderPayList(this.loadParam);
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
  .table>tbody>tr>td{
/*     max-width: 300px; */
   /*  white-space: normal; */
  }
  .my_order_search{
    width: 170px;
    float: left;
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
</style>
