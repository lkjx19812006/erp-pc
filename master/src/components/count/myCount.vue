<template>
	<div class="service-nav clearfix">
		<div class="my_enterprise col-xs-1">我的客户统计</div>
	</div>
	<div class="order_table">
        <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <!-- <table class="table table-hover table_color table-striped " v-cloak>
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
        </table> -->
        <div class="module clear">
        	<div class="module_table">
        		<div class="module_thead  clearfix" >
        			<div class="module_th">日期</div>
        			<div class="module_th">业务员</div>
        			<div class="module_th">每日新增</div>
        			<div class="module_th">成交量</div>
        		</div>
        		<div class="module_tbody" id="module_judge">
        			<div class="module_tr clearfix" v-for="item in initClientcount.day">
        				<div class="module_td">{{item.date}}</div>
        				<div class="module_td">{{item.employeeName}}</div>
	        			<div class="module_td">{{item.count}}</div>
	        			<div class="module_td">{{item.count}}</div>
        			</div>
        		</div>
        	</div>
        	<div class="module_table table_week">
        		<div class="module_thead  clearfix">
        			<div class="module_th">业务员</div>
        			<div class="module_th">每周新增</div>
        			<div class="module_th">成交类型</div>
        			<div class="module_th">成交量</div>
        		</div>
        		<div class="module_tbody">
        			<div class="module_tr clearfix">
        				<div class="module_td">1434</div>
	        			<div class="module_td">22</div>
	        			<div class="module_td">4444444444</div>
	        			<div class="module_td">rr</div>
        			</div>
        		</div>
        	</div>
        	<div class="module_table"></div>
        </div>
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
	export default {
		components:{
			pagination
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
	            }

	        }
	    },
	    methods:{

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
	        console.log(this.initClientcount);
	        window.onload=function(){ 
	        	if(document.getElementById('module_judge').style.maxheight <200){
	        		document.getElementsByClassName('module_thead')[0].css('padding-left','17px');	        	}
			} 
	    }
	}
</script>
<style scoped>
	.module{
		/* border: 1px solid red; */
		/* height: 400px; */
		position: relative;
	}
	.module_table{
		border: 1px solid #ddd;
		max-height:400px; 
		padding: 0;
		position: absolute;
		width: 500px;
		float: left;
		overflow: hidden;
	}
	.table_week{
		left: 510px;
	}
	.module_thead{
		position: absolute;
		z-index: 10;
		left: 0;
		right: 0;
		width:500px;
	}
	.module_tbody{
		margin-top: 24px;
		max-height:200px;
		overflow: auto;
	}
	.module_tr{
		border-bottom: 1px solid #ddd;
	}
	.module_tr:last-of-type{
		border-bottom: none;
	}
	.module_th{
		background: #fa6705;
		color: #fff;
		float: left;
		width: 25%;
	}
	.module_td{
		float: left;
		width: 25%;
	}
	.module_th,.module_td{
		border-right: 1px solid #ddd;
	}
	.module_th:last-of-type,.module_td:last-of-type{
		border-right: none;
	}
</style>