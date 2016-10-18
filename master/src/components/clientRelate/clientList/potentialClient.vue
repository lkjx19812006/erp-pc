<template>
    <create-model :param="createParam" v-if="createParam.show"></create-model>
    <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
    <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
    <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
    <audit-dialog :param="auditParam" v-if="auditParam.show"></audit-dialog>
    <div v-show="!changeParam.show">
        <div class="service-nav clearfix">
            <div class="my_enterprise col-xs-1">潜在客户</div>
            <div class="right col-xs-4">
                <button class="new_btn transfer" @click="clientTransfer({
                    arr:[],
                    name:'test',
                    employeeId:'',
                    orgId:'',
                    show:true
                    })">划转</button>
              <button class="new_btn transfer" @click="clientTransferBlack()">加入黑名单</button>
              <button class="new_btn transfer" @click="clientTransferSupplier()">抽取供应商</button>
                <button class="new_btn transfer" @click="createSearch()">搜索</button>
            </div>
        </div>
        <div class="order_table">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak>
                <thead>
                    <tr>
                        <th>
                            <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label></th>
                        <th>类型</th>
                        <th>分类</th>
                        <th>客户来源</th>
                        <th>客户等级</th>
                        <th>名称</th>
                        <th>分类码</th>
                        <!-- <th>所属分类</th> -->
                        <th>所属业务员</th>
                        <th>负责人</th>
                        <th>经营范围</th>
                        <th>电话</th>
                        <th>手机省</th>
                        <th>手机市</th>
                        <th>邮箱</th>
                        <th>国家</th>
                        <th>所在省</th>
                        <th>所在市</th>
                        <th>注册地址</th>
                        <th>备注</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                    </tr>
                    <tr v-for="item in initCustomerlist">
                        <td  @click.stop="">
                            <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"   @click="onlyselected($index,item.id)" ></label>
                        </td>
                        <td>{{item.typeDesc}}</td>
                        <td>{{item.classifyDesc}}</td>
                        <td>{{item.sourceType}}</td>
                        <td>{{item.creditLevel}}</td>
                        <td class="underline"  @click="clickOn({
                                id:item.id,
                                sub:$index,
                                show:true,
                                name:item.name,
                                link:alterInfo,
                                url:'/customer/',
                                key:'customerList'
                                })"><!-- <img src="/static/images/compact.png" style='float:left;' /> -->{{item.name}}</td>
                                    <!-- 上面这个img显示新客户图标 -->
                        <td>{{item.category}}</td>
                        <!-- <td>{{item.classify | classify}}</td> -->
                        <td>{{item.employeeName}}</td>
                        <td>{{item.principal}}</td>
                        <td>{{item.bizScope}}</td>
                        <td>{{item.tel}}</td>
                        <td>{{item.phoneProvince}}</td>
                        <td>{{item.phoneCity}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.countryName | country}}</td>
                        <td>{{item.provinceName}}</td>
                        <td>{{item.cityName}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.comments}}</td>
                        <td @click.stop="eventClick($index)">
                            <img height="24" width="24" src="/static/images/default_arrow.png" />
                            <div class="component_action" v-show="item.show">
                                <ul>
                                    <li @click="modifyClient({
                                                id:item.id,
                                                sub:$index,
                                                show:true,
                                                name:item.name,
                                                type:item.type,
                                                classify:item.classify,
                                                category:item.category,
                                                principal:item.principal,
                                                bizScope:item.bizScope,
                                                tel:item.tel,
                                                email:item.email,
                                                province:item.province,
                                                city:item.city,
                                                address:item.address,
                                                comments:item.comments,
                                                link:alterInfo,
                                                url:'/customer/',
                                                key:'customerList'
                                                })">编辑</li>
                                    <li @click="specDelete({
                                                id:item.id,
                                                sub:$index,
                                                show:true,
                                                name:item.name,
                                                title:'客户',
                                                link:deleteInfo,
                                                url:'/customer/',
                                                key:'customerList'
                                                })">删除</li>
                                </ul>
                            </div>
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
import filter from '../../../filters/filters'
import pagination from '../../../components/pagination'
import detailModel from '../../../components/clientRelate/clientDetail'
//import createModel from '../components/clientRelate/clientCreate'
import createModel  from '../../../components/user/userTransfer'
import deletebreedModel  from '../../../components/serviceBaselist/breedDetailDialog/deleteBreedDetail'
import alterinfoModel  from '../../../components/clientRelate/clientUpdate'
import transferModel   from '../../../components/clientRelate/clienttransfer'
import tipsdialogModel  from '../../../components/tips/tipDialog'
import searchModel  from  '../../../components/clientRelate/searchModel'
import auditDialog from '../../../components/tips/auditDialog'
import {
    initCustomerlist
} from '../../../vuex/getters'
import {
    getClientList,
    deleteInfo,
    alterInfo,
    getClientDetail,
    saveCreate,
  customerTransferBlacklist
} from '../../../vuex/actions'

