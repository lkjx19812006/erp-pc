<template>
    <picture-model :param="pictureParam" v-if='pictureParam.show'></picture-model>
    <setprice-model :param="priceParam" v-if="priceParam.show"></setprice-model>
    <order-data :param="orderData" v-if="orderData.show"></order-data>
    <stock-cart :param="cartData" v-if="cartData.show&&cartData.leng"></stock-cart>
    <breed-search :param='loadParam' v-if='loadParam.show'></breed-search>
    <create-stock :param='createParam' v-if='createParam.show'></create-stock>
    <import-excel :param='importParam' v-if='importParam.show'></import-excel>
    <deletestock-model :param='deleteParam' v-if='deleteParam.show'></deletestock-model>
    <tipsdialog-model :param='tipsParam' v-if='tipsParam.show'></tipsdialog-model>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">药材名称：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.breedName" readonly="readonly" placeholder="按回车键搜索" @keyup.enter="selectSearch()" @click='openBreedSearch()' />
                    </dd>
                    <dt class="left transfer marg_top" style="margin-left: 20px">仓库地：</dt>
                    <dd class="left margin_right">
                        <select class="form-control edit-input" placeholder="按回车键搜索" v-model="loadParam.depotName" @keyup.enter="selectSearch()">
                            <option value="亳州">亳州</option>
                            <option value="上海">上海</option>
                            <option value="玉林">玉林</option>
                            <option value="安国">安国</option>
                            <option value="定西">定西</option>
                            <option value="成都">成都</option>
                        </select>
                    </dd>
                    <dt class="left transfer marg_top" style="margin-left: 20px">库存类型：</dt>
                    <dd class="left margin_right">
                        <select class="form-control edit-input" placeholder="按回车键搜索" v-model="loadParam.depotType" @keyup.enter="selectSearch()">
                            <option value="社会库存">社会库存</option>
                            <option value="自营库存">自营库存</option>
                        </select>
                    </dd>
                </dl>
                <dl class="clear left transfer" style="margin-left:20px">
                    <button type="button" class="btn btn-default margin_right" height="24" width="24" @click="selectSearch()">搜索</button>
                    <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">清空条件</button>
                </dl>
                <!--  <dd class="pull-right" style="margin-right:10px">
                   <button type="button" class="btn btn-primary" @click="selectSearch()">刷新</button>
               </dd> -->
                <dd class="pull-right" style="margin-right:200px">
                    <button type='button' class='btn btn-default cartbtn' :class={cartbtnAct:cartData.leng} height="24" width="24" @click="showCartList()">购物车({{cartData.leng}})</button>
                    <!-- 库存模板下载 -->
                    <button type="button" class="btn btn-default" style="margin-right:10px" height="24" width="24" class="new_btn">
                        <a href="http://erp.yaocaimaimai.net/local/template/Resource_template.xlsx">
                            EXCEL库存模板下载
                        </a>
                    </button>
                    <!-- EXCEL导入客户 -->
                    <button type="button" class="btn btn-primary" @click="excelImport()">excel导入社会库存</button>
                    <!-- 新建社会库存 -->
                    <button type="button" class="btn btn-default" @click="createStock({
                                            show:true,
                                            flag:0,                                            
                                            breedName:'',
                                            breedId:'',
                                            employeeName:'',
                                            shape:'',
                                            specAttribute:'',
                                            location:'',
                                            depotName:'',
                                            usableNum:'',
                                            unit:'',
                                            canProcess:'',
                                            canDeposite:'',
                                            price:'',
                                            dueDate:'',
                                            comment:'',
                                            key:'',
                                            callback:getStockList
                                            })">{{$t("static.new")}}</button>
                </dd>
            </div>
        </div>
        <!--中间列表-->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th style="min-width:100px;text-align: center;">药材名称</th>
                        <th style="min-width:100px;text-align: center;">药材图片</th>
                        <th style="min-width:100px;text-align: center;">入库时间</th>
                        <th style="min-width:120px;text-align: center;">联系业务员</th>
                        <th style="min-width:120px;text-align: center;">规格</th>
                        <th style="min-width:100px;text-align: center;">片型</th>
                        <th style="min-width:100px;text-align: center;">产地</th>
                        <th style="min-width:120px;text-align: center;">库存可用量</th>
                        <th style="min-width:120px;text-align: center;">库存单位</th>
                        <th style="min-width:120px;text-align: center;">阶梯价格</th>
                        <th style="min-width:150px;text-align: center;">仓库名称</th>
                        <th style="min-width:120px;text-align: center;">库存类型</th>
                        <th style="min-width:300px;text-align: center;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initStockList">
                        <td>{{item.breedName}}</td>
                        <td>
                            <span v-for="img in item.imageArray">
                                <img :src="img" style="width: 60px;height:60px;border:none" v-if='item.imageArray.length' @click="showBig(img)"/>
                            </span>
                        </td>
                        <td>{{item.ctime | timeFilter}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.specAttribute | specFilter_a}}</td>
                        <td>{{item.specAttribute | specFilter_b}}</td>
                        <td>{{item.locationName}}</td>
                        <td>{{item.usableNum}}</td>
                        <td>{{item.unitId | Unit}}</td>
                        <td>
                            <p v-for="pri in item.ladderPriceList">
                                <span>起订量:{{pri.minNumber}}</span>
                                <span>价格:{{pri.ladder}}</span>
                            </p>
                        </td>
                        <td>{{item.depotName}}</td>
                        <td>{{item.depotType}}</td>
                        <td>
                            <button class="btn btn-xs btn-success" @click="addToCart($index,{
                                breedName:item.breedName,
                                id:item.id,
                                specAttribute:item.specAttribute,
                                location:item.location,
                                usableNum:item.usableNum,
                                unitId:item.unitId
                            })">加入购物车</button>
                            <button class="btn btn-primary btn-xs" @click="setPrice(item)" v-if="this.initLogin.safeCode.indexOf('P547-F558,')!=-1">设置价格</button>
                            <button class="btn btn-info btn-xs" v-if="item.depotType=='社会库存'&&this.initLogin.id==item.employee" @click="updataStock(item)">编辑</button>
                            <button class="btn btn-danger btn-xs" v-if="item.depotType=='社会库存'&&this.initLogin.id==item.employee" @click="deleteStock({
                                            id:item.id,
                                            sub:$index,
                                            show:true,
                                            link:deleteStockInfo
                                            })">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--底部分页-->
        <pagination :combination="loadParam" slot="page"></pagination>
    </mglist-model>
