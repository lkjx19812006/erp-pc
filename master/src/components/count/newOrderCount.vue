<template>
    <div>
        <selectorg-model :param="selectOrgParam" v-if="selectOrgParam.show"></selectorg-model>
        <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
        <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
        <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
        <mglist-model>
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clear left">
                    <dl class="clear left transfer">
                        <div class="btn-group">
                        <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.orderType==='mainOrder'}" @click="CheckType('mainOrder')">
                            大货订单
                        </button>
                        <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.orderType==='sampleOrder'}"
                         @click="CheckType('sampleOrder')">
                            样品订单
                        </button>
                    </div>
                    </dl>    
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.breed')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.breedName" readonly="true" @click="breedSearch()" />
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <div class="left">
                            <dt class="left transfer marg_top">起止时间：</dt>
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
                <div class="clear left">
                    <dl class="clear left transfer" v-if="allPower">
                        <dt class="left transfer marg_top">部门：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.orgName" placeholder="请选择部门" readonly="true" @click="selectOrg()" />
                        </dd>
                    </dl>
                    <!-- 单个业务员搜索 -->
                    <dl class="clear left transfer" v-if="orgPower">
                        <dt class="left transfer marg_top" style="letter-spacing:3px">所属业务员：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.employeeName" placeholder="请选择业务员" @click="selectEmployee()">
                        </dd>
                    </dl>
                     <!-- 单个业务员搜索 -->
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">产地：</dt>
                        <dl class="left">
                            <v-select :debounce="250" :value.sync="loadParam.location" :options="initCNProvince" placeholder="省/Province" label="cname">
                            </v-select>
                        </dl>
                    </dl>
                    <button class="btn btn-primary" @click="selectSearch()">{{$t('static.search')}}</button>
                    <button type="button" class="btn btn-warning" @click="resetCondition()">{{$t('static.clear_all')}}</button>
                </div>
            </div>
            <!-- 中间列表 -->
            <div slot="form">
                <div class="cover_loading">
                    <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <!-- 大货订单 -->
                <table class="table table-hover table_color table-striped " v-cloak id="tab" v-if="loadParam.orderType=='mainOrder'">
                    <thead>
                        <tr>
                            <th style="width:250px">产地
                                <span class="totalNum btn btn-link btn-xs">({{totalMainData.locationNumber}})</span>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==1}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(1)">品种数
                                    <span class="totalNum">({{totalMainData.breedNumber}})</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==2}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(2)">订单数
                                    <span class="totalNum">({{totalMainData.orderNumber}})</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==3}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(3)">金额(元)
                                    <span class="totalNum">({{totalMainData.orderMoney | money}})</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==4}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(4)">毛利率
                                    <span class="totalNum">({{totalMainData.grossProfit | money}}%)</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==5}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(5)">退货率
                                    <span class="totalNum">({{totalMainData.recoveryRate | money}}%)</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==6}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(6)">厂家数
                                    <span class="totalNum">({{totalMainData.customerNumber}})</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==7}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(7)">发货地数
                                    <span class="totalNum">({{totalMainData.shipAddr}})</span>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="banma">
                        <tr v-for="item in initMainOrderCountList" v-cloak>
                            <td><a href="javascript:void(0);" @click="showDetail(item)">{{item.locationName}}</a></td>
                            <td>{{item.breedNumber}}</td>
                            <td>{{item.orderNumber}}</td>
                            <td>{{item.orderMoney | money}}</td>
                            <td>{{item.grossProfit | money}}%</td>
                            <td>{{item.recoveryRate | money }}%</td>
                            <td>{{item.customerNumber}}</td>
                            <td>{{item.shipAddr}}</td>
                        </tr>
                    </tbody>
                </table>
                <!-- 寄样订单 -->
                <table class="table table-hover table_color table-striped " v-cloak id="tab" v-if="loadParam.orderType=='sampleOrder'">
                    <thead>
                        <tr>
                            <th style="width:250px" >产地
                                <span class="totalNum btn-link btn btn-xs">({{totalSampleData.locationNumber}})</span>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==1}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(1)">品种数
                                    <span class="totalNum">({{totalSampleData.breedNumber}})</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==2}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(2)">寄样次数
                                    <span class="totalNum">({{totalSampleData.sampleBreedNumber}})</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==3}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(3)">到货率
                                    <span class="totalNum">({{totalSampleData.receiveNumber | money}})</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==4}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(4)">药典合格率
                                    <span class="totalNum">({{totalSampleData.qaStandardNumber | money}})</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==5}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(5)">内控合格率
                                    <span class="totalNum">({{totalSampleData.qaSelfNumber | money}})</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==6}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(6)">品种成交率
                                    <span class="totalNum">({{totalSampleData.tradedNumber | money}})</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==7}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(7)">厂家数
                                    <span class="totalNum">({{totalSampleData.customerNumber}})</span>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="banma">
                        <tr v-for="item in initSampleCountList" v-cloak>
                            <td><a href="javascript:void(0);" @click="showDetail(item)">{{item.locationName}}</a></td>
                            <td>{{item.breedNumber}}</td>
                            <td>{{item.sampleBreedNumber}}</td>
                            <td>{{item.receiveNumber | money}}%</td>
                            <td>{{item.qaStandardNumber | money}}%</td>
                            <td>{{item.qaSelfNumber | money}}%</td>
                            <td>{{item.tradedNumber | money}}%</td>
                            <td>{{item.customerNumber}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 底部分页 -->
            <!-- <pagination :combination="loadParam" slot="page"></pagination> -->
        </mglist-model>
    </div>
</template>
<script>
import pagination from '../pagination'
import breedsearchModel from '../intention/breedsearch'
import selectorgModel from '../../components/tips/treeDialog'
//单个业务员搜索
import employeeModel from '../clientRelate/searchEmpInfo'
import filter from '../../filters/filters'
import common from '../../common/common'
import detailModel from './countTable/localDetailModel'
import mglistModel from '../mguan/mgListComponent.vue'
import vSelect from '../tools/vueSelect/components/Select'
import util from '../tools/util.js'
import {
    initLogin,
    initCNProvince,
    initSampleCountList,
    initMainOrderCountList
} from '../../vuex/getters'
import {
    getSampleOrderCount,
    getMainOrderCount
} from '../../vuex/actions'
export default {
    components: {
        filter,
        pagination,
        mglistModel,
        selectorgModel,
        employeeModel,
        breedsearchModel,
        detailModel,
        vSelect
    },
    data() {
        return {
            loadParam:{
                cur:'1',
                all:'',
                total:'',
                breedName:'',
                breedId:'',
                startTime:util.getDate(-7),
                endTime:util.getDate(0),
                orgName:'',
                employeeName:'',
                orderType:'mainOrder',
                location:'',
                loading:false,
                sortNum:'',
                callback:this.totalCallback,
                detailCallback:this.detailCallback
            },
            selectOrgParam:{
                show:false,
                orgName:'',
                orgId:'',
                callback:this.callback
            },
            employeeParam:{
                show:false
            },
            breedSearchParam:{
                show:false
            },
            detailParam:{
                show:false,
                orderType:'',
                totalMainData:{
                    locationNumber:'',
                    breedNumber:'',
                    orderNumber:'',
                    orderMoney:'',
                    grossProfit:'',
                    recoveryRate:'',
                    customerNumber:'',
                    shipAddr:''
               },
               totalSampleData:{
                    locationNumber:'',
                    breedNumber:'',
                    sampleBreedNumber:'',
                    receiveNumber:'',
                    qaStandardNumber:'',
                    qaSelfNumber:'',
                    tradedNumber:'',
                    customerNumber:''
               }
            },
            totalMainData:{
                locationNumber:'',
                breedNumber:'',
                orderNumber:'',
                orderMoney:'',
                grossProfit:'',
                recoveryRate:'',
                customerNumber:'',
                shipAddr:''
           },
           totalSampleData:{
                locationNumber:'',
                breedNumber:'',
                sampleBreedNumber:'',
                receiveNumber:'',
                qaStandardNumber:'',
                qaSelfNumber:'',
                tradedNumber:'',
                customerNumber:''
           },
           times:'2015-01-01 00:00:00',
           orgPower: false, //表示是否有主管(查看部门所有业务员)权限
           allPower: false, //表示是否有总经理(查看公司所有业务员)权限
        }
    },

    vuex: {
        getters: {
            initLogin,
            initCNProvince,
            initSampleCountList,
            initMainOrderCountList
        },
        actions: {
            getMainOrderCount,
            getSampleOrderCount
        }
    },
    methods: {
        CheckType:function(data){
            this.loadParam.orderType = data
            if(data == 'mainOrder'){
                this.getMainOrderCount(this.loadParam)
            }else{
                this.getSampleOrderCount(this.loadParam)
            }
        },
        breedSearch:function(){
            this.breedSearchParam.show = true
        },
        selectOrg:function(){
            this.selectOrgParam.show = true
        },
        callback:function(){
            if(this.selectOrgParam.orgId){
                this.loadParam.orgName = this.selectOrgParam.orgName
                this.loadParam.orgId = this.selectOrgParam.orgId
            }
        },
        sortBy:function(num){
            this.loadParam.sortNum = num
            if(this.loadParam.orderType == 'mainOrder'){
                this.getMainOrderCount(this.loadParam)
            }else{
                this.getSampleOrderCount(this.loadParam)    
            }
            
        },
        totalCallback:function(data){
            if(this.loadParam.orderType == 'mainOrder'){
                this.totalMainData.locationNumber = data.locationNumber
                this.totalMainData.breedNumber = data.breedNumber
                this.totalMainData.orderNumber = data.orderNumber
                this.totalMainData.orderMoney = data.orderMoney
                this.totalMainData.grossProfit = data.grossProfit
                this.totalMainData.recoveryRate = data.recoveryRate
                this.totalMainData.customerNumber = data.customerNumber
                this.totalMainData.shipAddr = data.shipAddr
            }else if(this.loadParam.orderType == 'sampleOrder'){
                console.log("sampleOrder")
                this.totalSampleData.locationNumber = data.locationNumber
                this.totalSampleData.breedNumber = data.breedNumber
                this.totalSampleData.sampleBreedNumber = data.sampleBreedNumber
                this.totalSampleData.receiveNumber = data.receiveNumber
                this.totalSampleData.qaStandardNumber = data.qaStandardNumber
                this.totalSampleData.qaSelfNumber = data.qaSelfNumber
                this.totalSampleData.tradedNumber = data.tradedNumber
                this.totalSampleData.customerNumber = data.customerNumber
            }
           
        },
        detailCallback:function(data){
            if(this.loadParam.orderType == 'mainOrder'){
                this.detailParam.totalMainData.locationNumber = data.locationNumber
                this.detailParam.totalMainData.breedNumber = data.breedNumber
                this.detailParam.totalMainData.orderNumber = data.orderNumber
                this.detailParam.totalMainData.orderMoney = data.orderMoney
                this.detailParam.totalMainData.grossProfit = data.grossProfit
                this.detailParam.totalMainData.recoveryRate = data.recoveryRate
                this.detailParam.totalMainData.customerNumber = data.customerNumber
                this.detailParam.totalMainData.shipAddr = data.shipAddr
            }else if(this.loadParam.orderType == 'sampleOrder'){
                this.detailParam.totalSampleData.locationNumber = data.locationNumber
                this.detailParam.totalSampleData.breedNumber = data.breedNumber
                this.detailParam.totalSampleData.sampleBreedNumber = data.sampleBreedNumber
                this.detailParam.totalSampleData.receiveNumber = data.receiveNumber
                this.detailParam.totalSampleData.qaStandardNumber = data.qaStandardNumber
                this.detailParam.totalSampleData.qaSelfNumber = data.qaSelfNumber
                this.detailParam.totalSampleData.tradedNumber = data.tradedNumber
                this.detailParam.totalSampleData.customerNumber = data.customerNumber
            }
        },
        selectEmployee:function(){
            this.employeeParam.show = true
        },
        showDetail:function(data){
            this.detailParam.show = true
            this.detailParam.location = data.locationName
            var allIds={
                ids:'',
                locationId:''
            }
            allIds.ids = data.breedIds.join(',')
            allIds.locationId = data.locationIds.join('')
            if(this.loadParam.orderType=='mainOrder'){
                this.detailParam.orderType = 'mainOrder'
                this.getMainOrderCount(this.loadParam,allIds)
            }else{
                this.detailParam.orderType = 'sampleOrder'
                this.getSampleOrderCount(this.loadParam,allIds)
            }
            
        },
        resetCondition:function(){
            this.loadParam.breedName = ''
            this.loadParam.breedId = ''
            this.loadParam.startTime = util.getDate(-7)
            this.loadParam.endTime = util.getDate(0)
            // this.loadParam.orgName = ''
            // this.loadParam.orgId = ''
            // this.loadParam.employeeName = ''
            // this.loadParam.employeeId = ''
            this.loadParam.location = ''
            if (this.allPower) { //有总经理权限
                this.loadParam.orgId = "";
                this.loadParam.orgName = "";
                this.loadParam.employeeId = "";
                this.loadParam.employeeName = "";
            } else if (this.orgPower) { //有主管权限
                this.loadParam.employeeId = "";
                this.loadParam.employeeName = "";
            }
            
            if(this.loadParam.orderType=='mainOrder'){
                this.getMainOrderCount(this.loadParam)
            }else{
                this.getSampleOrderCount(this.loadParam)
            }
            
        },
        selectSearch:function(){
             if(this.loadParam.orderType=='mainOrder'){
                this.getMainOrderCount(this.loadParam)
            }else{
                this.getSampleOrderCount(this.loadParam)
            }
        }

    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;

        },
        breed: function(breed) {
            this.loadParam.breedName = breed.breedName
            this.loadParam.breedId = breed.breedId
        },
        a: function(employee) {
            this.loadParam.employeeName = employee.employeeName
            this.loadParam.employeeId = employee.employeeId
        },
    },
    filter: (filter, {}),
    ready() {
        //common('tab', 'table_box', 1);
    },
    created() {
        if (this.initLogin.safeCode.indexOf(",P569-F570,") != -1) {
            this.orgPower = true;
        }
        if (this.initLogin.safeCode.indexOf(",P569-F571,") != -1) {
            this.allPower = true;
        }
        if (!this.orgPower && !this.allPower) { //如果没有主管权限并且没有总经理权限，就只能查看自己的信息
            this.loadParam.employeeId = this.initLogin.id;
        }
        if (this.orgPower && !this.allPower) { //如果有主管权限但没有总经理权限，就只能查看本部门的所有信息
            this.loadParam.orgId = this.initLogin.orgId;
            //这样就只会查询到本部门的业务员了
            this.employeeParam.orgId = this.initLogin.orgId;
            this.employeeParam.org = true;
        }

        this.getSampleOrderCount(this.loadParam)
        this.getMainOrderCount(this.loadParam)

    }
}
</script>
<style scoped>
.myOrder {
    width: 100%;
    white-space: nowrap;
}

.order_search {
    padding: 35px 10px 0 10px;
}

.transfer {
    margin-right: 16px;
}

.order_table .table > ul {
    position: relative;
    width: 100%;
    display: table;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0;
}

.order_table .table > ul >li {
    float: left;
    padding: 7.5px 0;
    text-align: center;
    width: 11.1%;
    display: table-cell;
}
.mz-datepicker{
    width: 168px!important
}
.form-control{
    width: 100px;
}
.order_table .table > ul >li a {
    color: #003077;
}

.order_table .table_hover > ul:hover {
    background: #f5f5f5;
}
.totalNum{
    color:red
}
#table_box table th,
#table_box table td {
    width: 95px;
    min-width: 94px;
}

.order_table .table > ul >li img {
    margin: auto;
}

.order_pagination {
    text-align: center;
}

.api {
    color: #3399ff;
}
.bgColor{
    background: #2d8cf0!important;
}
.bgColor>a{
        color:#fff!important;
}
.bgColor>a>span{
        color:#fff!important;
}
.banma>tr:nth-child(2n){
    background: #f5f7f9!important
}
</style>
