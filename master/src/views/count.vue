	<template>	
		<!-- 客户业务员统计 -->
	    <div class="myOrder" v-if="$route.path.split('=')[1]==0">
	        <personal-count></personal-count>
	    </div>
	    <!-- 客户部门统计 -->
	    <div class="myOrder" v-if="$route.path.split('=')[1]==1">
	        <org-count></org-count>
	    </div>
	    <!-- 订单业务员统计 -->
	    <div class="myOrder" v-if="$route.path.split('=')[1]==2">
	        <order-count></order-count>
	    </div>
	    <!-- 订单部门统计 -->
	    <div class="myOrder" v-if="$route.path.split('=')[1]==3">
	        <department-count></department-count>
	    </div>
	</template>
	<script>
		import personalCount  from  '../components/count/myCount'
		import orgCount from '../components/count/orgCount'
		import orderCount from  '../components/count/myOrdercount'
		import departmentCount from  '../components/count/directorOrdercount'
		export default {
		    components: {
		        personalCount,
		        orgCount,
		        departmentCount,
		        orderCount
		    }
		}
	</script>