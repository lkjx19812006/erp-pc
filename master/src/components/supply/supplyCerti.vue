<template>
  <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
  <createfiles-model :param="cfilesParam" v-if="cfilesParam.show"></createfiles-model>
  <updatelabel-model :param="updlabelParam" v-if="updlabelParam.show"></updatelabel-model>
  <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
  <div>
    <div class="service-nav clearfix">
      <div class="my_enterprise col-xs-1">客户文件列表</div>
      <div class="my_order_search  col-xs-8">
        <div class="filter_search clearfix">
          <dl class="clearfix">
            <dt>客户名称：</dt>
            <dd>
              <input type="text"  class="form-control" placeholder="按客户名称搜索" class="search_input"  v-model="loadParam.name" @keyup.enter="searchProduct()"/>
            </dd>
          </dl>
          <!-- <dl class="clearfix">
            <dt>客户名称：</dt>
            <dd>
              <input type="text"  class="form-control" placeholder="按客户名称搜索" class="search_input"  v-model="loadParam.cname" @keyup.enter="searchProduct()"/>
            </dd>
          </dl> -->
          <dl class="clearfix">
            <dt>描述：</dt>
            <dd>
              <input type="text"  class="form-control" placeholder="按描述搜索" class="search_input"  v-model="loadParam.description"  @keyup.enter="searchProduct()"/>
            </dd>
          </dl>
        </div>
      </div>
      <div class="right col-xs-3">
        <button class="new_btn transfer"  @click="searchProduct()">搜索</button>
        <button class="new_btn"  @click="reset()">清空条件</button>
      </div>
    </div>
    </div>
    <div class="order_table" id="table_box">
      <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
      </div>
      <table class="table table-hover table_color table-striped " v-cloak id="tab">
        <thead>
            <tr>
              <th>文件名称</th>
              <th>客户名称</th>
              <th>文件类型</th>
              <th>所属文件</th>
              <th>文件图片</th>
              <th>描述</th>
              <th colspan="3">操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in initFileslist">
              <td>{{item.name}}</td>
              <td>{{item.cname}}</td>
              <td>{{item.fileType}}</td>
              <td>{{item.bizType}}</td>
              <td>
                    <img  :src="item.url" v-if="item.fileType=='image'" style="max-width: 150px" @click="clickBig(item.url)"/>
                    <img  src="/static/images/pdf.png" v-if="item.fileType=='pdf'">
                    <img  src="/static/images/word.png" v-if="item.fileType=='word'">
                    <img  src="/static/images/excel.png" v-if="item.fileType=='excel'">
              </td>
              <td>{{item.description}}</td>
              <td  >
                 <a class="operate" @click="updatelabel({
                         sub:$index,
                         id:item.id,
                         show:true,
                         title:'备注',
                         labelist:'备注',
                         statuslist:'状态',
                         description:item.description,
                         link:alterRemark,
                         url:'/customer/updateFile',
                         key:'filesList'
                         })"><img src="/static/images/edit.png" height="18" width="30"  />
                 </a>
                <a  class="operate" href="/crm/api/v1/file/dowanloadFile?path={{item.path}}"><img src="/static/images/upload.png" height="18" width="28"  /></a>
                <a class="operate"  @click="specDelete({
                      id:item.id,
                      sub:$index,
                      show:true,
                      name:'资质证书',
                      title:'资质证书',
                      link:deleteInfo,
                      url:'/customer/file/',
                      key:'filesList'
                    })">
                 <img src="/static/images/del.png" height="18" width="30"  alt="删除" title="删除"/>
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
  import deletebreedModel from  '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
  import createfilesModel from  '../supply/createFiles'
  import updatelabelModel from  '../clientRelate/label/updatelebel'
  import pictureModel  from '../tips/pictureDialog'
  import common from '../../common/common'
  import {
    initFileslist
  } from '../../vuex/getters'
  import {
    getFilesList,
    deleteInfo,
    uploadCertificate,
    alterRemark
  } from '../../vuex/actions'

  export default {
    components: {
      pagination,
      deletebreedModel,
      createfilesModel,
      updatelabelModel,
      pictureModel
    },
    vuex: {
      getters: {
        initFileslist
      },
      actions: {
        getFilesList,
        deleteInfo,
        uploadCertificate,
        alterRemark
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
          name:'',
          type:'',
          total:0,
          name:'',
          cname:'',
          description:''/*,
          bizScope:'',
          provinceName:'',
          province:'',
          city:'',
          cityName:''*/
        },
        cfilesParam:{
          show: false
        },
        deleteParam:{
          show:false
        },
        updlabelParam:{
          show:false
        },
        pictureParam:{
          show:false
        }
      }
    },
    methods: {
      showClick:function(id){
        if(this.$store.state.table.basicBaseList.filesList[id].show){
          this.$store.state.table.basicBaseList.filesList[id].show = !this.$store.state.table.basicBaseList.filesList[id].show;
        }else{
          this.$store.state.table.basicBaseList.filesList[id].show=true;
        }
      },
     specDelete:function(initFileslist){
          this.deleteParam = initFileslist;
      },
      createfiles:function(initFileslist){
        console.log(";;;")
         this.cfilesParam = initFileslist;
         this.$broadcast('getImageData');
      },
      updatelabel:function(initFileslist){
         this.updlabelParam = initFileslist;
      },
      searchProduct:function(){
        this.loadParam.cur=1;
        this.getFilesList(this.loadParam);
      },
      reset:function(){
        this.loadParam.name='';
        this.loadParam.description='';
        this.getFilesList(this.loadParam);
      },
      clickBig:function(img){
          this.pictureParam.show=true;
          this.pictureParam.img = img;
      }
    },
    events: {
      fresh: function(input) {
        this.loadParam.cur = input;
        this.getFilesList(this.loadParam);
      }
    },
    ready(){
      common('tab','table_box',1);
    },
    created() {
      
      if(!this.$store.state.table.isTop){
          console.log("刷新数据");
          this.getFilesList(this.loadParam);
      }else{
          console.log("不刷新数据");
          this.loadParam = JSON.parse(localStorage.fileParam);
          this.$store.state.table.basicBaseList.filesList = JSON.parse(localStorage.fileList);
          
      }
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
     width: 245px;
     min-width: 245px;
  }
</style>
