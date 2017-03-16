<template>
  <div>
    <!-- 权限管理 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==0">
      <view-model></view-model> 
    </div>
    <!-- 角色管理 -->
    <div class="myOrder" v-if="$route.path.split('=')[1]==1">
      <role-model></role-model>
    </div>
  </div>
 
</template>

<script>
import viewModel  from '../components/role/scopeList.vue'
import roleModel from '../components/role/roleList.vue'
export default {
    components:{
        viewModel,
        roleModel
    }
  }
</script>
<style scoped>

</style>
