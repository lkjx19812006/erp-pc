<template>
    <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
    <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
    <audit-model :param="financeParam" v-if="financeParam.show"></audit-model>
    <aftersales-model :param="salesParam" v-if="salesParam.show"></aftersales-model>
    <after-sales-audit-model :param="afterSalesAuditParam" v-if="afterSalesAuditParam.show"></after-sales-audit-model>
    <mglist-model>
        <!-- 头部搜索 -->
        <div slot="top">
            <div class="clearfix">
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">{{$t('static.order_type')}}：</dt>
                    <dd class="left">
                        <select class="form-control" v-model="loadParam.orderType" @change="selectSearch()">
                            <option value="">{{$t('static.please_select')}}</option>
                            <option value="0">{{$t('static.purchase')}}</option>
                            <option value="1">{{$t('static.sell')}}</option>
                        </select>
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left  marg_top">{{$t('static.breed')}}：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.orderDesc" @keyup.enter="selectSearch()" />
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">{{$t('static.order_no')}}：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.orderNo" @keyup.enter="selectSearch()" />
                    </dd>
                </dl>
                <dl class="clear left transfer">
                      <dt class="left transfer marg_top">{{$t('static.client_id')}}：</dt>
                      <dd class="left">
                         <input type="text"  class="form-control" v-model="loadParam.customer"  @keyup.enter="selectSearch()"/>
                      </dd>
                   </dl> 
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">{{$t('static.client_name')}}：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.customerName" @keyup.enter="selectSearch()" />
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">{{$t('static.client_phone')}}：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.customerPhone" @keyup.enter="selectSearch()" />
                    </dd>
                </dl>
                <button type="button" class="new_btn transfer pull-left" @click="resetTime()">{{$t('static.clear_all')}}</button>
                <button class="new_btn transfer pull-left" @click="selectSearch()">{{$t('static.search')}}</button>
                <div class="clearfix right">
                    <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
                </div>
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
                        <th>{{$t('static.aftersales_type')}}</th>
                        <th>{{$t('static.client_id')}}</th>
                        <th>{{$t('static.client_name')}}</th>
                        <th>{{$t('static.client_phone')}}</th>
                        <th>{{$t('static.breed')}}</th>
                        <th>{{$t('static.order_no')}}</th>
                        <th>{{$t('static.order_type')}}</th>
                        <th>{{$t('static.receive_person')}}</th>
                        <th>{{$t('static.send_person')}}</th>
                        <th>{{$t('static.comment')}}</th>
                        <th>{{$t('static.status')}} {{$t('static.explanation')}}</th>
                        <th>{{$t('static.handle')}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initOrgAfterSales">
                        <td>{{item.ctime | dateTime}}</td>
                        <td>
                            <span v-if="item.type==0">{{$t('static.replacement')}}</span>
                            <span v-if="item.type==1">{{$t('static.reutrned')}}</span>
                            <span v-if="item.type==2">{{$t('static.reutrned')}}&{{$t('static.replacement')}}</span>
                        </td>
                        <td>{{item.customer}}</td>
                        <td><a @click="details({
                    id:item.id,
                    show:true,
                    loading:false,
                    url:'/order/quality/after/sales/details/',
                    index:$index
                  })">{{item.customerName}}</a>
                        </td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.orderDesc}}</td>
                        <td>{{item.orderNo}}</td>
                        <td v-if="item.orderType==0">{{$t('static.purchase')}}</td>
                        <td v-if="item.orderType==1">{{$t('static.sell')}}</td>
                        <td>{{item.consigneeName}}</td>
                        <td>{{item.shipperName}}</td>
                        <td>{{item.comment}}</td>
                        <td>
                            <span>{{item.validate | salesRecord item.taskKey}}</span>
                            <span v-if="item.validate==1&&item.taskKey=='after_sales_governor_validate'">
                                    ({{$t('static.management_approval')}})
                                </span>
                            <span v-if="item.validate==1&&item.taskKey=='after_sales_receipt'">
                                    (待{{item.handlerName}}收货确认)
                                </span>
                            <span v-if="item.validate==1&&item.taskKey=='after_sales_resend'">
                                    (待{{item.handlerName}}发货)
                                </span>
                            <span v-if="item.validate==1&&item.taskKey=='after_sales_refund'">
                                    ({{$t('static.un_finance')}})
                                </span>
                        </td>
                        <td>
                            <!-- <button class="btn btn-primary btn-edit" v-if="item.validate==1&&(item.taskKey===''||item.taskKey=='after_sales_governor_validate')" @click="applyInfo({
                                                      show:true,
                                                      sub:$index,
                                                      id:item.id,
                                                      validate:item.validate,
                                                      description:'',
                                                      url:'/order/quality/after/sales/validate',
                                                      titles:'售后审核',
                                                      link:contractCheck
                                                    })">{{$t('static.aftersales')}}</button> -->
                            <button class="btn btn-primary btn-edit" v-if="item.validate==1&&(item.taskKey===''||item.taskKey=='after_sales_governor_validate')" @click="afterSalesAudit(item)">{{$t('static.aftersales')}}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 底部分页 -->
        <pagination :combination="loadParam" slot="page"></pagination>
    </mglist-model>
