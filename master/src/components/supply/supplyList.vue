<template>
    <create-model :param="createParam" v-if="createParam.show"></create-model>
    <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
    <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
    <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
    <search-model :param="loadParam" v-if="loadParam.show"></search-model>
    <set-supplier :param="supplierParam" v-if="supplierParam.show"></set-supplier>
    <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
    <mglist-model>
        <!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">供应商名称：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.name" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>

                    <dt class="left transfer marg_top" style="margin-left:5px">供应商ID：</dt>
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
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">客户类型：</dt>
                    <dd class="left">
                        <select v-model="loadParam.type" class="form-control" @change="selectSearch()">
                            <option value="">全部</option>
                            <option value="0">其它</option>
                            <option value="1">合作社</option>
                            <option value="2">药商</option>
                            <option value="3">药厂</option>
                            <option value="4">个体户</option>
                            <option value="5">药店</option>
                            <option value="6">医院</option>
                            <option value="7">贸易公司</option>
                            <option value="8">零售商行</option>
                            <option value="9">药农</option>
                            <option value="10">介绍人</option>
                            <option value="11">药贩子</option>
                            <option value="12">产地药商</option>
                            <option value="13">销地药商</option>
                            <option value="14">养生诊所</option>
                            <option value="15">化工厂</option>
                            <option value="16">化妆品厂</option>
                            <option value="17">提取物厂</option>
                            <option value="18">食品厂</option>
                            <option value="19">实验室</option>
                            <option value="20">网上电商</option>
                            <option value="21">中成药生产商</option>
                            <option value="22">西药生产商</option>
                            <option value="23">饮片厂</option>
                            <option value="24">茶类公司</option>
                        </select>
                    </dd>
                </dl>
                <dl class="clear left transfer">
                    <div class="client-detailInfo col-xs-6">
                        <dt class="left transfer marg_top">注册开始时间：</dt>
                        <mz-datepicker :time.sync="loadParam.ctimeStart" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                </dl>
                <dd class="left" style="margin-left:104px">
                    <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">清空条件</button>
                </dd>
                <dd class="left" style="margin-left:20px">
                    <button type="button" class="btn btn-default" height="24" width="24" @click="selectSearch()">搜索</button>
                </dd>
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
                <!-- 单个业务员搜索 -->
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top" style="letter-spacing:3px">所属业务员：</dt>
                    <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.employeeName" readonly="true" placeholder="请选择业务员" @click="selectEmployee()">
                    </dd>
                </dl>
                <!-- 多个业务员搜索 -->
                <!-- <dl class="clear left transfer">
                 <dt class="left transfer marg_top" style="letter-spacing:3px" >所属业务员：</dt>
                 <dd class="left">
                      <input type="text" class="form-control" v-model="loadParam.employeeNames" placeholder="请选择业务员" @click="selectEmployee()">
                 </dd>
              </dl> -->
                <dd class="pull-right" style="margin-right:20px">
                    <button type="button" class="btn btn-default" @click="createCustomer({
                                      show:true,
                                      loading:false,
                                      id:'',
                                      category:'',
                                      classify:'2,卖',
                                      type:0,
                                      scale:0,
                                      nature:0,
                                      advance:1,
                                      capitalReturnDays:0,
                                      name:'',
                                      mainPhone:'',
                                      principal:'',
                                      bizScope:'',
                                      province:'',
                                      city:'',
                                      address:'',
                                      employee:'',
                                      employeeId:this.initLogin.id,
                                      employeeName:this.initLogin.name,
                                      orgId:this.initLogin.orgId,
                                      orgName:'',
                                      province:'',
                                      city:'',
                                      supplier:1,
                                      contacts:[
                                          {
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
                                      key:'supplyCustomerList'
                                      })">新建</button>
                    <button type="button" class="btn btn-primary" @click="selectSearch()">刷新</button>
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
                        <th>供应商ID</th> 
                        <th>供应商名称</th>   
                        <th>联系人</th>
                        <th>联系人职位</th>
                        <th>联系人电话</th>
                        <th>手机归属地</th>
                        <th>星级</th>
                        <th>所属业务员</th>
                        <th>供应商类型</th>
                        <th>客户归属地</th>
                        <th>成交次数</th>
                        <th>最近成交时间</th>
                        <th>主营产品</th>
                        <th style="min-width:150px;">划转/来源</th>
                        <th>创建时间</th>
                        <th style="min-width:150px;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    </tr>
                    <tr v-for="item in initSupplyCustomerlist" :style="{background:(item.originalEmployee!=-1?'lightYellow':'')}">
                        <td>{{item.id}}</td> 
                        <td class="underline" @click="clickOn({
                                      id:item.id,
                                      sub:$index,
                                      show:true,
                                      loading:true,
                                      name:item.name,
                                      url:'/customer/',
                                      key:'supplyCustomerList'
                                      })">{{item.name}}</td>       
                        <td>{{item.mainContact}}</td>
                        <td>{{item.position}}</td>
                        <td>{{item.mainPhone}}</td>
                        <td>{{item.phoneProvince}}{{item.phoneCity}}</td>
                        <td>
                            <Rate disabled :value.sync="item.creditLevel"></Rate>
                        </td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.typeDesc}}</td>
                        <td>{{item.provinceName}}{{item.cityName}}</td>
                        <td>{{item.orderTotal}}</td>
                        <td>{{item.lastOrderTime}}</td>
                        <td>{{item.bizScope}}</td>
                        <td>
                            <p style="color:red;border-bottom:1px solid #ccc" v-if="item.originalEmployee!=-1">
                                批量划转（{{item.originalEmployeeName}}）
                            </p>
                            <p>{{item.sourceType}}</p>
                        </td>
                        <td>{{item.ctime}}</td>
                        <td>
                            <a class="operate" @click="removeSupplier(item.id)">移出供应商</a>
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
import pagination from '../pagination'
import detailModel from '../clientRelate/clientDetail'
import createModel from '../user/userTransfer'
import alterinfoModel from '../clientRelate/clientUpdate'
import searchModel from '../clientRelate/searchModel'
import setSupplier from '../clientRelate/setSupplier.vue'
//单个业务员搜索
import employeeModel from '../clientRelate/searchEmpInfo'
//多个业务员搜索
/*import employeeModel  from  '../clientRelate/selectEmployees'*/
import filter from '../../filters/filters'
import common from '../../common/common'
import changeMenu from '../../components/tools/tabs/tabs.js'
import tipsModel from '../tips/tipDialog'
import mglistModel from '../mguan/mgListComponent.vue'
import {
    initSupplyCustomerlist,
    initProvince,
    initLogin
} from '../../vuex/getters'
import {
    getClientList,
    getProvinceList,
    deleteInfo,
    alterInfo,
    getClientDetail,
    saveCreate,
    customerTransferBlacklist
} from '../../vuex/actions'

