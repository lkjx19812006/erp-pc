<template>
    <div>
        <editorder-model :param.sync="dialogParam" v-if="dialogParam.show"></editorder-model>
        <createorder-model :param="createParam" v-if="createParam.show"></createorder-model>
        <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
        <search-model :param="loadParam" v-if="loadParam.show"></search-model>
        <dispose-model :param="disposeParam" v-if="disposeParam.show"></dispose-model>
        <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <createorder-model :param="applyParam" v-if="applyParam.show"></createorder-model>
        <reapply-model :param="reapplyParam" v-if="reapplyParam.show"></reapply-model>
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
                            <dt class="left transfer marg_top">{{$t('static.consignee_name')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.consignee" @keyup.enter="selectSearch()" />
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <div class="col-xs-6">
                                <dt class="left transfer marg_top">结束时间：</dt>
                                <mz-datepicker :time.sync="loadParam.endTime" format="yyyy/MM/dd HH:mm:ss">
                                </mz-datepicker>
                            </div>
                        </dl>
                        <dl class="clear left transfer">
                            <div class="col-xs-6">
                                <dt class="left transfer marg_top">起始时间：</dt>
                                <mz-datepicker :time.sync="loadParam.startTime" format="yyyy/MM/dd HH:mm:ss">
                                </mz-datepicker>
                            </div>
                        </dl>
                    </div>
                </div>
                <!-- <div class="clear">
              <div class="right">
                  <button class="btn btn-default transfer" @click="newOrder()">{{$t('static.new')}}</button>
                  <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
              </div>
              <div class="left">
                
                
                
                <button type="button" class="new_btn"  @click="resetTime()">{{$t('static.clear_all')}}</button>
                  <button class="new_btn transfer" @click="selectSearch()">{{$t('static.search')}}</button>
              </div>
           </div> -->
                <div class="clearfix" style="margin-right: 10px">
                    <div class="btn-group pull-left">
                        <button class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.orderStatus===''}" @click="selectStatus('')">{{$t('static.please_select')}}</button>
                        <button class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.orderStatus===0}" @click="selectStatus(0)">{{$t('static.create_order')}}</button>
                        <button class="btn btn-default" v-bind:class="{ 'btn-warning':  this.loadParam.orderStatus==10}" @click="selectStatus(10)">{{$t('static.order_procing')}}</button>
                        <button class="btn btn-default" v-bind:class="{ 'btn-warning':  this.loadParam.orderStatus==20}" @click="selectStatus(20)">{{$t('static.waiting_order')}}</button>
                        <button class="btn btn-default" v-bind:class="{ 'btn-warning':  this.loadParam.orderStatus==30}" @click="selectStatus(30)">{{$t('static.awaiting_review')}}</button>
                        <button class="btn btn-default" v-bind:class="{ 'btn-warning':  this.loadParam.orderStatus==40}" @click="selectStatus(40)">{{$t('static.wait_ship')}}</button>
                        <button class="btn btn-default" v-bind:class="{ 'btn-warning':  this.loadParam.orderStatus==50}" @click="selectStatus(50)">{{$t('static.wait_receipt')}}</button>
                        <button class="btn btn-default" v-bind:class="{ 'btn-warning':  this.loadParam.orderStatus==60}" @click="selectStatus(60)">{{$t('static.awaiting_comment')}}</button>
                        <button class="btn btn-default transfer" v-bind:class="{ 'btn-warning':  this.loadParam.orderStatus==70}" @click="selectStatus(70)">{{$t('static.order_over')}}</button>
                        <button type="button" class="new_btn" @click="resetTime()">{{$t('static.clear_all')}}</button>
                        <button class="new_btn transfer" @click="selectSearch()">{{$t('static.search')}}</button>
                    </div>
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
                            <!-- <th>{{$t('static.supplier_name')}}</th> -->
                            <th>{{$t('static.salesman')}}</th>
                            <th>{{$t('static.consignee_name')}}</th>
                            <th>{{$t('static.consignee_phone')}}</th>
                            <th>{{$t('static.consignee_address')}}</th>
                            <!-- <th>{{$t('static.payment_method')}}</th> -->
                            <th>{{$t('static.order_status')}}</th>
                            <th>{{$t('static.order_source')}}</th>
                            <th>{{$t('static.review_status')}}</th>
                            <th>{{$t('static.handle')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initAllOrderlist" v-cloak>
                            <!-- <td  @click.stop="">
                      <label v-if="item.validate<=0&&(item.orderStatus==0||item.orderStatus==70)" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="onlyselected($index)"></label>
                    </td> -->
                            <td>{{item.ctime}}</td>
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
                          })">{{item.customerName}}</a></td>
                            <td>{{item.goodsDesc}}</td>
                            <td>{{item.total}}</td>
                            <td>{{item.cost}}</td>
                            <td>{{item.unpaid}}</td>
                            <td>{{item.prepaid}}</td>
                            <td>{{item.employeeName}}</td>
                            <td>{{item.consignee}}</td>
                            <td>{{item.consigneePhone}}</td>
                            <td>
                                <Poptip placement="top" trigger="hover">
                                    <span>{{item.consigneeAddr | textDisplay '5'}}</span>
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
                                <div>{{item.orderStatus | Enassess item.type item.logistics item.verifierName item.taskKey}}</div>
                                <div v-if="item.orderStatus==70" style="background:green;color:#fff">{{$t('static.order_over')}}</div>
                                <div v-if="item.orderStatus==0" style="background:#fa6705;color:#fff">{{$t('static.create_order')}}</div>
                            </td>
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
                            <td v-if="item.validate==2">
                                <button class="btn btn-danger" @click="applyOrder({
                                    show:true,
                                    id:item.id,
                                    index:$index,
                                    type:item.type,
                                    consigner:item.consigner,
                                    sourceType:0,
                                    sample:item.sample,
                                    intl:item.intl,
                                    customer:item.customer,
                                    currency:item.currency,
                                    consigner:item.consigner,
                                    verifierName:item.verifierName,
                                    consignee:item.consignee,
                                    consigneePhone:item.consigneePhone,
                                    customerPhone:item.consigneePhone,
                                    zipCode:item.zipCode,
                                    country:item.country,
                                    province:item.province,
                                    city:item.city,
                                    employee:item.employee,
                                    customerName:item.customerName,
                                    org:item.org,
                                    district:item.district,
                                    orderStatus:item.orderStatus,
                                    consigneeAddr:item.consigneeAddr,
                                    comments:item.comments,
                                    incidentals:item.incidentals,
                                    validate:item.validate,
                                    incidentalsDesc:item.incidentalsDesc,
                                    preferential:item.preferential,
                                    preferentialDesc:item.preferentialDesc,
                                    status:item.status,
                                    total:item.total,
                                    cost:item.cost,
                                    key:'myOrderList',
                                    link:alterOrder,
                                    url:'/order/',
                                    goods:item.goods,
                                    goodsBack:[]
                                    },item.goods)" v-if="item.orderStatus==40&&item.link==''" style="background:#fff;color:#ac2925;padding:2px 4px;font-size: 12px;">生成采购订单
                                </button>
                                <button class="btn btn-default btn-gray" v-else>已生成采购订单</button>
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
import editorderModel from '../order/orderInformationDialog'
import detailModel from '../order/orderDetail'
import searchModel from '../order/orderSearch'
import deletebreedModel from '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import disposeModel from '../order/orderStatus'
import tipsdialogModel from '../tips/tipDialog'
import auditModel from '../order/orgAudit'
import common from '../../common/common'
import changeMenu from '../../components/tools/tabs/tabs.js'
import reapplyModel from '../tips/auditDialog'
import createorderModel from '../order/createOrderDialog.vue'
import mglistModel from '../mguan/mgListComponent.vue'
import languageModel from '../tools/language.vue'
import {
    getList,
    initAllOrderlist,
    initLogin
} from '../../vuex/getters'
import {
    getOrderList,
    alterOrder,
    createOrder,
    orderStatu,
    getOrderDetail

} from '../../vuex/actions'
export default {
    components: {
        editorderModel,
        pagination,
        createorderModel,
        detailModel,
        searchModel,
        deletebreedModel,
        disposeModel,
        auditModel,
        tipsdialogModel,
        filter,
        mglistModel,
        reapplyModel,
        languageModel
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
                consignee: '',
                link: '/order/',
                key: 'allOrderList',
                employee: '',
                org: '',
                consignee: '',
                consigneePhone: '',
                type: '',
                orderStatus: 40,
                payWay: '',
                clients: '',
                dataStatus: '',
                validate: 2,
                customerName: '',
                customerPhone: '',
                no: '',
                endTime: '',
                startTime: '',
                intl: 1,
                mode: '',
                total: 0
            },
            dialogParam: {
                show: false,
            },
            language: '',
            line_height: 0,
            createParam: {
                show: false,
                title1: '新建订单',
                type: 1,
                sourceType: 0,
                sample: 0,
                intl: 0,
                customer: '',
                currency: '',
                addressId: '', //地址ID，如果为空，表示是新增的收货地址,否则是已存在的收货地址
                consignee: '',
                consigneePhone: '',
                consigner: '', //发货人
                zipCode: '',
                country: '中国',
                province: '',
                city: '',
                employee: this.initLogin.id,
                org: this.initLogin.orgId,
                district: '',
                consigneeAddr: '',
                customerName: '',
                customerPhone: '',
                comments: '',
                incidentals: 0,
                incidentalsDesc: '',
                preferential: 0,
                preferentialDesc: '',
                payWay: '',
                total: '',
                cost: '',
                orderStatus: '',
                goods: [ //多个商品

                ],
                link: createOrder,
                key: 'myOrderList',

            },
            detailParam: {
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
                delivery: false,
                confirmReceipt: false,
                estimate: false,
                key: 'myOrderList'
            },
            show: true,
            checked: false,
            auditParam: {
                show: false,
                indexs: [], //批量审核使用,暂停用
                ids: [], //批量审核使用,暂停用
                id: '',
                index: '',
                description: '',
                validate: '',
                title: "申请订单审核",
                key: 'myOrderList'
            },
            tipsParam: {
                show: false,
                alert: true,
                name: "请选择要申请审核的订单",
            },
            applyParam: {
                show: false
            },
            reapplyParam: {
                show: false,
                orderId: '',
                sub: '',
                titles: '',
                auditComment: '',
                callback: '',
                logistics: ''
            }
        }
    },
    vuex: {
        getters: {
            getList,
            initAllOrderlist,
            initLogin
        },
        actions: {
            getOrderList,
            alterOrder,
            createOrder,
            orderStatu,
            getOrderDetail
        }
    },
    methods: {
        selectSearch: function() {
            this.getOrderList(this.loadParam);
        },
        selectStatus: function(status) {
            this.loadParam.orderStatus = status;
            this.getOrderList(this.loadParam);
        },
        editClick: function(sub) {
            if (this.$store.state.table.basicBaseList.myOrderList[sub].show) {
                this.$store.state.table.basicBaseList.myOrderList[sub].show = !this.$store.state.table.basicBaseList.myOrderList[sub].show;
            } else {
                this.$store.state.table.basicBaseList.myOrderList[sub].show = true;
            }
        },
        /*orgCheck:function(){   //批量审核，停用
            var _this = this;
            _this.auditParam.ids = [];
            _this.auditParam.indexs = [];
           _this.checked=false;
            for(var i=0;i<this.initAllOrderlist.length;i++){
                if(this.$store.state.table.basicBaseList.myOrderList[i].checked){
                    _this.auditParam.ids.push(this.$store.state.table.basicBaseList.myOrderList[i].id);
                    _this.auditParam.indexs.push(i);
                    _this.auditParam.validate = this.$store.state.table.basicBaseList.myOrderList[i].validate;
                }
            }
            if(this.auditParam.ids.length>0){
                this.auditParam.show = true;
            }else{
                this.tipsParam.show = true;
            }
            _this.auditParam.callback = _this.applyBack;
        },*/
        applyBack: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
        },
        orderCheck: function(id, index, validate) {
            this.auditParam.id = id;
            this.auditParam.index = index;
            this.auditParam.validate = validate;
            this.auditParam.show = true;
            if (validate == 0) {
                this.auditParam.title = '申请订单审核';
            }
            if (validate == -2) {
                this.auditParam.title = '重新申请订单审核';
            }
            this.auditParam.callback = this.applyBack;
        },
        onlyselected: function(index) {
            const _self = this;
            this.$store.state.table.basicBaseList.myOrderList[index].checked = !this.$store.state.table.basicBaseList.myOrderList[index].checked;
            if (_self.checked) {
                _self.checked = false;
            } else {
                _self.checked = true;
                this.$store.state.table.basicBaseList.myOrderList.forEach(function(item) {
                    if (!item.checked) {
                        if (item.validate == 0) {
                            _self.checked = item.checked;
                            _self.validate = item.validate;
                        }
                    }
                })
            }
        },
        select: function() {
            console.log(this.checked)
            this.checked = !this.checked;
            const checked = this.checked;
            this.$store.state.table.basicBaseList.myOrderList.forEach(function(item) {
                if (item.validate == 0) item.checked = checked;
            })
        },
        newOrder: function() {
            this.createParam.show = true;
            this.createParam.callback = this.newBack;
        },
        newBack: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
        },
        createSearch: function() {
            this.loadParam.show = true;
            this.loadParam.link = '/order/myList';
        },
        clickOn: function(param) {
            this.detailParam = param;
        },
        applyOrder: function(item, goods) {
            this.applyParam = item;
            var _this = this;
            if (goods == null) {
                goods = [];
            }
            for (var i = 0; i < goods.length; i++) {
                this.applyParam.goodsBack[i] = {};
                for (var key in goods[i]) {
                    this.applyParam.goodsBack[i][key] = goods[i][key];
                }
            }
            this.applyParam.orderStatus = 0;
            this.applyParam.title1 = '采购订单';
            this.applyParam.type = 0;
            this.applyParam.link = item.id;
            console.log(this.applyParam)
            this.applyParam.callback = this.orderBack;
        },
        orderBack: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.getOrderList(this.loadParam);
        },
        resetTime: function() {
            this.loadParam.startTime = "";
            this.loadParam.endTime = "";
            this.loadParam.consigneePhone = "";
            this.loadParam.consignee = "";
            this.loadParam.customerPhone = "";
            this.loadParam.customerName = "";
            this.loadParam.orderStatus = "";
            this.loadParam.dataStatus = "";
            this.loadParam.no = "";
            this.loadParam.mode = "";
            this.loadParam.validate = 2;
            this.loadParam.type = "";
            this.loadParam.clients = "";
            this.loadParam.payWay = "";
            this.getOrderList(this.loadParam);
        }
    },

    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getOrderList(this.loadParam);
        }
    },
    filter: (filter, {}),
    ready() {
        common('tab', 'table_box', 1);
    },
    created() {
        changeMenu(this.$store.state.table.isTop, this.getOrderList, this.loadParam, localStorage.allOrderParam);
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

.v-spinner {
    text-align: center;
}

.order_pagination {
    text-align: center;
}

.api {
    color: #3399ff;
}
</style>
