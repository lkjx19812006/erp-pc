<template>
    <div>
        <update-model :param="editParam" v-if="editParam.show"></update-model>
        <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
        <audit-model :param="financeParam" v-if="financeParam.show"></audit-model>
        <resend-model :param="resendParam" v-if="resendParam.show"></resend-model>
        <aftersales-model :param="salesParam" v-if="salesParam.show"></aftersales-model>
        <apply-model :param="applyParam" v-if="applyParam.show"></apply-model>
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
                            <th>{{$t('static.client_name')}}</th>
                            <th>{{$t('static.client_phone')}}</th>
                            <th>{{$t('static.breed')}}</th>
                            <th>{{$t('static.order_no')}}</th>
                            <th>{{$t('static.order_type')}}</th>
                            <th>{{$t('static.consignee')}}</th>
                            <th>{{$t('static.send_person')}}</th>
                            <th>{{$t('static.comment')}}</th>
                            <th>{{$t('static.explanation')}}</th>
                            <th>{{$t('static.status')}} {{$t('static.explanation')}}</th>
                            <th>{{$t('static.handle')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initMyAfterSales">
                            <td>{{item.ctime | dateTime}}</td>
                            <td v-if="item.type==0">{{$t('static.replacement')}}</td>
                            <td v-if="item.type==1">{{$t('static.reutrned')}}</td>
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
                            <td>{{item.description}}</td>
                            <td v-if="item.taskKey=='after_sales_refund'&&item.validate==1">{{$t('static.un_finance')}}</td>
                            <td v-if="item.taskKey=='after_sales_resend'&&item.logistics==0">待{{item.handlerName}}发货</td>
                            <td v-if="item.taskKey=='after_sales_resend'&&item.logistics==2">{{$t('static.sent_confirm')}}</td>
                            <td v-if="item.taskKey!=='after_sales_refund'&&item.taskKey!=='after_sales_resend'">{{item.validate | salesRecord item.type item.taskKey}}
                                <span v-if="item.validate==1&&item.taskKey=='after_sales_receipt'">（待{{item.handlerName}}收货确认）</span>
                            </td>
                            <td>
                                <a class="operate" v-if="item.validate==-2||item.validate==0" @click="editPayment({
                                      show:true,
                                      sub:$index,
                                      id:item.id,
                                      consignee:item.consignee,
                                      consigneeName:item.consigneeName,
                                      validate:item.validate,
                                      orderId:item.orderId,
                                      comment:item.comment,
                                      type:item.type,
                                      image_f:'',
                                      image_s:'',
                                      image_t:'',
                                      images:'',
                                      shipper:item.shipper,
                                      shipperName:item.shipperName,
                                      url:'/order/quality/after/sales/edit',
                                      titles:'编辑',
                                      link:afterSalseEdit
                                  })"><img src="/static/images/{{$t('static.img_edit')}}.png" /></a>
                                <!-- 申请审核 -->
                                <button class="btn btn-warning" style="padding:1px 3px;background-color: #fff;color:#eea236;" v-if="item.validate==0" @click="applyFirst({
                                    show:true,
                                    sub:$index,
                                    id:item.id,
                                    consignee:item.consignee,
                                    url:'/order/quality/after/sales/apply',
                                    titles:this.$t('static.review_application'),
                                    link:contractCheck
                                })">{{$t('static.review_application')}}</button>
                                <a class="operate" v-if="item.validate==-2&&item.taskKey=='after_sales_employee_handle'" @click="applyInfo({
                                    show:true,
                                    sub:$index,
                                    id:item.id,
                                    validate:item.validate,
                                    comment:'',
                                    url:'/order/quality/after/sales/restartOrCancel',
                                    titles:'重新申请审核',
                                    link:contractCheck
                                })"><img src="/static/images/{{$t('static.img_reset')}}.png" /></a>
                                <button class="btn btn-primary" v-if="item.validate==1&&item.taskKey=='after_sales_receipt'" style="background:#fff;color:#2e6da4;padding:2px 5px;" @click="applyInfo({
                                            show:true,
                                            sub:$index,
                                            id:item.id,
                                            description:'',
                                            validate:item.validate,
                                            url:'/order/quality/after/sales/validate',
                                            titles:'确认收货',
                                            link:contractCheck
                                  })">{{$t('static.confirm_receipt')}}</button>
                                <button class="btn btn-primary" v-if="item.validate==-2&&item.taskKey=='after_sales_disputed_handle'" style="background:#fff;color:#2e6da4;padding:2px 5px;" @click="applyInfo({
                                            show:true,
                                            sub:$index,
                                            id:item.id,
                                            description:'',
                                            url:'/order/quality/after/sales/disputed',
                                            titles:'售后异议处理',
                                            link:contractCheck
                                  })">{{$t('static.objection_handl')}}</button>
                                <button class="btn btn-primary" v-if="item.taskKey=='after_sales_resend'&&item.handler==initLogin.id&&item.logistics==0" style="background:#fff;color:#2e6da4;padding:2px 5px;" @click="salesResend(item,$index)">{{$t('static.reapply_delivery')}}</button>
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
import changeMenu from '../../components/tools/tabs/tabs'
import auditModel from './second_order/financeAudit'
import tipsModel from '../../components/tips/tipDialog'
import updateModel from '../../components/order/second_order/afterSalesApply'
import resendModel from '../order/second_order/afterResendPage'
import mglistModel from '../mguan/mgListComponent.vue'
import aftersalesModel from '../order/second_order/orderReceiveDetail'
import applyModel from '../../components/tips/tipDialog'
import {
    initMyAfterSales,
    initLogin
} from '../../vuex/getters'
import {
    getSalesApplyList,
    paymentConfirm,
    contractCheck,
    afterSalseEdit
} from '../../vuex/actions'
export default {
    components: {
        pagination,
        detailModel,
        auditModel,
        tipsModel,
        updateModel,
        resendModel,
        aftersalesModel,
        mglistModel,
        applyModel
    },
    vuex: {
        getters: {
            initMyAfterSales,
            initLogin
        },
        actions: {
            getSalesApplyList,
            paymentConfirm,
            contractCheck,
            afterSalseEdit
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
                link: '/order/after/sales/list/employee',
                orderDesc: '',
                customerName: '',
                customerPhone: '',
                orderNo: '',
                orderType: '',
                validate: '',
                total: 0
            },
            resendParam: {
                show: false,
                loading: true,
                afterSalesId: '',
                orderId: '',
                url: '/order/quality/after/sales/resend',
                titles: '换货后重新发货',
                validate: '',
                code: '', //第三方物流查询编码
                driverName: '',
                driverPid: '',
                driverTel: '',
                logistics: '',
                name: '',
                number: '',
                vehicleNo: '', //车牌号
                wareAddr: '', //仓库地址
                wareName: '', //仓库名
                warehouse: '',
                way: '', //0/1 第三方/自运
            },
            editParam: {
                show: false
            },
            applyParam: {
                show: false
            },
            salesParam: {
                show: false
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
        selectSearch: function() {
            this.getSalesApplyList(this.loadParam);
        },
        clickday: function(validate) {
            this.loadParam.validate = validate;
            this.getSalesApplyList(this.loadParam);
        },
        resetTime: function() {
            this.loadParam.orderDesc = '';
            this.loadParam.customerName = '';
            this.loadParam.customerPhone = '';
            this.loadParam.orderNo = '';
            this.loadParam.orderType = '';
            this.getSalesApplyList(this.loadParam);
        },
        details: function(item) {
            this.salesParam = item;
        },
        salesResend: function(item, sub) { //重新发货
            this.resendParam.show = true;
            this.resendParam.afterSalesId = item.id;
            this.resendParam.orderId = item.orderId;
            this.resendParam.validate = item.validate;
            this.resendParam.callback = this.callback;
        },
        applyFirst: function(item) {
            console.log(item.consignee)
            if (item.consignee == -1) {
                this.tipsParam.show = true;
                this.tipsParam.name = '请先完善信息';
                this.tipsParam.alert = true;
            } else {
                this.applyParam.id = item.id;
                this.applyParam.show = true;
                this.applyParam.link = item.link;
                this.applyParam.url = '/order/quality/after/sales/apply';
                this.applyParam.apply = this.$t('static.review_application');
                this.applyParam.callback = this.callback;
            }
        },
        applyInfo: function(item) {
            this.financeParam.show = true;
            this.financeParam = item;
            this.financeParam.callback = this.callback;
        },
        editPayment: function(update) {
            this.editParam.show = true;
            this.editParam = update;
            this.editParam.callback = this.callback;
            console.log(this.editParam)
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
    width: 134px;
    min-width: 134px;
}
</style>