export default {
    components: {
        pagination,
        detailModel,
        createModel,
        alterinfoModel,
        searchModel,
        setSupplier,
        employeeModel,
        tipsModel,
        mglistModel
    },
    vuex: {
        getters: {
            initSupplyCustomerlist,
            initProvince,
            initLogin
        },
        actions: {
            getClientList,
            getProvinceList,
            deleteInfo,
            alterInfo,
            getClientDetail,
            saveCreate,
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
                link: '/customer/suppliers',
                key: 'supplyCustomerList',
                name: '',
                phone: '',
                employeeId: '',
                employeeName: '',
                employeeIds: '',
                employeeNames: '',
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
                total: 0,
                pageSize:15
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
                show: false
            },
            createParam: {
                show: false,
                name: ''
            },
            employeeParam: {
                show: false,
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
            alterParam: {
                show: false,
                id: ''
            },
            supplierParam: {
                show: false
            },
            tipsParam: {
                show: false,
                alert: true,
                name: '',
            },
            checked: false
        }
    },
    methods: {
        clickOn: function(param) {
            this.changeParam = param;

        },
        createCustomer: function(info) {
            this.createParam = info;
            this.createParam.callback = this.valueback;
        },
        valueback: function(title) {
            this.tipsParam.show = true;
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.selectSearch();
        },
        selectEmployee: function() {
            this.employeeParam.show = true;
        },
        createSearch: function() {
            this.loadParam.show = true;
        },
        resetCondition: function() {
            this.loadParam.id = '';
            this.loadParam.name = '';
            this.loadParam.phone = '';
            this.loadParam.employeeId = '';
            this.loadParam.employeeName = '';
            this.loadParam.employeeIds = '';
            this.loadParam.employeeNames = '';
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
            this.getClientList(this.loadParam);
        },
        eventClick: function(id) {
            if (this.$store.state.table.basicBaseList.supplyCustomerList[id].show) {
                this.$store.state.table.basicBaseList.supplyCustomerList[id].show = !this.$store.state.table.basicBaseList.supplyCustomerList[id].show;
            } else {
                this.$store.state.table.basicBaseList.supplyCustomerList[id].show = true;
            }
        },
        modifyClient: function(param) {
            this.alterParam = param;
        },
        selectSearch: function() {
            this.getClientList(this.loadParam)
        },
        removeSupplier: function(id) {
            this.supplierParam.link = '/customer/setSupplier';
            this.supplierParam.supplier = 0;
            this.supplierParam.title = "客户移出供应商";
            this.supplierParam.customerIds = [];
            this.supplierParam.customerIds.push(id);
            this.supplierParam.callback = this.supplierCallback;
            this.supplierParam.comments = ''
            this.supplierParam.show = true;
        },
        supplierCallback: function(name) {
            this.supplierParam.show = false;
            this.showTips(name);
            this.selectSearch();
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
        employees: function(employees) {
            this.loadParam.employeeIds = employees.employeeIds;
            this.loadParam.employeeNames = employees.employeeNames;
        }
    },
    created() {
        this.getProvinceList(this.provinceParam);
        changeMenu(this.$store.state.table.isTop, this.getClientList, this.loadParam, localStorage.supplyClientParam);
    },
    ready() {
        common('tab', 'table_box', 1);
    },
    filter: (filter, {})
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
    /*     max-width: 300px; */
    /*  white-space: normal; */
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
    width: 119px;
    min-width: 50px;
}

.ivu-rate {
    font-size: 14px!important;
    margin: 0px!important;
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
