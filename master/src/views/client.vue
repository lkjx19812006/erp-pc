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

    <div class="myOrder" v-if="$route.path.split('=')[1]==4">
    <black-client></black-client>
    </div>


</template>
<script>
import myClient from '../components/clientRelate/clientList/myClient'
import orgClient from '../components/clientRelate/clientList/orgClient'
import allClient from '../components/clientRelate/clientList/allClient'
import potentialClient from '../components/clientRelate/clientList/potentialClient'
import blackClient from '../components/clientRelate/clientList/blackClient'

export default {
    components: {
        myClient,
        orgClient,
        allClient,
        potentialClient,
        blackClient
    }

}
</script>
<style scoped>

</style>
