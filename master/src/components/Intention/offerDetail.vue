<template>
    <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
    <offer-accept :param="offerAcceptParam" v-if="offerAcceptParam.show"></offer-accept>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <div>
        <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog" @click="param.show=false"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click.stop="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="cover_loading">
                <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <div class="client_nav">
                <nav class="navbar navbar-client" role="navigation">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                            <span class="navbar-brand navbar-name" href=""></span>
                        </div>
                    </div>
                </nav>
            </div>
            <section>
                <div class="client-section clearfix">
                    <div class="col-md-12">
                        <!-- 采购单交易员信息 -->
                        <h4 class="section_title">采购单交易员基本信息</h4>
                        <div class="panel panel-default" style="border:none">
                            <ul class="clearfix" style="font-size: 14px;padding:5px 0">
                                <label class="col-md-3 col-sm-4 col-xs-6">
                                    交易员姓名：{{initIntentionOfferDetail.intention.employeeName}}
                                </label>
                                <label class="col-md-3 col-sm-4 col-xs-6">
                                    采购单ID：{{initIntentionOfferDetail.intention.indentId}}
                                </label>
                                <label class="col-md-3 col-sm-4 col-xs-6">
                                    意向ID：{{initIntentionOfferDetail.intention.id}}
                                </label>
                                
                                <!-- <label class="col-md-3 col-sm-4 col-xs-6">
                                    交易员联系方式：{{initIntentionOfferDetail.intention.breedName}}
                                </label> -->
                            </ul>
                        </div>
                        <!-- 意向信息 -->
                        <h4 class="section_title">意向信息</h4>
                        <div class="panel panel-default" style="border:none">
                            <table class="table table-hover table_color table-striped " v-cloak>
                                <thead>
                                    <tr>
                                        <th>客户ID</th>
                                        <th>客户名称</th>
                                        <th>客户归属业务员</th>
                                        <th>意向类型</th>
                                        <th>品种</th>
                                        <th>数量</th>
                                        <th>单价</th>
                                        <th>付款方式</th>
                                        <th>产地</th>
                                        <th>规格</th>
                                        <th>上架状态</th>
                                        <th>报价人数</th>
                                        <th>上架时间</th>
                                        <th>过期时间</th>
                                        <th>备注说明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{initIntentionOfferDetail.intention.customerId}}</td>
                                        <td>{{initIntentionOfferDetail.intention.customerName}}</td>
                                        <td>{{initIntentionOfferDetail.intention.employeeName}}</td>
                                        <td>
                                            {{initIntentionOfferDetail.intention.type | intentionType initIntentionOfferDetail.intention.especial initIntentionOfferDetail.intention.preSell}}
                                        </td>
                                        <td>{{initIntentionOfferDetail.intention.breedName}}</td>
                                        <td>{{initIntentionOfferDetail.intention.number}}{{initIntentionOfferDetail.intention.unit | Unit}}</td>
                                        <td>{{initIntentionOfferDetail.intention.price}}</td>
                                        <td>{{initIntentionOfferDetail.intention.paymentWay}}</td>
                                        <td>{{initIntentionOfferDetail.intention.location | province}}</td>
                                        <td>{{initIntentionOfferDetail.intention.spec}}</td>
                                        <td>{{initIntentionOfferDetail.intention.onSell | onsell}}</td>
                                        <td>{{initIntentionOfferDetail.offers.length}}</td>
                                        <td>{{initIntentionOfferDetail.intention.pubdate | date}}</td>
                                        <td>{{initIntentionOfferDetail.intention.duedate | date}}</td>
                                        <td>{{initIntentionOfferDetail.intention.description}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        <!-- 报价信息 -->
                        <div class="clear section_title">
                            <h4 class="pull-left">报价信息
                                <!-- <span v-if="initIntentionOfferDetail.offer.accept==0" class="warning">({{initIntentionOfferDetail.offer.accept | offerAccept}})</span>
                                <span v-if="initIntentionOfferDetail.offer.accept==1" class="success">({{initIntentionOfferDetail.offer.accept | offerAccept}})</span>
                                <span v-if="initIntentionOfferDetail.offer.accept==2 ||initIntentionOfferDetail.offer.accept==3" class="error">
                                ({{initIntentionOfferDetail.offer.accept | offerAccept}}：
                                    <Poptip placement="top" trigger="hover">
                                        <span>{{initIntentionOfferDetail.offer.comments | textDisplay '20'}}</span>
                                        <div class="api" slot="content">
                                            {{initIntentionOfferDetail.offer.comments}}
                                        </div>
                                    </Poptip>)
                                </span> -->
                            </h4>
                        </div>
                        <!-- 报价图片 -->
                        <div class="clearfix">
                            <div class="client-detailInfo col-md-9 col-xs-12">
                                <img v-for="item in initIntentionOfferDetail.offerFiles" :src="item" width="140px;" class="left" @click="clickBig(item)" />
                            </div>
                        </div>
                        <div class="panel panel-default" style="border:none">
                            <table class="table table-hover table_color table-striped " v-cloak>
                                <thead>
                                    <tr>
                                        <th>报价时间</th>
                                        <th>报价类型</th>
                                        <th>供应商名称</th>
                                        <th>供应商id</th>
                                        <th>品种</th>
                                        <th>规格</th>
                                        <th>产地</th>
                                        <th>数量</th>
                                        <th>价格</th>
                                        <th>备注</th>
                                        <th>是否采纳</th>
                                        <th>原因</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in initIntentionOfferDetail.offers" :style="{background:(item.id==param.id?'lightYellow':'')}">
                                        <td>{{item.otime | date}}</td>
                                        <td>{{item.type |offerType}}</td>
                                        <td>{{item.offerCustomerName}}</td>
                                        <td>{{item.offerCustomer}}</td>
                                        <td>{{item.breedName}}</td>
                                        <td>{{item.spec}}</td>
                                        <td>{{item.location | province}}</td>
                                        <td>{{item.number}}{{item.unit | Unit}}</td>
                                        <td>{{item.price}}</td>
                                        <td>
                                            <Poptip placement="top" trigger="hover">
                                                <span>{{item.description | textDisplay '10'}}</span>
                                                <div class="api" slot="content">
                                                    {{item.description}}
                                                </div>
                                            </Poptip>
                                        </td>
                                        <td>{{item.accept | offerAccept}}</td>
                                        <td>
                                            <Poptip placement="top" trigger="hover">
                                                <span>{{item.comments | textDisplay '10'}}</span>
                                                <div class="api" slot="content">
                                                    {{item.comments}}
                                                </div>
                                            </Poptip>
                                        </td>
                                        <td>
                                            <button type="botton" class="btn btn-primary btn-xs" @click="offerAccept(item)" v-if="param.idOrName&&(item.id==param.id)">       处理报价
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import tipsdialogModel from '../tips/tipDialog'
import offerAccept from '../purchaseOrder/offerAccept'
import pictureModel from '../tips/pictureDialog'
import filter from '../../filters/filters.js'
import {
    initIntentionOfferDetail
} from '../../vuex/getters'
import {
    getOfferDetail
} from '../../vuex/actions'
export default {
    components: {
        tipsdialogModel,
        offerAccept,
        pictureModel,
        filter
    },
    props: ['param'],
    data() {
        return {

            pictureParam: {
                show: false,
                img: ''
            },
            tipsParam: {
                show: false,
                name: '',
                alert: true
            },
            offerAcceptParam: {
                id: "",
                callback: this.acceptOfferBack,
                show: false
            },
        }
    },
    vuex: {
        getters: {
            initIntentionOfferDetail
        },
        actions: {
            getOfferDetail
        }
    },
    methods: {
        clickBig: function(img) {
            this.pictureParam.show = true;
            this.pictureParam.img = img;
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
            this.getOfferDetail(this.param);
        }
    },
    events: {

    },
    filter: (filter, {}),
    created() {
        this.getOfferDetail(this.param);
    }
}
</script>
<style scoped>
.top-title {
    position: fixed;
    z-index: 1088;
    width: 1000px;
    right: 0;
    left: 0;
}

.modal {
    z-index: 1082;
}

.modal_con {
    z-index: 1082;
    width: 1000px;
    overflow-y: auto;
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
table>thead>tr>th{
    font-weight: bold!important
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
    max-width: 500px;
    white-space: normal;
}

.success {
    color: #00cc66;
}

.warning {
    color: #ff9900;
}

.error {
    color: #ff3300;
}

.normal {
    color: #657180;
}
</style>
