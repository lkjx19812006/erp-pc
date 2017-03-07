<template>
    <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">全部订单交易统计</div>
            <div class="btn btn-primary right" @click="refresh()">刷新</div>
        </div>
        <!-- 日期统计 -->
        <div class="order_table clearfix" style="margin-top: 15px;" id="top">
            <div class="btn-group">
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.orderType==1}" @click="clickType(1)">
                    销售
                </button>
                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': loadParam.orderType===0}" @click="clickType(0)">
                    采购
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
                    <button type="button" class="btn btn-default" style="margin-left: 15px;" @click="search
                    ()">搜索</button>
                    <button type="button" class="btn btn-default" @click="resetCondition()">{{$t("static.clear_all")}}</button>
                </div>
            </div>
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-bordered table-striped " v-cloak>
                <thead>
                    <tr style="background:none;color:#000">
                        <th>全部</th>
                        <th>币种</th>
                        <th>订单数</th>
                        <th>订单金额</th>
                        <th>成本</th>
                        <th>杂费</th>
                        <th>优惠</th>
                        <th v-if="loadParam.orderType==0">已付</th>
                        <th v-if="loadParam.orderType==0">未付</th>
                        <th v-if="loadParam.orderType==1">已收</th>
                        <th v-if="loadParam.orderType==1">应收</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowspan="10">{{initOrderStatics.name}}</td>
                    </tr>
                    <tr v-for="item in initOrderStatics.statisticsList">
                        <td>{{item.currency}}</td>
                        <td>{{item.orderCount}}笔</td>
                        <td>{{item.amountSum}}</td>
                        <td>{{item.costSum}}</td>
                        <td>{{item.incidentalsSum}}</td>
                        <td>{{item.preferentialSum}}</td>
                        <td>{{item.prepaidSum}}</td>
                        <td>{{item.totalSum}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="order_table" style="max-height:500px;overflow:auto" id="table_box">
            <div class="btn-group" style="position:fixed;height:32px;z-index: 200;">
                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': groupType=='detail'}" @click="changeGroupType('detail')">
                    详情
                </button>
                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': groupType=='employee'}" @click="changeGroupType('employee')">
                    员工
                </button>
                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': groupType=='department'}" @click="changeGroupType('department')">
                    部门
                </button>
                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': groupType=='customer_type'}" @click="changeGroupType('customer_type')">
                    客户类型
                </button>
                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': groupType=='phone_province'}" @click="changeGroupType('phone_province')">
                    地区
                </button>
                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': groupType=='breed_id'}" @click="changeGroupType('breed_id')">
                    品种
                </button>
                <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': groupType=='location'}" @click="changeGroupType('location')">
                    产地
                </button>
            </div>
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <!-- 详情列表 -->
            <table class="table table-hover table_color table-bordered table-striped " v-cloak id="tab" v-if="groupType=='detail'" style="margin-top:32px;">
                <tr style="background:none;color:#000">
                    <th>业务员</th>
                    <th>成交时间</th>
                    <th>订单商品</th>
                    <th>类型</th>
                    <th>货币</th>
                    <th>订单金额</th>
                    <th>成本</th>
                    <th>杂费</th>
                    <th>优惠</th>
                    <th v-if="loadParam.orderType==0">已付</th>
                    <th v-if="loadParam.orderType==0">未付</th>
                    <th v-if="loadParam.orderType==1">已收</th>
                    <th v-if="loadParam.orderType==1">应收</th>
                </tr>
                <tr v-for="item in initMyOrderCount">
                    <td>{{item.employeeName}}</td>
                    <td>{{item.tradeTime}}</td>
                    <td>{{item.goodsDesc}}</td>
                    <td v-if="item.type==0">{{$t('static.purchase')}}</td>
                    <td v-if="item.type==1">{{$t('static.sell')}}</td>
                    <td>{{item.currency | Currency}}</td>
                    <td>{{item.total}}</td>
                    <td>{{item.cost}}</td>
                    <td>{{item.incidentals}}</td>
                    <td>{{item.preferential}}</td>
                    <td>{{item.prepaid}}</td>
                    <td>{{item.total}}</td>
                </tr>
            </table>
            <!-- 人员列表 -->
            <table class="table table-hover table_color table-bordered table-striped " v-cloak id="tab" v-if="groupType=='employee'" style="margin-top:32px;">
                <tr style="background:none;color:#000">
                    <th>业务员</th>
                    <th>订单数</th>
                    <th>订单金额</th>
                    <th>成本</th>
                    <th>杂费</th>
                    <th>优惠</th>
                    <th v-if="loadParam.orderType==0">已付</th>
                    <th v-if="loadParam.orderType==0">未付</th>
                    <th v-if="loadParam.orderType==1">已收</th>
                    <th v-if="loadParam.orderType==1">应收</th>
                </tr>
                <tbody v-for="item in initOrgOrderCount">
                    <tr>
                        <td rowspan="10">{{item.name}}</td>
                    </tr>
                    <tr v-for="item in initOrgOrderCount[$index].statisticsList">
                        <td>{{item.orderCount}}笔</td>
                        <td>{{item.amountSum}}{{item.currency}}</td>
                        <td>{{item.costSum}}</td>
                        <td>{{item.incidentalsSum}}</td>
                        <td>{{item.preferentialSum}}</td>
                        <td>{{item.prepaidSum}}</td>
                        <td>{{item.totalSum}}</td>
                    </tr>
                </tbody>
            </table>
            <!-- 部门列表 -->
            <table class="table table-hover table_color table-bordered table-striped " v-cloak id="tab" v-if="groupType=='department'" style="margin-top:32px;">
                <tr style="background:none;color:#000">
                    <th>部门</th>
                    <th>订单数</th>
                    <th>订单金额</th>
                    <th>成本</th>
                    <th>杂费</th>
                    <th>优惠</th>
                    <th v-if="loadParam.orderType==0">已付</th>
                    <th v-if="loadParam.orderType==0">未付</th>
                    <th v-if="loadParam.orderType==1">已收</th>
                    <th v-if="loadParam.orderType==1">应收</th>
                </tr>
                <tbody v-for="item in initOrgOrderCount">
                    <tr>
                        <td rowspan="10">{{item.name}}</td>
                    </tr>
                    <tr v-for="item in initOrgOrderCount[$index].statisticsList">
                        <td>{{item.orderCount}}笔</td>
                        <td>{{item.amountSum}}{{item.currency}}</td>
                        <td>{{item.costSum}}</td>
                        <td>{{item.incidentalsSum}}</td>
                        <td>{{item.preferentialSum}}</td>
                        <td>{{item.prepaidSum}}</td>
                        <td>{{item.totalSum}}</td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-hover table_color table-bordered table-striped " v-cloak id="tab" v-if="groupType=='customer_type'||groupType=='phone_province'||groupType=='breed_id'||groupType=='location'" style="margin-top:32px;">
                <thead>
                    <tr style="background:none;color:#000">
                        <th>序号</th>
                        <th>
                            <span v-if="groupType=='customer_type'">客户类型</span>
                            <span v-if="groupType=='customerName'">人员列表</span>
                            <span v-if="groupType=='phone_province'">地区</span>
                            <span v-if="groupType=='breed_id'">品种</span>
                            <span v-if="groupType=='location'">产地</span>
                        </th>
                        <th>订单笔数</th>
                        <th>重量</th>
                        <th>订单金额</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initOrgOrderSortCount">
                        <td width="100px">{{$index+1}}</td>
                        <td>
                            <span v-if="groupType=='customer_type'">{{item.customerTypeName}}</span>
                            <span v-if="groupType=='phone_province'">{{item.phoneProvince}}</span>
                            <span v-if="groupType=='breed_id'">{{item.breedName}}</span>
                            <span v-if="groupType=='location'">{{item.location}}</span>
                        </td>
                        <td>{{item.total}}笔</td>
                        <td>{{item.totalNumber}}kg</td>
                        <td>{{item.totalAmount}}元</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import {
    initAllOrderCount,
    initMyTimeOrderCount,
    initOrderStatics,
    initOrgOrderSortCount,
    initOrgOrderCount,
    initMyOrderCount //详情列表
} from '../../vuex/getters'
import {
    getOrgCountList, //部门列表
    getOrderCountList, //全部订单统计
    getTimeOrderCount,
    getOrderCount //详情列表
} from '../../vuex/actions'
import filter from '../../filters/filters'
import pagination from '../pagination'
import mzDatepicker from '../calendar/vue.datepicker.js'
import common from '../../common/common.js'
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
                endTime: '',
                link: '/report/order/org/totalStatistics',
                key: "allOrderCount",
                startTime: '',
                orderType: 1,
                timeType: ''
            },
            employeeParam: { //业务员列表
                loading: true,
                color: '#5dc596',
                size: '15px',
                link: "/report/order/employee/totalStatistics",
                key: "orgOrderCount",
                endTime: '',
                startTime: '',
                orderType: 1,
                timeType: '',
            },
            orgParam: { //部门列表
                loading: true,
                color: '#5dc596',
                size: '15px',
                link: "/report/order/org/totalStatistics",
                key: "orgOrderCount",
                endTime: '',
                startTime: '',
                orderType: 1,
                timeType: '',
            },
            detailParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                endTime: '',
                key: "allOrderCount",
                startTime: '',
                orderType: 1,
                timeType: ''
            },
            sortParam: {
                loading: true,
                link: "/report/order/type",
                key: "orgOrderSortCount",
                groupType: 'customer_type'
            },
            groupType: 'detail',
            currentView: 1,
        }
    },
    methods: {
        clickChange: function(timeType) {
            this.loadParam.timeType = timeType;
            this.loadParam.startTime = '';
            this.loadParam.endTime = '';
            this.getOrderCountList(this.loadParam);
            this.getOrgCountList(this.loadParam);
        },
        changeGroupType: function(groupType) {
            if (groupType == 'detail') {
                this.groupType = groupType;
                this.getOrderCount(this.detailParam);
            } else if (groupType == 'employee') {
                this.groupType = groupType;
                this.getOrgCountList(this.employeeParam)
            } else if (groupType == 'department') {
                this.groupType = groupType;
                this.getOrgCountList(this.orgParam)
            } else {
                this.groupType = groupType;
                this.sortParam.groupType = groupType;
                this.getOrgCountList(this.sortParam);
            }

        },
        clickType: function(type) {
            this.loadParam.orderType = type;
            this.getOrderCountList(this.loadParam);
            this.getOrgCountList(this.loadParam)
        },
        search: function() {
            this.loadParam.timeType = '';
            this.getOrderCountList(this.loadParam);
            this.getOrgCountList(this.loadParam);
        },
        resetCondition: function() {
            this.loadParam.timeType = '';
            this.loadParam.startTime = '';
            this.loadParam.endTime = '';
            this.loadParam.orderType = '';
            this.getOrderCountList(this.loadParam);
            this.getOrgCountList(this.loadParam);
        },
        refresh: function() {
            this.getOrgCountList(this.loadParam); //部门列表
            this.getOrderCountList(this.loadParam); //全部订单
            this.getOrgCountList(this.sortParam); //客户类型、地区、品种、产地
        }
    },
    vuex: {
        getters: {
            initAllOrderCount,
            initMyTimeOrderCount,
            initOrderStatics,
            initOrgOrderSortCount,
            initMyOrderCount,
            initOrgOrderCount
        },
        actions: {
            getOrgCountList,
            getTimeOrderCount,
            getOrderCountList,
            getOrderCount //详情列表

        }
    },
    events: {

    },
    created() {
        this.getOrgCountList(this.loadParam);
        this.getOrderCount(this.detailParam);
        this.getOrderCountList(this.loadParam);
        this.getOrgCountList(this.sortParam)
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
