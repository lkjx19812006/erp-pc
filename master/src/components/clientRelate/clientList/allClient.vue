<template>
    <create-model :param="createParam" v-if="createParam.show"></create-model>
    <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
    <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
    <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <search-model :param="loadParam" v-if="loadParam.show"></search-model>
    <set-supplier :param="supplierParam" v-if="supplierParam.show"></set-supplier>
    <set-blacklist :param="blacklistParam" v-if="blacklistParam.show"></set-blacklist>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">客户名称：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.name" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                    <!-- 客户id -->
                    <dt class="left transfer marg_top" style="margin-left:5px">{{$t("static.client_id")}}：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.id" placeholder="{{$t('static.Enter_search')}}" @keyup.enter="selectSearch()">
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">手机省：</dt>
                    <dd class="left">
                        <select v-model="loadParam.phoneProvinceName" class="form-control" @change="selectSearch()">
                            <option value="">全部</option>
                            <option v-for="item in initProvince">{{item.cname}}</option>
                        </select>
                    </dd>
                </dl>
                <dl class="clear left transfer" style="width:192px">
                    <dt class="left transfer marg_top">客户类型：</dt>
                    <dd class="left" style="width:64%">
                        <select v-model="loadParam.type" class="form-control" @change="selectSearch()">
                            <option value="">{{$t("static.please_select")}}</option>
                            <option value="0">Others 其它</option>
                            <option value="1">Cooperatives 合作社</option>
                            <option value="2">Drug Makers 药商</option>
                            <option value="3">Factory 药厂</option>
                            <option value="4">Private Use 个体户</option>
                            <option value="5">Pharmacy 药店</option>
                            <option value="6">Hospital 医院</option>
                            <option value="7">Trading Company 贸易公司</option>
                            <option value="8">Retail 零售商行</option>
                            <option value="9">药农</option>
                            <option value="10">介绍人</option>
                            <option value="11">药贩子</option>
                            <option value="12">产地药商</option>
                            <option value="13">销地药商</option>
                            <option value="14">Acupuncture Clinic 养生诊所</option>
                            <option value="15">Chemical Company 化工厂</option>
                            <option value="16">Cosmetics Company 化妆品厂</option>
                            <option value="17">Extract Company 提取物厂</option>
                            <option value="18">Food Company 食品厂</option>
                            <option value="19">Laboratory for trial 实验室</option>
                            <option value="20">Online Company 网上电商</option>
                            <option value="21">Pharmaceutical producer of Chinese Traditional Patent Medicine 中成药生产商</option>
                            <option value="22">Pharmaceutical producer of Western Medicine 西药生产商</option>
                            <option value="23">Pieces Factory 饮片厂</option>
                            <option value="24">Herb tea company 茶类公司</option>
                        </select>
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <div class="client-detailInfo col-xs-6">
                        <dt class="left transfer marg_top">注册起始时间：</dt>
                        <mz-datepicker :time.sync="loadParam.ctimeStart" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">未跟进天数：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.trackingDay" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                </dl>
            </div>
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top" style="letter-spacing:3px">手机号：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.phone" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">信用等级：</dt>
                    <dd class="left">
                        <select v-model="loadParam.creditLevel" class="form-control" @change="selectSearch()">
                            <option value="">{{$t("static.please_select")}}</option>
                            <option value="0">{{$t("static.none")}}</option>
                            <option value="1">{{$t("static.one_star")}}</option>
                            <option value="2">{{$t("static.two_star")}}</option>
                            <option value="3">{{$t("static.three_star")}}</option>
                            <option value="4">{{$t("static.four_star")}}</option>
                            <option value="5">{{$t("static.five_star")}}</option>
                        </select>
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">经营范围：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" style="width:80%" v-model="loadParam.bizScope" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                </dl>
                <dl class="clear left transfer" style="margin-left:-33px;">
                    <div class="client-detailInfo col-xs-6">
                        <dt class="left transfer marg_top">注册结束时间：</dt>
                        <mz-datepicker :time.sync="loadParam.ctimeEnd" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                </dl>
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">已成交：</dt>
                    <label class="checkbox_unselect" style="background-position:1px 5px" v-bind:class="{'checkbox_unselect':!loadParam.orderSum,'checkbox_select':loadParam.orderSum}" id="client_ids" @click="selectOrderSum()"></label>
                </dl>
                <dd class="left" style="margin-left:20px">
                    <button type="button" class="btn btn-default" height="24" width="24" @click="selectSearch()">搜索</button>
                </dd>
                <dd class="left" style="margin-left:20px">
                    <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">清空条件</button>
                </dd>
                <dd class="pull-right" style="margin-right:20px">
                    <button type="button" class="btn btn-default" @click="clientTransfer({
                        arr:[],
                        name:'test',
                        employeeId:'',
                        orgId:'',
                        show:true
                        })">划转</button>
                    <button type="button" class="btn btn-default" @click="clientTransferBlack()">加入黑名单</button>
                    <button type="button" class="btn btn-default" @click="clientTransferSupplier()">提取供应商</button>
                    <button type="button" class="btn btn-primary" @click="selectSearch()">刷新</button>
                </dd>
            </div>
        </div>
        <!--中间列表-->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table data-toggle="table" class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th style="min-width: 40px;">
                            <!-- <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label> -->
                        </th>
                        <th>{{$t('static.client_name')}}</th>
                        <th>{{$t('static.client_id')}}</th>
                        <th>{{$t('static.contact')}}</th>
                        <th>{{$t('static.position')}}</th>
                        <th>{{$t('static.cellphone')}}</th>
                        <th>{{$t('static.phone_origin')}}</th>
                        <th>{{$t('static.telephone')}}</th>
                        <th style="min-width:145px;">{{$t('static.credit_rating')}}</th>
                        <th>{{$t('static.salesman')}}</th>
                        <th>{{$t('static.transaction_num')}}</th>
                        <th>{{$t('static.recent_contact')}}</th>
                        <th>成交金额</th>
                        <th>{{$t('static.client_type')}}</th>
                        <th>{{$t('static.client_origin')}}</th>
                        <th>{{$t('static.main_product')}}</th>
                        <th style="min-width:150px;">划转/来源</th>
                        <!-- <th>{{$t('static.detailed_address')}}</th> -->
                        <th>{{$t('static.create_time')}}</th>
                        <th v-if="this.initLogin.orgId==29">跟进状态</th>
                        <th v-if="this.initLogin.orgId==29">跟进说明</th>
                        <th>{{$t("static.operation")}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    </tr>
                    <tr v-for="item in initAllCustomerlist" :style="{background:(item.originalEmployee!=-1?'lightYellow':'')}">
                        <td @click.stop="" style="min-width: 40px">
                            <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index,item.id)"></label>
                        </td>
                        <td class="underline" @click="clickOn({
                                id:item.id,
                                sub:$index,
                                show:true,
                                loading:true,
                                name:item.name,
                                link:alterInfo,
                                url:'/customer/',
                                key:'allCustomerList'
                                })">{{item.name}}</td>
                        <td>{{item.id}}</td>
                        <td>{{item.mainContact}}</td>
                        <td>{{item.mainPosition}}</td>
                        <td>{{item.mainPhone}}</td>
                        <td>{{item.phoneProvince}}{{item.phoneCity}}</td>
                        <td>{{item.tel}}</td>
                        <td style="min-width:145px;">
                            <Rate disabled :value.sync="item.creditLevel"></Rate>
                        </td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.orderTotal}}</td>
                        <!-- <td>
                            <span v-if="item.originalEmployee==-1">--</span>
                            <span v-else>{{item.originalEmployeeName}}</span>
                        </td> -->
                        <td>
                            <span v-if="item.orderTotal!=0">{{item.lastOrderTime | timeFilters}}</span>
                            <span v-else>----:--:--</span>
                        </td>
                        <td>{{item.orderAmount}}元</td>
                        <td>{{item.type | customerType}}</td>
                        <td>{{item.provinceName}}{{item.cityName}}</td>
                        <td>{{item.bizScope}}</td>
                        <td>
                            <p style="color:red;border-bottom:1px solid #ccc" v-if="item.originalEmployee!=-1">
                                批量划转（{{item.originalEmployeeName}}）
                            </p>
                            <p>{{item.sourceType}}</p>
                        </td>
                        <td>{{item.ctime|timeFilters}}</td>
                        <td @click="modifyClient({
                                                id:item.id,
                                                sub:$index,
                                                show:true,
                                                name:item.name,
                                                type:item.type,
                                                typeDesc:item.typeDesc,
                                                classifyDesc:item.classifyDesc,
                                                scale:item.scale,
                                                nature:item.nature,
                                                advance:item.advance,
                                                capitalReturnDays:item.capitalReturnDays,
                                                classify:item.classify,
                                                category:item.category,
                                                principal:item.principal,
                                                bizScope:item.bizScope,
                                                mainPhone:item.mainPhone,
                                                email:item.email,
                                                country:item.country,
                                                countryName:item.countryName,
                                                province:item.province,
                                                provinceName:item.provinceName,
                                                city:item.city,
                                                cityName:item.cityName,
                                                address:item.address,
                                                comments:item.comments,
                                                creditLevel:item.creditLevel,
                                                link:alterInfo,
                                                url:'/customer/',
                                                key:'allCustomerList',
                                                employeeId:item.employeeId,
                                                employeeName:item.employeeName,
                                                orgId:item.orgId
                                                })">
                            <a class="operate"><img src="/static/images/{{$t('static.img_edit')}}.png" height="18" width="30" />
                            </a>
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
import pagination from '../../../components/pagination'
import detailModel from '../../../components/clientRelate/clientDetail'
import createModel from '../../../components/user/userTransfer'
import deletebreedModel from '../../../components/serviceBaselist/breedDetailDialog/deleteBreedDetail'
import alterinfoModel from '../../../components/clientRelate/clientUpdate'
import transferModel from '../../../components/user/employeeOrOrg'
import tipsdialogModel from '../../../components/tips/tipDialog'
import searchModel from '../../../components/clientRelate/searchModel'
import setSupplier from '../setSupplier.vue'
import setBlacklist from '../setBlacklist.vue'
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
    initAllCustomerlist,
    initProvince
} from '../../../vuex/getters'
import {
    getClientList,
    getProvinceList,
    deleteInfo,
    alterInfo,
    saveCreate,
    customerTransferBlacklist,
    transferInfo
} from '../../../vuex/actions'

