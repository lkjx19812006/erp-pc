<template>
    <div class="box" style="max-height: 100%;overflow: auto;">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">{{param.name}}总览</div>
            <div class="btn btn-primary right" @click="toBackPage()">{{$t('static.back')}}</div>
        </div>
        <div class="user_all">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <!-- 折线图 -->
            <div class="line_today">
                <h4 class="detail_title bg-info">总览
                <div class="timePick">
                	<div class="left">
			            <dt class="left transfer marg_top" style="margin-top:15px">{{$t('static.start_end')}}：</dt>
			            <mz-datepicker :time.sync="searchParam.startTime" format="yyyy-MM-dd HH:mm:ss">
			            </mz-datepicker>
			        </div>
			        <div class="left">
			            <dt class="left marg_top" style="margin-top:15px">~~</dt>
			            <mz-datepicker :time.sync="searchParam.endTime" format="yyyy-MM-dd HH:mm:ss">
			            </mz-datepicker>
	        		</div>
	        		<button class="btn btn-default" style="margin-left:10px" @click="search()">搜索</button>
                </div>					
                </h4>               
                <div class="line_chart" v-if="param.name=='业务员'">
                    <div class="linechart" v-echarts="getRegionalchart.options" :loading="getRegionalchart.load"></div>
                </div>
                <div class="line_chart" v-if="param.name=='部门'">
                    <div class="linechart" v-echarts="getOrgRegionalchart.options" :loading="getOrgRegionalchart.load"></div>
                </div>
                <div class="line_chart" v-if="param.name=='全部'">
                    <div class="linechart" v-echarts="getAllRegionalchart.options" :loading="getAllRegionalchart.load"></div>
                </div>
                <div class="line_chart" v-if="param.name=='我的品种统计'">
                    <div class="linechart" v-echarts="initBreedRegionalchart.options" :loading="initBreedRegionalchart.load"></div>
                </div>
                <div class="line_chart" v-if="param.name=='部门品种统计'">
                    <div class="linechart" v-echarts="initOrgBreedRegionalchart.options" :loading="initOrgBreedRegionalchart.load"></div>
                </div>
                <div class="line_chart" v-if="param.name=='全部品种统计'">
                    <div class="linechart" v-echarts="initAllBreedRegionalchart.options" :loading="initAllBreedRegionalchart.load"></div>
                </div>
            </div>            
            <!-- 用户详情 -->
            <div class="user_detail">
                <div class="user_detail_right">
                    <h4 class="detail_title bg-info">活跃用户
	                    <!-- <span class="detail_num">
		                    <a href="javascript:void(0);" class="person_num">人数：60</a>
		                    <a href="javascript:void(0);" class="person_num">人次：60</a>&nbsp		                    
	                    </span> -->
                    </h4>
                    <table class="table table-hover table_color table-striped">
                        <thead>
                            <tr v-if="param.countType=='客户统计'">
                                <th style="min-width:240px;text-align: center;">省份</th>
                                <th style="min-width:280px;text-align: center;">新增</th>
                                <th style="min-width:280px;text-align: center;">成交</th>
                                <th style="min-width:320px;text-align: center;">活跃</th>
                                <th style="min-width:320px;text-align: center;">品种总数</th>
                            </tr>
                             <tr v-if="param.countType=='品种统计'">
                                <th style="min-width:400px;text-align: center;">省份</th>
                                <th style="min-width:400px;text-align: center;">新增</th>
                           <!--      <th style="min-width:280px;text-align: center;" >成交</th>
                                <th style="min-width:320px;text-align: center;" >活跃</th> -->
                                <th style="min-width:400px;text-align: center;" >品种总数</th>
                            </tr>
                        </thead>
                        <tbody v-if="param.name=='业务员'">
                            <tr v-for="item in getProvinceDetail">
                                <td>{{item.provinceName}}</td>
                                <td>{{item.activeNumber}}</td>
                                <td>{{item.transactionNumber}}</td>
                                <td>{{item.activeNumber}}</td>
                            </tr>
                        </tbody>
                        <tbody v-if="param.name=='部门'">
                            <tr v-for="item in getOrgProvinceDetail">
                                <td>{{item.provinceName}}</td>
                                <td>{{item.activeNumber}}</td>
                                <td>{{item.transactionNumber}}</td>
                                <td>{{item.activeNumber}}</td>
                            </tr>
                        </tbody>
                        <tbody v-if="param.name=='全部'">
                            <tr v-for="item in getAllProvinceDetail">
                                <td>{{item.provinceName}}</td>
                                <td>{{item.activeNumber}}</td>
                                <td>{{item.transactionNumber}}</td>
                                <td>{{item.activeNumber}}</td>
                            </tr>
                        </tbody>
                        <tbody v-if="param.name=='我的品种统计'">
                            <tr v-for="item in initBreedProvinceDetail">
                                <td>{{item.provinceName}}</td>
                                <td>{{item.addNumber}}</td>
                                <!-- <td>{{item.transactionNumber}}</td> -->
                                <td>{{item.totalNumber}}</td>
                            </tr>
                        </tbody>
                        <tbody v-if="param.name=='部门品种统计'">
                            <tr v-for="item in initOrgBreedProvinceDetail">
                                <td>{{item.provinceName}}</td>
                                <td>{{item.addNumber}}</td>
                                <!-- <td>{{item.transactionNumber}}</td> -->
                                <td>{{item.totalNumber}}</td>
                            </tr>
                        </tbody>
                        <tbody v-if="param.name=='全部品种统计'">
                            <tr v-for="item in initAllBreedProvinceDetail">
                                <td>{{item.provinceName}}</td>
                                <td>{{item.addNumber}}</td>
                                <!-- <td>{{item.transactionNumber}}</td> -->
                                <td>{{item.totalNumber}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import pagination from '../pagination'
import {
    getRegionalchart,
    getProvinceDetail,
    getOrgProvinceDetail,
    getAllProvinceDetail,
    getOrgRegionalchart,
    getAllRegionalchart,
    initBreedRegionalchart,
    initOrgBreedRegionalchart,
    initAllBreedRegionalchart,
    initBreedProvinceDetail,
    initOrgBreedProvinceDetail,
    initAllBreedProvinceDetail
} from '../../vuex/getters'
import {
	freshRegionalCharts,
	freshOrgRegionalCharts,
	freshAllRegionalCharts,
	freshBreedRegionalCharts,
	freshOrgBreedRegionalCharts,
	freshAllBreedRegionalCharts
} from '../../vuex/actions'

export default {
    components: {
        pagination
    },
    props:['param'],
    data() {
        return {
            loadParam: {
                loading: false,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 4,
                total: 0,
                name:"regionalUser"
            },
            provinceDetail:[],
            searchParam:{
            	startTime:'',
            	endTime:''
            }
                
        }
    },
    vuex: {
        getters: {
            getRegionalchart,
            getOrgRegionalchart,
            getAllRegionalchart,
            getProvinceDetail,
            getOrgProvinceDetail,
            getAllProvinceDetail,
            initBreedRegionalchart,
            initOrgBreedRegionalchart,
            initAllBreedRegionalchart,
            initBreedProvinceDetail,
            initOrgBreedProvinceDetail,
            initAllBreedProvinceDetail
        },
        actions: {
        	freshRegionalCharts,
        	freshOrgRegionalCharts,
        	freshAllRegionalCharts,
        	freshBreedRegionalCharts,
        	freshOrgBreedRegionalCharts,
        	freshAllBreedRegionalCharts
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
        },
    },
    methods:{
    	toBackPage:function(){
    		this.$dispatch('back',this.loadParam.name)
    	},
    	search:function(){
    		if(this.param.name == '业务员'){
				this.freshRegionalCharts(this.searchParam)
	    	}
	    	if(this.param.name == '部门'){
	    		this.freshOrgRegionalCharts(this.searchParam)
	    	}
	    	if(this.param.name == '全部'){
	    		this.freshAllRegionalCharts(this.searchParam)
	    	}
	    	if(this.param.name == '我的品种统计'){
	    		this.freshBreedRegionalCharts(this.searchParam)
	    	}
	    	if(this.param.name == '部门品种统计'){
	    		this.freshOrgBreedRegionalCharts(this.searchParam)
	    	}
	    	if(this.param.name == '全部品种统计'){
	    		this.freshAllBreedRegionalCharts(this.searchParam)
	    	}
    	}
    },
    created() {
    	if(this.param.name == '业务员'){
			this.freshRegionalCharts(this.provinceDetail)
    	}
    	if(this.param.name == '部门'){
    		this.freshOrgRegionalCharts()
    	}
    	if(this.param.name == '全部'){
    		this.freshAllRegionalCharts()
    	}
    	if(this.param.name == '我的品种统计'){
    		this.freshBreedRegionalCharts()
    	}
    	if(this.param.name == '部门品种统计'){
    		this.freshOrgBreedRegionalCharts()
    	}
    	if(this.param.name == '全部品种统计'){
    		this.freshAllBreedRegionalCharts()
    	}
    	//this.$dispatch('freshCharts',this.provinceDetail)
    	
    }
}
</script>
<style scoped>
.box{
    background-color:#f0f0f0
}
.user_all{
}
.timePick{
	float:right;
	font-size:14px;
}
.mz-datepicker{
	width:180px!important
}
.show_type{
    width: 100%;
    height:40px;
    line-height: 30px;
    padding-top: 5px;
}
.line_today{
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    overflow: hidden;
    border-radius: 10px;
}
.line_chart {
    width: 1200px;
    height: 600px;
    text-align: center;
    margin: 0 auto;
    background-color:#fff;
}
.linechart {
    width: 100%;
	width: 1200px;
	height:600px;
    min-height: 100%;
}
.bar_today{
    width:1200px;
    margin: 30px auto;
    overflow: hidden;
    background-color:#fff;
    border-radius: 10px;
}
.bar_chart_left{
    width: 600px;
    height: 370px;
    text-align: center;
    float:left;
    border-right:1px solid #ccc;;
}
.today_list_right{
    width: 580px;
    float: right;   
}
.barchart {
    width: 100%;
    height: 100%;
}
.user_detail{
    width: 1200px;
    height:1100px;
    margin:0 auto;
}
.detail_title{
    padding-left:20px;
    line-height: 50px;
    background: #fafafa
}
.detail_num{
    display: inline-block;
    float: right;
    margin-right:20px;
    color:#ff9e4d
}
.person_num{
    color:#ff9e4d;
    margin-right:10px;
    font-size:16px;
}
.person_num:hover{
    text-decoration: underline;
}

.user_detail_right{
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
}

</style>
