<template>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">询价状态：</dt>
                    <dd class="left margin_right">
                        <select class="form-control" v-model="loadParam.inquire" @change="selectSearch()">
                            <option value="0">初始</option>
                            <option value="1">询价中</option>
                            <option value="2">报价中</option>
                        </select>
                    </dd>
                    <!-- 新增采购品种搜索 -->
                    <dt class="left transfer marg_top" style="margin-left:50px">采购品种：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.purchaseContent" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                    <!-- 单个业务员搜索 -->
                    <dt class="left transfer marg_top" style="margin-left:50px">业务员：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.employeeName" placeholder="{{$t('static.select_salesman')}}" @click="selectEmployee()" readonly="readonly">
                    </dd>
                </dl>
                <dl class="clear left transfer" style="margin-left:50px">
                    <button type="button" class="btn btn-default" height="24" width="24" @click="selectSearch()">搜索</button>
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
                        <th>业务员</th>
                        <th>发布日期</th>
                        <th>过期时间</th>
                        <th>采购单来源</th>
                        <th>采购内容描述</th>
                        <th>备注</th>
                        <th>询价状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initPurchaseOfferList">
                        <td>{{item.type | indentType}}</td>
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
                        <td>{{item.inquire | inquire}}</td>
                        <td>
                            <button class="btn btn-success btn-xs" @click.stop="detailClick(item.id,item.customerId)">报价</button>
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
import detailModel from '../purchaseOfferDetail.vue'
import tipsdialogModel from '../../tips/tipDialog'
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import common from '../../../common/common'
import mglistModel from '../../mguan/mgListComponent.vue'
import employeeModel from '../../clientRelate/searchEmpInfo'
import {
    initPurchaseOfferList
} from '../../../vuex/getters'
import {
    getPurchaseOrderList
} from '../../../vuex/actions'
export default {
    components: {
        detailModel,
        tipsdialogModel,
        pagination,
        mglistModel,
        employeeModel
    },
    vuex: {
        getters: {
            initPurchaseOfferList
        },
        actions: {
            getPurchaseOrderList
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
                link: '/indent/queryOfferList',
                key: 'purchaseOfferList',
                employeeName: '',
                employee: ''
            },
            detailParam: {
                show: false,
                loading: false,
                link: "/indent/queryById",
                id: "",
                customerId: ""
            },

            tipsParam: {
                show: false,
                name: '',
                alert: true
            },
            employeeParam: {
                show: false,
                org: true,
                orgId: "",
                //单个业务员搜索
                employeeId: '',
                employeeName: ''
            },
            checked: false
        }
    },
    methods: {
        selectSearch: function() {
            this.getPurchaseOrderList(this.loadParam);
        },
        detailClick: function(id, customerId) {
            this.detailParam.id = id;
            this.detailParam.customerId = customerId;
            this.detailParam.show = true;
        },
        callback: function(name) { //如无特殊情况，统一使用这个函数作为回调函数
            this.tipsParam.name = name;
            this.tipsParam.show = true;
            this.getPurchaseOrderList(this.loadParam);
        },
        resetCondition: function() {
            this.loadParam.purchaseContent = '';
            this.loadParam.customerName = '';
            this.loadParam.employeeName = '';
            this.loadParam.inquire = '';
            this.loadParam.employee = '';
            this.getPurchaseOrderList(this.loadParam)
        },
        selectEmployee: function() {
            this.employeeParam.show = true;
        }

    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getPurchaseOrderList(this.loadParam);
        },
        a: function(employee) {
            this.loadParam.employeeName = employee.employeeName;
            this.loadParam.employee = employee.employeeId;
            this.selectSearch(this.loadParam)
        }
    },
    created() {
        this.getPurchaseOrderList(this.loadParam);
        //changeMenu(this.$store.state.table.isTop, this.getIntentionList, this.loadParam, localStorage.myIntentionParam);

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
    width: 189px;
    min-width: 189px;
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
