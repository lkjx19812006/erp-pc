<template>
     <editmsg-model :param.sync="updateParam" v-if="updateParam.show"></editmsg-model>
     <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
     <audit-model :param="applyParam" v-if="applyParam.show"></audit-model>
     <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
	 <div>
        <div class="service-nav clearfix">
            <div class="my_order_search pull-right">
               <button class="btn btn-primary  transfer" @click="searchMsg()">刷新</button>
            </div>
            <div class="clearfix  pull-left">
               <div class="name_search clearfix">
                   <img src="/static/images/search.png" height="24" width="24">
                   <input type="text" class="search_input" placeholder="按客户名称搜索" v-model="loadParam.customerName"  @keyup.enter="searchMsg()">
               </div>
               <div class="name_search clearfix">
                   <img src="/static/images/search.png" height="24" width="24">
                   <input type="text" class="search_input" v-model="loadParam.customerPhone" placeholder="按客户电话搜索" @keyup.enter="searchMsg()">
               </div>
               <div class="name_search clearfix">
                   <!-- <img src="/static/images/search.png" height="24" width="24"> -->
                   <select class="form-control search_input" v-model="loadParam.validate" @change="searchMsg()">
                        <option value="">全部</option>
                        <option value="0">初始状态</option>
                        <option value="1">申请审核</option>
                        <option value="2">审核通过</option>
                        <option value="3">审核未通过</option>
                   </select>
                   <!-- <input type="text" class="search_input" v-model="loadParam.validate" placeholder="按业务员名称搜索" @keyup.enter="searchMsg()"> -->
               </div>
               <button class="new_btn transfer" @click="searchMsg()">搜索</button>
               <button class="new_btn transfer" @click="resetCondition()">清空条件</button>
           </div>
        </div>
        <div class="order_table" id="table_box">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>客户名称</th>
                        <th>客户电话</th>
                        <th>所属业务员</th>
                        <th>需支付总金额</th>
                        <!-- <th>币种</th> -->
                        <th>收货人名称</th>
                        <th>联系方式</th>
                        <th>收货地址</th>
                        <th>样品说明</th>
                        <th>审核状态</th>
                        <th>备注</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initOrgSample">
                        <td class="underline"  @click="clickOn({
                                 id:item.id,
                                 sub:$index,
                                 show:true,
                                 key:'sampleDetail',
                                 name:item.customerName,
                                 loading:false
                             })">{{item.customerName}}</td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.total}}</td>
                        <!-- <td>{{item.currency}}</td> -->
                        <td>{{item.consignee}}</td>
                        <td>{{item.consigneePhone}}</td>
                        <td>{{item.country}} {{item.province}} {{item.city}} {{item.district}} {{item.address}}</td>
                        <td>{{item.sampleDesc}}</td>
                        <td v-if="item.validate==0">{{item.validate | Audit}}</td>
                        <td v-if="item.validate==1" style="background:#9010ff;color:#fff">{{item.validate | Audit}}</td>
                        <td v-if="item.validate==2" style="background:green;color:#fff">{{item.validate | Audit}}</td>
                        <td v-if="item.validate==3" tyle="background:red;color:#fff">{{item.validate | Audit}}</td>
                        <td>{{item.comments}}</td>
                        <td>{{item.ctime}}</td>
                        <td>
                           <a class="operate"  v-if="item.validate==1" @click="applyCheck({
                                    sub:$index,
                                    id:item.id,
                                    show:true,
                                    title:'审核寄样',
                                    link:sampleApply,
                                    auditComment:'',
                                    validate:item.validate,
                                    url:'/sample/validate/',
                                    key:'orgSampleList'
                                    })">
                                <img src="/static/images/orgcheck.png" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="base_pagination">
            <pagination :combination="loadParam"></pagination>
        </div>
    </div>
</template>
<script>
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import editmsgModel from '../editMsg'
import detailModel from '../sampleDetail'
import common from '../../../common/common'
import auditModel from '../../tips/auditDialog'
import tipsModel from '../../tips/tipDialog'
import {
	initOrgSample
} from '../../../vuex/getters'
import {
	getOrgSampleList,
    sampleApply
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        editmsgModel,
        detailModel,
        auditModel,
        tipsModel
    },
    vuex: {
        getters: {
            initOrgSample
        },
        actions: {
            getOrgSampleList,
            sampleApply
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                key:'samplelist',
                customerName:'',
                customerPhone:'',
                validate:'',
                total:0

            },
            applyParam:{
                show:false,
                sample:''
            },
            changeParam:{
                show:false
            },
            tipsParam:{
              show:false,
              name:'',
              alert:true
            },
            updateParam:{
                show:false,
                index:'',
                comments:'',
                key:'msgList',
                id:''
            },
            checked:false
        }
    },
    methods: {
        clickShow:function(index){
        	this.$store.state.table.basicBaseList.msgList[index].show=!this.$store.state.table.basicBaseList.msgList[index].show;
        },
        searchMsg:function(){
            this.getOrgSampleList(this.loadParam);
        },
        resetCondition:function(){
            this.loadParam.customerName = '';
            this.loadParam.customerPhone = '';
            this.loadParam.validate = '';
            this.getOrgSampleList(this.loadParam);
        },
        onlyselected:function(index){
        	var _this = this;
            this.$store.state.table.basicBaseList.msgList[index].checked=!this.$store.state.table.basicBaseList.msgList[index].checked;
            if(!this.$store.state.table.basicBaseList.msgList[index].checked){
            	this.checked = false;
            }else{
            	this.checked = true;
            	this.$store.state.table.basicBaseList.msgList.forEach(function(item){
            		if(!item.checked){
            			_this.checked = false;
            		}
            	})
            }


        },
        checkedAll:function(){
   			this.checked = !this.checked;
   			if(this.checked){
   				this.$store.state.table.basicBaseList.msgList.forEach(function(item){
   					item.checked = true;
   				})
   			}else{
   				this.$store.state.table.basicBaseList.msgList.forEach(function(item){
   					item.checked = false;
   				})
   			}
        },
        clickOn: function(initOrgSample) {
            this.changeParam = initOrgSample;
        },
        applyCheck:function(initOrgSample){
            console.log(initOrgSample)
            initOrgSample.validate = 2;
            this.applyParam = initOrgSample;
            this.applyParam.callback = this.applycallback;
        },
        applycallback:function(title){
          console.log(title)
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.tipsParam.show = true;
        },
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getOrgSampleList(this.loadParam);
        }
    },
    created() {
        this.getOrgSampleList(this.loadParam, this.loadParam.all);
    },
    ready(){
      common('tab','table_box',1);
    },
    filter: (filter,{})
}
</script>
<style scoped>
.service-nav {
    padding-top:23px;
    padding-bottom: 10px;
}
.my_enterprise{
    padding:6px;
}
.transfer{
    margin-left: 18px;
}
.name_search{
    margin-right: 20px;
}
.checkbox_unselect{
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
.checkbox_select{
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
 #table_box  table th,#table_box  table td{
    width: 141px;
    min-width: 143px;
}
</style>