</template>
<script>
import mglistModel from '../mguan/mgListComponent.vue'
import importExcel from '../../components/purchaseOrder/indentExcelImport.vue'
import deletestockModel from '../stock/deleteStockTip'
import breedSearch from '../../components/Intention/breedsearch.vue'
import tipsdialogModel from '../tips/tipDialog'
import changeMenu from '../../components/tools/tabs/tabs.js'
import common from '../../common/common'
import setpriceModel from '../stock/setPrice'
import pagination from '../pagination'
import orderData from '../stock/orderData'
import stockCart from '../stock/stockCart'
import createStock from '../stock/createNewStock'
import pictureModel from '../tips/pictureDialog'
import filter from '../../filters/filters'
import {
    getStockList,
    importStock,
    deleteStockInfo
} from '../../vuex/actions'
import {
    initStockList,
    initLogin
} from '../../vuex/getters'
export default {
    components: {
        mglistModel,
        pagination,
        orderData,
        stockCart,
        breedSearch,
        importExcel,
        createStock,
        deletestockModel,
        tipsdialogModel,
        pictureModel,
        setpriceModel
    },
    vuex: {
        actions: {
            getStockList,
            importStock,
            deleteStockInfo
        },
        getters: {
            initStockList,
            initLogin
        }
    },
    data() {
        return {
            loadParam: {
                loading: false,
                breedName: "",
                breedId: '',
                depotName: '',
                depotType: '',
                cur: 1,
                all: 1,
                total: '',
                show: false
            },
            cartData: {
                loading: false,
                show: false,
                callback: this.callback,
                orderStatus: 0,
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
                //intentionOfferList: [] //传入后台，由goods生成
                leng: 0
            },
            orderData: {
                show: false,
                id: '',
                breedName: '',
                specAttribute: '',
                location: '',
                usableNum: '',
                unitId: '',
                callback: this.callback,
                index: ''
            },
            tipsParam: {
                show: false,
                name: '',
                alert: true
            },
            importParam: {
                loading: false,
                show: false,
                link: this.importStock,
                callback: this.selectSearch,
                success: 0, //上传后，返回码的解析，0/1/2/3，初始/成功/错误（1000）/其他错误
                mFile: "", //excel文件
                result: "" // 导入成功后的返回信息
            },
            deleteParam: {
                show: false
            },
            createParam: {
                show: false,
                flag: '',
                breedName: '',
                breedId: '',
                employeeName: '',
                shape: '',
                specAttribute: '',
                location: '',
                depotName: '',
                usableNum: '',
                unit: '',
                canProcess: '',
                canDeposite: '',
                price: '',
                dueDate: '',
                comment: '',
                key: ''

            },
            breedSearchParam: {
                show: false
            },
            pictureParam: {
                show: false,
                img: ''
            },
            priceParam: {
                show: false,
                id: '',
                breedName: '',
                location: '',
                usableNum: '',
                unitId: '',
                ladderPriceList: [],
                freshData: {},
                callback: this.getStockList,
                priceCallback: this.callback_price
            },
            checked: false
        }
    },
    methods: {
        selectSearch: function() {
            this.getStockList(this.loadParam)
        },
        showBig: function(img) {
            this.pictureParam.show = true
            this.pictureParam.img = img
        },
        openBreedSearch: function() {
            this.loadParam.show = true
        },
        excelImport: function() { //导入库存
            this.importParam.success = 0;
            this.importParam.mFile = "";
            this.importParam.result = "";
            this.importParam.show = true;
        },
        addToCart: function($index, data) {
            this.orderData.show = true;
            this.orderData.breedName = data.breedName;
            this.orderData.id = data.id;
            this.orderData.specAttribute = data.specAttribute;
            this.orderData.location = data.location;
            this.orderData.usableNum = data.usableNum;
            this.orderData.unitId = data.unitId;
            this.orderData.index = $index;
            console.log(this.$store.state.table.stockCartList)
        },
        showCartList: function() {
            this.cartData.show = true
        },
        deepCopy: function(source) { // 深拷贝
            var result = {};
            for (var key in source) {
                result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key];
            }
            return result;
        },
        callback: function(name) { //生成订单后，清空购物车
            this.tipsParam.name = name
            this.tipsParam.show = true
            this.$store.state.table.stockCartList = [];
            this.cartData.leng = 0
        },
        callback_price: function(name) {
            this.tipsParam.name = name
            this.tipsParam.show = true
        },
        watchStock: function() { //
            this.$store.state.table.stockCartList = [];
            this.cartData.leng = 0
        },
        resetCondition: function() {
            this.loadParam.breedName = '';
            this.loadParam.breedId = '';
            this.loadParam.depotName = '';
            this.loadParam.depotType = '';
            this.getStockList(this.loadParam)
        },
        createStock: function(data) {
            this.createParam = data;
        },
        updataStock: function(item) {
            var spec = item.specAttribute;
            var spec_a = '';
            var spec_b = '';
            if (spec) {
                spec = JSON.parse(spec)
                for (var key in spec) {
                    spec_a = spec[key]['规格'];
                    spec_b = spec[key]['片型']
                }
            }
            this.createParam.show = true,
                this.createParam.flag = 1,
                this.createParam.breedName = item.breedName,
                this.createParam.breedId = item.breedId,
                this.createParam.id = item.id,
                this.createParam.employeeName = item.employeeName,
                this.createParam.specAttribute = spec_a,
                this.createParam.shape = spec_b,
                this.createParam.location = item.location,
                this.createParam.depotName = item.depotName,
                this.createParam.usableNum = item.usableNum,
                this.createParam.unit = item.unitId,
                this.createParam.canProcess = item.canProcess,
                this.createParam.canDeposite = item.canDeposite,
                this.createParam.price = item.price,
                this.createParam.dueDate = item.dueDate,
                this.createParam.comment = item.comment,
                this.createParam.key = '',
                this.createParam.callback = this.getStockList
        },
        deleteStock: function(data) {
            this.deleteParam.show = true
            this.deleteParam = data
        },
        times: function(data) {
            var month = new Date(data).getMonth() + 1;
            var date = new Date(data).getDate()
            if (month <= 9) {
                month = '0' + month
            }
            if (date <= 9) {
                date = '0' + date
            }
            return new Date(data).getFullYear() + "-" + month + "-" + date
        },
        setPrice: function(item) {
            console.log(this.initLogin.safeCode)
            this.priceParam.show = true
            this.priceParam.freshData = this.loadParam
            this.priceParam.breedName = item.breedName
            this.priceParam.id = item.id
            this.priceParam.location = item.location
            this.priceParam.usableNum = item.usableNum
            this.priceParam.unitId = item.unitId
            this.priceParam.ladderPriceList = item.ladderPriceList
        }
    },
    created() {
        this.getStockList(this.loadParam)
        this.watchStock()

    },
    ready() {
        common('tab', 'table_box', 1);
    },
    watch: {
        '$route': 'watchStock' //监听路由变化，当离开此页面的时候清空购物车
    },
    events: {
        'addOrderDetail': function(msg) {
            console.log(msg)
            this.orderData.priceAndNumber = msg;
            var product = this.deepCopy(this.orderData); //将每次添加到购物车的数据深拷贝，加到购物车列表里面
            this.$store.state.table.stockCartList.push(product)
            this.cartData.goods = this.$store.state.table.stockCartList
            this.cartData.leng = this.$store.state.table.stockCartList.length
        },
        breed: function(breed) {
            console.log(breed.breedId)
            this.loadParam.breedId = breed.breedId;
            this.loadParam.breedName = breed.breedName;
            this.selectSearch();
        },
        fresh: function(page) {
            this.getStockList(this.loadParam)
        },
        freshList() {
            this.getStockList(this.loadParam)
        }
    },
    filters: {
        timeFilter: function(data) {
            return this.times(data)
        }
    },
    filter: (filter, {})
}
</script>
<style>
.cartbtn {
    background: #ccc;
}

.cartbtnAct {
    background: #fff;
    color: #fa6705
}

.cartbtnAct:hover {
    background: #fa6705;
    color: #fff
}
</style>
