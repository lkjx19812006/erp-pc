<template>
    <div>
        <detail-model :param="orderDetailParam" v-if="orderDetailParam.show"></detail-model>
        <receivedetail-model :param="detailParam" v-if="detailParam.show"></receivedetail-model>
        <record-model :param="recordParam" v-if="recordParam.show"></record-model>
        <resend-model :param="resendParam" v-if="resendParam.show"></resend-model>
        <cancel-detail-model :param="cancelDetailParam" v-if="cancelDetailParam.show"></cancel-detail-model>
        <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
        <send-detail :param="sendDetailParam" v-if="sendDetailParam.show"></send-detail>
        <deliver-model :param="deliverParam" v-if="deliverParam.show"></deliver-model>
        <cancel-model :param="cancelAuditParam" v-if="cancelAuditParam.show"></cancel-model>
        <cancel-reapply-model :param="cancelReapplyParam" v-if="cancelReapplyParam.show"></cancel-reapply-model>
        <cancel-receipt-model :param="cancelReceiptParam" v-if="cancelReceiptParam.show"></cancel-receipt-model>
        <after-sales-audit-model :param="afterSalesAuditParam" v-if="afterSalesAuditParam.show"></after-sales-audit-model>
        <after-sales-audit-model :param="afterSalesReceiveParam" v-if="afterSalesReceiveParam.show"></after-sales-audit-model>
        <after-sales-reapply-model :param="afterSalesReapplyParam" v-if="afterSalesReapplyParam.show"></after-sales-reapply-model>
        <after-sales-send-model :param="afterSalesSendParam" v-if="afterSalesSendParam.show"></after-sales-send-model>
        <tip-model :param="tipParam" v-if="tipParam.show"></tip-model>
        <p class="employee_right_title clear">
            <span class="left">{{$t('static.order_message')}}</span>
            <span class="left btn-danger unread" v-if="loadparam.messageLen!=0">{{loadparam.messageLen}}</span>
        </p>
        <div class="refreshBtn">
            <button class="btn btn-primary right" @click="refresh()">{{$t('static.refresh')}}</button>
        </div>
        <div class="employee_right_message">
            <div class="cover_loading">
                <pulse-loader :loading="loadparam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <div class="employee_message_view" v-for="item in backloglist" @click='selectIndex=$index' :class="{actColor:$index===selectIndex}">
                <div class="message_view_left">
                    <span></span>
                    <p>{{item.taskDesc}}</p>
                    <time>{{item.date}}</time>
                </div>
                <!-- 订单审核流程 -->
                <div class="message_view_right" v-if="item.bizType=='order_validate'">
                    <a @click="showOrderDetail(item.bizId)">{{$t('static.details')}}</a>
                    <a @click="showRecord(item)">{{$t('static.records')}}</a>
                    <a v-if="item.taskKey!='employee_handle'" @click="showAudit(item)">{{$t('static.review')}}</a>
                    <a v-else @click="showAudit(item)">{{$t('static.reapply')}}</a>
                </div>
                <!-- 订单发货流程 -->
                <div class="message_view_right" v-if="item.bizType=='order_send'">
                    <a @click="orderSend(item.bizId)">{{$t('static.details')}}</a>
                    <a @click="showRecord(item)">{{$t('static.records')}}</a>
                    <a v-if="item.taskKey=='order_send_governor_validate'" @click="sendAudit(item)">{{$t('static.review')}}</a>
                    <a v-if="item.taskKey=='order_send_warehouse_validate'" @click="deliverGoods(item)">{{$t('static.shipped')}}</a>
                    <a v-if="item.taskKey=='order_send_employee_handle'" @click="sendAudit(item)">{{$t('static.reapply')}}</a>
                </div>
                <!-- 补充合同流程 -->
                <div class="message_view_right" v-if="item.bizType=='order_supplementary_contract'">
                    <a @click="compactDetail(item.bizId)">{{$t('static.details')}}</a>
                    <a @click="showRecord(item)">{{$t('static.records')}}</a>
                    <a v-if="item.taskKey=='supplementary_contract_governor_validate'" @click="receiveAudit(item)">{{$t('static.contract_review')}}</a>
                    <a v-if="item.taskKey=='supplementary_contract_employee_handle'" @click="showAudit(item)">{{$t('static.reapply')}}</a>
                </div>
                <!-- 售后流程 -->
                <div class="message_view_right" v-if="item.bizType=='order_after_sales'">
                    <a @click="salesDetail(item.bizId)">{{$t('static.details')}}</a>
                    <a @click="showRecord(item)">{{$t('static.records')}}</a>
                    <!-- <a v-if="item.taskKey=='after_sales_governor_validate'" @click="showAudit(item)">{{$t('static.aftersales')}}</a> -->
                    <!-- 售后审核 -->
                    <a v-if="item.taskKey=='after_sales_governor_validate'" @click="afterSalesAudit(item)">{{$t('static.aftersales')}}</a>
                    <!-- <a v-if="item.taskKey=='after_sales_receipt'" @click="showAudit(item)">{{$t('static.confirm_receipt')}}</a> -->
                    <!-- 售后收货 -->
                    <a v-if="item.taskKey=='after_sales_receipt'" @click="afterSalesReceive(item)">{{$t('static.confirm_receipt')}}</a>
                    <!-- <a v-if="item.taskKey=='after_sales_resend'" @click="showAudit(item)">{{$t('static.reapply_delivery')}}</a> -->
                    <!-- 售后发货 -->
                    <a v-if="item.taskKey=='after_sales_resend'" @click="afterSalesSend(item)">{{$t('static.reapply_delivery')}}</a>
                    <!-- <a v-if="item.taskKey=='after_sales_employee_handle'" @click="showAudit(item)">{{$t('static.reapply')}}</a> -->
                    <!-- 售后重新申请 -->
                    <a v-if="item.taskKey=='after_sales_employee_handle'" @click="afterSalesReapply(item)">{{$t('static.reapply')}}</a>
                    <!-- <a v-if="item.taskKey=='after_sales_disputed_handle'" @click="showAudit(item)">{{$t('static.objection_handl')}}</a> -->
                </div>
                <!-- 取消订单流程 -->
                <div class="message_view_right" v-if="item.bizType=='order_cancel'">
                    <a @click="showOrderCancelDetail(item.bizId)">{{$t('static.details')}}</a>
                    <a @click="showRecord(item)">{{$t('static.records')}}</a>
                    <a v-if="item.taskKey=='order_cancel_governor_validate'" @click="cancelOrderAudit(item)">{{$t('static.review')}}</a>
                    <a v-if="item.taskKey=='order_cancel_receipt'" @click="cancelOrderReceipt(item)">收货</a>
                    <a v-if="item.taskKey=='order_cancel_reapply'" @click="cancelOrderReapply(item)">{{$t('static.reapply')}}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import detailModel from '../order/orderDetail'
