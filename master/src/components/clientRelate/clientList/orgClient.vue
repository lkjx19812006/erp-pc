<template>
     <bigclient :param="orgParam"></bigclient>
</template>
<<<<<<< HEAD
<script type="text/javascript">
  import bigclient from './BigClient.vue'
  
  export default{
    data(){
        return{
            orgParam:{
                url:"/customer/orgDistributed",
                id:1
            }
            
=======
<script>
import filter from '../../../filters/filters'
import pagination from '../../../components/pagination'
import detailModel from '../../../components/clientRelate/clientDetail'
//import createModel from '../components/clientRelate/clientCreate'
import createModel from '../../../components/user/userTransfer'
import deletebreedModel from '../../../components/serviceBaselist/breedDetailDialog/deleteBreedDetail'
import alterinfoModel from '../../../components/clientRelate/clientUpdate'
import transferModel from '../../../components/user/employeeOrOrg'
import tipsdialogModel from '../../../components/tips/tipDialog'
import searchModel from '../../../components/clientRelate/searchModel'
//单个业务员搜索
import employeeModel from '../searchEmpInfo'
import setSupplier from '../setSupplier.vue'
import setBlacklist from '../setBlacklist.vue'
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import languageModel from '../../tools/language.vue'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
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
    transferInfo,
    customerTransferBlacklist
} from '../../../vuex/actions'

export default {
    components: {
        pagination,
        detailModel,
        createModel,
        deletebreedModel,
        alterinfoModel,
        transferModel,
        employeeModel,
        tipsdialogModel,
        searchModel,
        setSupplier,
        setBlacklist,
        languageModel,
        mglistModel
    },
    vuex: {
        getters: {
            initOrgCustomerlist,
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
            customerTransferBlacklist
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
                link: '/customer/orgDistributed',
                key: 'orgCustomerList',
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
            provinceParam: {
                loading: true,
                show: true,
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
            employeeParam: {
                show: false,
                org: false,
                orgId: this.initLogin.orgId,
                //单个业务员搜索
                employeeId: '',
                employeeName: '',
                //多个业务员搜索
                employeeIds: '',
                employeeNames: '',

            },
            searchParam: {
                show: false,
            },
            transferParam: {
                show: false,
                name: '',
                arr: [],
                sign: 'org',
                orgId: '',
                employeeId: ''
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
                name: '请先选择客户'
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
        selectEmployee: function() {
            this.employeeParam.show = true;
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
            this.loadParam.audit = '';
            this.loadParam.ctimeEnd = '';
            this.loadParam.orderSum = '';
            this.getClientList(this.loadParam);
        },
        eventClick: function(id) {
            if (this.$store.state.table.basicBaseList.orgCustomerList[id].show) {
                this.$store.state.table.basicBaseList.orgCustomerList[id].show = !this.$store.state.table.basicBaseList.orgCustomerList[id].show;
            } else {
                this.$store.state.table.basicBaseList.orgCustomerList[id].show = true;
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
            for (var i in this.initOrgCustomerlist) {
                if (this.initOrgCustomerlist[i].checked) {
                    this.transferParam.arr.push(this.initOrgCustomerlist[i].id);
                }
            }

            if (this.transferParam.arr.length > 0) {
                this.transferParam.show = true;
                this.transferParam.callback = this.transferback;
            } else {
                this.tipsParam.show = true;
                this.tipsParam.alert = true;
            }


        },
        //客户提取为供应商
        clientTransferSupplier: function() {
            this.supplierParam.link = '/customer/setSupplier';
            this.supplierParam.customerIds = [];
            for (var i in this.initOrgCustomerlist) {
                if (this.initOrgCustomerlist[i].checked) {
                    this.supplierParam.customerIds.push(this.initOrgCustomerlist[i].id);
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
            for (var i in this.initOrgCustomerlist) {
                if (this.initOrgCustomerlist[i].checked) {
                    this.blacklistParam.customerIds.push(this.initOrgCustomerlist[i].id);
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
        transferback: function(title) {

            this.tipsParam.show = true;
            if (title == 'success') {
                this.tipsParam.name = '划转成功';
            } else {
                this.tipsParam.name = title;
            }

            this.tipsParam.alert = true;
        },
        checkedAll: function() {
            this.checked = !this.checked;
            if (this.checked) {
                this.$store.state.table.basicBaseList.orgCustomerList.forEach(function(item) {
                    item.checked = true;
                })
            } else {
                this.$store.state.table.basicBaseList.orgCustomerList.forEach(function(item) {
                    item.checked = false;
                })
            }
        },
        onlyselected: function(sub, id) {

            //this.id = id;

            const _this = this;
            this.$store.state.table.basicBaseList.orgCustomerList[sub].checked = !this.$store.state.table.basicBaseList.orgCustomerList[sub].checked;
            if (!this.$store.state.table.basicBaseList.orgCustomerList[sub].checked) {
                _this.checked = false;
            } else {
                _this.checked = true;
                this.$store.state.table.basicBaseList.orgCustomerList.forEach(function(item) {
                    if (!item.checked) {
                        _this.checked = false;
                    }
                })
            }
        },
        selectSearch: function() {
            this.getClientList(this.loadParam);
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
>>>>>>> 321458d2db61ca93af1dbe138ff6332c50a290ee
        }
    },
    components:{
   bigclient
    }
  }
</script>
<style type="text/css"></style>