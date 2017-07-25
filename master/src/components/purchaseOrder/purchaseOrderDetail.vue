<template>
    <div>
        <cart-model :param="orderParam" v-if="orderParam.show"></cart-model>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <audit-dialog :param="auditParam" v-if="auditParam.show"></audit-dialog>
        <offer-accept :param="offerAcceptParam" v-if="offerAcceptParam.show"></offer-accept>
        <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
        <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
        <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
        <offer-audit :param="auditingData" v-if="auditingData.show"></offer-audit>
        <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog" @click="param.show=false"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click.stop="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="cover_loading">
                <pulse-loader :loading="param.loading||intentionParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <div class="client_nav">
                <nav class="navbar navbar-client" role="navigation">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                            <span class="navbar-brand navbar-name" href="#">{{initPurchaseDetail.customerName}}</span>
                        </div>
                    </div>
                </nav>
            </div>
            <section>
                <div class="client-section clearfix">
                    <div class="col-md-12">
                        <!-- 客户信息 -->
                        <!-- <h4 class="section_title">基本信息</h4>
                        <div class="panel panel-default" style="border:none">
                            <ul class="clearfix" style="font-size: 14px;padding:5px 0">
                                <label class="col-md-3 col-sm-4 col-xs-6">姓名：{{initClientDetail.name}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">类型：{{initClientDetail.type |customerType}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">是否供应商：
                                    <span v-if="initClientDetail.supplier==0">否</span>
                                    <span v-if="initClientDetail.supplier==1">是</span>
                                </label>
                                <label class="col-md-3 col-sm-4 col-xs-6">分类：{{initClientDetail.classify | classify}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">手机号：{{initClientDetail.mainPhone}}
                                    <span v-if="initClientDetail.phoneProvince!=''||initClientDetail.phoneCity!=''">
                                        （{{initClientDetail.phoneProvince}}{{initClientDetail.phoneCity}}）
                                    </span>
                                </label>
                                <label class="col-md-3 col-sm-4 col-xs-6">电话：{{initClientDetail.tel}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">邮箱：{{initClientDetail.email}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">邮编：{{initClientDetail.number}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">交货地：{{initClientDetail.provinceName}}{{initClientDetail.cityName}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6" style="white-space: pre-wrap">付款方式：{{initPurchaseDetail.intentionList.arr[0].paymentWay}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6" style="white-space: pre-wrap">备注：{{initPurchaseDetail.comment}}</label>
                            </ul>
                        </div> -->
                        <!-- 采购单的基本信息 -->
                        <h4 class="section_title">基本信息</h4>
                        <div class="panel panel-default" style="border:none">
                            <ul class="clearfix" style="font-size: 14px;padding:5px 0">
                                <label class="col-md-6 col-sm-6 col-xs-6">
                                    <span class="title_layout"><Icon type="person-stalker" class="icon_s"></Icon>姓名</span>
                                    <span class="f_weight">：{{initPurchaseDetail.customerName}}({{initPurchaseDetail.customerPhone}})</span>
                                </label>
                                <!-- <label class="col-md-6 col-sm-6 col-xs-6">
                                    <span class="title_layout"><Icon type="iphone" class="icon_s"></Icon>手机号</span>
                                    <span class="f_weight">：{{initPurchaseDetail.customerPhone}}</span>
                                </label> -->
                                <label class="col-md-12 col-sm-12 col-xs-12">
                                    <span class="title_layout"><Icon type="location" class="icon_s"></Icon>交货地</span>
                                    <span class="f_weight">：{{initPurchaseDetail.provinceName}}{{initPurchaseDetail.cityName}}{{initPurchaseDetail.districtName}}</span>
                                </label>
                                
                                <label class="col-md-12 col-sm-12col-xs-12">
                                    <span class="title_layout"><Icon type="social-yen" class="icon_s"></Icon>付款方式</span>
                                    <span class="f_weight">：{{initPurchaseDetail.paymentWay}}</span>
                                </label>
                                <label class="col-md-12 col-sm-12 col-xs-12">
                                    <span class="title_layout"><Icon type="ios-time" class="icon_s"></Icon>过期时间</span>
                                    <span class="f_weight">：{{initPurchaseDetail.duedate}}</span>
                                </label>
                                <label class="col-md-12 col-sm-12 col-xs-12">
                                    <span class="title_layout"><Icon type="information-circled" class="icon_s"></Icon>备注</span>
                                    <span class="f_weight">：{{initPurchaseDetail.comment}}</span>
                                </label>
                                 
                            </ul>
                        </div>

                        <!-- 其他信息 -->
                        <!-- <h4 class="section_title">其他</h4>
                        <div class="panel panel-default" style="border:none">
                            <ul class="clearfix" style="font-size: 14px;padding:5px 0">
                                <label class="col-md-3 col-sm-4 col-xs-6">姓名：</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">类型：</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">手机号：</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">国家</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">省</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">市</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">详细地址</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">经营范围</label>
                            </ul>
                        </div> -->
                        <article>
                            <div class="btn-group">
                                <button type="button" class="btn btn-default" style="width:100px" v-bind:class="{ 'btn-warning': intentionOrOffer===0}" @click="clickType(0)">
                                    意向信息
                                </button>
                                <button type="button" class="btn btn-default" style="width:100px" v-bind:class="{ 'btn-warning': intentionOrOffer===1}" @click="clickType(1)">
                                    报价信息
                                </button>
                            </div>
                            <div class="panel-group">
                                <!-- 意向列表 -->
                                <div v-show="intentionOrOffer === 0" class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click.stop="enfoldment({
                                                link:initPurchaseDetail.intentionList,
                                                crete:'intentionList'
                                                })">
                                          <img class="pull-left" src="/static/images/contact.png" height="32" width="27"/>
                                          <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                            求购意向信息（{{initPurchaseDetail.intentionList.arr.length}}）
                                          </a>
                                          <span style="color:red">小提示：同一意向只能选择一条报价信息</span>
                                          <button type="button" class="btn btn-base pull-right" @click.stop="openGoodsList()">购物车({{orderParam.goods.length}})</button>
                                        </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="!initPurchaseDetail.intentionList.show&&initPurchaseDetail.intentionList.arr.length>0">
                                        <div class="panel-body panel-set">
                                            <table class="table  contactSet">
                                                <thead>
                                                    <th>品种</th>
                                                    <th>数量</th>
                                                    <th>产地</th>
                                                    <th>规格</th>
                                                    <th>质量要求</th>
                                                    <th>竞争性指标</th>
                                                    <th>报价人数</th>
                                                    <th>报价信息</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(index,item) in initPurchaseDetail.intentionList.arr">
                                                        <!-- 关于意向的报价信息 -->
                                                        <td v-if="item.purchaseOffer" colspan="8">
                                                            <table class="table table-hover table_color table-striped" style="width:95%;float:right;border-top:1px soild red">
                                                                <thead>
                                                                    <th></th>
                                                                    <th>报价时间</th>
                                                                    <th>报价类型</th>
                                                                    <th>供应商名称</th>
                                                                    <th>供应商ID</th>
                                                                    <th>报价业务员</th>
                                                                    <th>所属部门</th>
                                                                    <th>品种</th>
                                                                    <th>规格</th>
                                                                    <th>产地</th>
                                                                    <th>数量</th>
                                                                    <th>价格</th>
                                                                    <th>备注</th>
                                                                    <th>是否采纳</th>
                                                                    <th>原因</th>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="(sub,offer) in item.offers.arr">
                                                                        <td>
                                                                            <!-- <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!offer.checked,'checkbox_select':offer.checked}" id="client_ids" @click="selectOfferInfo(index,sub)">
                                                                            </label> -->
                                                                            <span v-if="!offer.checked">
                                                                                <a id="add-in" @click="selectOfferInfo(index,sub)">
                                                                                    加入购物车
                                                                                </a>
                                                                            </span>
                                                                            <span v-if="offer.checked">
                                                                                <a id="remove-out" @click="selectOfferInfo(index,sub)">
                                                                                    移出购物车
                                                                                </a>
                                                                                (已加入)
                                                                            </span>
                                                                        </td>
                                                                        <td>{{offer.otime | date}}</td>
                                                                        <td>
                                                                            {{offer.source | offerType}}
                                                                        </td>
                                                                        <td>{{offer.offerCustomerName}}</td>
                                                                        <td>{{offer.offerCustomer}}</td>
                                                                        <td>{{offer.offerEmployeeName}}</td>
                                                                        <td>{{offer.offerOrgName}}</td>
                                                                        <td>{{offer.breedName}}</td>
                                                                        <td>{{offer.spec}}</td>
                                                                        <td>{{offer.location | province}}</td>
                                                                        <td>{{offer.number}}{{offer.unit | Unit}}</td>
                                                                        <td>{{offer.price}}</td>
                                                                        <td>
                                                                            <Poptip placement="top" trigger="hover">
                                                                                <span>{{offer.description | textDisplay '5'}}</span>
                                                                                <div class="api" slot="content">
                                                                                    {{offer.description}}
                                                                                </div>
                                                                            </Poptip>
                                                                        </td>
                                                                        <td>
                                                                            {{offer.accept | offerAccept}}
                                                                        </td>
                                                                        <td>
                                                                            <Poptip placement="top" trigger="hover">
                                                                                <span>{{offer.comments | textDisplay '5'}}</span>
                                                                                <div class="api" slot="content">
                                                                                    {{offer.comments}}
                                                                                </div>
                                                                            </Poptip>
                                                                        </td>
                                                                        <!-- <td><a href="javascript:void(0)" @click="editDes(index,sub,offer)">备注</a></td> -->
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                        <!-- 意向信息 -->
                                                        <td v-if="!item.purchaseOffer">{{item.breedName}}</td>
                                                        <td v-if="!item.purchaseOffer">{{item.number}}{{item.unit | Unit}}</td>
                                                        <td v-if="!item.purchaseOffer">{{item.location | province}}</td>
                                                        <td v-if="!item.purchaseOffer">{{item.spec}}</td>
                                                        <td v-if="!item.purchaseOffer">{{item.quality}}</td>
                                                        <td v-if="!item.purchaseOffer">{{item.mainStandard}}</td>
                                                        <td v-if="!item.purchaseOffer">{{item.offerNumber}}</td>
                                                        <td v-if="!item.purchaseOffer"><a @click="getIntentionInfo(item.id,$index)">报价信息</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <!-- 报价列表 -->
                                <div v-show="intentionOrOffer === 1" class="panel panel-default">
                                    <div class="clear" style="margin:5px">
                                        <dt class="left transfer marg_top">报价业务员：</dt>
                                        <dd class="left margin_right">
                                            <input type="text" class="form-control" v-model="indentOfferParam.offerEmployeeName" placeholder="按回车键搜索" @click="selectEmployee()" readonly="readonly" style="width: 100px;">
                                        </dd>
                                        <dt class="left transfer marg_top">品种：</dt>
                                        <dd class="left margin_right">
                                            <input type="text" class="form-control" v-model="indentOfferParam.breedName" placeholder="按回车键搜索" @click="breedSearch()" readonly="readonly" style="width: 100px;">
                                        </dd>
                                        <dt class="left transfer marg_top">报价来源：</dt>
                                        <dd class="left margin_right">
                                            <select type="text" class="form-control" v-model="indentOfferParam.source" @change="selectSearch()" style="width: 100px;">
                                                <option value="">全部</option>
                                                <option value="0">业务员</option>
                                                <option value="1">客户</option>
                                            </select>
                                        </dd>
                                        <dt class="left transfer marg_top">审核状态：</dt>
                                        <dd class="left margin_right">
                                            <select type="text" class="form-control" v-model="indentOfferParam.validate" @change="selectSearch()" style="width: 100px;">
                                                <option value="">全部</option>
                                                <option value="0">未审核</option>
                                                <option value="1">审核中</option>
                                                <option value="2">审核通过</option>
                                                <option value="3">审核不通过</option>
                                            </select>
                                        </dd>
                                        <div class="btn-group" style="margin-left:10px">
                                            <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': this.indentOfferParam.accept===''}" @click="clickAccept('')">
                                                全部
                                            </button>
                                            <button type="button" class="btn btn-default" style="width:75px" v-bind:class="{ 'btn-warning': this.indentOfferParam.accept==='0'}" @click="clickAccept('0')">
                                                未处理
                                            </button>
                                            <button type="button" class="btn btn-default" style="width:75px" v-bind:class="{ 'btn-warning': this.indentOfferParam.accept==='1'}" @click="clickAccept('1')">
                                                已接受
                                            </button>
                                            <button type="button" class="btn btn-default" style="width:75px" v-bind:class="{ 'btn-warning': this.indentOfferParam.accept==='2'}" @click="clickAccept('2')">
                                                已拒绝
                                            </button>
                                            <button type="button" class="btn btn-default" style="width:75px" v-bind:class="{ 'btn-warning': this.indentOfferParam.accept==='3'}" @click="clickAccept('3')">
                                                待采用
                                            </button>
                                        </div>
                                        <button type="button" class="btn btn-primary" style="width:75px" @click="resetCondition()">
                                            清空条件
                                        </button>
                                    </div>
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix">
                                          <img class="pull-left" src="/static/images/contact.png" height="32" width="27"/>
                                          <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                            报价信息（{{initIndentOfferList.length}}）
                                          </a>
                                          <span class="right">
                                            <Checkbox :checked='selectAll' @click.prevent="checkAll()">全选</Checkbox>
                                            <button class="btn btn-success" @click="auditing()">审核</button>
                                          </span>
                                          
                                        </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="initIndentOfferList.length>0">
                                        <div class="panel-body panel-set">
                                            <table class="table  contactSet">
                                                <thead>
                                                    <th style="width:30px;">勾选</th>
                                                    <th>报价时间</th>
                                                    <th>报价类型</th>
                                                    <th>供应商名称</th>
                                                    <th>报价业务员</th>
                                                    <th>品种</th>
                                                    <th>规格</th>
                                                    <th>产地</th>
                                                    <th>数量</th>
                                                    <th>价格</th>
                                                    <th>备注</th>
                                                    <th>审核状态</th>
                                                    <th>是否采纳</th>
                                                    <th>原因</th>
                                                    <th v-if="param.key=='myIndent'">报价处理</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(index,item) in initIndentOfferList">
                                                        <!-- 意向信息 -->
                                                        <td style="width:30px;">
                                                            <Checkbox @click="singleSelect(index,item)" :checked="item.checked"></Checkbox>

                                                        </td>
                                                        <td>{{item.otime | date}}</td>
                                                        <td>
                                                            {{item.source | offerType}}
                                                        </td>
                                                        <td>{{item.offerCustomerName}}</td>
                                                        <td>{{item.offerEmployeeName}}</td>
                                                        <td><a @click="clickOfferDetail(item.id)">{{item.breedName}}</a></td>
                                                        <td>{{item.spec}}</td>
                                                        <td>{{item.location | province}}</td>
                                                        <td>{{item.number}}{{item.unit | Unit}}</td>
                                                        <td>{{item.price}}</td>
                                                        <td>
                                                            <Poptip placement="top" trigger="hover">
                                                                <span>{{item.description | textDisplay '5'}}</span>
                                                                <div class="api" slot="content">
                                                                    {{item.description}}
                                                                </div>
                                                            </Poptip>
                                                        </td>
                                                        <td>{{item.validate | Audit}}</td>
                                                        <td>
                                                            {{item.accept | offerAccept}}
                                                        </td>
                                                        <td>
                                                            <Poptip placement="top" trigger="hover">
                                                                <span>{{item.comments | textDisplay '5'}}</span>
                                                                <div class="api" slot="content">
                                                                    {{item.comments}}
                                                                </div>
                                                            </Poptip>
                                                        </td>
                                                        <td v-if="param.key=='myIndent'">
                                                            <a @click="offerAccept(item)">处理</a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import cartModel from './purchaseOrderCart.vue'
import offerAudit from './offerAudit.vue'
import employeeModel from '../clientRelate/searchEmpInfo'
import breedsearchModel from '../intention/breedsearch'
import tipsdialogModel from '../tips/tipDialog'
import auditDialog from '../tips/auditDialog'
import offerAccept from '../purchaseOrder/offerAccept'
import detailModel from '../intention/offerDetail'
import pressImage from '../../components/imagePress'
import filter from '../../filters/filters.js'
import {
    initPurchaseDetail,
    initClientDetail,
    initIntentionDetail,
    initIndentOfferList

} from '../../vuex/getters'
import {
    getPurchaseOrderDetail,
    getClientDetail,
    getIntentionDetail,
    getOffersByIntentionId,
    getOffersByIndentId,
    editDescription,
    handleOfferAccept
} from '../../vuex/actions'
export default {
    components: {
        cartModel,
        employeeModel,
        breedsearchModel,
        tipsdialogModel,
        pressImage,
        auditDialog,
        detailModel,
        offerAccept,
        filter,
        offerAudit
    },
    props: ['param'],
    data() {
        return {
            intentionParam: {
                loading: false,
                id: "",
                offerId: "", //表示被选中的报价ID
                index: "",
                getOffers: this.getOffers
            },
            breedSearchParam: {
                show: false
            },
            employeeParam: {
                show: false,
                org: false,
                orgId: "",
                employeeId: '',
                employeeName: '',

            },
            indentOfferParam: {
                id: this.param.id,
                link: "/intention/offer/queryByIndentId",
                key: "indentOfferList",
                offerEmployee: "",
                offerEmployeeName: "",
                breedId: "",
                breedName: "",
                accept: "",
                source:"",
                validate:''
            },
            tipsParam: {
                show: false,
                name: '',
                alert: true
            },
            orderParam: { //生成订单的参数
                loading: false,
                show: false,
                link: '/intention/addSellOrderByOffer',
                callback: this.callback,
                customer: '', //客户ID
                customerName: '', //客户名称
                consignee: '', //收货人
                consigneeAddr: '', //收货地址
                consigneePhone: '', //收货人手机
                incidentals: '', //杂费
                incidentalsDesc: '', //杂费说明
                preferential: '', //优惠金额
                preferentialDesc: '', //优惠说明
                province: '',
                city: '',
                district: '',
                goods: [], //用于前端显示
                intentionOfferList: [] //传入后台，由goods生成
            },
            auditParam: {
                show: false,
                title: "编辑描述",
                confirm: true,
                id: '',
                description: '',
                auditComment: '',
                callback: this.editDescription,
                sub: '',
                index: ''
            },
            offerAcceptParam: {
                id: "",
                callback: this.acceptOfferBack,
                show: false

            },
            intentionOrOffer: 0, //0(意向列表)1(报价列表)
            detailParam: {
                show: false,
                loading: true,
                link: "/intention/offers/",
                id: "",
            },
            selectAll:false,
            auditingData:{
                show:false,
                validate:'',
                auditIds:[],
                comment:'',
                callback:this.auditCallback
            },
        }
    },
    vuex: {
        getters: {
            initPurchaseDetail,
            initClientDetail,
            initIntentionDetail,
            initIndentOfferList
        },
        actions: {
            getPurchaseOrderDetail,
            getClientDetail,
            getIntentionDetail,
            getOffersByIntentionId,
            getOffersByIndentId,
            editDescription,
            handleOfferAccept
        }
    },
    methods: {
        getIntentionInfo: function(id, index) {
            //如果是关闭，就不需要请求接口
            let arr = this.$store.state.table.purchaseDetail.intentionList.arr;
            if (arr[index].show) { //之前是打开状态，现在需要关闭
                arr.splice(index + 1, 1);
                arr[index].show = false;
            } else {

                this.intentionParam.id = id;
                this.intentionParam.index = index;
                //展开的时候需要知道里面哪条报价被选中了
                let goods = this.orderParam.goods; //购物车商品信息
                for (let i = 0; i < goods.length; i++) {
                    if (id == goods[i].intentionId) {
                        this.intentionParam.offerId = goods[i].offerId;
                        break;
                    }
                }
                //this.getIntentionDetail(this.intentionParam);
                this.getOffersByIntentionId(this.intentionParam);
            }
        },

        getOffers: function(index, data) { //可以打开多个意向的详情
            let arr = this.$store.state.table.purchaseDetail.intentionList.arr;
            if (!arr[index].purchaseOffer) {

                if (!arr[index].show) {
                    arr.push({});
                    for (let i = arr.length - 1; i > index + 1; i--) {
                        arr[i] = arr[i - 1];
                    }

                    //插入的数据
                    data.purchaseOffer = true;
                    arr[index + 1] = data;
                } else { //正常情况下，这一步不会执行
                    arr.splice(index + 1, 1);
                }
                arr[index].show = !arr[index].show;

            }

        },
        //选择报价用于生成订单,同时生成购物车（商品列表信息）
        selectOfferInfo: function(index, sub) {

            let intentionList = this.$store.state.table.purchaseDetail.intentionList.arr; //意向列表
            let offerList = intentionList[index].offers.arr; //报价列表
            let offer = offerList[sub]; //选中的报价
            let flag = !offer.checked;
            let goods = this.orderParam.goods; //购物车商品信息
            let isAdd = true; //是否需要往购物车中添加商品
            for (let i = 0; i < offerList.length; i++) {
                offerList[i].checked = false;
            }
            offer.checked = flag;
            //将选中报价信息加入购物车/替换商品信息/移出购物车
            if (!flag) { //从购物车中清除商品
                for (let k = 0; k < goods.length; k++) {
                    if (goods[k].intentionId == intentionList[index].id) {
                        goods.splice(k, 1);
                        return;
                    }
                }
            } else {

                for (let k = 0; k < goods.length; k++) {
                    if (goods[k].intentionId == intentionList[index].id) {
                        isAdd = false;
                        goods[k] = {
                            intentionId: intentionList[index].id,
                            offerId: offer.id,
                            breedName: offer.breedName,
                            breedId: offer.breedId,
                            number: offer.number,
                            price: offer.price,
                            unit: offer.unit,
                            spec: offer.spec,
                            location: offer.location
                        }
                        return;
                    }
                }
                if (isAdd) {
                    goods.push({
                        intentionId: intentionList[index].id,
                        offerId: offer.id,
                        breedName: offer.breedName,
                        breedId: offer.breedId,
                        number: offer.number,
                        price: offer.price,
                        unit: offer.unit,
                        spec: offer.spec,
                        location: offer.location
                    });
                }
            }
        },

        clickType: function(type) {
            this.intentionOrOffer = type;
        },
        clickAccept: function(accept) {
            this.indentOfferParam.accept = accept;
            this.selectSearch();
        },
        breedSearch: function() {
            this.breedSearchParam.show = true;
        },
        selectEmployee: function() {
            this.employeeParam.show = true;
        },
        selectSearch: function() {
            this.getOffersByIndentId(this.indentOfferParam);
        },
        resetCondition: function() {
            console.log(this.indentOfferParam.source)
            this.indentOfferParam.offerEmployee = "";
            this.indentOfferParam.offerEmployeeName = "";
            this.indentOfferParam.breedId = "";
            this.indentOfferParam.breedName = "";
            this.indentOfferParam.accept = ""
            this.indentOfferParam.source = ""
            this.selectSearch(this.indentOfferParam);
        },
        enfoldment: function(param) {

            if (this.$store.state.table.purchaseDetail[param.crete].arr.length == 0) {
                this.$store.state.table.purchaseDetail[param.crete].show = false
            }
            this.$store.state.table.purchaseDetail[param.crete].show = !this.$store.state.table.purchaseDetail[param.crete].show;
        },
        openGoodsList: function() {
            if (this.orderParam.goods.length <= 0) {
                this.tipsParam.show = true;
                this.tipsParam.name = "您的购物车空空如也!!!";
            } else {
                this.orderParam.customer = this.initPurchaseDetail.customerId;
                this.orderParam.customerName = this.initPurchaseDetail.customerName;
                this.orderParam.consignee = this.initPurchaseDetail.customerName;
                this.orderParam.consigneePhone = this.initPurchaseDetail.customerPhone;
                this.orderParam.consigneeAddr = '';
                this.orderParam.incidentals = 0;
                this.orderParam.incidentalsDesc = '';
                this.orderParam.preferential = 0;
                this.orderParam.preferentialDesc = '';
                this.orderParam.province = '';
                this.orderParam.city = '';
                this.orderParam.district = '';
                this.orderParam.show = true;
            }
        },
        singleSelect:function(index,item){
            this.$store.state.table.indentOfferList[index].checked = !this.$store.state.table.indentOfferList[index].checked;
            for(let i = 0;i<this.$store.state.table.indentOfferList.length;i++){//判断是否全部选择
                if(!this.$store.state.table.indentOfferList[i].checked){
                    this.selectAll = false
                    return
                }else{
                    this.selectAll = true
                }
            }
        },
        checkAll:function(){
            this.selectAll = !this.selectAll
            let _this = this
            if(this.selectAll){
                _this.auditingData.auditIds = []
                this.$store.state.table.indentOfferList.forEach(function(item){
                    item.checked = true
                })
            }else{
                _this.auditingData.auditIds = []    
                this.$store.state.table.indentOfferList.forEach(function(item){
                    item.checked = false
                })
            }
        },
        auditing:function(){
            this.auditingData.auditIds = []
            for(let i = 0;i<this.$store.state.table.indentOfferList.length;i++){
                if(this.$store.state.table.indentOfferList[i].checked){
                    this.auditingData.auditIds.push(this.$store.state.table.indentOfferList[i].id)

                }
            }
            if(this.auditingData.auditIds.length==0){
                this.tipsParam.name = '请至少选择一个报价列表'
                this.tipsParam.show = true
            }else{
                this.auditingData.show = true
            }
        },
        auditCallback:function(msg){
            this.selectSearch(this.indentOfferParam);
            this.tipsParam.name = msg
            this.tipsParam.show = true
        },
        callback: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.name = name;
            let _this = this;
            if (name == "success") {
                this.tipsParam.name = name + "，稍后将跳转到我的订单页面";
                setTimeout(function() {
                    _this.$router.go({ //成功后跳转到我的订单页面
                        path: 'order?id=0'
                    });
                }, 500);
            }
        },
        editDes: function(index, sub, offer) {
            this.auditParam.show = true;
            this.auditParam.auditComment = offer.description;
            this.auditParam.id = offer.id;
            this.auditParam.sub = sub;
            this.auditParam.index = index
        },
        offerAccept: function(item) {
            this.offerAcceptParam.id = item.id;
            this.offerAcceptParam.show = true;
        },

        //成功后回调
        acceptOfferBack: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.name = name;
            this.offerAcceptParam.show = false;
            this.getOffersByIndentId(this.indentOfferParam);
        },
        clickOfferDetail: function(id) {
            this.detailParam.show = true;
            this.detailParam.id = id;
        },

    },
    events: {
        breed: function(breed) {
            this.indentOfferParam.breedId = breed.breedId;
            this.indentOfferParam.breedName = breed.breedName;
            this.selectSearch();
        },
        a: function(employee) {
            this.indentOfferParam.offerEmployee = employee.employeeId;
            this.indentOfferParam.offerEmployeeName = employee.employeeName;
            this.selectSearch();
        },
    },
    filter: (filter, {}),
    created() {
        let clientParam = {
            id: this.param.customerId
        }
        this.getClientDetail(clientParam);
        this.getPurchaseOrderDetail(this.param);
        this.getOffersByIndentId(this.indentOfferParam);
    }
}
</script>
<style scoped>
.top-title {
    position: fixed;
    z-index: 1081;
    width: 1100px;
    right: 0;
    left: 0;
}

