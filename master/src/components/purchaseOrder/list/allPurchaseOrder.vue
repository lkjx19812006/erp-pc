<template>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <selectorg-model :param="selectOrgParam" v-if="selectOrgParam.show"></selectorg-model>
    <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
    <transfer-purchase :param="transferParam" v-if="transferParam.show"></transfer-purchase>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
    
            <search-model>
                <div slot="main">

                    <div class="left" style="margin-right:10px;position:relative;">
                            <div class="btn-group left">
                                <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-success': this.loadParam.auditing===''}" @click="isAuditing('')">
                                    全部
                                </button>
                                
                                <button type="button" class="btn btn-default" style="width:75px" v-bind:class="{ 'btn-success': this.loadParam.auditing==='1'}" @click="isAuditing('1')">
                                    待审核</span>
                                </button>
                                
                            </div>
                            <span class="tagPoint" >{{loadParam.auditNum}}
                    </div>
                    <erp-search title="客户名称" :value.sync="loadParam.customerName" @on-keyenter="selectSearch()"></erp-search>
                    <erp-search title="客户电话" :value.sync="loadParam.customerPhone" @on-keyenter="selectSearch()"></erp-search>
                    <erp-search title="采购单ID" :value.sync="loadParam.purchaseId" @on-keyenter="selectSearch()"></erp-search>
                    <erp-search title="采购品种" :value.sync="loadParam.purchaseContent" @on-keyenter="selectSearch()"></erp-search>
                    <erp-search title="部门" :value.sync="loadParam.orgName" @on-click="selectOrg()" readonly="readonly"></erp-search>
                    <erp-search title="业务员" :value.sync="loadParam.employeeName" @on-click="selectEmployee()" readonly="readonly"></erp-search>
                    
                </div>
                <div slot="more">
                    <erp-select title="询价状态" :value.sync="loadParam.inquire" :options="options.inquireOptions" @on-change="selectSearch()"></erp-select>
                    <erp-select title="已收报价" :value.sync="loadParam.offer" :options="options.offerOptions" @on-change="selectSearch()"></erp-select>
                    <erp-select title="采购单来源" :value.sync="loadParam.source" :options="options.purchaseSource" @on-change="selectSearch()"></erp-select>
                </div> 
                <div slot="handle">
                    <Checkbox :checked='selectAll' @click.prevent="checkAll()">全选</Checkbox>
                    <i-button type="primary" icon="ios-search" shape="circle" @click="selectSearch()">搜索</i-button>
                    <i-button type="warning" shape="circle" @click="resetCondition()">清空条件</i-button>
                    <button type="button" class="btn btn-success" @click="tansfer()">采购单报价划转</button>
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
                        <th style="width:30px;">勾选</th>
                        <th>采购单ID</th>
                        <th>采购单类型</th>
                        <th>客户名称</th>
                        <th>客户手机</th>
                        <th>业务员</th>
                        <th>发布日期</th>
                        <th>询价时间</th>
                        <th>过期时间</th>
                        <th>采购单来源</th>
                        <th>采购单划转至</th>
                        <th>采购内容描述</th>
                        <th>备注</th>
                        <th>收到报价数</th>
                        <th>询价状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="($index,item) in initAllPurchaseList">
                        <td style="width:30px;">
                            <Checkbox @click="singleSelect($index,item)" :checked="item.checked"></Checkbox>
                        </td>
                        <td>{{item.id}}</td>
                        <td>{{item.type | indentType}}</td>
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
                            <p v-for="entry in item.orgNameArray" style="text-align:left;font-weight:bold;">【{{entry.name}}】</p>
                        </td> 
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
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import common from '../../../common/common'
import mglistModel from '../../mguan/mgListComponent.vue'
import selectorgModel from '../../tips/treeDialog'
import employeeModel from '../../clientRelate/searchEmpInfo'
import transferPurchase from '../transferPurchase'
import tipsdialogModel from '../../tips/tipDialog'
import {inquireOptions,purchaseSource,offerOptions} from '../../../common/searchData'
import {
    initAllPurchaseList,
    initLogin
} from '../../../vuex/getters'
import {
    getPurchaseOrderList,
} from '../../../vuex/actions'
export default {
    components: {
        detailModel,
        pagination,
        mglistModel,
        selectorgModel,
        employeeModel,
        transferPurchase,
        tipsdialogModel
    },
    vuex: {
        getters: {
            initAllPurchaseList,
            initLogin
        },
        actions: {
            getPurchaseOrderList,
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
                link: '/indent/queryList',
                key: 'allPurchaseList',
                source: '',
                inquire: '',
                offer: '-1',
                customerName: '',
                customerPhone: '',
                employee: '',
                employeeName: '',
                org: '',
                orgName: '',
                purchaseId: '',
                auditing:'1',
                auditNum:''
            },
            detailParam: {
                show: false,
                loading: false,
                key: "allIndent", //全部采购单，用作标记从哪个页面进入详情
                link: "/indent/queryById",
                id: "",
                customerId: ""
            },
            selectOrgParam: {
                show: false,
                orgId: '',
                orgName: '',
                callback: this.callback
            },
            employeeParam: {
                show: false,
                org: true,
                orgId: "",
                //单个业务员搜索
                employeeId: '',
                employeeName: ''
            },
            transferParam:{
                show:false,
                transferPurchase:[],
                callback:this.showTips
            },
            tipsParam: {
                show: false,
                name: '',
                alert: true
            },
            selectAll:false
        }
    },
    methods: {
        isAuditing:function(data){
            this.loadParam.auditing = data
            this.selectSearch()
        },
        detailClick: function(id, customerId) {
            this.detailParam.id = id;
            this.detailParam.customerId = customerId;
            this.detailParam.show = true;
        },
        selectSearch: function() {
            this.getPurchaseOrderList(this.loadParam);
        },

        selectEmployee: function() {
            this.employeeParam.show = true;
        },
        resetCondition: function() { //清除搜索条件
            this.loadParam.source = '';
            this.loadParam.inquire = '';
            this.loadParam.offer = '-1';
            this.loadParam.customerName = '';
            this.loadParam.customerPhone = '';
            this.loadParam.employee = '';
            this.loadParam.employeeName = '';
            this.loadParam.org = '';
            this.loadParam.orgName = '';
            this.loadParam.purchaseContent = '';
            this.loadParam.purchaseId = ''
            this.getPurchaseOrderList(this.loadParam);
        },
        selectOrg: function() {
            this.selectOrgParam.show = true;
        },
        callback: function() {
            if (this.selectOrgParam.orgId) {
                if (this.loadParam.employeeName) {
                    this.loadParam.employee = '';
                    this.loadParam.employeeName = '';
                }
                this.loadParam.org = this.selectOrgParam.orgId;
                this.loadParam.orgName = this.selectOrgParam.orgName;
                this.employeeParam.orgId = this.selectOrgParam.orgId;
                this.selectSearch(this.loadParam);
            }
        },
        showTips:function(data){
            this.tipsParam.name = data
            this.tipsParam.show = true
            this.getPurchaseOrderList(this.loadParam)
        },
        singleSelect:function($index,item){      
            this.$store.state.table.basicBaseList.allPurchaseList[$index].checked = !this.$store.state.table.basicBaseList.allPurchaseList[$index].checked;
            for(let i = 0;i<this.$store.state.table.basicBaseList.allPurchaseList.length;i++){//判断是否全部选择
                if(!this.$store.state.table.basicBaseList.allPurchaseList[i].checked){
                    this.selectAll = false
                    return
                }else{
                    this.selectAll = true
                }
            }
        },
        checkAll:function(){
            this.selectAll = !this.selectAll
            let _this = this
            if(this.selectAll){
                _this.transferParam.transferPurchase = []
                this.$store.state.table.basicBaseList.allPurchaseList.forEach(function(item){
                    item.checked = true
                })
            }else{
                _this.transferParam.transferPurchase = []    
                this.$store.state.table.basicBaseList.allPurchaseList.forEach(function(item){
                    item.checked = false
                })
            }
        },
        tansfer:function(){
            this.transferParam.transferPurchase = []
            for(let i = 0;i<this.$store.state.table.basicBaseList.allPurchaseList.length;i++){
                if(this.$store.state.table.basicBaseList.allPurchaseList[i].checked){
                    this.transferParam.transferPurchase.push(this.$store.state.table.basicBaseList.allPurchaseList[i].id)
                }
            }
            if(this.transferParam.transferPurchase.length==0){
                this.tipsParam.name = '请至少选择一个采购单'
                this.tipsParam.show = true
            }else{
                this.transferParam.show = true
            }
            
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
        }
    },
    computed:{

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
    width: 150px;
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
.tagPoint{
    padding: 1px 2px;
    position: absolute;
    background: #ed3f14;
    color:#fff;
    border-radius: 50%;
    font-size: 8px;
    top: -10px;
    right: -10px;
    z-index: 10;
}
.ivu-checkbox-inner{
    width: 20px!important;
    height: 20px!important;
}
</style>
