<template>
    <div>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="edit-content">
                <h3>{{param.titles}}（退货涉及金额：{{total}}元）</h3>
                <div class="cover_loading">
                    <pulse-loader :loading="param.loading||afterSaleParam.loading" :color="color" :size="size"></pulse-loader>
                </div>
            </div>
            <validator name="validation">
                <table class="table table-hover table_color table-striped ">
                    <thead>
                        <tr>
                            <th>{{$t('static.breed')}}</th>
                            <th>{{$t('static.unit')}}</th>
                            <th>{{$t('static.price')}}</th>
                            <th>{{$t('static.quantity')}}</th>
                            <th>退/换货</th>
                            <th>操作</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in afterSaleParam.goods">
                            <td>{{item.breedName}}</td>
                            <td>{{item.unit | Unit}}</td>
                            <td>{{item.price}}</td>
                            <td>{{item.number}}</td>
                            <td>
                                <span v-if="item.type==0&&item.type!==''">换货</span>
                                <span v-if="item.type==1">退货</span>
                            </td>
                            <td>
                                <a v-if="goodsInfo.status==0" @click="showModifyGoods($index)">编辑</a>
                                <span v-else>编辑</span>
                            </td>
                            <td>
                                <a v-if="goodsInfo.status==0" @click="deleteGoods($index)">删除</a>
                                <span v-else>删除</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style="padding-left:25%">
                    <div v-if="goodsInfo.status==0" style="width:60%;font-size:14px;text-align:center;border:1px solid #AAAAAA;border-radius:5px;padding:5px 0" @click="showAddGoods()">{{$t('static.add_material_information')}}</div>
                </div>
                <validator name="inner">
                    <div v-if="goodsInfo.status == 1||goodsInfo.status == 2" class="editpage" style="border:1px solid #AAAAAA;padding:5px 10px;border-radius:5px;margin-top:25px">
                        <div class="col-md-12 clearfix">
                            <!-- 品种 -->
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.breed')}}
                                    <span class="system_danger" v-if="$inner.goods.required">{{$t('static.required')}}</span>
                                </label>
                                <input v-show="false" type="text" v-model="goodsInfo.id" v-validate:goods="{required:true}">
                                <select class="form-control edit-input" v-model="index" @change="selectGoods(index)">
                                    <option v-for="item in initOrderDetail.goods" value="{{$index}}">{{item.breedName}}</option>
                                </select>
                            </div>
                            <!-- 品种 -->
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.type')}}
                                    <span class="system_danger" v-if="$inner.type.required">{{$t('static.required')}}</span>
                                </label>
                                <input v-show="false" type="text" v-model="goodsInfo.type" v-validate:type="{required:true}">
                                <select class="form-control edit-input" v-model="goodsInfo.type">
                                    <option value="0">换货</option>
                                    <option value="1">退货</option>
                                </select>
                            </div>
                            <!-- 数量,必填至多两位小数 -->
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">{{$t('static.quantity')}}
                                    <span class="system_danger" v-if="$inner.number.required">
                                        {{$t('static.required')}}
                                    </span>
                                    <span class="system_danger" v-if="!$inner.number.required&&$inner.number.quantity">
                                        {{$t('static.two_decimal')}}
                                    </span>
                                    <span class="system_danger" v-if="goodsInfo.number>goodsInfo.maxNumber">
                                        数量超过商品数量
                                    </span>
                                </label>
                                <div style="clear:both;height:36px;">
                                    <div class="left" style="width:45%;">
                                        <input type="number" v-model="goodsInfo.number" class="form-control edit-input" v-validate:number="['required','quantity']" />
                                    </div>
                                    <div class="left" style="width:45%;">
                                        <input type="text" v-model="goodsInfo.unit | Unit" class="form-control edit-input" disabled="disabled" />
                                    </div>
                                </div>
                            </div>
                            <!-- 商品价格,必填至多两位小数 -->
                            <div class="editpage-input col-md-6">
                                <label class="editlabel">
                                    <span>{{$t('static.price')}}</span>
                                </label>
                                <div style="clear:both;height:36px;">
                                    <div class="left" style="width:45%;">
                                        <input type="number" v-model="goodsInfo.price" class="form-control edit-input" disabled="disabled" />
                                    </div>
                                    <div class="left" style="width:45%;">
                                        <input type="text" v-model="goodsInfo.unit | Unit" class="form-control edit-input" disabled="disabled" />
                                    </div>
                                </div>
                            </div>
                            <!-- 提交 -->
                            <div class="col-md-12" style="margin-top:10px;text-align:right">
                                <button type="button" class="btn btn-confirm" v-if="goodsInfo.status==1" @click="cancelAddGoods()">{{$t('static.cancel')}}
                                </button>
                                <button type="button" class="btn btn-confirm" v-if="goodsInfo.status==2" @click="cancelModifyGoods()">{{$t('static.cancel')}}</button>
                                <button type="button" class="btn btn-confirm" v-if="$inner.valid&&goodsInfo.number<=goodsInfo.maxNumber">
                                    <div v-if="goodsInfo.status==1" @click="addGoods()">{{$t('static.save')}}</div>
                                    <div v-if="goodsInfo.status==2" @click="modifyGoods()">{{$t('static.save')}}</div>
                                </button>
                                <button type="button" class="btn btn-confirm" v-else disabled="disabled">{{$t('static.save')}}</button>
                            </div>
                        </div>
                    </div>
                </validator>
                <div class="edit-model">
                    <section class="editsection clearfix" v-cloak>
                        <div class="editpage-input col-md-12">
                            <label class="editlabel">{{$t('static.upload_attachments')}}
                                <span class="system_danger" v-if="$validation.images.required">{{$t('static.required')}}</span>
                            </label>
                            <input type="text" v-show="false" v-model="afterSaleParam.images" v-validate:images="{required:true}">
                            <press-image :value.sync="afterSaleParam.images" :type="type" :param="imageParam"></press-image>
                        </div>
                        <div class="editpage-input col-md-12">
                            <label class="editlabel">{{$t('static.comment')}}</label>
                            <textarea v-model='afterSaleParam.comment' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;font-size: 13px;" rows="5"></textarea>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid&&goodsInfo.status==0&&afterSaleParam.goods.length>0" @click="confirm()">{{$t('static.confirm')}}</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.confirm')}}</button>
                </div>
            </validator>
        </div>
    </div>
