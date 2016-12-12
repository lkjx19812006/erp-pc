<template>
	<search-model :param="searchParam" v-if="searchParam.show"></search-model>
	<div class="service-nav clearfix">
		<div class="my_enterprise col-xs-1">部门订单交易统计</div>
		<div class="right">
	        <button class="new_btn transfer" @click="search()">搜索</button>
	    </div>
	</div>

    <div class="order_table">
        <!-- <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
        </div> -->
        <table class="table table-hover table_color table-bordered table-striped " v-cloak>
            <thead>
                <tr style="background:none;color:#000">
                    <th rowspan="1">个人隐藏</th>
                    <th colspan="12">销售订单</th>
                    <th colspan="12">采购订单</th>
                </tr>
                <tr style="background:none;color:#000">
                    <th rowspan="2">业务员/部门</th>
                    <th colspan="3">全部订单</th>
                    <th colspan="5">全部已完成</th>
                    <th colspan="4">进行中订单</th>
                    <th colspan="3">全部订单</th>
                    <th colspan="3">全部已完成</th>
                    <th colspan="4">进行中订单</th>
                </tr>
                <tr style="background:none;color:#000">
                    <th>订单数</th>
                    <th>重量</th>
                    <th>订单金额</th>
                    <th>订单数</th>
                    <th>重量</th>
                    <th>订单金额</th>
                    <th>利润</th>
                    <th>利润率</th>
                    <th>订单数</th>
                    <th>重量</th>
                    <th>订单金额</th>
                    <th>应收账款</th>
                    <th>订单数</th>
                    <th>重量</th>
                    <th>订单金额</th>
                    <th>订单数</th>
                    <th>重量</th>
                    <th>订单金额</th>
                    <th>订单数</th>
                    <th>重量</th>
                    <th>订单金额</th>
                    <th>应收账款</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initOrgOrderCount">
                    <th>{{item.id}}</th>
                    <th>{{item.saleAllOrderNumber}}</th>
                    <th>{{item.saleAllOrderAmount}}</th>
                    <th>{{item.saleAllOrderMoney}}元</th>
                    <th>{{item.saleEndOrderNumber}}</th>
                    <th>{{item.saleEndOrderAmount}}</th>
                    <th>{{item.saleEndOrderMoney}}元</th>
                    <th>{{item.profit}}元</th>
                    <th>{{item.profitMargin}}</th>
                    <th>{{item.saleIngOrderNumber}}</th>
                    <th>{{item.saleIngOrderAmount}}</th>
                    <th>{{item.saleIngOrderMoney}}元</th>
                    <th>{{item.saleIngOrderUnpaid}}元</th>
                    <th>{{item.buyAllOrderNumber}}</th>
                    <th>{{item.buyAllOrderAmount}}</th>
                    <th>{{item.buyAllOrderMoney}}元</th>
                    <th>{{item.buyEndOrderNumber}}</th>
                    <th>{{item.buyEndOrderAmount}}</th>
                    <th>{{item.buyEndOrderMoney}}元</th>
                    <th>{{item.buyIngOrderNumber}}</th>
                    <th>{{item.buyIngOrderAmount}}</th>
                    <th>{{item.buyIngOrderMoney}}元</th>
                    <th>{{item.buyIngOrderUnpaid}}元</th>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="click_change">
        <span class="date_active" v-bind:class="{ 'date_active': orderSort=='type'}" @click="changeOrderSort('type')">客户类型</span>
        <span v-bind:class="{ 'date_active': orderSort=='address'}" @click="changeOrderSort('address')">客户所在地</span>
        <span v-bind:class="{ 'date_active': orderSort=='breed'}" @click="changeOrderSort('breed')">品种</span>
        <span v-bind:class="{ 'date_active': orderSort=='location'}" @click="changeOrderSort('location')">产地</span>
        <span v-bind:class="{ 'date_active': orderSort=='other'}" @click="changeOrderSort('other')">辅材其他</span>
    </div>

    

	<div class="order_table">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-bordered table-striped " v-cloak>
                <thead>
                    <tr style="background:none;color:#000">
                        <th>序号</th>
                        <th>
                            <span v-if="orderSort=='type'">客户类型</span>
                            <span v-if="orderSort=='address'">地区</span>
                            <span v-if="orderSort=='breed'">品种</span>
                            <span v-if="orderSort=='location'">产地</span>
                            <span v-if="orderSort=='other'">其他</span>
                        </th>
                        <th>订单数</th>
                        <th>重量</th>
                        <th>订单金额</th>
                        <th>利润</th>
                        <th>利润率</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initOrgOrderSortCount">
                        <td width="100px">{{$index+1}}</td>
                        <td width="100px">{{item.focuName}}</td>
                        <td width="100px">{{item.saleAllOrderNumber}}</td>
                        <td width="100px">{{item.saleAllOrderAmount}}</td>
                        <td width="100px">{{item.saleAllOrderMoney}}元</td>
                        <td width="100px">{{item.profit}}元</td>
                        <td width="100px">{{item.profitMargin}}</td>
                    </tr>
                </tbody>
            </table>
    
        </div>
    
</template>
<script>
	import searchModel from  './searchCount'
	import {
		initOrgOrderCount,
        initOrgOrderSortCount
	} from '../../vuex/getters'
	import {
		getOrderCount
	} from '../../vuex/actions'
	import pagination from  '../pagination'
	export default {
		components:{
			pagination,
			searchModel
		},
		data() {
	        return {
	            loadParam: {
                    loading: true,
                    link:"/report/order/org",
                    key:"orgOrderCount",
                    focus:'all',    
                    orgId:this.$store.state.table.login.orgId
                },
                sortParam:{
                    loading: true,
                    link:"/report/order/org",
                    key:"orgOrderSortCount",
                    focus:'custRegion',    
                    orgId:this.$store.state.table.login.orgId  
                },
	            searchParam:{
	            	show:false
	            },
                orderSort:"type",
	        }
	    },
	    methods:{
	    	search:function(){
	    		this.searchParam.show=true;
	    	},
            changeOrderSort:function(orderSort){
                this.orderSort = orderSort;
            }
	    },
	    vuex: {
	        getters: {
	            initOrgOrderCount,
                initOrgOrderSortCount
	        },
	        actions: {
	            getOrderCount
	        }
	    },
	    events: {
	        
	    },
	    created() {
	        this.getOrderCount(this.loadParam);
            this.getOrderCount(this.sortParam);
	        console.log(this.initClientcount)
	    }
	}
</script>
<style scoped>
.click_change span{
    padding:0 20px;
    display: inline-block;
    border-right: 1px solid #ddd;
    cursor: pointer;
}
.date_active{
    background: #fa6705;
    color: #fff;
}
	
</style>