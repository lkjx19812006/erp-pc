<template>
     <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
     <create-model :param="createParam" v-if="createParam.send"></create-model>
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
                        <th>收货地址</th>
                        <th>样品说明</th>
                        <th>审核状态</th>
                        <th>备注</th>
      	            	<th>创建时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initSamplelist">
                        <td class="underline"  @click="clickOn({
                                 id:item.userId,
                                 sub:$index,
                                 show:true,
                                 name:item.fullname,
                                 loading:false
                             })">{{item.fullname}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.customerName}}</td>
                        <td>{{item.breedName}}</td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.content}}</td>
                        <td>{{item.comments}}</td>
                        <td>{{item.reply}}</td>
                        <td>{{item.utime}}</td>
                        <td  @click="updateParam.id=item.id,updateParam.index=$index,updateParam.show=true,updateParam.comments=item.comments">
                           <a class="operate"><img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/>
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
import detailModel from '../../user/userDetail'
import common from '../../../common/common'
import {
	initSamplelist,
    initLogin
} from '../../../vuex/getters'
import {
	getSampleList,
    getUserDetail
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        createModel,
        detailModel
    },
    vuex: {
        getters: {
            initSamplelist,
            initLogin
        },
        actions: {
            getSampleList,
            getUserDetail
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
            changeParam:{
                show:false
            },
            createParam:{
               send:false,
               sampling:'',
               customerName:'',
               customerPhone:'',
               customer:'',
               breedName:'',
               consignee:'',
               ctime:'',
               consigneePhone:'',
               currency:'中国',
               address:'',
               comments:'',
               country:'',
               province:'',
               city:'',
               district:'',
               total:0,
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
            this.getUserDetail(this.changeParam);
        }
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
    width: 170px;
    min-width: 170px;
}
</style>

