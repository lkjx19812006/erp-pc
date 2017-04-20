<template>
    <div>
        <cart-model :param="orderParam" v-if="orderParam.show"></cart-model>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
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
                        <h4 class="section_title">基本信息</h4>
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
                                <label class="col-md-3 col-sm-4 col-xs-6">省市：{{initClientDetail.provinceName}}{{initClientDetail.cityName}}</label>
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
                                                            <table class="table table-hover table_color table-striped" style="width:80%;float:right;border-top:1px soild red">
                                                                <thead>
                                                                    <th></th>
                                                                    <th>业务员</th>
                                                                    <th>单价</th>
                                                                    <th>数量</th>
                                                                    <th>单位</th>
                                                                    <th>备注</th>
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
                                                                        <td>{{offer.employeeName}}</td>
                                                                        <td>{{offer.price}}元</td>
                                                                        <td>{{offer.number}}</td>
                                                                        <td>{{offer.unit | Unit}}</td>
                                                                        <td>{{offer.comments}}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                        <!-- 意向信息 -->
                                                        <td v-if="!item.purchaseOffer">{{item.breedName}}</td>
                                                        <td v-if="!item.purchaseOffer">{{item.number}}{{item.unit | Unit}}</td>
                                                        <td v-if="!item.purchaseOffer">{{item.location}}</td>
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
        cartModel,
        tipsdialogModel,
        pressImage,
        filter,
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
            }

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
                this.getIntentionDetail(this.intentionParam);
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
                            unit: offer.unit
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
                        unit: offer.unit
                    });
                }
            }
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
        callback: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.name = name;
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
</style>