export default {
    components: {
        pagination,
        detailModel,
        createModel,
        deletebreedModel,
        alterinfoModel,
        transferModel,
        tipsdialogModel,
        searchModel,
        setSupplier,
        setBlacklist,
        mglistModel
    },
    vuex: {
        getters: {
            initAllCustomerlist,
            initProvince
        },
        actions: {
            getClientList,
            getProvinceList,
            deleteInfo,
            alterInfo,
            saveCreate,
            customerTransferBlacklist,
            transferInfo
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total: 0,
                link: '/customer/',
                key: 'allCustomerList',
                name: '',
                id: '',
                phone: '',
                employeeId: '',
                employeeName: '',
                type: '',
                classify: '',
                status: '',
                bizScope: '',
                provinceName: '',
                province: '',
                city: '',
                cityName: '',
                phoneCityName: '',
                phoneProvinceName: '',
                label: '',
                creditLevel: '',
                trackingDay: '',
                orderSum: ''

            },
            provinceParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                country: ''
            },
            changeParam: {
                show: false,
                loading: true
            },
            createParam: {
                show: false,
                name: ''
            },
            searchParam: {
                show: false,

            },
            transferParam: {
                show: false,
                name: '',
                arr: [],
                sign: 'all',
                orgId: '',
                employeeId: '',
                flag: 'allClient'
            },
            deleteParam: {
                show: false
            },
            alterParam: {
                show: false,
                id: ''
            },
            tipsParam: {
                show: false,
                name: '请先选择客户',
                arr: []
            },
            supplierParam: {
                show: false
            },
            blacklistParam: {
                show: false
            },
            checked: false
        }
    },
    methods: {
        selectOrderSum: function() {
            if (this.loadParam.orderSum === "") {
                this.loadParam.orderSum = 1;
            } else {
                this.loadParam.orderSum = ""
            }
            this.selectSearch();
        },
        clickOn: function(param) {
            this.changeParam = param;

        },
        createCustomer: function(info) {
            this.createParam = info;
            this.createParam.callback = this.valueback;
        },
        valueback: function(title) {
            console.log(title)
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
        },
        createSearch: function() {
            this.loadParam.show = true;
        },
        resetCondition: function() {
            this.loadParam.name = '';
            this.loadParam.id = '';
            this.loadParam.phone = '';
            this.loadParam.employeeId = '';
            this.loadParam.employeeName = '';
            this.loadParam.type = '';
            this.loadParam.classify = '';
            this.loadParam.status = '';
            this.loadParam.bizScope = '';
            this.loadParam.provinceName = '';
            this.loadParam.province = '';
            this.loadParam.city = '';
            this.loadParam.cityName = '';
            this.loadParam.phoneCityName = '';
            this.loadParam.phoneProvinceName = '';
            this.loadParam.label = '';
            this.loadParam.creditLevel = '';
            this.loadParam.ctimeStart = '';
            this.loadParam.ctimeEnd = '';
            this.loadParam.trackingDay = '';
            this.loadParam.orderSum = '';
            this.getClientList(this.loadParam);
        },
        eventClick: function(id) {
            if (this.$store.state.table.basicBaseList.allCustomerList[id].show) {
                this.$store.state.table.basicBaseList.allCustomerList[id].show = !this.$store.state.table.basicBaseList.allCustomerList[id].show;
            } else {
                this.$store.state.table.basicBaseList.allCustomerList[id].show = true;
            }
        },
        specDelete: function(param) {
            this.deleteParam = param;
        },
        modifyClient: function(param) {
            this.alterParam = param;
            this.alterParam.callback = this.updateback;
        },
        updateback: function(title) {
            console.log(title)
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
        },
        clientTransfer: function() {
            this.transferParam.arr = [];
            for (var i in this.initAllCustomerlist) {
                if (this.initAllCustomerlist[i].checked) {
                    this.transferParam.arr.push(this.initAllCustomerlist[i].id);
                }
            }
            if (this.transferParam.arr.length > 0) {
                this.transferParam.show = true;
                this.transferParam.callback = this.transferback;
            } else {
                this.tipsParam.alert = true;
                this.tipsParam.show = true;
            }
        },
        //客户提取为供应商
        clientTransferSupplier: function() {
            this.supplierParam.link = '/customer/setSupplier';
            this.supplierParam.customerIds = [];
            for (var i in this.initAllCustomerlist) {
                if (this.initAllCustomerlist[i].checked) {
                    this.supplierParam.customerIds.push(this.initAllCustomerlist[i].id);
                }
            }
            if (this.supplierParam.customerIds.length > 0) {
                this.supplierParam.show = true;
                this.supplierParam.supplier = 1;
                this.supplierParam.callback = this.supplierCallback;
            } else {
                this.showTips('请先选择客户');
            }
        },
        supplierCallback: function(name) {
            this.supplierParam.show = false;
            this.showTips(name);
            this.searchClient();
        },
        //客户加入黑名单
        clientTransferBlack: function() {
            this.blacklistParam.title = "加入黑名单";
            this.blacklistParam.link = '/customer/transferBlacklist';
            this.blacklistParam.customerIds = [];
            for (var i in this.initAllCustomerlist) {
                if (this.initAllCustomerlist[i].checked) {
                    this.blacklistParam.customerIds.push(this.initAllCustomerlist[i].id);
                }
            }
            if (this.blacklistParam.customerIds.length > 0) {
                this.blacklistParam.show = true;
                this.blacklistParam.blacklist = 1;
                this.blacklistParam.callback = this.blacklistCallback;
            } else {
                this.showTips('请先选择客户');
            }
        },
        blacklistCallback: function(name) {
            this.blacklistParam.show = false;
            this.showTips(name);
            this.searchClient();
        },
        checkedAll: function() {
            this.checked = !this.checked;
            if (this.checked) {
                this.$store.state.table.basicBaseList.allCustomerList.forEach(function(item) {
                    item.checked = true;
                })
            } else {
                this.$store.state.table.basicBaseList.allCustomerList.forEach(function(item) {
                    item.checked = false;
                })
            }
        },
        selectSearch: function() {
            this.getClientList(this.loadParam);
        },
        onlyselected: function(sub, id) {

            //this.id = id;

            const _this = this;
            this.$store.state.table.basicBaseList.allCustomerList[sub].checked = !this.$store.state.table.basicBaseList.allCustomerList[sub].checked;
            if (!this.$store.state.table.basicBaseList.allCustomerList[sub].checked) {
                _this.checked = false;
            } else {
                _this.checked = true;
                this.$store.state.table.basicBaseList.allCustomerList.forEach(function(item) {
                    if (!item.checked) {
                        _this.checked = false;
                    }
                })
            }
        },
        searchClient: function() {
            this.getClientList(this.loadParam)
        },
        showTips: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.name = name;
            this.tipsParam.alert = true;
        },
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getClientList(this.loadParam);
        },
        selectEmpOrOrg: function(param) {
            this.transferParam.employeeId = param.employeeId;
            this.transferParam.employeeName = param.employeeName;
            this.transferParam.orgId = param.orgId;
            this.transferParam.orgName = param.orgName;
            this.transferInfo(this.transferParam);
        }
    },
    created() {
        this.getProvinceList(this.provinceParam);
        changeMenu(this.$store.state.table.isTop, this.getClientList, this.loadParam, localStorage.allClientParam);
    },
    ready() {
        common('tab', 'table_box', 1);
    },
    filters: {
        timeFilters: function(mytime) {
            // debugger;
            return mytime ? mytime.substring(0, 10) : '';
        }
    }
}
</script>
<style scoped>
.breed_action {
    top: 33px;
    right: 106px;
}

.transfer {
    margin-right: 8px;
}

.ivu-rate {
    font-size: 14px!important;
    margin: 0px!important;
}

.table>tbody>tr>td {
    max-width: 300px;
    white-space: normal;
    word-wrap: break-word;
    /* word-break: inherit; */
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

.component_action {
    right: 30px;
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
    /* width: 107px; */
    min-width: 50px;
}

.service-nav {
    padding: 23px 30px 0px 4px;
}

dl {
    margin-bottom: 5px;
}

.client-detailInfo {
    padding: 0 15px 0px 15px;
}
</style>
