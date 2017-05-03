<template>
    <div class="box" style="max-height: 1000px;overflow: auto;">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">我的统计</div>
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
            <!-- 今日新增 -->
            <div class="bar_today">
                <h4 class="detail_title bg-info">今日新增<span class="detail_num"><a href="javascript:void(0);" class="btn btn-info">60人</a>&nbsp<a href="javascript:void(0);" class="btn btn-info">more</a></span></h4>
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
                        <dt class="left transfer marg_top">客户名称：</dt>
                        <dd class="left margin_right">
                            <input type="text" class="form-control" v-model="loadParam.breedName" readonly="readonly" placeholder="按回车键搜索" @keyup.enter="selectSearch()" @click='openBreedSearch()'/>
                        </dd>
                        <dt class="left transfer marg_top" style="margin-left: 20px">时间：</dt>
                        <dd class="left margin_right">
                            <select class="form-control edit-input" placeholder="按回车键搜索" v-model="loadParam.depotName" @keyup.enter="selectSearch()">
                                <option value="亳州">亳州</option>
                                <option value="玉林">玉林</option>
                                <option value="安国">安国</option>
                                <option value="定西">定西</option>
                                <option value="成都">成都</option>
                            </select>
                        </dd>
                        <dt class="left transfer marg_top" style="margin-left: 20px">区域：</dt>
                        <dd class="left margin_right">
                            <select class="form-control edit-input" placeholder="按回车键搜索" v-model="loadParam.depotName" @keyup.enter="selectSearch()">
                                <option value="亳州">亳州</option>
                                <option value="玉林">玉林</option>
                                <option value="安国">安国</option>
                                <option value="定西">定西</option>
                                <option value="成都">成都</option>
                            </select>
                        </dd>
                        <dt class="left transfer marg_top" style="margin-left: 20px">客户类型：</dt>
                        <dd class="left margin_right">
                            <select class="form-control edit-input" placeholder="按回车键搜索" v-model="loadParam.depotType" @keyup.enter="selectSearch()">
                                <option value="社会库存">社会库存</option>
                                <option value="自营库存">自营库存</option>
                            </select>
                        </dd>
                    </dl>
                </div>
                <!-- 左侧 -->
                <div class="user_detail_left">
                    <div class="detail_left_top">
                            <h4 class="detail_title bg-info">新增用户<span class="detail_num"><a href="javascript:void(0);" class="btn btn-info">60人</a>&nbsp<a href="javascript:void(0);" class="btn btn-info">more</a></span></h4>
                            <table class="table table-hover table_color table-striped">
                                <thead>
                                    <tr>
                                        <th style="min-width:100px;text-align: center;">用户</th>
                                        <th style="min-width:150px;text-align: center;">联系方式</th>
                                        <th style="min-width:100px;text-align: center;">区域</th>
                                        <th style="min-width:150px;text-align: center;">时间</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in todayData">
                                        <td><a href="javascript:void(0);">{{item.name}}</a></td>
                                        <td>{{item.phone}}</td>
                                        <td>{{item.address}}</td>
                                        <td>2017-05-03</td>
                                    </tr>
                                </tbody>
                            </table>
                        <!--底部分页-->
                            <pagination :combination="loadParam" slot="page"></pagination>
                    </div>
                    <div class="detail_left_top">
                         <h4 class="detail_title bg-info">成交用户<span class="detail_num">人数：<a href="javascript:void(0);" class="btn btn-info">60</a>人次：<a href="javascript:void(0);" class="btn btn-info">60</a>&nbsp<a href="javascript:void(0);" class="btn btn-info">more</a></span></h4>
                            <table class="table table-hover table_color table-striped">
                                <thead>
                                    <tr>
                                        <th style="min-width:100px;text-align: center;">用户</th>
                                        <th style="min-width:120px;text-align: center;">联系方式</th>
                                        <th style="min-width:130px;text-align: center;">订单号</th>
                                        <th style="min-width:150px;text-align: center;">时间</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in todayData">
                                        <td><a href="javascript:void(0);">{{item.name}}</a></td>
                                        <td>{{item.phone}}</td>
                                        <td>123456789</td>
                                        <td>2017-05-03</td>
                                    </tr>
                                </tbody>
                            </table>
                        <!--底部分页-->
                            <pagination :combination="loadParam" slot="page"></pagination>
                    </div>
                </div>

                <!-- 右侧 -->
                <div class="user_detail_right">
                    <h4 class="detail_title bg-info">活跃用户<span class="detail_num">人数：<a href="javascript:void(0);" class="btn btn-info">60</a>人次：<a href="javascript:void(0);" class="btn btn-info">60</a>&nbsp<a href="javascript:void(0);" class="btn btn-info">more</a></span></h4>
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
                total: 0
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
            this.currentView = currentView;
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
.acolor{

}
</style>
