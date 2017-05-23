<template>
    <div class="box" style="max-height: 100%;overflow: auto;">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">业务员的统计</div>
        </div>
        <div class="user_all">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <!-- 折线图 -->
            <div class="line_today">
                <h4 class="detail_title bg-info">用户总览
                    <span class="detail_num ">
                        <div class="show_type">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.timeType==='month'}" @click="selectTime('year')">
                                    年
                                </button>
                                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.timeType==='day'}"
                                 @click="selectTime('month')">
                                    月
                                </button>
                            </div>
                            <dt class="left transfer marg_top" style="margin-left: 20px">客户类型：</dt>
                            <dd class="left margin_right">
                                <select class="form-control edit-input" placeholder="按回车键搜索" v-model="loadParam.type" @change="selectType()">
                                    <option value=''>全部</option>
                                    <option value='0'>产地</option>
                                    <option value='1'>药厂</option>
                                    <option value='2'>药商</option>
                                    <option value='3'>服务商</option>
                                </select>
                            </dd>
                            <dt v-if="loadParam.timeType!='day'" class="left transfer marg_top" style="margin-left: 20px">请选择年份：</dt>
                            <dd v-if="loadParam.timeType!='day'" class="left margin_right asdf" style="margin-right: 20px">
                                <select class="form-control edit-input" placeholder="按回车键搜索" v-model="loadParam.year" @change="selectType('year')">
                                    <!-- <option :value="item+'-01-01 00:00:00'" v-if="item<=setYear" v-for='item in getYear'>{{item}}</option> -->
                                    <option :value="[item+'-01-01 00:00:00',(item+1)+'-01-01 00:00:00']" v-for='item in setYear'>{{item}}</option>
                                </select>
                            </dd>
                            
                            <dt v-if="loadParam.timeType!='month'" class="left transfer marg_top" style="margin-left: 20px">请选择年和月：</dt>
                            <dd v-if="loadParam.timeType!='month'" class="left margin_right" style="margin-right: 20px">
                                <select class="form-control edit-input" v-model="loadParam.yearMonth" @change="selectType('month')">
                                    <option :value='item' v-for='item in setYear'>{{item}}</option>
                                </select>
                            </dd>
                            <dd v-if="loadParam.timeType!='month'" class="left margin_right" style="margin-right: 20px">
                                <select class="form-control edit-input" :disabled="loadParam.yearMonth?false:true" v-model="loadParam.month" @change="selectType('month')">
                                    <option value='1'>01月</option>
                                    <option value='2'>02月</option>
                                    <option value='3'>03月</option>
                                    <option value='4'>04月</option>
                                    <option value='5'>05月</option>
                                    <option value='6'>06月</option>
                                    <option value='7'>07月</option>
                                    <option value='8'>08月</option>
                                    <option value='9'>09月</option>
                                    <option value='10'>10月</option>
                                    <option value='11'>11月</option>
                                    <option value='12'>12月</option>
                                </select>
                            </dd>                            
                        </div>
                    </span>
                </h4>
                
                <div class="line_chart">
                    <div class="linechart" v-echarts="getLineschart.options" :loading="getLineschart.load"></div>
                </div>
            </div>
            <!-- 今日新增 -->
            <div class="bar_today">
                <h4 class="detail_title bg-info">昨日新增
                    <span class="detail_num">
                        <a href="javascript:void(0);" class="person_num">{{yestodayParam.total}}人</a>&nbsp
                        <!-- <a href="javascript:void(0);" class="btn btn-link" @click="showDetail('userTodayDetail')">more>></a> -->
                    </span>
                </h4>
                <!-- 柱状图 -->
                <div class="bar_chart_left">
                    <div class="barchart" v-echarts="getColchart.options" :loading="getColchart.load"></div>
                </div>
                
                <div class="today_list_right">
                    <table class="table table-hover table_color table-striped">
                        <thead>
                            <tr>
                                <th style="min-width:150px;text-align: center;">用户</th>
                                <th style="min-width:200px;text-align: center;">联系方式</th>
                                <th style="min-width:150px;text-align: center;">区域</th>
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
                        <pagination :combination="yestodayParam" slot="page"></pagination>
                    </div>
                    
                </div>
            </div>
            <!-- 用户详情 -->
            <div class="user_detail">
                <!-- 顶部筛选 -->
                <div class="search">
                    <dl class="clear left transfer" style="margin-top:20px">
                        <div class="left">
                            <dt class="left transfer marg_top">{{$t('static.start_end')}}：</dt>
                            <mz-datepicker :time.sync="searchParam.startTime" format="yyyy-MM-dd HH:mm:ss" style='width:30px'>
                            </mz-datepicker>
                        </div>
                        <div class="left">
                            <dt class="left marg_top">~~</dt>
                            <mz-datepicker :time.sync="searchParam.endTime" format="yyyy-MM-dd HH:mm:ss">
                            </mz-datepicker>
                        </div>
                        <dt class="left transfer marg_top" style="margin-left: 20px">区域:</dt>
                        <dd class="left margin_right">
                            <div  type="text" class="edit-input">
                                <v-select :debounce="250" :value.sync="searchParam.provinceId"  :options="initProvince" placeholder="省/Province" label="cname">
                                </v-select>
                            </div>
                        </dd>
                        <dt class="left transfer marg_top" style="margin-left: 10px">客户类型：</dt>
                        <dd class="left margin_right">
                            <select class="form-control edit-input" placeholder="按回车键搜索" v-model="searchParam.type">
                                    <option value='0'>产地</option>
                                    <option value='1'>药厂</option>
                                    <option value='2'>药商</option>
                                    <option value='3'>服务商</option>
                            </select>
                        </dd>
                        <button class="btn btn-default" style="margin-left: 10px" @click="searchCus()">搜索</button>
                        <button class="btn btn-default" style="margin-left: 10px" @click="resetSearch()">清空</button>
                        <button class="btn btn-default btn-warning"  @click="showDetail('regionalUser')">查看区域用户</button>
                        <button class="btn btn-default btn-warning" @click="showDetail('customerType')">查看客户类型</button>
                    </dl>   
                    
                </div>
                <!-- 左侧 -->
                <div class="user_detail_left">
                    <new-user :param="newPageParam"></new-user>
                    <deal-user :param="dealPageParam"></deal-user>
                </div>
                <!-- 右侧 -->
                <div class="user_detail_right">
                    <active-user :param="activePageParam"></active-user>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import pagination from '../pagination'
