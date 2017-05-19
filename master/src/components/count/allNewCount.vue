<template>
	<!-- 全部统计 -->
	<boss-view :param="" v-show="loadParam.bossView"></boss-view>
	<!-- 新增用户详情 -->
	<new-userdetail :param="" v-show="loadParam.userDetail"></new-userdetail>
    <!-- 成交用户详情 -->
	<new-dealdetail :param="" v-show="loadParam.dealDetail"></new-dealdetail>
    <!-- 活跃用户详情 -->
	<new-activedetail :param="" v-show="loadParam.activeDetail"></new-activedetail>
    <!-- 区域用户 -->
    <regional-user :param="showParam" v-show="loadParam.regionalUser"></regional-user>
    <!-- 客户类型 -->
    <customer-type :param="showParam" v-show="loadParam.customerType"></customer-type>
</template>

<script>
import bossView from "../count/bossView.vue"
import newUserdetail from '../count/newUserDetail.vue'
import newDealdetail from '../count/newDealDetail.vue'
import newActivedetail from '../count/newActiveDetail.vue'
import regionalUser from '../count/regionalUser.vue'
import customerType from '../count/customerType.vue'

export default{
	components:{
        bossView,
		newUserdetail,
		newDealdetail,
		newActivedetail,
        regionalUser,
        customerType
	},
	data(){
		return {
			loadParam:{
                bossView:true,
                userDetail:false,
                dealDetail:false,
                activeDetail:false,
                regionalUser:false,
                customerType:false
            },
            showParam:{
            	name:'全部',
                countType:'客户统计'
            }
		}
	},
	events:{
		showDetail:function(data){
			console.log(data)
			if(data == "newUserDetail"){//显示新增用户详情
				this.loadParam.bossView = false
                this.loadParam.userDetail = true
                this.loadParam.activeDetail = false
                this.loadParam.dealDetail =false
                this.loadParam.regionalUser = false
                this.loadParam.customerType = false
            }
            if(data == "newActiveDetail"){//显示活跃用户详情
            	this.loadParam.bossView = false
                this.loadParam.userDetail = false
                this.loadParam.activeDetail = true
                this.loadParam.dealDetail =false
                this.loadParam.regionalUser = false
                this.loadParam.customerType = false
            }
            if(data == "newDealDetail"){//显示成交用户详情
            	this.loadParam.bossView = false
                this.loadParam.userDetail = false
                this.loadParam.activeDetail = false
                this.loadParam.dealDetail = true
                this.loadParam.regionalUser = false
                this.loadParam.customerType = false
            }
            if(data == "regionalUser"){//显示区域用户详情
            	this.loadParam.bossView = false
                this.loadParam.userDetail = false
                this.loadParam.activeDetail = false
                this.loadParam.dealDetail =false
                this.loadParam.regionalUser = true
                this.loadParam.customerType = false
            }
            if(data == "customerType"){//显示客户类型详情
            	this.loadParam.bossView = false
                this.loadParam.userDetail = false
                this.loadParam.activeDetail = false
                this.loadParam.dealDetail =false
                this.loadParam.regionalUser = false
                this.loadParam.customerType = true
            }
		},
		back:function(data){
			console.log(data)
			this.loadParam.bossView = true
			if(data == "newUserDetail"){
				this.loadParam.userDetail = false
			}
			if(data == "newActiveDetail"){
				this.loadParam.activeDetail = false
			}
			if(data == "newDealDetail"){
				this.loadParam.dealDetail = false
			}
			if(data == "regionalUser"){
				 this.loadParam.regionalUser = false
			}
			if(data == "customerType"){
				 this.loadParam.customerType = false
			}
		}
	}
}
</script>

<style>
</style>