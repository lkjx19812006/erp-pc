<template>
  <create-model :param="createParam" v-if="createParam.show"></create-model>
  <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
  <supplydetail-model :param="supplyParam" v-if="supplyParam.show"></supplydetail-model>
  <createfiles-model :param="cfilesParam" v-if="cfilesParam.show"></createfiles-model>
  <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
  <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
  <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
  <searchbreed-model :param="breedParam" v-if="breedParam.show"></searchbreed-model>
  <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>

  <mglist-model>
      <!-- 头部搜索-->
      <div slot="top">
          <div class="my_order_search left">
               <div class="filter_search clearfix">
                    <dl class="clearfix">
                        <dt>类型：</dt>
                        <dd>
                            <select class="form-control"  v-model="loadParam.type" @change="searchProduct()">
                                <option value="">全部</option>
                                <option>药材</option>
                                <option>提取物</option>
                                <option>饮片</option>
                            </select>
                        </dd>
                    </dl>
                    
                    <dl class="clearfix">
                        <dt>产品名称：</dt>
                        <dd>
                            <input type="text"  class="form-control" placeholder="按回车键搜索" class="search_input"  v-model="loadParam.name"  @keyup.enter="searchProduct()"/>
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt>品种名称：</dt>
                        <dd>
                            <input type="text"  class="form-control"  class="search_input"  v-model="loadParam.breedName"  @click="selectBreed()"/>
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt>供应商名称：</dt>
                        <dd>
                            <input type="text"  class="form-control" placeholder="按回车搜索" class="search_input"  v-model="loadParam.cName"  @keyup.enter="searchProduct()"/>
                        </dd>
                    </dl>

                    <dl class="clearfix">
                        <button class="btn btn-default transfer"  @click="searchProduct()">搜索</button>
                        <button class="btn btn-default"  @click="reset()">清空条件</button>
                    </dl>
               </div>
          </div>
          <div class="right">
            <button class="btn btn-primary transfer"  @click="searchProduct()">刷新</button>
          </div>
      </div>

      <!--中间列表-->
      <div slot="form">
          <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
          </div>
          <table class="table table-hover table_color table-striped " v-cloak id="tab">
            <thead>
                <tr>
                  <th>产品类型</th>
                  <th>供应商名称</th>
                  <th>品种名称</th>
                  <th>产品名称</th>
                  <th>产品质量</th>
                  <th>产地</th>
                  <th>规格</th>
                  <th>数量（库存）</th>
                  <th>价格</th>
                  <th>单位</th>
                  <!-- <th>检测报告</th> -->
                  <th>创建时间</th>
                  <th>价格过期时间</th>
                  <th>备注</th>
                  <th>上传产品文件</th>
                  <th>操作</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="item in initProductlist">
              <td>{{item.type}}</td>     
              <td class="underline"  @click="supplyOn({
                            id:item.cid,
                            sub:$index,
                            show:true,
                            loading:true,
                            name:item.cName,
                            url:'/customer/',
                            key:'customerList'
                            })">{{item.cName}}</td>
              <td>{{item.breedName}}</td>
              <td class="underline"  @click="clickOn({
                           id:item.id,
                           sub:$index,
                           show:true,
                           name:item.name,
                           loading:true
                           })">{{item.name}}</td>
              <td>{{item.quality}}</td>
              <td>{{item.location}}</td>
              <td>{{item.spec}}</td>
              <td>{{item.number}}</td>
              <td>{{item.price}}</td>
              <td>{{item.unit}}</td>
              <!-- <td>{{item.coa | coa}}</td> -->
              <td>{{item.ctime}}</td>
              <td>{{item.duedate}}</td>
              <td>{{item.comments}}</td>
              <td @click="createfiles({
                   bizId:item.id,
                   show:true,
                   title:'新建产品文件',
                   fileType:'',
                   bizType:'product_license',
                   description:'',
                   path:'',
                   link:uploadFiles,
                   callback:'',
                   url:'/customer/file/',
                   key:'files'
                 })">
                 <a class="operate"><img src="/static/images/uploadPro.png" height="18" width="67"/></a>
              </td>
              <td  @click="modifySupply({
                       sub:$index,
                       id:item.id,
                       cid:item.cid,
                       show:true,
                       title:'编辑产品',
                       type:item.type,
                       name:item.name,
                       cName:item.cName,
                       breedId:item.breedId,
                       quality:item.quality,
                       location:item.location,
                       spec:item.spec,
                       number:item.number,
                       price:item.price,
                       unit:item.unit,
                       duedate:item.duedate,
                       comments:item.comments,
                       image_f:'',
                       image_s:'',
                       image_t:'',
                       image_f_show:'',
                       image_s_show:'',
                       image_t_show:'',
                       coa:item.coa,
                       link:updateProduct,
                       url:'/customer/product',
                       headline:'productList'
                      })">
                   <a class="operate"><img src="/static/images/edit.png"   alt="编辑" title="编辑"/>
                   </a>
              </td>
            </tr>
            </tbody>
          </table>
      </div>

      <!--底部分页-->
      <pagination :combination="loadParam"  slot="page"></pagination>
  </mglist-model>

  <div>
    

    

    <div class="base_pagination" id="base_pagination">
      <pagination :combination="loadParam"></pagination>
    </div>
  </div>
