<template>
    <offer-model :param="offerParam" v-if="offerParam.show"></offer-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <my-offer :param="myOfferParam" v-if="myOfferParam.show"></my-offer>
    <div>
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
                            <span class="navbar-brand navbar-name" href="#"></span>
                        </div>
                    </div>
                </nav>
            </div>
            <section>
                <div class="client-section clearfix">
                    <div class="col-md-12">
                        <!-- 意向列表 -->
                        <article>
                            <div class="panel-group">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title clearfix" @click.stop="enfoldment({
                                                link:initPurchaseDetail.intentionList,
                                                crete:'intentionList'
                                                })">
                                          <img class="pull-left" src="/static/images/contact.png" height="32" width="27"/>
                                          <a data-toggle="collapse" data-parent="#accordion"  href="javascript:void(0)" class="panel-title-set">
                                            求购意向信息（{{initPurchaseDetail.intentionList.arr.length}}）
                                          </a>
                                        </h4>
                                    </div>
                                    <div class="panel-collapse" v-show="!initPurchaseDetail.intentionList.show&&initPurchaseDetail.intentionList.arr.length>0">
                                        <div class="panel-body panel-set">
                                            <table class="table  contactSet">
                                                <thead>
                                                    <th>品种</th>
                                                    <th>数量</th>
                                                    <th>单价</th>
                                                    <th>产地</th>
                                                    <th>规格</th>
                                                    <th>上架状态</th>
                                                    <th>报价人数</th>
                                                    <th>二维码</th>
                                                    <th>我的报价</th>
                                                    <th>报价</th>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in initPurchaseDetail.intentionList.arr">
                                                        <td v-if="item.purchaseOffer" colspan="7">
                                                            <table class="table table-hover table_color table-striped" style="width:80%;float:right;border-top:1px soild red">
                                                                <thead>
                                                                    <th>业务员</th>
                                                                    <th>单价</th>
                                                                    <th>数量</th>
                                                                    <th>单位</th>
                                                                    <th>杂费</th>
                                                                    <th>杂费说明</th>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="offer in item.offers.arr">
                                                                        <td>{{offer.employeeName}}</td>
                                                                        <td>{{offer.price}}元</td>
                                                                        <td>{{offer.number}}</td>
                                                                        <td>{{offer.unit | Unit}}</td>
                                                                        <td>{{offer.incidentals}}元</td>
                                                                        <td>{{offer.incidentalsDesc}}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                        <td v-if="!item.purchaseOffer">{{item.breedName}}</td>
                                                        <td v-if="!item.purchaseOffer">{{item.number}}{{item.unit | Unit}}</td>
                                                        <td v-if="!item.purchaseOffer">{{item.price}}元/{{item.unit | Unit}}</td>
                                                        <td v-if="!item.purchaseOffer">{{item.location | province}}</td>
                                                        <td v-if="!item.purchaseOffer">{{item.spec}}</td>
                                                        <td v-if="!item.purchaseOffer">{{item.onSell | onsell}}</td>
                                                        <td v-if="!item.purchaseOffer">{{item.offerNumber}}</td>
                                                        <td v-if="!item.purchaseOffer">
                                                            <erp-qrcode :id='item.id'></erp-qrcode>
                                                        </td>
                                                        <td v-if="!item.purchaseOffer">
                                                            <a @click="showMyOffer(item)">({{item.myOfferTotalToIndent}})</a>
                                                        </td>
                                                        <td v-if="!item.purchaseOffer">
                                                            <a @click="offer(item)" class="btn btn-success btn-xs">报价</a>
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
import myOffer from './myOffer.vue'
import offerModel from './offer.vue'
import tipsdialogModel from '../tips/tipDialog'
import pressImage from '../../components/imagePress'
import filter from '../../filters/filters.js'
import {
    initPurchaseDetail,
    initClientDetail,
    initIntentionDetail

} from '../../vuex/getters'
import {
    getPurchaseOrderDetail,
    getClientDetail,
    getIntentionDetail
} from '../../vuex/actions'
export default {
    components: {
        offerModel,
        tipsdialogModel,
        pressImage,
        filter,
        myOffer
    },
    props: ['param'],
    data() {
        return {
            intentionParam: {
                loading: false,
                id: "",
                index: "", //记录上一次点下的意向的下标
                getOffers: this.getOffers
            },
            offerParam: {
                show: false,
                link: "/intention/offer",
                callback: this.callback,
                breedId: "",
                breedName: "", //只展示
                intentionId: "",
                customerName: "",
                customerId: "",
                number: "",
                unit: "",
                price: "",
                quality: "",
                description: "",
                location: "",
                images: "",
            },
            myOfferParam:{
                show:false,
                id:'',
                breedId:''
            },
            tipsParam: {
                show: false,
                name: '',
                alert: true
            },
        }
    },
    vuex: {
        getters: {
            initPurchaseDetail,
            initClientDetail,
            initIntentionDetail
        },
        actions: {
            getPurchaseOrderDetail,
            getClientDetail,
            getIntentionDetail
        }
    },
    methods: {
        getIntentionInfo: function(id, index) {
            this.intentionParam.id = id;
            this.getIntentionDetail(this.intentionParam, id, index);
        },

        getOffers: function(id, index, data) {
            let arr = this.$store.state.table.purchaseDetail.intentionList.arr;
            if (this.intentionParam.index === "") { //如果之前没有插入
                this.intentionParam.index = index;
                arr.push({});
                for (let i = arr.length - 1; i > index + 1; i--) {
                    arr[i] = arr[i - 1];
                }
                //插入的数据
                data.purchaseOffer = true;
                arr[index + 1] = data;
            } else {
                if (index == this.intentionParam.index) { //如果现在插入的地方是前一次插入前的地方
                    arr.splice(this.intentionParam.index + 1, 1);
                    this.intentionParam.index = "";
                } else if (index < this.intentionParam.index) { //如果现在插入在前一次插入前之前的地方
                    arr.splice(this.intentionParam.index + 1, 1);
                    this.intentionParam.index = index;

                    arr.push({});
                    for (let i = arr.length - 1; i > index + 1; i--) {
                        arr[i] = arr[i - 1];
                    }
                    //插入的数据
                    data.purchaseOffer = true;
                    arr[index + 1] = data;
                } else if (index > this.intentionParam.index + 1) { //如果现在插入在前一次插入后之后的地方
                    arr.splice(this.intentionParam.index + 1, 1);
                    this.intentionParam.index = index - 1;
                    arr.push({});
                    for (let i = arr.length - 1; i > index; i--) {
                        arr[i] = arr[i - 1];
                    }
                    //插入的数据
                    data.purchaseOffer = true;
                    arr[index] = data;
                }
            }
        },

        enfoldment: function(param) {

            if (this.$store.state.table.purchaseDetail[param.crete].arr.length == 0) {
                this.$store.state.table.purchaseDetail[param.crete].show = false
            }
            this.$store.state.table.purchaseDetail[param.crete].show = !this.$store.state.table.purchaseDetail[param.crete].show;
        },
        offer: function(item) {
            this.offerParam.breedId = item.breedId;
            this.offerParam.breedName = item.breedName;
            this.offerParam.number = item.number;
            this.offerParam.unit = item.unit;
            this.offerParam.intentionId = item.id;
            this.offerParam.show = true;

        },
        showMyOffer:function(item){
            this.myOfferParam.show = true
            this.myOfferParam.breedId = item.breedId
            this.myOfferParam.id = this.param.id
        },
        callback: function(name) { //如无特殊情况，统一使用这个函数作为回调函数
            this.tipsParam.name = name;
            this.tipsParam.show = true;
            this.getPurchaseOrderDetail(this.param);
        }

    },
    filter: (filter, {}),
    created() {
        let clientParam = {
            id: this.param.customerId
        }
        this.getClientDetail(clientParam);
        this.getPurchaseOrderDetail(this.param);
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
    z-index: 1081;
}

.modal_con {
    z-index: 1081;
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
</style>
