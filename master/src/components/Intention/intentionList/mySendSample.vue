<template>
     <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
     <create-model :param="createParam" v-if="createParam.send"></create-model>
     <delete-model :param="delParam" v-if="delParam.show"></delete-model>
	 <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise pull-left" style="font-size:14px">我的寄样申请</div>
            <div class="my_order_search pull-right">
               <button class="new_btn transfer" @click="New()">新建</button>
               <button class="new_btn transfer" @click="searchMsg()">搜索</button>
               <button class="new_btn transfer" @click="resetCondition()">清空条件</button>
            </div>
        </div>
        <div class="service-nav clearfix" style="padding-top:10px;">
            <div class="my_order_search">
               <div class="name_search clearfix">
                   <img src="/static/images/search.png" height="24" width="24">
                   <input type="text" class="search_input" placeholder="按客户名称搜索" v-model="loadParam.customerName"  @keyup.enter="searchMsg()">
               </div>
               <div class="ordertel_search clearfix">
                   <img src="/static/images/search.png" height="24" width="24">
                   <input type="text" class="search_input" v-model="loadParam.customerPhone" placeholder="按客户电话搜索" @keyup.enter="searchMsg()">
               </div>
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
                        <th>需支付总金额</th>
                        <th>币种</th>
                        <th>收货人名称</th>
                        <th>联系方式</th>
                        <th>收货地址</th>
                        <th>样品名称</th>
                        <th>审核状态</th>
                        <th>备注</th>
      	            	<th>创建时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initSamplelist">
                        <td class="underline"  @click="clickOn({
                                 id:item.id,
                                 sub:$index,
                                 show:true,
                                 name:item.customerName,
                                 loading:false
                             })">{{item.customerName}}</td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.total}}</td>
                        <td>{{item.currency}}</td>
                        <td>{{item.consignee}}</td>
                        <td>{{item.consigneePhone}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.sampleDesc}}</td>
                        <td>{{item.validate | Auditing}}</td>
                        <td>{{item.comments}}</td>
                        <td>{{item.ctime}}</td>
                        <td>
                           <a class="operate"  @click="updateParam.id=item.id,updateParam.index=$index,updateParam.show=true,updateParam.comments=item.comments"><img src="/static/images/edit.png"  alt="编辑" title="编辑"/>
                           <a class="operate"  @click="deleInfo({
                                    sub:$index,
                                    id:item.id,
                                    show:true,
                                    link:deleteInfo,
                                    url:'/sample/',
                                    key:'mySampleList'
                                    })">
                                <img src="/static/images/del.png" />
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
import createModel  from '../sendSampleapply'
import detailModel from '../sampleDetail'
import common from '../../../common/common'
import deleteModel from '../../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import {
	initSamplelist,
    initLogin
} from '../../../vuex/getters'
import {
	getSampleList,
    getSampleDetail,
    deleteInfo
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        createModel,
        detailModel,
        deleteModel
    },
    vuex: {
        getters: {
            initSamplelist,
            initLogin
        },
        actions: {
            getSampleList,
            getSampleDetail,
            deleteInfo
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
                customerName:'',
                customerPhone:'',
                total:0
            },
            delParam:{
                show:false,
                id:''
            },
            changeParam:{
                show:false
            },
            createParam:{
               send:false,
               customerName:'',
               customerPhone:'',
               customer:'',
               breedName:'',
               consignee:'',
               consigneePhone:'',
               currency:'1',
               address:'',
               comments:'',
               country:'',
               province:'',
               city:'',
               district:'',
               total:'',
               employee:this.initLogin.id,
               items:[ 

               ],
            },
            checked:false
        }
    },
    methods: {
        clickShow:function(index){
        	this.$store.state.table.basicBaseList.msgList[index].show=!this.$store.state.table.basicBaseList.msgList[index].show;
        },
        New:function(){
            this.createParam.send = true;
        },
        searchMsg:function(){
            this.getSampleList(this.loadParam);
        },
        resetCondition:function(){
            this.loadParam.customerName = '';
            this.loadParam.customerPhone = '';
            this.getSampleList(this.loadParam);
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
        clickOn: function(initSamplelist) {
            this.changeParam = initSamplelist;
        },
        deleInfo:function(initSamplelist){
              this.delParam = initSamplelist;
        },
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getSampleList(this.loadParam);
        }
    },
    created() {
        this.getSampleList(this.loadParam);
    },
    ready(){
      common('tab','table_box',1);
    },
    filter: (filter,{})
}
</script>
<style scoped>
.service-nav {
    padding: 15px 30px 0 40px;
}
.my_enterprise{
    padding:6px;
}
.transfer{
    margin-left: 18px;
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
    min-width: 141px;
}
</style>

