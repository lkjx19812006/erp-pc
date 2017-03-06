<template>
    <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">全部订单交易统计</div>
            <div class="btn btn-primary right" @click="refresh()">刷新</div>
        </div>
        <!-- 日期统计 -->
        <div class="order_table clearfix" style="margin-top: 15px;">
            <div class="btn-group left">
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
            <div class="btn-group clearfix">
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
                </div>
            </div>
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-bordered table-striped " v-cloak>
                <thead>
                    <tr style="background:none;color:#000">
                        <th rowspan="1"></th>
                        <th colspan="11">销售订单</th>
                        <th colspan="11">采购订单</th>
                    </tr>
                    <tr style="background:none;color:#000">
                        <th rowspan="2">全部</th>
                        <th rowspan="1"></th>
                        <th colspan="3">全部订单</th>
                        <th colspan="3">全部已完成</th>
                        <th colspan="4">进行中订单</th>
                        <th rowspan="1"></th>
                        <th colspan="3">全部订单</th>
                        <th colspan="3">全部已完成</th>
                        <th colspan="4">进行中订单</th>
                    </tr>
                    <tr style="background:none;color:#000">
                        <th>货币</th>
                        <th>订单数</th>
                        <th>重量</th>
                        <th>订单金额</th>
                        <th>订单数</th>
                        <th>重量</th>
                        <th>订单金额</th>
                        <th>订单数</th>
                        <th>重量</th>
                        <th>订单金额</th>
                        <th>应收账款</th>
                        <th>货币</th>
                        <th>订单数</th>
                        <th>重量</th>
                        <th>订单金额</th>
                        <th>订单数</th>
                        <th>重量</th>
                        <th>订单金额</th>
                        <th>订单数</th>
                        <th>重量</th>
                        <th>订单金额</th>
                        <th>应付账款</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowspan="10">{{$store.state.table.login.name}}</td>
                    </tr>
                    <tr>
                        <td>人民币</td>
                        <td>{{initMyOrderCount.salesAllNum | isnull}}</td>
                        <td>{{initMyOrderCount.salesAllWeight | isnull}}kg</td>
                        <td>{{initMyOrderCount.salesAllTotal | isnull}}元</td>
                        <td>{{initMyOrderCount.salesEndNum | isnull}}</td>
                        <td>{{initMyOrderCount.salesEndWeight | isnull}}kg</td>
                        <td>{{initMyOrderCount.salesEndTotal | isnull}}元</td>
                        <td>{{initMyOrderCount.salesIngNum | isnull}}</td>
                        <td>{{initMyOrderCount.salesIngWeight | isnull}}kg</td>
                        <td>{{initMyOrderCount.salesIngTotal | isnull}}元</td>
                        <td>{{initMyOrderCount.salesReceivables | isnull}}元</td>
                        <td>人民币</td>
                        <td>{{initMyOrderCount.buyAllNum | isnull}}</td>
                        <td>{{initMyOrderCount.buyAllWeight | isnull}}kg</td>
                        <td>{{initMyOrderCount.buyAllTotal | isnull}}元</td>
                        <td>{{initMyOrderCount.buyEndNum | isnull}}</td>
                        <td>{{initMyOrderCount.buyEndWeight | isnull}}kg</td>
                        <td>{{initMyOrderCount.buyEndTotal | isnull}}元</td>
                        <td>{{initMyOrderCount.buyIngNum | isnull}}</td>
                        <td>{{initMyOrderCount.buyIngWeight | isnull}}kg</td>
                        <td>{{initMyOrderCount.buyIngTotal | isnull}}元</td>
                        <td>{{initMyOrderCount.buyPayable | isnull}}元</td>
                    </tr>
                    <tr>
                        <td>美元</td>
                        <td>{{initMyOrderCount.salesAllNum | isnull}}</td>
                        <td>{{initMyOrderCount.salesAllWeight | isnull}}kg</td>
                        <td>{{initMyOrderCount.salesAllTotal | isnull}}元</td>
                        <td>{{initMyOrderCount.salesEndNum | isnull}}</td>
                        <td>{{initMyOrderCount.salesEndWeight | isnull}}kg</td>
                        <td>{{initMyOrderCount.salesEndTotal | isnull}}元</td>
                        <td>{{initMyOrderCount.salesIngNum | isnull}}</td>
                        <td>{{initMyOrderCount.salesIngWeight | isnull}}kg</td>
                        <td>{{initMyOrderCount.salesIngTotal | isnull}}元</td>
                        <td>{{initMyOrderCount.salesReceivables | isnull}}元</td>
                        <td>美元</td>
                        <td>{{initMyOrderCount.buyAllNum | isnull}}</td>
                        <td>{{initMyOrderCount.buyAllWeight | isnull}}kg</td>
                        <td>{{initMyOrderCount.buyAllTotal | isnull}}元</td>
                        <td>{{initMyOrderCount.buyEndNum | isnull}}</td>
                        <td>{{initMyOrderCount.buyEndWeight | isnull}}kg</td>
                        <td>{{initMyOrderCount.buyEndTotal | isnull}}元</td>
                        <td>{{initMyOrderCount.buyIngNum | isnull}}</td>
                        <td>{{initMyOrderCount.buyIngWeight | isnull}}kg</td>
                        <td>{{initMyOrderCount.buyIngTotal | isnull}}元</td>
                        <td>{{initMyOrderCount.buyPayable | isnull}}元</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="module clear" style="max-height:500px;overflow:auto">
            <div class="btn-group" style="margin-top:20px">
                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': timeParam.timeType=='day'}" @click="clickChange('day')">
                    详情列表
                </button>
                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': timeParam.timeType=='11'}" @click="clickChange('day')">
                    人员列表
                </button>
                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': timeParam.timeType=='111'}" @click="clickChange('day')">
                    部门列表
                </button>
                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': timeParam.timeType=='week'}" @click="clickChange('week')">
                    客户类型
                </button>
                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': timeParam.timeType=='month'}" @click="clickChange('month')">
                    地区
                </button>
                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': timeParam.timeType=='quarter'}" @click="clickChange('quarter')">
                    品种
                </button>
                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': timeParam.timeType=='year'}" @click="clickChange('year')">
                    产地
                </button>
            </div>
            <table class="table table-hover table_color table-bordered table-striped " v-cloak>
                <tr style="background:none;color:#000">
                    <th rowspan="2">全部</th>
                    <th colspan="7">销售订单</th>
                    <th colspan="7">采购订单</th>
                </tr>
                <tr style="background:none;color:#000">
                    <th>订单数</th>
                    <th>订单金额</th>
                    <th>成本</th>
                    <th>杂费</th>
                    <th>优惠</th>
                    <th>已付</th>
                    <th>应收</th>
                    <th>订单数</th>
                    <th>订单金额</th>
                    <th>成本</th>
                    <th>杂费</th>
                    <th>优惠</th>
                    <th>已付</th>
                    <th>应付</th>
                </tr>
                <tr v-for="item in initMyTimeOrderCount">
                    <td>
                        <div v-if="timeParam.timeType=='day'">{{item.date}}</div>
                        <div v-if="timeParam.timeType=='week'">{{item.date}}周</div>
                        <div v-if="timeParam.timeType=='month'">{{item.date}}月</div>
                        <div v-if="timeParam.timeType=='quarter'">{{item.date}}季度</div>
                        <div v-if="timeParam.timeType=='year'">{{item.date}}年</div>
                    </td>
                    <td>{{item.salesNewNum}}</td>
                    <td>{{item.salesNewWeight}}kg</td>
                    <td>{{item.salesNewTotal}}元</td>
                    <td>{{item.salesEndNum}}</td>
                    <td>{{item.salesEndWeight}}kg</td>
                    <td>{{item.salesEndTotal}}元</td>
                    <td>{{item.buyNewNum}}</td>
                    <td>{{item.buyNewWeight}}kg</td>
                    <td>{{item.buyNewTotal}}元</td>
                    <td>{{item.buyEndNum}}</td>
                    <td>{{item.buyEndWeight}}kg</td>
                    <td>{{item.buyEndTotal}}元</td>
                    <td>{{item.buyEndWeight}}kg</td>
                    <td>{{item.buyEndTotal}}元</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import filter from '../../filters/filters'
import pagination from '../pagination'
import mzDatepicker from '../calendar/vue.datepicker.js'
import {
    initMyOrderCount,
    initMyTimeOrderCount
} from '../../vuex/getters'
import {
    getOrderCount,
    getTimeOrderCount
} from '../../vuex/actions'

export default {
    components: {
        pagination,
        mzDatepicker
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                link: "/report/order/total",
                key: "myOrderCount",
                objType: 'employee',
                employee: this.$store.state.table.login.id,
                endTime: ''
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
            this.timeParam.timeType = timeType;
            this.getTimeOrderCount(this.timeParam);
        },
        refresh: function() {
            this.getOrderCount(this.loadParam);
            this.getTimeOrderCount(this.timeParam);
        }
    },
    vuex: {
        getters: {
            initMyOrderCount,
            initMyTimeOrderCount
        },
        actions: {
            getOrderCount,
            getTimeOrderCount
        }
    },
    events: {

    },
    created() {
        this.getOrderCount(this.loadParam);
        this.getTimeOrderCount(this.timeParam);
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
    filter: (filter, {})
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

.table {
    margin-bottom: 20px;
    position: relative;
    display: table;
}

.btn-warning {
    background-color: #fa6705;
}
</style>
