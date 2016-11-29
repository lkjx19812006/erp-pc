<template>
    <create-model :param="createParam" v-if="createParam.show"></create-model>
    <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
    <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
    <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
    <audit-dialog :param="auditParam" v-if="auditParam.show"></audit-dialog>
    <div>
        <div class="service-nav">
            <div class="clearfix">
                <div class="my_enterprise col-xs-1">所有客户</div>
                <div class="right col-xs-6">
                    <button class="new_btn transfer" @click="clientTransfer({
                        arr:[],
                        name:'test',
                        employeeId:'',
                        orgId:'',
                        show:true
                        })">划转</button>
                  <button class="new_btn transfer" @click="clientTransferBlack()">加入黑名单</button>
                  <button class="new_btn transfer" @click="clientTransferSupplier()">提取供应商</button>
                  <button class="new_btn transfer" @click="resetCondition()">清空条件</button>
                  <button class="new_btn transfer" @click="createSearch()">搜索</button>
                </div>
            </div>
            <div class="clear" style="margin-top:10px;">
                        <!-- <dl class="clear left transfer">
                           <dt class="left transfer marg_top">客户类型：</dt>
                           <dd class="left">
                                <select class="form-control" v-model="loadParam.type" @change="selectSearch()">
                                    <option value="">请选择类型</option>
                                    <option value="0">个人</option>
                                    <option value="1">企业</option>
                                </select>
                           </dd>
                        </dl> -->
                        <dl class="clear left transfer">
                           <dt class="left transfer marg_top">客户分类：</dt>
                           <dd class="left">
                                 <select v-model="loadParam.classify"  class="form-control" @change="selectSearch()">
                                    <option value="" selected>全部</option>
                                    <option value="1">采购商</option>
                                    <option value="2">供应商</option>
                                    <option value="3">买卖</option>
                                </select>
                           </dd>
                        </dl>
                        <dl class="clear left transfer">
                           <dt class="left transfer marg_top">客户信用等级：</dt>
                           <dd class="left">
                                 <select v-model="loadParam.creditLevel"  class="form-control" @change="selectSearch()">
                                  <option value="" selected>全部</option>
                                  <option value="0">暂无等级</option>
                                  <option value="1">一星客户</option>
                                  <option value="2">二星客户</option>
                                  <option value="3">三星客户</option>
                                </select>
                           </dd>
                        </dl>
            </div>
        </div>
        <div class="order_table" id="table_box">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table  data-toggle="table"   class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>
                            <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label></th>

                        <th>所属业务员</th>
                        <th>创建时间</th>
                        <th>最近成交时间</th>
                        <th>客户名称</th>
                        <th>成交次数</th>
                        <th>客户类型</th>
                        <th>联系人</th>
                        <th>联系人职位</th>
                        <th>联系人电话</th>
                        <th>手机归属地</th>
                        <th>客户归属地</th>
                        <th>详细地址</th>
                        <th>主营产品</th> 

                        <!-- <th>类型</th>
                        <th>分类</th>
                        <th>客户来源</th>
                        <th>客户信用等级</th>
                        <th>客户名称</th>
                        <th>分类码</th>
                        <th>所属分类</th>
                        <th>所属业务员</th>
                        <th>负责人</th>
                        <th style="min-width:120px;">经营范围</th>
                        <th>手机</th>
                        <th>手机省</th>
                        <th>手机市</th>
                        <th>邮箱</th>
                        <th>国家</th>
                        <th>所在省</th>
                        <th>所在市</th>
                        <th>注册地址</th>
                        <th>创建时间</th>
                        <th>是否供应商</th>
                        <th style="min-width:200px">备注</th> -->
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                    </tr>
                    <tr v-for="item in initCustomerlist">
                        <td  @click.stop="">
                            <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"   @click="onlyselected($index,item.id)" ></label>
                        </td>

                        <td>{{item.employeeName}}</td>
                        <td>{{item.ctime}}</td>
                        <td>{{item.lastOrderTime}}</td>
                        <td class="underline"  @click="clickOn({
                                id:item.id,
                                sub:$index,
                                show:true,
                                loading:true,
                                name:item.name,
                                link:alterInfo,
                                url:'/customer/',
                                key:'customerList'
                                })">{{item.name}}</td>
                        <td>{{item.orderTotal}}</td>
                        <td>{{item.typeDesc}}</td>
                        <td>{{item.mainContact}}</td>
                        <td></td>
                        <td>{{item.mainPhone}}</td>
                        <td>{{item.phoneProvince}}{{item.phoneCity}}</td>
                        <td>{{item.provinceName}}{{item.cityName}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.bizScope}}</td>

                        <!-- <td>{{item.typeDesc}}</td>
                        <td>{{item.classifyDesc | classify}}</td>
                        <td v-if="item.sourceType=='pc'" style="background:#CC3333;color:#fff">{{item.sourceType}}</td>
                        <td v-if="item.sourceType=='weixin'" style="background:green;color:#fff">{{item.sourceType}}</td>
                        <td v-if="item.sourceType=='android'" style="background:#0000CC;color:#fff">{{item.sourceType}}</td>
                        <td v-if="item.sourceType=='ios'" style="background:#CC0099;color:#fff">{{item.sourceType}}</td>
                        <td v-if="item.sourceType!='pc'&&item.sourceType!='weixin'&&item.sourceType!='android'&&item.sourceType!='ios'" style="background:#fa6705;color:#fff">{{item.sourceType}}</td> 
                        <td v-if="item.creditLevel!=1&&item.creditLevel!=2&&item.creditLevel!=3">暂无等级</td>
                        <td v-if="item.creditLevel==1">一星客户</td>
                        <td v-if="item.creditLevel==2">二星客户</td>
                        <td v-if="item.creditLevel==3">三星客户</td>
                        <td class="underline"  @click="clickOn({
                                id:item.id,
                                sub:$index,
                                show:true,
                                loading:true,
                                name:item.name,
                                link:alterInfo,
                                url:'/customer/',
                                key:'customerList'
                                })"><img src="/static/images/newClient2.png" style='float:left;' v-if='item.status==0' />{{item.name}}</td>
                                    上面这个img显示新客户图标
                        <td>{{item.category}}</td>
                        <td>{{item.classify | classify}}</td>
                        <td>{{item.employeeName}}</td>
                        <td>{{item.principal}}</td>
                        <td>{{item.bizScope}}</td>
                        <td>{{item.mainPhone}}</td>
                        <td>{{item.phoneProvince}}</td>
                        <td>{{item.phoneCity}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.countryName | country}}</td>
                        <td>{{item.provinceName}}</td>
                        <td>{{item.cityName}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.ctime}}</td>
                        <td>
                          <div v-if="item.supplier==1">是</div>
                          <div v-if="item.supplier==0">否</div>
                        </td>
                        <td >{{item.comments}}</td> -->
                         <td  @click="modifyClient({
                                                id:item.id,
                                                sub:$index,
                                                show:true,
                                                name:item.name,
                                                type:item.type,
                                                typeDesc:item.typeDesc,
                                                classifyDesc:item.classifyDesc,
                                                classify:item.classify,
                                                category:item.category,
                                                principal:item.principal,
                                                bizScope:item.bizScope,
                                                mainPhone:item.mainPhone,
                                                email:item.email,
                                                country:item.country,
                                                countryName:item.countryName,
                                                province:item.province,
                                                provinceName:item.provinceName,
                                                city:item.city,
                                                cityName:item.cityName,
                                                address:item.address,
                                                comments:item.comments,
                                                creditLevel:item.creditLevel,
                                                link:alterInfo,
                                                url:'/customer/',
                                                key:'customerList',
                                                employeeId:item.employeeId,
                                                employeeName:item.employeeName,
                                                orgId:item.orgId
                                                })">
                            <a class="operate"><img src="/static/images/{{$t('static.img_edit')}}.png" height="18" width="30"/>
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

