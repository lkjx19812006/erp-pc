<template>
  <create-model :param="createParam" v-if="createParam.show"></create-model>
  <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
  <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
  <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
  <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
  <div v-show="!changeParam.show">
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
                                        employee:100004,
                                        employeeId:'',
                                        employeeName:'',
                                        orgId:'',
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
                                        })">新建</button>
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
          <td>{{item.typeDesc}}</td>
          <td>{{item.classifyDesc}}</td>
          <td>{{item.sourceType}}</td>
          <td>{{item.creditLevel}}</td>
          <td class="underline"  @click="clickOn({
                                id:item.id,
                                sub:$index,
                                show:true,
                                loading:false,
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
          <td>{{item.mainPhone}}</td>
          <td>{{item.phoneProvince}}</td>
          <td>{{item.phoneCity}}</td>
          <td>{{item.email}}</td>
          <td>{{item.countryName }}</td>
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
                              link:alterInfo,
                              url:'/customer/',
                              key:'customerList'
                              })">编辑</li>
                <li @click="specDelete({
                            id:item.id,
                            sub:$index,
                            show:true,
                            name:item.name,
                            title:'供应商',
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
  import pagination from '../pagination'
  import detailModel from '../clientRelate/clientDetail'
  import createModel  from '../user/userTransfer'
  import deletebreedModel  from '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
  import alterinfoModel  from '../clientRelate/clientUpdate'
  import searchModel  from  '../clientRelate/searchModel'
  import {
    initCustomerlist
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
        initCustomerlist
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
    }
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
</style>
