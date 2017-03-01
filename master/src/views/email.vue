<template>

    <!-- 邮箱列表 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==0">
         <email-list></email-list>
    </div>
    <!-- 部门客户 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==1">
        <email-count></email-count>
    </div>
    

</template>
<script>
import emailList from '../components/email/emailList'
import emailCount from '../components/email/emailCount'
export default {
    components: {
        emailList,
        emailCount    
    }

}
</script>
<style scoped>

</style>
