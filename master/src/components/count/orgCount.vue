<template>
	<search-model :param="loadParam" v-if="loadParam.show"></search-model>
	<div class="service-nav clearfix">
		<div class="my_enterprise col-xs-1">部门客户统计</div>
		<div class="right">
	        <button class="new_btn" @click="">导出数据</button>
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
                    <th>业务员名称</th>
                    <th>客户类型</th>
                    <th>客户星级</th>
                    <th>交易模式</th>
                    <th>已成交</th>
					<th>新增用户数</th>
                    <th>复购用户数</th>
                    <th>日期</th>
                    <th>总数</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initClientcount">
                	<td>{{item.name}}</td>
                	<td>{{item.type}}</td>
                	<td>{{item.month}}</td>
                	<td>{{item.week}}</td>
                	<td></td>
                	<td>{{item.daycount}}</td>
                	<td>{{item.total}}</td>
                	<td></td>
                	<td></td>
                </tr>
                <tr>
                	<td>合计</td>
                	<td></td>
                	<td></td>
                	<td></td>
                	<td></td>
                	<td></td>
                	<td></td>
                	<td></td>
                	<td>总数数据</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="base_pagination">
        <pagination :combination="loadParam"></pagination>
    </div>
</template>
<script>
	import {
		initClientcount
	} from '../../vuex/getters'
	import {
		getClientcount
	} from '../../vuex/actions'
	import pagination from  '../pagination'
	import searchModel from  './searchCount'
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
	            loadParam:{
	            	show:false
	            }
	        }
	    },
	    methods:{
	    	search:function(){
	    		this.loadParam.show = true;
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
	        this.getClientcount();
	        console.log(this.initClientcount)
	    }
	}
</script>
<style scoped>
.transfer{
	margin-right: 8px;
}
</style>