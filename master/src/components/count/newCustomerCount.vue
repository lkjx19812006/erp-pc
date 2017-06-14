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
                            <mz-datepicker :time.sync="loadParam.beginTime" format="yyyy-MM-dd HH:mm:ss">
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
                            <v-select :debounce="250" :value.sync="location" :options="initCNProvince" placeholder="省/Province" label="cname">
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
                                <a class="btn btn-link btn-xs">厂家区域
                                    <span class="totalNum"></span>
                                </a>
                            </th>
                            <th>
                                厂家数量
                                <span class="totalNum">({{initCustomerCountTotal.customerNumber}})</span>
                                <a v-if="loadParam.criterion!='customerNumber'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('customerNumber', 0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='customerNumber'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('customerNumber', 1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th>
                                厂家区域占比
                                <span class="totalNum">({{initCustomerCountTotal.provinceRate}})</span>
                                <a v-if="loadParam.criterion!='provinceRate'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('provinceRate',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='provinceRate'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('provinceRate',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th>
                                订单数
                                <span class="totalNum">({{initCustomerCountTotal.orderNumber}})</span>
                                <a v-if="loadParam.criterion!='orderNumber'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('orderNumber',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='orderNumber'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('orderNumber',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th>
                                品种数
                                <span class="totalNum">({{initCustomerCountTotal.breedNumber}})</span>
                                <a v-if="loadParam.criterion!='breedNumber'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('breedNumber',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='breedNumber'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('breedNumber',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th>
                                成交品种数
                                <span class="totalNum">({{initCustomerCountTotal.tradeBreedNumber}})</span>
                                <a v-if="loadParam.criterion!='tradeBreedNumber'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('tradeBreedNumber',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='tradeBreedNumber'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('tradeBreedNumber',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th>
                                成交金额
                                <span class="totalNum">({{initCustomerCountTotal.tradeAmount}})</span>
                                <a v-if="loadParam.criterion!='tradeAmount'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('tradeAmount',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='tradeAmount'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('tradeAmount',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th>
                                毛利率
                                <span class="totalNum">({{initCustomerCountTotal.grossProfitRate}})</span>
                                <a v-if="loadParam.criterion!='grossProfitRate'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('grossProfitRate',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='grossProfitRate'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('grossProfitRate',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th>
                                退货率
                                <span class="totalNum">({{initCustomerCountTotal.returnsRate}})</span>
                                <a v-if="loadParam.criterion!='returnsRate'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('returnsRate',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='returnsRate'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('returnsRate',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th>
                                复购厂家数
                                <span class="totalNum">({{initCustomerCountTotal.rebuyNumber}})</span>
                                <a v-if="loadParam.criterion!='rebuyNumber'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('rebuyNumber',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='rebuyNumber'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('rebuyNumber',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th>
                                采购金额占比
                                <span class="totalNum">({{initCustomerCountTotal.buyAmountRate}})</span>
                                <a v-if="loadParam.criterion!='buyAmountRate'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('buyAmountRate',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='buyAmountRate'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('buyAmountRate',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="banma">
                        <tr v-for="item in initCustomerCountList" v-cloak>
                            <td><a href="javascript:void(0);" @click="showDetail(item)">{{item.provinceName}}</a></td>
                            <td>{{item.customerNumber}}</td>
                            <td>{{item.provinceRate}}</td>
                            <td>{{item.orderNumber}}</td>
                            <td>{{item.breedNumber}}</td>
                            <td>{{item.tradeBreedNumber}}</td>
                            <td>{{item.tradeAmount }}</td>
                            <td>{{item.grossProfitRate}}</td>
                            <td>{{item.returnsRate}}</td>
                            <td>{{item.rebuyNumber}}</td>
                            <td>{{item.buyAmountRate}}</td>
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
                criterion: '', //前端排序标准
                asc: '', //升序（0或!=1）还是降序（1）
                beginTime: '',
                endTime: '',
                breedId: '',
                breedName: '',
                locationId: '',
                orgId: '',
                orgName: ''

            },
            //默认的初始时间
            beginTime: '',
            endTime: '',
            //产地
            location: {
                id: '',
                cname: ''
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
        //criterion:排序的标准，即按什么排序,asc:0/1,升序/降序
        sortBy: function(criterion, asc) {
            this.loadParam.criterion = criterion;
            this.loadParam.asc = asc;
            let list = this.$store.state.table.customerCountList;
            let length = list.length;
            for (let i = length; i > 0; i--) {
                for (let j = 0; j < i - 1; j++) {
                    //升序
                    if (asc != 1 && list[j][criterion] > list[j + 1][criterion]) {
                        let temp = {};
                        util.deepCopy(temp, list[j]);
                        util.deepCopy(list[j], list[j + 1]);
                        util.deepCopy(list[j + 1], temp);
                    }
                    //降序
                    if (asc == 1 && list[j][criterion] < list[j + 1][criterion]) {
                        let temp = {};
                        util.deepCopy(temp, list[j]);
                        util.deepCopy(list[j], list[j + 1]);
                        util.deepCopy(list[j + 1], temp);
                    }

                }
            }
        },

        selectEmployee: function() {
            this.employeeParam.show = true
        },
        showDetail: function(data) {


        },
        resetCondition: function() {
            this.loadParam.beginTime = this.beginTime;
            this.loadParam.endTime = this.endTime;
            this.loadParam.breedId = "";
            this.loadParam.breedName = "";
            this.location = {
                id: '',
                cname: ''
            };
            this.loadParam.locationId = "";
            this.loadParam.orgId = "";
            this.loadParam.orgName = "";
            this.selectSearch();

        },
        selectSearch: function() {
            console.log(this.location);
            if (this.location.id) {
                this.loadParam.locationId = this.location.id;
            }
            this.getCustomerCount(this.loadParam)
        }

    },
    events: {

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
        //时间默认从2016至今
        this.beginTime = "2016-01-01 00:00:00";
        this.endTime = util.getDate(0);
        this.loadParam.beginTime = this.beginTime;
        this.loadParam.endTime = this.endTime;
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
