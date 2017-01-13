<template>
     <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
     <create-model :param="createParam" v-if="createParam.send"></create-model>
     <delete-model :param="delParam" v-if="delParam.show"></delete-model>
     <edit-model :param.sync="dialogParam" v-if="dialogParam.send"></edit-model>
     <apply-model :param="applyParam" v-if="applyParam.show"></apply-model>
     <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
     <mglist-model>
         <div slot="top">
            <div class="my_order_search pull-right"> 
               <button class="btn btn-default transfer" @click="New()">{{$t('static.new')}}</button>
               <button class="btn btn-primary  transfer" @click="searchMsg()">{{$t('static.refresh')}}</button>
            </div>
            <div class="clearfix">
              <div class="my_order_search clearfix" >
                 <div class="name_search clearfix pull-left">
                     <img src="/static/images/search.png" height="24" width="24">
                     <input type="text" class="search_input" placeholder="{{$t('static.enter_client_name')}}" v-model="loadParam.customerName"  @keyup.enter="searchMsg()">
                 </div>
                 <div class="ordertel_search clearfix pull-left">
                     <img src="/static/images/search.png" height="24" width="24">
                     <input type="text" class="search_input" v-model="loadParam.customerPhone" placeholder="{{$t('static.enter_client_name')}}" @keyup.enter="searchMsg()">
                 </div>
                 <div class="ordertel_search clearfix pull-left">
                     <!-- <img src="/static/images/search.png" height="24" width="24"> -->
                     <select class="form-control search_input" v-model="loadParam.validate" @change="searchMsg()">
                          <option value="">{{$t('static.please_select')}}</option>
                          <option value="0">{{$t('static.initial')}}</option>
                          <option value="1">{{$t('static.review_application')}}</option>
                          <option value="2">{{$t('static.approved')}}</option>
                          <option value="3">{{$t('static.unapproved')}}</option>
                     </select>
                     <!-- <input type="text" class="search_input" v-model="loadParam.validate" placeholder="按业务员名称搜索" @keyup.enter="searchMsg()"> -->
                 </div>
                 <button class="new_btn transfer pull-left" @click="searchMsg()">{{$t('static.search')}}</button>
                 <button class="new_btn transfer pull-left" @click="resetCondition()">{{$t('static.clear_all')}}</button>
              </div>
            </div> 
         </div>
         <div slot="form">
             <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>{{$t('static.client_name')}}</th>
                        <th>{{$t('static.client_phone')}}</th>
                        <th>需支付总金额</th>
                        <th>{{$t('static.currency')}}</th>
                        <th>{{$t('static.consignee_name')}}</th>
                        <th>联系方式</th>
                        <th>{{$t('static.consignee_address')}}</th>
                        <th>{{$t('static.sample_order')}}</th>
                        <th>{{$t('static.review_status')}}</th>
                        <th>{{$t('static.comment')}}</th>
                        <th>{{$t('static.create_time')}}</th>
                        <th style="min-width: 150px;text-align: left">{{$t('static.operation')}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in initSamplelist">
                        <td class="underline"  @click="clickOn({
                                 id:item.id,
                                 sub:$index,
                                 show:true,
                                 key:'sampleDetail',
                                 name:item.customerName,
                                 loading:false
                             })">{{item.customerName}}</td>
                        <td>{{item.customerPhone}}</td>
                        <td>{{item.total}}</td>
                        <td>{{item.currency | Currency}}</td>
                        <td>{{item.consignee}}</td>
                        <td>{{item.consigneePhone}}</td>
                        <td>{{item.country}} {{item.province}} {{item.city}} {{item.district}} {{item.address}}</td>
                        <td>{{item.sampleDesc}}</td>
                        <td v-if="item.validate==0">{{$t('static.initial')}}</td>
                        <td v-if="item.validate==1"><div style="background:#9010ff;color:#fff">{{$t('static.review_application')}}</div></td>
                        <td v-if="item.validate==2"><div style="background:green;color:#fff">{{$t('static.approved')}}</div></td>
                        <td v-if="item.validate==3"><div tyle="background:red;color:#fff">{{$t('static.unapproved')}}</div></td>
                        <td>{{item.comments}}</td>
                        <td>{{item.ctime}}</td>
                        <td style="text-align: left;">
                            <a class="operate" v-if="item.validate==0||item.validate==3"  @click="updateOrder(item.id,$index)">
                                  <img src="/static/images/{{$t('static.img_edit')}}.png"  alt="编辑" title="编辑"/>
                            </a>
                            <a class="operate" v-if="item.validate==0||item.validate==3"   @click="deleInfo({
                                    sub:$index,
                                    id:item.id,
                                    show:true,
                                    link:deleteData,
                                    url:'/sample/',
                                    key:'mySampleList'
                                    })">
                                <img src="/static/images/{{$t('static.img_del')}}.png" />
                            </a>
                            <a class="operate"  v-if="item.validate==0" @click="applyCheck({
                                    sub:$index,
                                    id:item.id,
                                    show:true,
                                    link:sampleApply,
                                    title:'寄样申请',
                                    auditComment:'',
                                    validate:item.validate,
                                    url:'/sample/validate/apply/',
                                    key:'mySampleList'
                                    })">
                                <img src="/static/images/{{$t('static.img_apply')}}.png" />
                            </a>
                            <a class="operate"  v-if="item.validate==1" >
                                <button type="button" class="btn btn-default" height="24" width="24" style="font-size:4px;padding:0px 2px;margin-top:-22px;color:#fa6705" @click="applyCheck({
                                    sub:$index,
                                    id:item.id,
                                    show:true,
                                    link:sampleApply,
                                    title:'取消寄样申请',
                                    auditComment:'',
                                    url:'/sample/validate/cancel/',
                                    key:'mySampleList'
                                    })">取消申请
                                </button>
                            </a> 
                            <a class="operate"  v-if="item.validate==3" @click="applyCheck({
                                    sub:$index,
                                    id:item.id,
                                    show:true,
                                    link:sampleApply,
                                    title:'重新申请',
                                    auditComment:'',
                                    validate:item.validate,
                                    url:'/sample/validate/apply/',
                                    key:'mySampleList'
                                    })">
                                <img src="/static/images/{{$t('static.img_reset')}}.png" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
         </div>
        <pagination :combination="loadParam"  slot="page"></pagination>
     </mglist-model>
