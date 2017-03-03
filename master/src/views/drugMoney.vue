<template>
    <!-- 药款账户 -->
    <div class="service-data" v-if="$route.path.split('=')[1]==0">
        <account-model></account-model>
    </div>
    <!-- 药款提现申请 -->
    <div class="service-data" v-if="$route.path.split('=')[1]==1">
        <withdraw-model></withdraw-model>
    </div>
</template>
<script>
import accountModel from '../components/drugs/drugsList/account'
import withdrawModel from '../components/drugs/drugsList/withdraw'


export default {
    components: {
        accountModel,
        withdrawModel,

    },
    data() {
        return {

        }
    }
}
</script>
<style scoped>
.service-data {
    width: 100%;
    white-space: nowrap;
}
</style>