export default {
    components: {
        pagination,
        detailModel,
        createModel,
        deletebreedModel,
        alterinfoModel,
        transferModel,
        tipsdialogModel,
        searchModel,
      auditDialog
    },
    vuex: {
        getters: {
            initCustomerlist
        },
        actions: {
            getClientList,
            deleteInfo,
            alterInfo,
            getClientDetail,
            saveCreate,
          customerTransferBlacklist
        }
    },
    data() {
        return {
            loadParam: {
                loading: true,
                show:false,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                link:'/customer/undistributed',
                name:'',
                phone:'',
                employeeId:'',
                employeeName:'',
                type:'',
                classify:'',
                status:'',
                bizScope:'',
                provinceName:'',
                province:'',
                city:'',
                cityName:''
            },
            changeParam: {
                show: false
            },
            createParam:{
                show: false,
                name:''
            },
            searchParam:{
                show:false,


            },
            transferParam:{
                show:false,
                name:'',
                arr:[]
            },
            deleteParam:{
                show:false
            },
            alterParam:{
                show:false,
                id:''
            },
            tipsParam:{
                show:false,
                name:'请先选择客户'
            },
          auditParam:{
            link:'/customer/transferBlacklist',
            show:false,
            title:'客户拉入黑名单备注',
            arr:[],
            blacklist:1
          },
            checked:false
        }
    },
    methods: {
        clickOn: function(initCustomerlist) {
            this.changeParam = initCustomerlist;
            this.getClientDetail(this.changeParam);
        },
        createCustomer:function(info){
            this.createParam = info;
            //this.createParam.name=value;
        },
        createSearch:function(){
            this.loadParam.show=true;
        },
        eventClick:function(id){
            if(this.$store.state.table.basicBaseList.customerList[id].show){
                this.$store.state.table.basicBaseList.customerList[id].show = !this.$store.state.table.basicBaseList.customerList[id].show;
            }else{
                this.$store.state.table.basicBaseList.customerList[id].show=true;
            }
        },
        specDelete:function(initCustomerlist){
            this.deleteParam = initCustomerlist;
        },
        modifyClient:function(initCustomerlist){
            this.alterParam =initCustomerlist;
        },
        clientTransfer:function(initCustomerlist){
            this.transferParam.arr = [];
            for(var i in this.initCustomerlist){
                if(this.initCustomerlist[i].checked){
                    this.transferParam.arr.push(this.initCustomerlist[i].id);
                }
            }

            if(this.transferParam.arr.length>0){
                this.transferParam.show=true;
            }else{
                this.tipsParam.show=true;
                this.tipsParam.alert=true;
            }

        },
      clientTransferSupplier:function(){
        this.auditParam.title="客户提取为供应商备注";
        this.auditParam.link='/customer/setSupplier';
        this.auditParam.arr=[];
        for(var i in this.initCustomerlist){
          if(this.initCustomerlist[i].checked){
            this.auditParam.arr.push(this.initCustomerlist[i].id);
          }
        }

        if(this.auditParam.arr.length>0){
          this.auditParam.show=true;
          this.auditParam.confirm=true;
          this.auditParam.callback=this.callback;
        }else{
          this.tipsParam.show=true;
          this.tipsParam.alert=true;
          this.tipsParam.name='请先选择客户';
          this.tipsParam.confirm=false;

        }
      },
      clientTransferBlack:function(){
        this.auditParam.title="客户踢入黑名单备注";
        this.auditParam.arr=[];
        for(var i in this.initCustomerlist){
          if(this.initCustomerlist[i].checked){
            this.auditParam.arr.push(this.initCustomerlist[i].id);
          }
        }

        if(this.auditParam.arr.length>0){
          this.auditParam.show=true;
          this.auditParam.confirm=true;
          this.auditParam.callback=this.callback;
        }else{
          this.tipsParam.show=true;
          this.tipsParam.alert=true;
          this.tipsParam.name='请先选择客户';
          this.tipsParam.confirm=false;

        }

      },
      callback:function(){
        this.auditParam.blackComments=this.auditParam.auditComment;
        this.auditParam.customerIds=this.auditParam.arr;
        this.auditParam.auditComment='';
        this.customerTransferBlacklist(this.auditParam);
      },
        checkedAll: function() {
           this.checked=!this.checked;
           if(this.checked){
                 this.$store.state.table.basicBaseList.customerList.forEach(function(item){
                    item.checked=true;
             })
           }else{
                this.$store.state.table.basicBaseList.customerList.forEach(function(item){
                    item.checked=false;
             })
           }
        },
        onlyselected:function(sub,id){

            //this.id = id;

            const _this=this;
            this.$store.state.table.basicBaseList.customerList[sub].checked=!this.$store.state.table.basicBaseList.customerList[sub].checked;
            if(!this.$store.state.table.basicBaseList.customerList[sub].checked){
              _this.checked=false;
            }else {
              _this.checked=true;
              this.$store.state.table.basicBaseList.customerList.forEach(function (item) {
                if(!item.checked){
                  _this.checked=false;
                }
              })
            }
        },
        searchClient:function(){
            this.getClientList(this.loadParam)
        }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getClientList(this.loadParam);
        }
    },
    created() {
        this.getClientList(this.loadParam);
    },
    filter:(filter,{})
}
</script>
<style scoped>
.breed_action {
    top: 33px;
    right: 106px;
}
.transfer{
    margin-left: 18px;
}
.table>tbody>tr>td{
    max-width: 300px;
   /*  white-space: normal; */
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
