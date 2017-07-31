<template>
    <createorder-model :param="orderParam" v-if="orderParam.show"></createorder-model>
    <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
    <offer-search :param="loadParam" v-if="loadParam.show"></offer-search>
    <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
    <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
    <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <search-model>
                <div slot="main">
                    <erp-search title="static.supplier_id" :value.sync="loadParam.offerCustomer" @on-keyenter="selectSearch()"></erp-search>
                    <!-- <erp-search title="报价业务员" :value.sync="loadParam.offerEmployeeName" @on-click="selectEmployee('offer')" readonly="readonly"></erp-search> -->
                    <erp-search title="品种" :value.sync="loadParam.breedName" @on-click="breedSearch()" readonly="readonly"></erp-search>
                    <erp-select title="来源" :value.sync="loadParam.source" :options="options.offerSource" @on-change="offerSearch()"></erp-select>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">报价时间：</dt>
                        <dd class="left">
                            <mz-datepicker :time.sync="loadParam.startTime" format="yyyy-MM-dd HH:mm:ss" width="115">
                            </mz-datepicker>
                            ~
                        </dd>
                        <dd class="left">
                            <mz-datepicker :time.sync="loadParam.endTime" format="yyyy-MM-dd HH:mm:ss" width="115">
                            </mz-datepicker>
                        </dd>
                    </dl>
                </div>
                <div slot="more">
                     <erp-search  title="求购业务员" :value.sync="loadParam.buyEmployeeName" @on-click="selectEmployee('buy')" readonly="readonly"></erp-search>
                </div>
                <div slot="handle">
                    <button type="button" class="btn btn-success" @click="todayOffer()">今日报价</button>
                    <button type="button" class="btn btn-success" @click="weekOffer()">本周报价</button>
                    <button type="button" class="btn btn-primary" height="24" width="24" @click="offerSearch()">搜索</button>
                    <button class="btn btn-warning" @click="resetCondition()">清空条件</button>
                    <button class="btn btn-primary" @click="offerSearch()">刷新</button>
                </div>
            </search-model>
            <!-- <div class="clear pull-left">
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">供应商：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.fullname" placeholder="按回车键搜索" @keyup.enter="offerSearch()">
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">供应商ID：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.customerId" placeholder="按回车键搜索" @keyup.enter="offerSearch()">
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">供应商手机：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.userPhone" placeholder="按回车键搜索" @keyup.enter="offerSearch()">
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">报价时间：</dt>
                    <dd class="left">
                        <mz-datepicker :time.sync="loadParam.startTime" format="yyyy/MM/dd HH:mm:ss" class="a" width="165">
                        </mz-datepicker>
                        ~
                    </dd>
                    <dd class="left">
                        <mz-datepicker :time.sync="loadParam.endTime" format="yyyy/MM/dd HH:mm:ss" class="a" width="165">
                        </mz-datepicker>
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <button type="button" class="btn btn-success" @click="todayOffer()">今日报价</button>
                    <button type="button" class="btn btn-success" @click="weekOffer()">本周报价</button>
                    <button type="button" class="btn btn-primary" height="24" width="24" @click="offerSearch()">搜索</button>
                    <button class="btn btn-warning" @click="resetCondition()">清空条件</button>
                </dl>
            </div>
            <div class="right">
                <button class="btn btn-primary" @click="offerSearch()">刷新</button>
                <button class="new_btn" @click="createIntention()">新建</button>
            </div> -->
        </div>
        <!--中间列表-->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <!-- <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>报价时间</th>
                        <th>所属交易员</th>
                        <th>供应商ID</th>
                        <th>报价供应商</th>
                        <th>联系方式</th>
                        <th>品种名</th>
                        <td>图片</td>
                        <th>报价价格</th>
                        <th>库存</th>
                        <th>报价备注</th>
                        <th>订单次数</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initMyOfferList">
                        <td>{{item.ctime}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.customerId}}</td>
                        <td><a href="javascript:void(0);" @click="showDetail(item.id)">{{item.customerName}}</a></td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.breedName}}</td>
                        <td>
                            <span v-for="val in item.pics">
                            <img :src="val.path" style="float: left; width:40px; height:40px; margin-right:10px" @click="clickBig(val.url)">
                          </span>
                        </td>
                        <td>{{item.price}}</td>
                        <td>{{item.number}}{{item.unit | Unit}}</td>
                        <td>
                            <Poptip placement="top" trigger="hover">
                                <span>{{item.description | textDisplay '8'}}</span>
                                <div class="api" slot="content">
                                    {{item.description}}
                                </div>
                            </Poptip>
                        </td>
                        <td>{{item.orderTime}}次</td>
                        <td>
                            <a class="operate" @click.stop="adopt(item,$index)" v-if="item.orderTime==0"><img src="/static/images/adopt.png" alt="我要采纳" title="我要采纳" />
                            </a>
                            <div v-else>已生成订单</div>
                        </td>
                    </tr>
                </tbody>
            </table> -->
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>报价时间</th>
                        <th>供应商ID</th> 
                        <th>供应商名称</th> 
                        <th>报价业务员</th>
                        <th>求购业务员</th>
                        <th>求购客户ID</th>
                        <th>求购客户</th>
                        <th>品种/产地</th>
                        <th style="width:220px;">价格/数量</th>
                        <th>规格</th>
                        <th>审核状态</th>
                        <th>审核原因</th>
                        <th>报价来源/客户端</th>
                        <th>是否采纳</th>
                        <th>原因</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="item in initMyOfferList">
                        <td>{{item.otime.substr(0,19)}}</td>
                        <td>{{item.offerCustomer}}</td>
                        <td><a href="javascript:void(0);" @click="showDetail(item.id)">{{item.offerCustomerName}}</a></td>
                        <td>
                            <span>{{item.offerEmployeeName}}</span>
                        </td> 
                        <td>
                            <span>{{item.buyEmployeeName}}</span>
                        </td>
                        <td >
                            <span>{{item.buyCustomer}}</span>
                        </td>
                        <td>{{item.buyCustomerName}}</a></td>
                        <td style="text-align:left">
                            <p style="font-size: 16px;">{{item.breedName}}</p>
                            <p style="color:#666">产地：{{item.location | province}}</p>
                        </td>
                        <td>
                            <p style="font-size: 16px;text-align:left;color:#ec971f;">{{item.price}}￥/{{item.unit | Unit}}</p>
                            <p style="text-align:left;">数量：{{item.number}}{{item.unit | Unit}}</p>
                        </td>
                        <td>{{item.spec}}</td>
                        <td>{{item.validate | Audit}}</td>
                        <td>
                            <Poptip placement="top" trigger="hover">
                                <span>{{item.validateDescription | textDisplay '5'}}</span>
                                <div class="api" slot="content">
                                    {{item.validateDescription}}
                                </div>
                            </Poptip>
                        </td>
                        <td style="text-align:left">
                            <span :style="{color:item.source==0?'red':''}">{{item.source | offerType}}({{item.clients | indentSource}})</span>
                        </td>
                        <td>{{item.accept | offerAccept}}</td>
                        <td>
                            <Poptip placement="left" trigger="hover">
                                <span>{{item.comments | textDisplay '5'}}</span>
                                <div class="api" slot="content">
                                    {{item.comments}}
                                </div>
                            </Poptip>
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
import pagination from '../../pagination'
import calendar from '../../calendar/vue.datepicker'
import breedsearchModel from '../../intention/breedsearch'
import employeeModel from '../../clientRelate/searchEmpInfo'
import filter from '../../../filters/filters'
import createorderModel from '../createOrder'
import offerSearch from '../offerSearch'
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import pictureModel from '../../tips/pictureDialog'
import tipsModel from '../../tips/tipDialog'
import mglistModel from '../../mguan/mgListComponent.vue'
import detailModel from '../../intention/offerDetail'
import util from '../../tools/util.js'
import {offerSource,offerAudit} from '../../../common/searchData.js'
import {
    initMyOfferList,
    initLogin
} from '../../../vuex/getters'
import {
    getOfferList
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        createorderModel,
        offerSearch,
        pictureModel,
        tipsModel,
        mglistModel,
        detailModel,
        breedsearchModel,
        employeeModel
    },
    vuex: {
        getters: {
            initMyOfferList,
            initLogin
        },
        actions: {
            getOfferList
        }
    },
    data() {
        return {
            options:{
                offerSource,
                offerAudit
            },
            employeeParam: {
                show: false,
                org: false,
                orgId: "",
                //单个业务员搜索
                employeeId: '',
                employeeName: '',

            },
            loadParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                link: '/intention/employee/offers',
                key: 'myOfferList',
                breedName: '',
                breedId:'',
                spec: '',
                buyCustomer: '',
                offerEmployeeName: '',
                offerEmployee:'',
                buyEmployeeName:'',
                buyEmployee:'',
                startTime: '',
                source:'',
                endTime: '',
                total: 0,
                customerId:'',
                offerCustomer:''
            },
            breedSearchParam: {
                show: false
            },
            tipsParam: {
                name: '',
                show: false,
                alert: true
            },
            pictureParam: {
                show: false,
                img: ''
            },
            offerParam: {
                show: false,
                id: ''
            },
            orderParam: {
                index: '',
                show: false,
                key: 'myOfferList',
                type: '',
                customer: '',
                sample: 0,
                intl: 0,
                employee: this.initLogin.id, //业务员ID
                org: this.initLogin.orgId, //部门ID
                incidentals: 0,
                incidentalsDesc: '',
                preferential: 0, //优惠金额
                preferentialDesc: '',
                currency: 1, //货币品种
                consignee: '', //收货人姓名
                consigneePhone: '',
                consigner: '', //发货人
                zipCode: '', //邮编
                country: '',
                province: '',
                city: '',
                tradeTime: '',
                total: 0,
                cost: 0,
                district: '',
                consigneeAddr: '',
                comments: '',
                sourceType: 2, //商品来源类型(意向)
                orderStatus: 0, //订单状态
                goods: [{
                    sourceType: 2, //商品来源类型(报价)
                    sourceId: '', //商品来源ID
                    title: '', //订单商品标题
                    breedId: '',
                    breedName: '',
                    quality: '',
                    location: '',
                    spec: '',
                    price: '',
                    costPrice: '',
                    unit: '',
                    number: '',
                    image: ''
                }]

            },
            checked: false,
            detailParam: {
                show: false,
                loading: true,
                idOrName: false,
                link: "/intention/offers/",
                id: "",
            },
        }
    },
    methods: {
        showDetail: function(data) {
            this.detailParam.show = true
            this.detailParam.id = data
        },
        searchOffer: function() {
            this.loadParam.show = true;
        },
        offerSearch: function() {
            this.getOfferList(this.loadParam);
        },
        todayOffer: function() {
            this.loadParam.startTime = util.dateFormat(util.getDate(0), "/", ":");
            this.loadParam.endTime = util.dateFormat(util.getDate(1), "/", ":");
            this.offerSearch();
        },
        weekOffer: function() {
            this.loadParam.startTime = util.dateFormat(util.getMonday(), "/", ":");
            this.loadParam.endTime = util.dateFormat(util.getDate(1), "/", ":");
            this.offerSearch();
        },
        breedSearch: function() {
            this.breedSearchParam.show = true;
        },
        selectEmployee: function(data) {
            this.employeeParam.show = true;
            this.loadParam.buyOroffer = data
        },
        resetCondition: function() {
            this.loadParam.buyCustomer="";
            this.loadParam.source = '';
            this.loadParam.offerEmployee = "";
            this.loadParam.offerEmployeeName = "";
            this.loadParam.buyEmployeeName = ''
            this.loadParam.buyEmployee = ''
            this.loadParam.breedId = "";
            this.loadParam.breedName = "";
            this.loadParam.startTime = "";
            this.loadParam.endTime = "";
            this.loadParam.offerCustomer=''
            this.getOfferList(this.loadParam);
        },
        clickShow: function(index) {
            this.$store.state.table.basicBaseList.myOfferList[index].show = !this.$store.state.table.basicBaseList.myOfferList[index].show;
        },
        clickBig: function(img) {
            this.pictureParam.show = true;
            this.pictureParam.img = img;
        },
        onlyselected: function(index) {
            var _this = this;
            this.$store.state.table.basicBaseList.myOfferList[index].checked = !this.$store.state.table.basicBaseList.myOfferList[index].checked;
            if (!this.$store.state.table.basicBaseList.myOfferList[index].checked) {
                this.checked = false;
            } else {
                this.checked = true;
                this.$store.state.table.basicBaseList.myOfferList.forEach(function(item) {
                    if (!item.checked) {
                        _this.checked = false;
                    }
                })
            }
        },
        checkedAll: function() {
            this.checked = !this.checked;
            if (this.checked) {
                this.$store.state.table.basicBaseList.myOfferList.forEach(function(item) {
                    item.checked = true;
                })
            } else {
                this.$store.state.table.basicBaseList.myOfferList.forEach(function(item) {
                    item.checked = false;
                })
            }
        },
        adopt: function(item, index) {
            this.orderParam.show = true;
            this.orderParam.index = index;
            this.orderParam.customer = item.customerId;
            this.orderParam.customerName = item.customerName;
            this.orderParam.incidentals = item.incidentals;
            this.orderParam.incidentalsDesc = item.incidentalsDesc;
            this.orderParam.type = item.type;
            this.orderParam.goods[0].sourceId = item.id;
            this.orderParam.goods[0].breedId = item.breedId;
            this.orderParam.goods[0].breedName = item.breedName;
            this.orderParam.goods[0].spec = item.spec;
            this.orderParam.goods[0].price = item.price;
            this.orderParam.goods[0].unit = item.unit;
            this.orderParam.goods[0].number = item.number;
            this.orderParam.goods[0].quality = item.quality;
            this.orderParam.goods[0].location = item.location;
            if (item.pics.length > 0) { //如果有报价图片
                this.orderParam.goods[0].image = item.pics[0].path;
            }
            this.orderParam.callback = this.adoptback;
        },
        adoptback: function(name) {
            this.tipsParam.name = name;
            this.tipsParam.alert = true;
            this.tipsParam.show = true;
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

    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getOfferList(this.loadParam);
        },
        breed: function(breed) {
            this.loadParam.breedId = breed.breedId;
            this.loadParam.breedName = breed.breedName;
            this.offerSearch();
        },
        a: function(employee) {
            if(this.loadParam.buyOroffer == 'offer'){
                this.loadParam.offerEmployee = employee.employeeId;
                this.loadParam.offerEmployeeName = employee.employeeName;
            }else if(this.loadParam.buyOroffer == 'buy'){
                this.loadParam.buyEmployee = employee.employeeId;
                this.loadParam.buyEmployeeName = employee.employeeName;
            }
            
            this.offerSearch();
        },
    },
    created() {
        console.log(util.getMonday());
        changeMenu(this.$store.state.table.isTop, this.getOfferList, this.loadParam, localStorage.myOfferParam);
    },
    ready() {
        common('tab', 'table_box', 1);
    },
    filter: (filter, {})
}
</script>
<style scoped>
.name_search {
    margin-right: 1%;
}

.service-nav {
    padding: 30px 20px 10px 40px;
}

.order_table {
    margin-top: -4px;
}

.my_enterprise {
    padding: 6px;
}

.breed_action {
    top: 33px;
    right: 106px;
}

.transfer {
    margin-left: 18px;
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

#table_box table th,
#table_box table td {
    width: 120px;
    min-width: 80px;
}

.api {
    min-width: 200px;
    max-width: 400px;
    white-space: normal;
    color: #3399ff;
}
</style>
