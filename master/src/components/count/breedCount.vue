<template>
    <div>
        <selectorg-model :param="selectOrgParam" v-if="selectOrgParam.show"></selectorg-model>
        <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
        <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
        <local-breed-detail :param="detailParam" v-if="detailParam.show"></local-breed-detail>
        <deal-breed-count :param="dealParam" v-if="dealParam.show"></deal-breed-count>
        <mglist-model>
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clear left">   
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
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">部门：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.orgName" placeholder="请选择部门" readonly="true" @click="selectOrg()" />
                        </dd>
                    </dl>
                    <!-- 单个业务员搜索 -->
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top" style="letter-spacing:3px">所属业务员：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.employeeName" placeholder="请选择业务员" @click="selectEmployee()">
                        </dd>
                    </dl>
                     <!-- 区域 -->
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">产地：</dt>
                        <dl class="left">
                            <v-select :debounce="250" :value.sync="loadParam.location" :options="initCNProvince" placeholder="省/Province" label="cname">
                            </v-select>
                        </dl>
                    </dl>
                    <i-button type="primary" shape="circle" icon="ios-search" @click="selectSearch()">搜索</i-button>
                    <i-button type="warning" shape="circle" @click="resetCondition()">重置</i-button>
                    <!-- <button class="btn btn-primary" @click="selectSearch()">{{$t('static.search')}}</button>
                    <button type="button" class="btn btn-warning" @click="resetCondition()">{{$t('static.clear_all')}}</button> -->
                </div>
            </div>
            <!-- 中间列表 -->
            <div slot="form">
                <div class="cover_loading">
                    <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                </div>
                <!-- 大货订单 -->
                <table class="table table-hover table_color table-striped " v-cloak id="tab" >
                    <thead>
                        <tr>
                            <th style="width:250px">产地
                                <span class="totalNum btn btn-link btn-xs">({{totalMainData.locationNumber}})</span>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==1}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(1)">寄样次数
                                    <span class="totalNum">({{totalMainData.sampleOrderNumber}})</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==2}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(2)">寄样品种数
                                    <span class="totalNum">({{totalMainData.sampleBreedNumber}})</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==3}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(3)">成交次数
                                    <span class="totalNum">({{totalMainData.orderNumber}})</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==4}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(4)">成交品种数
                                    <span class="totalNum">({{totalMainData.breedNumber}})</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==5}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(5)">成交金额
                                    <span class="totalNum">({{totalMainData.orderMoney.toFixed(2)}})</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==6}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(6)">毛利率
                                    <span class="totalNum">({{totalMainData.grossProfit}}%)</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==7}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(7)">退货率
                                    <span class="totalNum">({{totalMainData.recoveryRate}}%)</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==8}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(8)">厂家数
                                    <span class="totalNum">({{totalMainData.customerNumber}})</span>
                                </a>
                            </th>
                            <th style="width:250px" :class="{'bgColor':loadParam.sortNum==9}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(9)">发货地数
                                    <span class="totalNum">({{totalMainData.shipAddr}})</span>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="banma">
                        <tr v-for="item in initBreedCountList" v-cloak>
                            <td>{{item.locationName}}</td>
                            <td>{{item.sampleOrderNumber}}</td>
                            <td>{{item.sampleBreedNumber}}</td>
                            <td>{{item.orderNumber}}</td>
                            <td>{{item.breedNumber}}</td>
                            <td>{{item.orderMoney.toFixed(2) }}</td>
                            <td>{{item.grossProfit.toFixed(2)}}%</td>
                            <td>{{item.recoveryRate.toFixed(2)}}%</td>
                            <td>{{item.customerNumber}}</td>
                            <td>{{item.shipAddr}}</td>
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
import localBreedDetail from './countTable/localBreedDetail'
import dealBreedCount from './countTable/dealBreedCount'
import mglistModel from '../mguan/mgListComponent.vue'
import vSelect from '../tools/vueSelect/components/Select'
import {
    initCNProvince,
    initBreedCountList
} from '../../vuex/getters'
import {
    getBreedCount
} from '../../vuex/actions'
export default {
    components: {
        filter,
        pagination,
        mglistModel,
        selectorgModel,
        employeeModel,
        breedsearchModel,
        localBreedDetail,
        vSelect,
        dealBreedCount
    },
    data() {
        return {
            loadParam:{
                cur:'1',
                all:'',
                total:'',
                breedName:'',
                breedId:'',
                startTime:'',
                endTime:'',
                orgName:'',
                employeeName:'',
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
                    sampleOrderNumber:'',
                    sampleBreedNumber:'',
                    orderNumber:'',
                    orderMoney:'',
                    grossProfit:'',
                    recoveryRate:'',
                    customerNumber:'',
                    shipAddr:''
               }
            },
            dealParam:{
                show:false,
                orderType:'',
                totalMainData:{
                    locationNumber:'',
                    breedNumber:'',
                    sampleOrderNumber:'',
                    sampleBreedNumber:'',
                    orderNumber:'',
                    orderMoney:'',
                    grossProfit:'',
                    recoveryRate:'',
                    customerNumber:'',
                    shipAddr:''
               }
            },
            totalMainData:{
                locationNumber:'',
                breedNumber:'',
                sampleOrderNumber:'',
                sampleBreedNumber:'',
                orderNumber:'',
                orderMoney:'',
                grossProfit:'',
                recoveryRate:'',
                customerNumber:'',
                shipAddr:''
           }
        }
    },

    vuex: {
        getters: {
            initCNProvince,
            initBreedCountList
        },
        actions: {
            getBreedCount
        }
    },
    methods: {
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
            this.getBreedCount(this.loadParam)
            
        },
        totalCallback:function(data){
            this.totalMainData.locationNumber = data.locationNumber
            this.totalMainData.sampleOrderNumber = data.sampleOrderNumber
            this.totalMainData.sampleBreedNumber = data.sampleBreedNumber
            this.totalMainData.breedNumber = data.breedNumber
            this.totalMainData.orderNumber = data.orderNumber
            this.totalMainData.orderMoney = data.orderMoney
            this.totalMainData.grossProfit = data.grossProfit
            this.totalMainData.recoveryRate = data.recoveryRate
            this.totalMainData.customerNumber = data.customerNumber
            this.totalMainData.shipAddr = data.shipAddr        
        },
        detailCallback:function(data){
            this.detailParam.totalMainData.locationNumber = data.locationNumber
            this.detailParam.totalMainData.sampleOrderNumber = data.sampleOrderNumber
            this.detailParam.totalMainData.sampleBreedNumber = data.sampleBreedNumber
            this.detailParam.totalMainData.breedNumber = data.breedNumber
            this.detailParam.totalMainData.orderNumber = data.orderNumber
            this.detailParam.totalMainData.orderMoney = data.orderMoney
            this.detailParam.totalMainData.recoveryRate = data.recoveryRate
            this.detailParam.totalMainData.grossProfit = data.grossProfit
            this.detailParam.totalMainData.customerNumber = data.customerNumber
            this.detailParam.totalMainData.shipAddr = data.shipAddr
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
            this.detailParam.orderType = 'mainOrder'
            this.getBreedCount(this.loadParam,allIds)
            
        },
        // showDeal:function(data){
        //     this.dealParam.show = true
        //     this.dealParam.location = data.locationName
        //     var allIds={
        //         ids:'',
        //         locationId:''
        //     }
        //     allIds.ids = data.orderIds.join(',')
        //     allIds.locationId = data.locationIds.join('')
        //     this.getBreedCount(this.loadParam,allIds)
        // },
        resetCondition:function(){
            this.loadParam.breedName = ''
            this.loadParam.breedId = ''
            this.loadParam.startTime = ''
            this.loadParam.endTime = ''
            this.loadParam.orgName = ''
            this.loadParam.orgId = ''
            this.loadParam.employeeName = ''
            this.loadParam.employeeId = ''
            this.loadParam.location = ''
            this.getBreedCount(this.loadParam)

            
        },
        selectSearch:function(){
            this.getBreedCount(this.loadParam)
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
        this.getBreedCount(this.loadParam)

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
