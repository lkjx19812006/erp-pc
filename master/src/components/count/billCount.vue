<template>
    <div>
        <selectorg-model :param="selectOrgParam" v-if="selectOrgParam.show"></selectorg-model>
        <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
        <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
        <mglist-model>
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clear left">
   
                    <!-- <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.breed')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.breedName" readonly="true" @click="breedSearch()" />
                        </dd>
                    </dl> -->
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
                <!-- 部门 -->
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
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">是否国际：</dt>
                        <dl class="left">
                           <select  class="form-control" v-model="loadParam.intl">
                               <option value="-1">全部</option>
                               <option value="0">国内</option>
                               <option value="1">国际</option>
                           </select>
                        </dl>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">订单类型：</dt>
                        <dl class="left">
                           <select  class="form-control" v-model="loadParam.type">
                               <option value="-1">全部</option>
                               <option value="0">采购</option>
                               <option value="1">销售</option>
                           </select>
                        </dl>
                    </dl>
                    <!-- <dl class="clear left transfer">
                        <dt class="left transfer marg_top">产地：</dt>
                        <dl class="left">
                            <v-select :debounce="250" :value.sync="loadParam.location" :options="initCNProvince" placeholder="省/Province" label="cname">
                            </v-select>
                        </dl>
                    </dl> -->
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
                <table class="table table-hover table_color table-striped " v-cloak id="tab">
                    <thead class="t_head">
                        <tr>
                            <!-- <th style="width:340px">厂家区域</th>
                            <th style="width:340px">已收金额</th>
                            <th style="width:340px">待收款</th>
                            <th style="width:340px">应收款</th>
                            <th style="width:340px">合计</th>
                            <th style="width:340px">毛利润</th> -->                        
                            <th style="width:340px">厂家区域
                                    <!-- <span class="totalNum">({{totalMainData.sampleOrderNumber}})</span> -->
                            </th>
                            <th style="width:340px" :class="{'bgColor':loadParam.sortNum==1}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(1)">已收金额
                                    <span class="totalNum">({{totalData.receivableMoney.toFixed(2)}})</span>
                                </a>
                            </th>
                            <th style="width:340px" :class="{'bgColor':loadParam.sortNum==2}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(2)">待收款
                                    <span class="totalNum">({{totalData.stayPayMoney.toFixed(2)}})</span>
                                </a>
                            </th>
                            <th style="width:340px" :class="{'bgColor':loadParam.sortNum==3}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(3)">应收款
                                    <span class="totalNum">({{totalData.payMoney.toFixed(2)}})</span>
                                </a>
                            </th>
                            <th style="width:340px" :class="{'bgColor':loadParam.sortNum==4}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(4)">合计
                                    <span class="totalNum">({{totalData.totalMoney.toFixed(2)}})</span>
                                </a>
                            </th>
                            <th style="width:340px" :class="{'bgColor':loadParam.sortNum==5}">
                                <a href="javascript:void(0);" class="btn btn-link btn-xs" @click="sortBy(5)">毛利润
                                    <span class="totalNum">({{totalData.grossProfit.toFixed(2)}})</span>
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="banma">
                        <tr v-for="item in initBillList" v-cloak>
                            <td>{{item.locationName}}</td>
                            <td>{{item.receivableMoney.toFixed(2)}}</td>
                            <td>{{item.stayPayMoney.toFixed(2)}}</td>
                            <td>{{item.payMoney.toFixed(2)}}</td>
                            <td>{{item.totalMoney.toFixed(2) }}</td>
                            <td>{{item.grossProfit.toFixed(2)}}</td>
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

import mglistModel from '../mguan/mgListComponent.vue'
import vSelect from '../tools/vueSelect/components/Select'
import {
    initCNProvince,
    initBillList
} from '../../vuex/getters'
import {
    getBillList
} from '../../vuex/actions'
export default {
    components: {
        filter,
        pagination,
        mglistModel,
        selectorgModel,
        employeeModel,
        breedsearchModel,
        vSelect
    },
    data(){
    	return {
    		loadParam:{
    			loading:false,
    			employeeName:'',
                employeeId:'',
    			startTime:'',
    			endTime:'',
                breedId:'',
    			breedName:'',
                orgName:'',
                orgId:'',
                location:'',
                callback:this.totalCallback,
                sortNum:'',
                intl:'-1',
                type:'1'
    		},
    		employeeParam:{
    			show:false
    		},
    		breedSearchParam:{
    			show:false
    		},
            selectOrgParam:{
                show:false,
                orgName:'',
                orgId:'',
                callback:this.callback
            },
            totalData:{
                receivableMoney:'',
                stayPayMoney:'',
                payMoney:'',
                totalMoney:'',
                grossProfit:''
            }
    	}
    },

    vuex: {
        getters: {
            initCNProvince,
            initBillList
        },
        actions: {
            getBillList
        }
    },
    methods: {
    	breedSearch:function(){
            this.breedSearchParam.show = true
        },
        selectEmployee:function(){
            this.employeeParam.show = true
        },
        selectSearch:function(){
            this.getBillList(this.loadParam)
        },
        selectOrg:function(){
            this.selectOrgParam.show = true
        },
        resetCondition:function(){
            this.loadParam.employeeName = ''
            this.loadParam.employeeId = ''
            this.loadParam.startTime = ''
            this.loadParam.endTime = ''
            this.loadParam.breedId = ''
            this.loadParam.breedName = ''
            this.loadParam.orgName = ''
            this.loadParam.orgId = ''
            this.loadParam.location = ''
            this.loadParam.intl = '-1'
            this.loadParam.type = '-1'
            this.getBillList(this.loadParam)
        },
        callback:function(){
            if(this.selectOrgParam.orgId){
                this.loadParam.orgName = this.selectOrgParam.orgName
                this.loadParam.orgId = this.selectOrgParam.orgId
            }
        },
        totalCallback:function(data){
            this.totalData.receivableMoney = data.receivableMoney
            this.totalData.stayPayMoney = data.stayPayMoney
            this.totalData.payMoney = data.payMoney
            this.totalData.totalMoney = data.totalMoney
            this.totalData.grossProfit = data.grossProfit
        },
        sortBy:function(num){
            this.loadParam.sortNum = num
            this.getBillList(this.loadParam)
        }
    },
    events: {
        fresh:function(input){
            this.loadParam.cur = input
            this.getBillList(this.loadParam)
        },
        a: function(employee) {
            this.loadParam.employeeName = employee.employeeName
            this.loadParam.employeeId = employee.employeeId
        },
        breed: function(breed) {
            this.loadParam.breedName = breed.breedName
            this.loadParam.breedId = breed.breedId
        },
    },
    filter: (filter, {}),
    ready() {
        //common('tab', 'table_box', 1);
    },
    created() {
         this.getBillList(this.loadParam)
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
.t_head>tr>th{
    font-weight: bold!important;
    font-size: 14px;
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
