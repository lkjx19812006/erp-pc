<template>
    <div>
        <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
        <search-model :param="loadParam" v-if="loadParam.show"></search-model>
        <employee-model :param="transferParam" v-if="transferParam.show"></employee-model>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <language-model v-show="false"></language-model>
        <mglist-model>
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clear">
                    <div class="left">
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.order_type')}}：</dt>
                            <dd class="left">
                                <select class="form-control" v-model="loadParam.type" @change="selectSearch()">
                                    <option value="">{{$t('static.please_select')}}</option>
                                    <option value="0">{{$t('static.purchase')}}</option>
                                    <option value="1">{{$t('static.sell')}}</option>
                                </select>
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.consignee_name')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.consignee" @keyup.enter="selectSearch()" />
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <div class="col-xs-6">
                                <dt class="left transfer marg_top">{{$t('static.start_time')}}：</dt>
                                <mz-datepicker :time.sync="loadParam.startTime" format="yyyy/MM/dd HH:mm:ss">
                                </mz-datepicker>
                            </div>
                        </dl>
                    </div>
                </div>
                <div class="clear">
                    <div class="right">
                        <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
                    </div>
                    <div class="left">
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.trading_patterns')}}：</dt>
                            <dd class="left">
                                <select v-model="loadParam.mode" class="form-control" @change="selectSearch()">
                                    <option value="">{{$t('static.please_select')}}</option>
                                    <option value="1">{{$t('static.together')}}</option>
                                    <option value="2">{{$t('static.three_side')}}</option>
                                    <option value="3">{{$t('static.self_support')}}</option>
                                </select>
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.consignee_phone')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.consigneePhone" @keyup.enter="selectSearch()" />
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <div class="col-xs-6">
                                <dt class="left transfer marg_top">{{$t('static.end_time')}}：</dt>
                                <mz-datepicker :time.sync="loadParam.endTime" format="yyyy/MM/dd HH:mm:ss">
                                </mz-datepicker>
                            </div>
                        </dl>
                        <button type="button" class="new_btn" @click="resetTime()">{{$t('static.clear_all')}}</button>
                        <button class="new_btn transfer" @click="selectSearch()">{{$t('static.search')}}</button>
                    </div>
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
                            <!-- <th><label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}"  @click="select()"></label></th> -->
                            <th>{{$t('static.transcation')}}</th>
                            <th>{{$t('static.order_type')}}</th>
                            <th>{{$t('static.trading_patterns')}}</th>
                            <th>{{$t('static.sample_order')}}</th>
                            <th>{{$t('static.client_name')}}</th>
                            <th>{{$t('static.breed')}}</th>
                            <th>{{$t('static.transcation_amount')}}</th>
                            <th>{{$t('static.cost')}}{{$t('static.total')}}</th>
                            <th>{{$t('static.wait_payment')}}</th>
                            <th>{{$t('static.paid')}}</th>
                            <th>{{$t('static.currency')}}</th>
                            <th>{{$t('static.consignee_name')}}</th>
                            <th>{{$t('static.consignee_phone')}}</th>
                            <th>{{$t('static.consignee_address')}}</th>
                            <th>{{$t('static.order_status')}}</th>
                            <th>{{$t('static.order_source')}}</th>
                            <th>{{$t('static.review_status')}}</th>
                            <th style="min-width: 105px;">{{$t('static.handle')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initUserOrderlist" v-cloak>
                            <td>{{item.tradeTime | subtime}}</td>
                            <td v-if="item.type==1">{{$t('static.sell')}}</td>
                            <td v-if="item.type==0">{{$t('static.purchase')}}</td>
                            <td v-if="item.mode==1">{{$t('static.together')}}</td>
                            <td v-if="item.mode==2">{{$t('static.three_side')}}</td>
                            <td v-if="item.mode==3">{{$t('static.self_support')}}</td>
                            <td v-if="item.sample==0">{{$t('static.no')}}</td>
                            <td v-if="item.sample==1">{{$t('static.yes')}}</td>
                            <td><a @click="clickOn({
                                        show:true,
                                        id:item.id,
                                        loading:true,
                                        key:'orderDetail',
                                        orderStatus:item.orderStatus,
                                        contact:'/order/myList'
                                })">{{item.customerName}}</a>
                            </td>
                            <td>{{item.goodsDesc}}</td>
                            <td>{{item.total}}</td>
                            <td>{{item.cost}}</td>
                            <td>{{item.unpaid}}</td>
                            <td>{{item.prepaid}}</td>
                            <td>{{item.currency | Currency}}</td>
                            <td>{{item.consignee}}</td>
                            <td>{{item.consigneePhone}}</td>
                            <td>{{item.country}} {{item.province}} {{item.city}} {{item.district}} {{item.consigneeAddr}}</td>
                            <td v-if="this.language=='zh_CN'">{{item.orderStatus | assess item.type item.logistics item.verifierName item.taskKey}}</td>
                            <td v-if="this.language=='en'">{{item.orderStatus | Enassess item.type item.logistics item.verifierName item.taskKey}}</td>
                            <td v-if="item.sourceType==0">{{$t('static.new')}}</td>
                            <td v-if="item.sourceType==1">{{$t('static.intention')}}</td>
                            <td v-if="item.sourceType==2">{{$t('static.quote')}}</td>
                            <td v-if="item.sourceType==3">{{$t('static.sample_order')}}</td>
                            <td v-if="item.validate==2">
                                <div style="background:green;color:#fff">{{$t('static.approved')}}</div>
                            </td>
                            <td v-if="item.validate==-2">
                                <div style="background:red;color:#fff">{{$t('static.unapproved')}}</div>
                            </td>
                            <td v-if="item.validate==0">{{$t('static.wait_approval')}}</td>
                            <td v-if="item.validate==1">{{$t('static.approving')}}(待{{item.verifierName}}审核)</td>
                            <td>
                                <a @click="transferToEmployee(item,$index)">划转</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 底部分页 -->
            <pagination :combination="loadParam" slot="page"></pagination>
        </mglist-model>
    </div>
