<template>
  <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
  <div class="container del_modal_con">
    <!--<div @click="param.show = false" class="top-title">-->
      <!--<span class="glyphicon glyphicon-remove-circle"></span>-->
    <!--</div>-->
    <div class="model-header">

      <treeview
                :model="initOrgList"
                class="form-control"
                labelname="name"
                valuename="id"
                children="lowerList"
      ></treeview>
      <div class="edit_footer">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
        <input type="button" class="btn  btn-confirm"  @click="param.callback(),param.show = false" value="确定" />
      </div>
    </div>
  </div>
</template>
<script>
  import {
    initOrgList
  } from '../../vuex/getters'

  export default {
    props: ['param'],
    vuex:{
      getters:{
        initOrgList
      }
    },
    methods:{

    },
    events: {
      treeview_click:function(param){
        if(param.children.length==0){
          this.param.orgId = param.value;
          this.param.orgName = param.label;
        }
      }
    }
  }
</script>
<style scoped>
  .modal {
    z-index:1088;
  }
  .modal_con {
    width: 500px;
    z-index: 1082;
  }
  .del_modal_con {
    position: fixed;
    width: 500px;
    right: 0;
    left: 0;
    height: 100%;
    margin: 130px auto;
    z-index: 1096;
    padding: 0 5px;
  }
  .top-title{
    width: 500px;
    z-index: 1083
  }
  .edit_footer{
    width:490px;
    position: relative;
    bottom: 0;
  }
  .treeview{
    height:500px;
    border:0px;
  }
</style>

