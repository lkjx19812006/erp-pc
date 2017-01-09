<template>
    <!-- 我的订单 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==0">
        <employee-order></employee-order>
    </div>
    <!-- 部门订单 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==1">
        <org-order></org-order>
    </div>
    <!-- 全部订单列表 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==2">
        <all-order></all-order>
    </div>
    <!-- 订单支付记录 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==3">
        <payment-record></payment-record>
    </div>
    <!-- 订单审核 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==4">
        <order-review></order-review>
    </div>
    <!-- 药款转出记录 -->
    <!-- <div class="myOrder" v-if="$route.path.split('=')[1]==5">
        <drugs-record></drugs-record>
    </div> -->
    <!-- 待支付订单 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==6">
      <order-pay></order-pay>
    </div>
    <!-- 我的资金记录 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==7">
      <my-fund></my-fund>
    </div>
    <!-- 部门资金记录 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==8">
      <org-fund></org-fund>
    </div>
    <!-- 财务资金记录 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==9">
      <finance-model></finance-model>
    </div>
    <!-- 我的补充合同 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==10">
      <mycontract-model></mycontract-model>
    </div>
    <!-- 部门补充合同 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==11">
      <orgcontract-model></orgcontract-model>
    </div>
    <!-- 我的补充合同 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==12">
      <myafterapply-model></myafterapply-model>
    </div>
    <!-- 部门补充合同 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==13">
      <orgafterapply-model></orgafterapply-model>
    </div>
</template>
<script>
import paymentRecord from '../components/order/paymentRecordList'
import drugsRecord  from  '../components/order/drugsRecordList'
import employeeOrder from '../components/order/myOrderlist'
import orgOrder  from  '../components/order/orgOrderlist'
import orderReview  from  '../components/order/checkedOrder'
import allOrder  from  '../components/order/allOrder'
import orderPay from '../components/order/payOrder'
import myFund from '../components/order/myFundRecord'
import orgFund from '../components/order/orgFundRecord'
import financeModel  from '../components/order/financeOrderList'
import mycontractModel from '../components/order/myContractList'
import orgcontractModel from '../components/order/orgContractList'
import myafterapplyModel from '../components/order/mySalesApply'
import orgafterapplyModel from  '../components/order/orgSalesApply'
export default {
    components: {
        paymentRecord,
        drugsRecord,
        employeeOrder,
        orgOrder,
        orderReview,
        allOrder,
        orderPay,
        myFund,
        orgFund,
        financeModel,
        mycontractModel,
        orgcontractModel,
        orgafterapplyModel,
        myafterapplyModel
    }
}
</script>
<style scoped>
.myOrder {
    width: 100%;
    white-space: nowrap;
}
</style>
