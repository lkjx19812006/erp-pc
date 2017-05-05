<template>
	<overview-count v-show="loadParam.overView"></overview-count>
	<user-todaydetail v-show="loadParam.todayDetail"></user-todaydetail>
	<new-userdetail v-show="loadParam.userDetail"></new-userdetail>
	<new-dealdetail v-show="loadParam.dealDetail"></new-dealdetail>
	<new-activedetail v-show="loadParam.activeDetail"></new-activedetail>
    <regional-user v-show="loadParam.regionalUser"></regional-user>
    <customer-type v-show="loadParam.customerType"></customer-type>
</template>

<script>
	import overviewCount from "../count/overviewCount.vue"
	import userTodaydetail from "../count/newTodayDetail.vue"
	import newUserdetail from '../count/newUserDetail.vue'
	import newDealdetail from '../count/newDealDetail.vue'
	import newActivedetail from '../count/newActiveDetail.vue'
    import regionalUser from '../count/regionalUser.vue'
    import customerType from '../count/customerType.vue'
	export default {
		components:{
			overviewCount,
			userTodaydetail,
			newUserdetail,
			newDealdetail,
			newActivedetail,
            regionalUser,
            customerType
		},
		data(){
			return {
				loadParam:{
                    overView:true,
                    todayDetail:false,
                    userDetail:false,
                    dealDetail:false,
                    activeDetail:false,
                    regionalUser:false,
                    customerType:false
                }
			}
		},
        events:{
            showDetail:function(data){
                this.loadParam.overView = false;
                if(data == "userTodayDetail"){
                    this.loadParam.todayDetail = true
                    this.loadParam.userDetail = false
                    this.loadParam.activeDetail = false
                    this.loadParam.dealDetail =false
                    this.loadParam.regionalUser = false
                    this.loadParam.customerType = false
                }
                if(data == "newUserDetail"){
                    this.loadParam.todayDetail = false
                    this.loadParam.userDetail = true
                    this.loadParam.activeDetail = false
                    this.loadParam.dealDetail =false
                    this.loadParam.regionalUser = false
                    this.loadParam.customerType = false
                }
                if(data == "newActiveDetail"){
                    this.loadParam.todayDetail = false
                    this.loadParam.userDetail = false
                    this.loadParam.activeDetail = true
                    this.loadParam.dealDetail =false
                    this.loadParam.regionalUser = false
                    this.loadParam.customerType = false
                }
                if(data == "newDealDetail"){
                    this.loadParam.todayDetail = false
                    this.loadParam.userDetail = false
                    this.loadParam.activeDetail = false
                    this.loadParam.dealDetail =true
                    this.loadParam.regionalUser = false
                    this.loadParam.customerType = false
                }
                if(data == "regionalUser"){
                    this.loadParam.todayDetail = false
                    this.loadParam.userDetail = false
                    this.loadParam.activeDetail = false
                    this.loadParam.dealDetail =false
                    this.loadParam.regionalUser = true
                    this.loadParam.customerType = false
                }
                if(data == "customerType"){
                    this.loadParam.todayDetail = false
                    this.loadParam.userDetail = false
                    this.loadParam.activeDetail = false
                    this.loadParam.dealDetail =false
                    this.loadParam.regionalUser = false
                    this.loadParam.customerType = true
                }
            },
            back:function(data){
                this.loadParam.overView  = true;
                if(data == "newTodayDetail"){
                    this.loadParam.todayDetail = false;
                }
                if(data == "newUserDetail"){
                    this.loadParam.userDetail = false;
                }
                if(data == "newActiveDetail"){
                    this.loadParam.activeDetail = false;
                }
                if(data == "newDealDetail"){
                    this.loadParam.dealDetail = false;
                }
                if(data == "regionalUser"){
                    this.loadParam.regionalUser = false;
                }
                if(data == "customerType"){
                    this.loadParam.customerType = false;
                }
                
            }
        }
	}
</script>

<style>
</style>