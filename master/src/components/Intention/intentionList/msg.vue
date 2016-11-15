<template>
     <editmsg-model :param.sync="updateParam" v-if="updateParam.show"></editmsg-model>
     <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
	 <div>
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-2" style="font-size:14px">留言</div>
            <div class="col-xs-8 my_order_search">
               <div class="name_search clearfix">
                   <img src="/static/images/search.png" height="24" width="24">
                   <input type="text" class="search_input" placeholder="会员名称" v-model="loadParam.fullName"  @keyup.enter="searchMsg()">
               </div>
               <div class="ordertel_search clearfix">
                   <img src="/static/images/search.png" height="24" width="24">
                   <input type="text" class="search_input" v-model="loadParam.phone" placeholder="按会员手机" @keyup.enter="searchMsg()">
               </div>
               <button class="new_btn transfer" @click="searchMsg()">搜索</button>
            </div>
        </div>
        <div class="service-nav clearfix">
            <div class="my_order_search">
               <div class="filter_search clearfix">
               </div>
           </div>
        </div>
        <div class="order_table">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak>
                <thead>
                    <tr>
                        <!-- <th>
                            <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label>
                        </th> -->
                        <!-- <th>意向ID</th>     -->
                        <th>留言会员</th>
                        <th>会员手机</th>
                        <th>发布意向客户</th>
                        <th>客户手机</th>
                        <th>留言信息</th>
                        <th>备注</th>
                        <th>回复</th>
      	            	<th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initMsgList">
                         <!-- <td>
                            <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"   @click="onlyselected($index,item.id)" ></label>
                                                 </td> -->
                        <!-- <td>{{item.intentionId}}</td> -->
                        <td>{{item.fullname}}</td>
                        <td>{{item.phone}}</td>
                        <td class="underline"  @click="clickOn({
                                 id:item.userId,
                                 sub:$index,
                                 show:true,
                                 name:item.customerName,
                                 loading:false
                             })">{{item.customerName}}</td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.content}}</td>
                        <td>{{item.comments}}</td>
                        <td>{{item.reply}}</td>
                        <td  @click="updateParam.id=item.id,updateParam.index=$index,updateParam.show=true,updateParam.comments=item.comments">
                           <a class="operate"><img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/>
                           </a>
                        </td>
                       <!--  <td @click.stop="clickShow($index)">
                          <img height="24" width="24" src="/static/images/default_arrow.png" />
                          <div class="component_action" v-show="item.show">
                              <ul>
                                  <li @click="updateParam.id=item.id,updateParam.index=$index,updateParam.show=true,updateParam.comments=item.comments">编辑</li>
                              </ul>
                          </div>
                                              </td> -->
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
import detailModel from '../../user/userDetail'

import {
	initMsgList
} from '../../../vuex/getters'
import {
	getMsgList,
    getUserDetail
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        editmsgModel,
        detailModel
    },
    vuex: {
        getters: {
            initMsgList
        },
        actions: {
            getMsgList,
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
                fullName:'',
                phone:'',
                total:0

            },
            changeParam:{
                show:false
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
            this.getMsgList(this.loadParam);
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
        clickOn: function(initMsgList) {
            this.changeParam = initMsgList;
            this.getUserDetail(this.changeParam);
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getMsgList(this.loadParam);
        }
    },
    created() {
        this.getMsgList(this.loadParam, this.loadParam.all);
    },
    filter: (filter,{})
}
</script>
<style scoped>
.service-nav {
    padding: 15px 30px 0 40px;
}
.order_table{
    margin-top:-4px;
}
.my_enterprise{
    padding:6px;
}
.breed_action {
    top: 33px;
    right: 106px;
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
</style>

