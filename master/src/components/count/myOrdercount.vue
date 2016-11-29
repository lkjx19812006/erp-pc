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
        <table class="table table-hover table_color table-striped " v-cloak>
            <thead>
                <tr>
                    <th>订单类别</th>
                    <th>客户类型</th>
                    <th>交易模式</th>
                    <th>金额（RMB）</th>
                    <th>数量（公斤）</th>
                    <th>订单单数</th>
                    <th>订单笔数</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initClientcount">
                	<td>{{item.name}}</td>
                	<td>{{item.type}}</td>
                	<td>{{item.month}}</td>
                	<td>{{item.week}}</td>
                	<td>{{item.daycount}}</td>
                	<td>{{item.total}}</td>
                	<td>{{item.total}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="base_pagination">
        <pagination :combination="loadParam"></pagination>
    </div>
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
	            }
	        }
	    },
	    methods:{
	    	search:function(){
	    		this.searchParam.show=true;
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
	
</style>