.modal {
    z-index: 1081;
}

.modal_con {
    z-index: 1081;
    width: 1120px;
}

.client_body {
    position: relative;
    background-color: #fff;
    padding: 20px;
}

.navbar-client {
    margin-bottom: 0;
    padding-top: 10px;
    background-color: #f5f5f5;
}

.navbar-img {
    float: left;
    margin-right: 10px;
}

.btn-base {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #003077;
    margin-right: 5px;
}

section {
    background-color: #fff;
}

section article {
    margin-top: 10px;
}

.client-section {
    padding: 10px 5px 40px 5px;
}

.contactSet thead {
    color: #fa6705;
}

.contact-view {
    color: #fa6705;
    margin-bottom: 0;
    cursor: pointer;
}

.table>tbody>tr>td,
.table>tbody>tr>th,
.table>tfoot>tr>td,
.table>tfoot>tr>th,
.table>thead>tr>td,
.table>thead>tr>th {
    text-align: center;
}
.icon_s{
    margin-right:5px;
}
.edit-detail {
    border: 1px solid #ddd;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    position: relative;
    padding: 10px;
}

.table {
    display: table;
}

.client-detailInfo {
    padding: 0 15px 14px 15px;
}

.client-detailInfo img {
    margin-right: 8px;
}

#add-in,
#remove-out {
    color: black;
}

#add-in:hover {
    color: #5cadff;
}

#remove-out:hover {
    color: red;
}

.api {
    color: #3399ff;
}
.f_weight{
    font-weight: normal
}
.title_layout{
    display: inline-block;
    width: 85px;
    text-align: left
}
.title_layout>Icon{
    text-align: left
}
</style>
