<template>
	<div class="service-nav clearfix">
		<div class="my_enterprise col-xs-1">我的客户统计</div>
	</div>
	<div class="order_table">
        <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <div class="">
        	<table class="table table-hover table_color table-bordered table-striped " v-cloak>
	            <thead>
	                <tr style="background:none;color:#000">
	                    <th>业务员</th>
	                    <th colspan="3">星级分类</th>
	                    <th colspan="25">客户类型分类</th>
	                </tr>
	                <tr style="background:none;color:#000">
	                    <th></th>
	                    <th>一星</th>
	                    <th>二星</th>
						<th>三星</th>
						<th>其他</th>
						<th>合作社</th>
						<th>药商</th>
						<th>个体户</th>
						<th>药厂</th>
						<th>药店</th>
						<th>贸易公司</th>
						<th>医院</th>
						<th>零售商行</th>
						<th>药农</th>
						<th>介绍人</th>
						<th>药贩子</th>
						<th>产地药商</th>
						<th>养生诊所</th>
						<th>化工厂</th>
						<th>化妆品厂</th>
						<th>提取物厂</th>
						<th>食品厂</th>
						<th>实验室</th>
						<th>网上电商</th>
						<th>中成药生产商</th>
						<th>西药生产商</th>
						<th>饮片厂</th>
	                </tr>
	            </thead>
	            <tbody>
	                <tr >
	                	<td>{{item.name }}</td>
	                	<td>{{item.date}}</td>
	                	<td>{{item.count}}</td>
	                	<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
						<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
						<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
	                	<td>111</td>
	                	<td></td>
	                </tr>
	            </tbody>
	        </table>
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
        <div class="click_change">
        	<span class="date_active" v-bind:class="{ 'date_active': isA}" @click="clickday()">日</span>
        	<span v-bind:class="{ 'date_active': !isA&&isB}" @click="clickweek()">周</span>
        	<span v-bind:class="{ 'date_active': !isA&&!isB}" @click="clickmonth()">月</span>
        </div>
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
	                link:'/count/getCustomerAdd'
	            },
	            isA:true,
	            isB:false,
	        }
	    },
	    methods:{
	    	clickday:function(){
	    		this.isA = true;
	    	},
	    	clickweek:function(){
	    		this.isB = true;
	    		this.isA = false;
	    	},
	    	clickmonth:function(){
	    		this.isB = false;
	    		this.isA = false;
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
	        console.log(this.initClientcount);
	        window.onload=function(){ 
	        	console.log(document.getElementById('module_judge').style.maxHeight)
	        	if(document.getElementById('module_judge').style.maxHeight < 200){
	        		document.getElementsByClassName('module_thead')[0].style.paddingRight = '17px'	}
			} 
	    }
	}
</script>
<style scoped>
	.module{
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
		margin-top: 30px;
		max-height:200px;
		line-height:25px;
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
		line-height: 30px;
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
	.click_change{
		text-align: left;
		border: 1px solid #ddd;
		border-bottom: none;
		border-right: none;
		width: 136px;
	}
	.click_change span{
		padding:0 15px;
		display: inline-block;
		border-right: 1px solid #ddd;
		cursor: pointer;
	}
	.date_active{
		background: #fa6705;
		color: #fff;
	}
</style>