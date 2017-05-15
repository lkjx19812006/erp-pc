<template>
    <!-- 用户总览 -->
	<overview-count v-show="loadParam.overView"></overview-count>
    <!-- 今日新增详情 -->
	<user-todaydetail v-show="loadParam.todayDetail"></user-todaydetail>
    <!-- 新增用户详情 -->
	<new-userdetail v-show="loadParam.userDetail"></new-userdetail>
    <!-- 成交用户详情 -->
	<new-dealdetail v-show="loadParam.dealDetail"></new-dealdetail>
    <!-- 活跃用户详情 -->
	<new-activedetail v-show="loadParam.activeDetail"></new-activedetail>
    <!-- 我的区域用户 -->
    <regional-user :param="showParam" v-show="loadParam.regionalUser"></regional-user>
    <!-- 客户类型 -->
    <customer-type :param="showParam" v-show="loadParam.customerType"></customer-type>
</template>

<script>
	import overviewCount from "../count/overviewCount.vue"
	import userTodaydetail from "../count/newTodayDetail.vue"
	import newUserdetail from '../count/newUserDetail.vue'
	import newDealdetail from '../count/newDealDetail.vue'
	import newActivedetail from '../count/newActiveDetail.vue'
    import regionalUser from '../count/regionalUser.vue'
    import customerType from '../count/customerType.vue'
    import {initLogin} from '../../vuex/getters'
    import {
        freshRegionalCharts,
        getCusTypeData
    } from '../../vuex/actions'
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
        vuex:{
            actions:{
                freshRegionalCharts,
                getCusTypeData
            },
            getters:{
            }
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
                },
                showParam:{
                    name:'业务员'
                }
			}
		},
        created:function(){
        },
        events:{
            showDetail:function(data,item){
                this.loadParam.overView = false;               
                if(data == "userTodayDetail"){//显示今日新增详情                    
                    this.loadParam.todayDetail = true
                    this.loadParam.userDetail = false
                    this.loadParam.activeDetail = false
                    this.loadParam.dealDetail =false
                    this.loadParam.regionalUser = false
                    this.loadParam.customerType = false
                }
                if(data == "newUserDetail"){//显示新增用户详情
                    this.loadParam.todayDetail = false
                    this.loadParam.userDetail = true
                    this.loadParam.activeDetail = false
                    this.loadParam.dealDetail =false
                    this.loadParam.regionalUser = false
                    this.loadParam.customerType = false
                }
                if(data == "newActiveDetail"){//显示活跃用户详情
                    this.loadParam.todayDetail = false
                    this.loadParam.userDetail = false
                    this.loadParam.activeDetail = true
                    this.loadParam.dealDetail =false
                    this.loadParam.regionalUser = false
                    this.loadParam.customerType = false
                }
                if(data == "newDealDetail"){//显示成交用户详情
                    this.loadParam.todayDetail = false
                    this.loadParam.userDetail = false
                    this.loadParam.activeDetail = false
                    this.loadParam.dealDetail =true
                    this.loadParam.regionalUser = false
                    this.loadParam.customerType = false
                }
                if(data == "regionalUser"){//显示区域用户详情
                    this.loadParam.overView = false;
                    this.loadParam.todayDetail = false
                    this.loadParam.userDetail = false
                    this.loadParam.activeDetail = false
                    this.loadParam.dealDetail =false
                    this.loadParam.regionalUser = true
                    this.loadParam.customerType = false
                }
                if(data == "customerType"){//显示客户类型详情
                    this.loadParam.overView = false;
                    this.loadParam.todayDetail = false
                    this.loadParam.userDetail = false
                    this.loadParam.activeDetail = false
                    this.loadParam.dealDetail =false
                    this.loadParam.regionalUser = false
                    this.loadParam.customerType = true
                }
            },
            back:function(data){
                this.loadParam.overView = true
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
            },
            freshCharts:function(data){
                this.freshRegionalCharts(data)
            },
            freshCus:function(data){
                this.getCusTypeData(data)
            }
        }
	}
</script>

<style>
</style>