<template>
  <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
  <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
  <dispose-model :param="disposeParam" v-if="disposeParam.show"></dispose-model>
  <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>

  <mglist-model>
      <!-- 头部搜索 -->
      <div slot="top">
          <div class="clear">
            <div class="my_order col-xs-2">{{$t('static.pay_order')}}</div>
            <div class="right">
                <button class="btn btn-primary transfer" @click="createSearch()">{{$t('static.refresh')}}</button>
            </div>
          </div>
      </div>
      <!-- 中间列表 -->
      <div slot="form">
          <div class="cover_loading">
              <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
          </div>
          <table class="table table-hover table_color table-striped " v-cloak id="tab">
            <thead>
              <tr>
                <!-- <th>{{$t('static.order_no')}}</th>
                <th>{{$t('static.order_type')}}</th>
                <th>{{$t('static.order_source')}}</th>
                <th>{{$t('static.consignee_name')}}</th>
                <th>{{$t('static.consignee_phone')}}</th>
                <th>{{$t('static.consignee_address')}}</th>
                <th>{{$t('static.country')}}</th>
                <th>{{$t('static.province')}}</th>
                <th>{{$t('static.city')}}</th>
                <th>{{$t('static.salesman')}}</th>
                <th>{{$t('static.comment')}}</th>
                <th>{{$t('static.client_source')}}</th>
                <th>{{$t('static.order_status')}}</th>
                <th>{{$t('static.review_status')}}</th>
                <th>{{$t('static.currency')}}</th>
                <th>{{$t('static.payment_method')}}</th> -->
                <th>{{$t('static.transcation')}}</th>
                <th>{{$t('static.order_type')}}</th>
                <th>{{$t('static.trading_patterns')}}</th>
                <th>{{$t('static.sample_order')}}</th>
                <th>{{$t('static.breed')}}</th>
                <th>{{$t('static.transcation_amount')}}</th>
                <th>{{$t('static.client_name')}}</th>
                <th>{{$t('static.supplier_name')}}</th>
                <th>{{$t('static.salesman')}}</th>
                <th>{{$t('static.consignee_name')}}</th>
                <th>{{$t('static.consignee_phone')}}</th>
                <th>{{$t('static.consignee_address')}}</th>
                <th>{{$t('static.payment_method')}}</th>
                <th>{{$t('static.order_status')}}</th>
                <th>{{$t('static.order_source')}}</th>
                <th>{{$t('static.review_status')}}</th>
                <th>{{$t('static.handle')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in initPurchaseOrderlist"  v-cloak v-show="item.orderStatus==20">
                <td>{{item.ctime}}</td>
                <td v-if="item.type==1">{{$t('static.sell')}}</td>
                <td v-if="item.type==0">{{$t('static.purchase')}}</td>
                <td v-if="item.mode==1">{{$t('static.together')}}</td>
                <td v-if="item.mode==2">{{$t('static.three_side')}}</td>
                <td v-if="item.mode==3">{{$t('static.self_support')}}</td>
                <td v-if="item.sample==0">否</td>
                <td v-if="item.sample==1">是</td>
                <td>{{item.goodsDesc}}</td>
                <td>{{item.total}}</td>
                <td><a @click="clickOn({
                              show:true,
                              id:item.id,
                              loading:false,
                              key:'orderDetail',
                              orderStatus:item.orderStatus,
                              contact:'/order/myList'
                      })">{{item.customerName}}</a></td>
                <td></td>
                <td>{{item.employeeName}}</td>
                <td>{{item.consignee}}</td>
                <td>{{item.consigneePhone}}</td>
                <td>{{item.country}} {{item.province}} {{item.city}} {{item.district}} {{item.consigneeAddr}}</td>
                <td v-if="item.payWay===0">{{$t('static.offline')}}</td>
                <td v-if="item.payWay==1">{{$t('static.alipay')}}</td>
                <td v-if="item.payWay==2">{{$t('static.pingan')}}</td>
                <td v-if="item.payWay==3">{{$t('static.yaokuan')}}</td>
                <td v-if="item.payWay==4">WeChat</td>
                <td v-if="item.payWay!=0&&item.payWay!=1&&item.payWay!=2&&item.payWay!=3&&item.payWay!=4">未支付</td>
                <td>{{$t('static.wait_payment')}}</td>
                <td v-if="item.sourceType==0">交易员新建</td>
                <td v-if="item.sourceType==1">意向</td>
                <td v-if="item.sourceType==2">报价</td>
                <td v-if="item.sourceType==3">{{$t('static.sample_order')}}</td>
                <td v-if="item.validate==2"><div style="background:green;color:#fff">{{item.validate | Auditing}}</div></td>
                <td v-if="item.validate==-2"><div style="background:red;color:#fff">{{item.validate | Auditing}}</div></td>
                <td v-if="item.validate!=-2&&item.validate!=2">{{item.validate | Auditing}}</td>
                <td>
                  <a class="operate" ><img src="/static/images/{{$t('static.img_payorder')}}.png" title="待付款" alt="待付款" @click="pendingOrder(item,$index)" /></a>
                </td>
                <!-- <td @click="editClick($index)">
                    <img height="24" width="24" src="/static/images/default_arrow.png" />
                    <div class="component_action" v-show="item.show">
                         <ul>
                              <li v-if="item.orderStatus==30&&item.type==1&&item.validate==2" @click="pendingOrder(item,$index)">等待核查</li>
                         </ul>
                     </div>
                </td> -->
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
  import detailModel from '../order/orderDetail'
  import searchModel from '../order/orderSearch'
  import disposeModel  from  '../order/orderStatus'
  import filter from '../../filters/filters'
  import common from '../../common/common'
  import changeMenu from '../../components/tools/tabs/tabs.js'
  import tipsModel from '../tips/tipDialog'
  import mglistModel from '../mguan/mgListComponent.vue'
  import {
    getList,
    initPurchaseOrderlist
  } from '../../vuex/getters'
  import {
    getOrderCheckList,
    alterOrder,
    createOrder,
    orderStatu,
    getOrderDetail
  } from '../../vuex/actions'
  export default {
    components: {
      pagination,
      detailModel,
      searchModel,
      disposeModel,
      filter,
      tipsModel,
      mglistModel 
    },
    data() {
      return {
        loadParam: {
          loading: true,
          color: '#5dc596',
          size: '15px',
          show:false,
          cur: 1,
          all: 1,
          consignee:'',
          link:'/order/',
          key:'purchaseOrderList',
          consigneePhone:'',
          orderStatus:'',
          payWay:'',
          clients:'',
          dataStatus:'',
          total:0,
          type:0,
          orderStatus:20
        },
        dialogParam:{
          show: false
        },
        updateParam: {
          show:false,
        },
        detailParam: {
          show:false
        },
        updateorderParam:{
          show:false
        },
        tipsParam:{
          name:'',
          alert:true,
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
          aaaa:'/order/payConfirm',
          key:'purchaseOrderList'
        },
        show:true
      }
    },
    vuex: {
      getters: {
        getList,
        initPurchaseOrderlist
      },
      actions: {
        getOrderCheckList,
        alterOrder,
        createOrder,
        orderStatu,
        getOrderDetail
      }
    },
    created() {
      changeMenu(this.$store.state.table.isTop,this.getOrderCheckList,this.loadParam,localStorage.purchaseOrderCheckParam); 
      /*if(!this.$store.state.table.isTop){
          console.log("刷新数据");
          this.getOrderCheckList(this.loadParam);
      }else{
          console.log("不刷新数据");
          this.loadParam = JSON.parse(localStorage.purchaseOrderCheckParam);
          this.$store.state.table.basicBaseList.orderList = JSON.parse(localStorage.purchaseOrderCheckList);
          //this.loadParam.loading = false;
      }*/
    },
    methods: {
      editClick: function(sub) {
        if(this.$store.state.table.basicBaseList.purchaseOrderList[sub].show){
          this.$store.state.table.basicBaseList.purchaseOrderList[sub].show=!this.$store.state.table.basicBaseList.purchaseOrderList[sub].show;
        }else{
          this.$store.state.table.basicBaseList.purchaseOrderList[sub].show=true;
        }
      },
      newOrder:function(param){
        this.dialogParam=param;
      },
      createSearch:function(){
         this.getOrderCheckList(this.loadParam);
      },
      clickOn:function(param){
        
        this.detailParam=param;
      },
      updateOrder:function(param){
        
        this.dialogParam=param;
      },
      pendingOrder:function(item,sub){
        item.show=!item.show;
        item.sub = sub;
        this.disposeParam = item;
        this.disposeParam.key = "purchaseOrderList";
        this.disposeParam.show = true;
        this.disposeParam.tips="订单审核通过，等待财务付款！";
        this.disposeParam.payment = true;
        this.disposeParam.callback = this.orderBack;
      },
      orderBack:function(title){
          this.tipsParam.show = true;
          this.tipsParam.name=title;
          this.tipsParam.alert=true;
      },
    },
    filter:(filter,{}),
    ready(){
      common('tab','table_box',1);
    },
    events: {
      fresh: function(input) {
        this.loadParam.cur = input;
        this.getOrderCheckList(this.loadParam);
      }
    }
  }
