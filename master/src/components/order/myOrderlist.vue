<template>
    <div>
        <editorder-model :param="dialogParam" v-if="dialogParam.show"></editorder-model>
        <createorder-model :param="createParam" v-if="createParam.show"></createorder-model>
        <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
        <search-model :param="loadParam" v-if="loadParam.show"></search-model>
        <dispose-model :param="disposeParam" v-if="disposeParam.show"></dispose-model>
        <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <applysend-model :param="applyParam" v-if="applyParam.show"></applysend-model>
        <reapply-model :param="reapplyParam" v-if="reapplyParam.show"></reapply-model>
        <contract-model :param="contractParam" v-if="contractParam.show"></contract-model>
        <cancel-model :param="cancelParam" v-if="cancelParam.show"></cancel-model>
        <saleapply-model :param="applicationParam" v-if="applicationParam.show"></saleapply-model>
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
                            <dt class="left transfer marg_top">{{$t('static.consignee_name')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.consignee" @keyup.enter="selectSearch()" />
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <div class="col-xs-6">
                                <dt class="left transfer marg_top">{{$t('static.start_time')}}：</dt>
                                <mz-datepicker :time.sync="loadParam.startTime" format="yyyy/MM/dd HH:mm:ss">
                                </mz-datepicker>
                            </div>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.order_no')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.no" @keyup.enter="selectSearch()" />
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
                    </div>
                </div>
                <div class="clear">
                    <div class="right">
                        <button class="btn btn-default transfer" @click="newOrder()">{{$t('static.new')}}</button>
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
                            <dt class="left transfer marg_top">{{$t('static.consignee_phone')}}：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.consigneePhone" @keyup.enter="selectSearch()" />
                            </dd>
                        </dl>
                        <dl class="clear left transfer">
                            <div class="col-xs-6">
                                <dt class="left transfer marg_top">{{$t('static.end_time')}}：</dt>
                                <mz-datepicker :time.sync="loadParam.endTime" format="yyyy/MM/dd HH:mm:ss">
                                </mz-datepicker>
                            </div>
                        </dl>
                        <dl class="clear left transfer">
                            <dt class="left transfer marg_top">{{$t('static.order')}}ID：</dt>
                            <dd class="left">
                                <input type="text" class="form-control" v-model="loadParam.id" @keyup.enter="selectSearch()" />
                            </dd>
                        </dl>
                        <button type="button" class="new_btn" @click="resetTime()">{{$t('static.clear_all')}}</button>
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
                            <th>{{$t('static.currency')}}</th>
                            <th>{{$t('static.consignee_name')}}</th>
                            <th>{{$t('static.consignee_phone')}}</th>
                            <th>{{$t('static.consignee_address')}}</th>
                            <!-- <th>{{$t('static.payment_method')}}</th> -->
                            <th>{{$t('static.order_status')}}</th>
                            <th>{{$t('static.order_source')}}</th>
                            <th>{{$t('static.review_status')}}</th>
                            <th style="min-width: 105px;">{{$t('static.handle')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initMyOrderlist" v-cloak>
                            <!-- <td  @click.stop="">
                    <label v-if="item.validate<=0&&(item.orderStatus==0||item.orderStatus==70)" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="onlyselected($index)"></label>
                  </td> -->
                            <td>{{item.tradeTime | subtime}}</td>
                            <td>
                                <div v-if="item.type==1&&item.pre==0">{{$t('static.sell')}}</div>
                                <div v-if="item.type==0&&item.pre==0">{{$t('static.purchase')}}</div>
                                <div v-if="item.type==1&&item.pre==1">预售</div>
                            </td>
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
                                })">{{item.customerName}}</a>
                            </td>
                            <td>{{item.goodsDesc}}</td>
                            <td>{{item.total}}</td>
                            <td>{{item.cost}}</td>
                            <td>{{item.unpaid}}</td>
                            <td>{{item.prepaid}}</td>
                            <td>{{item.currency | Currency}}</td>
                            <td>{{item.consignee}}</td>
                            <td>{{item.consigneePhone}}</td>
                            <td>
                                <Poptip placement="top" trigger="hover">
                                    <span>{{item.consigneeAddr | textDisplay '5'}}</span>
                                    <div class="api" slot="content">
                                        {{item.country}} {{item.province}} {{item.city}} {{item.district}} {{item.consigneeAddr}}
                                    </div>
                                </Poptip>
                            </td>
                            <td v-if="this.language=='zh_CN'">
                                <div>{{item.orderStatus | assess item.type item.logistics item.verifierName item.taskKey}}</div>
                                <div v-if="item.orderStatus==70" style="background:green;color:#fff">{{$t('static.order_over')}}</div>
                                <div v-if="item.orderStatus==0" style="background:#fa6705;color:#fff">{{$t('static.create_order')}}</div>
                            </td>
                            <!-- <td v-if="item.orderStatus==70" style="background:green;color:#fff">{{$t('static.order_over')}}</td> -->
                            <td v-if="this.language=='en'">
                                <div>{{item.orderStatus | Enassess item.type item.logistics item.verifierName item.taskKey}}</div>
                                <div v-if="item.orderStatus==70" style="background:green;color:#fff">{{$t('static.order_over')}}</div>
                                <div v-if="item.orderStatus==0" style="background:#fa6705;color:#fff;">{{$t('static.create_order')}}</div>
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
                            <td>
                                <button class="btn btn-primary btn-edit" v-if="(item.validate==0||item.validate==-2)&&item.orderStatus!==-1" @click="updateOrder({
                                        show:true,
                                        id:item.id,
                                        index:$index,
                                        type:item.type,
                                        consigner:item.consigner,
                                        consignerName:'',
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
                                        tradeTime:item.tradeTime,
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
                                        },item.goods)">{{$t('static.edit')}}
                                </button>
                                <!-- 取消订单,在订单状态为20和70或者新建的订单还未申请审核可以取消，并说明原因 -->
                                <button class="btn btn-warning btn-apply" v-if="item.orderStatus==20||item.orderStatus==70||(item.orderStatus==0&&item.validate==0)" @click="cancelOrder(item.id,$index)">
                                    取消订单
                                </button>
                                <div v-if="item.validate==2">
                                    <button class="btn btn-danger" @click="clickOn({
                                                show:true,
                                                id:item.id,
                                                loading:true,
                                                key:'orderDetail',
                                                orderStatus:item.orderStatus,
                                                contact:'/order/myList'
                                        })" v-if="(item.orderStatus==20||item.orderStatus==10)&&item.type==0" style="background:#fff;color:#eea236;padding:1px 5px;border-color:#eea236">{{$t('static.apply_payment')}}
                                    </button>
                                    <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==30&&item.type==0">
                                        <img src="/static/images/{{$t('static.img_paid')}}.png" title="待客户收款" alt="待客户收款" />
                                    </a>
                                    <!-- 申请收款按钮 -->
                                    <button class="btn btn-warning" @click="clickOn({
                                            show:true,
                                            id:item.id,
                                            loading:true,
                                            key:'orderDetail',
                                            orderStatus:item.orderStatus,
                                            contact:'/order/myList'
                                    })" v-if="(item.orderStatus==20||item.orderStatus==30)&&item.type==1" style="background:#fff;color:#eea236;padding:2px 4px;font-size: 12px;">{{$t('static.apply_income')}}
                                    </button>
                                    <!-- 销售订单发货流程start-->
                                    <button class="btn btn-danger" @click="applySend(item,$index)" v-if="item.orderStatus==40&&item.type==1&&item.logistics==0" style="background:#fff;color:#ac2925;padding:2px 4px;font-size: 12px;">{{$t('static.apply_send')}}
                                    </button>
                                    <a class="operate" v-if="item.orderStatus==40&&item.type==1&&item.logistics==1&&item.taskKey=='order_send_governor_validate'" style="color:#333;">{{$t('static.management_approval')}}</a>
                                    <button class="btn btn-danger" @click="reapplySend(item,$index)" v-if="item.orderStatus==40&&item.logistics==-1&&item.type==1&&item.verifier==item.employee" style="background:#fff;color:#eea236;padding:1px 3px;">{{$t('static.reapply_delivery')}}
                                    </button>
                                    <!-- 发货 -->
                                    <button class="btn btn-warning" @click="pendingOrder(item,$index)" v-if="item.orderStatus==40&&item.logistics==1&&item.type==1&&item.taskKey=='order_send_warehouse_validate'&&item.verifier==item.employee" style="background:#fff;color:#eea236;padding:1px 5px;">{{$t('static.shipped')}}
                                    </button>
                                    <!-- 销售订单发货流程end -->
                                    <button class="btn btn-success" @click="pendingOrder(item,$index)" v-if="item.orderStatus ==60&&item.type==0&&(item.logistics==3||item.logistics==2)" style="background:#fff;color:#eea236;padding:1px 5px;color:#398439">{{$t('static.quality_satisfied')}}
                                    </button>
                                    <button class="btn btn-success" @click="pendingOrder(item,$index)" v-if="item.orderStatus ==70&&item.type==0" style="background:#fff;color:#eea236;padding:1px 5px;color:#398439">{{$t('static.order_over')}}
                                    </button>
                                    <button class="btn btn-success" @click="pendingOrder(item,$index)" v-if="item.orderStatus==60&&item.type==1&&(item.logistics==3||item.logistics==2)" style="background:#fff;color:#398439;padding:1px 5px;">{{$t('static.quality_satisfied')}}
                                    </button>
                                    <button class="btn btn-danger" @click="addContract({
                                            show:true,
                                            sub:$index,
                                            orderId:item.id,
                                            total:item.total,
                                            adjusted:'',
                                            comment:'',
                                            contractText:'',
                                            url:'/order/quality/contract/start',
                                            link:applyContract,
                                            titles:this.$t('static.supply_contract'),
                                            images:''
                                          })" v-if="item.orderStatus==60&&(item.logistics==3||item.logistics==2)" style="background:#fff;color:#eea236;padding:1px 5px;">{{$t('static.supply_contract')}}
                                    </button>
                                    <button class="btn btn-danger" @click="afterSales({
                                            show:true,
                                            sub:$index,
                                            orderId:item.id,
                                            consignee:'',
                                            comment:'',
                                            shipper:'',
                                            type:'',
                                            url:'/order/quality/after/sales/start',
                                            link:afterSalesApply,
                                            titles:this.$t('static.apply_sales'),
                                            images:''
                                          })" v-if="item.orderStatus==60&&(item.logistics==3||item.logistics==2)" style="background:#fff;color:#eea236;padding:1px 5px;">{{$t('static.apply_sales')}}
                                    </button>
                                    <!-- <button class="btn btn-danger"  @click="pendingOrder(item,$index)" v-if="item.orderStatus ==60&&item.type==1&&item.logistics==2" style="background:#fff;color:#eea236;padding:1px 5px;">确认收货
                                        </button> -->
                                    <button class="btn btn-danger" @click="pendingOrder(item,$index)" v-if="item.orderStatus==10&&item.type==1" style="background:#fff;color:#eea236;padding:1px 5px;">{{$t('static.pending_payment')}}</button>
                                    <button class="btn btn-danger" @click="pendingOrder(item,$index)" v-if="item.orderStatus==50&&item.type==0" style="background:#fff;color:#eea236;padding:1px 5px;border-color:#eea236">{{$t('static.receive')}}
                                    </button>
                                    <button class="btn btn-danger" @click="pendingOrder(item,$index)" v-if="item.orderStatus==40&&item.type==0" style="background:#fff;color:#eea236;padding:1px 5px;border-color:#eea236">{{$t('static.pending_shipped')}}
                                    </button>
                                    <button class="btn btn-primary" @click="pendingOrder(item,$index)" v-if="item.orderStatus==50&&item.type==1" style="background:#fff;color:#eea236;padding:1px 5px;border-color:#eea236">{{$t('static.receive')}}
                                    </button>
                                    <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==0">
                                        <img src="/static/images/{{$t('static.img_handle')}}.png" title="订单待处理" alt="订单待处理" />
                                    </a>
                                </div>
                                <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==-1">
                                    <img src="/static/images/{{$t('static.img_canceled')}}.png" title="订单已取消" alt="订单已取消" />
                                </a>
                                <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==-2">
                                    <img src="/static/images/{{$t('static.deadline')}}.png" title="订单已过期" alt="订单已过期" />
                                </a>
                                <!-- 申请审核 -->
                                <button class="btn btn-default btn-apply" @click="orderCheck(item.id,$index,item.validate)" v-if="item.validate==0&&(item.orderStatus==0||item.orderStatus==70)">{{$t('static.review_application')}}</button>
                                <button class="btn btn-default btn-apply" @click="orderCheck(item.id,$index,item.validate)" v-if="item.validate==-2&&(item.orderStatus==0||item.orderStatus==70)">{{$t('static.reapply')}}</button>
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
import createorderModel from '../order/createOrderDialog'
import detailModel from '../order/orderDetail'
/*import searchModel from '../order/orderSearch'*/
import deletebreedModel from '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import disposeModel from '../order/orderStatus'
import tipsdialogModel from '../tips/tipDialog'
import auditModel from '../order/orgAudit'
import common from '../../common/common'
import cancelModel from './cancleMsg'
import changeMenu from '../../components/tools/tabs/tabs.js'
import applysendModel from '../order/second_order/orderAudit'
import reapplyModel from '../tips/auditDialog'
import mglistModel from '../mguan/mgListComponent.vue'
import languageModel from '../tools/language.vue'
import contractModel from '../order/second_order/contractItems'
import saleapplyModel from '../order/second_order/afterSalesApply'
import {
    getList,
    initMyOrderlist,
    initLogin
} from '../../vuex/getters'
import {
    getEmpolyeeOrder,
    alterOrder,
    createOrder,
    orderStatu,
    getOrderDetail,
    applyContract,
    afterSalesApply,
    orderCancle
} from '../../vuex/actions'
export default {
    components: {
        editorderModel,
        pagination,
        createorderModel,
        detailModel,
        deletebreedModel,
        disposeModel,
        auditModel,
        tipsdialogModel,
        filter,
        mglistModel,
        reapplyModel,
        applysendModel,
        contractModel,
        saleapplyModel,
        languageModel,
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
                consignee: '',
                link: '/order/myList',
                key: 'myOrderList',
                id: '',
                no: '',
                employee: this.initLogin.id,
                org: this.initLogin.orgId,
                consignee: '',
                consigneePhone: '',
                type: '',
                orderStatus: '',
                payWay: '',
                clients: '',
                dataStatus: '',
                validate: '',
                customerName: '',
                customerPhone: '',
                no: '',
                endTime: '',
                startTime: '',
                mode: '',
                sample: ''

            },
            dialogParam: {
                show: false,
            },
            language: '',
            line_height: 0,
            createParam: {
                show: false,
                title1: this.$t('static.new_order'),
                type: 1,
                pre: 0,
                sourceType: 0,
                sample: 0,
                intl: '',
                customer: '',
                currency: '',
                tradeTime: '',
                addressId: '', //地址ID，如果为空，表示是新增的收货地址,否则是已存在的收货地址
                consignee: '',
                consigneePhone: '',
                consigner: '', //发货人,(销售订单时，是业务员ID，采购订单时，是""，不填)
                consignerName: '', //发货人名
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
                orderStatus: 0,
                goods: [ //多个商品

                ],
                link: createOrder,
                key: 'myOrderList',
                callback: '' //成功后的回调函数

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
            contractParam: {
                show: false
            },
            applicationParam: {
                show: false
            },
            applyParam: {
                show: false,
                orderId: '',
                sub: '',
                titles: '申请发货',
                description: '',
                callback: '',
                logistics: ''
            },
            reapplyParam: {
                show: false,
                orderId: '',
                sub: '',
                titles: '',
                auditComment: '',
                callback: '',
                logistics: ''
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
    vuex: {
        getters: {
            getList,
            initMyOrderlist,
            initLogin
        },
        actions: {
            getEmpolyeeOrder,
            alterOrder,
            createOrder,
            orderStatu,
            getOrderDetail,
            applyContract,
            afterSalesApply,
            orderCancle
        }
    },
    methods: {
        selectSearch: function() {
            this.getEmpolyeeOrder(this.loadParam);
        },
        editClick: function(sub) {
            if (this.$store.state.table.basicBaseList.myOrderList[sub].show) {
                this.$store.state.table.basicBaseList.myOrderList[sub].show = !this.$store.state.table.basicBaseList.myOrderList[sub].show;
            } else {
                this.$store.state.table.basicBaseList.myOrderList[sub].show = true;
            }
        },

        applyBack: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.getEmpolyeeOrder(this.loadParam);
        },
        cancelBack: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.selectSearch();
        },
        orderCheck: function(id, index, validate) {
            this.auditParam.id = id;
            this.auditParam.index = index;
            this.auditParam.validate = validate;
            this.auditParam.show = true;
            if (validate == 0) {
                this.auditParam.title = this.$t('static.review_application');
            }
            if (validate == -2) {
                this.auditParam.title = this.$t('static.reapply');
            }
            this.auditParam.callback = this.applyBack;
        },
        cancelOrder: function(id, index) {
            this.cancelParam.id = id;
            this.cancelParam.index = index;
            this.cancelParam.show = true;
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
            this.checked = !this.checked;
            const checked = this.checked;
            this.$store.state.table.basicBaseList.myOrderList.forEach(function(item) {
                if (item.validate == 0) item.checked = checked;
            })
        },
        newOrder: function() {
            //新建订单时将一些之前填入的信息请空

            this.createParam.goods = [];
            this.createParam.total = "";
            this.createParam.cost = "";
            this.createParam.incidentals = 0;
            this.createParam.preferential = 0;

            this.createParam.show = true;
            this.createParam.callback = this.newBack;
        },
        newBack: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.getEmpolyeeOrder(this.loadParam);
        },
        createSearch: function() {
            this.loadParam.show = true;
            this.loadParam.link = '/order/myList';
        },
        // 点击申请收款弹出子弹框
        clickOn: function(param) {
            this.detailParam = param;
        },
        applySend: function(item, sub) {
            this.applyParam.show = true;
            this.applyParam.orderId = item.id;
            this.applyParam.sub = sub;
            this.applyParam.titles = this.$t('static.apply_send');
            this.applyParam.callback = this.orderBack;
        },
        reapplySend: function(item, sub) {
            this.reapplyParam.show = true;
            this.reapplyParam.orderId = item.id;
            this.reapplyParam.sub = sub;
            this.reapplyParam.title = this.$t('static.reapply_delivery');
            this.reapplyParam.callback = this.orderBack;
        },
        updateOrder: function(param, goods) {
            this.dialogParam = param;
            var _this = this;
            if (goods == null) {
                goods = [];
            }
            for (var i = 0; i < goods.length; i++) {
                this.dialogParam.goodsBack[i] = {};
                for (var key in goods[i]) {
                    this.dialogParam.goodsBack[i][key] = goods[i][key];
                }
            }
            this.dialogParam.callback = this.updateBack;
        },
        updateBack: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.getEmpolyeeOrder(this.loadParam);
        },
        pendingOrder: function(item, sub) {
            item.show = !item.show;
            item.sub = sub;
            this.disposeParam = item;
            this.disposeParam.key = "myOrderList";
            this.disposeParam.show = true;
            /*--采购状态type==0--*/
            if (item.orderStatus == 0 && item.type == 0) {
                this.disposeParam.tips = "订单已提交，请审核！";
            }
            if (item.orderStatus == 10 && item.type == 0) {
                this.disposeParam.tips = "订单处理完成，待财务付款！";
            }
            if (item.orderStatus == -1) {
                this.disposeParam.tips = this.$t('static.cancle_order');
            }
            if (item.orderStatus == -2) {
                this.disposeParam.tips = this.$t('static.expired_order');
            }
            if (item.orderStatus == 20 && item.type == 0) {
                this.disposeParam.tips = "订单处理完成，待财务付款！";

            }
            if (item.orderStatus == 30 && item.type == 0) {
                this.disposeParam.tips = "订单已付款，待客户收款";
                this.disposeParam.confirmReceipt = true;
            }
            if (item.orderStatus == 40 && item.type == 0) {
                this.disposeParam.tips = this.$t('static.pending_shipped');
                this.disposeParam.sendoff = true;
            }
            if (item.orderStatus == 50 && item.type == 0) {
                this.disposeParam.tips = "您的订单已发货，请注意保持电话通畅，等待收货确认！";
                this.disposeParam.delivery = true;
            }
            if (item.orderStatus == 60 && item.type == 0) {
                if (item.unpaid > 0) {
                    this.tipsParam.show = true;
                    this.tipsParam.name = this.$t('static.not_settle');
                    this.tipsParam.alert = true;
                    this.disposeParam.show = false;
                } else {
                    this.disposeParam.tips = "买家已收货，请确认订单是否完成！";
                    this.disposeParam.estimate = true;
                }
            }
            if (item.orderStatus == 70 && item.type == 0) {
                this.disposeParam.tips = this.$t('static.order_over');
            }
            /*--销售状态type==1--*/
            if (item.orderStatus == 0 && item.type == 1) {
                this.disposeParam.tips = "订单已提交，请审核！";
                this.disposeParam.handle = true;
            }
            if (item.orderStatus == 10 && item.type == 1) {
                this.disposeParam.tips = "订单处理完成，等待客户付款！";
                this.disposeParam.sales = true;
            }
            if (item.orderStatus == 20 && item.type == 1) {
                this.disposeParam.tips = "客户已付款，等待申请财务核查！";
                this.disposeParam.payment = true;
            }
            if (item.orderStatus == 30 && item.type == 1) {
                this.disposeParam.tips = "客户已付款，等待财务核查！";
                this.disposeParam.Auditing = true;
            }
            if (item.orderStatus == 40 && item.type == 1) {
                this.disposeParam.tips = "财务核查通过，请等待卖家发货！";
                this.disposeParam.sendoff = true;
            }
            if (item.orderStatus == 50 && item.type == 1) {
                this.disposeParam.tips = "订单已发货，请等待收货确认！";
                this.disposeParam.express = true;
            }
            if (item.orderStatus == 60 && item.type == 1) {
                if (item.unpaid > 0) {
                    this.tipsParam.show = true;
                    this.tipsParam.name = this.$t('static.not_settle');
                    this.tipsParam.alert = true;
                    this.disposeParam.show = false;
                } else {
                    this.disposeParam.tips = "买家已收货，请确认订单是否完成！";
                    this.disposeParam.estimate = true;
                }
            }
            if (item.orderStatus == 70 && item.type == 1) {
                this.disposeParam.tips = this.$t('static.order_over');
            }
            this.disposeParam.callback = this.orderBack;
        },
        addContract: function(contract) {
            this.contractParam = contract;
            this.contractParam.show = true;
            this.contractParam.callback = this.orderBack;
        },
        afterSales: function(sales) {
            this.applicationParam = sales;
            this.applicationParam.show = true;
            this.applicationParam.callback = this.orderBack;
        },
        orderBack: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.getEmpolyeeOrder(this.loadParam);
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
            this.loadParam.id = "";
            this.loadParam.no = "";
            this.loadParam.mode = "";
            this.loadParam.validate = "";
            this.loadParam.type = "";
            this.loadParam.clients = "";
            this.loadParam.payWay = "";
            this.loadParam.sample = "";
            this.getEmpolyeeOrder(this.loadParam);
        }
    },

    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getEmpolyeeOrder(this.loadParam);
        }
    },
    filter: (filter, {}),
    ready() {
        common('tab', 'table_box', 1);
    },
    created() {
        changeMenu(this.$store.state.table.isTop, this.getEmpolyeeOrder, this.loadParam, localStorage.myOrderParam);
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

#table_box table th,
#table_box table td {
    width: 95px;
    min-width: 94px;
}

.order_pagination {
    text-align: center;
}

.api {
    color: #3399ff;
}
</style>
