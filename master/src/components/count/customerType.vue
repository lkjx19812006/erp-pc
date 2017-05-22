<template>
    <div class="box" style="max-height: 100%;overflow: auto;">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">{{param.name}}客户类型统计</div>
            <div class="btn btn-primary right" @click="toBackPage()">{{$t('static.back')}}</div>
        </div>
        <div class="user_all">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <!-- 折线图 -->
            <div class="line_today">
                <h4 class="detail_title bg-info">用户总览
                    <span class="detail_num">
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
                            <dt class="left transfer marg_top" style="margin-left: 20px">类型：</dt>
                            <dd class="left margin_right">
                                <select class="form-control edit-input" placeholder="按回车键搜索" v-model="loadParam.type" @change="changeTypes()">
                                    <option value="新增">新增</option>
                                    <option value="成交">成交</option>
                                    <option value="活跃">活跃</option>
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
                
                <div class="line_chart" v-if="param.name=='业务员'">
                    <div class="linechart" v-echarts="getCustypechart.options" :loading="getCustypechart.load"></div>
                </div>
                <div class="line_chart" v-if="param.name=='部门'">
                    <div class="linechart" v-echarts="getOrgCustypechart.options" :loading="getOrgCustypechart.load"></div>
                </div>
                <div class="line_chart" v-if="param.name=='全部'">
                    <div class="linechart" v-echarts="getAllCustypechart.options" :loading="getAllCustypechart.load"></div>
                </div>
            </div>            
            <!-- 用户详情 -->
            <div class="user_detail">
                <div class="user_detail_right">
                    <h4 class="detail_title bg-info">客户类型
                        <div class="timePick">
                            <div class="left">
                                <dt class="left transfer marg_top" style="margin-top:15px;">{{$t('static.start_end')}}：</dt>
                                <mz-datepicker :time.sync="searchParam.startTime" format="yyyy-MM-dd HH:mm:ss">
                                </mz-datepicker>
                            </div>
                            <div class="left">
                                <dt class="left marg_top" style="margin-top:15px;">~~</dt>
                                <mz-datepicker :time.sync="searchParam.endTime" format="yyyy-MM-dd HH:mm:ss">
                                </mz-datepicker>
                            </div>
                            <button class="btn btn-default" style="margin-left:10px" @click="search()">搜索</button>
                        </div>  
                    </h4>
                    <table class="table table-hover table_color table-striped">
                        <thead>
                            <tr>
                                <th style="min-width:240px;text-align: center;">客户类型</th>
                                <th style="min-width:220px;text-align: center;">新增用户</th>
                                <th style="min-width:220px;text-align: center;">成交用户</th>
                                <th style="min-width:220px;text-align: center;">活跃用户</th>
                                <th style="min-width:220px;text-align: center;">用户总数</th>
                            </tr>
                        </thead>
                        <tbody v-if="param.name=='业务员'">
                            <tr v-for="item in getCusTypeDetail">
                                <td><a href="javascript:void(0);">{{item.name}}</a></td>
                                <td>{{item.addNumber}}</td>
                                <td>{{item.activeNumber}}</td>
                                <td>{{item.transactionNumber}}</td>
                                <td>{{item.totalNumber}}</td>
                            </tr>
                        </tbody>
                        <tbody v-if="param.name=='部门'">
                            <tr v-for="item in getOrgCusTypeDetail">
                                <td><a href="javascript:void(0);">{{item.name}}</a></td>
                                <td>{{item.addNumber}}</td>
                                <td>{{item.activeNumber}}</td>
                                <td>{{item.transactionNumber}}</td>
                                <td>{{item.totalNumber}}</td>
                            </tr>
                        </tbody>
                        <tbody v-if="param.name=='全部'">
                            <tr v-for="item in getAllCusTypeDetail">
                                <td><a href="javascript:void(0);">{{item.name}}</a></td>
                                <td>{{item.addNumber}}</td>
                                <td>{{item.activeNumber}}</td>
                                <td>{{item.transactionNumber}}</td>
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
    getCustypechart,
    getOrgCustypechart,
    getAllCustypechart,
    getYear,
    getCusTypeDetail,
    getOrgCusTypeDetail,
    getAllCusTypeDetail
} from '../../vuex/getters'
import {
    getCusTypeData,
    getOrgCusTypeData,
    getAllCusTypeData,
    getCusTypeList,
    getOrgCusTypeList,
    getAllCusTypeList
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
                all: 0,
                total: 0,
                name:"customerType",
                type:'新增',
                timeType:'month',
                year:['2017-01-01 00:00:00','2018-01-01 00:00:00'],
                yearMonth:'',
                month:'',
                monthArr:[],
                salemanId:'',
                callback:this.callback
            },
            searchParam:{
                startTime:'',
                endTime:''
            }
        }
    },
    vuex: {
        getters: {
            getCustypechart,
            getOrgCustypechart,
            getAllCustypechart,
            getYear,
            getCusTypeDetail,
            getOrgCusTypeDetail,
            getAllCusTypeDetail
        },
        actions: {
            getCusTypeData,
            getOrgCusTypeData,
            getAllCusTypeData,
            getCusTypeList,
            getOrgCusTypeList,
            getAllCusTypeList
        }
    },
    events: {
    },
    methods:{
        search:function(){             
            if(this.param.name=='业务员'){
                this.getCusTypeList(this.searchParam)
            }
            if(this.param.name=='部门'){
                this.getOrgCusTypeList(this.searchParam)
            }
            if(this.param.name=='全部'){
                this.getAllCusTypeList(this.searchParam)
            }
        },
    	toBackPage:function(){
    		this.$dispatch('back',this.loadParam.name)
    	},
        changeTypes:function(){
            if(this.param.name=='业务员'){
                this.getCusTypeData(this.loadParam)
            }
            if(this.param.name=='部门'){
                this.getOrgCusTypeData(this.loadParam)
            }
            if(this.param.name=='全部'){
                this.getAllCusTypeData(this.loadParam)
            }
        },
        mGetDate:function (year, month){//判断每月多少天
            var d = new Date(year, month, 0);
            if(month<10){
                month = "0"+month
            }
            var time = [year+'-'+month+'-01'+' 00:00:00',year+'-'+month+'-'+d.getDate()+ ' 00:00:00']
            return time
        },
        selectType:function(data){
            if(data=='month'){
                if(this.loadParam.month==''){//选择年份未选择月份默认月份为1月份
                    this.loadParam.month='1'
                }
                this.loadParam.monthArr=this.mGetDate(this.loadParam.yearMonth,this.loadParam.month)
                //this.freshLinesCharts(this.loadParam)
                if(this.param.name=='业务员'){
                    this.getCusTypeData(this.loadParam)
                }
                if(this.param.name=='部门'){
                    this.getOrgCusTypeData(this.loadParam)
                }
                if(this.param.name=='全部'){
                    this.getAllCusTypeData(this.loadParam)
                }
            }else{
                //this.freshLinesCharts(this.loadParam)
               if(this.param.name=='业务员'){
                    this.getCusTypeData(this.loadParam)
                }
                if(this.param.name=='部门'){
                    this.getOrgCusTypeData(this.loadParam)
                }
                if(this.param.name=='全部'){
                    this.getAllCusTypeData(this.loadParam)
                }
            }            
        },
        selectTime:function(data){
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
                //this.freshLinesCharts(this.loadParam)
                if(this.param.name=='业务员'){
                    this.getCusTypeData(this.loadParam)
                }
                if(this.param.name=='部门'){
                    this.getOrgCusTypeData(this.loadParam)
                }
                if(this.param.name=='全部'){
                    this.getAllCusTypeData(this.loadParam)
                }
                console.log(this.loadParam)

            }else if(data=='year'){
                // this.loadParam.yearMonth='';
                // this.loadParam.month='';
                var date = new Date()
                var year = date.getFullYear()
                this.loadParam.year=[year+'-01-01 00:00:00',(year+1)+'-01-01 00:00:00'];
                this.loadParam.timeType = 'month'
                console.log(this.loadParam)
                //this.freshLinesCharts(this.loadParam)
                if(this.param.name=='业务员'){
                    this.getCusTypeData(this.loadParam)
                }
                if(this.param.name=='部门'){
                    this.getOrgCusTypeData(this.loadParam)
                }
                if(this.param.name=='全部'){
                    this.getAllCusTypeData(this.loadParam)
                }
                
            }
        }
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
    created() {
        
        if(this.param.name=='业务员'){
            this.getCusTypeData(this.loadParam)
            this.getCusTypeList()
        }
        if(this.param.name=='部门'){
            this.getOrgCusTypeData(this.loadParam)
            this.getOrgCusTypeList()
        }
        if(this.param.name=='全部'){
            this.getAllCusTypeData(this.loadParam)
            this.getAllCusTypeList()
        }
        //this.$dispatch('freshCus',this.loadParam)
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
.timePick{
    float:right;
    font-size:14px;
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
    height: 380px;
    text-align: center;
    margin: 0 auto;
    background-color:#fff;
}
.linechart {
    min-width: 100%;
	width: 1200px;
	height: 380px;
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
    padding-bottom: 20px;
}

</style>
