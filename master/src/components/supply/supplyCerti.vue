<template>
  <deletebreed-model :param="deleteParam" v-if="deleteParam.show"></deletebreed-model>
  <div>
    <div class="service-nav clearfix">
      <div class="my_enterprise col-xs-1">资质证书</div>
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
              <th>路径</th>
              <th>描述</th>
              <th>状态</th>
              <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in initFileslist">
              <td>{{item.fileType}}</td>
              <td>{{item.bizType}}</td>
              <td>
                    <img v-bind:src="item.path" v-if="item.fileType=='image'" />
                    <img  src="/static/images/pdf.png" v-else>
              </td>
              <td>{{item.description}}</td>
              <td>{{item.status}}</td>
              <td @click.stop="eventClick($index)">
                <img height="24" width="24" src="/static/images/default_arrow.png" />
                <div class="component_action" v-show="item.show">
                  <ul>
                    <li @click="specDelete({
                                id:item.id,
                                sub:item.sub,
                                show:true,
                                name:'资质证书',
                                title:'资质证书',
                                link:deleteInfo,
                                url:'/customer/file/',
                                key:'filesList'
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
  import deletebreedModel from  '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
  import {
    initFileslist
  } from '../../vuex/getters'
  import {
    getFilesList,
    deleteInfo,
    uploadFiles
  } from '../../vuex/actions'

  export default {
    components: {
      pagination,
      deletebreedModel
    },
    vuex: {
      getters: {
        initFileslist
      },
      actions: {
        getFilesList,
        deleteInfo,
        uploadFiles
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
          status:''/*,
          bizScope:'',
          provinceName:'',
          province:'',
          city:'',
          cityName:''*/
        },
        createParam:{
          show: false
        },
        deleteParam:{
          show:false
        }
      }
    },
    methods: {
      createCustomer:function(initFileslist){
        this.createParam = initFileslist;
      },
      eventClick:function(id){
        if(this.$store.state.table.basicBaseList.filesList[id].show){
          this.$store.state.table.basicBaseList.filesList[id].show = !this.$store.state.table.basicBaseList.filesList[id].show;
        }else{
          this.$store.state.table.basicBaseList.filesList[id].show=true;
        }
      },
     specDelete:function(initFileslist){
          this.deleteParam = initFileslist;
      },
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
