<template>
    <div>
        <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
        <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
        <language-model v-show="false"></language-model>
        <mglist-model>
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clearfix">
                    <dl class="clear left">
                        <dt class="left  marg_top">{{$t('static.salesman')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.employeeName" @click="employeeSearch(employee,employeeName)" />
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left  marg_top">{{$t('static.payment_name')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.payName" @keyup.enter="selectSearch()" />
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left  marg_top">{{$t('static.order_amount')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.amount" @keyup.enter="selectSearch()" />
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left  marg_top">{{$t('static.userName')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.payUserName" @keyup.enter="selectSearch()" />
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left  marg_top">{{$t('static.account')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.payNumber" @keyup.enter="selectSearch()" />
                        </dd>
                    </dl>
                </div>
                <div class="clearfix left">
                    <div class="btn-group">
                        <button class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.validate===''}" @click="clickday('')">{{$t('static.please_select')}}</button>
                        <button class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.validate===0}" @click="clickday(0)">{{$t('static.wait_approval')}}</button>
                        <button class="btn btn-default" v-bind:class="{ 'btn-warning':  this.loadParam.validate===1}" @click="clickday(1)">{{$t('static.approving')}}</button>
                        <button class="btn btn-default" v-bind:class="{ 'btn-warning':  this.loadParam.validate===2}" @click="clickday(2)">{{$t('static.approved')}}</button>
                        <button class="btn btn-default" v-bind:class="{ 'btn-warning':  this.loadParam.validate===3}" @click="clickday(3)">{{$t('static.unapproved')}}</button>
                    </div>
                    <div class="btn-group transfer">
                        <button class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===''}" @click="clickType('')">{{$t('static.please_select')}}</button>
                        <button class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===0}" @click="clickType(0)">{{$t('static.paid')}}</button>
                        <button class="btn btn-default" v-bind:class="{ 'btn-warning':  this.loadParam.type===1}" @click="clickType(1)">{{$t('static.income')}}</button>
                        <button type="button" class="new_btn transfer pull-left" @click="resetTime()">{{$t('static.clear_all')}}</button>
                        <button class="new_btn transfer pull-left" @click="selectSearch()">{{$t('static.search')}}</button>
                    </div>
                </div>
                <div class="clearfix right">
                    <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
                </div>
            </div>
            <!-- 中间列表 -->
            <div slot="form">
                <div class="cover_loading">
                    <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <table class="table table-hover table_color table-striped" v-cloak id="tab">
                    <thead>
                        <tr>
                            <th>{{$t('static.date')}}</th>
                            <th>{{$t('static.type')}}</th>
                            <th>{{$t('static.order_amount')}}</th>
                            <th>{{$t('static.currency')}}</th>
                            <th>{{$t('static.country')}}</th>
                            <th>{{$t('static.payment_name')}}</th>
                            <th>{{$t('static.salesman')}}</th>
                            <th>{{$t('static.userName')}}</th>
                            <th>{{$t('static.account')}}</th>
                            <th>{{$t('static.paid_time')}}</th>
                            <th>{{$t('static.comment')}}</th>
                            <th>{{$t('static.review_status')}}</th>
                            <th>{{$t('static.paystatus')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initOrgFundList">
                            <td>{{item.ctime}}</td>
                            <td>
                                <a v-if="this.language=='zh_CN'" @click="clickOn({
                                    sub:$index,
                                    id:item.id,
                                    loading:true,
                                    show:true,
                                    key:'fundRecord'
                                  })">{{item.bizType | bizType item.bizType item.type}}</a>
                                <a v-if="this.language=='en'" @click="clickOn({
                                  sub:$index,
                                  id:item.id,
                                  loading:true,
                                  show:true,
                                  key:'fundRecord'
                                })">{{item.bizType | enbizType item.bizType item.type}}</a>
                            </td>
                            <td>{{item.amount}}</td>
                            <td>{{item.currency | Currency}}</td>
                            <td>{{item.payCountryName}}</td>
                            <td>{{item.payName}}<span v-if="item.paySubName!==''">（{{item.paySubName}}）</span></td>
                            <td>{{item.employeeName}}</td>
                            <td>{{item.payUserName}}</td>
                            <td>{{item.payNumber}}</td>
                            <td>{{item.ctime}}</td>
                            <td>{{item.comment}}</td>
                            <td>
                                <span v-if="item.validate==0">{{$t('static.wait_approval')}}</span>
                                <span v-if="item.validate==1" style="background:#483D8B;color:#fff;">
                                    {{$t('static.approving')}}
                                </span>
                                <span v-if="item.validate==2" style="background:green;color:#fff;">
                                    {{$t('static.approved')}}
                                </span>
                                <span v-if="item.validate==3" style="background:red;color:#fff;">
                                    {{$t('static.unapproved')}}
                                </span>
                            </td>
                            <td>
                                <span v-if="item.pr==0&&item.type==0">{{$t('static.not_paid')}}</span>
                                <span v-if="item.pr==0&&item.type==1">{{$t('static.not_receive')}}</span>
                                <span v-if="item.pr==1&&item.type==0&&item.bizType!='order_cancel_refund'" style="background:green;color:#fff;">
                                    {{$t('static.confirm_paid')}}
                                </span>
                                <span v-if="item.pr==1&&item.type==0&&item.bizType=='order_cancel_refund'" style="background:green;color:#fff;">
                                    已确认退款
                                </span>
                                <span v-if="item.pr==1&&item.type==1&&item.bizType=='order'" style="background:green;color:#fff;">
                                    {{$t('static.confirm_recipt')}}
                                </span>
                                <span v-if="item.pr==1&&item.type==1&&item.bizType=='order_refund'" style="background:green;color:#fff;">
                                    {{$t('static.confirm_paid')}}
                                </span>
                                <span v-if="item.pr==1&&item.type==1&&item.bizType=='order_after_sales_refund'" style="background:green;color:#fff;">
                                    {{$t('static.confirm_refund')}}
                                </span>
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
import detailModel from '../order/second_order/fundDetail'
import common from '../../common/common'
import changeMenu from '../../components/tools/tabs/tabs.js'
import employeeModel from './second_order/searchEmployee'
import mglistModel from '../mguan/mgListComponent.vue'
import languageModel from '../tools/language.vue'
import {
    initOrgFundList
} from '../../vuex/getters'
import {
    getOrgFundList
} from '../../vuex/actions'
export default {
    components: {
        pagination,
        detailModel,
        mglistModel,
        employeeModel,
        languageModel
    },
    vuex: {
        getters: {
            initOrgFundList
        },
        actions: {
            getOrgFundList
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 1,
                type: '',
                amount: '',
                payName: '',
                payUserName: '',
                payNumber: '',
                payWay: '',
                validate: '',
                total: 0,
                employee: '',
                employeeName: ''
            },
            language: '',
            employeeParam: {
                show: false,
            },
            changeParam: {
                show: false
            },
            checked: false
        }
    },
    methods: {
        clickOn: function(initOrgFundList) {
            this.changeParam = initOrgFundList;
            this.changeParam.show = true;
        },
        selectSearch: function() {
            this.getOrgFundList(this.loadParam);
        },
        clickType: function(type) {
            this.loadParam.type = type;
            this.selectSearch();
        },
        clickday: function(validate) {
            this.loadParam.validate = validate;
            this.getOrgFundList(this.loadParam);
        },
        resetTime: function() {
            this.loadParam.amount = '';
            this.loadParam.type = '';
            this.loadParam.validate = '';
            this.loadParam.payName = '';
            this.loadParam.payUserName = '';
            this.loadParam.payNumber = '';
            this.loadParam.payWay = '';
            this.loadParam.employeeName = '';
            this.loadParam.employee = '';
            this.getOrgFundList(this.loadParam);
        },
        employeeSearch: function(employee, employeeName) {
            this.employeeParam.show = true;
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getOrgFundList(this.loadParam);
        },
        selectEmpOrOrg: function(item) {
            console.log(item)
            this.loadParam.employeeName = item.employeeName;
            this.loadParam.employee = item.employeeId;
        }
    },
    ready() {
        common('tab', 'table_box', 1);
    },
    created() {
        changeMenu(this.$store.state.count.isTop, this.getOrgFundList, this.loadParam, localStorage.orgFundParam);
        this.language = localStorage.lang;
    }
}
</script>
<style scoped>
.breed_action {
    top: 33px;
    right: 106px;
}

.transfer {
    margin-left: 18px;
}

.service-nav {
    padding-bottom: 5px;
}

.my_order_search {
    width: 170px;
    float: left;
    margin-right: 10px;
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
    width: 130px;
    min-width: 130px;
}
</style>
