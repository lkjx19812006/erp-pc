<template>
    <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
    <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
    <offer-accept :param="offerAcceptParam" v-if="offerAcceptParam.show"></offer-accept>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <search-model>
                <div slot="main">
                    <erp-search title="客户ID" :value.sync="loadParam.buyCustomer" @on-keyenter="selectSearch()"></erp-search>
                    <erp-search title="报价业务员" :value.sync="loadParam.offerEmployeeName" @on-click="selectEmployee('offer')" readonly="readonly"></erp-search>
                   
                    <erp-search title="品种" :value.sync="loadParam.breedName" @on-click="breedSearch()" readonly="readonly"></erp-search>
                    <erp-select title="来源" :value.sync="loadParam.source" :options="options.offerSource" @on-change="selectSearch()"></erp-select>
                    <!-- <erp-select title="审核状态" :value.sync="loadParam.validate" :options="options.offerAudit" @on-change="selectSearch()"></erp-select> -->
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
                     <erp-search v-if="param.init=='initAllIndentOfferList'" title="求购业务员" :value.sync="loadParam.buyEmployeeName" @on-click="selectEmployee('buy')" readonly="readonly"></erp-search>
                </div>
                <div slot="handle">
                    <button type="button" class="btn btn-success" @click="todayOffer()">今日报价</button>
                    <button type="button" class="btn btn-success" @click="weekOffer()">本周报价</button>
                    <button type="button" class="btn btn-info" @click="selectSearch()">搜索</button>
                    <button type="button" class="btn btn-primary" style="width:75px" @click="resetCondition()">清空条件</button>
                    <button type="button" class="btn btn-success" style="width:100px" @click="batchAccept()" v-if="param.init=='initMyIndentOfferList'">批量处理</button>
                </div>
            </search-model>
            <div class="left">
                <div class="btn-group left" style="margin-right:10px" v-if="param.accept">
                    <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': this.loadParam.accept===''}" @click="clickAccept('')">
                        全部
                    </button>
                    <button type="button" class="btn btn-default" style="width:75px" v-bind:class="{ 'btn-warning': this.loadParam.accept==='0'}" @click="clickAccept('0')">
                        待处理
                    </button>
                    <button type="button" class="btn btn-default" style="width:75px" v-bind:class="{ 'btn-warning': this.loadParam.accept==='1'}" @click="clickAccept('1')">
                        已采用
                    </button>
                    <button type="button" class="btn btn-default" style="width:75px" v-bind:class="{ 'btn-warning': this.loadParam.accept==='2'}" @click="clickAccept('2')">
                        未采用
                    </button>
                    <button type="button" class="btn btn-default" style="width:75px" v-bind:class="{ 'btn-warning': this.loadParam.accept==='3'}" @click="clickAccept('3')">
                        待采用
                    </button>
                </div>
                <div class="btn-group left" style="margin-right:10px" v-if="param.init=='initAllIndentOfferList'">
                    <button type="button" class="btn btn-default" style="width:50px" v-bind:class="{ 'btn-warning': this.loadParam.effective===''}" @click="clickEffective('')">
                        全部
                    </button>
                    <button type="button" class="btn btn-default" style="width:125px" v-bind:class="{ 'btn-warning': this.loadParam.effective==='1'}" @click="clickEffective('1')">
                        有效意向报价
                    </button>
                    <button type="button" class="btn btn-default" style="width:125px" v-bind:class="{ 'btn-warning': this.loadParam.effective==='0'}" @click="clickEffective('0')">
                        无效意向报价
                    </button>
                </div>
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
                        <th v-if="param.init=='initMyIndentOfferList'" style="width:100px;"></th>
                        <th>报价时间</th>
                        <th v-if="param.init=='initAllIndentOfferList'">供应商ID</th> 
                        <th v-if="param.init=='initAllIndentOfferList'">供应商名称</th> 
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
                        <th v-if="param.init=='initMyIndentOfferList'">处理报价</th>
                    </tr>
                </thead>
                <tr v-if="param.init=='initMyIndentOfferList'">
                    <th style="width:100px;">
                        <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids" @click="checkedAll()"></label>
                    </th>
                    <th style="color:#fa6705;font-size: 14px">全选</th>
                    <th colspan="13"></th>
                </tr>
                <tbody>
                    <tr v-show="param.init=='initMyIndentOfferList'" v-for="item in initMyIndentOfferList">
                        <td @click.stop="" style="width:100px;">
                            <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index,item.id)"></label>
                        </td>
                        <td>{{item.otime.substr(0,19)}}</td>
                        <td>
                            <span>{{item.offerEmployeeName}}</span>
                        </td> 
                        <td>
                            <span>{{item.buyEmployeeName}}</span>
                        </td>
                        <td>
                            <span>{{item.buyCustomer}}</span>
                        </td>
                        <td><a @click="clickDetail(item.id,'myOffer')">{{item.buyCustomerName}}</a></td>
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
                        <td>
                            <button class="btn btn-success btn-xs" @click="offerAccept(item)">处理</button>
                        </td>
                    </tr>
                    <tr v-show="param.init=='initAllIndentOfferList'" v-for="item in initAllIndentOfferList">
                        <td>{{item.otime.substr(0,19)}}</td>
                        <!-- <td>{{item.source | offerType}}</td> -->
                        <td>{{item.offerCustomer}}</td>
                        <td>{{item.offerCustomerName}}</td>
                        <td>{{item.offerEmployeeName}}</td>
                        <td>{{item.buyEmployeeName}}</td>
                        <td>{{item.buyCustomer}}</td>
                        <td><a @click="clickDetail(item.id,'allOffer')">{{item.buyCustomerName}}</a></td>
                        <td style="text-align:left">
                            <p style="font-size: 16px;">{{item.breedName}}</p>
                            <p style="color:#666">产地：{{item.location | province}}</p>
                        </td>
                        
                        <!-- <td>{{item.location | province}}</td> -->
                        <!-- <td>{{item.number}}{{item.unit | Unit}}</td> -->
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
                        <!-- <td>{{item.source | offerType}}：<span class="offer_source">{{item.clients | indentSource}}</span></td> -->
                        <!-- <td></td> -->
                        <!-- <td>
                            <Poptip placement="left" trigger="hover">
                                <span>{{item.description | textDisplay '5'}}</span>
                                <div class="api" slot="content">
                                    {{item.description}}
                                </div>
                            </Poptip>
                        </td> -->
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
import {offerSource,offerAudit} from '../../../common/searchData.js'
import mglistModel from '../../mguan/mgListComponent.vue'
import util from '../../tools/util.js'
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
            options:{
                offerSource,
                offerAudit
            },
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
                buyEmployeeName:'',
                buyEmployee:'',
                breedId: "",
                breedName: "",
                accept: "",
                onSell: "",
                effective: "",
                startTime: "",
                endTime: "",
                source:'',
                buyOroffer:'',
                buyCustomer:'',
                validate:''
            },
            detailParam: {
                show: false,
                loading: true,
                idOrName: true,
                link: "/intention/offers/",
                id: "",
                intoType:''
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
            checked: false

        }
    },
    methods: {
        checkedAll: function() {
            this.checked = !this.checked;
            if (this.checked) {
                this.$store.state.table.myIndentOfferList.forEach(function(item) {
                    item.checked = true;
                })
            } else {
                this.$store.state.table.myIndentOfferList.forEach(function(item) {
                    item.checked = false;
                })
            }
        },
        onlyselected: function(sub, id) {
            //this.id = id;
            const _this = this;
            this.$store.state.table.myIndentOfferList[sub].checked = !this.$store.state.table.myIndentOfferList[sub].checked;
            if (!this.$store.state.table.myIndentOfferList[sub].checked) {
                _this.checked = false;
            } else {
                _this.checked = true;
                this.$store.state.table.myIndentOfferList.forEach(function(item) {
                    if (!item.checked) {
                        _this.checked = false;
                    }
                })
            }
        },
        clickAccept: function(accept) {
            this.loadParam.cur = 1;
            this.loadParam.accept = accept;
            this.selectSearch();
        },
        clickOnSell: function(onSell) {
            this.loadParam.cur = 1;
            this.loadParam.onSell = onSell;
            this.selectSearch();
        },
        clickEffective: function(effective) {
            this.loadParam.cur = 1;
            this.loadParam.effective = effective;
            this.selectSearch();
        },
        breedSearch: function() {
            this.breedSearchParam.show = true;
        },
        selectEmployee: function(data) {
            this.employeeParam.show = true;
            this.loadParam.buyOroffer = data
        },
        selectSearch: function() {
            this.checked = false;
            this.getIndentOffers(this.loadParam);
        },
        todayOffer: function() {
            this.loadParam.startTime = util.getDate(0);
            this.loadParam.endTime = util.getDate(1);
            this.selectSearch();
        },
        weekOffer: function() {
            this.loadParam.startTime = util.getMonday();
            this.loadParam.endTime = util.getDate(1);
            this.selectSearch();
        },
        resetCondition: function() {
            this.loadParam.buyCustomer="";
            this.loadParam.offerEmployee = "";
            this.loadParam.offerEmployeeName = "";
            this.loadParam.buyEmployeeName = ''
            this.loadParam.buyEmployee = ''
            this.loadParam.breedId = "";
            this.loadParam.breedName = "";
            this.loadParam.accept = "";
            this.loadParam.onSell = "";
            this.loadParam.startTime = "";
            this.loadParam.endTime = "";
            this.loadParam.effective = "";
            this.loadParam.validate = "";
            this.selectSearch();
        },
        clickDetail: function(id,type) {
            
            this.detailParam.id = id;
            this.detailParam.intoType = type
            this.detailParam.show = true;
        },
        offerAccept: function(item) {
            this.offerAcceptParam.id = item.id;
            this.offerAcceptParam.show = true;
        },
        batchAccept: function() {
            let list = this.initMyIndentOfferList;
            let offerIds = [];
            for (let i = 0; i < list.length; i++) {
                if (list[i].checked) {
                    offerIds.push(list[i].id);
                }
            }
            if (offerIds.length <= 0) {
                this.tipsParam.show = true;
                this.tipsParam.name = "请至少选择一条报价！";
                return;
            }
            this.offerAcceptParam.id = offerIds.join(",");
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
            this.selectSearch();
        },
        breed: function(breed) {
            this.loadParam.breedId = breed.breedId;
            this.loadParam.breedName = breed.breedName;
            this.selectSearch();
        },
        a: function(employee) {
            if(this.loadParam.buyOroffer == 'offer'){
                this.loadParam.offerEmployee = employee.employeeId;
                this.loadParam.offerEmployeeName = employee.employeeName;
            }else if(this.loadParam.buyOroffer == 'buy'){
                this.loadParam.buyEmployee = employee.employeeId;
                this.loadParam.buyEmployeeName = employee.employeeName;
            }
            
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
    width: 155px;
    min-width: 100px;
}

.offer_source {
    display: inline-block;
    width: 100px;
    line-height: 20px;
    background: #2d8cf0;
    border-radius: 3px;
    color: #fff;
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
