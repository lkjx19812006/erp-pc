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
                        <!-- 报价信息 -->
                        <div class="clear section_title">
                            <h4 class="pull-left">报价信息
                                <span v-if="initIntentionOfferDetail.offer.accept==0" class="warning">({{initIntentionOfferDetail.offer.accept | offerAccept}})</span>
                                <span v-if="initIntentionOfferDetail.offer.accept==1" class="success">({{initIntentionOfferDetail.offer.accept | offerAccept}})</span>
                                <span v-if="initIntentionOfferDetail.offer.accept==2 ||initIntentionOfferDetail.offer.accept==3" class="error">
                                ({{initIntentionOfferDetail.offer.accept | offerAccept}}：
                                    <Poptip placement="top" trigger="hover">
                                        <span>{{initIntentionOfferDetail.offer.comments | textDisplay '20'}}</span>
                                        <div class="api" slot="content">
                                            {{initIntentionOfferDetail.offer.comments}}
                                        </div>
                                    </Poptip>)
                                </span>
                            </h4>
                            <button type="botton" class="btn btn-primary pull-right" @click="offerAccept(initIntentionOfferDetail.offer)">处理报价</button>
                        </div>
                        <!-- 报价图片 -->
                        <div class="clearfix">
                            <div class="client-detailInfo col-md-9 col-xs-12">
                                <img v-for="item in initIntentionOfferDetail.offerFiles" :src="item" width="140px;" class="left" @click="clickBig(item)" />
                            </div>
                        </div>
                        <div class="panel panel-default" style="border:none">
                            <ul class="clearfix" style="font-size: 14px;padding:5px 0">
                                <label class="col-md-3 col-sm-4 col-xs-6">报价时间：{{initIntentionOfferDetail.offer.otime | date}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">报价类型：{{initIntentionOfferDetail.offer.type |offerType}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6" v-if="!param.idOrName">
                                    供应商名称：{{initIntentionOfferDetail.offer.offerCustomerName}}
                                </label>
                                 <label class="col-md-3 col-sm-4 col-xs-6" v-else>
                                    供应商ID：{{initIntentionOfferDetail.offer.offerCustomer}}
                                </label>
                                <label class="col-md-3 col-sm-4 col-xs-6">品种：{{initIntentionOfferDetail.offer.breedName}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">规格：{{initIntentionOfferDetail.offer.spec}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">产地：{{initIntentionOfferDetail.offer.location | province}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">数量：{{initIntentionOfferDetail.offer.number}}{{initIntentionOfferDetail.offer.unit | Unit}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">价格：{{initIntentionOfferDetail.offer.price}}</label>
                                <!-- 新增产品信息和价格信息 -->
                                <label class="col-md-3 col-sm-4 col-xs-6">产品信息：{{initIntentionOfferDetail.offer.quality}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">价格信息：{{initIntentionOfferDetail.offer.priceDescription}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">备注：
                                    <Poptip placement="top" trigger="hover">
                                        <span>{{initIntentionOfferDetail.offer.description | textDisplay '10'}}</span>
                                        <div class="api" slot="content">
                                            {{initIntentionOfferDetail.offer.description}}
                                        </div>
                                    </Poptip>
                                </label>
                                <label class="col-md-3 col-sm-4 col-xs-6">是否采纳：{{initIntentionOfferDetail.offer.accept | offerAccept}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">原因：
                                    <Poptip placement="top" trigger="hover">
                                        <span>{{initIntentionOfferDetail.offer.comments | textDisplay '10'}}</span>
                                        <div class="api" slot="content">
                                            {{initIntentionOfferDetail.offer.comments}}
                                        </div>
                                    </Poptip>
                                </label>
                            </ul>
                        </div>
                        <!-- 意向信息 -->
                        <h4 class="section_title">意向信息</h4>
                        <div class="panel panel-default" style="border:none">
                            <ul class="clearfix" style="font-size: 14px;padding:5px 0">
                                <label class="col-md-3 col-sm-4 col-xs-6" v-if="!param.idOrName">
                                    客户ID：{{initIntentionOfferDetail.intention.customerId}}
                                </label>
                                <label class="col-md-3 col-sm-4 col-xs-6" v-else>
                                    客户名称：{{initIntentionOfferDetail.intention.customerName}}
                                </label>
                                <label class="col-md-3 col-sm-4 col-xs-6">客户归属业务员：{{initIntentionOfferDetail.intention.employeeName}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">意向类型：{{initIntentionOfferDetail.intention.type | intentionType initIntentionOfferDetail.intention.especial initIntentionOfferDetail.intention.preSell}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">品种：{{initIntentionOfferDetail.intention.breedName}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">规格：{{initIntentionOfferDetail.intention.spec}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">产地：{{initIntentionOfferDetail.intention.location | province}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">数量：{{initIntentionOfferDetail.intention.number}}{{initIntentionOfferDetail.intention.unit | Unit}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">价格：{{initIntentionOfferDetail.intention.price}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">付款方式：{{initIntentionOfferDetail.intention.paymentWay}}</label>
                                <label class="col-md-3 col-sm-4 col-xs-6">上下架：{{initIntentionOfferDetail.intention.onSell | onsell}}
                                </label>
                                <label class="col-md-3 col-sm-4 col-xs-6">发布时间：{{initIntentionOfferDetail.intention.pubdate | date}}
                                </label>
                                <label class="col-md-3 col-sm-4 col-xs-6">过期时间：{{initIntentionOfferDetail.intention.duedate | date}}
                                </label>
                                <label class="col-md-3 col-sm-4 col-xs-6">备注说明：{{initIntentionOfferDetail.intention.description}}</label>
                            </ul>
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
    width: 60%;
    right: 0;
    left: 0;
}

.modal {
    z-index: 1082;
}

.modal_con {
    z-index: 1082;
    width: 60%;
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
