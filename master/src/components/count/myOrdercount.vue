<template>

	<div class="service-nav clearfix">
		<div class="my_enterprise col-xs-1">我的订单交易统计</div>
		
	</div>
	<div class="order_table">
        <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <table class="table table-hover table_color table-bordered table-striped " v-cloak>
            <thead>
                <tr style="background:none;color:#000">
                    <th rowspan="1"></th>
                    <th colspan="10">销售订单</th>
                    <th colspan="10">采购订单</th>
                </tr>
                <tr style="background:none;color:#000">
                    <th rowspan="2">业务员/部门</th>
                    <th colspan="3">全部订单</th>
                    <th colspan="3">全部已完成</th>
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
                    <th>应付账款</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initMyOrderCount">
                    <th>{{$store.state.table.login.name}}</th>
                	<th>{{item.saleAllOrderNumber}}</th>
                    <th>{{item.saleAllOrderAmount}}kg</th>
                    <th>{{item.saleAllOrderMoney}}元</th>
                    <th>{{item.saleEndOrderNumber}}</th>
                    <th>{{item.saleEndOrderAmount}}kg</th>
                    <th>{{item.saleEndOrderMoney}}元</th>
                    <th>{{item.saleIngOrderNumber}}</th>
                    <th>{{item.saleIngOrderAmount}}kg</th>
                    <th>{{item.saleIngOrderMoney}}元</th>
                    <th>{{item.saleIngOrderUnpaid}}元</th>
                    <th>{{item.buyAllOrderNumber}}</th>
                    <th>{{item.buyAllOrderAmount}}kg</th>
                    <th>{{item.buyAllOrderMoney}}元</th>
                    <th>{{item.buyEndOrderNumber}}</th>
                    <th>{{item.buyEndOrderAmount}}kg</th>
                    <th>{{item.buyEndOrderMoney}}元</th>
                    <th>{{item.buyIngOrderNumber}}</th>
                    <th>{{item.buyIngOrderAmount}}kg</th>
                    <th>{{item.buyIngOrderMoney}}元</th>
                    <th>{{item.buyIngOrderUnpaid}}元</th>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- <div class="click_change">
        <span class="date_active" v-bind:class="{ 'date_active': timeParam.timeType=='day'}" @click="clickChange('day')">日</span>
        <span v-bind:class="{ 'date_active': timeParam.timeType=='week'}" @click="clickChange('week')">周</span>
        <span v-bind:class="{ 'date_active': timeParam.timeType=='month'}" @click="clickChange('month')">月</span>
        <span v-bind:class="{ 'date_active': timeParam.timeType=='quarter'}" @click="clickChange('quarter')">季</span>
        <span v-bind:class="{ 'date_active': timeParam.timeType=='year'}" @click="clickChange('year')">年</span>
    </div> -->

    <div class="btn-group" style="margin-top:20px">
         <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': timeParam.timeType=='day'}" @click="clickChange('day')">
            日
         </button>
         <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': timeParam.timeType=='week'}" @click="clickChange('week')">
            周
         </button>
         <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': timeParam.timeType=='month'}" @click="clickChange('month')">
            月
         </button>
         <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': timeParam.timeType=='quarter'}" @click="clickChange('quarter')">
            季
         </button>
         <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': timeParam.timeType=='year'}" @click="clickChange('year')">
            年
         </button>
     </div>

    <div class="module clear">
        <table class="table table-hover table_color table-bordered table-striped " v-cloak>
            <tr style="background:none;color:#000">
                <th rowspan="1"></th>
                <th colspan="6">销售订单</th>
                <th colspan="6">采购订单</th>
            </tr>
            <tr style="background:none;color:#000">
                <!-- <th rowspan="2">业务员/部门</th> -->
                <th rowspan="2">时间</th>
                <th colspan="3">新增汇总</th>
                <th colspan="3">已完成</th>
                <th colspan="3">新增汇总</th>
                <th colspan="3">已完成</th>
                
            </tr>
            <tr style="background:none;color:#000" >
                <th>订单数</th>
                <th>重量</th>
                <th>订单金额</th>
                <th>订单数</th>
                <th>重量</th>
                <th>订单金额</th>
                <th>订单数</th>
                <th>重量</th>
                <th>订单金额</th>
                <th>订单数</th>
                <th>重量</th>
                <th>订单金额</th>
            </tr>

            <tr v-for="item in initMyTimeOrderCount">
                <td>
                    <div v-if="timeParam.timeType=='day'">{{item.date}}</div>
                    <div v-if="timeParam.timeType=='week'">{{item.date}}周</div>
                    <div v-if="timeParam.timeType=='month'">{{item.date}}月</div>
                    <div v-if="timeParam.timeType=='quarter'">{{item.date}}季度</div>
                    <div v-if="timeParam.timeType=='year'">{{item.date}}年</div>
                </td>
                <td>{{item.saleAddOrderNumber}}</td>
                <td>{{item.saleAddOrderAmount}}kg</td>
                <td>{{item.saleAddOrderMoney}}元</td>
                <td>{{item.saleEndOrderNumber}}</td>
                <td>{{item.saleEndOrderAmount}}kg</td>
                <td>{{item.saleEndOrderMoney}}元</td>
                <td>{{item.buyAddOrderNumber}}</td>
                <td>{{item.buyAddOrderAmount}}kg</td>
                <td>{{item.buyAddOrderMoney}}元</td>
                <td>{{item.buyEndOrderNumber}}</td>
                <td>{{item.buyEndOrderAmount}}kg</td>
                <td>{{item.buyEndOrderMoney}}元</td>
            </tr>  

        </table>       
    </div>
   
</template>
<script>
	import {
		initMyOrderCount,
        initMyTimeOrderCount
	} from '../../vuex/getters'
	import {
		getOrderCount,
        getTimeOrderCount
	} from '../../vuex/actions'
	import pagination from  '../pagination'
	export default {
		components:{
			pagination,
			
		},
		data() {
	        return {
	            loadParam: {
	                loading: true,
                    color: '#5dc596',
                    size: '15px',
                    link:"/report/order/employee",
                    key:"myOrderCount",
                    focus:'all',    
                    employeeId:this.$store.state.table.login.id
	            },
                timeParam: {
                    loading: true,
                    link:"/report/order/timeRange",
                    timeType:"day",  
                    objType:"employee" ,
                    objId:this.$store.state.table.login.id, 
                },
                currentView:1,
	        }
	    },
	    methods:{
            clickChange:function(timeType){
                this.timeParam.timeType = timeType;
                this.getTimeOrderCount(this.timeParam);
            }
	    },
	    vuex: {
	        getters: {
	            initMyOrderCount,
                initMyTimeOrderCount
	        },
	        actions: {
	            getOrderCount,
                getTimeOrderCount
	        }
	    },
	    events: {
	        
	    },
	    created() {
	        this.getOrderCount(this.loadParam);
            this.getTimeOrderCount(this.timeParam);
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
    .table{
        margin-bottom: 20px;
        position: relative;
        display: table;
    }
    .btn-warning {
        background-color: #fa6705;
    }
</style>