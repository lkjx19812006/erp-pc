<template>
	<search-model :param="searchParam" v-if="searchParam.show"></search-model>
	<div class="service-nav clearfix">
		<div class="my_enterprise col-xs-1">我的订单交易统计</div>
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
                    <th>应收账款</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initMyOrderCount">
                    <th>{{$store.state.table.login.name}}</th>
                	<th>{{item.saleAllOrderNumber}}</th>
                    <th>{{item.saleAllOrderAmount}}</th>
                    <th>{{item.saleAllOrderMoney}}元</th>
                    <th>{{item.saleEndOrderNumber}}</th>
                    <th>{{item.saleEndOrderAmount}}</th>
                    <th>{{item.saleEndOrderMoney}}元</th>
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
        <span class="date_active" v-bind:class="{ 'date_active': isA}" @click="clickday()">日</span>
        <span v-bind:class="{ 'date_active': !isA&&isB}" @click="clickweek()">周</span>
        <span v-bind:class="{ 'date_active': !isA&&!isB&&!isC}" @click="clickmonth()">月</span>
        <span v-bind:class="{ 'date_active': !isA&&!isB&&isC&&isD}" @click="clickquarter()">季</span>
        <span v-bind:class="{ 'date_active': !isA&&!isB&&isC&&!isD}" @click="clickyear()">年</span>
    </div>

    <div class="module clear">
        <table class="table table-hover table_color table-bordered table-striped " v-cloak>
            <tr style="background:none;color:#000">
                <th rowspan="1">个人隐藏</th>
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
                <td>{{item.saleAddOrderAmount}}</td>
                <td>{{item.saleAddOrderMoney}}元</td>
                <td>{{item.saleEndOrderNumber}}</td>
                <td>{{item.saleEndOrderAmount}}</td>
                <td>{{item.saleEndOrderMoney}}元</td>
                <td>{{item.buyAddOrderNumber}}</td>
                <td>{{item.buyAddOrderAmount}}</td>
                <td>{{item.buyAddOrderMoney}}元</td>
                <td>{{item.buyEndOrderNumber}}</td>
                <td>{{item.buyEndOrderAmount}}</td>
                <td>{{item.buyEndOrderMoney}}元</td>
            </tr>  

        </table> 
        <div class="module_table" v-show="currentView==1">
              
        </div>

        <div class="module_table" v-show="currentView==2">
              
        </div>

        <div class="module_table" v-show="currentView==3">
            
        </div>

        <div class="module_table" v-show="currentView==4">
            
        </div>


    </div>

    <!-- <div class="base_pagination">
        <pagination :combination="loadParam"></pagination>
    </div> -->
</template>
<script>
	import searchModel from  './searchCount'
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
			searchModel
		},
		data() {
	        return {
	            loadParam: {
	                loading: true,
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
	            searchParam:{
	            	show:false
	            },
                currentView:1,
                isA:true,
                isB:false,
                isC:false,
                isD:false
	        }
	    },
	    methods:{
	    	search:function(){
	    		this.searchParam.show=true;
	    	},
            clickday:function(){
                this.isA = true;
                this.currentView = 1;
                this.timeParam.timeType = "day";
                this.getTimeOrderCount(this.timeParam);
            },
            clickweek:function(){
                this.isB = true;
                this.isA = false;
                this.currentView = 2;
                this.timeParam.timeType = "week";
                this.getTimeOrderCount(this.timeParam);
            },
            clickmonth:function(){
                this.isB = false;
                this.isA = false;
                this.isC = false;
                this.currentView = 3;
                this.timeParam.timeType = "month";
                this.getTimeOrderCount(this.timeParam);
            },
            clickquarter:function(){
                this.isB = false;
                this.isA = false;
                this.isC = true;
                this.isD = true;
                this.currentView = 4;
                this.timeParam.timeType = "quarter";
                this.getTimeOrderCount(this.timeParam);
            },
            clickyear:function(){
                this.isB = false;
                this.isA = false;
                this.isC = true;
                this.isD = false;
                this.currentView = 5;
                this.timeParam.timeType = "year";
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
</style>