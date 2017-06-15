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
    <!-- 客户总览统计 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==7">
        <client-overview></client-overview>
    </div>
    <!-- 订单业务员统计 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==2">
        <order-count></order-count>
    </div>
    <!-- 订单部门统计 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==3">
        <orgorder-count></orgorder-count>
    </div>
    <!-- 业务总览报表-->
    <div class="myOrder" v-if="$route.path.split('=')[1]==5">
        <org-manage></org-manage>
    </div>
    <!-- 全部订单统计 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==6">
        <allorder-count></allorder-count>
    </div>
    <!-- 我的统计（新） -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==8">
        <my-newcount></my-newcount>
    </div>
    <!-- 部门统计（新） -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==9">
        <all-orgcount></all-orgcount>
    </div>
    <!-- 全部统计（新） -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==10">
        <all-newcount></all-newcount>
    </div>
    <!-- 我的品种统计（新） -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==11">
        <my-breedcount></my-breedcount>
    </div>
    <!-- 部门品种统计（新） -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==12">
        <org-breedcount></org-breedcount>
    </div>
    <!-- 全部品种统计（新） -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==13">
        <all-breedcount></all-breedcount>
    </div>
    <!-- 订单信息统计（新） -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==14">
        <new-order-count></new-order-count>
    </div>
    <!-- 品种信息统计（新） -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==15">
        <breed-count></breed-count>
    </div>
    <!-- 收付费信息统计（新） -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==16">
        <bill-count></bill-count>
    </div>
    <!-- 客户信息统计（新） -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==17">
        <new-customer-count></new-customer-count>
    </div>
    <!-- 供应商信息统计（新） -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==18">
        <new-supplier-count></new-supplier-count>
    </div>
</template>
<script>
import allBreedcount from '../components/count/allBreedCount'
import billCount from '../components/count/billCount'
import breedCount from '../components/count/breedCount'
import orgBreedcount from '../components/count/orgBreedCount'
import myBreedcount from '../components/count/myBreedCount'
import personalCount from '../components/count/myCount'
import managerView from '../components/count/managerView'
import allNewcount from '../components/count/allNewCount'
import allOrgcount from '../components/count/allOrgCount'
import myNewcount from '../components/count/myNewcount'
import orgCount from '../components/count/orgCount'
import orderCount from '../components/count/myOrdercount'
import orgorderCount from '../components/count/orgOrdercount'
import allCount from '../components/count/allClientCount'
import clientOverview from '../components/count/clientOverview'
import allorderCount from '../components/count/allOrderCount'
import orgManage from '../components/count/orgManage'
import newOrderCount from '../components/count/newOrderCount'
import newCustomerCount from '../components/count/newCustomerCount'
import newSupplierCount from '../components/count/newSupplierCount'
export default {
    components: {
        personalCount,
        orgBreedcount,
        myBreedcount,
        allBreedcount,
        orgCount,
        allOrgcount,
        allNewcount,
        managerView,
        orgorderCount,
        orderCount,
        allCount,
        clientOverview,
        allorderCount,
        orgManage,
        myNewcount,
        newOrderCount,
        breedCount,
        billCount,
        newCustomerCount,
        newSupplierCount
    }
}
</script>
