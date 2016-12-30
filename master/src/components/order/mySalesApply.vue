<template>
  <update-model :param="editParam" v-if="editParam.show"></update-model>
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
              <th>售后类型</th>
              <th>客户名称</th>
              <th>客户电话</th>
              <th>订单商品</th>
              <th>订单号</th>
              <th>订单类型</th>
              <th>收货人</th>
              <th>发货人</th>
              <th>备注</th>
              <th>说明</th>
              <th>状态说明</th>
              <th>操作</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="item in initMyAfterSales">
            <td>{{item.ctime | dateTime}}</td>
            <td v-if="item.type==0">换货</td>
            <td v-if="item.type==1">退货</td>
            <td>{{item.customerName}}</td>
            <td>{{item.customerPhone}}</td>
            <td>{{item.orderDesc}}</td>
            <td>{{item.orderNo}}</td>
            <td v-if="item.orderType==0">采购</td>
            <td v-if="item.orderType==1">销售</td>
            <td>{{item.consignee}}</td>
            <td>{{item.shipper}}</td>
            <td>{{item.comment}}</td>
            <td>{{item.description}}</td>
            <td v-if="item.taskKey=='after_sales_refund'&&item.validate==1">待{{item.handlerName}}处理</td>
            <td v-if="item.taskKey=='after_sales_resend'&&item.validate==1">待{{item.handlerName}}发货</td>
            <td v-if="item.taskKey!=='after_sales_refund'&&item.taskKey!=='after_sales_resend'">{{item.validate | Auditing}}</td>

            <td>
                <a class="operate" v-if="item.validate==-2" @click="editPayment({
                        show:true,
                        sub:$index,
                        id:item.id,
                        consignee:item.consignee,
                        validate:item.validate,
                        orderId:item.orderId,
                        comment:item.comment,
                        type:item.type,
                        image_f:'',
                        image_s:'',
                        image_t:'',
                        images:'',
                        shipper:item.shipper,
                        url:'/order/quality/after/sales/edit',
                        titles:'编辑',
                        link:afterSalseEdit
                    })"><img src="/static/images/edit.png"/></a>
                <a class="operate" v-if="item.validate==-2&&item.taskKey=='after_sales_employee_handle'" @click="applyInfo({
                      show:true,
                      sub:$index,
                      id:item.id,
                      //orderId:item.orderId,
                      validate:item.validate,
                      comment:'',
                      url:'/order/quality/after/sales/restartOrCancel',
                      titles:'重新申请审核',
                      link:contractCheck
                  })"><img src="/static/images/{{$t('static.img_reset')}}.png"/></a>
                  <button class="btn btn-primary" v-if="item.validate==1&&item.taskKey=='after_sales_receipt'" style="background:#fff;color:#2e6da4;padding:2px 5px;" 
                      @click="applyInfo({
                          show:true,
                          sub:$index,
                          id:item.id,
                          description:'',
                          validate:item.validate,
                          url:'/order/quality/after/sales/validate',
                          titles:'确认收货',
                          link:contractCheck
                    })">收货确认</button>
                  <button class="btn btn-primary" v-if="item.validate==-2&&item.taskKey=='after_sales_disputed_handle'" style="background:#fff;color:#2e6da4;padding:2px 5px;" 
                      @click="applyInfo({
                          show:true,
                          sub:$index,
                          id:item.id,
                          description:'',
                          url:'/order/quality/after/sales/disputed',
                          titles:'售后异议处理',
                          link:contractCheck
                    })">异议处理</button>
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
  import updateModel from '../../components/order/second_order/afterSalesApply'
  import {
    initMyAfterSales
  } from '../../vuex/getters'
  import {
    getSalesApplyList,
    paymentConfirm,
    contractCheck,
    afterSalseEdit
  } from '../../vuex/actions'
  export default {
    components: {
      pagination,
      detailModel,
      auditModel,
      tipsModel,
      updateModel
    },
    vuex: {
      getters: {
        initMyAfterSales
      },
      actions: {
        getSalesApplyList,
        paymentConfirm,
        contractCheck,
        afterSalseEdit
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
          link:'/order/after/sales/list/employee',
          orderDesc:'',
          customerName:'',
          customerPhone:'',
          orderNo:'',
          orderType:'',
          validate:'',
          total:0
        },
        editParam: {
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
      editPayment:function(update){
        this.editParam.show=true;
        this.editParam = update;
        this.editParam.callback = this.callback;
        console.log(this.editParam)
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
    width:134px;
    min-width: 134px;
  }
</style>
