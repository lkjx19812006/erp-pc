<template>
    <div>
        <editorder-model :param="dialogParam" v-if="dialogParam.show"></editorder-model>
        <detail-model :param.sync="detailParam" v-if="detailParam.show"></detail-model>
        <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
        <dispose-model :param.sync="disposeParam" v-if="disposeParam.show"></dispose-model>
        <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
        <cancel-model :param="cancelParam" v-if="cancelParam.show"></cancel-model>
        <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
        <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
        <employee-model :param="transferParam" v-if="transferParam.show"></employee-model>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <language-model v-show="false"></language-model>
        <mglist-model :param="mgListParam">
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clear">
                    <div class="clear left">
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.order_no')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.no" @keyup.enter="selectSearch()" />
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.order')}}ID：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.id" @keyup.enter="selectSearch()" />
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.consignee_name')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.consignee" @keyup.enter="selectSearch()" />
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.consignee_phone')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.consigneePhone" @keyup.enter="selectSearch()" />
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="clear">
                    <div class="clear left">
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.order_type')}}：</dt>
                            <dd class="left">
                                <select class="form-control" v-model="loadParam.type" @change="selectSearch()">
                                    <option value="">{{$t('static.please_select')}}</option>
                                    <option value="0">{{$t('static.purchase')}}</option>
                                    <option value="1">{{$t('static.sell')}}</option>
                                    <option value="2">预售</option>
                                </select>
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.order_status')}}：</dt>
                            <dd class="left">
                                <select v-model="loadParam.orderStatus" class="form-control" @change="selectSearch()">
                                    <option value="">{{$t('static.please_select')}}</option>
                                    <option value="0">{{$t('static.create_order')}}</option>
                                    <option value="10">{{$t('static.order_procing')}}</option>
                                    <option value="20">{{$t('static.waiting_order')}}</option>
                                    <option value="30">{{$t('static.awaiting_review')}}</option>
                                    <option value="40">{{$t('static.wait_ship')}}</option>
                                    <option value="50">{{$t('static.wait_receipt')}}</option>
                                    <option value="60">{{$t('static.awaiting_comment')}}</option>
                                    <option value="70">{{$t('static.order_over')}}</option>
                                </select>
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">是否样品：</dt>
                            <dd class="left">
                                <select class="form-control" v-model="loadParam.sample" @change="selectSearch()">
                                    <option value="">{{$t('static.please_select')}}</option>
                                    <option value="0">{{$t('static.no')}}</option>
                                    <option value="1">{{$t('static.yes')}}</option>
                                </select>
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <div class="left">
                                <dt class="left transfer marg_top">{{$t('static.start_end')}}：</dt>
                                <mz-datepicker :time.sync="loadParam.startTime" format="yyyy/MM/dd HH:mm:ss">
                                </mz-datepicker>
                            </div>
                            <div class="left">
                                <dt class="left marg_top">~~</dt>
                                <mz-datepicker :time.sync="loadParam.endTime" format="yyyy/MM/dd HH:mm:ss">
                                </mz-datepicker>
                            </div>
                        </dl>
                    </div>
                </div>
                <div class="clear">
                    <div class="right">
                        <!-- <button class="new_btn transfer" @click="createSearch()">{{$t('static.search')}}</button> -->
                        <!-- <button class="btn btn-default transfer" @click="orgCheck()">{{$t('static.review')}}</button>
                 -->
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
                            <dt class="left transfer marg_top">{{$t('static.review_status')}}：</dt>
                            <dd class="left">
                                <select class="form-control" v-model="loadParam.validate" @change="selectSearch()">
                                    <option value="">{{$t('static.please_select')}}</option>
                                    <option value="0">{{$t('static.wait_approval')}}</option>
                                    <option value="1">{{$t('static.approving')}}</option>
                                    <option value="2">{{$t('static.approved')}}</option>
                                    <option value="-2">{{$t('static.unapproved')}}</option>
                                </select>
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.order_source')}}：</dt>
                            <dd class="left">
                                <select class="form-control" v-model="loadParam.sourceType" @change="selectSearch()">
                                    <!-- 0/1/2/3/4/5 新建/意向/报价/样品申请/库存/待采购 -->
                                    <option value="">{{$t('static.please_select')}}</option>
                                    <option value="0">{{$t('static.new')}}</option>
                                    <option value="1">{{$t('static.intention')}}</option>
                                    <option value="2">{{$t('static.quoted_price')}}</option>
                                    <option value="3">样品申请</option>
                                    <option value="4">库存</option>
                                    <option value="5">待采购</option>
                                </select>
                            </dd>
                        </dl>
                        <!-- 单个业务员搜索 -->
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.salesman')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.employeeName" placeholder="{{$t('static.select_salesman')}}" @click="selectEmployee()">
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.breed')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.breedName" readonly="true" @click="breedSearch()" />
                            </dd>
                        </dl>
                        <button class="new_btn transfer"><a href="/crm/api/v1/order/exportExcel?{{exportUrl}}">{{$t('static.export_order')}}</a></button>
                        <button type="button" class="new_btn transfer" @click="resetTime()">{{$t('static.clear_all')}}</button>
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
                            <!-- <th><label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}"  @click="select()"></label></th> -->
                            <th>{{$t('static.order')}}ID</th>
                            <th>{{$t('static.transcation')}}</th>
                            <th>{{$t('static.order_type')}}</th>
                            <th>{{$t('static.trading_patterns')}}</th>
                            <th>{{$t('static.sample_order')}}</th>
                            <th>{{$t('static.client_name')}}</th>
                            <th>{{$t('static.breed')}}</th>
                            <th>商品图片</th>
                            <th>{{$t('static.transcation_amount')}}</th>
                            <th>{{$t('static.wait_payment')}}</th>
                            <th>{{$t('static.paid')}}</th>
                            <th>{{$t('static.currency')}}</th>
                            <th>{{$t('static.salesman')}}</th>
                            <th>{{$t('static.consignee_consigner_name')}}</th>
                            <th>{{$t('static.consignee_phone')}}</th>
                            <th style="width:300px">{{$t('static.consignee_address')}}</th>
                            <th>{{$t('static.order_status')}}</th>
                            <th>{{$t('static.order_source')}}</th>
                            <th>{{$t('static.review_status')}}</th>
                            <th>{{$t('static.comment')}}</th>
                            <th>{{$t('static.handle')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initOrgOrderlist" v-cloak>
                            <!-- <td  @click.stop="">
                      <label v-if="item.validate==1" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="onlyselected($index)"></label>
                    </td> -->
                            <td>{{item.id}}</td>
                            <td>{{item.tradeTime | subtime}}</td>
                            <td>
                                <div v-if="item.type==1&&item.pre==0">{{$t('static.sell')}}</div>
                                <div v-if="item.type==0&&item.pre==0">{{$t('static.purchase')}}</div>
                                <div v-if="item.type==1&&item.pre==1">预售</div>
                            </td>
                            <td>
                                <div v-if="item.mode==1">{{$t('static.together')}}</div>
                                <div v-if="item.mode==2">{{$t('static.three_side')}}</div>
                                <div v-if="item.mode==3">{{$t('static.self_support')}}</div>
                            </td>
                            <td>
                                <div v-if="item.sample==0">{{$t('static.no')}}</div>
                                <div v-if="item.sample==1">{{$t('static.yes')}}</div>
                            </td>
                            <td><a @click="clickOn({
                                  show:true,
                                  id:item.id,
                                  loading:false,
                                   key:'orderDetail',
                                  orderStatus:item.orderStatus,
                                  contact:''
                          })">{{item.customerName}}</a></td>
                            <td>{{item.goodsDesc}}</td>
                            <td>
                                <div v-if="item.sourceType==1&&item.goods[0].image!=''">
                                    <img src="{{item.goods[0].image}}" style="width:40px" @click="clickBig(item.goods[0].image)">
                                </div>
                            </td>
                            <td>{{item.total}}</td>
                            <td>{{item.unpaid}}</td>
                            <td>{{item.prepaid}}</td>
                            <td>{{item.currency | Currency}}</td>
                            <td>{{item.employeeName}}</td>
                            <td>{{item.consignee}}</td>
                            <td>{{item.consigneePhone}}</td>
                            <td>
                                <Poptip placement="top" trigger="hover">
                                    <span v-if="item.consigneeAddr">{{item.consigneeAddr | textDisplay '5'}}</span>
                                    <span v-else>未填写详细地址</span>
                                    <div class="api" slot="content">
                                        {{item.countryName}} {{item.provinceName}} {{item.cityName}} {{item.districtName}} {{item.consigneeAddr}}
                                    </div>
                                </Poptip>
                            </td>
                            <td v-if="this.language=='zh_CN'">
                                <div>{{item.orderStatus | assess item.type item.logistics item.verifierName item.taskKey}}</div>
                                <div v-if="item.orderStatus==70" style="background:green;color:#fff">{{$t('static.order_over')}}</div>
                                <div v-if="item.orderStatus==0" style="background:#fa6705;color:#fff">{{$t('static.create_order')}}</div>
                            </td>
                            <td v-if="this.language=='en'">
                                <div>{{item.orderStatus | assess item.type item.logistics item.verifierName item.taskKey}}</div>
                                <div v-if="item.orderStatus==70" style="background:green;color:#fff">{{$t('static.order_over')}}</div>
                                <div v-if="item.orderStatus==0" style="background:#fa6705;color:#fff">{{$t('static.create_order')}}</div>
                            </td>
                            <td>
                                <span v-if="item.sourceType==0">{{$t('static.new')}}</span>
                                <span v-if="item.sourceType==1">{{$t('static.intention')}}</span>
                                <span v-if="item.sourceType==2">{{$t('static.quote')}}</span>
                                <span v-if="item.sourceType==3">{{$t('static.sample_order')}}</span>
                                <span v-if="item.sourceType==4">库存</span>
                                <span v-if="item.sourceType==5">待采购</span>
                            </td>
                            <td>
                                <div v-if="item.validate==0">{{$t('static.wait_approval')}}</div>
                                <div v-if="item.validate==1">{{$t('static.approving')}}(待{{item.verifierName}}审核)</div>
                                <div v-if="item.validate==2" style="background:green;color:#fff">{{$t('static.approved')}}</div>
                                <div v-if="item.validate==-2" style="background:red;color:#fff">{{$t('static.unapproved')}}</div>
                            </td>
                            <td>
                                <Poptip placement="left" trigger="hover">
                                    <span>{{item.comments | textDisplay '5'}}</span>
                                    <div class="api" slot="content">
                                        {{item.comments}}
                                    </div>
                                </Poptip>
                            </td>
                            <td>
                                <!-- 取消订单,在订单状态为20和70或者新建的订单还未申请审核可以取消，并说明原因 -->
                                <!-- <button class="btn btn-warning btn-apply" v-if="item.orderStatus==20||item.orderStatus==70||(item.orderStatus==0&&item.validate==0)" @click="cancelOrder(item.id,$index)">
                                    取消订单
                                </button> -->
                                <!-- 审核取消订单,当取消状态是1时，需要部门主管审核 -->
                                <!-- <button class="btn btn-warning btn-apply" v-if="item.cancel==1" @click="">
                                    审核取消订单
                                </button> -->
                                <!-- 订单划转到任意一个业务员 -->
                                <button class="btn btn-warning btn-apply" v-if="(item.orderStatus==0||item.orderStatus==10)&&item.validate==0" @click="transferToEmployee(item,$index)">
                                    划转
                                </button>
                                <!-- 审核 -->
                                <button class="btn btn-warning btn-apply" v-if="item.validate==1&&(item.verifier == $store.state.table.login.id)" @click="orderCheck(item.id,$index)">
                                    {{$t('static.verified')}}
                                </button>
                                <!-- 审核发货 -->
                                <button class="btn btn-warning" v-if="item.validate==2&&(item.verifier == $store.state.table.login.id)&&item.logistics==1&&(item.taskKey=='order_send_governor_validate'||item.taskKey=='financial_validate')" @click="orderSend(item.id,$index)" style="background:#fff;color:#eea236;padding:1px 3px;">{{$t('static.verified')}}{{$t('static.shipped')}}</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 底部分页 -->
            <pagination :combination="loadParam" slot="page"></pagination>
        </mglist-model>
        <div class="total_msg">
                <span style="margin-left:1%;color:red">{{$t('static.total_money')}}：{{initOrgOrderStatis.totalSum | money}} {{initOrgOrderStatis.currency | Currency}}</span>
                <span style="margin-left:1%;color:red">{{$t('static.paid_amount')}}：{{initOrgOrderStatis.prepaidSum | money}} {{initOrgOrderStatis.currency | Currency}}</span>
                <span style="margin-left:1%;color:red">{{$t('static.unpaid_amount')}}：{{initOrgOrderStatis.unpaidSum | money}} {{initOrgOrderStatis.currency | Currency}}</span>
                <span style="margin-left:1%;">{{$t('static.costprice')}}：{{initOrgOrderStatis.costSum | money}} {{initOrgOrderStatis.currency | Currency}}</span>
                <span style="margin-left:1%;">{{$t('static.order_total')}}：{{initOrgOrderStatis.amountSum  | money}} {{initOrgOrderStatis.currency | Currency}}</span>
                <span style="margin-left:1%;">{{$t('static.order_num')}}：{{initOrgOrderStatis.orderCount | money}}笔</span>
                <span style="margin-left:1%;">{{$t('static.discount')}}：{{initOrgOrderStatis.preferentialSum  | money}} {{initOrgOrderStatis.currency | Currency}}</span>
                <span style="margin-left:1%;">{{$t('static.extra_total')}}：{{initOrgOrderStatis.incidentalsSum | money}} {{initOrgOrderStatis.currency | Currency}}</span>           
        </div>
    </div>
