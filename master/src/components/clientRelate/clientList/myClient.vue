<template>
    <create-model :param="createParam" v-if="createParam.show"></create-model>
    <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
    <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
    <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
    <transfer-model :param="transferParam" v-if="transferParam.show"></transfer-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
    <audit-dialog :param="auditParam" v-if="auditParam.show"></audit-dialog>
    
    <div>
        <div class="service-nav">
            <div class="clear" style="margin-top:3px;"> 
                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">{{$t("static.client_name")}}：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.name" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>

                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">{{$t("static.province_of_phone")}}：</dt>
                   <dd class="left">
                        <select v-model="loadParam.phoneProvinceName"  class="form-control" @change="selectSearch()" >
                            <option value="">{{$t("static.please_select")}}</option>
                            <option v-for="item in initProvince">{{item.cname}}</option>
                        </select>
                   </dd>
                </dl>

                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">{{$t("static.client_type")}}：</dt>
                   <dd class="left">
                         <select v-model="loadParam.type"  class="form-control" @change="selectSearch()">
                              <option value="">{{$t("static.please_select")}}</option>
                              <option value="0">其它</option>
                              <option value="1">合作社</option>
                              <option value="2">药商</option>
                              <option value="3">药厂</option>
                              <option value="4">个体户</option>
                              <option value="5">药店</option>
                              <option value="6">医院</option>
                              <option value="7">贸易公司</option>
                              <option value="8">零售商行</option>
                              <option value="9">药农</option>
                              <option value="10">介绍人</option>
                              <option value="11">药贩子</option>
                              <option value="12">产地药商</option>
                              <option value="13">销地药商</option>
                              <option value="14">养生诊所</option>
                              <option value="15">化工厂</option>
                              <option value="16">化妆品厂</option>
                              <option value="17">提取物厂</option>
                              <option value="18">食品厂</option>
                              <option value="19">实验室</option>
                              <option value="20">网上电商</option>
                              <option value="21">中成药生产商</option>
                              <option value="22">西药生产商</option>
                              <option value="23">饮片厂</option>
                        </select>
                   </dd>
                </dl>
                
                

                <!-- <dl class="clear left transfer">
                    <div class="client-detailInfo col-xs-6">
                        <dt class="left transfer marg_top">{{$t("static.registration_start_time")}}：</dt>
                        <mz-datepicker :time.sync="loadParam.ctimeStart" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                </dl> -->

                
                <dd class="left" style="margin-left:20px">
                    <button type="button" class="btn btn-default" height="24" width="24" @click="selectSearch()">{{$t("static.search")}}</button>
                </dd>
            </div>

            <div class="clear" style="margin-top:3px;"> 
                <dl class="clear left transfer">
                   <dt class="left transfer marg_top" style="letter-spacing:3px" >{{$t("static.cellphone")}}：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.phone" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>

                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">{{$t("static.credit_rating")}}：</dt>
                   <dd class="left">
                         <select v-model="loadParam.creditLevel"  class="form-control" @change="selectSearch()">
                          <option value="">{{$t("static.please_select")}}</option>
                          <option value="0">{{$t("static.none")}}</option>
                          <option value="1">{{$t("static.one_star")}}</option>
                          <option value="2">{{$t("static.two_star")}}</option>
                          <option value="3">{{$t("static.three_star")}}</option>
                        </select>
                   </dd>
                </dl>

                <dl class="clear left transfer">
                   <dt class="left transfer marg_top">{{$t("static.business_scope")}}：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" style="width:80%" v-model="loadParam.bizScope" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                   </dd>
                </dl>
                
                <!-- <dl class="clear left transfer" style="margin-left: -33px;">
                    <div class="client-detailInfo col-xs-6">
                        <dt class="left transfer marg_top">{{$t("static.registration_end_time")}}：</dt>
                        <mz-datepicker :time.sync="loadParam.ctimeEnd" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                </dl> -->
                
                <dd class="left" style="margin-left:-13px" >
                    <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">{{$t("static.clear_all")}}</button>
                </dd>
                
                <dd class="pull-right" style="margin-right:20px">
                  <!-- <button type="button" class="btn btn-default" @click="clientTransfer({
                        arr:[],
                        name:'test',
                        employeeId:'',
                        orgId:'',
                        show:true
                        })">{{$t("static.assigned_to_employee")}}</button> -->
                  <button type="button" class="btn btn-default" @click="clientTransferBlack()">{{$t("static.drag_into_blacklist")}}</button>
                  <button type="button" class="btn btn-default" @click="clientTransferSupplier()">{{$t("static.make_them_become_supplier")}}</button>
                  <button type="button" class="btn btn-default" @click="createCustomer({
                                            show:true,
                                            loading:false,
                                            id:'',
                                            category:'',
                                            typeDesc:'',
                                            classify:'1,买',
                                            type:0,
                                            name:'',
                                            mainPhone:'',
                                            principal:'',
                                            bizScope:'',
                                            province:'',
                                            city:'',
                                            address:'',
                                            employee:'',
                                            employeeId:this.initLogin.id,
                                            employeeName:this.initLogin.name,
                                            orgId:this.initLogin.orgId,
                                            orgName:'',
                                            contacts:[
                                                {
                                                    mainContact:'',
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
                                            key:'myCustomerList'
                                            })">{{$t("static.new")}}</button>
                  <button type="button" class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
                </dd>

            </div>
        </div>
        <div class="order_table" id="table_box">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th>
                            <!-- <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids"  @click="checkedAll()"></label> -->
                        </th>
                        <th>{{$t('static.salesman')}}</th>
                        <th>{{$t('static.create_time')}}</th>
                        <th>{{$t('static.recent_contact')}}</th>
                        <th>{{$t('static.client_name')}}</th>
                        <th>{{$t('static.transaction_num')}}</th>
                        <th>{{$t('static.client_type')}}</th>
                        <th>{{$t('static.contact')}}</th>
                        <th>{{$t('static.position')}}</th>
                        <th>{{$t('static.cellphone')}}</th>
                        <th>{{$t('static.phone_origin')}}</th>
                        <th>{{$t('static.client_origin')}}</th>
                        <th>{{$t('static.detailed_address')}}</th>
                        <th>{{$t('static.main_product')}}</th> 
                        
                    <!-- <th>{{$t("static.type")}}</th>
                        <th>{{$t("static.classification")}}</th>
                        <th>{{$t("static.customer_source")}}</th>
                        <th>{{$t("static.credit_rating")}}</th>
                        <th>{{$t("static.client_name")}}</th>
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
                        <th style="min-width:200px">{{$t("static.comment")}}</th> -->
                        <th>{{$t("static.operation")}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                    </tr>
                    <tr v-for="item in initMyCustomerlist">
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
                                name:item.name,
                                link:alterInfo,
                                loading:true,
                                url:'/customer/',
                                key:'myCustomerList'
                                })">{{item.name}}</td>
                        <td>{{item.orderTotal}}</td>
                        <td>{{item.type | customerType}}</td>
                        <td>{{item.mainContact}}</td>
                        <td>{{item.mainPosition}}</td>
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
                                name:item.name,
                                link:alterInfo,
                                loading:true,
                                url:'/customer/',
                                key:'customerList'
                                })">{{item.name}}</td>
                                    <img src="/static/images/compact.png" style='float:left;' /><div style='float:right'></div>
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
                        <td>{{item.comments}}</td> 
                    -->
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
                                                key:'myCustomerList',
                                                employeeId:item.employeeId,
                                                employeeName:item.employeeName,
                                                orgId:item.orgId
                                                })">
                            <a class="operate"><img src="/static/images/{{$t('static.img_edit')}}.png" />
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
import filter from '../../../filters/filters'
import pagination from '../../../components/pagination'
import detailModel from '../../../components/clientRelate/clientDetail'
import createModel  from '../../../components/user/userTransfer'
import deletebreedModel  from '../../../components/serviceBaselist/breedDetailDialog/deleteBreedDetail'
import alterinfoModel  from '../../../components/clientRelate/clientUpdate'
import transferModel   from '../../../components/user/employeeOrOrg'
import tipsdialogModel  from '../../../components/tips/tipDialog'
import searchModel  from  '../../../components/clientRelate/searchModel'
import auditDialog from '../../../components/tips/auditDialog'
import vSelect from '../../tools/vueSelect/components/Select'
import common from '../../../common/common'
import changeMenu from '../../../components/tools/tabs/tabs.js'
import {
    initMyCustomerlist,
    initProvince,
    initLogin
} from '../../../vuex/getters'
import {
    getClientList,
    getProvinceList,
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
        auditDialog,
        vSelect
    },
    vuex: {
        getters: {
            initMyCustomerlist,
            initProvince,
            initLogin
        },
        actions: {
            getClientList,
            getProvinceList,
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
                link:'/customer/employeeDistributed',
                key:'myCustomerList',
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
            provinceParam:{
              loading:true,
              show:false,
              color: '#5dc596',
              size: '15px',
              cur: 1,
              all: 7,
              country:''
            },
            changeParam: {
                show: false,
                loading:true
            },
            createParam:{
                show: false,
                name:'',
            },
            searchParam:{
                show:false
            },
            transferParam:{
                show:false,
                name:'',
                orgId:'',
                employeeId:'',
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
                name:'请先选择客户',
                alert:true
            },
          auditParam:{
            link:'/customer/transferBlacklist',
            key:'myCustomerList',
            show:false,
            title:'客户拉入黑名单备注',
            arr:[],
            blacklist:1,
            callback:this.callback
          },
            checked:false
        }
    },
    methods: {
        selectSearch:function(){
            this.getClientList(this.loadParam);
        },
        clickOn: function(param) {
            this.changeParam = param;
        },
        createCustomer:function(info){
            this.createParam = info;
            this.createParam.callback=this.valueback;
        },
        valueback:function(title){
            console.log(title)
            this.tipsParam.show = true;
            this.tipsParam.name=title;
            this.tipsParam.alert=true;
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
            if(this.$store.state.table.basicBaseList.myCustomerList[id].show){
                this.$store.state.table.basicBaseList.myCustomerList[id].show = !this.$store.state.table.basicBaseList.myCustomerList[id].show;
            }else{
                this.$store.state.table.basicBaseList.myCustomerList[id].show=true;
            }
        },
        specDelete:function(param){
            this.deleteParam = param;
        },
        modifyClient:function(param){
            this.alterParam = param;
            this.alterParam.callback = this.updateback;
        },
        updateback:function(title){
            console.log(title)
            this.tipsParam.show = true;
            if(title=='success'){
                this.tipsParam.name = '修改成功';
            }else{
                this.tipsParam.name=title;
            }
            this.tipsParam.alert=true;
        },
        clientTransfer:function(){
            this.transferParam.arr = [];
            for(var i in this.initMyCustomerlist){
                if(this.initMyCustomerlist[i].checked){
                    this.transferParam.arr.push(this.initMyCustomerlist[i].id);
                }
            }
            if(this.transferParam.arr.length>0){
                this.transferParam.show=true;
            }else{
                this.tipsParam.show=true;
                this.tipsParam.alert=true;
            }
            this.transferParam.callback=this.transferback;
        },
        transferback:function(title){
            console.log(title)
            this.tipsParam.show = true;
            if(title=='success'){
                this.tipsParam.name = '划转成功';
            }else{
                this.tipsParam.name=title;
            }
            
            this.tipsParam.alert=true;
        },
        clientTransferSupplier:function(){
            this.auditParam.title="客户提取为供应商备注";
            this.auditParam.link='/customer/setSupplier';
            this.auditParam.arr=[];
            for(var i in this.initMyCustomerlist){
              if(this.initMyCustomerlist[i].checked){
                this.auditParam.arr.push(this.initMyCustomerlist[i].id);
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
            for(var i in this.initMyCustomerlist){
              if(this.initMyCustomerlist[i].checked){
                this.auditParam.arr.push(this.initMyCustomerlist[i].id);
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
        this.auditParam.callback = this.supplierback;
        this.customerTransferBlacklist(this.auditParam);
      },
      supplierback:function(title){
        console.log(title)
        this.tipsParam.show = true;
        this.tipsParam.name=title;
        this.tipsParam.alert=true;
     },
        checkedAll: function() {
           this.checked=!this.checked;
           if(this.checked){
                 this.$store.state.table.basicBaseList.myCustomerList.forEach(function(item){
                    item.checked=true;
             })
           }else{
                this.$store.state.table.basicBaseList.myCustomerList.forEach(function(item){
                    item.checked=false;
             })
           }
        },
        onlyselected:function(sub,id){
            //this.id = id;
            const _this=this;
            this.$store.state.table.basicBaseList.myCustomerList[sub].checked=!this.$store.state.table.basicBaseList.myCustomerList[sub].checked;
            if(!this.$store.state.table.basicBaseList.myCustomerList[sub].checked){
              _this.checked=false;
            }else {
              _this.checked=true;
              this.$store.state.table.basicBaseList.myCustomerList.forEach(function (item) {
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
        this.getProvinceList(this.provinceParam);
        changeMenu(this.$store.state.table.isTop,this.getClientList,this.loadParam,localStorage.myClientParam);
        
    },
    ready(){
      common('tab','table_box',1);
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
.table>tbody>tr>td{
    max-width: 300px;
    white-space: normal;
    word-wrap: break-word;
    /* word-break:break-all; */
}
.component_action{
    right: 30px;
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
#table_box table th,#table_box table td{
    width: 115px;
    min-width: 115px;
}
.service-nav {
    padding: 23px 30px 0px 4px;
}
dl{
    margin-bottom: 5px;
}
</style>
