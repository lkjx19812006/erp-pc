<template>
	<div class="service-nav clearfix">
		<div class="my_enterprise col-xs-1">我的客户统计</div>
	</div>
	<div class="order_table">
        <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <div class="clearfix">
        	<table class="table table-hover table_color table-bordered table-striped " v-cloak>
	            <thead>
	                <tr style="background:none;color:#000">
	                    <th rowspan="2">客户总数</th>
	                    <th colspan="4">星级分类</th>
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
	                <tr>
	                	<td>{{initClientcount.total }}</td>
	                	<td v-for="item in initClientcount.level">{{item.count}}</td>
	                	<td v-for="item in initClientcount.type">{{item.count}}</td>
	                </tr>
	            </tbody>
	        </table>
        </div>
        
        <!-- <div class="click_change">
            <span class="date_active" v-bind:class="{ 'date_active': currentView==1}" @click="clickChange(1)">日</span>
            <span v-bind:class="{ 'date_active': currentView==2}" @click="clickChange(2)">周</span>
            <span v-bind:class="{ 'date_active': currentView==3}" @click="clickChange(3)">月</span>
            <span v-bind:class="{ 'date_active': currentView==4}" @click="clickChange(4)">年</span>
        </div> -->

        <div class="click_change">
            <div class="btn-group" >
                 <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': currentView==1}" @click="clickChange(1)">
                    日
                 </button>
                 <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': currentView==2}" @click="clickChange(2)">
                    周
                 </button>
                 <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': currentView==3}" @click="clickChange(3)">
                    月
                 </button>
                 <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': currentView==4}" @click="clickChange(4)">
                    年
                 </button>
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
	                total:0
	            },
	            currentView:1
	        }
	    },
	    methods:{
            clickChange:function(currentView){
                 this.currentView = currentView;   
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
        border-top:0px solid #ddd;
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
    .btn-warning {
        background-color: #fa6705;
    }
</style>