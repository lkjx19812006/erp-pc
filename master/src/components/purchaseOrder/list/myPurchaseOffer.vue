<template>
    <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
    <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
    <offer-accept :param="offerAcceptParam" v-if="offerAcceptParam.show"></offer-accept>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                    <div class="left" v-if="param.offerEmployee">
                        <dt class="left transfer marg_top">报价业务员：</dt>
                        <dd class="left margin_right">
                            <input type="text" class="form-control" v-model="loadParam.offerEmployeeName" placeholder="按回车键搜索" @click="selectEmployee()" readonly="readonly">
                        </dd>
                    </div>
                    <div class="left" v-if="param.breedId">
                        <dt class="left transfer marg_top">品种：</dt>
                        <dd class="left margin_right">
                            <input type="text" class="form-control" v-model="loadParam.breedName" placeholder="按回车键搜索" @click="breedSearch()" readonly="readonly">
                        </dd>
                    </div>
                    <div class="btn-group" style="margin-left:10px" v-if="param.accept">
                        <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': this.loadParam.accept===''}" @click="clickAccept('')">
                            全部
                        </button>
                        <button type="button" class="btn btn-default" style="width:75px" v-bind:class="{ 'btn-warning': this.loadParam.accept==='0'}" @click="clickAccept('0')">
                            未处理
                        </button>
                        <button type="button" class="btn btn-default" style="width:75px" v-bind:class="{ 'btn-warning': this.loadParam.accept==='1'}" @click="clickAccept('1')">
                            已接受
                        </button>
                        <button type="button" class="btn btn-default" style="width:75px" v-bind:class="{ 'btn-warning': this.loadParam.accept==='2'}" @click="clickAccept('2')">
                            已拒绝
                        </button>
                        <button type="button" class="btn btn-default" style="width:75px" v-bind:class="{ 'btn-warning': this.loadParam.accept==='3'}" @click="clickAccept('3')">
                            待采用
                        </button>
                    </div>
                </dl>
                <button type="button" class="btn btn-primary right" style="width:75px" @click="resetCondition()">
                    清空条件
                </button>
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
                        <th>报价时间</th>
                        <th>报价类型</th>
                        <th v-if="param.init=='initAllIndentOfferList'">供应商名称</th>
                        <th>发布意向的客户</th>
                        <th>报价业务员</th>
                        <th>品种</th>
                        <th>规格</th>
                        <th>产地</th>
                        <th>数量</th>
                        <th>价格</th>
                        <th>报价来源</th>
                        <th>备注</th>
                        <th>是否采纳</th>
                        <th>原因</th>
                        <th v-if="param.init=='initMyIndentOfferList'">处理报价</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-show="param.init=='initMyIndentOfferList'" v-for="item in initMyIndentOfferList">
                        <td>{{item.otime | date}}</td>
                        <td>{{item.source | offerType}}</td>
                        <td>{{item.buyCustomerName}}</td>
                        <td>{{item.offerEmployeeName}}</td>
                        <td><a @click="clickDetail(item.id)">{{item.breedName}}</a></td>
                        <td>{{item.spec}}</td>
                        <td>{{item.location | province}}</td>
                        <td>{{item.number}}{{item.unit | Unit}}</td>
                        <td>{{item.price}}</td>
                        <td><span class="offer_source">{{item.clients | intentionSource}}</span></td>
                        <td>
                            <Poptip placement="left" trigger="hover">
                                <span>{{item.description | textDisplay '5'}}</span>
                                <div class="api" slot="content">
                                    {{item.description}}
                                </div>
                            </Poptip>
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
                        <td>
                            <button class="btn btn-success btn-xs" @click="offerAccept(item)">处理</button>
                        </td>
                    </tr>
                    <tr v-show="param.init=='initAllIndentOfferList'" v-for="item in initAllIndentOfferList">
                        <td>{{item.otime | date}}</td>
                        <td>{{item.source | offerType}}</td>
                        <td>{{item.offerCustomerName}}</td>
                        <td>{{item.buyCustomerName}}</td>
                        <td>{{item.offerEmployeeName}}</td>
                        <td><a @click="clickDetail(item.id)">{{item.breedName}}</a></td>
                        <td>{{item.spec}}</td>
                        <td>{{item.location | province}}</td>
                        <td>{{item.number}}{{item.unit | Unit}}</td>
                        <td>{{item.price}}</td>
                        <td><span class="offer_source">{{item.clients | intentionSource}}</span></td>
                        <td>
                            <Poptip placement="left" trigger="hover">
                                <span>{{item.description | textDisplay '5'}}</span>
                                <div class="api" slot="content">
                                    {{item.description}}
                                </div>
                            </Poptip>
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
import employeeModel from '../../clientRelate/searchEmpInfo'
import breedsearchModel from '../../intention/breedsearch'
import detailModel from '../../intention/offerDetail'
import tipsdialogModel from '../../tips/tipDialog'
import offerAccept from '../../purchaseOrder/offerAccept'
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import common from '../../../common/common'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
    initMyIndentOfferList,
    initAllIndentOfferList
} from '../../../vuex/getters'
import {
    getIndentOffers,
    handleOfferAccept
} from '../../../vuex/actions'
export default {
    components: {
        employeeModel,
        breedsearchModel,
        tipsdialogModel,
        offerAccept,
        detailModel,
        pagination,
        mglistModel
    },
    vuex: {
        getters: {
            initMyIndentOfferList,
            initAllIndentOfferList
        },
        actions: {
            getIndentOffers,
            handleOfferAccept
        }
    },
    props: {
        param: {

        },
    },
    data() {
        return {
            loadParam: {
                loading: false,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total: "",
                init: '', //初始化列表数据
                link: '',
                key: '',
                offerEmployee: "",
                offerEmployeeName: "",
                breedId: "",
                breedName: "",
                accept: "",

            },
            detailParam: {
                show: false,
                loading: true,
                link: "/intention/offers/",
                id: "",
            },
            breedSearchParam: {
                show: false
            },
            employeeParam: {
                show: false,
                org: false,
                orgId: "",
                //单个业务员搜索
                employeeId: '',
                employeeName: '',

            },
            offerAcceptParam: {
                id: "",
                callback: this.acceptOfferBack,
                show: false
            },
            tipsParam: {
                show: false,
                name: '',
                alert: true
            },

        }
    },
    methods: {
        clickAccept: function(accept) {
            this.loadParam.accept = accept;
            this.selectSearch();
        },
        breedSearch: function() {
            this.breedSearchParam.show = true;
        },
        selectEmployee: function() {
            this.employeeParam.show = true;
        },
        selectSearch: function() {
            this.getIndentOffers(this.loadParam);
        },
        resetCondition: function() {
            this.loadParam.offerEmployee = "";
            this.loadParam.offerEmployeeName = "";
            this.loadParam.breedId = "";
            this.loadParam.breedName = "";
            this.loadParam.accept = "";
            this.selectSearch(this.loadParam);
        },
        clickDetail: function(id) {
            this.detailParam.show = true;
            this.detailParam.id = id;
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
            this.selectSearch();
        }

    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getIndentOffers(this.loadParam);
        },
        breed: function(breed) {
            this.loadParam.breedId = breed.breedId;
            this.loadParam.breedName = breed.breedName;
            this.selectSearch();
        },
        a: function(employee) {
            this.loadParam.offerEmployee = employee.employeeId;
            this.loadParam.offerEmployeeName = employee.employeeName;
            this.selectSearch();
        },
    },
    created() {
        this.loadParam.link = this.param.link;
        this.loadParam.key = this.param.key;
        this.getIndentOffers(this.loadParam);

        //changeMenu(this.$store.state.table.isTop, this.getIntentionList, this.loadParam, localStorage.myIntentionParam);

    },
    ready() {
        common('tab', 'table_box', 1);
    },
    filter: (filter, {})
}
</script>
<style scoped>
.edit-model {
    padding: 10px 30px 80px 30px;
}

.breed_action {
    top: 33px;
    right: 106px;
}

.transfer {
    margin-right: 8px;
}

.margin_right {
    margin-right: 15px
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
    width: 130px;
    min-width: 130px;
}
.offer_source{
    display: inline-block;
    width: 60px;
    line-height: 20px;
    background: #2d8cf0;
    border-radius: 3px;
    color:#fff;
}
.service-nav {
    padding: 23px 10px 0px 4px;
}

dl {
    margin-bottom: 5px;
}

.api {
    max-width: 800px;
    color: #3399ff;
    white-space: normal;
}
</style>
