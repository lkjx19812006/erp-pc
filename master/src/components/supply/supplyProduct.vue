<template>
  <create-model :param="createParam" v-if="createParam.show"></create-model>
  <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
  <supplydetail-model :param="supplyParam" v-if="supplyParam.show"></supplydetail-model>
  <alterinfo-model :param="alterParam" v-if="alterParam.show"></alterinfo-model>
  <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
  <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
  <div>
    <div class="service-nav clearfix">
      <div class="my_enterprise col-xs-1">产品列表</div>
      <div class="my_order_search  col-xs-8">
           <div class="filter_search clearfix">
                <dl class="clearfix">
                    <dt>类型：</dt>
                    <dd>
                        <select class="form-control"  v-model="loadParam.type" @change="searchProduct()">
                            <option value="">请选择类型</option>
                            <option>药材</option>
                            <option>提取物</option>
                            <option>饮片</option>
                        </select>
                    </dd>
                </dl>
                <dl class="clearfix">
                    <dt>状态：</dt>
                    <dd>
                        <select class="form-control" v-model="loadParam.status" @change="searchProduct()">
                            <option value="">请选择状态</option>
                            <option value="0">无效</option>
                            <option value="1">可用</option>
                        </select>
                    </dd>
                </dl>
                <dl class="clearfix">
                    <dt>产品名称：</dt>
                    <dd>
                        <input type="text"  class="form-control" placeholder="按产品名称全称搜索" class="search_input"  v-model="loadParam.name"  @keyup.enter="searchProduct()"/>
                    </dd>
                </dl>
                <dl class="clearfix">
                    <dt>供应商名称：</dt>
                    <dd>
                        <input type="text"  class="form-control" placeholder="按供应商名称搜索" class="search_input"  v-model="loadParam.cName"  @keyup.enter="searchProduct()"/>
                    </dd>
                </dl>
           </div>
      </div>
      <div class="right col-xs-3">
        <!--<button class="new_btn transfer" @click="createCustomer({-->
                                             <!--show:true,-->
                                             <!--title:'新建产品',-->
                                             <!--type:'',-->
                                             <!--name:'',-->
                                             <!--breedId:'',-->
                                             <!--quality:'',-->
                                             <!--location:'',-->
                                             <!--spec:'',-->
                                             <!--number:'',-->
                                             <!--price:'',-->
                                             <!--unit:'',-->
                                             <!--duedate:'',-->
                                             <!--coa:'',-->
                                             <!--cid:'',-->
                                             <!--image_f:'',-->
                                             <!--image_s:'',-->
                                             <!--image_t:'',-->
                                             <!--images:'',-->
                                             <!--link:newProduct,-->
                                             <!--url:'/customer/product'-->
                                        <!--})">新建</button>-->
        <button class="new_btn transfer"  @click="searchProduct()">搜索</button>
        <button class="new_btn"  @click="reset()">清空条件</button>
      </div>
    </div>
    <div class="order_table">
      <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
      </div>
      <table class="table table-hover table_color table-striped " v-cloak>
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
              <th>检测报告</th>
              <th>创建时间</th>
              <th>价格过期时间</th>
              <th>备注</th>
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
                                loading:false,
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
                             loading:false
                             })">{{item.name}}</td>
          <td>{{item.quality}}</td>
          <td>{{item.location}}</td>
          <td>{{item.spec}}</td>
          <td>{{item.number}}</td>
          <td>{{item.price}}</td>
          <td>{{item.unit}}</td>
          <td>{{item.coa | coa}}</td>
          <td>{{item.ctime}}</td>
          <td>{{item.duedate}}</td>
          <td>{{item.comments}}</td>
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
               <a class="operate"><img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/>
               </a>
          </td>
          <!-- <td @click.stop="eventClick($index)">
            <img height="24" width="24" src="/static/images/default_arrow.png" />
            <div class="component_action" v-show="item.show">
              <ul>
                <li @click="modifySupply({
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
                              })">编辑</li>
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
  import pagination from '../pagination'
  import detailModel from '../supply/productDetail'
  import createModel  from '../supply/createProduct'
  import alterinfoModel  from '../supply/createProduct'
  import searchModel  from  '../clientRelate/searchModel'
  import supplydetailModel from  '../clientRelate/clientDetail'
  import {
    initProductlist
  } from '../../vuex/getters'
  import {
    getProductList,
    updateProduct,
    saveCreate,
    newProduct
  } from '../../vuex/actions'

  export default {
    components: {
      pagination,
      detailModel,
      createModel,
      alterinfoModel,
      searchModel,
      supplydetailModel

    },
    vuex: {
      getters: {
        initProductlist
      },
      actions: {
        getProductList,
        updateProduct,
        saveCreate,
        newProduct
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
      reset:function(){
        this.loadParam.name = "";
        this.loadParam.type = "";
        this.loadParam.status = "";
        this.loadParam.cName = "";
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
      },
      searchProduct:function(){
          this.getProductList(this.loadParam);
      }
    },
    events: {
      fresh: function(input) {
        this.loadParam.cur = input;
        this.getProductList(this.loadParam);
      }
    },
    created() {
      this.getProductList(this.loadParam);
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
</style>
