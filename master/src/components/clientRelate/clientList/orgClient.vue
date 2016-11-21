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
                <div class="my_enterprise col-xs-1">部门客户</div>
                <div class="right">
                    <button class="new_btn transfer" @click="clientTransfer({
                        arr:[],
                        name:'test',
                        employeeId:'',
                        orgId:'',
                        show:true
                        })">{{$t("static.assigned_to_employee")}}</button>
                  <button class="new_btn transfer" @click="clientTransferBlack()">{{$t("static.drag_into_blacklist")}}</button>
                  <button class="new_btn transfer" @click="clientTransferSupplier()">{{$t("static.make_them_become_supplier")}}</button>
                  <button class="new_btn transfer" @click="createCustomer({
                                            show:true,
                                            loading:false,
                                            id:'',
                                            category:'',
                                            type:'',
                                            name:'',
                                            mainPhone:'',
                                            principal:'',
                                            bizScope:'',
                                            province:'',
                                            city:'',
                                            address:'',
                                            employeeId:'',
                                            employeeName:'',
                                            org:8,
                                            province:'',
                                            orgId:'',
                                            orgName:'',
                                            city:'',
                                            contacts:[
                                                {
                                                    name:'',
                                                    position:'',
                                                    department:'',
                                                    phone:'',
                                                    tel:'',
                                                    email:'',
                                                    qq:'',
                                                    wechart:'',
                                                    main:'',
                                                }
                                            ],
                                            link:saveCreate,
                                            })">{{$t("static.new")}}</button>
                    <button class="new_btn transfer" @click="resetCondition()">{{$t("static.clear_all")}}</button>
                    <button class="new_btn transfer" @click="createSearch()">{{$t("static.search")}}</button>
                </div>
            </div>
            <div class="clear" style="margin-top:10px;">
                   <!--  <dl class="clear left transfer">
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
                       <dt class="left transfer marg_top">{{$t("static.customer_classification")}}：</dt>
                       <dd class="left">
                             <select v-model="loadParam.classify"  class="form-control" @change="selectSearch()">
                                <option value="" selected>{{$t("static.please_select")}}</option>
                            <option value="1">{{$t("static.purchaser")}}</option>
                            <option value="2">{{$t("static.supplier")}}</option>
                            <option value="3">{{$t("static.purchaser_and_supplier")}}</option>
                            </select>
                       </dd>
                    </dl>
                    <dl class="clear left transfer">
                       <dt class="left transfer marg_top">{{$t("static.credit_rating")}}：</dt>
                       <dd class="left">
                             <select v-model="loadParam.creditLevel"  class="form-control" @change="selectSearch()">
                              <option value="" selected>{{$t("static.please_select")}}</option>
                          <option value="0">{{$t("static.none")}}</option>
                          <option value="1">{{$t("static.one_star")}}</option>
                          <option value="2">{{$t("static.two_star")}}</option>
                          <option value="3">{{$t("static.three_star")}}</option>
                            </select>
                       </dd>
                    </dl>
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
                        <th>{{$t("static.type")}}</th>
                        <th>{{$t("static.classification")}}</th>
                        <th>{{$t("static.customer_source")}}</th>
                        <th>{{$t("static.credit_rating")}}</th>
                        <th>{{$t("static.client_name")}}</th>
                        <th>{{$t("static.classification_code")}}</th>
                        <!-- <th>所属分类</th> -->
                        <th>{{$t("static.salesman")}}</th>
                        <th>{{$t("static.principals")}}</th>
                        <th style="min-width:120px;">{{$t("static.business_scope")}}</th>
                        <th>{{$t("static.client_phone")}}</th>
                        <th>{{$t("static.province_of_phone")}}</th>
                        <th>{{$t("static.city_of_phone")}}</th>
                        <th>{{$t("static.client_email")}}</th>
                        <th>{{$t("static.country")}}</th>
                        <th>{{$t("static.province")}}</th>
                        <th>{{$t("static.city")}}</th>
                        <th>{{$t("static.registered_address")}}</th>
                        <th>{{$t("static.create_time")}}</th>
                        <th>{{$t("static.whether_supplier")}}</th>
                        <th style="min-width:200px">{{$t("static.comment")}}</th>
                        <th colspan="2">{{$t("static.operation")}}</th>
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
                        <td>{{item.classify | classify}}</td>
                        <td>{{item.sourceType}}</td>
                        <td v-if="item.creditLevel!=1&&item.creditLevel!=2&&item.creditLevel!=3">暂无等级</td>
                        <td v-if="item.creditLevel==1">一星客户</td>
                        <td v-if="item.creditLevel==2">二星客户</td>
                        <td v-if="item.creditLevel==3">三星客户</td>
                        <td class="underline"  @click="clickOn({
                                id:item.id,
                                sub:$index,
                                loading:true,
                                name:item.name,
                                show:true,
                                link:alterInfo,
                                url:'/customer/',
                                key:'customerList'
                                })">{{item.name}}</td>
                                    <!-- <img src="/static/images/compact.png" style='float:left;' /><div style='float:right'></div> -->
                                    <!-- 上面这个img显示新客户图标 -->
                        <td>{{item.category}}</td>
                        <!-- <td>{{item.classify | classify}}</td> -->
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
                        <td >{{item.comments}}</td>
                        <td  @click="modifyClient({
                                                id:item.id,
                                                sub:$index,
                                                show:true,
                                                name:item.name,
                                                type:item.type,
                                                typeDesc:item.type,
                                                classifyDesc:item.classify,
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
                        <!-- <td  @click="specDelete({
                                                id:item.id,
                                                sub:$index,
                                                show:true,
                                                name:item.name,
                                                title:'客户',
                                                link:deleteInfo,
                                                url:'/customer/',
                                                key:'customerList'
                                                })">
                            <a class="operate"><img src="/static/images/del.png" height="18" width="30"/>
                            </a>
                        </td> -->
                       <!--  <td @click.stop="eventClick($index)">
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
import filter from '../../../filters/filters'
import pagination from '../../../components/pagination'
import detailModel from '../../../components/clientRelate/clientDetail'
//import createModel from '../components/clientRelate/clientCreate'
import createModel  from '../../../components/user/userTransfer'
import deletebreedModel  from '../../../components/serviceBaselist/breedDetailDialog/deleteBreedDetail'
import alterinfoModel  from '../../../components/clientRelate/clientUpdate'
import transferModel   from '../../../components/user/employeeOrOrg'
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
    saveCreate,
  transferInfo,
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
            saveCreate,
          transferInfo,
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
                link:'/customer/orgDistributed',
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
                ctimeStart:'',
                ctimeEnd:'',
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
                employeeId:''
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
        },
        selectSearch:function(){
            this.getClientList(this.loadParam);
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
    filter:(filter,{})
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
.table>tbody>tr>td{
    max-width: 300px;
    white-space: normal;
    word-wrap: break-word;
    /* word-break:break-all; */
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
