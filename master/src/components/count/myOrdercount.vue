<template>
    <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">我的订单交易统计</div>
            <div class="btn btn-primary right" @click="refresh()">{{$t('static.refresh')}}</div>
        </div>
        <!-- 日期统计 -->
        <div class="order_table clearfix" style="margin-top: 15px;" id="top">
            <div class="btn-group">
                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': loadParam.orderType==1}" @click="clickType(1)">
                    {{$t('static.sell')}}
                </button>
                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': loadParam.orderType===0}" @click="clickType(0)">
                    {{$t('static.purchase')}}
                </button>
            </div>
            <div class="btn-group">
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.timeType=='day'}" @click="clickChange('day')">
                    日
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.timeType=='week'}" @click="clickChange('week')">
                    周
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.timeType=='month'}" @click="clickChange('month')">
                    月
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.timeType=='quarter'}" @click="clickChange('quarter')">
                    季
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.timeType=='year'}" @click="clickChange('year')">
                    年
                </button>
            </div>
            <div class="btn-group clearfix right">
                <div class="clear transfer">
                    <div class="left">
                        <dt class="left transfer marg_top">{{$t('static.start_end')}}：</dt>
                        <mz-datepicker :time.sync="loadParam.startTime" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                    <div class="left">
                        <dt class="left marg_top">~~</dt>
                        <mz-datepicker :time.sync="loadParam.endTime" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                    <button type="button" class="btn btn-default" style="margin-left: 15px;" @click="search()">{{$t('static.search')}}</button>
                    <button type="button" class="btn btn-default" @click="resetCondition()">{{$t("static.clear_all")}}</button>
                </div>
            </div>
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <div style="max-height: 200px;overflow: auto;">
                <table class="table table-hover table_color table-bordered table-striped " v-cloak>
                    <thead>
                        <tr style="background:none;color:#000">
                            <th>{{$t('static.salesman')}}</th>
                            <th>{{$t('static.currency')}}</th>
                            <th>订单数</th>
                            <th>{{$t('static.total_money')}}</th>
                            <th>{{$t('static.cost')}}</th>
                            <th>{{$t('static.sundry_fees')}}</th>
                            <th>{{$t('static.preferential')}}</th>
                            <th v-if="loadParam.orderType==0">已付</th>
                            <th v-if="loadParam.orderType==0">未付</th>
                            <th v-if="loadParam.orderType==1">已收</th>
                            <th v-if="loadParam.orderType==1">应收/未收</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowspan="10">{{initOrderStatics.name}}</td>
                        </tr>
                        <tr v-for="item in initOrderStatics.statisticsList">
                            <td>{{item.currency}}</td>
                            <td>{{item.orderCount}}笔</td>
                            <td>{{item.amountSum | money}}</td>
                            <td>{{item.costSum | money}}</td>
                            <td>{{item.incidentalsSum}}</td>
                            <td>{{item.preferentialSum}}</td>
                            <td>{{item.prepaidSum | money}}</td>
                            <td>{{item.totalSum - item.prepaidSum| money}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="btn-group" style="margin-top:20px;max-height: 500px;overflow: auto;" id="table_box">
            <div style="position:fixed;height:32px;z-index: 200;">
                <button type="button" class="btn btn-warning">{{$t('static.details')}}</button>
            </div>
            <table class="table table-hover table_color table-bordered table-striped " v-cloak id="tab" style="margin-top:32px;">
                <tr style="background:none;color:#000">
                    <th>成交时间</th>
                    <th>{{$t('static.breed')}}</th>
                    <th>{{$t('static.type')}}</th>
                    <th>{{$t('static.currency')}}</th>
                    <th>{{$t('static.total_money')}}</th>
                    <th>{{$t('static.cost')}}</th>
                    <th>{{$t('static.trading_patterns')}}</th>
                    <th>已支付</th>
                </tr>
                <tr v-for="item in initMyOrderCount">
                    <td>{{item.tradeTime}}</td>
                    <td>{{item.goodsDesc}}</td>
                    <td v-if="item.type==0">{{$t('static.purchase')}}</td>
                    <td v-if="item.type==1">{{$t('static.sell')}}</td>
                    <td>{{item.currency | Currency}}</td>
                    <td>{{item.total | money}}</td>
                    <td>{{item.cost | money}}</td>
                    <td v-if="item.mode==1">{{$t('static.together')}}</td>
                    <td v-if="item.mode==2">{{$t('static.three_side')}}</td>
                    <td v-if="item.mode==3">{{$t('static.self_support')}}</td>
                    <td>{{item.prepaid | money}}</td>
                </tr>
            </table>
            <div class="base_pagination">
                <pagination :combination="loadParam"></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import {
    initMyOrderCount,
    initMyTimeOrderCount,
    initOrderStatics
} from '../../vuex/getters'
import {
    getOrderCount,
    getOrderCountList,
    getTimeOrderCount
} from '../../vuex/actions'
import filter from '../../filters/filters'
import pagination from '../pagination'
import mzDatepicker from '../calendar/vue.datepicker.js'
import common from '../../common/common.js'
export default {
    components: {
        pagination,
        mzDatepicker,
        pagination
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                employee: this.$store.state.table.login.id,
                endTime: '',
                startTime: '',
                orderType: 1,
                timeType: 'month',
                cur: 1,
                all: 15,
                total: 0
            },
            timeParam: {
                loading: true,
                link: "/report/order/new/add",
                timeType: "day",
                objType: "employee",
                employee: this.$store.state.table.login.id,
            },
            currentView: 1,
        }
    },
    methods: {
        clickChange: function(timeType) {
            this.loadParam.timeType = timeType;
            this.loadParam.startTime = '';
            this.loadParam.endTime = '';
            this.getOrderCountList(this.loadParam);
            this.getOrderCount(this.loadParam);
        },
        clickType: function(type) {
            this.loadParam.orderType = type;
            this.getOrderCountList(this.loadParam);
            this.getOrderCount(this.loadParam)
        },
        search: function() {
            this.loadParam.timeType = '';
            this.getOrderCountList(this.loadParam);
            this.getOrderCount(this.loadParam);
        },
        resetCondition: function() {
            this.loadParam.timeType = '';
            this.loadParam.startTime = '';
            this.loadParam.endTime = '';
            this.loadParam.orderType = '';
            this.getOrderCountList(this.loadParam);
            this.getOrderCount(this.loadParam);
        },
        refresh: function() {
            this.getOrderCount(this.loadParam);
            this.getOrderCountList(this.loadParam);
        }
    },
    vuex: {
        getters: {
            initMyOrderCount,
            initMyTimeOrderCount,
            initOrderStatics
        },
        actions: {
            getOrderCount,
            getTimeOrderCount,
            getOrderCountList
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getOrderCount(this.loadParam);
        }
    },
    created() {
        this.getOrderCount(this.loadParam);
        /*this.getTimeOrderCount(this.timeParam);*/
        this.getOrderCountList(this.loadParam);

        console.log(this.initOrderStatics)
        if (!this.loadParam.endTime) {
            var date = new Date();
            date.setDate(date.getDate());
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            this.loadParam.endTime = year + "-" + month + "-" + day + " 00:00:00";
        }
    },
    filter: (filter, {}),
}
</script>
<style scoped>
.click_change span {
    padding: 0 20px;
    display: inline-block;
    border-right: 1px solid #ddd;
    cursor: pointer;
}

.date_active {
    background: #fa6705;
    color: #fff;
}

.order_table {
    text-align: left;
}

.table {
    margin-bottom: 20px;
    position: relative;
    display: table;
}

.table>thead>tr>th {
    font-weight: 700;
}

.btn-warning {
    background-color: #fa6705;
}
</style>
