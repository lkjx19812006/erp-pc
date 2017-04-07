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
            <div class="col-md-4 col-xs-12 employee_right_wrap">
                <p class="employee_right_title clear">
                    <span class="left">{{$t('static.Notifications')}}</span>
                    <div class="btn-group">
                        <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': noticeParam.type===0}" @click="selectType(0)">
                            {{$t('static.Notifications_today')}}
                        </button>
                        <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': noticeParam.type===1}" @click="selectType(1)">
                            {{$t('static.Notifications_three')}}
                        </button>
                        <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': noticeParam.type===2}" @click="selectType(2)">
                            {{$t('static.Read_notifications')}}
                        </button>
                    </div>
                    <button class="btn btn-primary right" @click="refreshNotice()">{{$t('static.refresh')}}</button>
                </p>
                <!-- 全选 -->
                <div class="checkall" v-if="noticeParam.type==0&&this.initNoticeList.length!==0">
                    <span>{{$t('static.Select_all')}} : </span>
                    <label class="selectAll" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids" @click="checkedAll()" style="position:relative; bottom:-1px; float:right">
                    </label>
                </div>
                <!-- 标记为已读 -->
                <div class="btn btn-info btn-xs" style="float:right; margin-left:30px; margin-top:11px" @click="signRead" v-if="noticeParam.type==0&&this.initNoticeList.length!==0">{{$t('static.Mark_read')}}</div>
                <div class="employee_right_message">
                    <div class="cover_loading">
                        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                    </div>
                    <div class="notice_message_view" v-for="item in initNoticeList" v-bind:class="{'level-five':item.urgent>80&&noticeParam.type !== 2,'level-four':item.urgent<=80&&item.urgent>60&&noticeParam.type !== 2,'level-three':item.urgent<=60&&item.urgent>40&&noticeParam.type !== 2,'level-two':item.urgent<=40&&item.urgent>20&&noticeParam.type !== 2,'level-one':item.urgent<=20&&noticeParam.type !== 2,'level-default': noticeParam.type===2}">
                        <div class="message_view_left">
                            <span>标题：{{item.title}}
                                <label v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index)" style="position:relative; bottom:-3px; float:right" v-if="noticeParam.type==0">
                                </label>
                            </span>
                            <p>内容：{{item.shortMessage}}</p>
                            <time>{{item.mtime}}</time>
                            <div class="message_view_right">
                                <Poptip placement="left" trigger="hover">
                                    <a>{{$t('static.details')}}</a>
                                    <div class="api order-detail" slot="content">
                                        {{item.message}}
                                    </div>
                                </Poptip>
                                <a @click="read(item.id)" v-if="noticeParam.type==0">{{$t('static.Read')}}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 底部分页 -->
                <div class="page" v-if="this.initNoticeList.length!==0">
                    <pagination :combination="noticeParam" slot="page"></pagination>
                </div>
            </div>
            <div class="employee_right col-md-5 col-xs-12">
                <p class="employee_right_title clear">
                    <span class="left">{{$t('static.order_message')}}</span>
                </p>
                <div class="refreshBtn">
                    <button class="btn btn-primary right" @click="refresh()">{{$t('static.refresh')}}</button>
                </div>
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
import pagination from '../components/pagination'
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
    getNoticeList,
    readNotice
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
        util,
        pagination
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

            },
            noticeParam: {
                loading: true,
                link: '/notification/queryToday',
                type: 0, //0/1/2,今日/三天/已读通知
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total: 0,
                id: null,
                read: "0"

            },
            notificationParam: {
                link: '',
                ids: [],
                callback: ''
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
            checked: false
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
            getNoticeList,
            readNotice
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
                this.noticeParam.read = "0";
                this.noticeParam.link = "/notification/queryToday";
            }
            if (type == 1) { //三日内
                this.noticeParam.read = "";
                this.noticeParam.link = "/notification/queryRdDay";
            }
            if (type == 2) { //已读
                this.noticeParam.read = "1";
                this.noticeParam.link = "/notification/query";
            }
            this.getNoticeList(this.noticeParam);


        },
        checkedAll: function() {
            this.checked = !this.checked;
            if (this.checked) {
                this.$store.state.table.basicBaseList.noticeList.forEach(function(item) {
                    item.checked = true;
                })
            } else {
                this.$store.state.table.basicBaseList.noticeList.forEach(function(item) {
                    item.checked = false;
                })
            }
        },
        onlyselected: function(sub) {
            const _this = this;
            this.$store.state.table.basicBaseList.noticeList[sub].checked = !this.$store.state.table.basicBaseList.noticeList[sub].checked;
            if (!this.$store.state.table.basicBaseList.noticeList[sub].checked) {
                _this.checked = false;
            } else {
                _this.checked = true;
                this.$store.state.table.basicBaseList.noticeList.forEach(function(item) {
                    if (!item.checked) {
                        _this.checked = false;
                    }
                })
            }
        },
        refreshNotice: function() {
            this.getNoticeList(this.noticeParam);
        },
        read: function(param) {
            this.notificationParam.ids = [];
            this.notificationParam.ids.push(param);
            this.notificationParam.link = '/notification/read';
            this.notificationParam.callback = this.notificationCallback;
            this.readNotice(this.notificationParam);

        },
        signRead: function() {
            this.notificationParam.ids = [];
            for (var i = 0; i < this.initNoticeList.length; i++) {
                if (this.initNoticeList[i].checked == true) {
                    this.notificationParam.ids.push(this.initNoticeList[i].id)
                }
            }
            this.notificationParam.link = '/notification/read';
            this.notificationParam.callback = this.notificationCallback;
            this.readNotice(this.notificationParam);
        },
        notificationCallback: function(title) {
            this.tipParam.show = true;
            this.tipParam.name = title;
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
    events: {
        fresh: function(input) {
            this.noticeParam.cur = input;
            this.getNoticeList(this.noticeParam);
        }
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
.left {
    margin-bottom: 10px;
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

.checkall {
    float: right;
    margin: 10px 11px 0 15px;
}

.checkall span {
    font-size: 14px;
    vertical-align: middle;
}

.checkall input {
    margin-top: 0;
    width: 17px;
    height: 17px;
    vertical-align: middle;
    cursor: pointer;
}

.page {
    position: fixed;
}

.order-detail {
    font-size: 15px;
    color: #D9534F;
    overflow-x: hidden;
    word-wrap: break-word;
    width: 350px;
    min-height: 50px;
    white-space: normal;
    padding: 10px 5px;
}

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
    clear: both;
    white-space: nowrap;
    border-top: none;
    padding-top: 5px;
    max-height: 600px;
    overflow-y: auto;
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
