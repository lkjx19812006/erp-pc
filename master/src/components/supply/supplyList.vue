<template>
  <create-model :param="createParam" v-if="createParam.show"></create-model>
  <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
  <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
  <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
  <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
  <div>
    <div class="service-nav clearfix">
      <div class="my_enterprise col-xs-1">供应商</div>
      <div class="right col-xs-4">
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
                                        employee:'',
                                        employeeId:this.initLogin.id,
                                        employeeName:this.initLogin.name,
                                        orgId:this.initLogin.orgId,
                                        orgName:'',
                                        province:'',
                                        city:'',
                                        supplier:1,
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
                                        key:'supplyCustomerList'
                                        })">新建</button>
        <button class="new_btn transfer" @click="resetCondition()">清空条件</button>
        <button class="new_btn transfer" @click="createSearch()">搜索</button>
      </div>
    </div>
    <div class="order_table" id="table_box">
      <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
      </div>
      <table class="table table-hover table_color table-striped " v-cloak id="tab">
        <thead>
        <tr>
          <th>所属业务员</th>
          <th>创建时间</th>
          <th>最近成交时间</th>
          <th>供应商名称</th>
          <th>成交次数</th>
          <th>供应商类型</th>
          <th>联系人</th>
          <th>联系人职位</th>
          <th>联系人电话</th>
          <th>手机归属地</th>
          <th>客户归属地</th>
          <th>详细地址</th>
          <th>主营产品</th>

          <!-- <th>分类</th>
            <th>客户来源</th>
            <th>客户信用等级</th>
            <th>分类码</th>
            <th>所属分类</th>
            
            <th>负责人</th>
            <th>经营范围</th>
            <th>手机</th>
            <th>手机省</th>
            <th>手机市</th>
            <th>邮箱</th>
            <th>国家</th>
            <th>所在省</th>
            <th>所在市</th>
            <th>注册地址</th>
            <th>备注</th> 
          -->
          <th style="min-width:150px;">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr>

        </tr>
        <tr v-for="item in initSupplyCustomerlist">
          <td>{{item.employeeName}}</td>
          <td>{{item.ctime}}</td>
          <td>{{item.lastOrderTime}}</td>
          <td class="underline"  @click="clickOn({
                                id:item.id,
                                sub:$index,
                                show:true,
                                loading:true,
                                name:item.name,
                                url:'/customer/',
                                key:'supplyCustomerList'
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


          <!-- <td>{{item.classifyDesc | classify}}</td>
            <td v-if="item.sourceType=='pc'" style="background:#CC3333;color:#fff">{{item.sourceType}}</td>
                          <td v-if="item.sourceType=='weixin'" style="background:green;color:#fff">{{item.sourceType}}</td>
                          <td v-if="item.sourceType=='android'" style="background:#0000CC;color:#fff">{{item.sourceType}}</td>
                          <td v-if="item.sourceType=='ios'" style="background:#CC0099;color:#fff">{{item.sourceType}}</td>
                          <td v-if="item.sourceType!='pc'&&item.sourceType!='weixin'&&item.sourceType!='android'&&item.sourceType!='ios'" style="background:#fa6705;color:#fff">{{item.sourceType}}</td> 
            <td v-if="item.creditLevel!=1&&item.creditLevel!=2&&item.creditLevel!=3">暂无等级</td>
            <td v-if="item.creditLevel==1">一星客户</td>
            <td v-if="item.creditLevel==2">二星客户</td>
            <td v-if="item.creditLevel==3">三星客户</td>
            
            上面这个img显示新客户图标
            <td>{{item.category}}</td>
            <td>{{item.classify | classify}}</td>
            
            <td>{{item.principal}}</td>
            <td>{{item.bizScope}}</td>
            <td>{{item.mainPhone}}</td>
            <td>{{item.phoneProvince}}</td>
            <td>{{item.phoneCity}}</td>
            <td>{{item.email}}</td>
            <td>{{item.countryName }}</td>
            <td>{{item.provinceName}}</td>
            <td>{{item.cityName}}</td>
            <td>{{item.address}}</td>
            <td>{{item.comments}}</td> 
          -->
          <td>
               <!-- <a class="operate" @click="modifyClient({
                      id:item.id,
                      sub:$index,
                      show:true,
                      name:item.name,
                      type:item.type,
                      typeDesc:item.typeDesc,
                      classify:item.classify,
                      classifyDesc:item.classify,
                      category:item.category,
                      principal:item.principal,
                      bizScope:item.bizScope,
                      mainPhone:item.mainPhone,
                      email:item.email,
                      province:item.province,
                      city:item.city,
                      address:item.address,
                      country:item.country,
                      comments:item.comments,
                      countryName:item.countryName,
                      provinceName:item.provinceName,
                      cityName:item.cityName,
                      employeeId:item.employeeId,
                      employeeName:item.employeeName,
                      orgName:item.orgName,
                      orgId:item.orgId,
                      creditLevel:item.creditLevel,
                      link:alterInfo,
                      url:'/customer/',
                      key:'supplyCustomerList',
                      supplier:1
                      })"><img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/>
               </a> -->
               <a class="operate" @click="specDelete({
                        id:item.id,
                        sub:$index,
                        show:true,
                        name:item.name,
                        title:'供应商',
                        link:deleteInfo,
                        url:'/customer/',
                        key:'supplyCustomerList'
                        })"><img src="/static/images/del.png" height="18" width="30"  alt="删除" title="删除"/>
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
  import pagination from '../pagination'
  import detailModel from '../clientRelate/clientDetail'
  import createModel  from '../user/userTransfer'
  import deletebreedModel  from '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
  import alterinfoModel  from '../clientRelate/clientUpdate'
  import searchModel  from  '../clientRelate/searchModel'
  import filter from '../../filters/filters'
  import common from '../../common/common'
  import changeMenu from '../../components/tools/tabs/tabs.js'
  import {
    initSupplyCustomerlist,
    initLogin
  } from '../../vuex/getters'
  import {
    getClientList,
    deleteInfo,
    alterInfo,
    getClientDetail,
    saveCreate
  } from '../../vuex/actions'

  export default {
    components: {
      pagination,
      detailModel,
      createModel,
      deletebreedModel,
      alterinfoModel,
      searchModel

    },
    vuex: {
      getters: {
        initSupplyCustomerlist,
        initLogin
      },
      actions: {
        getClientList,
        deleteInfo,
        alterInfo,
        getClientDetail,
        saveCreate
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
          link:'/customer/suppliers',
          key:'supplyCustomerList',
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
          show: false
        },
        createParam:{
          show: false,
          name:''
        },
        searchParam:{
          show:false,
        },
        deleteParam:{
          show:false
        },
        alterParam:{
          show:false,
          id:''
        },
        checked:false
      }
    },
    methods: {
      clickOn: function(param) {
        this.changeParam = param;
        
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
            this.getClientList(this.loadParam);
        },
      eventClick:function(id){
        if(this.$store.state.table.basicBaseList.supplyCustomerList[id].show){
          this.$store.state.table.basicBaseList.supplyCustomerList[id].show = !this.$store.state.table.basicBaseList.supplyCustomerList[id].show;
        }else{
          this.$store.state.table.basicBaseList.supplyCustomerList[id].show=true;
        }
      },
      specDelete:function(param){
        this.deleteParam = param;
      },
      modifyClient:function(param){
        this.alterParam =param;
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
      changeMenu(this.$store.state.table.isTop,this.getClientList,this.loadParam,localStorage.supplyClientParam);
    },
    ready(){
      common('tab','table_box',1);
    },
    filter: (filter,{})
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
/*     max-width: 300px; */
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
  #table_box table th,#table_box table td{
    width: 119px;
    min-width: 119px;
}
</style>
