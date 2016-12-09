<template>
  <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
  <div v-show="!changeParam.show">
    <div class="service-nav clearfix">
      <div class="my_order_search">
          <select  v-model="loadParam.payWay" class="form-control" @change="searchProduct()">
              <option value="">{{$t('static.select_payment_method')}}</option>
              <option value="0">{{$t('static.line_down')}}</option>
              <option value="1">{{$t('static.alipay')}}</option>
              <option value="2">{{$t('static.pingan')}}</option>
              <option value="3">{{$t('static.yaokuan')}}</option>
          </select>
      </div>
      <div class="left clearfix">
         <input type="text"  class="form-control" v-model="loadParam.orderNo" placeholder="{{$t('static.order_no')}}" @keyUp.enter="searchProduct()" />
      </div>
      <div class="left">
         <button class="new_btn transfer" @click="searchProduct()">{{$t('static.search')}}</button>
         <button class="new_btn transfer" @click="reset()">{{$t('static.clear_all')}}</button>
     </div>
    </div>
    <div class="order_table" id="table_box">
      <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
      </div>
      <table class="table table-hover table_color table-striped " v-cloak id="tab">
        <thead>
            <tr>
              <th>{{$t('static.payment_method')}}</th>
              <th>{{$t('static.order_no')}}</th>
              <th>{{$t('static.pay_no')}}</th>
              <th>{{$t('static.transaction_status')}}</th>
              <th>{{$t('static.order_amount')}}</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="item in initOrderPaylist">
            <td v-if="item.payWay===0">{{$t('static.line_down')}}</td>
            <td v-if="item.payWay==1">{{$t('static.alipay')}}</td>
            <td v-if="item.payWay==2">{{$t('static.pingan')}}</td>
            <td v-if="item.payWay==3">{{$t('static.yaokuan')}}</td>
            <td v-if="item.payWay==null">未支付</td>
            <td>{{item.orderNo}}</td>
            <td>{{item.payNo}}</td>
            <td>{{item.payStatus}}</td>
            <td>{{item.payFee | payfee}}</td>
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
  import filter from  '../../filters/filters'
  import detailModel from '../supply/productDetail'
  import common from '../../common/common'
  import changeMenu from '../../components/tools/tabs/tabs.js'
  import {
    initOrderPaylist
  } from '../../vuex/getters'
  import {
    getOrderPayList
  } from '../../vuex/actions'

  export default {
    components: {
      pagination,
      detailModel,
      filter
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
      },
      reset:function(){
        this.loadParam.orderNo='';
        this.loadParam.payWay='';
        this.getOrderPayList(this.loadParam);
      }
    },
    events: {
      fresh: function(input) {
        this.loadParam.cur = input;
        this.getOrderPayList(this.loadParam);
      }
    },
    filter:(filter,{}),
    ready(){
        common('tab','table_box',1);
      },
    created() {
      changeMenu(this.$store.state.table.isTop,this.getOrderPayList,this.loadParam,localStorage.payRecordParam); 
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
    width:340px;
    min-width: 340px;
  }
</style>
