<template>
    <import-customer-model :param="excelImportParam" v-if="excelImportParam.show"></import-customer-model>
    <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
    <create-model :param="createParam" v-if="createParam.show"></create-model>
    <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
    <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <!-- <search-model :param="loadParam" v-if="loadParam.show"></search-model> -->
    <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
     <selectorg-model :param="selectOrgParam" v-if="selectOrgParam.show"></selectorg-model>
    <set-supplier :param="supplierParam" v-if="supplierParam.show"></set-supplier>
    <set-blacklist :param="blacklistParam" v-if="blacklistParam.show"></set-blacklist>
    <language-model v-show="false"></language-model>
    <mglist-model style="height:100%">
        <!-- 头部搜索-->
        <div slot="top">
            <search-model>
                <div slot="main">
                    <erp-search title="static.client_name" :value.sync="loadParam.name" @on-keyenter="selectSearch()"></erp-search>
                    <erp-search title="static.client_id" :value.sync="loadParam.id" @on-keyenter="selectSearch()"></erp-search>
                    <erp-select title="static.credit_rating" :value.sync="loadParam.creditLevel" :options="options.creditLevelOptions" @on-change="selectSearch()"></erp-select>
                    <erp-search title="static.cellphone" :value.sync="loadParam.phone" @on-keyenter="selectSearch()"></erp-search>
                    <erp-search title="static.department" v-if="showReg" :value.sync="loadParam.orgName" @on-click="selectOrg()" readonly='readonly'></erp-search>
                    <erp-search title="static.salesman" v-if='showTran' :value.sync="loadParam.employeeName" @on-click="selectEmployee()" readonly='readonly'></erp-search> 
                    <dl class="clear left transfer" v-if='showReg'>
                        <div class="left">
                            <dt class="left transfer marg_top" style="font-weight:bold;color:#666;font-size:14px;">{{$t('static.start_end')}}</dt>
                            <mz-datepicker :time.sync="loadParam.startTime" format="yyyy-MM-dd HH:mm:ss">
                            </mz-datepicker>
                        </div>
                        <div class="left">
                            <dt class="left marg_top">~~</dt>
                            <mz-datepicker :time.sync="loadParam.endTime" format="yyyy-MM-dd HH:mm:ss">
                            </mz-datepicker>
                        </div>
                    </dl>
                </div>
                <div slot="more">
                    <erp-select title="static.phone_origin" :value.sync="loadParam.phoneProvinceName" :options="options.provinceOptions" @on-change="selectSearch()"></erp-select>
                    <erp-search title="static.business_scope" :value.sync="loadParam.bizScope" @on-keyenter="selectSearch()"></erp-search>
                    <erp-search title="static.not_tracking_day" :value.sync="loadParam.trackingDay" @on-keyenter="selectSearch()"></erp-search>
                    <erp-select title="static.client_type" :value.sync="loadParam.type" :options="options.type" @on-change="selectSearch()"></erp-select>
                </div>
                <div slot="handle">
                    <dl class="clear left transfer" style="line-height:30px">
                    <dt class="left transfer marg_top">{{$t('static.dealed')}}：</dt>
                        <label class="checkbox_unselect" style="background-position:1px 5px" v-bind:class="{'checkbox_unselect':!loadParam.orderSum,'checkbox_select':loadParam.orderSum}" id="client_ids" @click="selectOrderSum()"></label>
                    </dl>
                    <button type="button" class="btn btn-default btn-success" style="border-radius:13%;width:70px;" @click="selectSearch()">{{$t('static.search')}}</button>
                    <button type="button" class="btn btn-default btn-warning" style="border-radius:12%" @click="resetCondition()">{{$t('static.clear_all')}}</button>
                    <button type="button" class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
                    <button type="button" class="btn btn-default btn-warning" v-if='showTran' @click="clientTransfer({
                        arr:[],
                        name:'test',
                        employeeId:'',
                        orgId:'',
                        show:true
                        })">{{$t('static.assigned_to_employee')}}</button>
                    <button type="button" class="btn btn-default btn-warning" @click="clientTransferBlack()">{{$t('static.drag_into_blacklist')}}</button>
                    <button type="button" class="btn btn-default btn-success" @click="clientTransferSupplier()">{{$t('static.make_them_become_supplier')}}</button>
                    <button type="button" v-if='!showTran' class="btn btn-success" @click="createCustomer({
                                            show:true,
                                            loading:false,
                                            id:'',
                                            category:'',
                                            typeDesc:'其他',
                                            classify:'1,买',
                                            type:0,
                                            scale:0,
                                            creditLevel:'3',
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
                        <button type="button" v-if='!showTran' class="btn btn-primary" @click="excelImport()">{{$t('static.upload_clients')}}</button>
                </div>
            </search-model>
        </div>
     <!-- /*Middle Part*/ -->
        <div slot="form";>
             <div class="cover_loading">
                    <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <table class="table table-hover table_color table-striped " v-cloak id="tab">
                    <thead>
                    <tr>
                        <th style="min-width: 40px;">
                        </th>
                        <th>{{$t('static.client_id')}}</th>
                        <th>{{$t('static.client_name')}}</th>     
                        <th>{{$t('static.contact')}}</th>
                        <th>{{$t('static.position')}}</th>
                        <th>{{$t('static.cellphone')}}</th>
                        <th>{{$t('static.phone_origin')}}</th>
                        <th>{{$t('static.telephone')}}</th>
                        <th style="min-width:145px;">{{$t('static.credit_rating')}}</th>
                        <th>{{$t('static.salesman')}}</th>
                        <th>{{$t('static.transaction_num')}}</th>
                        <th>{{$t('static.recent_contact')}}</th>
                        <th>{{$t('static.transcation_amount')}}</th>
                        <th>{{$t('static.client_type')}}</th> 
                        <th>{{$t('static.client_origin')}}</th>
                        <th>{{$t('static.chengjiaoleix')}}</th>
                        <th style="min-width:150px;">{{$t('static.assigned_to_employee')}}{{$t('static.customer_source')}}</th>
                        <!-- <th>{{$t('static.detailed_address')}}</th> -->
                        <th>{{$t('static.create_time')}}</th>
                        <th v-if="this.initLogin.orgId==29">跟进状态</th>
                        <th v-if="this.initLogin.orgId==29">跟进说明</th>
                        <th v-if='!showReg'>{{$t("static.operation")}}</th>
                    </tr>
               
                      <tr>
                        <th>
                            <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids" @click="checkedAll()"></label>
                        </th>
                        <th style="color:#fa6705;font-size: 14px">{{$t("static.Select_all")}}</th>
                        <th colspan="18"></th>
                        <th v-if="this.initLogin.orgId==29"></th>
                        <th v-if="this.initLogin.orgId==29"></th>
                        <th v-if="this.initLogin.orgId==29"></th>
                    </tr>
                     </thead>
                <tbody>
             
                    <tr v-for="item in initAllCustomerlist" :style="{background:(item.originalEmployee!=-1?'lightYellow':'')};" style="cursor:pointer">
                        <td @click.stop="" style="min-width: 40px">
                            <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index,item.id)"></label>
                        </td>
                        <td>{{item.id}}</td>
                        <td style="color:#4D79DB;font-weight:bold;" @click="clickOn({
                                id:item.id,
                                sub:$index,
                                show:true,
                                name:item.name,
                                link:alterInfo,
                                loading:true,
                                url:'/customer/',
                                key:'myCustomerList',
                                registerSource:true
                                })">{{item.name}}</td>
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
                            <p >{{item.sourceType}}</p>
                        </td>
                        <td>{{item.ctime|timeFilters}}</td>
                        <td  v-if='!showReg'>
                        <a class="btn btn-info btn-xs" @click="modifyClient({
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
                                                })">{{$t('static.edit')}}</a>
                                            
                                 <a class="btn btn-success btn-xs" v-show='!showTran' v-if="item['sort']==0" @click="setTop(item.id,1)">
                                    <Icon type="arrow-up-a"></Icon>
                                    {{$t('static.setToTop')}}
                                </a>
                                <a class="btn btn-warning btn-xs" v-else @click="cancelTop(item.id,0)">
                                    <Icon type="arrow-down-a"></Icon>
                                    {{$t('static.cancel_top')}}
                                </a>
                               <a v-if="this.initLogin.orgId==29" class="btn btn-success" style="padding:1px 5px;font-size: 12px;" @click="updateTracking(item,$index)">{{$t('static.tracking')}}</a>                          
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>            
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
//import searchModel from '../../../components/clientRelate/searchModel'
import setSupplier from '../setSupplier.vue'
import setBlacklist from '../setBlacklist.vue'
import importCustomerModel from '../customerExcelImport.vue'
import common from '../../../common/common'
import mglistModel from '../../mguan/mgListComponent.vue'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import filter from '../../../filters/filters'
import updatetrackingModel from '../../../components/tips/auditDialog'
import vSelect from '../../tools/vueSelect/components/Select'
//单个业务员
import employeeModel from '../searchEmpInfo'
import languageModel from '../../tools/language'
import selectorgModel from '../../../components/tips/treeDialog'
import {creditLevelOptions,bizTypeOptions,provinceOptions} from '../../../common/searchData.js'