import newUser from '../count/countTable/newUser'
import activeUser from '../count/countTable/activeUser'
import dealUser from '../count/countTable/dealUser'
import vSelect from '../tools/vueSelect/components/Select'
import {
    initClientcount,
    getColchart,
    getLineschart,
    initProvince,
    getYear,
    getNewUserDetail,
    getDealUserDetail,
    getActiveUserDetail,
    getYesTodayDetail
} from '../../vuex/getters'
import {
    getClientcount,
    getProvinceList,
    freshLinesCharts,
    freshColCharts,
    getNewUserId,
    getNewUser,
    getDealUser,
    getActiveUser,
    getYestodayData
} from '../../vuex/actions'

export default {
    components: {
        pagination,
        vSelect,
        newUser,
        dealUser,
        activeUser 
    },
    props:['param'],
    data() {
        return {
            loadParam: {
                loading: true,
                show: false,
                cur: 1,
                all: 0,
                total: 0,
                id:7,//国家id
                type:'',
                timeType:'month',
                year:['2017-01-01 00:00:00','2018-01-01 00:00:00'],
                yearMonth:'',
                month:'',
                monthArr:[],
                salemanId:'',
                callback:this.callback
            },
            yestodayParam:{
                cur:1,
                all:1,
                total:0,
                data:[]
            },
            newPageParam:{
                cur: 1,
                all: 4,
                total: 0,
                data:[],
                name:'新增用户' ,
                search:{}             
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
            activePageParam:{
                cur: 1,
                all: 4,
                total: 0,
                data:[],
                showType:'time',
                activeType:'报价',
                name:'活跃用户',
                search:{} 
            },
            province: {
                id: '',
                cname: ''
            },
            searchParam:{
                startTime:'',
                endTime:'',
                provinceId:'',
                type:'',
                callback:this.callback
            },
            colCharts:{
                callback_yes:this.callback_yes
            }
            
        }
    },
    vuex: {
        getters: {
            getColchart,
            getLineschart,
            initProvince,
            getYear,
            getNewUserDetail,
            getDealUserDetail,
            getYesTodayDetail
        },
        actions: {
            getProvinceList,
            freshLinesCharts,
            getNewUserId,
            getNewUser,
            getDealUser,
            getActiveUser,
            freshColCharts,
            getYestodayData
        }
    },
    events: {
        fresh: function(input) {
            this.yestodayParam.cur = input;
            this.getYestodayData(this.yestodayParam)
        },
        showD:function(data){
            this.showDetail(data)
        },
        change:function(data){
            this.changeShow(data)
        }
    },
    methods:{
        showDetail:function(data){
            this.$dispatch("showDetail",data)
        },
        selectType:function(data){
            if(data=='month'){
                if(this.loadParam.month==''){//选择年份未选择月份默认月份为1月份
                    this.loadParam.month='1'
                }
                this.loadParam.monthArr=this.mGetDate(this.loadParam.yearMonth,this.loadParam.month)
                this.freshLinesCharts(this.loadParam)
            }else{
                this.freshLinesCharts(this.loadParam)
            }            
        },
        changeShow:function(data){
            this.dealPageParam.showType = data
            this.getDealUser(this.dealPageParam)
        },
        selectTime:function(data){ //切换年月显示
            
            if(data=="month"){
                var date = new Date()
                var year = date.getFullYear()
                this.loadParam.year=[year+'-01-01 00:00:00',(year+1)+'-01-01 00:00:00'];
                var month = date.getMonth()
                var day = date.getDate()
                if(day>5){
                    month = month+1
                }
                this.loadParam.yearMonth = year
                this.loadParam.month = month
                this.loadParam.monthArr=this.mGetDate(this.loadParam.yearMonth,this.loadParam.month)

                this.loadParam.timeType = 'day'
                this.freshLinesCharts(this.loadParam)
                console.log(this.loadParam)

            }else if(data=='year'){
                // this.loadParam.yearMonth='';
                // this.loadParam.month='';
                var date = new Date()
                var year = date.getFullYear()
                this.loadParam.year=[year+'-01-01 00:00:00',(year+1)+'-01-01 00:00:00'];
                this.loadParam.timeType = 'month'
                console.log(this.loadParam)
                this.freshLinesCharts(this.loadParam)
                
            }
        },
        searchCus:function(){
            this.getNewUserId(this.searchParam)
            this.getNewUser(this.newPageParam)
            this.getDealUser(this.dealPageParam)
            this.getActiveUser(this.activePageParam)
        },
        resetSearch:function(){
            this.searchParam.startTime = ''
            this.searchParam.endTime = ''
            this.searchParam.provinceId = ''
            this.searchParam.type = ''
            this.getNewUserId(this.searchParam)
            this.getNewUser(this.newPageParam)
            this.getDealUser(this.dealPageParam)
            this.getActiveUser(this.activePageParam)
        },
        mGetDate:function (year, month){//判断每月多少天
            var d = new Date(year, month, 0);
            if(month<10){
                month = "0"+month
            }
            var time = [year+'-'+month+'-01'+' 00:00:00',year+'-'+month+'-'+d.getDate()+ ' 00:00:00']
            return time
        },
        callback:function(data){
            this.newPageParam.data = data.addNumberDetail
            this.dealPageParam.data = data.transactionTimesDetail
            this.activePageParam.data = data
            this.getNewUser(this.newPageParam)
            this.getDealUser(this.dealPageParam)
            this.getActiveUser(this.activePageParam)
        },
        callback_yes:function(data){
            console.log(data)
            this.yestodayParam.data = data
            this.getYestodayData(this.yestodayParam)
        }
    },
    created() {
        this.getProvinceList(this.loadParam)
        this.freshLinesCharts(this.loadParam)
        this.getNewUserId(this.searchParam)
        this.freshColCharts(this.colCharts)
    },
    computed:{
        setYear:function(){//计算当前年份过滤年份数组显示的年份
            let now = new Date();
            let nowYear = now.getFullYear()
            for(var i=0;i<=this.getYear.length;i++){
                if(this.getYear[i]>=nowYear){
                    return this.getYear.slice(0,i+1)
                }
            }
        }
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
    width: 520px;
    padding-left: 0px;
    float: left;
    border-radius: 10px;
    overflow: hidden;
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
    height:940px;
    width:660px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
}

</style>