</template>
<script>
import pressImage from '../../tools/upload/imagePressMul'
import util from '../../tools/util.js'
import tipsdialogModel from '../../tips/tipDialog'
import {
    initOrderDetail,
    initReceiptDetail
} from '../../../vuex/getters'
import {
    getOrderDetail,
    getReceiptDetail,
    afterSalesRequest,
    afterSalseEdit
} from '../../../vuex/actions'
export default {
    components: {
        pressImage,
        tipsdialogModel,
    },
    props: ['param'],
    data() {
        return {
            type: "",
            imageParam: {
                url: '/crm/api/v1/file/',
                qiniu: false
            },
            afterSaleParam: {
                loading: false,
                orderId: '',
                comment: '',
                images: '',
                goods: [], //前端展示的
                goodsBack: [], // 修改时用到，新建不需要
                itemList: [], //传入后台的
                link: '/order/flow/afterSales/request', //申请售后
                url: '', //编辑售后信息
                callback: ''
            },
            goodsInfo: {
                status: 0, //0初始,1添加,2修改
                goodsIndex: '', //这个goodsIndex表示添加的商品的索引是多少,与this.index对应，修改时要用它重置index
                index: '', //这个index表示商品在this.afterSaleParam.goods中的索引是多少，只有在编辑的时候用到
                id: '',
                breedName: '',
                unit: '',
                price: '',
                number: '', //退/换货的数量
                maxNumber: '', //原订单商品的数量，number的上限
                type: '' //0/1，换/退货

            },
            tipsParam: {
                show: false,
                alert: true,
                name: "",
            },
            index: '' //所选商品的当前下标


        }
    },
    vuex: {
        getters: {
            initOrderDetail,
            initReceiptDetail
        },
        actions: {
            getOrderDetail,
            getReceiptDetail,
            afterSalesRequest,
            afterSalseEdit
        }
    },
    computed: {
        total: function() {
            let total = 0;
            let goods = this.afterSaleParam.goods;
            for (let i = 0; i < goods.length; i++) {
                if (goods[i].type == 1) {
                    total = util.add(total, util.mul(goods[i].number, goods[i].price));
                }
            }
            return total;
        }
    },
    methods: {
        selectGoods: function(index) {
            let item = this.initOrderDetail.goods[index];
            this.goodsInfo.goodsIndex = index;
            this.goodsInfo.id = item.id;
            this.goodsInfo.breedName = item.breedName;
            this.goodsInfo.unit = item.unit;
            this.goodsInfo.price = item.price;
            this.goodsInfo.number = 0;
            this.goodsInfo.maxNumber = item.number;

        },
        showAddGoods: function() {
            //将index置空
            this.index = "";
            //goodsInfo内容清空，status置为1，
            this.goodsInfo.status = 1;
            this.goodsInfo.goodsIndex = '';
            this.goodsInfo.id = '';
            this.goodsInfo.breedName = '';
            this.goodsInfo.unit = '';
            this.goodsInfo.price = '';
            this.goodsInfo.number = '';
            this.goodsInfo.maxNumber = '';
            this.goodsInfo.type = '';
            this.afterSaleParam.goods.push({
                goodsIndex: '',
                id: '',
                breedName: '',
                unit: '',
                price: '',
                number: '',
                maxNumber: '',
                type: ''
            });
        },
        showModifyGoods: function(index) {
            let goods = this.afterSaleParam.goods[index];
            //因为在新增时，刚进入页面无法确认goodsIndex的值，所以需要去遍历订单中的商品，根据goodsId去设置goodsIndex的值
            if (goods.goodsIndex == '' && goods.goodsIndex !== 0) {
                for (let i = 0; i < this.initOrderDetail.goods.length; i++) {
                    if (goods.id == this.initOrderDetail.goods[i].id) {
                        goods.goodsIndex = i;
                        goods.maxNumber = this.initOrderDetail.goods[i].number;
                        goods.price = this.initOrderDetail.goods[i].price;
                        goods.unit = this.initOrderDetail.goods[i].unit;
                        break;
                    }
                }
            }
            //修改时需要将goodsIndex与this.index绑定
            this.index = goods.goodsIndex;
            //status置为2
            this.goodsInfo.status = 2;
            this.goodsInfo.index = index; //这样在确认修改时才能知道，修改的是哪一条记录
            this.goodsInfo.goodsIndex = goods.goodsIndex;
            this.goodsInfo.id = goods.id;
            this.goodsInfo.breedName = goods.breedName;
            this.goodsInfo.unit = goods.unit;
            this.goodsInfo.price = goods.price;
            this.goodsInfo.number = goods.number;
            this.goodsInfo.maxNumber = goods.maxNumber;
            this.goodsInfo.type = goods.type;

        },
        addGoods: function() {
            let repeation = this.checkRepeation(this.afterSaleParam.goods.length - 1);
            if (repeation) {
                this.tipsParam.show = true;
                this.tipsParam.name = "商品重复，请重新选择！";
                return;
            }
            let goods = this.afterSaleParam.goods[this.afterSaleParam.goods.length - 1];
            let goodsInfo = this.goodsInfo;
            goods.goodsIndex = goodsInfo.goodsIndex;
            goods.id = goodsInfo.id;
            goods.breedName = goodsInfo.breedName;
            goods.unit = goodsInfo.unit;
            goods.price = goodsInfo.price;
            goods.number = goodsInfo.number;
            goods.maxNumber = goodsInfo.maxNumber;
            goods.type = goodsInfo.type;
            //将status重新置为0
            goodsInfo.status = 0;

        },
        modifyGoods: function() {
            let repeation = this.checkRepeation(this.goodsInfo.index);
            if (repeation) {
                this.tipsParam.show = true;
                this.tipsParam.name = "商品重复，请重新选择！";
                return;
            }
            let goods = this.afterSaleParam.goods[this.goodsInfo.index];
            let goodsInfo = this.goodsInfo;
            goods.goodsIndex = goodsInfo.goodsIndex;
            goods.id = goodsInfo.id;
            goods.breedName = goodsInfo.breedName;
            goods.unit = goodsInfo.unit;
            goods.price = goodsInfo.price;
            goods.number = goodsInfo.number;
            goods.maxNumber = goodsInfo.maxNumber;
            goods.type = goodsInfo.type;
            //将status重新置为0
            goodsInfo.status = 0;
        },
        cancelAddGoods: function() {
            this.afterSaleParam.goods.pop();
            this.goodsInfo.status = 0;
        },
        cancelModifyGoods: function() {
            this.goodsInfo.status = 0;
        },
        deleteGoods: function(index) {
            this.afterSaleParam.goods.splice(index, 1);
        },
        //判断是否有重复商品，
        checkRepeation: function(index) {
            let goods = this.afterSaleParam.goods;
            for (let i = 0; i < goods.length; i++) {
                if (i != index && goods[i].id == this.goodsInfo.id) {
                    return true;
                }
            }
            return false;
        },
        confirm: function() {
            //检查是否出现重复的商品
            let goods = this.afterSaleParam.goods;
            let goodsBack = this.afterSaleParam.goodsBack;
            //先将itemList置为空数组
            this.afterSaleParam.itemList = [];
            let itemList = this.afterSaleParam.itemList;
            let idStr = ',';
            for (let i = 0; i < goods.length; i++) {
                if (idStr.indexOf("," + goods[i].id + ",") > -1) {
                    this.tipsParam.show = true;
                    this.tipsParam.name = "您的退/换货单中有重复的商品！！";
                    return;
                }
                idStr = idStr + goods[i].id + ',';
                let temp = {
                    goodsId: goods[i].id,
                    number: goods[i].number,
                    type: goods[i].type,
                    satus: 1
                };
                if (goods[i].itemId) {
                    temp.id = goods[i].itemId
                }
                itemList.push(temp);
            }
            //修改时，将goods里没有，但是goodsBack里有的push到itemList，只不过status变为0
            if (goodsBack.length > 0) {
                for (let j = 0; j < goodsBack.length; j++) {
                    let isExist = 0;
                    for (let k = 0; k < goods.length; k++) {
                        if (goodsBack[j].itemId == goods[k].itemId) { //表示goodsBack中的这条记录，在goods中也存在
                            isExist = 1;
                            break;
                        }
                    }
                    if (isExist == 0) {
                        itemList.push({
                            id: goodsBack[j].itemId,
                            goodsId: goodsBack[j].id,
                            number: goodsBack[j].number,
                            type: goodsBack[j].type,
                            satus: 0
                        });
                    }

                }
            }
            if (this.param.flag == 1) { //表示是修改
                this.afterSaleParam.url = '/order/quality/after/sales/edit';
                this.afterSalseEdit(this.afterSaleParam);
            } else { //否则是新建（申请售后）
                this.afterSalesRequest(this.afterSaleParam);
            }
        }

    },
    events: {


    },
    created() {

        if (this.param.flag == 0 && this.param.goods.length == 1) { //新建时，如果订单中只有一件商品
            let goods = this.param.goods[0];
            this.afterSaleParam.goods.push({
                goodsIndex: 0,
                id: goods.id,
                breedName: goods.breedName,
                unit: goods.unit,
                price: goods.price,
                number: goods.number,
                maxNumber: goods.number,
                type: 0
            });
            this.showModifyGoods(0);
        }
        this.afterSaleParam.orderId = this.param.id;
        this.afterSaleParam.callback = this.param.callback;
        this.getOrderDetail(this.param);
        if (this.param.afterSalesId) {
            this.afterSaleParam.id = this.param.afterSalesId;
            this.afterSaleParam.url = "/order/quality/after/sales/details/";
            this.getReceiptDetail(this.afterSaleParam);
        }
    }

}
</script>
<style scoped>
.modal {
    z-index: 1091;
}

.modal_con {
    z-index: 1091;
}

.top-title {
    width: 100%;
    position: absolute;
    top: 0;
}

.edit-input {
    height: 36px;
    line-height: 24px;
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

.btn-confirm {
    background-color: #fa6705;
    color: #fff;
}

.btn-close {
    color: #fa6705;
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

.table > thead > tr > th {
    width: 120px;
}
</style>
