<template>
	<search-model :param="loadParam" v-if="loadParam.show"></search-model>
	<div class="service-nav clearfix">
		<div class="my_enterprise col-xs-1">我的客户统计</div>
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
                    <th>统计方式</th>
                    <th>日期</th>
                    <th>总数</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initClientcount">
                	<td>{{item.name }}</td>
                	<td>{{item.date}}</td>
                	<td>{{item.count}}</td>
                </tr>
            </tbody>
        </table>
        <div class="module clearfix">
        	<div class="col-md-4 module_table">
        			
        	</div>
        	<div class="col-md-4 module_table"></div>
        	<div class="col-md-4 module_table"></div>
        </div>
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
	                total:0,
	                link:'/count/getCustomerAdd',
	                dayType:{
	                	countType:"day",
	                	date:''
	                },
	                weekType:{
	                	countType:"week",
	                	date:''
	                },
	                monthType:{
	                	countType:"month",
	                	date:''
	                },
	                yearType:{
	                	countType:"year",
	                	date:''
	                },
	            }

	        }
	    },
	    methods:{
	    	search:function(){
	    		this.loadParam.show=true;
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
	.module{
		border: 1px solid red;
	}
	.module_table{
		border: 1px solid #ddd;
		max-height:500px; 
	}
</style>