import {
    initAllCustomerlist,
    initMyCustomerlist,
    initOrgCustomerlist,
    initProvince,
    initLogin
  
} from '../../../vuex/getters'
import {
    getClientList,
    getProvinceList,
    deleteInfo,
    alterInfo,
    saveCreate,
    customerTransferBlacklist,
    transferInfo,
    customerAudit,
    importCustomer,
    setClientTop

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
        //searchModel,
        mglistModel,
        importCustomerModel,
        employeeModel,
        languageModel,
        selectorgModel,
        setSupplier,
        setBlacklist
    },
    vuex: {
        getters: {
            initAllCustomerlist,
            initOrgCustomerlist,
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
            customerTransferBlacklist,
            transferInfo,
            customerAudit,
            importCustomer,
            setClientTop
        }
    },
    props:['param'],
    data() {
        return {
            options:{
                creditLevelOptions:creditLevelOptions,
                type:bizTypeOptions,
                provinceOptions:provinceOptions
            },
            pageID:'',//页面id
            showTran:'',//划转
            showSall:'',//全选
            showGt:'',//excel，置顶，新建
            showReg:'',//注册起始时间
           // url:['/customer/employeeDistributed','/customer/orgDistributed','/customer/'],
            loadParam: {
                loading: true,
                show: false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                pageSize:15,
                total: 0,
                link: this.param.url,
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
                orderSum: '',
                pageCallback:this.pageCallback,
                orgId:''
            },
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
                employeeParam: {
                show: false,
                org: true,
                orgId: this.initLogin.orgId,
                //单个业务员搜索
                employeeId: '',
                employeeName: '',
                //多个业务员搜索
                employeeIds: '',
                employeeNames: '',

            },
              selectOrgParam: {
                show: false,
                orgId: '',
                orgName: '',
                callback: this.orgCall,
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
                sign:'all',
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
            console.log(param)

        },
        //excel import
         excelImport: function() {
            this.excelImportParam.success = false;
            this.excelImportParam.show = true;
        },
       selectEmployee: function() {
            this.employeeParam.show = true;
        },
         selectOrg: function() {
            this.selectOrgParam.show = true;
        },
          orgCall: function() {
            if (this.selectOrgParam.orgId) {
                this.loadParam.orgId = this.selectOrgParam.orgId;
                this.loadParam.orgName = this.selectOrgParam.orgName;
                this.employeeParam.orgId = this.selectOrgParam.orgId;
            }
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
            this.loadParam.orgId='';
            this.loadParam.orgName='';
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
         transferback: function(title) {
            console.log(title)
            this.tipsParam.show = true;
            if (title == 'success') {
                this.tipsParam.name = '划转成功';
            } else {
                this.tipsParam.name = title;
            }

            this.tipsParam.alert = true;
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
            this.selectSearch();
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
            this.selectSearch();
        },
         showTips: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.name = name;
            this.tipsParam.alert = true;
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
         setTop:function(id,num){
            let data = {
                id:id,
                sortNum:num,
                callback:this.getClientList
            }
            this.setClientTop(data,this.loadParam)
        },
         cancelTop:function(id,num){
            let data = {
                id:id,
                sortNum:num,
                callback:this.getClientList
            }
            this.setClientTop(data,this.loadParam)
    },
    //跟进
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
        //显示隐藏状态管理函数
    changeBool:function(a,b,c,d){
        this.showTran=a;
        this.showSall=b;
        this.showGt=c;
        this.showReg=d;
    },
        //显示隐藏功能键
      funBtn:function(){
          if(this.param.id==0){
            this.changeBool(false,true,true,false);
            console.log('xx',this.showGt)
            changeMenu(this.$store.state.table.isTop, this.getClientList, this.loadParam, localStorage.myClientParam);
            this.changeBool()
          }else if(this.param.id==1){
       
           this.changeBool(true,true,false,false);
                   console.log(this.showGt)
            changeMenu(this.$store.state.table.isTop, this.getClientList, this.loadParam, localStorage.orgClientParam);
          }else if(this.param.id==2){
              
              this.changeBool(true,false,false,true);
               console.log(this.showGt)
             changeMenu(this.$store.state.table.isTop, this.getClientList, this.loadParam, localStorage.allClientParam);
          }else{
              console.log("nothing is here")
          }
      },
      pageCallback:function(data){
            this.loadParam.pageSize = data
            this.getClientList(this.loadParam)
      }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getClientList(this.loadParam);
        },
        a: function(employee) {
            this.loadParam.employeeId = employee.employeeId;
            this.loadParam.employeeName = employee.employeeName;
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
        this.funBtn()
        

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
.ivu-rate{
    font-size:14px!important;
    margin:0px!important;
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
#Dtable{
    flex:7;
}
#table_box table th,
#table_box table td {
    width: 100px; 
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
.clear .left{
    display: inline-block;
}
.clear .left button{
    outline: none;
}
.clear .pull-right button{
    outline: none;
}

</style>