</template>
<script>
import pagination from '../pagination'
import filter from '../../filters/filters'
import detailModel from '../order/orderDetail'
import common from '../../common/common'
import changeMenu from '../../components/tools/tabs/tabs.js'
import mglistModel from '../mguan/mgListComponent.vue'
import languageModel from '../tools/language.vue'
import employeeModel from '../clientRelate/searchEmpInfo.vue'
import tipsdialogModel from '../tips/tipDialog.vue'

import {
    getList,
    initUserOrderlist,
    initLogin
} from '../../vuex/getters'
import {
    getUserOrder,
    getOrderDetail,
    transferOrder
} from '../../vuex/actions'
export default {
    components: {
        pagination,
        detailModel,
        filter,
        mglistModel,
        languageModel,
        employeeModel,
        tipsdialogModel
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                show: false,
                cur: 1,
                all: 1,
                total: 0,
                link: '/order/userList',
                key: 'userOrderList',
                type: '',
                mode: '',
                orderStatus: '',
                validate: '',
                consignee: '',
                consigneePhone: '',
                endTime: '',
                startTime: ''


            },
            language: '',
            line_height: 0,

            detailParam: {
                show: false
            },
            transferParam: {
                show: false,
                link: '/order/transferToEmployee',
                callback: '',
                employee: '',
                id: '',
                user: ''
            },
            tipsParam: {
                show: false,
                alert: true,
                name: ''
            }

        }
    },
    vuex: {
        getters: {
            getList,
            initUserOrderlist,
            initLogin
        },
        actions: {
            getUserOrder,
            getOrderDetail,
            transferOrder

        }
    },
    methods: {
        selectSearch: function() {
            this.getUserOrder(this.loadParam);
        },
        select: function() {
            console.log(this.checked)
            this.checked = !this.checked;
            const checked = this.checked;
            this.$store.state.table.basicBaseList.userOrderList.forEach(function(item) {
                if (item.validate == 0) item.checked = checked;
            })
        },

        // 点击申请收款弹出子弹框
        clickOn: function(param) {
            this.detailParam = param;
        },
        resetTime: function() {
            this.loadParam.startTime = "";
            this.loadParam.endTime = "";
            this.loadParam.consigneePhone = "";
            this.loadParam.consignee = "";
            this.loadParam.orderStatus = "";
            this.loadParam.mode = "";
            this.loadParam.validate = "";
            this.loadParam.type = "";
            this.getUserOrder(this.loadParam);
        },

        //订单划转到业务员
        transferToEmployee: function(item,itemSub) {
            this.transferParam.id = item.id;
            this.transferParam.user = item.user;
            this.transferParam.employee = "";
            this.transferParam.callback = this.transferCallback;
            this.transferParam.show = true;
            this.transferParam.itemSub = itemSub;
            
        },
        transferCallback: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.name = name;
        }

    },

    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getUserOrder(this.loadParam);
        },
        a: function(employeeInfo) {
            this.transferParam.employee = employeeInfo.employeeId;
            this.transferOrder(this.transferParam);
        }
    },
    filter: (filter, {}),
    ready() {
        common('tab', 'table_box', 1);
    },
    created() {
        changeMenu(this.$store.state.table.isTop, this.getUserOrder, this.loadParam, localStorage.userOrderParam);
        this.language = localStorage.lang;
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
    margin-right: 10px;
}

.order_table {
    position: relative;
}

.marg_top {
    margin-top: 8px;
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

.order_table .table {
    background: #fff;
    position: relative;
    margin-bottom: 10px;
}

#table_box table th,
#table_box table td {
    width: 95px;
    min-width: 94px;
}

.order_pagination {
    text-align: center;
}
</style>
