<template>
	<div class="service-nav clearfix">
		<div class="my_enterprise col-xs-1">部门客户统计</div>
	</div>
	<div class="order_table">
        <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <div class="count_top">
        	<table class="table table-hover table_color table-bordered table-striped " v-cloak>
	            <thead>
	                <tr style="background:none;color:#000">
	                    <th rowspan="2">客户总数</th>
	                    <th colspan="3">星级分类</th>
	                    <th colspan="25">客户类型分类</th>
	                </tr>
	                <tr style="background:none;color:#000">
	                	<th>其他</th>
	                    <th>一星</th>
	                    <th>二星</th>
						<th>三星</th>
						<th>其他</th>
						<th>合作社</th>
						<th>药商</th>
						<th>药厂</th>
						<th>个体户</th>
						<th>药店</th>
						<th>贸易公司</th>
						<th>医院</th>
						<th>零售商行</th>
						<th>药农</th>
						<th>介绍人</th>
						<th>药贩子</th>
						<th>产地药商</th>
						<th>销地药商</th>
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
	                	<td v-for="item in initClientcount.level">{{item.count}}</td>
		                <td v-for="item in initClientcount.type">{{item.count}}</td>
	                </tr>
	            </tbody>
	        </table>
        </div>
        <div class="clearfix">
	        <div class="click_change pull-left">
	        	<span class="date_active" v-bind:class="{ 'date_active': isA}" @click="clickday()">日</span>
	        	<span v-bind:class="{ 'date_active': !isA&&isB}" @click="clickweek()">周</span>
	        	<span v-bind:class="{ 'date_active': !isA&&!isB&&!isC}" @click="clickmonth()">月</span>
	        	<span v-bind:class="{ 'date_active': !isA&&!isB&&isC}" @click="clickyear()">年</span>
	        </div>
	        <div class="pull-right" style="margin-top:10px;" v-if="!loadParam.employeeId&&!loadParam.date">
        		<a class="btn btn-default" href="/crm/api/v1/count/getCustomerAddReport?role=org">导出部门统计</a>
        	</div>
        	 <div class="pull-right" style="margin-top:10px;" v-if="!loadParam.employeeId&&loadParam.date">
        		<a class="btn btn-default" href="/crm/api/v1/count/getCustomerAddReport?role=org&amp;date={{loadParam.date}}">导出部门统计1</a>
        	</div> 
        	<div class="pull-right" style="margin-top:10px;" v-if="loadParam.employeeId&&!loadParam.date">
        		<a class="btn btn-default" href="/crm/api/v1/count/getCustomerAddReport?role=emp&amp;employeeId={{loadParam.employeeId}}">导出客户统计</a>
        	</div>
        	<div class="pull-right" style="margin-top:10px;" v-if="loadParam.employeeId&&loadParam.date">
        		<a class="btn btn-default" href="/crm/api/v1/count/getCustomerAddReport?role=emp&employeeId={{loadParam.employeeId}}&date={{loadParam.date}}">导出客户统计1</a>
        	</div>
	        <div class="count_select clearfix pull-right" >
        		<label class="pull-left">业务员：</label>
        		<select class="form-control pull-left" style="width:170px;" v-model="loadParam.employeeId" @change="selectSearch()">
        			<option slected value="">全部</option>
        			<option v-for="item in initEmployeeList" value="{{item.id}}">{{item.name}}</option>
        		</select>
        	</div>
        	<div class="count_select clearfix pull-right">
        		<label class="pull-left">日期：</label>
        		<mz-datepicker :time.sync="loadParam.date" format="yyyy-MM-dd">
                </mz-datepicker>
        	</div>
        	
	    </div>
        <div class="module clear">
        	<div class="module_table" v-show="currentView==1">
        		<div class="module_thead  clearfix" >
        			<div class="module_th">日期</div>
        			<div class="module_th">业务员</div>
        			<div class="module_th">每日新增</div>
        			<!-- <div class="module_th">成交量</div> -->
        			<div class="module_th">撮合新增成交</div>
        			<div class="module_th">自营新增成交</div>
        			<div class="module_th">撮合复购成交</div>
        			<div class="module_th">自营复购成交</div>
        			<div class="module_th">三方新增成交</div>
        			<div class="module_th">三方复购成交</div>
        		</div>
        		<div class="module_tbody" id="module_judge">
        			<div class="module_tr clearfix" v-for="item in initClientcount.day">
        				<div class="module_td">{{item.date}}</div>
        				<div class="module_td">{{item.employeeName}}</div>
	        			<div class="module_td">{{item.count}}</div>
	        			<div class="module_td">{{item.matchAddCount}}</div>
	        			<div class="module_td">{{item.selfAddCount}}</div>
	        			<div class="module_td">{{item.matchRepeatCount}}</div>
	        			<div class="module_td">{{item.selfRepeatCount}}</div>
	        			<div class="module_td">{{item.thirdAddCount}}</div>
	        			<div class="module_td">{{item.thirdRepeatCount}}</div>
        			</div>
        		</div>
        	</div>
        	<div class="module_table" v-show="currentView==2">
        		<div class="module_thead  clearfix">
        			<div class="module_th">日期</div>
        			<div class="module_th">业务员</div>
        			<div class="module_th">每周新增</div>
        			<!-- <div class="module_th">成交量</div> -->
        			<div class="module_th">撮合新增成交</div>
        			<div class="module_th">自营新增成交</div>
        			<div class="module_th">撮合复购成交</div>
        			<div class="module_th">自营复购成交</div>
        			<div class="module_th">三方新增成交</div>
        			<div class="module_th">三方复购成交</div>
        		</div>
        		<div class="module_tbody">
        			<div class="module_tr clearfix" v-for="item in initClientcount.week">
        				<div class="module_td">{{item.date}}</div>
        				<div class="module_td">{{item.employeeName}}</div>
	        			<div class="module_td">{{item.count}}</div>
	        			<div class="module_td">{{item.matchAddCount}}</div>
	        			<div class="module_td">{{item.selfAddCount}}</div>
	        			<div class="module_td">{{item.matchRepeatCount}}</div>
	        			<div class="module_td">{{item.selfRepeatCount}}</div>
	        			<div class="module_td">{{item.thirdAddCount}}</div>
	        			<div class="module_td">{{item.thirdRepeatCount}}</div>
        			</div>
        		</div>
        	</div>
        	<div class="module_table" v-show="currentView==3">
        		<div class="module_thead  clearfix">
        			<div class="module_th">日期</div>
        			<div class="module_th">业务员</div>
        			<div class="module_th">每月新增</div>
        			<!-- <div class="module_th">成交量</div> -->
        			<div class="module_th">撮合新增成交</div>
        			<div class="module_th">自营新增成交</div>
        			<div class="module_th">撮合复购成交</div>
        			<div class="module_th">自营复购成交</div>
        			<div class="module_th">三方新增成交</div>
        			<div class="module_th">三方复购成交</div>
        		</div>
        		<div class="module_tbody">
        			<div class="module_tr clearfix" v-for="item in initClientcount.month">
        				<div class="module_td">{{item.date}}</div>
        				<div class="module_td">{{item.employeeName}}</div>
	        			<div class="module_td">{{item.count}}</div>
	        			<div class="module_td">{{item.matchAddCount}}</div>
	        			<div class="module_td">{{item.selfAddCount}}</div>
	        			<div class="module_td">{{item.matchRepeatCount}}</div>
	        			<div class="module_td">{{item.selfRepeatCount}}</div>
	        			<div class="module_td">{{item.thirdAddCount}}</div>
	        			<div class="module_td">{{item.thirdRepeatCount}}</div>
        			</div>
        		</div>
        	</div>
        	<div class="module_table" v-show="currentView==4">
        		<div class="module_thead  clearfix">
        			<div class="module_th">日期</div>
        			<div class="module_th">业务员</div>
        			<div class="module_th">每年新增</div>
        			<!-- <div class="module_th">成交量</div> -->
        			<div class="module_th">撮合新增成交</div>
        			<div class="module_th">自营新增成交</div>
        			<div class="module_th">撮合复购成交</div>
        			<div class="module_th">自营复购成交</div>
        			<div class="module_th">三方新增成交</div>
        			<div class="module_th">三方复购成交</div>
        		</div>
        		<div class="module_tbody">
        			<div class="module_tr clearfix" v-for="item in initClientcount.year">
        				<div class="module_td">{{item.date}}</div>
        				<div class="module_td">{{item.employeeName}}</div>
	        			<div class="module_td">{{item.count}}</div>
	        			<div class="module_td">{{item.matchAddCount}}</div>
	        			<div class="module_td">{{item.selfAddCount}}</div>
	        			<div class="module_td">{{item.matchRepeatCount}}</div>
	        			<div class="module_td">{{item.selfRepeatCount}}</div>
	        			<div class="module_td">{{item.thirdAddCount}}</div>
	        			<div class="module_td">{{item.thirdRepeatCount}}</div>
        			</div>
        		</div>
        	</div>
        </div>
    </div>
