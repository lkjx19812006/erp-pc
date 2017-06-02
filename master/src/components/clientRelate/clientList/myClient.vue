<template>
    <div>
        <import-customer-model :param="excelImportParam" v-if="excelImportParam.show"></import-customer-model>
        <create-model :param="createParam" v-if="createParam.show"></create-model>
        <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
        <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
        <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
        <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <search-model :param="loadParam" v-if="loadParam.show"></search-model>
        <audit-dialog :param="auditParam" v-if="auditParam.show"></audit-dialog>
        <updatetracking-model :param="updateTrackingParam" v-if="updateTrackingParam.show"></updatetracking-model>
        <language-model v-show="false"></language-model>
        <mglist-model>
            <!-- 头部搜索-->
            <div slot="top">
                <div class="clear" style="margin-top:3px;">
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t("static.client_name")}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.name" placeholder="{{$t('static.Enter_search')}}" @keyup.enter="selectSearch()">
                        </dd>
                        <!-- 客户id -->
                        <dt class="left transfer marg_top" style="margin-left:5px">{{$t("static.client_id")}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.id" placeholder="{{$t('static.Enter_search')}}" @keyup.enter="selectSearch()">
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t("static.province_of_phone")}}：</dt>
                        <dd class="left">
                            <select v-model="loadParam.phoneProvinceName" class="form-control" @change="selectSearch()">
                                <option value="">{{$t("static.please_select")}}</option>
                                <option v-for="item in initProvince">{{item.cname}}</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clear left transfer" style="width:330px">
                        <dt class="left transfer marg_top">{{$t("static.client_type")}}：</dt>
                        <dd class="left" style="width:60%;">
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
                    <dl class="clear left transfer" v-if="this.initLogin.orgId==29">
                        <dt class="left transfer marg_top">客服跟进情况：</dt>
                        <dd class="left">
                            <select v-model="loadParam.audit" class="form-control" @change="selectSearch()">
                                <option value="">{{$t("static.please_select")}}</option>
                                <option value="0">初始</option>
                                <option value="1">跟进中</option>
                                <option value="2">有效</option>
                                <option value="3">无效</option>
                            </select>
                        </dd>
                    </dl>
                </div>
                <div class="clear" style="margin-top:3px;">
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top" style="letter-spacing:3px">{{$t("static.cellphone")}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.phone" placeholder="{{$t('static.Enter_search')}}" @keyup.enter="selectSearch()">
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t("static.credit_rating")}}：</dt>
                        <dd class="left">
                            <select v-model="loadParam.creditLevel" class="form-control" @change="selectSearch()">
                                <option value="">{{$t("static.please_select")}}</option>
                                <option value="0">{{$t("static.none")}}</option>
                                <option value="1">{{$t("static.one_star")}}</option>
                                <option value="2">{{$t("static.two_star")}}</option>
                                <option value="3">{{$t("static.three_star")}}</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t("static.business_scope")}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" style="width:80%" v-model="loadParam.bizScope" placeholder="{{$t('static.Enter_search')}}" @keyup.enter="selectSearch()">
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">已成交：</dt>
                        <label class="checkbox_unselect" style="background-position:1px 5px" v-bind:class="{'checkbox_unselect':!loadParam.orderSum,'checkbox_select':loadParam.orderSum}" id="client_ids" @click="selectOrderSum()"></label>
                    </dl>
                    <dd class="left transfer">
                        <button type="button" class="btn btn-default" height="24" width="24" @click="selectSearch()">{{$t("static.search")}}</button>
                    </dd>
                    <dd class="left">
                        <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">{{$t("static.clear_all")}}</button>
                    </dd>
                    <dd class="pull-right" style="margin-right:20px">
                        <!-- <button type="button" class="btn btn-default" @click="clientTransfer({
                        arr:[],
                        name:'test',
                        employeeId:'',
                        orgId:'',
                        show:true
                        })">{{$t("static.assigned_to_employee")}}</button> -->
                        <button type="button" class="btn btn-default" @click="clientTransferBlack()">{{$t("static.drag_into_blacklist")}}</button>
                        <button type="button" class="btn btn-default" @click="clientTransferSupplier()">{{$t("static.make_them_become_supplier")}}</button>
                        <button type="button" class="btn btn-default" @click="createCustomer({
                                            show:true,
                                            loading:false,
                                            id:'',
                                            category:'',
                                            typeDesc:'其他',
                                            classify:'1,买',
                                            type:0,
                                            scale:0,
                                            nature:0,
                                            advance:1,
                                            capitalReturnDays:0,
                                            name:'',
                                            mainPhone:'',
                                            principal:'',
                                            legalPerson:'',
                                            bizScope:'',
                                            province:'',
                                            city:'',
                                            address:'',
                                            number:'',
                                            website:'',
                                            email:'',
                                            employee:'',
                                            employeeId:this.initLogin.id,
                                            employeeName:this.initLogin.name,
                                            orgId:this.initLogin.orgId,
                                            orgName:'',
                                            contacts:[
                                                {
                                                    mainContact:'',
                                                    name:'',
                                                    position:'',
                                                    department:'',
                                                    phone:'',
                                                    tel:'',
                                                    email:'',
                                                    qq:'',
                                                    wechart:'',
                                                    main:'',
                                                }
                                            ],
                                            link:saveCreate,
                                            key:'myCustomerList'
                                            })">{{$t("static.new")}}</button>
                        <!-- EXCEL导入客户 -->
                        <button type="button" class="btn btn-primary" @click="excelImport()">{{$t('static.upload_clients')}}</button>
                        <button type="button" class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
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
                            <th>
                                <!-- <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label> -->
                            </th>
                            <th>{{$t('static.salesman')}}</th>
                            <th>{{$t('static.create_time')}}</th>
                            <th>{{$t('static.recent_contact')}}</th>
                            <th>{{$t('static.client_name')}}</th>
                            <th>{{$t('static.transaction_num')}}</th>
                            <th>成交金额</th>
                            <th>{{$t('static.client_type')}}</th>
                            <th>{{$t('static.contact')}}</th>
                            <th>{{$t('static.position')}}</th>
                            <th>{{$t('static.cellphone')}}</th>
                            <th>{{$t('static.telephone')}}</th>
                            <th>{{$t('static.phone_origin')}}</th>
                            <th>{{$t('static.client_origin')}}</th>
                            <th>{{$t('static.detailed_address')}}</th>
                            <th>{{$t('static.main_product')}}</th>
                            <th v-if="this.initLogin.orgId==29">跟进状态</th>
                            <th v-if="this.initLogin.orgId==29">跟进说明</th>
                            <th>
                                <span>{{$t("static.operation")}}</span>
                                <span v-if="this.initLogin.orgId==29"></span>
                            </th>
                        </tr>
                    </thead>
                    <tr>
                        <th>
                            <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids" @click="checkedAll()"></label>
                        </th>
                        <th style="color:#fa6705;font-size: 14px">全选</th>
                        <th colspan="13"></th>
                        <th v-if="this.initLogin.orgId==29"></th>
                        <th v-if="this.initLogin.orgId==29"></th>
                        <th v-if="this.initLogin.orgId==29"></th>
                    </tr>
                    <tbody>
                        <tr>
                        </tr>
                        <tr v-for="item in initMyCustomerlist">
                            <td @click.stop="">
                                <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index,item.id)"></label>
                            </td>
                            <td>{{item.employeeName}}</td>
                            <!-- 修改时间 -->
                            <td>{{item.ctime | timeFilters}}</td>
                            <td>{{item.lastOrderTime | timeFilters}}</td>
                            <td class="underline" @click="clickOn({
                                id:item.id,
                                sub:$index,
                                show:true,
                                name:item.name,
                                link:alterInfo,
                                loading:true,
                                url:'/customer/',
                                key:'myCustomerList'
                                })">{{item.name}}</td>
                            <td>{{item.orderTotal}}</td>
                            <td>{{item.orderAmount}}元</td>
                            <td v-if="this.language=='zh_CN'">{{item.typeDesc}}</td>
                            <td v-if="this.language=='en'">{{item.type | customerTypeEn}}</td>
                            <td>{{item.mainContact}}</td>
                            <td>{{item.mainPosition}}</td>
                            <td>{{item.mainPhone}}</td>
                            <td>{{item.tel}}</td>
                            <td>{{item.phoneProvince}}{{item.phoneCity}}</td>
                            <td>{{item.provinceName}}{{item.cityName}}</td>
                            <td>{{item.address}}</td>
                            <td>{{item.bizScope}}</td>
                            <td v-if="this.initLogin.orgId==29">{{item.audit | tracking}}</td>
                            <td v-if="this.initLogin.orgId==29">{{item.auditComment}}</td>
                            <td>
                                <a class="btn btn-default" style="padding:1px 5px;font-size: 12px;" @click="modifyClient({
                                    id:item.id,
                                    sub:$index,
                                    show:true,
                                    name:item.name,
                                    type:item.type,
                                    typeDesc:item.typeDesc,
                                    scale:item.scale,
                                    nature:item.nature,
                                    advance:item.advance,
                                    capitalReturnDays:item.capitalReturnDays,
                                    classifyDesc:item.classifyDesc,
                                    classify:item.classify,
                                    category:item.category,
                                    principal:item.principal,
                                    legalPerson:item.legalPerson,
                                    bizScope:item.bizScope,
                                    mainPhone:item.mainPhone,
                                    tel:item.tel,
                                    email:item.email,
                                    country:item.country,
                                    countryName:item.countryName,
                                    province:item.province,
                                    provinceName:item.provinceName,
                                    city:item.city,
                                    cityName:item.cityName,
                                    address:item.address,
                                    number:item.number,
                                    website:item.website,
                                    comments:item.comments,
                                    creditLevel:item.creditLevel,
                                    link:alterInfo,
                                    url:'/customer/',
                                    key:'myCustomerList',
                                    employeeId:item.employeeId,
                                    employeeName:item.employeeName,
                                    orgId:item.orgId
                                    })">编辑</a>
                                <a v-if="this.initLogin.orgId==29" class="btn btn-success" style="padding:1px 5px;font-size: 12px;" @click="updateTracking(item,$index)">跟进</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--底部分页-->
            <pagination :combination="loadParam" slot="page"></pagination>
        </mglist-model>
    </div>
