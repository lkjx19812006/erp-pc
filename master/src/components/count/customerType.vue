<template>
    <div class="box" style="max-height: 100%;overflow: auto;">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">客户类型统计</div>
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
                            <dt class="left transfer marg_top" style="margin-left: 20px">客户类型：</dt>
                            <dd class="left margin_right">
                                <select class="form-control edit-input" placeholder="按回车键搜索" v-model="loadParam.depotType" @keyup.enter="selectSearch()">
                                    <option value="社会库存">社会库存</option>
                                    <option value="自营库存">自营库存</option>
                                </select>
                            </dd>
                            <dt class="left transfer marg_top" style="margin-left: 20px">按月：</dt>
                            <dd class="left margin_right">
                                <select class="form-control edit-input" placeholder="按回车键搜索" v-model="loadParam.depotType" @keyup.enter="selectSearch()">
                                    <option value="社会库存">社会库存</option>
                                    <option value="自营库存">自营库存</option>
                                </select>
                            </dd>
                        </div>
                    </span>
                </h4>
                
                <div class="line_chart">
                    <div class="linechart" v-echarts="getLineschart.options" :loading="getLineschart.load"></div>
                </div>
            </div>
            
            <!-- 用户详情 -->
            <div class="user_detail">
                <div class="user_detail_right">
                    <h4 class="detail_title bg-info">活跃用户<span class="detail_num"><a href="javascript:void(0);" class="person_num">人数：60</a><a href="javascript:void(0);" class="person_num">人次：60</a>&nbsp<a href="javascript:void(0);" class="btn btn-link" @click="showDetail('newActiveDetail')">more>></a></span></h4>
                            <table class="table table-hover table_color table-striped">
                                <thead>
                                    <tr>
                                        <th style="min-width:100px;text-align: center;">用户</th>
                                        <th style="min-width:120px;text-align: center;">联系方式</th>
                                        <th style="min-width:130px;text-align: center;">
                                            活跃类型
                                            <select>
                                                <option>报价</option>
                                                <option>留言</option>
                                            </select>
                                        </th>
                                        <th style="min-width:150px;text-align: center;">编号</th>
                                        <th style="min-width:150px;text-align: center;">时间</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in todayData">
                                        <td><a href="javascript:void(0);">{{item.name}}</a></td>
                                        <td>{{item.phone}}</td>
                                        <td>报价</td>
                                        <td>123456789</td>
                                        <td>2017-05-03</td>
                                    </tr>
                                    <tr v-for="item in todayData">
                                        <td><a href="javascript:void(0);">{{item.name}}</a></td>
                                        <td>{{item.phone}}</td>
                                        <td>报价</td>
                                        <td>123456789</td>
                                        <td>2017-05-03</td>
                                    </tr>
                                </tbody>
                            </table>
                        <!--底部分页-->
                            <pagination :combination="loadParam" slot="page"></pagination>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
import pagination from '../pagination'

import {
    initClientcount,
    getColchart,
    getLineschart
} from '../../vuex/getters'
import {
    getClientcount
} from '../../vuex/actions'

export default {
    components: {
        pagination
    },
    data() {
        return {
            loadParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 4,
                total: 0,
                name:"customerType"
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
            ]
        }
    },
    methods: {
        clickChange: function(currentView) {

        }
    },
    vuex: {
        getters: {
            initClientcount,
            getColchart,
            getLineschart
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
    methods:{
    	toBackPage:function(){
    		this.$dispatch('back',this.loadParam.name)
    	}
    },
    created() {
        this.getClientcount(this.loadParam);
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
