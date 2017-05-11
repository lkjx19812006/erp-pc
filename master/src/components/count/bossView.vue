<template>
    <div class="box" style="max-height: 100%;overflow: auto;">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">全部统计</div>
        </div>
        <div class="user_all">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <!-- 折线图 -->
            <div class="line_today">
                <h4 class="detail_title bg-info">部门用户总览
                    <span class="detail_num ">
                        <div class="show_type">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.timeType==='year'}" @click="selectTime('year')">
                                    年
                                </button>
                                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.timeType==='month'}"
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
                            <dt v-if="loadParam.timeType!='month'" class="left transfer marg_top" style="margin-left: 20px">请选择年份：</dt>
                            <dd v-if="loadParam.timeType!='month'" class="left margin_right asdf" style="margin-right: 20px">
                                <select class="form-control edit-input" placeholder="按回车键搜索" v-model="loadParam.year" @change="selectType('year')">
                                    <!-- <option :value="item+'-01-01 00:00:00'" v-if="item<=setYear" v-for='item in getYear'>{{item}}</option> -->
                                    <option :value="[item+'-01-01 00:00:00',(item+1)+'-01-01 00:00:00']" v-for='item in setYear'>{{item}}</option>
                                </select>
                            </dd>
                            
                            <dt v-if="loadParam.timeType!='year'" class="left transfer marg_top" style="margin-left: 20px">请选择年和月：</dt>
                            <dd v-if="loadParam.timeType!='year'" class="left margin_right" style="margin-right: 20px">
                                <select class="form-control edit-input" v-model="loadParam.yearMonth" @change="selectType('month')">
                                    <option :value='item' v-for='item in setYear'>{{item}}</option>
                                </select>
                            </dd>
                            <dd v-if="loadParam.timeType!='year'" class="left margin_right" style="margin-right: 20px">
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
                <h4 class="detail_title bg-info">今日新增<span class="detail_num"><a href="javascript:void(0);" class="person_num">60人</a>&nbsp<a href="javascript:void(0);" class="btn btn-link" @click="showDetail('userTodayDetail')">more>></a></span></h4>
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
                            <tr v-for="item in todayData">
                                <td><a href="javascript:void(0);">{{item.name}}</a></td>
                                <td>{{item.phone}}</td>
                                <td>{{item.address}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <!--底部分页-->
                    <pagination :combination="loadParam" slot="page"></pagination>
                </div>
            </div>
            <!-- 用户详情 -->
            <div class="user_detail">
                 <!-- 顶部筛选 -->
                <div class="search">
                    <dl class="clear left transfer" style="margin-top:20px">
                        <div class="left">
                            <dt class="left transfer marg_top">{{$t('static.start_end')}}：</dt>
                            <mz-datepicker :time.sync="searchParam.startTime" format="yyyy-MM-dd" style='width:30px'>
                            </mz-datepicker>
                        </div>
                        <div class="left">
                            <dt class="left marg_top">~~</dt>
                            <mz-datepicker :time.sync="searchParam.endTime" format="yyyy-MM-dd">
                            </mz-datepicker>
                        </div>
                        <dt class="left transfer marg_top" style="margin-left: 20px">区域:</dt>
                        <dd class="left margin_right">
                            <div  type="text" class="edit-input">
                                <v-select :debounce="250" :value.sync="searchParam.regional"  :options="initProvince" placeholder="省/Province" label="cname">
                                </v-select>
                            </div>
                        </dd>
                        <dt class="left transfer marg_top" style="margin-left: 10px">客户类型：</dt>
                        <dd class="left margin_right">
                            <select class="form-control edit-input" placeholder="按回车键搜索" v-model=""  @change="selectType()">
                                    <option value='0'>产地</option>
                                    <option value='1'>药厂</option>
                                    <option value='2'>药商</option>
                                    <option value='3'>服务商</option>
                            </select>
                        </dd>
                        <button class="btn btn-default" style="margin-left: 10px" @click="searchCus()">搜索</button>
                        <button class="btn btn-default btn-warning" style="margin-left: 50px" @click="showDetail('regionalUser')">查看区域用户</button>
                        <button class="btn btn-default btn-warning" @click="showDetail('customerType')">查看客户类型</button>
                    </dl>                      
                </div>
                <!-- 详情 -->
                <div class="user_detail_right">
                    <h4 class="detail_title bg-info">部门统计</h4>
                    <table class="table table-hover table_color table-striped">
                        <thead>
                            <tr>
                                <th style="min-width:240px;text-align: center;">部门ID</th>
                                <th style="min-width:240px;text-align: center;">部门名称</th>
                                <th style="min-width:240px;text-align: center;">新增用户</th>
                                <th style="min-width:240px;text-align: center;">活跃用户</th>
                                <th style="min-width:240px;text-align: center;">成交用户</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in todayData">
                                <td><a href="javascript:void(0);">{{item.phone}}</a></td>
                                <td><a href="javascript:void(0);" @click="showDepart()">{{item.name}}</a></td>
                                <td><a href="javascript:void(0);" @click="showDetail('newUserDetail')">35</a></td>
                                <td><a href="javascript:void(0);" @click="showDetail('newActiveDetail')">65</a></td>
                                <td><a href="javascript:void(0);" @click="showDetail('newDealDetail')">95</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import vSelect from '../tools/vueSelect/components/Select'
import pagination from '../pagination'
import {
    getColchart,
    getLineschart,
    getYear,
    todayData
} from '../../vuex/getters'
import {
    freshLinesCharts
} from '../../vuex/actions'

export default {
    components: {
        vSelect,
        pagination
    },
    props:['param'],
    data() {
        return {
            loadParam: {
                loading: false,
                show: false,
                type:'',
                timeType:'month',
                year:[],
                yearMonth:'',
                month:'',
                monthArr:[]
            },
            todayData:[
                {
                    name:"张三",
                    phone:'15821955110',
                    address:'四川雅安'
                },
                {
                    name:"张三",
                    phone:'15821955110',
                    address:'四川雅安'
                },
                {
                    name:"张三",
                    phone:'15821955110',
                    address:'四川雅安'
                },
                {
                    name:"张三",
                    phone:'15821955110',
                    address:'四川雅安'
                },
                {
                    name:"张三",
                    phone:'15821955110',
                    address:'四川雅安'
                },
                {
                    name:"张三",
                    phone:'15821955110',
                    address:'四川雅安'
                },
                {
                    name:"张三",
                    phone:'15821955110',
                    address:'四川雅安'
                }
            ],
        }
    },
    vuex: {
        getters: {
            getColchart,
            getLineschart,
            getYear
        },
        actions: {
            freshLinesCharts
        }
    },
    events: {
        fresh: function(input) {
         
        },
    },
    methods:{
        showDepart:function(){
        	var url
            var host = window.location.host
            if(host=='localhost'){
            	window.open('http://localhost/#!/home/count?id=9')
            }
            if(host=="192.168.1.103"){
            	window.open('http://192.168.1.103/front/#!/home/count?id=9')
            }
            if(host=="139.224.208.154"){
            	window.open('http://139.224.208.154/erp/#!/home/count?id=9')
            }
        },
        showDetail:function(data){
        	this.$dispatch('showDetail',data)
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
        selectTime:function(data){ //切换年月显示
            this.loadParam.timeType = data
            if(data=="month"){
                this.loadParam.year=[];
            }else{
                this.loadParam.yearMonth='';
                this.loadParam.month='';
            }
        },
        mGetDate:function (year, month){//判断每月多少天
            var d = new Date(year, month, 0);
            var time = [year+'-'+month+'-01'+' 00:00:00',year+'-'+month+'-'+d.getDate()+ ' 00:00:00']
            return time
        }
    },
    created() {
        this.freshLinesCharts(this.loadParam)
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
.mz-datepicker{    
    width: 120px !important;
}
.user_all{
    overflow: auto;
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
    height: 100%;
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
    height:820px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
}

</style>
