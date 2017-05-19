<!-- 查看外部报价 -->
<template>
    <tipdialog-model :param="tipParam" v-if="tipParam.show"></tipdialog-model>
    <editoffer-model :param="editOfferParam" v-if="editOfferParam.show"></editoffer-model>
    <div id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div id="scroll" class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>外部报价列表</h3>
        </div>
        <validator name="validation">
            <div class="edit-model">
                <!--<div class="cover_loading">-->
                <!--<pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>-->
                <!--</div>-->
                <section class="editsection" v-cloak>
                    <input type="hidden" class="form-control edit-input" value="{{param.id}}" />
                    <div style="margin-top:25px">
                        <h4 style="display:inline"></h4>
                    </div>
                    <table class="table table-hover table_color table-striped ">
                        <thead>
                            <tr>
                                <th>{{$t('static.quoted_price')}}</th>
                                <th>{{$t('static.unit')}}</th>
                                <th>{{$t('static.quantity')}}（{{$t('static.unit')}}）</th>
                                <th>{{$t('static.quatation_name')}}</th>
                                <th>{{$t('static.comment')}}</th>
                                <th>{{$t('static.create_time')}}</th>
                                <th>采纳报价</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in initOuterOfferList">
                                <td>{{item.price}}</td>
                                <td>{{item.unit | Unit}}</td>
                                <td>{{item.number}}（{{item.unit | Unit}}）</td>
                                <td>{{item.offerName}}</td>
                                <td>{{item.description}}</td>
                                <td>{{item.ctime}}</td>
                                <!-- 采纳此报价，会打开编辑国际报价页面 -->
                                <td v-if="param.item.inquire!=3">
                                    <span v-if="item.accept==1">已采纳</span>
                                    <span v-else><a @click="acceptOffer(item)">采纳</a></span>
                                </td>
                                <td v-if="param.item.inquire==3">
                                    <span v-if="item.accept==1" style="color:red">已采纳</span>
                                    <span v-else>未采纳</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
            <div class="edit_footer">
                <button type="button" class="btn  btn-confirm" @click="param.show = false">{{$t('static.confirm')}}</button>
            </div>
        </validator>
    </div>
</template>
<script>
import tipdialogModel from '../tips/tipDialog'
import editofferModel from './editOffer'

import {
    initOuterOfferList
} from '../../vuex/getters'
import {
    getOuterOffer
} from '../../vuex/actions'
export default {
    components: {
        tipdialogModel,
        editofferModel
    },
    props: ['param'],
    data() {
        return {
            tipParam: {
                show: false,
                name: '',
                alert: true
            },
            editOfferParam: {
                show: false,
                link: '/intlIntention/itemOffer',
                id: '',
                intentionId: '',
                intentionOfferId: '',
                inquireId: '',
                type: 0,
                currency: 1,
                origCurrency: 1,
                itemId: '',
                itemName: '',
                origPrice: '',
                supplierName: '',
                exchangeRate: '',
                supplier: '',
                product: '',
                price: '',
                number: '',
                unit: '',
                total: '',
                comment: '',
                breedId: '',
                offererName: '',
                getIntentionDetail: '' //获取意向详情的函数
            },

        }
    },
    vuex: {
        getters: {
            initOuterOfferList
        },
        actions: {
            getOuterOffer

        }
    },
    methods: {
        //采纳报价
        acceptOffer: function(outerOffer) {
            console.log(outerOffer);
            let item = this.param.item; //条目信息，outerOffer是外部报价信息
            this.editOfferParam.show = true;
            this.editOfferParam.id = item.offerId;
            this.editOfferParam.intentionId = item.intentionId;
            this.editOfferParam.inquireId = item.inquireId;
            this.editOfferParam.breedId = item.breedId;
            this.editOfferParam.itemId = item.id;
            this.editOfferParam.itemName = item.breedName;
            if (item.type == 1) { //0,表示原材料，1表示提取物（这两个type的意义不一样）
                this.editOfferParam.type = 2; //2表示提取物
            } else {
                this.editOfferParam.type = 0; //0表示原材料报价
            }
            this.editOfferParam.currency = item.offerCurrency;

            this.editOfferParam.price = item.offerPrice;
            this.editOfferParam.number = item.number;
            this.editOfferParam.unit = item.unit;
            this.editOfferParam.offerEUnit = item.offerEUnit;

            this.editOfferParam.comment = item.offerComment;
            this.editOfferParam.origCurrency = item.origCurrency;
            this.editOfferParam.exchangeRate = item.exchangeRate;
            this.editOfferParam.offererName = this.$store.state.table.login.name;

            //供应商信息和成本价来源于外部报价
            if (outerOffer.customerId) {
                this.editOfferParam.supplier = outerOffer.customerId;
            } else {
                this.editOfferParam.supplier = -1;
            }
            this.editOfferParam.supplierName = outerOffer.offerName;
            this.editOfferParam.origPrice = outerOffer.price;
            this.editOfferParam.intentionOfferId = outerOffer.id;
            //还要传一个外部报价的ID，待定

            this.editOfferParam.callback = this.offerCallback;

        },
        offerCallback: function(title) {
            this.tipParam.name = title;
            this.tipParam.show = true;
            this.getOuterOffer(this.param);
        },


    },
    events: {

    },
    created() {

        this.getOuterOffer(this.param);

    }
}
</script>
<style scoped>
.modal {
    z-index: 1082
}

.modal_con {
    z-index: 1082
}

.edit-model {
    padding: 10px 30px 80px 30px;
}

.top-title {
    position: absolute;
    top: 0;
    right: 0;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.editsection {
    width: 100%;
    box-sizing: border-box;
}

.editpage {
    display: -webkit-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -ms-box-orient: horizontal;
    box-orient: horizontal;
}

.editpageleft,
.editpageright {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    width: 50%;
}

.editpagecenter {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    width: 100%;
}

.editpage-input {
    margin-top: 15px;
}

.edit-input {
    height: 36px;
    width: 90%;
    border: 1px solid #ddd;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.edit-input:focus {
    border-color: #fa6705;
}

.addblack span {
    color: #333;
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
}

.edit_footer {
    border-top: 1px solid #ddd;
    text-align: right;
    padding: 10px 20px;
    /*  margin-top: 50px; */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    width: 800px;
    background: #fff;
    margin: auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.edit_footer button {
    margin-left: 15px;
}

.btn-confirm {
    background-color: #fa6705;
    color: #fff;
}

.btn-close {
    color: #fa6705;
}

.editpage_img {
    width: 90%;
}

.editpage_img img {
    display: inline-block;
    background: #ccc;
}

.editpage-image {
    display: inline-block;
}

.table {
    display: table;
}

a {
    cursor: pointer;
}
</style>
