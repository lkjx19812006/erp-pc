<template>
    <div>
        <selectorg-model :param="selectOrgParam" v-if="selectOrgParam.show"></selectorg-model>
        <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
        <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
        <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
        <mglist-model>
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clear left">
                    <dl class="clear left transfer">
                        <div class="left">
                            <dt class="left transfer marg_top">交易日期：</dt>
                            <mz-datepicker :time.sync="loadParam.startTime" format="yyyy-MM-dd HH:mm:ss">
                            </mz-datepicker>
                        </div>
                        <div class="left">
                            <dt class="left marg_top">~~</dt>
                            <mz-datepicker :time.sync="loadParam.endTime" format="yyyy-MM-dd HH:mm:ss">
                            </mz-datepicker>
                        </div>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.breed')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.breedName" readonly="true" @click="breedSearch()" />
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">区域：</dt>
                        <dl class="left">
                            <v-select :debounce="250" :value.sync="loadParam.location" :options="initCNProvince" placeholder="省/Province" label="cname">
                            </v-select>
                        </dl>
                    </dl>
                </div>
                <div class="clear left">
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">部门：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.orgName" placeholder="请选择部门" readonly="true" @click="selectOrg()" />
                        </dd>
                    </dl>
                    <!-- 单个业务员搜索 -->
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top" style="letter-spacing:3px">所属业务员：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.employeeName" placeholder="请选择业务员" @click="selectEmployee()">
                        </dd>
                    </dl>
                    <button class="btn btn-primary" @click="selectSearch()">{{$t('static.search')}}</button>
                    <button type="button" class="btn btn-warning" @click="resetCondition()">{{$t('static.clear_all')}}</button>
                </div>
            </div>
            <!-- 中间列表 -->
            <div slot="form">
                <div class="cover_loading">
                    <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <table class="table table-hover table_color table-striped " v-cloak id="tab">
                    <thead>
                        <tr>
                            <th>
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(1)">厂家区域
                                    <span class="totalNum"></span>
                                </a>
                            </th>
                            <th>
                                <a href="javascript:void(0);" class="btn btn-link btn-xs">厂家数量
                                    <span class="totalNum"></span>
                                </a>
                            </th>
                            <th>
                                <a href="javascript:void(0);" class="btn btn-link btn-xs">厂家区域占比
                                    <span class="totalNum"></span>
                                </a>
                            </th>
                            <th>
                                <a href="javascript:void(0);" class="btn btn-link btn-xs">订单数
                                    <span class="totalNum">({{initCustomerCountTotal.orderNumber}})</span>
                                </a>
                            </th>
                            <th>
                                <a href="javascript:void(0);" class="btn btn-link btn-xs">品种数
                                    <span class="totalNum">({{initCustomerCountTotal.breedNumber}})</span>
                                </a>
                            </th>
                            <th>
                                <a href="javascript:void(0);" class="btn btn-link btn-xs">成交品种数
                                    <span class="totalNum"></span>
                                </a>
                            </th>
                            <th>
                                <a href="javascript:void(0);" class="btn btn-link btn-xs">成交金额
                                    <span class="totalNum"></span>
                                </a>
                            </th>
                            <th>
                                <a href="javascript:void(0);" class="btn btn-link btn-xs">毛利率
                                    <span class="totalNum"></span>
                                </a>
                            </th>
                            <th>
                                <a href="javascript:void(0);" class="btn btn-link btn-xs">退货率
                                    <span class="totalNum"></span>
                                </a>
                            </th>
                            <th>
                                <a href="javascript:void(0);" class="btn btn-link btn-xs">复购厂家数
                                    <span class="totalNum"></span>
                                </a>
                            </th>
                            <th>
                                <a href="javascript:void(0);" class="btn btn-link btn-xs">采购金额占比
                                    <span class="totalNum"></span>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="banma">
                        <tr v-for="item in initMainOrderCountList" v-cloak>
                            <td><a href="javascript:void(0);" @click="showDetail(item)">{{item.locationName}}</a></td>
                            <td>{{item.breedNumber}}</td>
                            <td>{{item.orderNumber}}</td>
                            <td>{{item.orderMoney}}</td>
                            <td>{{item.grossProfit}}</td>
                            <td>{{item.recoveryRate }}</td>
                            <td>{{item.customerNumber}}</td>
                            <td>{{item.shipAddr}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 底部分页 -->
            <!-- <pagination :combination="loadParam" slot="page"></pagination> -->
        </mglist-model>
    </div>
</template>
<script>
import pagination from '../pagination'
import breedsearchModel from '../intention/breedsearch'
import selectorgModel from '../../components/tips/treeDialog'
//单个业务员搜索
import employeeModel from '../clientRelate/searchEmpInfo'
import filter from '../../filters/filters'
import common from '../../common/common'
import detailModel from './countTable/localDetailModel'
import mglistModel from '../mguan/mgListComponent.vue'
import vSelect from '../tools/vueSelect/components/Select'
import util from '../tools/util.js'
import {
    initCNProvince,
    initCustomerCountList,
    initCustomerCountTotal
} from '../../vuex/getters'
import {
    getCustomerCount
} from '../../vuex/actions'
export default {
    components: {
        filter,
        pagination,
        mglistModel,
        selectorgModel,
        employeeModel,
        breedsearchModel,
        detailModel,
        vSelect
    },
    data() {
        return {
            loadParam: {
                loading: false,
                beginTime: '',
                endTime: '',
            },
            selectOrgParam: {
                show: false,
                orgName: '',
                orgId: '',
                callback: this.callback
            },
            employeeParam: {
                show: false
            },
            breedSearchParam: {
                show: false
            },
            detailParam: {
                show: false,
                orderType: '',
                totalMainData: {
                    locationNumber: '',
                    breedNumber: '',
                    orderNumber: '',
                    orderMoney: '',
                    grossProfit: '',
                    recoveryRate: '',
                    customerNumber: '',
                    shipAddr: ''
                },
                totalSampleData: {
                    locationNumber: '',
                    breedNumber: '',
                    sampleBreedNumber: '',
                    receiveNumber: '',
                    qaStandardNumber: '',
                    qaSelfNumber: '',
                    tradedNumber: '',
                    customerNumber: ''
                }
            },
            totalMainData: {
                locationNumber: '',
                breedNumber: '',
                orderNumber: '',
                orderMoney: '',
                grossProfit: '',
                recoveryRate: '',
                customerNumber: '',
                shipAddr: ''
            },
            totalSampleData: {
                locationNumber: '',
                breedNumber: '',
                sampleBreedNumber: '',
                receiveNumber: '',
                qaStandardNumber: '',
                qaSelfNumber: '',
                tradedNumber: '',
                customerNumber: ''
            }
        }
    },

    vuex: {
        getters: {
            initCNProvince,
            initCustomerCountList,
            initCustomerCountTotal
        },
        actions: {
            getCustomerCount
        }
    },
    methods: {
        CheckType: function(data) {

        },
        breedSearch: function() {
            this.breedSearchParam.show = true
        },
        selectOrg: function() {
            this.selectOrgParam.show = true
        },
        callback: function() {
            if (this.selectOrgParam.orgId) {
                this.loadParam.orgName = this.selectOrgParam.orgName
                this.loadParam.orgId = this.selectOrgParam.orgId
            }
        },
        sortBy: function(num) {

            this.loadParam.sortNum = num;
            let list = this.$store.state.table.mianOrderCountList;
            let length = list.length;
            for (let i = length; i > 0; i--) {
                for (let j = 0; j < i - 1; j++) {
                    if (list[j].breedNumber > list[j + 1].breedNumber) {
                        let temp = {};
                        util.deepCopy(temp, list[j]);
                        util.deepCopy(list[j], list[j + 1]);
                        util.deepCopy(list[j + 1], temp);
                    }
                }
            }

            //this.getMainOrderCount(this.loadParam)
        },
        totalCallback: function(data) {
            if (this.loadParam.orderType == 'mainOrder') {
                this.totalMainData.locationNumber = data.locationNumber
                this.totalMainData.breedNumber = data.breedNumber
                this.totalMainData.orderNumber = data.orderNumber
                this.totalMainData.orderMoney = data.orderMoney
                this.totalMainData.grossProfit = data.grossProfit
                this.totalMainData.recoveryRate = data.recoveryRate
                this.totalMainData.customerNumber = data.customerNumber
                this.totalMainData.shipAddr = data.shipAddr
            } else if (this.loadParam.orderType == 'sampleOrder') {
                console.log("sampleOrder")
                this.totalSampleData.locationNumber = data.locationNumber
                this.totalSampleData.breedNumber = data.breedNumber
                this.totalSampleData.sampleBreedNumber = data.sampleBreedNumber
                this.totalSampleData.receiveNumber = data.receiveNumber
                this.totalSampleData.qaStandardNumber = data.qaStandardNumber
                this.totalSampleData.qaSelfNumber = data.qaSelfNumber
                this.totalSampleData.tradedNumber = data.tradedNumber
                this.totalSampleData.customerNumber = data.customerNumber
            }

        },
        detailCallback: function(data) {
            if (this.loadParam.orderType == 'mainOrder') {
                this.detailParam.totalMainData.locationNumber = data.locationNumber
                this.detailParam.totalMainData.breedNumber = data.breedNumber
                this.detailParam.totalMainData.orderNumber = data.orderNumber
                this.detailParam.totalMainData.orderMoney = data.orderMoney
                this.detailParam.totalMainData.grossProfit = data.grossProfit
                this.detailParam.totalMainData.recoveryRate = data.recoveryRate
                this.detailParam.totalMainData.customerNumber = data.customerNumber
                this.detailParam.totalMainData.shipAddr = data.shipAddr
            } else if (this.loadParam.orderType == 'sampleOrder') {
                this.detailParam.totalSampleData.locationNumber = data.locationNumber
                this.detailParam.totalSampleData.breedNumber = data.breedNumber
                this.detailParam.totalSampleData.sampleBreedNumber = data.sampleBreedNumber
                this.detailParam.totalSampleData.receiveNumber = data.receiveNumber
                this.detailParam.totalSampleData.qaStandardNumber = data.qaStandardNumber
                this.detailParam.totalSampleData.qaSelfNumber = data.qaSelfNumber
                this.detailParam.totalSampleData.tradedNumber = data.tradedNumber
                this.detailParam.totalSampleData.customerNumber = data.customerNumber
            }
        },
        selectEmployee: function() {
            this.employeeParam.show = true
        },
        showDetail: function(data) {
            this.detailParam.show = true
            this.detailParam.location = data.locationName
            var allIds = {
                ids: '',
                locationId: ''
            }
            allIds.ids = data.breedIds.join(',')
            allIds.locationId = data.locationIds.join('')
            if (this.loadParam.orderType == 'mainOrder') {
                this.detailParam.orderType = 'mainOrder'
                this.getMainOrderCount(this.loadParam, allIds)
            } else {
                this.detailParam.orderType = 'sampleOrder'
                this.getSampleOrderCount(this.loadParam, allIds)
            }

        },
        resetCondition: function() {
            this.loadParam.breedName = ''
            this.loadParam.breedId = ''
            this.loadParam.startTime = ''
            this.loadParam.endTime = ''
            this.loadParam.orgName = ''
            this.loadParam.orgId = ''
            this.loadParam.employeeName = ''
            this.loadParam.employeeId = ''
            this.loadParam.location = ''
            if (this.loadParam.orderType == 'mainOrder') {
                this.getMainOrderCount(this.loadParam)
            } else {
                this.getSampleOrderCount(this.loadParam)
            }

        },
        selectSearch: function() {
            if (this.loadParam.orderType == 'mainOrder') {
                this.getMainOrderCount(this.loadParam)
            } else {
                this.getSampleOrderCount(this.loadParam)
            }
        }

    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;

        },
        breed: function(breed) {
            this.loadParam.breedName = breed.breedName
            this.loadParam.breedId = breed.breedId
        },
        a: function(employee) {
            this.loadParam.employeeName = employee.employeeName
            this.loadParam.employeeId = employee.employeeId
        },
    },
    filter: (filter, {}),
    ready() {
        //common('tab', 'table_box', 1);
    },
    created() {
        this.getCustomerCount(this.loadParam)


    }
}
</script>
<style scoped>
.myOrder {
    width: 100%;
    white-space: nowrap;
}

.order_search {
    padding: 35px 10px 0 10px;
}

.transfer {
    margin-right: 16px;
}

.order_table .table > ul {
    position: relative;
    width: 100%;
    display: table;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0;
}

.order_table .table > ul >li {
    float: left;
    padding: 7.5px 0;
    text-align: center;
    width: 11.1%;
    display: table-cell;
}

.mz-datepicker {
    width: 168px!important
}

.form-control {
    width: 100px;
}

.order_table .table > ul >li a {
    color: #003077;
}

.order_table .table_hover > ul:hover {
    background: #f5f5f5;
}

.totalNum {
    color: red
}

#table_box table th,
#table_box table td {
    width: 95px;
    min-width: 94px;
}

.order_table .table > ul >li img {
    margin: auto;
}

.order_pagination {
    text-align: center;
}

.api {
    color: #3399ff;
}

.bgColor {
    background: #2d8cf0!important;
}

.bgColor>a {
    color: #fff!important;
}

.bgColor>a>span {
    color: #fff!important;
}

.banma>tr:nth-child(2n) {
    background: #f5f7f9!important
}
</style>