</template>
<script>
import filter from '../../../filters/filters'
import pagination from '../../../components/pagination'
import importCustomerModel from '../customerExcelImport.vue'
import detailModel from '../../../components/clientRelate/clientDetail'
import createModel from '../../../components/user/userTransfer'
import deletebreedModel from '../../../components/serviceBaselist/breedDetailDialog/deleteBreedDetail'
import alterinfoModel from '../../../components/clientRelate/clientUpdate'
import transferModel from '../../../components/user/employeeOrOrg'
import tipsdialogModel from '../../../components/tips/tipDialog'
import searchModel from '../../../components/clientRelate/searchModel'
import auditDialog from '../../../components/tips/auditDialog'
import updatetrackingModel from '../../../components/tips/auditDialog'
import vSelect from '../../tools/vueSelect/components/Select'
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import languageModel from '../../tools/language'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
    initMyCustomerlist,
    initProvince,
    initLogin
} from '../../../vuex/getters'
import {
    getClientList,
    getProvinceList,
    deleteInfo,
    alterInfo,
    saveCreate,
    transferInfo,
    customerTransferBlacklist,
    customerAudit,
    importCustomer
} from '../../../vuex/actions'

export default {
    components: {
        pagination,
        detailModel,
        importCustomerModel,
        createModel,
        deletebreedModel,
        alterinfoModel,
        transferModel,
        tipsdialogModel,
        searchModel,
        auditDialog,
        updatetrackingModel,
        vSelect,
        languageModel,
        mglistModel
    },
    vuex: {
        getters: {
            initMyCustomerlist,
            initProvince,
            initLogin
        },
        actions: {
            getClientList,
            getProvinceList,
            deleteInfo,
            alterInfo,
            saveCreate,
            transferInfo,
            customerTransferBlacklist,
            customerAudit,
            importCustomer
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
                link: '/customer/employeeDistributed',
                key: 'myCustomerList',
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
                ctimeStart: '',
                ctimeEnd: '',
                audit: '',
                orderSum: ''
            },
            language: '',
            excelImportParam: {
                show: false,
                loading: false, //上传时显示载入样式
                success: false, //是否上传成功
                result: "", // 导入成功后的返回信息
                link: this.importCustomer,
                country: "", //客户所属国家
                type: "", //客户类型
                mFile: "" //excel文件

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
                name: '',
            },
            searchParam: {
                show: false
            },
            updateTrackingParam: {
                show: false,
                title: '跟进',
                tracking: true,
                link: '/customer/audit',
                key: 'myCustomerList',
                sub: '',
                indexs: '',
                id: '',
                ids: '',
                audit: '',
                auditComment: '',
                wait: this.waitTracking,
                pass: this.passTracking,
                reject: this.rejectTracking,
                callback: this.trackingback
            },
            transferParam: {
                show: false,
                name: '',
                orgId: '',
                employeeId: '',
                arr: []
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
                alert: true
            },
            auditParam: {
                link: '/customer/transferBlacklist',
                key: 'myCustomerList',
                show: false,
                title: '客户拉入黑名单备注',
                arr: [],
                blacklist: 1,
                auditComment: '',
                blackComments: '',
                callback: this.callback
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
        selectSearch: function() {
            this.getClientList(this.loadParam);
        },
        excelImport: function() {
            this.excelImportParam.success = false;
            this.excelImportParam.show = true;
        },
        clickOn: function(param) {
            this.changeParam = param;
        },
        updateTracking: function(item, index) {
            this.updateTrackingParam.sub = index;
            this.updateTrackingParam.indexs = [index];
            this.updateTrackingParam.id = item.id;
            this.updateTrackingParam.ids = [item.id];
            this.updateTrackingParam.auditComment = item.auditComment;
            this.updateTrackingParam.show = true;
        },
        waitTracking: function() {
            this.updateTrackingParam.audit = 1;
            this.updateTrackingParam.callback = this.trackCallback;
            this.customerAudit(this.updateTrackingParam);
        },
        passTracking: function() {
            this.updateTrackingParam.audit = 2;
            this.updateTrackingParam.callback = this.trackCallback;
            this.customerAudit(this.updateTrackingParam);
        },
        rejectTracking: function() {
            this.updateTrackingParam.audit = 3;
            this.updateTrackingParam.callback = this.trackCallback;
            this.customerAudit(this.updateTrackingParam);
        },
        trackingback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
        },

        createCustomer: function(info) {
            this.createParam = info;
            this.createParam.callback = this.valueback;
        },
        valueback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.getClientList(this.loadParam)
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
            this.loadParam.audit = '';
            this.loadParam.ctimeStart = '';
            this.loadParam.ctimeEnd = '';
            this.loadParam.orderSum = '';
            this.getClientList(this.loadParam);
        },
        eventClick: function(id) {
            if (this.$store.state.table.basicBaseList.myCustomerList[id].show) {
                this.$store.state.table.basicBaseList.myCustomerList[id].show = !this.$store.state.table.basicBaseList.myCustomerList[id].show;
            } else {
                this.$store.state.table.basicBaseList.myCustomerList[id].show = true;
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
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.getClientList(this.loadParam);
        },
        clientTransfer: function() {
            this.transferParam.arr = [];
            for (var i in this.initMyCustomerlist) {
                if (this.initMyCustomerlist[i].checked) {
                    this.transferParam.arr.push(this.initMyCustomerlist[i].id);
                }
            }
            if (this.transferParam.arr.length > 0) {
                this.transferParam.show = true;
            } else {
                this.tipsParam.show = true;
                this.tipsParam.alert = true;
            }
            this.transferParam.callback = this.transferback;
        },
        transferback: function(title) {
            this.tipsParam.show = true;
            if (title == 'success') {
                this.tipsParam.name = '划转成功';
            } else {
                this.tipsParam.name = title;
            }

            this.tipsParam.alert = true;
        },
        clientTransferSupplier: function() {
            this.auditParam.title = "客户提取为供应商备注";
            this.auditParam.link = '/customer/setSupplier';
            this.auditParam.arr = [];
            for (var i in this.initMyCustomerlist) {
                if (this.initMyCustomerlist[i].checked) {
                    this.auditParam.arr.push(this.initMyCustomerlist[i].id);
                }
            }
            if (this.auditParam.arr.length > 0) {
                this.auditParam.show = true;
                this.auditParam.confirm = true;
                this.auditParam.callback = this.callback;
            } else {
                this.tipsParam.show = true;
                this.tipsParam.alert = true;
                this.tipsParam.name = '请先选择客户';
                this.tipsParam.confirm = false;
            }
        },
        clientTransferBlack: function() {
            this.auditParam.title = "客户踢入黑名单备注";
            this.auditParam.arr = [];
            for (var i in this.initMyCustomerlist) {
                if (this.initMyCustomerlist[i].checked) {
                    this.auditParam.arr.push(this.initMyCustomerlist[i].id);
                }
            }
            if (this.auditParam.arr.length > 0) {
                this.auditParam.show = true;
                this.auditParam.confirm = true;
                this.auditParam.callback = this.callback;
            } else {
                this.tipsParam.show = true;
                this.tipsParam.alert = true;
                this.tipsParam.name = '请先选择客户';
                this.tipsParam.confirm = false;
            }
        },
        callback: function() {
            this.auditParam.blackComments = this.auditParam.auditComment;
            this.auditParam.customerIds = this.auditParam.arr;
            this.auditParam.auditComment = '';
            this.auditParam.callback = this.supplierback;
            this.customerTransferBlacklist(this.auditParam);
        },
        supplierback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
        },
        trackCallback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.getClientList(this.loadParam);
        },
        checkedAll: function() {
            this.checked = !this.checked;
            if (this.checked) {
                this.$store.state.table.basicBaseList.myCustomerList.forEach(function(item) {
                    item.checked = true;
                })
            } else {
                this.$store.state.table.basicBaseList.myCustomerList.forEach(function(item) {
                    item.checked = false;
                })
            }
        },
        onlyselected: function(sub, id) {
            //this.id = id;
            const _this = this;
            this.$store.state.table.basicBaseList.myCustomerList[sub].checked = !this.$store.state.table.basicBaseList.myCustomerList[sub].checked;
            if (!this.$store.state.table.basicBaseList.myCustomerList[sub].checked) {
                _this.checked = false;
            } else {
                _this.checked = true;
                this.$store.state.table.basicBaseList.myCustomerList.forEach(function(item) {
                    if (!item.checked) {
                        _this.checked = false;
                    }
                })
            }
        },
        searchClient: function() {
            this.getClientList(this.loadParam)
        }
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
        changeMenu(this.$store.state.table.isTop, this.getClientList, this.loadParam, localStorage.myClientParam);
        this.language = localStorage.lang;
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

.table>tbody>tr>td {
    max-width: 300px;
    white-space: normal;
    word-wrap: break-word;
    /* word-break:break-all; */
}

.component_action {
    right: 30px;
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
    width: 113px;
    min-width: 6px;
}

.service-nav {
    padding: 23px 30px 0px 4px;
}

dl {
    margin-bottom: 5px;
}

#table_height {
    height: 530px;
    overflow-y: auto;
    position: relative;
}
</style>
