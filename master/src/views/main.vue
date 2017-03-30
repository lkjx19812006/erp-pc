<template>
    <div>
        <detail-model :param="orderDetailParam" v-if="orderDetailParam.show"></detail-model>
        <receivedetail-model :param="detailParam" v-if="detailParam.show"></receivedetail-model>
        <record-model :param="recordParam" v-if="recordParam.show"></record-model>
        <resend-model :param="resendParam" v-if="resendParam.show"></resend-model>
        <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
        <tip-model :param="tipParam" v-if="tipParam.show"></tip-model>
        <send-detail :param="sendDetailParam" v-if="sendDetailParam.show"></send-detail>
        <deliver-model :param="deliverParam" v-if="deliverParam.show"></deliver-model>
        <div class="employee clear">
            <div class="employee_left col-md-3 col-xs-12">
                <div class="complete_rate">
                    <!--  <span>个人业绩完成率</span>
                   <a class="select_btn" @click="freshPiecharts(getPiechart)">
                       <span class="select_btn_date">2016年7月</span>
                       <span class="select_btn_img"><img src="/static/images/down_arrow.png" height="13" width="24" /></span>
                   </a> -->
                </div>
                <div class="pie_chart">
                    <div class="Piechart" v-echarts="getPiechart.options" :loading="getPiechart.load"></div>
                </div>
            </div>
            <div class="employee_right col-md-4 col-xs-12">
                <p class="employee_right_title clear">
                    <span class="left">消息通知</span>
                    <div class="btn-group">
                        <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': noticeParam.type===0}" @click="selectType(0)">
                            今日通知
                        </button>
                        <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': noticeParam.type===1}" @click="selectType(1)">
                            三日内通知
                        </button>
                        <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': noticeParam.type===2}" @click="selectType(2)">
                            已读通知
                        </button>
                    </div>
                    <button class="btn btn-primary right" @click="refreshNotice()">{{$t('static.refresh')}}</button>
                </p>
                <div class="employee_right_message">
                    <div class="cover_loading">
                        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                    </div>
                    <div class="notice_message_view" v-bind:class="{ 'level-five': item.urgent>80, 'level-four': item.urgent<=80 }" v-for="item in initNoticeList">
                        <div class="message_view_left">
                            <span>标题：{{item.title}}</span>
                            <p>内容：{{item.shortMessage}}</p>
                            <time>{{item.mtime}}</time>
                            <div class="message_view_right">
                                <Poptip placement="left" trigger="hover" width="400">
                                    <a>详情</a>
                                    <div class="api" slot="content" style="font-size:16px;background-color:#FFFF77;overflow-x:hidden;word-wrap:break-word;height:300px">
                                        {{item.message}}
                                    </div>
                                </Poptip>
                                <a>已读</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="employee_right col-md-5 col-xs-12">
                <p class="employee_right_title clear">
                    <span class="left">{{$t('static.order_message')}}</span>
                    <button class="btn btn-primary right" @click="refresh()">{{$t('static.refresh')}}</button>
                </p>
                <div class="employee_right_message">
                    <div class="cover_loading">
                        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                    </div>
                    <div class="employee_message_view" v-for="item in initBacklogList">
                        <div class="message_view_left">
                            <span></span>
                            <p>{{item.taskDesc}}</p>
                            <time>{{item.date}}</time>
                        </div>
                        <div class="message_view_right" v-if="item.bizType=='order_validate'">
                            <!-- <img src="/static/images/default_arrow.png" height="24" width="24"> -->
                            <a @click="showOrderDetail(item.bizId)">{{$t('static.details')}}</a>
                            <a @click="showRecord(item)">{{$t('static.records')}}</a>
                            <a v-if="item.taskKey!='employee_handle'" @click="showAudit(item)">{{$t('static.review')}}</a>
                            <a v-else @click="showAudit(item)">{{$t('static.reapply')}}</a>
                        </div>
                        <div class="message_view_right" v-if="item.bizType=='order_send'">
                            <a @click="orderSend(item.bizId)">{{$t('static.details')}}</a>
                            <a @click="showRecord(item)">{{$t('static.records')}}</a>
                            <a v-if="item.taskKey=='order_send_governor_validate'" @click="sendAudit(item)">{{$t('static.review')}}</a>
                            <a v-if="item.taskKey=='order_send_warehouse_validate'" @click="deliverGoods(item)">{{$t('static.shipped')}}</a>
                            <a v-if="item.taskKey=='order_send_employee_handle'" @click="sendAudit(item)">{{$t('static.reapply')}}</a>
                        </div>
                        <div class="message_view_right" v-if="item.bizType=='order_supplementary_contract'">
                            <!-- <img src="/static/images/default_arrow.png" height="24" width="24"> -->
                            <a @click="compactDetail(item.bizId)">{{$t('static.details')}}</a>
                            <a @click="showRecord(item)">{{$t('static.records')}}</a>
                            <a v-if="item.taskKey=='supplementary_contract_governor_validate'" @click="receiveAudit(item)">{{$t('static.contract_review')}}</a>
                            <a v-if="item.taskKey=='supplementary_contract_employee_handle'" @click="showAudit(item)">{{$t('static.reapply')}}</a>
                        </div>
                        <div class="message_view_right" v-if="item.bizType=='order_after_sales'">
                            <!-- <img src="/static/images/default_arrow.png" height="24" width="24"> -->
                            <a @click="salesDetail(item.bizId)">{{$t('static.details')}}</a>
                            <a @click="showRecord(item)">{{$t('static.records')}}</a>
                            <a v-if="item.taskKey=='after_sales_governor_validate'" @click="showAudit(item)">{{$t('static.aftersales')}}</a>
                            <a v-if="item.taskKey=='after_sales_receipt'" @click="showAudit(item)">{{$t('static.confirm_receipt')}}</a>
                            <a v-if="item.taskKey=='after_sales_resend'" @click="showAudit(item)">{{$t('static.reapply_delivery')}}</a>
                            <a v-if="item.taskKey=='after_sales_employee_handle'" @click="showAudit(item)">{{$t('static.reapply')}}</a>
                            <a v-if="item.taskKey=='after_sales_disputed_handle'" @click="showAudit(item)">{{$t('static.salesman')}}{{$t('static.objection_handl')}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import detailModel from '../components/order/orderDetail'
import recordModel from '../components/record/record'
import auditModel from '../components/tips/auditDialog'
import tipModel from '../components/tips/tipDialog'
import sendDetail from '../components/order/second_order/orderSendDetail'
import deliverModel from '../components/order/orderStatus'
import receivedetailModel from '../components/order/second_order/orderReceiveDetail'
import resendModel from '../components/order/second_order/afterResendPage'
import util from '../components/tools/util.js'
import {
    getList,
    getLinechart,
    getPiechart,
    initBacklogList,
    initNoticeList
} from '../vuex/getters'
import {
    freshLinecharts,
    freshPiecharts,
    getBacklogList,
    finishFlow,
    getNoticeList
} from '../vuex/actions'
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
        util
    },
    data() {
        return {
            loadParam: {
                loading: true,
                show: false,
                link: '/flow/',
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total: 0,
                mTimeStart: "",
                mTimeEnd: "",
                read: "",
            },
            noticeParam: {
                loading: true,
                link: '/notification/queryToday',
                type: 0, //0/1/2,今日/三天/已读通知
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total: 0

            },
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
            receiveDetailParam: { //发货详情
                show: false,
                id: '',
            },
            detailParam: { //收货详情
                id: '',
                show: false,
                url: '',
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

        }
    },
    vuex: {
        getters: {
            getList,
            getLinechart,
            getPiechart,
            initBacklogList,
            initNoticeList
        },
        actions: {
            freshLinecharts,
            freshPiecharts,
            getBacklogList,
            finishFlow,
            getNoticeList
        },
    },
    methods: {
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
        orderSend: function(id) {
            this.sendDetailParam.id = id;
            this.sendDetailParam.show = true;
        },
        orderReceive: function(item) {
            this.receiveDetailParam.id = item.id;
            this.receiveDetailParam = item;
            this.receiveDetailParam.show = true;
        },
        deliverGoods: function(item) {
            this.deliverParam.id = item.bizId;
            this.deliverParam.show = true;
            this.deliverParam.sendoff = true;
            this.deliverParam.tips = "财务核查通过，请等待卖家发货！";
            this.deliverParam.callback = this.callback;
            console.log(this.deliverParam)
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
            console.log(item)
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
            console.log(this.auditParam)
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
            //审核完成后刷新页面
            this.getBacklogList(this.loadParam);
        },
        refresh: function() {
            this.getBacklogList(this.loadParam);
        },
        selectType: function(type) {
            this.noticeParam.type = type;
            if (type == 0) { //当天
                this.noticeParam.mTimeStart = "";
                this.noticeParam.mTimeEnd = "";
                this.noticeParam.read = "";
                this.noticeParam.link = "/notification/queryToday";
            }
            if (type == 1) { //三日内
                this.noticeParam.mTimeStart = util.getDate(-2);
                this.noticeParam.mTimeEnd = util.getDate(1);
                this.noticeParam.read = "";
                this.noticeParam.link = "/notification/query";
            }
            if (type == 2) { //已读
                this.noticeParam.mTimeStart = "";
                this.noticeParam.mTimeEnd = "";
                this.noticeParam.read = "1";
                this.noticeParam.link = "/notification/query";
            }
            this.getNoticeList(this.noticeParam);

        },
        refreshNotice: function() {
            this.getNoticeList(this.noticeParam);
        }

    },
    created() {
        this.freshLinecharts();
        this.freshPiecharts();
        if (this.$route.query.id > this.getList[0].subcategory.length || isNaN(this.$route.query.id) || !this.$route.query.id) {
            this.$route.query.id = 0;
        }
        //获取待办事项
        this.getBacklogList(this.loadParam);
        //获取消息通知
        this.getNoticeList(this.noticeParam);
    },
    route: {
        activate: function(transition) {
            console.log('hook-example activated!')
            transition.next()
        },
        deactivate: function(transition) {
            console.log('hook-example deactivated!')
            transition.next()
        }
    }
}
</script>
<style scoped>
.employee {
    position: relative;
    padding: 25px 30px 0 40px;
    background: #fff;
}

.employee_left {
    position: relative;
    padding-right: 30px;
}

.employee_right {
    float: left;
    overflow-y: auto;
}

.employee_right_title {
    color: #333;
    font-size: 18px;
}

.employee_right_message {
    padding-top: 20px;
    border-top: 1px solid #ddd;
    white-space: nowrap;
    max-height: 600px;
}

.employee_message_view {
    position: relative;
    border: 1px solid #ddd;
    padding: 10px 8px;
    border-radius: 8px;
    -webkit-border-radius: 8px;
    margin-bottom: 10px;
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
    border-left: 8px solid red;
}

.level-four {
    border-left: 8px solid green;
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

.pie_chart {
    width: 370px;
    height: 370px;
    text-align: center;
    margin: auto;
}

.Piechart {
    width: 100%;
    height: 100%;
}
</style>
