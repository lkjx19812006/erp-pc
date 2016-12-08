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
                    <th></th>
                	<th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
                    <th>1</th>
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
                <th rowspan="2">业务员/部门</th>
                <th colspan="3">新增汇总</th>
                <th colspan="3">已完成</th>
                <th colspan="3">新增汇总</th>
                <th colspan="3">已完成</th>
                
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
                <th>订单数</th>
                <th>重量</th>
                <th>订单金额</th>
            </tr>

            <tr>
                <td>马小林</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
            </tr>  

        </table> 
        <div class="module_table" v-show="currentView==1">
            <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
            </tr>    
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
		initClientcount
	} from '../../vuex/getters'
	import {
		getClientcount
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
	                show:false,
	                color: '#5dc596',
	                size: '15px',
	                cur: 1,
	                all: 7,
	                total:0
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
            },
            clickweek:function(){
                this.isB = true;
                this.isA = false;
                this.currentView = 2;
            },
            clickmonth:function(){
                this.isB = false;
                this.isA = false;
                this.isC = false;
                this.currentView = 3;
            },
            clickquarter:function(){
                this.isB = false;
                this.isA = false;
                this.isC = true;
                this.isD = true;
                this.currentView = 4;
            },
            clickyear:function(){
                this.isB = false;
                this.isA = false;
                this.isC = true;
                this.isD = false;
                this.currentView = 5;
            }

	    },
	    vuex: {
	        getters: {
	            initClientcount
	        },
	        actions: {
	            getClientcount
	        }
	    },
	    events: {
	        fresh: function(input) {
	            this.loadParam.cur = input;
	            this.getClientcount(this.loadParam);
	        },
	    },
	    created() {
	        this.getClientcount(this.loadParam);
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