import pagination from '../../../components/pagination'
import detailModel from '../../../components/clientRelate/clientDetail'
import createModel  from '../../../components/user/userTransfer'
import deletebreedModel  from '../../../components/serviceBaselist/breedDetailDialog/deleteBreedDetail'
import alterinfoModel  from '../../../components/clientRelate/clientUpdate'
import transferModel   from '../../../components/user/employeeOrOrg'
import tipsdialogModel  from '../../../components/tips/tipDialog'
import searchModel  from  '../../../components/clientRelate/searchModel'
import auditDialog from '../../../components/tips/auditDialog'
import common from '../../../common/common'
import {
    initCustomerlist
} from '../../../vuex/getters'
import {
    getClientList,
    deleteInfo,
    alterInfo,
    saveCreate,
    customerTransferBlacklist,
    transferInfo
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
            saveCreate,
            customerTransferBlacklist,
            transferInfo
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
                link:'/customer/',
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
                cityName:'',
                phoneCityName:'',
                phoneProvinceName:'',
                label:'',
                creditLevel:'',
                total:0

            },
            changeParam: {
                show: false,
                loading:true
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
                arr:[],
                orgId:'',
                employeeId:'',
                flag:'allClient'
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
                name:'请先选择客户',
                arr:[]
            },
            auditParam:{
              show:false,
              title:'客户拉入黑名单备注',
              arr:[],
              link:'/customer/transferBlacklist',
              blacklist:1
            },
            checked:false
        }
    },
    methods: {
        clickOn: function(initCustomerlist) {
            this.changeParam = initCustomerlist;

        },
        createCustomer:function(info){
            this.createParam = info;
            //this.createParam.name=value;
        },
        createSearch:function(){
            this.loadParam.show=true;
        },
        resetCondition:function(){
            this.loadParam.name='';
            this.loadParam.phone='';
            this.loadParam.employeeId='';
            this.loadParam.employeeName='';
            this.loadParam.type='';
            this.loadParam.classify='';
            this.loadParam.status='';
            this.loadParam.bizScope='';
            this.loadParam.provinceName='';
            this.loadParam.province='';
            this.loadParam.city='';
            this.loadParam.cityName='';
            this.loadParam.phoneCityName='';
            this.loadParam.phoneProvinceName='';
            this.loadParam.label='';
            this.loadParam.creditLevel='';
            this.loadParam.ctimeStart='';
            this.loadParam.ctimeEnd='';
            this.getClientList(this.loadParam);
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
        clientTransfer:function(){
            this.transferParam.arr = [];
            for(var i in this.initCustomerlist){
                if(this.initCustomerlist[i].checked){
                    this.transferParam.arr.push(this.initCustomerlist[i].id);
                }
            }
            if(this.transferParam.arr.length>0){
                this.transferParam.show=true;
            }else{
                this.tipsParam.alert=true;
                this.tipsParam.show=true;
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
          this.auditParam.link='/customer/transferBlacklist';
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
        selectSearch:function(){
            this.getClientList(this.loadParam);
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
        },
      selectEmpOrOrg: function (param) {
        this.transferParam.employeeId = param.employeeId;
        this.transferParam.employeeName = param.employeeName;
        this.transferParam.orgId = param.orgId;
        this.transferParam.orgName = param.orgName;
        this.transferInfo(this.transferParam);
      }
    },
    created() {
        this.getClientList(this.loadParam);
    },
    ready(){
      common('tab','table_box',1);
    }
}
</script>
<style scoped>
.breed_action {
    top: 33px;
    right: 106px;
}
.transfer{
    margin-right: 8px;
}
.table>tbody>tr>td{
    max-width: 300px;
    white-space: normal;
    word-wrap: break-word;
    /* word-break: inherit; */
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
.component_action{
    right: 30px;
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
#table_box table th,#table_box table td{
    width: 115px;
    min-width: 115px;
}
</style>
