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
                                <select class="form-control edit-input" placeholder="按回车键搜索" v-model="showType.type" @change="changeTypes()">
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
                    <div class="linechart" v-echarts="getCustypechart.options" :loading="getCustypechart.load"></div>
                </div>
                <div class="line_chart" v-if="param.name=='全部'">
                    <div class="linechart" v-echarts="getCustypechart.options" :loading="getCustypechart.load"></div>
                </div>
            </div>            
            <!-- 用户详情 -->
            <div class="user_detail">
                <div class="user_detail_right">
                    <h4 class="detail_title bg-info">客户类型
                        <span class="detail_num">
                            <a href="javascript:void(0);" class="person_num">人数：60</a>
                            <a href="javascript:void(0);" class="person_num">人次：60</a>&nbsp
                        </span>
                    </h4>
                    <table class="table table-hover table_color table-striped">
                        <thead>
                            <tr>
                                <th style="min-width:240px;text-align: center;">客户类型</th>
                                <th style="min-width:280px;text-align: center;">新增用户</th>
                                <th style="min-width:280px;text-align: center;">成交用户</th>
                                <th style="min-width:320px;text-align: center;">活跃用户</th>
                            </tr>
                        </thead>
                        <tbody v-if="param.name=='业务员'">
                            <tr v-for="item in todayData">
                                <td><a href="javascript:void(0);">{{item.name}}</a></td>
                                <td>60</td>
                                <td>789</td>
                                <td>100</td>
                            </tr>
                        </tbody>
                        <tbody v-if="param.name=='部门'">
                            <tr v-for="item in todayData">
                                <td><a href="javascript:void(0);">{{item.name}}</a></td>
                                <td>60</td>
                                <td>789</td>
                                <td>100</td>
                            </tr>
                        </tbody>
                        <tbody v-if="param.name=='全部'">
                            <tr v-for="item in todayData">
                                <td><a href="javascript:void(0);">{{item.name}}</a></td>
                                <td>60</td>
                                <td>789</td>
                                <td>100</td>
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
    getCustypechart
} from '../../vuex/getters'
import {

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
                name:"customerType",
                timeType:'day'
            },
            todayData:[
                {
                    name:"产地",
                    phone:'活跃',
                    address:'四川雅安'
                },
                {
                    name:"药厂",
                    phone:'15821955110',
                    address:'四川雅安'
                },
                {
                    name:"药商",
                    phone:'15821955110',
                    address:'四川雅安'
                },
                {
                    name:"服务商",
                    phone:'15821955110',
                    address:'四川雅安'
                }
            ],
            showType:{
                type:'新增',
                time:[],
            }
        }
    },
    vuex: {
        getters: {
            getCustypechart
        },
        actions: {
        }
    },
    events: {
    },
    methods:{
    	toBackPage:function(){
    		this.$dispatch('back',this.loadParam.name)
    	},
        changeTypes:function(){
            this.$dispatch('freshCus',this.showType)
        },
        selectTime:function(data){
            if(data=="month"){
                this.loadParam.year=[];
                this.loadParam.timeType = 'day'
            }else{
                this.loadParam.yearMonth='';
                this.loadParam.month='';
                this.loadParam.timeType = 'month'
            }
        }
    },
    created() {
        this.$dispatch('freshCus',this.showType)
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
    overflow: hidden;
}

</style>
