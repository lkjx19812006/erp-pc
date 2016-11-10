<template>
  <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
  <createfiles-model :param="cfilesParam" v-if="cfilesParam.show"></createfiles-model>
  <div>
    <div class="service-nav clearfix">
      <div class="my_enterprise col-xs-1">资质证书</div>
      <div class="right col-xs-2">
        <button class="new_btn transfer" @click="createfiles({
                                   bizId:'',
                                   show:true,
                                   title:'新建资质证书',
                                   fileType:'',
                                   bizType:'',
                                   description:'',
                                   path:'',
                                   name:'',
                                   link:uploadCertificate,
                                   url:'/customer/file/'
                                  })">新建</button>
      </div>
    </div>
    <div class="order_table">
      <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
      </div>
      <table class="table table-hover table_color table-striped " v-cloak>
        <thead>
            <tr>
              <th>文件类型</th>
              <th>所属文件</th>
              <!--<th>路径</th>-->
              <th>描述</th>
              <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in initFileslist">
              <td>{{item.fileType}}</td>
              <td>{{item.bizType}}</td>
              <!--<td>-->
                    <!--&lt;!&ndash;<img v-bind:src="item.path" v-if="item.fileType=='image'" />&ndash;&gt;-->
                    <!--<img  src="/static/images/pdf.png" v-if="item.fileType=='pdf文件'">-->
                    <!--<img  src="/static/images/word.png" v-if="item.fileType=='word'">-->
                    <!--<img  src="/static/images/excel.png" v-if="item.fileType=='excel'">-->
              <!--</td>-->
              <td>{{item.description}}</td>
              <td @click="specDelete({
                      id:item.id,
                      sub:$index,
                      show:true,
                      name:'资质证书',
                      title:'资质证书',
                      link:deleteInfo,
                      url:'/customer/file/',
                      key:'filesList'
                    })">
               <a class="operate"><img src="/static/images/del.png" height="18" width="30"  alt="删除" title="删除"/>
               </a>
              </td>
              <!-- <td @click="showClick($index)">
                <img height="24" width="24" src="/static/images/default_arrow.png" />
                <div class="component_action" v-show="item.show">
                  <ul>
                    <li @click="specDelete({
                                id:item.id,
                                sub:$index,
                                show:true,
                                name:'资质证书',
                                title:'资质证书',
                                link:deleteInfo,
                                url:'/customer/file/',
                                key:'filesList'
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
  import pagination from '../pagination'
  import deletebreedModel from  '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
  import createfilesModel from  '../supply/createFiles'
  import {
    initFileslist
  } from '../../vuex/getters'
  import {
    getFilesList,
    deleteInfo,
    uploadCertificate
  } from '../../vuex/actions'

  export default {
    components: {
      pagination,
      deletebreedModel,
      createfilesModel
    },
    vuex: {
      getters: {
        initFileslist
      },
      actions: {
        getFilesList,
        deleteInfo,
        uploadCertificate
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
          status:''/*,
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
      }
    },
    events: {
      fresh: function(input) {
        this.loadParam.cur = input;
        this.getFilesList(this.loadParam);
      }
    },
    created() {
      this.getFilesList(this.loadParam);
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