</template>
<script>
import pagination from '../pagination'
import detailModel from '../order/second_order/fundDetail'
import common from '../../common/common'
import changeMenu from '../../components/tools/tabs/tabs.js'
import auditModel from './second_order/financeAudit'
import tipsModel from '../../components/tips/tipDialog'
import mglistModel from '../mguan/mgListComponent'
import aftersalesModel from '../order/second_order/orderReceiveDetail'
import afterSalesAuditModel from '../order/afterSalesAudit'
import {
    initOrgAfterSales
} from '../../vuex/getters'
import {
    getSalesApplyList,
    paymentConfirm,
    contractCheck
} from '../../vuex/actions'
export default {
    components: {
        pagination,
        detailModel,
        auditModel,
        tipsModel,
        aftersalesModel,
        afterSalesAuditModel,
        mglistModel
    },
    vuex: {
        getters: {
            initOrgAfterSales
        },
        actions: {
            getSalesApplyList,
            paymentConfirm,
            contractCheck
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
                link: '/order/after/sales/list/org',
                orderDesc: '',
                customerName: '',
                customer:'',
                customerPhone: '',
                orderNo: '',
                orderType: '',
                validate: '',
                total: 0
            },
            changeParam: {
                show: false
            },
            salesParam: {
                show: false
            },
            afterSalesAuditParam: {
                show: false,
                id: '', //退货订单ID
                callback: this.afterSalesAuditBack
            },
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
        clickOn: function(initOrgAfterSales) {
            this.changeParam = initOrgAfterSales;
            this.changeParam.show = true;
        },
        selectSearch: function() {
            this.getSalesApplyList(this.loadParam);
        },
        clickday: function(validate) {
            this.loadParam.validate = validate;
            this.getSalesApplyList(this.loadParam);
        },
        resetTime: function() {
            this.loadParam.orderDesc = '';
            this.loadParam.customer='';
            this.loadParam.customerName = '';
            this.loadParam.customerPhone = '';
            this.loadParam.orderNo = '';
            this.loadParam.orderType = '';
            this.getSalesApplyList(this.loadParam);
        },
        details: function(item) {
            this.salesParam = item;
        },
        applyInfo: function(item) {
            this.financeParam.show = true;
            this.financeParam = item;
            this.financeParam.callback = this.callback;
        },
        //售后主管审核,代替之前的接口
        afterSalesAudit: function(item) {
            this.afterSalesAuditParam.id = item.id;
            this.afterSalesAuditParam.show = true;

        },
        afterSalesAuditBack: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.alert = true;
            this.tipsParam.name = name;
            this.afterSalesAuditParam.show = false;
            this.selectSearch();
        },
        callback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.alert = true;
            this.tipsParam.name = title;
            this.getSalesApplyList(this.loadParam);
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getSalesApplyList(this.loadParam);
        }
    },
    ready() {
        common('tab', 'table_box', 1);
    },
    created() {
        changeMenu(this.$store.state.count.isTop, this.getSalesApplyList, this.loadParam, localStorage.myFundParam);
    }
}
</script>
<style scoped>
.transfer {
    margin-right: 10px;
}

.service-nav {
    padding-bottom: 0px;
    padding-left: 10px;
    padding-right: 10px;
}

#table_box table th,
#table_box table td {
    width: 144px;
    min-width: 144px;
}
</style>
