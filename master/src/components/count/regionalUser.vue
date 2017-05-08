<template>
    <div class="box" style="max-height: 100%;overflow: auto;">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">区域新增客户</div>
            <div class="btn btn-primary right" @click="toBackPage()">{{$t('static.back')}}</div>
        </div>
        <div class="user_all">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <!-- 折线图 -->
            <div class="line_today">
                <h4 class="detail_title bg-info">用户总览</h4>               
                <div class="line_chart">
                    <div class="linechart" v-echarts="getRegionalchart.options" :loading="getRegionalchart.load"></div>
                </div>
            </div>            
            <!-- 用户详情 -->
            <div class="user_detail">
                <div class="user_detail_right">
                    <h4 class="detail_title bg-info">活跃用户
	                    <span class="detail_num">
		                    <a href="javascript:void(0);" class="person_num">人数：60</a>
		                    <a href="javascript:void(0);" class="person_num">人次：60</a>&nbsp		                    
	                    </span>
                    </h4>
                    <table class="table table-hover table_color table-striped">
                        <thead>
                            <tr>
                                <th style="min-width:200px;text-align: center;">省份</th>
                                <th style="min-width:240px;text-align: center;">今日新增</th>
                                <th style="min-width:240px;text-align: center;">新增用户</th>
                                <th style="min-width:240px;text-align: center;">成交用户</th>
                                <th style="min-width:280px;text-align: center;">
                                    活跃用户
                                    <select>
                                        <option>报价</option>
                                        <option>留言</option>
                                    </select>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in todayData">
                                <td><a href="javascript:void(0);">{{item.name}}</a></td>
                                <td>{{item.phone}}</td>
                                <td>60</td>
                                <td>789</td>
                                <td>100</td>
                            </tr>
                            <tr v-for="item in todayData">
                                <td><a href="javascript:void(0);">{{item.name}}</a></td>
                                <td>{{item.phone}}</td>
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
    getRegionalchart
} from '../../vuex/getters'
import {

} from '../../vuex/actions'

export default {
    components: {
        pagination
    },
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
            todayData:[
                {
                    name:"安徽",
                    phone:'活跃',
                    address:'四川雅安'
                },
                {
                    name:"江苏",
                    phone:'15821955110',
                    address:'四川雅安'
                },
                {
                    name:"上海",
                    phone:'15821955110',
                    address:'四川雅安'
                },
                {
                    name:"浙江",
                    phone:'15821955110',
                    address:'四川雅安'
                },
                {
                    name:"山东",
                    phone:'15821955110',
                    address:'四川雅安'
                },
                {
                    name:"北京",
                    phone:'15821955110',
                    address:'四川雅安'
                },
                {
                    name:"河南",
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
            getRegionalchart
        },
        actions: {
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
    	}
    },
    created() {
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
