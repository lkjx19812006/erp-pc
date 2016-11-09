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
    <div class="myOrder" v-if="$route.path.split('=')[1]==5">
        <drugs-record></drugs-record>
    </div>
    <!-- 待支付订单 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==6">
      <order-pay></order-pay>
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
export default {
    components: {
        paymentRecord,
        drugsRecord,
        employeeOrder,
        orgOrder,
        orderReview,
        allOrder,
        orderPay
    }

}
</script>
<style scoped>
.myOrder {
    width: 100%;
    white-space: nowrap;
}
</style>
