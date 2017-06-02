<template>
    <div>
        <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
        <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
        <audit-model :param="financeParam" v-if="financeParam.show"></audit-model>
        <receipt-model :param="auditParam" v-if="auditParam.show"></receipt-model>
        <language-model v-show="false"></language-model>
        <mglist-model>
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clearfix">
                    <dl class="clear left">
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
                    <div class="btn-group ">
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
                            <th>{{$t('static.userName')}}</th>
                            <th>{{$t('static.account')}}</th>
                            <th>{{$t('static.paid_time')}}</th>
                            <th>{{$t('static.comment')}}</th>
                            <th>{{$t('static.review_status')}}</th>
                            <th>{{$t('static.paystatus')}}</th>
                            <th>{{$t('static.handle')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initMyFundList">
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
                            <td>
                                <!-- 确认收款 -->
                                <button class="btn btn-default btn-cut" v-if="item.type==0&&item.pr==0&&item.validate==2" @click="applyInfo({
                                        show:true,
                                        sub:$index,
                                        id:item.id,
                                        image_f:'',
                                        image_s:'',
                                        image_t:'',
                                        images:'',
                                        url:'/fund/proceedsConfirm',
                                        titles:this.$t('static.confirm_income'),
                                        link:paymentConfirm
                                        })">{{$t('static.confirm_accept')}}
                                </button>
                                <!-- 编辑 -->
                                <a class="operate" v-if="item.validate==0" @click="editClick({
                                        show:true,
                                        sub:$index,
                                        id:item.id,
                                        validate:item.validate,
                                        amount:item.amount,
                                        type:item.type,
                                        payWay:item.payWay,
                                        payName:item.payName,
                                        paySubName:item.paySubName,
                                        payUserName:item.payUserName,
                                        payNumber:item.payNumber,
                                        comment:item.comment,
                                        url:'/fund/',
                                        titles:this.$t('static.edit'),
                                        link:editPayment
                                    })"><img src="/static/images/{{$t('static.img_edit')}}.png" />
                                </a>
                                <!-- 申请审核 -->
                                <button class="btn btn-success" v-if="item.validate==0" @click="applyInfo({
                                          show:true,
                                          sub:$index,
                                          id:item.id,
                                          name:item.payName,
                                          comment:item.comment,
                                          image_f:'',
                                          image_s:'',
                                          image_t:'',
                                          images:'',
                                          url:'/fund/validate/request',
                                          titles:this.$t('static.review_application'),
                                          link:paymentConfirm
                                    })" style="padding:1px 4px;background:#fff;color:#398439;margin-top:-22px;">{{$t('static.review_application')}}
                                </button>
                                <a class="operate btn-gray" v-if="item.validate==1&&item.pr==0">{{$t('static.un_finance')}}</a>
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
import auditModel from './second_order/financeAudit'
import tipsModel from '../../components/tips/tipDialog'
import receiptModel from '../order/second_order/orderAudit'
import mglistModel from '../mguan/mgListComponent.vue'
import languageModel from '../tools/language.vue'
import {
    initMyFundList
} from '../../vuex/getters'
import {
    getMyFundList,
    paymentConfirm,
    editPayment,
} from '../../vuex/actions'
export default {
    components: {
        pagination,
        detailModel,
        auditModel,
        tipsModel,
        receiptModel,
        mglistModel,
        languageModel
    },
    vuex: {
        getters: {
            initMyFundList
        },
        actions: {
            getMyFundList,
            paymentConfirm,
            editPayment,
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
                total: 0
            },
            changeParam: {
                show: false
            },
            auditParam: {
                show: false
            },
            language: '',
            tipsParam: {
                show: false,
                alert: true,
                name: ''
            },
            financeParam: {
                show: false
            },
            checked: false
        }
    },
    methods: {
        clickOn: function(initMyFundList) {
            this.changeParam = initMyFundList;
            this.changeParam.show = true;
        },
        selectSearch: function() {
            this.getMyFundList(this.loadParam);
        },
        clickday: function(validate) {
            this.loadParam.validate = validate;
            this.selectSearch();
        },
        clickType: function(type) {
            this.loadParam.type = type;
            this.selectSearch();
        },
        resetTime: function() {
            this.loadParam.amount = '';
            this.loadParam.type = '';
            this.loadParam.validate = '';
            this.loadParam.payName = '';
            this.loadParam.payUserName = '';
            this.loadParam.payNumber = '';
            this.loadParam.payWay = '';
            this.getMyFundList(this.loadParam);
        },
        applyInfo: function(item) {
            if (item.name == '') {
                this.tipsParam.show = true;
                this.tipsParam.name = this.$t('static.complete_information');
            } else {
                this.financeParam.show = true;
                this.financeParam = item;
            }

            this.financeParam.callback = this.callback;
        },
        editClick: function(receipt) {
            this.auditParam.show = true;
            if (receipt.titles == '申请分期审核') {
                receipt.validate = 1;
            }
            this.auditParam = receipt;
            this.auditParam.callback = this.callback;
        },
        callback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.alert = true;
            this.tipsParam.name = title;
            this.getMyFundList(this.loadParam);
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getMyFundList(this.loadParam);
        }
    },
    ready() {
        common('tab', 'table_box', 1);
    },
    created() {
        changeMenu(this.$store.state.count.isTop, this.getMyFundList, this.loadParam, localStorage.myFundParam);
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
    padding-left: 10px;
    padding-right: 10px;
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