</template>
<script>
	import vSelect from '../tools/vueSelect/components/Select'
	import {
		initClientcount,
		initEmployeeList,
		initLogin
	} from '../../vuex/getters'
	import {
		getClientcount,
		getEmployeeCount,
		getClientOrgcount,
		getExportOrgcount
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
	                link:'/count/getCustomerAdd?role=org',
	                orgId:this.initLogin.orgId,
	                employeeId:'',
	                date:'',
	            },
	            isA:true,
	            isB:false,
	            isC:false,
	            currentView:1
	        }
	    },
	    methods:{
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
	    	clickyear:function(){
	    		this.isB = false;
	    		this.isA = false;
	    		this.isC = true;
	    		this.currentView = 4;
	    	},
	    	selectSearch:function(){
	    		this.getClientcount(this.loadParam);
	    	}
	    },
	    vuex: {
	        getters: {
	            initClientcount,
	            initEmployeeList,
	            initLogin
	        },
	        actions: {
	            getClientcount,
	            getEmployeeCount,
	            getClientOrgcount,
	            getExportOrgcount
	        }
	    },
	    events: {
	        fresh: function(input) {
	            this.loadParam.cur = input;
	            this.getClientOrgcount(this.loadParam);
	        },
	    },
	    created() {
	        this.getClientOrgcount(this.loadParam);
	        this.getEmployeeCount(this.loadParam);
	        console.log(this.initLogin);
	        window.onload=function(){ 
	        	console.log(document.getElementById('module_judge').style.maxHeight)
	        	if(document.getElementById('module_judge').style.maxHeight < 500){
	        		document.getElementsByClassName('module_thead')[0].style.paddingRight = '17px'	}
			} 
	    }
	}
</script>
<style scoped>
	.table{
		display: table;
	}
	.module{
		position: relative;
	}
	.module_table{
		border: 1px solid #ddd;
		max-height:400px; 
		padding: 0;
		position: absolute;
		width: 100%;
		float: left;
		overflow: hidden;
	}
	.module_thead{
		position: absolute;
		z-index: 10;
		left: 0;
		right: 0;
		width:100%;
	}
	.module_tbody{
		margin-top: 30px;
		max-height:500px;
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
		background: #004796;
		color: #fff;
		float: left;
		width: 11.111%;
		line-height: 30px;
	}
	.module_td{
		float: left;
		width:11.111%;
		line-height: 30px;
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
		width: 224px;
		line-height: 30px;
		margin-top: 20px;
	}
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
	.count_top{
		width: 100%;
	}
	.count_select{
		text-align: left;
		padding-left: 16px;
		padding-bottom: 8px;
		padding-top: 8px;
		padding-right: 10px;
	}
	.count_select select{
		border: 1px solid #ddd;
	}
</style>