</template>
<script>
import pagination from '../pagination'
import editorderModel from '../order/orderInformationDialog'
import detailModel from '../order/orderDetail'
import pictureModel from '../tips/pictureDialog'
import deletebreedModel from '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import disposeModel from '../order/orderStatus'
import tipsdialogModel from '../tips/tipDialog'
import auditModel from '../../components/tips/auditDialog'
import cancelModel from './cancleMsg'
//单个业务员搜索，有两个地方引用到这个模块
import employeeModel from '../clientRelate/searchEmpInfo'
import breedsearchModel from '../intention/breedsearch'
import filter from '../../filters/filters'
import common from '../../common/common'
import changeMenu from '../../components/tools/tabs/tabs.js'
import mglistModel from '../mguan/mgListComponent.vue'
import languageModel from '../tools/language.vue'
import {
    getList,
    initOrgOrderlist,
    initOrgOrderStatis,
    initLogin
} from '../../vuex/getters'
import {
    getOrgOrder,
    getOrderStatistical,
    alterOrder,
    createOrder,
    orderStatu,
    getOrderDetail,
    orderOrgAudit,
    orderCancle,
    transferOrder
} from '../../vuex/actions'

export default {
    components: {
        editorderModel,
        languageModel,
        pagination,
        mglistModel,
        filter,
        detailModel,
        pictureModel,
        breedsearchModel,
        employeeModel,
        deletebreedModel,
        disposeModel,
        tipsdialogModel,
        auditModel,
        cancelModel
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
                org: this.initLogin.orgId,
                link: '/order/sectionList',
                key: 'orgOrderList',
                breedId: '',
                breedName: '',
                employeeId: '',
                employeeName: '',
                consignee: '',
                consigneePhone: '',
                type: '',
                orderStatus: '',
                startTime: '',
                endTime: '',
                payWay: '',
                clients: '',
                dataStatus: '',
                id: '',
                no: '',
                ctime: '',
                ftime: '',
                mode: '',
                validate: '',
                sample: '',
                sourceType: ''

            },
            language: '',
            mgListParam: {
                pagestyle: 'padding-top:100px'
            },
            breedSearchParam: {
                show: false
            },
            employeeParam: {
                show: false,
                org: true,
                orgId: this.initLogin.orgId,
                //单个业务员搜索
                employeeId: '',
                employeeName: '',

            },
            transferParam: { //划转订单
                show: false,
                link: '/order/transferToEmployee',
                callback: '',
                employee: '',
                id: '',
                user: '' //在这里无效，主要是为了配合注册客户订单的划转
            },
            employeeStatus: 0, //表示是哪个地方用到了选择业务员的模块,初始为0,1表示搜索，2表示划转订单
            dialogParam: {
                show: false
            },
            updateParam: {
                show: false,
            },
            detailParam: {
                show: false
            },
            pictureParam: {
                show: false,
                img: ''
            },
            updateorderParam: {
                show: false
            },
            disposeParam: { //订单处理各个状态
                show: false,
                sales: false,
                handle: false,
                payment: false,
                Auditing: false,
                sendoff: false,
                express: false,
                delivery: false
            },
            term: 2,
            show: true,
            checked: false,
            auditParam: {
                show: false,
                audit: true,
                indexs: [], //批量审核使用,暂停用
                ids: [], //批量审核使用,暂停用
                id: '',
                index: '',
                auditComment: '',
                validate: '',
                title: "部门订单审核",
                key: "orgOrderList",
                pass: this.auditPass,
                reject: this.auditReject,
            },

            tipsParam: {
                show: false,
                alert: true,
                name: "请选择要审核的订单"
            },
            cancelParam: {
                show: false,
                index: '',
                id: '',
                cancleCauses: '',
                link: '/order/cancle',
                key: 'orgOrderList',
                callback: this.orderCancle, //cancelMsg.vue中会执行此方法
                cancelBack: this.cancelBack //取消成功后会调用此方法(action中执行)
            }
        }
    },
    computed: {
        exportUrl: function() {
            let url = "org=" + this.loadParam.org;
            if (this.loadParam.orderStatus) {
                url += "&orderStatus=" + this.loadParam.orderStatus;
            }
            if (this.loadParam.type) {
                url += "&type=" + this.loadParam.type;
            }
            if (this.loadParam.consignee) {
                url += "&consignee=" + this.loadParam.consignee;
            }
            if (this.loadParam.consigneePhone) {
                url += "&consigneePhone=" + this.loadParam.consigneePhone;
            }
            if (this.loadParam.mode) {
                url += "&mode=" + this.loadParam.mode;
            }
            if (this.loadParam.breedId) {
                url += "&breedId=" + this.loadParam.breedId;
            }
            if (this.loadParam.employeeId) {
                url += "&employee=" + this.loadParam.employeeId;
            }
            if (this.loadParam.startTime) {
                url += "&startTime=" + this.loadParam.startTime;
            }
            if (this.loadParam.endTime) {
                url += "&endTime=" + this.loadParam.endTime;
            }
            if (this.loadParam.validate) {
                url += "&validate=" + this.loadParam.validate;
            }
            if (this.loadParam.id) {
                url += "&id=" + this.loadParam.id;
            }
            if (this.loadParam.no) {
                url += "&no=" + this.loadParam.no;
            }
            if (this.loadParam.sourceType) {
                url += "&sourceType=" + this.loadParam.sourceType;
            }
            return url;
        }
    },
    vuex: {
        getters: {
            getList,
            initOrgOrderlist,
            initOrgOrderStatis,
            initLogin
        },
        actions: {
            getOrgOrder,
            getOrderStatistical,
            alterOrder,
            createOrder,
            orderStatu,
            getOrderDetail,
            orderOrgAudit,
            orderCancle,
            transferOrder
        }
    },
    methods: {
        selectSearch: function() {
            this.getOrgOrder(this.loadParam);
            this.getOrderStatistical(this.loadParam);
        },
        editClick: function(sub) {
            if (this.$store.state.table.basicBaseList.orgOrderList[sub].show) {
                this.$store.state.table.basicBaseList.orgOrderList[sub].show = !this.$store.state.table.basicBaseList.orgOrderList[sub].show;
            } else {
                this.$store.state.table.basicBaseList.orgOrderList[sub].show = true;
            }
        },
        clickBig: function(img) {
            this.pictureParam.show = true;
            this.pictureParam.img = img;
        },
        breedSearch: function() {
            this.breedSearchParam.show = true;
        },
        selectEmployee: function() {
            this.employeeStatus = 1;
            this.employeeParam.show = true;
        },
        resetTime: function() {
            this.loadParam.ctime = "";
            this.loadParam.ftime = "";
            this.loadParam.consigneePhone = "";
            this.loadParam.consignee = "";
            this.loadParam.orderStatus = "";
            this.loadParam.dataStatus = "";
            this.loadParam.no = "";
            this.loadParam.id = "";
            this.loadParam.mode = "";
            this.loadParam.validate = "";
            this.loadParam.type = "";
            this.loadParam.clients = "";
            this.loadParam.payWay = "";
            this.loadParam.breedId = "";
            this.loadParam.breedName = "";
            this.loadParam.employeeId = "";
            this.loadParam.employeeName = "";
            this.loadParam.startTime = "";
            this.loadParam.endTime = "";
            this.loadParam.sample = "";
            this.selectSearch();
        },

        applyBack: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            //0.1s后重新请求列表数据
            setTimeout(this.selectSearch, 100);
        },
        orderCheck: function(id, index) {
            this.auditParam.id = id;
            this.auditParam.index = index;
            this.auditParam.show = true;
            this.auditParam.title = this.$t('static.order_review');
            this.auditParam.callback = this.applyBack;
        },
        orderSend: function(id, index) {
            this.auditParam.id = id;
            this.auditParam.index = index;
            this.auditParam.show = true;
            this.auditParam.title = '审核发货订单';
            this.auditParam.callback = this.applyBack;
        },
        auditPass: function() { //通过
            this.auditParam.validate = 1;
            this.orderOrgAudit(this.auditParam);
        },
        auditReject: function() { //拒绝
            this.auditParam.validate = 0;
            this.orderOrgAudit(this.auditParam);
        },
        onlyselected: function(index) {
            const _self = this;
            this.$store.state.table.basicBaseList.orgOrderList[index].checked = !this.$store.state.table.basicBaseList.orgOrderList[index].checked;
            if (_self.checked) {
                _self.checked = false;
            } else {
                _self.checked = true;
                this.$store.state.table.basicBaseList.orgOrderList.forEach(function(item) {
                    if (!item.checked) {
                        if (item.validate == 1) {
                            _self.checked = item.checked;
                            _self.validate = item.validate;
                        }
                    }
                })
            }
        },
        select: function() {
            this.checked = !this.checked;
            const checked = this.checked;
            this.$store.state.table.basicBaseList.orgOrderList.forEach(function(item) {
                if (item.validate == 1) item.checked = checked;
            })
        },
        newOrder: function(param) {
            this.dialogParam = param;
        },
        clickOn: function(param) {
            this.detailParam = param;
        },
        updateOrder: function(param) {
            this.dialogParam = param;
        },
        cancelOrder: function(id, index) {
            this.cancelParam.id = id;
            this.cancelParam.index = index;
            this.cancelParam.show = true;
        },
        cancelBack: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.selectSearch();
        },
        //订单划转到业务员
        transferToEmployee: function(item, itemSub) {
            //将employeeStatus置为2,表示是划转业务员
            this.employeeStatus = 2;
            this.transferParam.id = item.id;
            this.transferParam.employee = "";
            this.transferParam.callback = this.transferCallback;
            this.transferParam.show = true;
            this.transferParam.itemSub = itemSub;
        },
        transferCallback: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.name = name;
            this.tipsParam.alert = true;
            //由于划转订单，在后台是异步操作，会有些许延迟，所以这里设置在0.1s后重新请求列表数据
            setTimeout(this.selectSearch, 100);
        }
    },
    filter: (filter, {}),
    ready() {
        common('tab', 'table_box', 1);
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.selectSearch();
        },
        breed: function(breed) {
            this.loadParam.breedId = breed.breedId;
            this.loadParam.breedName = breed.breedName;
            this.selectSearch();
        },
        a: function(employee) {
            if (this.employeeStatus == 1) {
                this.loadParam.employeeId = employee.employeeId;
                this.loadParam.employeeName = employee.employeeName;
                this.selectSearch();
            }
            if (this.employeeStatus == 2) {
                this.transferParam.employee = employee.employeeId;
                this.transferOrder(this.transferParam);
            }

        },
    },
    created() {
        changeMenu(this.$store.state.table.isTop, this.getOrgOrder, this.loadParam, localStorage.orgOrderParam);
        changeMenu(this.$store.state.table.isTop, this.getOrderStatistical, this.loadParam, localStorage.orgOrderParam);
        this.language = localStorage.lang;
    },
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
    margin-top: 0px;
    position: relative;
}

.order_table .table > ul {
    position: relative;
    width: 100%;
    display: table;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0;
}

.order_table .table > ul >li {
    float: left;
    padding: 7.5px 0;
    text-align: center;
    width: 11.1%;
    display: table-cell;
}

.order_table .table > ul >li a {
    color: #003077;
}

.order_table .table_hover > ul:hover {
    background: #f5f5f5;
}

.order_table .table > ul >li img {
    margin: auto;
}

#table_box table th,
#table_box table td {
    width: 80px;
    min-width: 50px;
}

.base_pagination {
    position: fixed;
    bottom: 0px!important;
}

.api {
    color: #3399ff;
}
.total_msg{
    font-size: 14px;
    white-space: normal;
}
</style>
