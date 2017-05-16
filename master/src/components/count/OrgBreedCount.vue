<template>
    <regional-user :param="loadParam" v-show="showParam.regional"></regional-user>
    <div class="box" style="max-height: 100%;overflow: auto;" v-show="showParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">部门品种统计</div>
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
                <h4 class="detail_title bg-info">昨日统计
                    <span class="detail_num">
                        <a href="javascript:void(0);" class="person_num">{{yestodayParam.total}}人</a>&nbsp
                        <!-- <a href="javascript:void(0);" class="btn btn-link" @click="showDetail('userTodayDetail')">more>></a> -->
                    </span>
                </h4>
                <!-- 柱状图 -->
                <div class="bar_chart_left">
                    <div class="barchart" v-echarts="initBreedBarChart.options" :loading="initBreedBarChart.load"></div>
                </div>
                
                <div class="today_list_right">
                    <table class="table table-hover table_color table-striped">
                        <thead>
                            <tr>
                                <th style="min-width:150px;text-align: center;">品种</th>
                                <th style="min-width:200px;text-align: center;">订单号</th>
                                <th style="min-width:150px;text-align: center;">成交时间</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in getYesTodayDetail">
                                <td><a href="javascript:void(0);">{{item.name}}</a></td>
                                <td>{{item.phone}}</td>
                                <td>{{item.address}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!--底部分页-->
                    <div class="pages">
                        <pagination :combination="loadParam" slot="page"></pagination>
                    </div>
                   
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
					
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import pagination from '../pagination'
import searchSome from '../count/countTable/searchSome'
import linesCharts from '../count/countTable/linesCharts'
import vSelect from '../tools/vueSelect/components/Select'
import regionalUser from "../count/regionalUser.vue"
import {
    getColchart,
    getLineschart,
    getYear,
    initBreedBarChart
} from '../../vuex/getters'
import {
    freshLinesCharts,
    freshColCharts,
    freshBreedBarCharts
} from '../../vuex/actions'

export default {
    components: {
        pagination,
        linesCharts,
        searchSome,
        vSelect,
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
                callback:this.callback,
                name:'部门品种统计'
            },
            yestodayParam:{
                cur:1,
                all:4,
                total:0,
                data:[]
            },
            dealPageParam:{
                cur: 1,
                all: 4,
                total: 0,
                data:[],
                showType:'num',
                name:'成交用户',
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
        	initBreedBarChart
        },
        actions: {
        	freshColCharts,
        	freshBreedBarCharts,
        }
    },
    events: {
    	search:function(data){
    		this.searchCus(data)
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
    	callback:function(){
    		
    	},
        searchCus:function(){
            this.getNewUserId(this.searchParam)
            this.getNewUser(this.newPageParam)
            this.getDealUser(this.dealPageParam)
            this.getActiveUser(this.activePageParam)
        }
    },
    created() {
    	console.log(this.initBreedBarChart)
    	this.freshBreedBarCharts()
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

.line_today{
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    overflow: hidden;
    border-radius: 10px;
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
    width: 600px;
    height: 370px;
    text-align: center;
    float:left;
    border-right:1px solid #ccc;;
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
    width: 580px;
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

</style>
