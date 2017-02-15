<template>

    <!-- 我的客户 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==0">
         <my-client></my-client>
    </div>
    <!-- 部门客户 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==1">
        <org-client></org-client>
    </div>
    <!-- 所有客户 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==2">
        <all-client></all-client>
    </div>
    <!-- 潜在客户 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==3">
        <potential-client></potential-client>
    </div>
    <!-- 黑名单客户 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==4">
        <black-client></black-client>
    </div>
    <!-- 客户通话记录 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==5">
        <call-record></call-record>
    </div>
    <!-- 客户通话记录统计 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==6">
        <call-count></call-count>
    </div>

</template>
<script>
import myClient from '../components/clientRelate/clientList/myClient'
import orgClient from '../components/clientRelate/clientList/orgClient'
import allClient from '../components/clientRelate/clientList/allClient'
import potentialClient from '../components/clientRelate/clientList/potentialClient'
import blackClient from '../components/clientRelate/clientList/blackClient'
import callRecord from '../components/clientRelate/clientList/callRecord'
import callCount from '../components/clientRelate/clientList/callRecordCount'
export default {
    components: {
        myClient,
        orgClient,
        allClient,
        potentialClient,
        blackClient,
        callRecord,
        callCount
    }

}
</script>
<style scoped>

</style>
