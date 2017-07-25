<template>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <delete-model :param="deleteParam" v-if="deleteParam.show"></delete-model>
    <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <search-model>
                <div slot="main">
                    <erp-search title="客户名称" :value.sync="loadParam.customerName" @on-keyenter="selectSearch()"></erp-search>
                    <erp-search title="客户ID" :value.sync="loadParam.customerId" @on-keyenter="selectSearch()"></erp-search>
                    <erp-search title="客户电话" :value.sync="loadParam.customerPhone" @on-keyenter="selectSearch()"></erp-search>
                    <erp-search title="采购单ID" :value.sync="loadParam.purchaseId" @on-keyenter="selectSearch()"></erp-search>
                    <erp-search title="采购品种" :value.sync="loadParam.purchaseContent" @on-keyenter="selectSearch()"></erp-search>
                    <erp-search title="业务员" :value.sync="loadParam.employeeName" @on-click="selectEmployee()" readonly="readonly"></erp-search>                    
                </div>
                <div slot="more">
                    <erp-select title="询价状态" :value.sync="loadParam.inquire" :options="options.inquireOptions" @on-change="selectSearch()"></erp-select>
                    <erp-select title="已收报价" :value.sync="loadParam.offer" :options="options.offerOptions" @on-change="selectSearch()"></erp-select>
                    <erp-select title="采购单来源" :value.sync="loadParam.source" :options="options.purchaseSource" @on-change="selectSearch()"></erp-select>
                </div> 
                <div slot="handle">
                    <i-button type="primary" icon="ios-search" shape="circle" @click="selectSearch()">搜索</i-button>
                    <i-button type="warning" shape="circle" @click="resetCondition()">清空条件</i-button>
                    <button type="button" class="btn btn-primary" @click="selectSearch()">刷新</button>
                </div>
            </search-model>
        </div>
        <!--中间列表-->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>采购单ID</th>
                        <th>采购单类型</th>
                        <th>客户ID</th>
                        <th>客户名称</th>
                        <th>客户手机</th>
                        <th>业务员</th>
                        <th>发布日期</th>
                        <th>询价时间</th>
                        <th>过期时间</th>
                        <th>采购单来源</th>
                        <th>采购内容描述</th>
                        <th>备注</th>
                        <th>收到报价数</th>
                        <th>询价状态</th>
                        <th style="min-width:200px;text-align: left;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initOrgPurchaseList">
                        <td>{{item.id}}</td>
                        <td>{{item.type | indentType}}</td>
                        <td>{{item.customerId}}</td>
                        <td>
                            <a class="underline" @click.stop="detailClick(item.id,item.customerId)">{{item.customerName}}</a>
                        </td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.pubdate}}</td>
                        <td>{{item.shelveTime}}</td>
                        <td>{{item.duedate}}</td>
                        <td>{{item.source | indentSource}}</td>
                        <td>
                            <Poptip placement="left" trigger="hover">
                                <span>{{item.buyDesc | textDisplay "8"}}</span>
                                <div class="api" slot="content">
                                    {{item.buyDesc}}
                                </div>
                            </Poptip>
                        </td>
                        <td>{{item.comment}}</td>
                        <td>{{item.offer}}</td>
                        <td>{{item.inquire | inquire}}</td>
                        <td style="text-align: left">
                            <button v-if="item.inquire==0" class="btn btn-danger btn-xs" @click.stop="deletePurchase(item.id,$index)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--底部分页-->
        <pagination :combination="loadParam" slot="page"></pagination>
    </mglist-model>
</template>
<script>
import detailModel from '../purchaseOrderDetail.vue'
import deleteModel from '../../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import common from '../../../common/common'
import mglistModel from '../../mguan/mgListComponent.vue'
import employeeModel from '../../clientRelate/searchEmpInfo'
import {inquireOptions,purchaseSource,offerOptions} from '../../../common/searchData'
import {
    initOrgPurchaseList,
    initLogin
} from '../../../vuex/getters'
import {
    getPurchaseOrderList,
    deletePurchaseOrder
} from '../../../vuex/actions'
export default {
    components: {
        detailModel,
        deleteModel,
        pagination,
        mglistModel,
        employeeModel
    },
    vuex: {
        getters: {
            initOrgPurchaseList,
            initLogin
        },
        actions: {
            getPurchaseOrderList,
            deletePurchaseOrder
        }
    },
    data() {
        return {
            options:{
                inquireOptions:inquireOptions,
                purchaseSource:purchaseSource,
                offerOptions:offerOptions
            },
            loadParam: {
                loading: false,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total: "",
                link: '/indent/queryOrgList',
                key: 'orgPurchaseList',
                source: '',
                inquire: '',
                offer: '-1',
                customerName: '',
                customerPhone: '',
                employee: '',
                employeeName: '',
                purchaseId: '',
                customerId:''
            },
            detailParam: {
                show: false,
                loading: false,
                key: "orgIndent", //部门采购单，用作标记从哪个页面进入详情
                link: "/indent/queryById",
                id: "",
                customerId: ""
            },
            deleteParam: {
                show: false,
                link: this.deletePurchaseOrder, //删除的接口地址
                key: "orgPurchaseList",
                callback: this.callback,
                index: "",
                id: ""

            },
            employeeParam: {
                show: false,
                org: true,
                orgId: this.initLogin.orgId,
                //单个业务员搜索
                employeeId: '',
                employeeName: '',
            }
        }
    },
    methods: {
        selectSearch: function() {
            this.getPurchaseOrderList(this.loadParam);
        },
        selectEmployee: function() {
            this.employeeParam.show = true;
        },
        resetCondition: function() { //清除搜索条件
            this.loadParam.customerId='';
            this.loadParam.source = '';
            this.loadParam.inquire = '';
            this.loadParam.offer = '';
            this.loadParam.customerName = '';
            this.loadParam.customerPhone = '';
            this.loadParam.employee = '';
            this.loadParam.employeeName = '';
            this.loadParam.purchaseContent = '';
            this.loadParam.purchaseId = ''
            this.getPurchaseOrderList(this.loadParam);
        },
        detailClick: function(id, customerId) {
            this.detailParam.id = id;
            this.detailParam.customerId = customerId;
            this.detailParam.show = true;
        },
        deletePurchase: function(id, index) {
            this.deleteParam.show = true;
            this.deleteParam.id = id;
            this.deleteParam.index = index;
        }

    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getPurchaseOrderList(this.loadParam);
        },
        a: function(employee) {
            this.loadParam.employee = employee.employeeId;
            this.loadParam.employeeName = employee.employeeName;
            this.selectSearch(this.loadParam);
        },
    },
    created() {
        this.getPurchaseOrderList(this.loadParam);
    },
    ready() {
        common('tab', 'table_box', 1);
    },
    filter: (filter, {})
}
</script>
<style scoped>
.edit-model {
    padding: 10px 30px 80px 30px;
}

.breed_action {
    top: 33px;
    right: 106px;
}

.margin_right {
    margin-right: 15px
}

.transfer {
    margin-right: 8px;
}

.checkbox_unselect {
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}

.checkbox_select {
    background-image: url(/static/images/selected.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}

#table_box table th,
#table_box table td {
    width: 125px;
    min-width: 100px;
}

.service-nav {
    padding: 23px 10px 0px 4px;
}

dl {
    margin-bottom: 5px;
}

.api {
    max-width: 400px;
    color: #3399ff;
    white-space: normal;
}
</style>
