<template>
  <detail-model :param.sync="changeParam" v-if="changeParam.show"></detail-model>
  <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
  <div v-show="!changeParam.show">
    <div class="service-nav clearfix">
      <!-- <div class="my_enterprise col-xs-1">产品文件列表</div> -->
      <div class="my_order_search  col-xs-8">
        <div class="filter_search clearfix">
          <dl class="clearfix">
            <dt>产品名称：</dt>
            <dd>
              <input type="text"  class="form-control" placeholder="按回车键搜索" class="search_input"  v-model="loadParam.name" @keyup.enter="searchProduct()"/>
            </dd>
          </dl>
          <dl class="clearfix">
            <dt>描述：</dt>
            <dd>
              <input type="text"  class="form-control" placeholder="按回车键搜索" class="search_input"  v-model="loadParam.description" @keyup.enter="searchProduct()"/>
            </dd>
          </dl>
          <dl class="clearfix">
            <dd>
              <button class="btn btn-default transfer"  @click="searchProduct()">搜索</button>
              <button class="btn btn-default"  @click="reset()">清空条件</button>
            </dd>
          </dl>
          
        </div>
      </div>
      <div class="right col-xs-3">
        <button class="btn btn-primary pull-right"  @click="searchProduct()">刷新</button>
      </div>
    </div>
    </div>
    <div class="order_table" id="table_box">
      <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
      </div>
      <table class="table table-hover table_color table-striped " v-cloak  id="tab">
        <thead>
            <tr>
              <th>产品名称</th>
              <th>文件类型</th>
              <th>所属文件</th>
              <th>文件图片</th>
              <th>描述</th>
              <!--<th>状态</th>-->
               <th>操作</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="item in initProductlist">
            <td >{{item.name}}</td>
            <td>{{item.fileType}}</td>
            <td>{{item.bizType}}</td>
            <!--<td v-if="item.bizType!='product_license'">客户文件</td>-->
             <td>
                    <img v-bind:src="item.url" v-if="item.fileType=='image'"  style="max-width: 150px" @click="clickBig(item.url)"/>
                    <img  src="/static/images/pdf.png" v-if="item.fileType=='pdf文件'">
                    <img  src="/static/images/word.png" v-if="item.fileType=='word'">
                    <img  src="/static/images/excel.png" v-if="item.fileType=='excel'">
            </td>
            <td>{{item.description}}</td>
            <td ><a href="/crm/api/v1/file/dowanloadFile?path={{item.path}}"><img src="/static/images/upload.png" height="18" width="28"  /></a>
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
  import detailModel from '../supply/productDetail'
  import pictureModel from '../tips/pictureDialog'
  import common from '../../common/common'
  import changeMenu from '../../components/tools/tabs/tabs.js'
  import {
    initProductlist
  } from '../../vuex/getters'
  import {
    getProductList,
    loadFile
  } from '../../vuex/actions'

  export default {
    components: {
      pagination,
      detailModel,
      pictureModel
    },
    vuex: {
      getters: {
        initProductlist
      },
      actions: {
        getProductList,
        loadFile
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
          link:'/customer/product/file',
          name:'',
          type:'',
          status:'',
          total:0,
          name:'',
          description:''
        },
        changeParam: {
          show: false
        },
        pictureParam:{
            show:false,
            img:''
        },
        checked:false
      }
    },
    methods: {
      clickOn: function(initProductlist) {
        this.changeParam = initProductlist;
       /* this.getProductDetail(this.changeParam);*/
      },
      searchProduct:function(){
        this.loadParam.cur=1;
        this.getProductList(this.loadParam);
      },
      reset:function(){
        this.loadParam.name='';
        this.loadParam.description='';
        this.getProductList(this.loadParam);
      },
      load:function(item){
        console.log(item);
        this.loadFile(item);
      },
      clickBig:function(img){
          this.pictureParam.show=true;
          this.pictureParam.img = img;
      }
    },
    events: {
      fresh: function(input) {
        this.loadParam.cur = input;
        this.getProductList(this.loadParam);
      }
    },
    ready(){
      common('tab','table_box',1);
    },
    created() {
      this.getProductList(this.loadParam);
      //changeMenu(this.$store.state.table.isTop,this.getProductList,this.loadParam,localStorage.productFileParam);
      /*if(!this.$store.state.table.isTop){
            console.log("刷新数据");
            this.getProductList(this.loadParam);
        }else{
            console.log("不刷新数据");
            this.loadParam = JSON.parse(localStorage.productFileParam);
            this.$store.state.table.basicBaseList.productList = JSON.parse(localStorage.productFileList);
            //this.loadParam.loading = false;
        }*/
      
    }
  }
</script>
<style scoped>
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
   #table_box  table th,#table_box  table td{
    width: 282px;
    min-width: 282px;
  }
  .service-nav {
    padding: 23px 30px 0px 4px;
  }
  dl{
      margin-bottom: 5px;
  }
</style>
