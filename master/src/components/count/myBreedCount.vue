<template>
    <regional-user :param="loadParam" v-show="showParam.regional"></regional-user>
    <div class="box" style="max-height: 100%;overflow: auto;" v-show="showParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">我的品种统计</div>
        </div>
        <div class="user_all">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <!-- 折线图 -->
            <div class="line_today">
                <lines-charts :param="loadParam"></lines-charts>
            </div>
            <!-- 今日新增 -->
            <div class="bar_today">
            	<!-- 顶部筛选 -->
                <div class="search">
                    <search-some></search-some>
                </div>
                <h4 class="detail_title bg-info">成交品种统计
                    <span class="detail_num">
                        <a href="javascript:void(0);" class="person_num">{{yestodayParam.total}}人</a>&nbsp
                        <!-- <a href="javascript:void(0);" class="btn btn-link" @click="showDetail('userTodayDetail')">more>></a> -->
                    </span>
                </h4>
                <!-- 柱状图 -->
                <div class="bar_chart_left">
                    <div class="barchart" v-echarts="initBreedBarChart.options" :loading="initBreedBarChart.load"></div>
                </div>
                
            </div>
            <!-- 用户详情 -->
            <div class="user_detail">
                <!-- 顶部筛选 -->
                <div class="search">
                    <search-some></search-some>
                </div>
                <!-- 左侧 -->
                <div class="user_detail_left">
					<new-addbreed :param="addBreedParam"></new-addbreed>
                </div>
                <!-- 右侧 -->
                <div class="user_detail_right">
					<new-dealbreed :param="dealBreedParam"></new-dealbreed>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import pagination from '../pagination'
import searchSome from '../count/countTable/searchSome'
import linesCharts from '../count/countTable/linesCharts'
import newDealbreed from '../count/countTable/newDealBreed'
import newAddbreed from '../count/countTable/newAddBreed'
import vSelect from '../tools/vueSelect/components/Select'
import regionalUser from "../count/regionalUser.vue"
import {
    getColchart,
    getLineschart,
    getYear,
    initBreedBarChart,
    initYesTodayBreed
} from '../../vuex/getters'
import {
    freshLinesCharts,
    freshColCharts,
    freshBreedBarCharts,
    getAddBreedData,
    getBreedDetailId,
    getDealBreedData,
    getYestodayBreedData
} from '../../vuex/actions'

export default {
    components: {
        pagination,
        linesCharts,
        searchSome,
        vSelect,
        newDealbreed,
        newAddbreed,
        regionalUser
    },
    props:['param'],
    data() {
        return {
            loadParam: {
                loading: false,
                show: false,
                cur: 1,
                all: 4,
                total: 0,
                id:7,//国家id
                salemanId:'',
                callback_yes:this.callback_yes,
                callback:this.callback,
                data:[],
                name:'我的品种统计'
            },
            yestodayParam:{
                cur:1,
                all:4,
                total:0,
                data:[]
            },
            addBreedParam:{
                cur: 1,
                all: 4,
                total: 0,
                data:[],
                name:'新增品种',
                search:{} 
            },
            dealBreedParam:{
                cur: 1,
                all: 4,
                total: 0,
                data:[],
                name:'成交品种',
                search:{} 
            },
            showParam:{
            	show:true,
            	regional:false
            }
        }
    },
    vuex: {
        getters: {
        	getColchart,
        	initBreedBarChart,
        	initYesTodayBreed
        },
        actions: {
        	freshColCharts,
        	freshBreedBarCharts,
        	getAddBreedData,
        	getBreedDetailId,
        	getDealBreedData,
        	getYestodayBreedData
        }
    },
    events: {
    	search:function(data){
    		if(data.searchType=='新增'){
    			console.log('hahah')
    			//this.searchCus(data)
    		}
    		if(data.searchType=='成交'){

    		}
    	},
        showD:function(data){
            this.showDetail(data)
        },
        change:function(data){
            this.changeShow(data)
        },
        showDetail:function(){
        	this.showParam.show = false
        	this.showParam.regional = true
        },
        back:function(){
        	this.showParam.show = true
        	this.showParam.regional = false
        }
    },
    methods:{
        searchCus:function(data){
            this.getBreedDetailId(data)
            this.getBreedDetailId(this.addBreedParam)
            this.getAddBreedData(this.dealBreedParam)
        },
        callback_yes:function(data){
	    	this.loadParam.data = data
	    	this.getYestodayBreedData(this.loadParam)
	    	//this.addBreedParam.data = 
	    	//this.getAddBreedData(this.addBreedParam)
	    	//this.getDealBreedData(this.dealBreedParam)
    	},
    	callback:function(data){
    		this.addBreedParam.data = data.addNumberDetail
    		this.dealBreedParam.data = data.transactionNumberDetail
    		this.getAddBreedData(this.addBreedParam)
    		this.getDealBreedData(this.dealBreedParam)
    	}
    },

    created() {
    	console.log(this.initBreedBarChart)
    	this.getBreedDetailId(this.loadParam)
    	this.freshBreedBarCharts(this.loadParam)   	
    },
    computed:{

    },
    filters:{
    }
}
</script>
<style scoped>
.box{
    overflow: auto;
    background-color:#f0f0f0
}
.user_all{
    overflow: auto;
}
.mz-datepicker{    
    width: 180px !important;
}
.show_type{
    width: 100%;
    height:40px;
    line-height: 30px;
    padding-top: 5px;
    font-size:14px;
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
    height: 380px;
    text-align: center;
    margin: 0 auto;
    background-color:#fff;
}
.linechart {
    width: 100%;
    width: 1200px;
    height:380px;
    min-height: 100%;
}
.bar_today{
    width:1200px;
    margin: 30px auto;
    height:440px;
    overflow: hidden;
    background-color:#fff;
    border-radius: 10px;
}
.bar_chart_left{
    width: 120px;
    height: 370px;
    text-align: center;
    float:left;
}
.today_list_right{
    width: 580px;
    float: right;
    position: relative;  
    height:100%; 
}
.pages{
    position: absolute;
    bottom: 10%;
    left:10%;
}
.barchart {
    width: 100%;
    width: 1200px;
    height:370px;
    min-height: 100%;
}
.user_detail{
    width: 1200px;
    height:1100px;
    margin:0 auto;
}
.search{
    width: 100%;
    height:75px;
    background: #fff;
    margin-bottom: 20px;
    padding-left: 20px;
    border-radius: 10px;
}
.user_detail_left{
    width: 590px;
    height: 800px;
    padding-left: 0px;
    float: left;
    border-radius: 10px;
    overflow: hidden;
    background: #fff
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
.detail_left_top{
    width: 100%;
    height:400px;
    background: #fff;
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 10px;
}
.user_detail_right{
    float: right;
    height:800px;
    width:580px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
}

</style>
