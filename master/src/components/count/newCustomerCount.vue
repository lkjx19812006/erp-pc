<template>
    <div>
        <selectorg-model :param="selectOrgParam" v-if="selectOrgParam.show"></selectorg-model>
        <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
        <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
        <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
        <mglist-model>
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clear">
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
                </div>
                <div class="clear">
                    <dl class="clear left transfer" v-if="allPower">
                        <dt class="left transfer marg_top">部门：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.orgName" placeholder="请选择部门" readonly="true" @click="selectOrg()" />
                        </dd>
                    </dl>
                    <!-- 单个业务员搜索 -->
                    <dl class="clear left transfer" v-if="orgPower">
                        <dt class="left transfer marg_top" style="letter-spacing:3px">所属业务员：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.employeeName" placeholder="请选择业务员" readonly="true" @click="selectEmployee()">
                        </dd>
                    </dl>
                    <!-- 规模 -->
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">规模：</dt>
                        <dl class="left">
                            <select class="form-control" v-model="loadParam.scale">
                                <option value="">不限</option>
                                <option value="0">小型</option>
                                <option value="1">中型</option>
                                <option value="2">大型</option>
                            </select>
                        </dl>
                    </dl>
                    <!-- 收款方式 -->
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">收款方式：</dt>
                        <dl class="left">
                            <select class="form-control" v-model="loadParam.paymentWay">
                                <option value="">不限</option>
                                <option value="0">不预付</option>
                                <option value="1">0~30%</option>
                                <option value="2">30%~50%</option>
                                <option value="3">50%~100%</option>
                            </select>
                        </dl>
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
                            <th style="width:150px">
                                <a class="btn btn-link btn-xs">厂家区域
                                    <span class="totalNum"></span>
                                </a>
                            </th>
                            <th style="width:150px">
                                厂家数量
                                <span class="totalNum">({{initCustomerCountTotal.tradeCustomerNumber}})</span>
                                <a v-if="loadParam.criterion!='tradeCustomerNumber'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('tradeCustomerNumber', 0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='tradeCustomerNumber'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('tradeCustomerNumber', 1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th style="width:150px">
                                厂家区域占比
                                <span class="totalNum">({{initCustomerCountTotal.provinceRate*100 | money}}%)</span>
                                <a v-if="loadParam.criterion!='provinceRate'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('provinceRate',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='provinceRate'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('provinceRate',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th style="width:150px">
                                订单数
                                <span class="totalNum">({{initCustomerCountTotal.orderNumber}})</span>
                                <a v-if="loadParam.criterion!='orderNumber'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('orderNumber',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='orderNumber'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('orderNumber',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th style="width:150px">
                                品种数
                                <span class="totalNum">({{initCustomerCountTotal.breedNumber}})</span>
                                <a v-if="loadParam.criterion!='breedNumber'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('breedNumber',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='breedNumber'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('breedNumber',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th style="width:150px">
                                成交品种数
                                <span class="totalNum">({{initCustomerCountTotal.tradeBreedNumber}})</span>
                                <a v-if="loadParam.criterion!='tradeBreedNumber'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('tradeBreedNumber',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='tradeBreedNumber'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('tradeBreedNumber',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th style="width:150px">
                                成交金额
                                <span class="totalNum">({{initCustomerCountTotal.tradeAmount | money}})</span>
                                <a v-if="loadParam.criterion!='tradeAmount'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('tradeAmount',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='tradeAmount'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('tradeAmount',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th style="width:150px">
                                毛利率
                                <span class="totalNum">({{initCustomerCountTotal.grossProfitRate*100 | money}}%)</span>
                                <a v-if="loadParam.criterion!='grossProfitRate'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('grossProfitRate',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='grossProfitRate'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('grossProfitRate',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th style="width:150px">
                                退货率
                                <span class="totalNum">({{initCustomerCountTotal.returnsRate*100 | money}}%)</span>
                                <a v-if="loadParam.criterion!='returnsRate'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('returnsRate',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='returnsRate'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('returnsRate',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th style="width:150px">
                                复购厂家数
                                <span class="totalNum">({{initCustomerCountTotal.rebuyNumber}})</span>
                                <a v-if="loadParam.criterion!='rebuyNumber'||loadParam.asc==1" class="glyphicon glyphicon-arrow-up" @click="sortBy('rebuyNumber',0)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-up"></span>
                                <a v-if="loadParam.criterion!='rebuyNumber'||loadParam.asc!=1" class="glyphicon glyphicon-arrow-down" @click="sortBy('rebuyNumber',1)"></a>
                                <span v-else class="glyphicon glyphicon-arrow-down"></span>
                            </th>
                            <th style="width:150px">
                                采购金额占比
                                <span class="totalNum">({{initCustomerCountTotal.buyAmountRate*100 | money}}%)</span>
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
                            <td>{{item.tradeCustomerNumber}}</td>
                            <td>{{item.provinceRate*100 | money}}%</td>
                            <td>{{item.orderNumber}}</td>
                            <td>{{item.breedNumber}}</td>
                            <td>{{item.tradeBreedNumber}}</td>
                            <td>{{item.tradeAmount | money}}</td>
                            <td>{{item.grossProfitRate*100 | money}}%</td>
                            <td>{{item.returnsRate*100 | money}}%</td>
                            <td>{{item.rebuyNumber}}</td>
                            <td>{{item.buyAmountRate*100 | money}}%</td>
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
import detailModel from './countTable/customerCountDetail'
import mglistModel from '../mguan/mgListComponent.vue'
import vSelect from '../tools/vueSelect/components/Select'
import util from '../tools/util.js'
import {
    initLogin,
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
                orgId: '',
                orgName: '',
                employeeId: '',
                employeeName: '',
                breedId: '',
                breedName: '',
                locationId: '',
                scale: '',
                paymentWay: '',

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
            },
            detailParam: { //详情的搜索条件要和列表的搜索条件一致，除了locationId
                loading: false,
                show: false,
                locationId: '',
                locationName: '', //只用来显示
                beginTime: '', //取loadParam的开始和结束时间
                endTime: '',
                orgId: '',
                employeeId: '',
                breedId: '',
                scale: '',
                paymentWay: ''
            },
            orgPower: false, //表示是否有主管(查看部门所有业务员)权限
            allPower: false, //表示是否有总经理(查看公司所有业务员)权限

        }
    },

    vuex: {
        getters: {
            initLogin,
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
        showDetail: function(item) {
            let detail = this.detailParam;
            let load = this.loadParam;
            detail.beginTime = load.beginTime;
            detail.endTime = load.endTime;
            detail.orgId = load.orgId;
            detail.employeeId = load.employeeId;
            detail.breedId = load.breedId;
            detail.scale = load.scale;
            detail.paymentWay = load.paymentWay;
            detail.locationId = item.province;
            detail.locationName = item.provinceName;
            detail.show = true;

        },
        resetCondition: function() { //不同权限，处理方式不同
            this.loadParam.beginTime = this.beginTime;
            this.loadParam.endTime = this.endTime;
            this.loadParam.breedId = "";
            this.loadParam.breedName = "";
            this.location = {
                id: '',
                cname: ''
            };
            this.loadParam.locationId = "";
            if (this.allPower) { //有总经理权限
                this.loadParam.orgId = "";
                this.loadParam.orgName = "";
                this.loadParam.employeeId = "";
                this.loadParam.employeeName = "";
            } else if (this.orgPower) { //有主管权限
                this.loadParam.employeeId = "";
                this.loadParam.employeeName = "";
            }
            this.loadParam.scale = "";
            this.loadParam.paymentWay = "";
            this.selectSearch();

        },
        selectSearch: function() {
            if (this.location.id) {
                this.loadParam.locationId = this.location.id;
            }
            this.getCustomerCount(this.loadParam);
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

        if (this.initLogin.safeCode.indexOf(",P569-F570,") != -1) {
            this.orgPower = true;
        }
        if (this.initLogin.safeCode.indexOf(",P569-F571,") != -1) {
            this.allPower = true;
        }
        if (!this.orgPower && !this.allPower) { //如果没有主管权限并且没有总经理权限，就只能查看自己的信息
            this.loadParam.employeeId = this.initLogin.id;
        }
        if (this.orgPower && !this.allPower) { //如果有主管权限但没有总经理权限，就只能查看本部门的所有信息
            this.loadParam.orgId = this.initLogin.orgId;
            //这样就只会查询到本部门的业务员了
            this.employeeParam.orgId = this.initLogin.orgId;
            this.employeeParam.org = true;
        }

        //时间默认从2016至今
        this.beginTime = util.getDate(-7);;
        this.endTime = util.getDate(0);
        this.loadParam.beginTime = this.beginTime;
        this.loadParam.endTime = this.endTime;
        this.getCustomerCount(this.loadParam);
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
