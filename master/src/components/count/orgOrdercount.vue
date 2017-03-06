<template>
    <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">部门订单交易统计</div>
        </div>
        <div class="order_table">
            <!-- <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>  -->
            <table class="table table-hover table_color table-bordered table-striped " v-cloak>
                <thead>
                    <tr style="background:none;color:#000">
                        <th rowspan="1"></th>
                        <th colspan="11">销售订单</th>
                        <th colspan="11">采购订单</th>
                    </tr>
                    <tr style="background:none;color:#000">
                        <th rowspan="2">部门</th>
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
                        <td rowspan="2"></td>
                        <td>人民币</td>
                        <td>{{initOrgOrderCount.salesAllNum | isnull}}</td>
                        <td>{{initOrgOrderCount.salesAllWeight | isnull}}kg</td>
                        <td>{{initOrgOrderCount.salesAllTotal | isnull}}元</td>
                        <td>{{initOrgOrderCount.salesEndNum | isnull}}</td>
                        <td>{{initOrgOrderCount.salesEndWeight | isnull}}kg</td>
                        <td>{{initOrgOrderCount.salesEndTotal | isnull}}元</td>
                        <td>{{initOrgOrderCount.salesIngNum | isnull}}</td>
                        <td>{{initOrgOrderCount.salesIngWeight | isnull}}kg</td>
                        <td>{{initOrgOrderCount.salesIngTotal | isnull}}元</td>
                        <td>{{initOrgOrderCount.salesReceivables | isnull}}元</td>
                        <td>人民币</td>
                        <td>{{initOrgOrderCount.buyAllNum | isnull}}</td>
                        <td>{{initOrgOrderCount.buyAllWeight | isnull}}kg</td>
                        <td>{{initOrgOrderCount.buyAllTotal | isnull}}元</td>
                        <td>{{initOrgOrderCount.buyEndNum | isnull}}</td>
                        <td>{{initOrgOrderCount.buyEndWeight | isnull}}kg</td>
                        <td>{{initOrgOrderCount.buyEndTotal | isnull}}元</td>
                        <td>{{initOrgOrderCount.buyIngNum | isnull}}</td>
                        <td>{{initOrgOrderCount.buyIngWeight | isnull}}kg</td>
                        <td>{{initOrgOrderCount.buyIngTotal | isnull}}元</td>
                        <td>{{initOrgOrderCount.buyPayable | isnull}}元</td>
                    </tr>
                    <tr>
                        <td>美元</td>
                        <td>{{initOrgOrderCount.salesAllNum | isnull}}</td>
                        <td>{{initOrgOrderCount.salesAllWeight | isnull}}kg</td>
                        <td>{{initOrgOrderCount.salesAllTotal | isnull}}元</td>
                        <td>{{initOrgOrderCount.salesEndNum | isnull}}</td>
                        <td>{{initOrgOrderCount.salesEndWeight | isnull}}kg</td>
                        <td>{{initOrgOrderCount.salesEndTotal | isnull}}元</td>
                        <td>{{initOrgOrderCount.salesIngNum | isnull}}</td>
                        <td>{{initOrgOrderCount.salesIngWeight | isnull}}kg</td>
                        <td>{{initOrgOrderCount.salesIngTotal | isnull}}元</td>
                        <td>{{initOrgOrderCount.salesReceivables | isnull}}元</td>
                        <td>美元</td>
                        <td>{{initOrgOrderCount.buyAllNum | isnull}}</td>
                        <td>{{initOrgOrderCount.buyAllWeight | isnull}}kg</td>
                        <td>{{initOrgOrderCount.buyAllTotal | isnull}}元</td>
                        <td>{{initOrgOrderCount.buyEndNum | isnull}}</td>
                        <td>{{initOrgOrderCount.buyEndWeight | isnull}}kg</td>
                        <td>{{initOrgOrderCount.buyEndTotal | isnull}}元</td>
                        <td>{{initOrgOrderCount.buyIngNum | isnull}}</td>
                        <td>{{initOrgOrderCount.buyIngWeight | isnull}}kg</td>
                        <td>{{initOrgOrderCount.buyIngTotal | isnull}}元</td>
                        <td>{{initOrgOrderCount.buyPayable | isnull}}元</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="btn-group" style="margin-top:20px">
            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': groupType=='customer_type'}" @click="changeGroupType('customer_type')">
                客户类型
            </button>
            <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': groupType=='customerName'}" @click="changeGroupType('customerName')">
                人员列表
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
            <!-- <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': orderSort=='other'}" @click="changeOrderSort('other')">
            辅材其他
         </button> -->
        </div>
        <div class="order_table" style="max-height:500px;overflow:auto" id="table_box">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-bordered table-striped " v-cloak id="tab">
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
    initOrgOrderCount,
    initOrgOrderSortCount
} from '../../vuex/getters'
import {
    getOrderCount
} from '../../vuex/actions'
import filter from '../../filters/filters'
import pagination from '../pagination'
import common from '../../common/common'
import mzDatepicker from '../calendar/vue.datepicker.js'
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
                key: "orgOrderCount",
                objType: 'org',
                org: this.$store.state.table.login.orgId
            },
            sortParam: {
                loading: true,
                link: "/report/order/type",
                key: "orgOrderSortCount",
                groupType: 'customer_type'
            },
            groupType: 'customer_type',

        }
    },
    methods: {
        changeGroupType: function(groupType) {
            this.groupType = groupType;
            this.sortParam.groupType = groupType;
            this.getOrderCount(this.sortParam);
        }
    },
    vuex: {
        getters: {
            initOrgOrderCount,
            initOrgOrderSortCount
        },
        actions: {
            getOrderCount
        }
    },
    events: {

    },
    ready() {
        //common('tab','table_box',1);
    },
    created() {
        this.getOrderCount(this.loadParam);
        this.getOrderCount(this.sortParam);

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
    max-height: 20px;
}

.table-bordered {
    border-top: 0px solid #ddd;
}

.btn-warning {
    background-color: #fa6705;
}
</style>
