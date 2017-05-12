<template>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <delete-model :param="deleteParam" v-if="deleteParam.show"></delete-model>
    <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">客户名称：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.customerName" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                    <dt class="left transfer marg_top">客户电话：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.customerPhone" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                    <!-- 单个业务员搜索 -->
                    <dt class="left transfer marg_top">业务员：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.employeeName" placeholder="{{$t('static.select_salesman')}}" @click="selectEmployee()">
                    </dd>
                    <dt class="left transfer marg_top">询价状态：</dt>
                    <dd class="left margin_right">
                        <select class="form-control" v-model="loadParam.inquire" @change="selectSearch()">
                            <option value="0">初始</option>
                            <option value="1">询价中</option>
                            <option value="2">报价中</option>
                            <option value="3">报价完成</option>
                        </select>
                    </dd>

                  <dt class="left transfer marg_top">已收报价：</dt>
                  <dd class="left margin_right">
                    <select class="form-control" v-model="loadParam.offer" @change="selectSearch()">
                      <option value="-1">全部</option>
                      <option value="1">收到报价</option>
                      <option value="0">暂无报价</option>
                    </select>
                  </dd>
                    <dt class="left transfer marg_top">采购单来源：</dt>
                    <dd class="left margin_right">
                        <select class="form-control" v-model="loadParam.source" @change="selectSearch()">
                            <option value="0">业务员导入</option>
                            <option value="1">web</option>
                            <option value="2">android</option>
                            <option value="3">weixin</option>
                            <option value="4">ios</option>
                        </select>
                    </dd>
                    <!-- 新增采购品种搜索 -->
                    <dt class="left transfer marg_top">采购品种：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.purchaseContent" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                </dl>
                <dl class="clear left transfer" style="margin-left:50px">
                    <button type="button" class="btn btn-default margin_right" height="24" width="24" @click="selectSearch()">搜索</button>
                    <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">清空条件</button>
                </dl>
                <dd class="pull-right" style="margin-right:10px">
                    <button type="button" class="btn btn-primary" @click="selectSearch()">刷新</button>
                </dd>
            </div>
        </div>
        <!--中间列表-->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>采购单类型</th>
                        <th>客户名称</th>
                        <th>客户手机</th>
                        <th>业务员</th>
                        <th>发布日期</th>
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
                        <td>{{item.type | indentType}}</td>
                        <td>
                            <a class="underline" @click.stop="detailClick(item.id,item.customerId)">{{item.customerName}}</a>
                        </td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.pubdate}}</td>
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
                            <button v-if="item.inquire==0" class="btn btn-primary btn-apply" @click.stop="deletePurchase(item.id,$index)">删除</button>
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
                employeeName: ''
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
            this.loadParam.source = '';
            this.loadParam.inquire = '';
            this.loadParam.offer = '';
            this.loadParam.customerName = '';
            this.loadParam.customerPhone = '';
            this.loadParam.employee = '';
            this.loadParam.employeeName = '';
            this.loadParam.purchaseContent = '';
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
    width: 150px;
    min-width: 150px;
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
