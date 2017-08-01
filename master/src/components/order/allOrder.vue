<template>
    <div>
        <editorder-model :param="dialogParam" v-if="dialogParam.show"></editorder-model>
        <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
        <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
        <dispose-model :param="disposeParam" v-if="disposeParam.show"></dispose-model>
        <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <selectorg-model :param="selectOrgParam" v-if="selectOrgParam.show"></selectorg-model>
        <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
        <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
        <language-model v-show="false"></language-model>
        <mglist-model>
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
                            <dt class="left transfer marg_top">{{$t('static.client_id')}}</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.customerId"  placeholder="按回车键搜索" @keyup.enter="selectSearch()" />
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
                                <!-- <option value="10">{{$t('static.pending')}}</option> -->
                                <option value="20">{{$t('static.wait_for_payment')}}</option>
                                <option value="30">{{$t('static.wait_for_audit')}}</option>
                                <option value="40">{{$t('static.wait_for_delivery')}}</option>
                                <option value="50">{{$t('static.wait_for_receiving')}}</option>
                                <option value="60">{{$t('static.awaiting_comment')}}</option>
                                <option value="70">{{$t('static.order_over')}}</option>
                                <option value ="-1">{{$t('static.canceled')}}</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.sample_order')}}：</dt>
                        <dd class="left">
                            <select class="form-control" v-model="loadParam.sample" @change="selectSearch()">
                                <option value="">{{$t('static.please_select')}}</option>
                                <option value="0">{{$t('static.no')}}</option>
                                <option value="1">{{$t('static.yes')}}</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.breed')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.breedName" readonly="true" @click="breedSearch()" />
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <div class="left">
                            <dt class="left transfer marg_top">{{$t('static.start_end')}}：</dt>
                            <mz-datepicker :time.sync="loadParam.startTime" format="yyyy/MM/dd HH:mm:ss" width="115">
                            </mz-datepicker>
                        </div>
                        <div class="left">
                            <dt class="left marg_top">~~</dt>
                            <mz-datepicker :time.sync="loadParam.endTime" format="yyyy/MM/dd HH:mm:ss" width="115">
                            </mz-datepicker>
                        </div>
                    </dl>
                </div>
                <div class="clear left">
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
                            <select v-model="loadParam.validate" class="form-control" @change="selectSearch()">
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
                                <option value="3">{{$t('static.sample_order')}} {{$t('static.applied')}}</option>
                                <option value="4">{{$t('static.stock')}}</option>
                                <option value="5">{{$t('static.wait_for_purchase')}}</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.department')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.orgName" placeholder="请选择部门" readonly="true" @click="selectOrg()" />
                        </dd>
                    </dl>
                    <!-- 单个业务员搜索 -->
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top" style="letter-spacing:3px">{{$t('static.salesman')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.employeeName" placeholder="请选择业务员" readonly="true" @click="selectEmployee()">
                        </dd>
                    </dl>
                    <a href="/crm/api/v1/order/exportExcel?{{exportUrl}}" class="btn btn-info" @click="selectSearch()">{{$t('static.export_order')}}</a>
                    <button class="btn btn-warning" @click="resetCondition()">{{$t('static.clear_all')}}</button>
                    <button class="btn btn-primary" @click="selectSearch()">{{$t('static.search')}}</button>
                </div>
                <div class="right">
                    <button class="btn btn-success" @click="selectSearch()">{{$t('static.refresh')}}</button>
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
                            <th>{{$t('static.order')}}ID</th>
                            <th>{{$t('static.transcation')}}</th>
                            <th>{{$t('static.order_type')}}</th>
                            <th>{{$t('static.trading_patterns')}}</th>
                            <th>{{$t('static.sample_order')}}</th>
                            <th>{{$t('static.client_id')}}</th>
                            <th>{{$t('static.client_name')}}</th>
                            <th>{{$t('static.breed')}}</th>
                            <th>{{$t('static.image')}}</th>
                            <th>{{$t('static.transcation_amount')}}</th>
                            <th>{{$t('static.wait_payment')}}</th>
                            <th>{{$t('static.paid')}}</th>
                            <th>{{$t('static.currency')}}</th>
                            <th>{{$t('static.salesman')}}</th>
                            <th>{{$t('static.consignee_consigner_name')}}</th>
                            <th>{{$t('static.consignee_phone')}}</th>
                            <th>{{$t('static.consignee_address')}}</th>
                            <th>{{$t('static.payment_method')}}</th>
                            <th>{{$t('static.order_status')}}</th>
                            <th>{{$t('static.order_source')}}</th>
                            <th>{{$t('static.review_status')}}</th>
                            <th>{{$t('static.comment')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initAllOrderlist" v-cloak>
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
                            <td>{{item.customer}}</td>
                            <td><a @click="clickOn({
                                  show:true,
                                  id:item.id,
                                  int:item.intl,
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
                            <td v-if="item.payWay===0">{{$t('static.offline')}}</td>
                            <td v-if="item.payWay==1">{{$t('static.alipay')}}</td>
                            <td v-if="item.payWay==2">{{$t('static.pingan')}}</td>
                            <td v-if="item.payWay==3">{{$t('static.yaokuan')}}</td>
                            <td v-if="item.payWay==4">WeChat</td>
                            <td v-if="item.payWay!=0&&item.payWay!=1&&item.payWay!=2&&item.payWay!=3&&item.payWay!=4">{{$t('static.none')}}</td>
                            <td v-if="this.language=='zh_CN'">
                                <div>{{item.orderStatus | assess item.type item.logistics item.verifierName item.taskKey}}</div>
                                <div v-if="item.orderStatus==70" style="background:green;color:#fff">{{$t('static.order_over')}}</div>
                                <div v-if="item.orderStatus==0" style="background:#fa6705;color:#fff">{{$t('static.create_order')}}</div>
                            </td>
                            <td v-if="this.language=='en'">
                                <div>{{item.orderStatus | Enassess item.type item.logistics item.verifierName item.taskKey}}</div>
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
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 底部分页 -->
            <pagination :combination="loadParam" slot="page"></pagination>
        </mglist-model>
        <div style="font-size:14px;white-space: normal">
            <span style="margin-left:1%;color:red">总金额：{{initAllOrderStatis.totalSum | money}} {{initAllOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;color:red">已支付金额：{{initAllOrderStatis.prepaidSum | money}} {{initAllOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;color:red">未支付金额：{{initAllOrderStatis.unpaidSum | money}} {{initAllOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;">成本总金额：{{initAllOrderStatis.costSum | money}} {{initAllOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;">商品总金额：{{initAllOrderStatis.amountSum  | money}} {{initAllOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;">订单数量：{{initAllOrderStatis.orderCount | money}}笔</span>
            <span style="margin-left:1%;">特惠总金额：{{initAllOrderStatis.preferentialSum  | money}} {{initAllOrderStatis.currency | Currency}}</span>
            <span style="margin-left:1%;">杂费总金额：{{initAllOrderStatis.incidentalsSum | money}} {{initAllOrderStatis.currency | Currency}}</span>
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
import breedsearchModel from '../intention/breedsearch'
import selectorgModel from '../../components/tips/treeDialog'
//单个业务员搜索
import employeeModel from '../clientRelate/searchEmpInfo'
import filter from '../../filters/filters'
import common from '../../common/common'
import changeMenu from '../../components/tools/tabs/tabs.js'
import mglistModel from '../mguan/mgListComponent.vue'
import languageModel from '../tools/language.vue'
import {
    getList,
    initAllOrderlist,
    initAllOrderStatis
} from '../../vuex/getters'
import {
    getOrderList,
    getOrderStatistical,
    alterOrder,
    createOrder,
    orderStatu,
    getOrderDetail,
    orderOrgAudit
} from '../../vuex/actions'
export default {
    components: {
        editorderModel,
        filter,
        languageModel,
        pagination,
        detailModel,
        pictureModel,
        deletebreedModel,
        disposeModel,
        tipsdialogModel,
        auditModel,
        mglistModel,
        selectorgModel,
        employeeModel,
        breedsearchModel,
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
                link: '/order/',
                key: 'allOrderList',
                breedId: '',
                breedName: '',
                employeeId: '',
                employeeName: '',
                consignee: '',
                consigneePhone: '',
                type: '',
                orderStatus: '',
                payWay: '',
                clients: '',
                customerId:'',
                dataStatus: '',
                no: '',
                org: '',
                orgName: '',
                startTime: '',
                endTime: '',
                mode: '',
                validate: '',
                sample: '',
                sourceType: ''
            },
            selectOrgParam: {
                show: false,
                orgId: '',
                orgName: '',
                callback: this.callback,
            },
            employeeParam: {
                show: false,
                org: true,
                orgId: "",
                //单个业务员搜索
                employeeId: '',
                employeeName: '',

            },
            breedSearchParam: {
                show: false
            },
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
            language: '',
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
            show: true
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
            if (this.loadParam.validate) {
                url += "&validate=" + this.loadParam.validate;
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
            return url;
        }
    },
    vuex: {
        getters: {
            getList,
            initAllOrderlist,
            initAllOrderStatis
        },
        actions: {
            getOrderList,
            getOrderStatistical,
            alterOrder,
            createOrder,
            orderStatu,
            getOrderDetail,
            orderOrgAudit
        }
    },
    methods: {
        breedSearch: function() {
            this.breedSearchParam.show = true;
        },
        selectOrg: function() {
            this.selectOrgParam.show = true;
        },
        selectEmployee: function() {
            this.employeeParam.show = true;
        },
        callback: function() {
            if (this.selectOrgParam.orgId) {
                this.loadParam.org = this.selectOrgParam.orgId;
                this.loadParam.orgName = this.selectOrgParam.orgName;

                this.employeeParam.orgId = this.selectOrgParam.orgId;
                this.selectSearch();
            }
        },
        selectSearch: function() {
            this.getOrderList(this.loadParam);
            this.getOrderStatistical(this.loadParam);
        },
        selectType: function(type) {
            this.loadParam.type = type;
            this.selectSearch();
        },
        editClick: function(sub) {
            if (this.$store.state.table.basicBaseList.allOrderList[sub].show) {
                this.$store.state.table.basicBaseList.allOrderList[sub].show = !this.$store.state.table.basicBaseList.allOrderList[sub].show;
            } else {
                this.$store.state.table.basicBaseList.allOrderList[sub].show = true;
            }
        },
        clickBig: function(img) {
            this.pictureParam.show = true;
            this.pictureParam.img = img;
        },
        clickOn: function(param) {
            this.detailParam = param;
        },
        updateOrder: function(param) {

            this.dialogParam = param;
        },
        resetCondition: function() {
            this.loadParam.startTime = "";
            this.loadParam.endTime = "";
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
            this.loadParam.org = "";
            this.loadParam.orgName = "";
            this.loadParam.employeeId = "";
            this.loadParam.employeeName = "";
            this.employeeParam.orgId = ""; //保证employeeParam.orgId与loadParam.org同步变化
            this.loadParam.breedId = "";
            this.loadParam.breedName = "";
            this.loadParam.customerId='';
            this.loadParam.sample = "";
            this.selectSearch();
        },
        applyBack: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.selectSearch();
        },
        orderCheck: function(id, index) {

            this.auditParam.id = id;
            this.auditParam.index = index;

            this.auditParam.show = true;
            this.auditParam.title = '审核订单';
            this.auditParam.callback = this.applyBack;
        },
        auditPass: function() {
            this.auditParam.validate = 1;
            this.orderOrgAudit(this.auditParam);
        },
        auditReject: function() {
            this.auditParam.validate = 0;
            this.orderOrgAudit(this.auditParam);
        },
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
            this.loadParam.employeeId = employee.employeeId;
            this.loadParam.employeeName = employee.employeeName;
            this.selectSearch();
        },
    },
    filter: (filter, {}),
    ready() {
        common('tab', 'table_box', 1);
    },
    created() {
        changeMenu(this.$store.state.table.isTop, this.getOrderList, this.loadParam, localStorage.allOrderParam);
        changeMenu(this.$store.state.table.isTop, this.getOrderStatistical, this.loadParam, localStorage.allOrderParam);
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
    margin-right: 16px;
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

#table_box table th,
#table_box table td {
    width: 84px;
    min-width: 84px;
}

.order_table .table > ul >li img {
    margin: auto;
}

.order_pagination {
    text-align: center;
}

.api {
    color: #3399ff;
}
</style>
