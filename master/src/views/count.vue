<template>
    <!-- 客户业务员统计 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==0">
        <personal-count></personal-count>
    </div>
    <!-- 客户部门统计 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==1">
        <org-count></org-count>
    </div>
    <!-- 全部客户统计 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==4">
        <all-count></all-count>
    </div>
    <!-- 订单业务员统计 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==2">
        <order-count></order-count>
    </div>
    <!-- 订单部门统计 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==3">
        <orgorder-count></orgorder-count>
    </div>
    <!-- 订单统计报表-->
    <div class="myOrder" v-if="$route.path.split('=')[1]==5">
        <org-manage></org-manage>
    </div>
    <!-- 全部订单统计 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==6">
        <allorder-count></allorder-count>
    </div>
</template>
<script>
import personalCount from '../components/count/myCount'
import orgCount from '../components/count/orgCount'
import orderCount from '../components/count/myOrdercount'
import orgorderCount from '../components/count/orgOrdercount'
import allCount from '../components/count/allClientCount'
import allorderCount from '../components/count/allOrderCount'
import orgManage from '../components/count/orgManage'
export default {
    components: {
        personalCount,
        orgCount,
        orgorderCount,
        orderCount,
        allCount,
        allorderCount,
        orgManage
    }
}
</script>
