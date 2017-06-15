<template>
    <div>
        <chance-model :param="detailParam" v-if="detailParam.show"></chance-model>
        <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
        <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
        <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
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
                    <!-- 单个业务员搜索 -->
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top" style="letter-spacing:3px">所属业务员：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.employeeName" placeholder="请选择业务员" @click="selectEmployee()">
                        </dd>
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
                <table class="table table-hover table_color table-striped " v-cloak id="tab">
                    <thead class="t_head">
                        <tr>
                            <th style="width:340px">时间</th>
                            <th style="width:340px">求购品种</th>
                            <th style="width:340px">客户名称</th>
                            <th style="width:340px">客户手机号</th>
                            <th style="width:340px">不参与原因</th>
                        </tr>
                    </thead>
                    <tbody class="banma">
                        <tr v-for="item in initCancelRecordList" v-cloak>
                            <td>{{item.ctimeFormat}}</td>
                            <td><a href="javascript:void(0)" @click="showIntent(item)">{{item.breedName}}</a></td>
                            <td><a href="javascript:void(0)" @click="showClient(item)">{{item.customerName}}</a></td>
                            <td>{{item.customerPhone}}</td>
                            <td>{{item.reason }}</td>

                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- 底部分页 -->
            <pagination :combination="loadParam" slot="page"></pagination>
        </mglist-model>
    </div>
</template>
<script>
import pagination from '../../pagination'
import chanceModel from '../../intention/chanceDetail'
import breedsearchModel from '../../intention/breedsearch'
import selectorgModel from '../../../components/tips/treeDialog'
//单个业务员搜索
import employeeModel from '../../clientRelate/searchEmpInfo'
import filter from '../../../filters/filters'
import common from '../../../common/common'
import detailModel from '../../../components/clientRelate/clientDetail'
import mglistModel from '../../mguan/mgListComponent.vue'
import vSelect from '../../tools/vueSelect/components/Select'
import {
    initCNProvince,
    initCancelRecordList
} from '../../../vuex/getters'
import {
    getCancelRecord
} from '../../../vuex/actions'
export default {
    components: {
        filter,
        pagination,
        mglistModel,
        selectorgModel,
        employeeModel,
        breedsearchModel,
        vSelect,
        chanceModel,
        detailModel
    },
    data(){
    	return {
    		loadParam:{
                cur:'1',
                all:'',
                total:'',
    			loading:false,
    			employeeName:'',
                employeeId:'',
    			startTime:'',
    			endTime:'',
                breedId:'',
    			breedName:''

    		},
    		employeeParam:{
    			show:false
    		},
    		breedSearchParam:{
    			show:false
    		},
            detailParam:{
                show:false,
                loading:false,
            },
            changeParam:{
                show:false,
                loading:false
            }
        }
    },

    vuex: {
        getters: {
            initCancelRecordList
        },
        actions: {
            getCancelRecord
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
            this.getCancelRecord(this.loadParam)
        },
        showIntent:function(data){
            this.detailParam.show = true
            this.detailParam.loading = true
            this.detailParam.id = data.intentionId
        },
        showClient:function(data){
            this.changeParam.show = true
            this.changeParam.loading = true
            this.changeParam.id = data.customerId
        },
        resetCondition:function(){
            this.loadParam.employeeName = ''
            this.loadParam.employeeId = ''
            this.loadParam.startTime = ''
            this.loadParam.endTime = ''
            this.loadParam.breedId = ''
            this.loadParam.breedName = ''
            this.getCancelRecord(this.loadParam)
        }
    },
    events: {
        fresh:function(input){
            this.loadParam.cur = input
            this.getCancelRecord(this.loadParam)
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
         this.getCancelRecord(this.loadParam)
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