import recordModel from '../record/record'
import auditModel from '../tips/auditDialog'
import tipModel from '../tips/tipDialog'
import sendDetail from '../order/second_order/orderSendDetail'
//import deliverModel from '../order/orderStatus'
import deliverModel from '../order/order_status/deliverGoods'
import receivedetailModel from '../order/second_order/orderReceiveDetail'
import resendModel from '../order/second_order/afterResendPage'
import cancelDetailModel from '../order/orderDetailByCancel'
import cancelModel from '../order/cancelAudit'
import cancelReapplyModel from '../order/cancelReapply'
import cancelReceiptModel from '../order/cancelReceipt'
import afterSalesAuditModel from '../order/afterSalesAudit'
import afterSalesSendModel from '../order/afterSalesSend'
import afterSalesReapplyModel from '../order/afterSalesReapply'
import {
    finishFlow,
    getBacklogList,
    orderCancleFlow
} from '../../vuex/actions'
export default {
    components: {
        detailModel,
        recordModel,
        auditModel,
        tipModel,
        sendDetail,
        receivedetailModel,
        deliverModel,
        resendModel,
        cancelModel,
        cancelReapplyModel,
        cancelReceiptModel,
        cancelDetailModel,
        afterSalesAuditModel,
        afterSalesSendModel,
        afterSalesReapplyModel
    },
    props: ['loadparam', 'backloglist'],
    data() {
        return {
            messageLen: 0,
            title: '',
            selectIndex: null,
            orderDetailParam: {
                loading: true,
                show: false,
                key: 'orderDetail',
                id: '',
                orderStatus: '',
                contact: ''
            },
            sendDetailParam: {
                loading: true,
                show: false,
                key: 'orderDetail',
                id: '',
                orderStatus: '',
                contact: ''
            },
            deliverParam: {
                show: false,
                key: 'myOrderList',
                id: '',
                orderStatus: '',
                contact: '',
                sendoff: false
            },
            recordParam: {
                loading: true,
                link: '/flow/flowRecord',
                bizType: '',
                bizId: '',
                show: false,
            },
            detailParam: { //收货详情
                id: '',
                show: false,
                url: '',
                loading: true
            },
            cancelDetailParam: {
                id: '',
                show: false,
                key: 'orderDetail',
                loading: true
            },
            auditParam: {
                loading: true,
                show: false,
                link: '/flow/',
                title: '审核订单',
                audit: true,
                taskKey: '',
                taskId: '',
                result: '',
                auditComment: '',
                reject: this.reject, //拒绝申请
                pass: this.pass, //通过申请
                callback: this.callback,
                sendPass: this.sendPass, //发货审核成功
                sendRefuse: this.sendRefuse, //发货审核失败
            },
            tipParam: {
                show: false,
                alert: true,
                name: "",
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
            cancelAuditParam: {
                show: false,
                id: '', //取消订单记录的ID号（非订单ID）
                taskKey: '',
                callback: this.cancelBack
            },
            cancelReapplyParam: {
                show: false,
                id: '', //取消订单记录的ID号（非订单ID）
                taskKey: '',
                callback: this.cancelReapplyBack
            },
            cancelReceiptParam: {
                show: false,
                id: '',
                taskKey: '',
                callback: this.cancelReceiptBack
            },
            afterSalesAuditParam: {
                show: false,
                id: '', //退货订单ID
                callback: this.afterSalesAuditBack
            },
            afterSalesReapplyParam: {
                show: false,
                id: '', //退后订单ID
                callback: this.afterSalesReapplyBack
            },
            afterSalesReceiveParam: {
                show: false,
                id: '', //退货订单ID
                link: '/order/flow/afterSales/receipt',
                callback: this.afterSalesReceiveBack
            },
            afterSalesSendParam: {
                show: false,
                id: '', //退货单ID
                images: '',
                logisticsInfo: {

                },
                link: '/order/flow/afterSales/send',
                callback: this.callback
            },


        }
    },
    vuex: {
        actions: {
            finishFlow,
            getBacklogList,
            orderCancleFlow
        },
    },
    methods: {
        refresh() {
            this.$dispatch('refresh', this.loadparam);
        },
        showOrderDetail: function(id) {
            this.orderDetailParam.id = id;
            this.orderDetailParam.show = true;
        },
        compactDetail: function(id) { //合同详情
            this.detailParam.id = id;
            this.detailParam.url = '/order/contract/details/';
            this.detailParam.show = true;
        },
        salesDetail: function(id) { //售后详情
            this.detailParam.id = id;
            this.detailParam.url = '/order/quality/after/sales/details/';
            this.detailParam.show = true;
        },
        showOrderCancelDetail: function(id) {
            this.cancelDetailParam.id = id; //这个ID是取消订单的ID，不是订单ID
            this.cancelDetailParam.show = true;
        },
        orderSend: function(id) {
            this.sendDetailParam.id = id;
            this.sendDetailParam.show = true;
        },
        deliverGoods: function(item) {
            this.deliverParam.id = item.bizId;
            this.deliverParam.show = true;
            this.deliverParam.sendoff = true;
            this.deliverParam.tips = "财务核查通过，请等待卖家发货！";
            this.deliverParam.callback = this.deliverBack;

        },
        showRecord: function(item) {
            this.recordParam.bizType = item.bizType;
            this.recordParam.bizId = item.bizId;
            this.recordParam.show = true;
        },
        receiveAudit: function(item) { //合同补充
            if (item.taskKey == 'supplementary_contract_employee_handle') {
                this.auditParam.audit = false;
                this.auditParam.title = '重新申请审核';
            } else if (item.taskKey == 'supplementary_contract_governor_validate') {
                this.auditParam.audit = true;
                this.auditParam.title = '审核补充合同';
            }
            this.auditParam.taskKey = item.taskKey;
            this.auditParam.taskId = item.taskId;
            this.auditParam.bizId = item.bizId;
            this.auditParam.show = true;
        },
        showAudit: function(item) { //订单
            if (item.taskKey == 'employee_handle' || item.taskKey == 'supplementary_contract_employee_handle') {
                this.auditParam.audit = false;
                this.auditParam.title = '重新申请审核';
                this.auditParam.taskKey = item.taskKey;
                this.auditParam.taskId = item.taskId;
                this.auditParam.show = true;
            } else if (item.taskKey == 'after_sales_resend') {
                this.resendParam.show = true;
                this.resendParam.afterSalesId = item.bizId;
                this.resendParam.orderId = item.orderId;
                this.resendParam.validate = item.validate;
                this.resendParam.callback = this.callback;
            } else {
                this.auditParam.audit = true;
                this.auditParam.title = '审核订单';
                this.auditParam.taskKey = item.taskKey;
                this.auditParam.taskId = item.taskId;
                this.auditParam.show = true;
            }

        },
        sendAudit: function(item) { //发货
            if (item.taskKey == 'order_send_employee_handle') {
                this.auditParam.audit = false;
                this.auditParam.title = '重新申请审核';
            } else if (item.taskKey == 'order_send_governor_validate') {
                this.auditParam.audit = true;
                this.auditParam.title = '审核发货申请';
            } else if (item.taskKey == 'order_send_warehouse_validate') {
                this.auditParam.audit = true;
                this.auditParam.title = '发货';
            }
            this.auditParam.taskKey = item.taskKey;
            this.auditParam.taskId = item.taskId;
            this.auditParam.bizId = item.bizId;
            this.auditParam.show = true;

        },
        pass: function() {
            this.auditParam.result = 1;
            this.finishFlow(this.auditParam);
        },
        reject: function() {
            this.auditParam.result = 0;
            this.finishFlow(this.auditParam);
        },
        sendPass: function() { //发货审核成功
            this.auditParam.result = 1;
            this.finishFlow(this.auditParam);
        },
        sendRefuse: function() { //发货审核不通过
            this.auditParam.result = 0;
            this.finishFlow(this.auditParam);
        },
        callback: function(name) {
            this.tipParam.show = true;
            this.tipParam.name = name;
            this.getBacklogList(this.loadparam);
        },
        //发货后的回调
        deliverBack: function(name) {
            this.deliverParam.show = false;
            this.callback(name);
        },
        //审核取消订单
        cancelOrderAudit: function(item) {
            this.cancelAuditParam.id = item.bizId;
            this.cancelAuditParam.taskKey = item.taskKey;
            this.cancelAuditParam.show = true;
        },
        cancelBack: function(name) {
            this.tipParam.show = true;
            this.tipParam.name = name;
            this.cancelAuditParam.show = false;
            this.getBacklogList(this.loadparam);
        },
        //重新申请取消订单
        cancelOrderReapply: function(item) {
            this.cancelReapplyParam.id = item.bizId;
            this.cancelReapplyParam.taskKey = item.taskKey;
            this.cancelReapplyParam.show = true;
        },
        cancelReapplyBack: function(name) {
            this.tipParam.show = true;
            this.tipParam.name = name;
            this.cancelReapplyParam.show = false;
            this.getBacklogList(this.loadparam);
        },
        //取消订单收货
        cancelOrderReceipt: function(item) {
            this.cancelReceiptParam.id = item.bizId;
            this.cancelReceiptParam.taskKey = item.taskKey;
            this.cancelReceiptParam.show = true;
        },
        cancelReceiptBack: function(name) {
            this.tipParam.show = true;
            this.tipParam.name = name;
            this.cancelReceiptParam.show = false;
            this.getBacklogList(this.loadparam);
        },
        //售后主管审核,代替之前的接口
        afterSalesAudit: function(item) {
            this.afterSalesAuditParam.id = item.bizId;
            this.afterSalesAuditParam.show = true;

        },
        afterSalesAuditBack: function(name) {
            this.tipParam.show = true;
            this.tipParam.name = name;
            this.afterSalesAuditParam.show = false;
            this.getBacklogList(this.loadparam);
        },
        //重新申请售后
        afterSalesReapply: function(item) {
            this.afterSalesReapplyParam.id = item.bizId;
            this.afterSalesReapplyParam.show = true;
        },
        afterSalesReapplyBack: function(name) {
            this.tipParam.show = true;
            this.tipParam.name = name;
            this.afterSalesReapplyParam.show = false;
            this.getBacklogList(this.loadparam);
        },
        //售后（业务员）收货,代替之前的接口
        afterSalesReceive: function(item) {
            this.afterSalesReceiveParam.id = item.bizId;
            this.afterSalesReceiveParam.show = true;
        },
        afterSalesReceiveBack: function(name) {
            this.tipParam.show = true;
            this.tipParam.name = name;
            this.afterSalesReceiveParam.show = false;
            this.getBacklogList(this.loadparam);
        },
        //售后发货（换货）
        afterSalesSend: function(item) {
            this.afterSalesSendParam.id = item.bizId;
            this.afterSalesSendParam.show = true;
        }

    }
}
</script>
<style scoped>
.employee_right {
    float: left;
    overflow-y: auto;
}

.employee_right_title {
    color: #333;
    font-size: 18px;
}

.unread {
    font-size: 12px;
    border-radius: 8px;
    margin-left: 10px;
    padding: 0 5px
}

.employee_right_message {
    clear: both;
    white-space: nowrap;
    border-top: none;
    padding-top: 5px;
    max-height: 647px;
    overflow-y: auto;
}

.actColor {
    background-color: #ccc
}

.employee_message_view {
    position: relative;
    border: 1px solid #ddd;
    padding: 10px 8px;
    border-radius: 8px;
    -webkit-border-radius: 8px;
    margin-bottom: 10px;
    white-space: normal;
}

.message_view_left {
    color: #333;
    font-size: 15px;
}

.message_view_left span {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

.message_view_left time {
    color: #999;
    font-size: 14px;
}

.message_view_right {
    position: absolute;
    right: 14px;
    bottom: 11px;
    vertical-align: middle;
}

.message_view_right a {
    font-size: 13px;
    margin: 0px 5px;
}

.employee_top {
    margin-bottom: 20px;
}

.employee_line {
    height: 420px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.notice_message_view {
    position: relative;
    border: 1px solid #ddd;
    padding: 10px 8px;
    border-radius: 0 8px 8px 0;
    -webkit-border-radius: 0 8px 8px 0;
    margin-bottom: 10px;
}

.level-five {
    border-left: 4px solid #D9534F;
}

.level-four {
    border-left: 4px solid #F0AD4E;
}

.level-three {
    border-left: 4px solid #5BC0DE;
}

.level-two {
    border-left: 4px solid #CCCCCC;
}

.level-one {
    border-left: 4px solid #5CB85C;
}

.level-default {
    border-left: 4px solid #CCCCCC;
}

.linechart {
    width: 100%;
    height: 420px;
}

.select_btn {
    display: inline-block;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.select_btn_person,
.select_btn_date {
    display: inline-block;
    color: #333;
    font-size: 14px;
    float: left;
    padding: 5px 10px 5px 5px;
}

.select_btn_img {
    display: inline-block;
    text-align: center;
    margin-top: 12px;
    padding: 0 8px;
}
</style>