</script>
<style scoped>
  .myOrder {
    width: 100%;
    white-space: nowrap;
  }
  .order_search {
    padding: 25px 30px 0 40px;
  }
  .transfer{
    margin-right: 20px;
  }
  .order_table {
    margin-top: 10px;
    position: relative;
  }

  .order_table .table {
    background: #fff;
    position: relative;
    margin-bottom: 10px;
    border-top: 1px solid #ddd;
  }
  .component_action{
    right: 43px;
  }
  .order_table .table > ul {
    position: relative;
    width: 100%;
    display: table;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0;
  }

  .order_table .table > ul >li {
    float: left;
    padding: 7.5px 0;
    text-align: center;
    width: 11.1%;
    display: table-cell;
  }

  .order_table .table > ul >li a {
    color: #003077;
  }

  .order_table .table_hover > ul:hover {
    background: #f5f5f5;
  }

  .order_table .table > ul >li img {
    margin: auto;
  }

  .order_action {
    position: absolute;
    right: 97px;
    padding: 10px 0;
    top: 32px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 10;
    min-width: 90px;
    max-width: 200px;
  }

  .order_show {
    position: absolute;
    right: 20px;
    padding: 10px 0;
    top: 32px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 10;
    min-width: 90px;
    max-width: 200px;
    display: block;
  }

  .order_action ul,
  .order_show ul {
    margin-bottom: 0;
  }

  .order_action ul li a,
  .order_show ul li a {
    color: #003077;
    padding: 5px 5px 5px 10px;
    display: block;
  }

  .expand-transition {
    transition: all .3s ease;
    overflow: inherit;
  }

  .expand-enter,
  .expand-leave {
    opacity: 0;
    height: 0;
  }

  .v-spinner {
    text-align: center;
  }
  .order_pagination{
    text-align: center;
  }
</style>
