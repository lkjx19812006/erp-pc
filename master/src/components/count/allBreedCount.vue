<template>
    <breed-order-detail :param="orderParam" v-if="orderParam.show"></breed-order-detail>
    <regional-user :param="loadParam" v-show="showParam.regional"></regional-user>
    <div class="box" style="max-height: 100%;overflow: auto;" v-show="showParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">全部品种统计</div>
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
                    <search-deal-breed :param='loadParam'></search-deal-breed>                    
                </div>
                <h4 class="detail_title bg-info">成交品种统计（近7天）
                    <!-- <span class="detail_num">
                        <a href="javascript:void(0);" class="person_num"></a>
                    </span> -->
                </h4>
                <!-- 柱状图 -->
                <div class="bar_chart_left">
                    <div class="barchart" v-echarts="initAllBreedBarChart.options" :loading="initAllBreedBarChart.load"></div>
                </div>
                <!--详情 -->
                <div class="user_detail_right">
                    <div class="newAdd">
                        <h4 class='detail_title'>成交品种(<span style="color:red">{{initAllYesTodayBreed.length}}</span>)</h4>
                        <table class="table table-hover table_color table-bordered table-striped ">
                            <thead>
                                <tr>
                                    <td style="width: 300px">品种名称</td>
                                    <td style="width: 300px">成交次数</td>
                                    <td style="width: 300px">部门</td>
                                    <td style="width: 300px">查看订单</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in initAllYesTodayBreed.slice(pageData.start,pageData.end)">
                                    <td>{{item.breedName}}</td>
                                    <td>{{item.transactionNumber}}</td>
                                    <td>{{item.orgName}}</td>
                                    <td><a href="javascript:void(0);"  @click="showOrder(item)">订单详情</a></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="pages">
                            <pagination :combination="loadParam" slot="page"></pagination>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 用户详情 -->
            <div class="user_detail">
                <!-- 顶部筛选 -->
                <div class="search">
                    <search-some :param='addBreedParam'></search-some>
                </div>
                <!-- 左侧 -->
                <div class="user_detail_left">
                    <new-addbreed :param="addBreedParam"></new-addbreed>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import pagination from '../pagination'
import searchSome from '../count/countTable/searchSome'
import searchDealBreed from '../count/countTable/searchDealBreed'
import breedOrderDetail from '../count/countTable/breedOrderDetail'
import employeeModel from '../clientRelate/searchEmpInfo'
import linesCharts from '../count/countTable/linesCharts'
import newAddbreed from '../count/countTable/newAddBreed'
import vSelect from '../tools/vueSelect/components/Select'
import regionalUser from "../count/regionalUser.vue"
import {
    initAllBreedBarChart,
    initAllYesTodayBreed
} from '../../vuex/getters'
import {
    freshAllBreedBarCharts,
    getAllAddBreedData,
    getAllBreedDetailId,
    getDealBreedData,
    getYestodayBreedData,
    getBreedOrderDetail
} from '../../vuex/actions'

export default {
    components: {
        pagination,
        linesCharts,
        searchSome,
        searchDealBreed,
        vSelect,
        newAddbreed,
        regionalUser,
        employeeModel,
        breedOrderDetail
    },
    props:['param'],
    data() {
        return {
            loadParam: {
                loading: false,
                show: false,
                cur: 1,
                all: 1,
                total:0,
                id:7,//国家id
                salemanId:'',
                callback:this.callback,
                data:[],
                name:'全部品种统计',
                countType:'品种统计'
            },
            addBreedParam:{
                cur: 1,
                all: 1,
                total: 0,
                data:[],
                name:'全部品种统计',
                search:{} ,
                callback:this.callback
            },
            dealBreedParam:{
                cur: 1,
                all: 1,
                total: 0,
                data:[],
                name:'全部品种统计',
                search:{} 
            },
            orderParam:{
                show:false,
                name:''
            },
            showParam:{
                show:true,
                regional:false
            },
            pageParam:{
                cur:1,
                all:1,
                total:0
            },
            pageData:{
                start:0,
                end:10
            }
        }
    },
    vuex: {
        getters: {
            initAllBreedBarChart,
            initAllYesTodayBreed
        },
        actions: {
            freshAllBreedBarCharts,
            getAllAddBreedData,
            getAllBreedDetailId,
            getDealBreedData,
            getYestodayBreedData,
            getBreedOrderDetail
        }
    },
    events: {
        search:function(data){
            this.getAllBreedDetailId(data)
        },
        searchDeal:function(data){
            this.loadParam.startTime = data.startTime
            this.loadParam.endTime = data.endTime
            this.loadParam.type = data.type
            this.loadParam.empId = data.empId
            this.loadParam.orgId = data.orgId
            this.freshAllBreedBarCharts(this.loadParam)
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
        },
        fresh:function(input){
            this.pageData.start = 10*(input-1)
            this.pageData.end = 10*input
        }
    },
    methods:{
        showOrder:function(data){
            this.getBreedOrderDetail(data)
            this.orderParam.show = true
            this.orderParam.breedName = data.breedName
        },
        callback:function(data){
            this.addBreedParam.data = data.addNumberDetail
            this.getAllAddBreedData(this.addBreedParam)
        }
    },
    created() {
        this.getAllBreedDetailId(this.loadParam)
        this.freshAllBreedBarCharts(this.loadParam)
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
.employee{
    position: fixed;
    border:1px solid #000
}
.linechart {
    width: 100%;
    width: 1200px;
    height:380px;
    min-height: 100%;
}
.bar_today{
    width: 1200px;
    margin:20px auto;
    overflow: hidden;
    border-radius:10px;
}
.search{
    width: 100%;
    height: 80px;
    background: #fff;
    padding: 0 20px
}
.detail_title{
    padding-left:20px;
    line-height: 50px;
    background: #fafafa
}
.bar_chart_left{
    width: 100%;
    height:500px;
    background: #fff
}
.barchart{
    width:100%;
    height:100%;
    /*width: 1200px;
    height: 500px;*/
}
.user_detail_right{
    width: 100%;
    height: 600px;
    background: #FFF;
    overflow:auto;
}

.newAdd{
    height: 100%;
    position: relative;
}
.pages{
    position: absolute;
    bottom: 40px;
    left:20%
}
.user_detail{
    width: 1200px;
    height: 600px;
    margin:30px auto;
    border-radius:10px;
    background: #fff;
    overflow: hidden;
}
.user_detail_left{
    width: 100%;
    height: 500px;
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
