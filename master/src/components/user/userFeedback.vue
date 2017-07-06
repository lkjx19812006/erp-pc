<template>
    <div>
        <chance-model :param="detailParam" v-if="detailParam.show"></chance-model>
        <employee-model :param="employeeParam" v-if="employeeParam.show"></employee-model>
        <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
        <handle-feedback-model :param="handleParam" v-if="handleParam.show"></handle-feedback-model>
        <mglist-model>
            <!-- 头部搜索 -->
            <div slot="top">
                <div class="clear left">
   
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.name')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.name"/>
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">{{$t('static.cellphone')}}：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.phone"/>
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">用户ID：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.id"/>
                        </dd>
                    </dl>
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top">是否处理：</dt>
                        <dd class="left">
                            <select v-model="loadParam.sign" class="form-control">
                                <option value="">全部</option>
                                <option value="0">未处理</option>
                                <option value='1'>已处理</option>
                            </select>
                        </dd>
                    </dl>
                    <!-- <dl class="clear left transfer">
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
                    </dl> -->
                </div>
                <div class="clear left">
                    <!-- 单个业务员搜索 -->
                    <dl class="clear left transfer">
                        <dt class="left transfer marg_top" style="letter-spacing:3px">处理操作人：</dt>
                        <dd class="left">
                            <input type="text" class="form-control" v-model="loadParam.operatorName" placeholder="请选择业务员" @click="selectEmployee()">
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
                <table class="table table-hover table_color table-striped " v-cloak id="tab">
                    <thead class="t_head">
                        <tr>
                            <th>ID</th>
                            <th>姓名</th>
                            <th>手机号</th>
                            <th>反馈内容</th>
                            <th>回应内容</th>
                            <th>操作人</th>
                            <th>反馈时间</th>
                            <th>处理</th>
                        </tr>
                    </thead>
                    <tbody class="banma">
                        <tr v-for="item in initUserFeedbackInfo" v-cloak>
                            <td>{{item.id}}</td>
                            <td>{{item.name}}</td>
                            <!-- <td><a href="javascript:void(0)" @click="showClient(item)">{{item.name}}</a></td> -->
                            <td>{{item.phone}}</td>
                            <td>{{item.content}}</td>
                            <td>{{item.response}}</td>
                            <td>{{item.operator}}</td>
                            <td>{{item.createTime | formatTime}}</td>
                            <td>
                                <button v-if="item.sign==0" class="btn btn-success btn-xs" @click="handleInfo(item)">处理</button>
                                <span v-else class="handled">已处理</span>
                            </td>
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
import pagination from '../pagination'
import chanceModel from '../intention/chanceDetail'
import selectorgModel from '../../components/tips/treeDialog'
import handleFeedbackModel from './plugins/handleFeedback'
//单个业务员搜索
import employeeModel from '../clientRelate/searchEmpInfo'
import filter from '../../filters/filters'
import common from '../../common/common'
import detailModel from '../../components/clientRelate/clientDetail'
import mglistModel from '../mguan/mgListComponent.vue'
import vSelect from '../tools/vueSelect/components/Select'
import {
    initCNProvince,
    initUserFeedbackInfo
} from '../../vuex/getters'
import {
    getFeedbackList
} from '../../vuex/actions'
export default {
    components: {
        filter,
        pagination,
        mglistModel,
        selectorgModel,
        employeeModel,
        vSelect,
        chanceModel,
        detailModel,
        handleFeedbackModel
    },
    data(){
    	return {
    		loadParam:{
                cur:'1',
                all:'',
                total:'',
    			loading:false,
                pn:1,
                pSize:20,
                phone:'',
                sign:'',
                id:'',
                name:'',
                operator:'',
                operatorName:''
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
            },
            handleParam:{
                show:false,
                suggestId:'',
                message:'',
                msg:'',
                callback:'',
                fresh:this.selectSearch
            }
        }
    },

    vuex: {
        getters: {
            initUserFeedbackInfo
        },
        actions: {
            getFeedbackList
        }
    },
    methods: {
        handleInfo:function(item){
            this.handleParam.show = true
            this.handleParam.suggestId = item.id
            this.handleParam.message = ''
        },
        selectEmployee:function(){
            this.employeeParam.show = true
        },
        selectSearch:function(){
            this.getFeedbackList(this.loadParam)
        },
        showIntent:function(data){
            this.detailParam.show = true
            this.detailParam.loading = true
            this.detailParam.id = data.intentionId
        },
        showClient:function(data){
            this.changeParam.show = true
            this.changeParam.loading = true
            this.changeParam.id = data.id
        },
        resetCondition:function(){
            this.loadParam.cur = 1
            this.loadParam.all = ''
            this.loadParam.total = ''
            this.loadParam.pn = 1
            this.loadParam.phone = ''
            this.loadParam.sign = ''
            this.loadParam.id = ''
            this.loadParam.name = ''
            this.loadParam.operator = ''
            this.loadParam.operatorName = ''
            this.getFeedbackList(this.loadParam)
        }
    },
    events: {
        fresh:function(input){
            this.loadParam.cur = input
            this.loadParam.pn = input
            this.getFeedbackList(this.loadParam)
        },
        a: function(employee) {
            this.loadParam.operator = employee.employeeId
            this.loadParam.operatorName = employee.employeeName
        },
    },
    filter: (filter, {}),
    ready() {
        common('tab', 'table_box', 1);
    },
    created() {
         this.getFeedbackList(this.loadParam)
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
    width: 250px;
    min-width: 100px;
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
.handled{
    padding: 3px 10px;
    color: #fff;
    background: rgba(0,153,229,.9)
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