</template>
<script>
  import pagination from '../pagination'
  import detailModel from '../supply/productDetail'
  import createModel  from '../supply/createProduct'
  import alterinfoModel  from '../supply/createProduct'
  import searchModel  from  '../clientRelate/searchModel'
  import supplydetailModel from  '../clientRelate/clientDetail'
  import createfilesModel from  '../clientRelate/createFiles'
  import common from  '../../common/common'
  import changeMenu from '../../components/tools/tabs/tabs.js'
  import tipsModel from '../tips/tipDialog'
  import searchbreedModel from '../Intention/breedsearch'
  import mglistModel from '../mguan/mgListComponent.vue'
  import {
    initProductlist
  } from '../../vuex/getters'
  import {
    getProductList,
    updateProduct,
    saveCreate,
    uploadFiles,
    newProduct,
    getBreedDetail
  } from '../../vuex/actions'

  export default {
    components: {
      pagination,
      detailModel,
      createModel,
      createfilesModel,
      alterinfoModel,
      searchModel,
      supplydetailModel,
      tipsModel,
      searchbreedModel,
      mglistModel
    },
    vuex: {
      getters: {
        initProductlist
      },
      actions: {
        getProductList,
        updateProduct,
        saveCreate,
        uploadFiles,
        newProduct,
        getBreedDetail
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
          link:'/customer/product',
          name:'',
          type:'',
          cName:'',
          breedId:'',
          breedName:'',
          total:0,
          status:''
        },
        changeParam: {
          show: false
        },
        supplyParam: {
          show: false
        },
        createParam:{
          show: false
        },
        cfilesParam:{
          show:false
        },
        searchParam:{
          show:false,
        },
        deleteParam:{
          show:false
        },
        breedParam:{
          show:false
        },
        tipsParam:{
          name:'',
          alert:true,
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
      clickOn: function(initProductlist) {
        this.changeParam = initProductlist;
       /* this.getProductDetail(this.changeParam);*/
      },
      supplyOn:function(initProductlist){
          this.supplyParam = initProductlist;
      },
      createCustomer:function(initProductlist){
        this.createParam = initProductlist;
      },
      selectBreed:function(){
         this.breedParam.show=true;
      },
      createfiles:function(param){
         this.cfilesParam = param;
         this.cfilesParam.callback = this.productback;
      },
      reset:function(){
        this.loadParam.name = "";
        this.loadParam.type = "";
        this.loadParam.status = "";
        this.loadParam.cName = "";
        this.loadParam.breedName = "";
        this.loadParam.breedId = "";
        this.getProductList(this.loadParam);
      },
      createSearch:function(){
        this.loadParam.show=true;
      },
      eventClick:function(id){
        if(this.$store.state.table.basicBaseList.productList[id].show){
          this.$store.state.table.basicBaseList.productList[id].show = !this.$store.state.table.basicBaseList.productList[id].show;
        }else{
          this.$store.state.table.basicBaseList.productList[id].show=true;
        }
      },
      modifySupply:function(initProductlist){
        this.alterParam =initProductlist;
        this.alterParam.callback = this.productback;
      },
      productback:function(title){
          this.tipsParam.show = true;
          this.tipsParam.name=title;
          this.tipsParam.alert=true;
      },
      searchProduct:function(){
          this.getProductList(this.loadParam);
      }
    },
    events: {
      fresh: function(input) {
        this.loadParam.cur = input;
        this.getProductList(this.loadParam);
      },
      breed:function(breed){
            this.loadParam.breedName = breed.breedName;
            this.loadParam.breedId = breed.breedId;
            this.breedParam.breedName = breed.breedName;
            this.breedParam.id = breed.breedId;
            this.breedParam.loading=true;
            this.getBreedDetail(this.breedParam);
        },
    },
    ready(){
      common('tab','table_box',1);
    },
    created() {
      /*this.getProductList(this.loadParam);*/
      changeMenu(this.$store.state.table.isTop,this.getProductList,this.loadParam,localStorage.productParam);

      /*if(!this.$store.state.table.isTop){
            console.log("刷新数据");
            this.getProductList(this.loadParam);
        }else{
            console.log("不刷新数据");
            this.loadParam = JSON.parse(localStorage.productParam);
            //this.$store.state.table.basicBaseList.productList = JSON.parse(localStorage.productList);
            //this.loadParam.loading = false;
        }*/
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
  .filter_search dl dt{
    font-size: 14px;
    padding-top: 7px;
  }
  .search_input{
    border: 1px solid #ddd;
    font-size: 14px;
  }
  .filter_search dl{
    font-size: 14px;
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
    width: 121px;
    min-width:110px;
  }
  .service-nav {
    padding: 23px 30px 0px 4px;
  }
  dl{
      margin-bottom: 5px;
  }
</style>