</template>
<script>
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import createModel  from '../newSample'
import detailModel from '../../Intention/sampleDetail'
import common from '../../../common/common'
import deleteModel from '../../serviceBaselist/breedDetailDialog/deleteBreedDetail'
import editModel from '../alterSample'
import applyModel from '../../tips/auditDialog' 
import tipsModel from '../../tips/tipDialog'
import mglistModel from '../../mguan/mgListComponent.vue'
import {
	initSamplelist,
    initLogin
} from  '../../../vuex/getters'
import {
	  getSampleList,
    getSampleDetail,
    deleteData,
    updateSample,
    sampleApply
} from '../../../vuex/actions'
export default {
    components: {
        pagination,
        createModel,
        detailModel,
        deleteModel,
        editModel,
        applyModel,
        tipsModel,
        mglistModel
    },
    vuex: {
        getters: {
            initSamplelist,
            initLogin
        },
        actions: {
            getSampleList,
            getSampleDetail,
            deleteData,
            updateSample,
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
                customerName:'',
                customerPhone:'',
                validate:'',
                key:'samplelist',
                total:0
            },
            delParam:{
                show:false,
                id:''
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
            dialogParam:{
                send:false,
                link:'/sample/',
                key:'samplelist',
                id:'',
                index:'',
                customerName:'',
                customerPhone:'',
                consignee:'',
                consigneePhone:'',
                total:'',
                country:'',
                address:'',
                province:'',
                city:'',
                comments:'',
                district:'',
                items:[     //存放商品条目
                    
                ],
                itemsBack:[   //商品条目备份，用于与修改后的商品条目对照

                ],
            },
            checked:false
        }
    },
    methods: {
        clickShow:function(index){
        	this.$store.state.table.basicBaseList.msgList[index].show=!this.$store.state.table.basicBaseList.msgList[index].show;
        },
        applyCheck:function(initSamplelist){
            this.applyParam = initSamplelist;
            this.applyParam.callback = this.applycallback;
        },
        applycallback:function(title){
          console.log(title)
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.tipsParam.show = true;
        },
        New:function(){
            this.createParam.send = true;
            this.createParam.callback = this.newcallback;
        },
        newcallback:function(title){
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.tipsParam.show = true;
        },
        searchMsg:function(){
            this.getSampleList(this.loadParam);
        },
        resetCondition:function(){
            this.loadParam.customerName = '';
            this.loadParam.customerPhone = '';
            this.loadParam.validate = '';
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
        updateOrder:function(item,index){
              this.dialogParam.send = true;
              this.dialogParam.id = item;
              this.dialogParam.index = index;
              this.dialogParam.items = [];
              this.dialogParam.itemsBack = [];
              this.dialogParam.callback = this.updateback;
        },
        updateback:function(title){
            this.tipsParam.name = title;
            this.tipsParam.alert = true;
            this.tipsParam.show = true;
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
    padding-bottom:0px;
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
    width: 143px;
    min-width: 143px;
}
</style>

