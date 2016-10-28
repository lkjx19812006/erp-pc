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
</template>
<script>
import paymentRecord from '../components/order/paymentRecordList'
import drugsRecord  from  '../components/order/drugsRecordList'
import employeeOrder from '../components/order/myOrderlist'
import orgOrder  from  '../components/order/orgOrderlist'
import orderReview  from  '../components/order/checkedOrder'
import allOrder  from  '../components/order/allOrder'
export default {
    components: {
        paymentRecord,
        drugsRecord,
        employeeOrder,
        orgOrder,
        orderReview,
        allOrder
    },
    data() {
        return {
          
        }
    },
    vuex: {
       
    },
     route: {
        activate: function (transition) {
          console.log('hook-example activated!')
          transition.next()
        },
        deactivate: function (transition) {
          console.log('hook-example deactivated!')
          transition.next()
      }
    }
}
</script>
<style scoped>
.myOrder {
    width: 100%;
    white-space: nowrap;
}
</style>
