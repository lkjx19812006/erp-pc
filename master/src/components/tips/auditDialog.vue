
<template>
  <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
  <div class="container del_modal_con" v-show="param.show">
    <div class="model-header">
      <h4>{{param.title}}</h4>
      <div class="model-tips clearfix">
       <textarea v-model='param.auditComment' class="form-control" style="width:100%;overflow:auto;word-break:break-all" rows="5" value="{{param.auditComment}}"></textarea>
      </div>
      <div class="model-footer" v-if="param.confirm">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
        <input type="button" class="btn  btn-confirm"  @click="confirm()" value="确定" />
      </div>
      <div class="model-footer" v-if="param.supplier">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
        <input type="button" class="btn  btn-confirm"  @click="param.callback(),param.show = false" value="确定" />
      </div>
      
      <div class="model-footer" v-if="param.audit">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
        <input type="button" class="btn  btn-confirm"  @click="param.reject(),param.show = false" value="不通过" />
        <input type="button" class="btn  btn-confirm"  @click="param.pass(),param.show = false" value="通过" />
      </div>
      <div class="model-footer" v-if="param.key=='mySampleList'">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
        <input type="button" class="btn  btn-confirm"  @click="param.link(param),param.callback = param.callback,param.show = false" value="申请" />
      </div>
      <div class="model-footer" v-if="param.key=='orgSampleList'">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
        <input type="button" class="btn  btn-confirm"  @click="refuse(param)" value="不通过" />
        <input type="button" class="btn  btn-confirm"  @click="param.link(param),param.callback =param. callback,param.show = false" value="通过" />
      </div>
    </div>
  </div>
</template>
<script>
  import {
    sampleApply
  } from '../../vuex/actions'
  export default {
    props: ['param'],
    vuex:{
      actions:{
        sampleApply
      }
    },
    methods:{
       refuse:function(item){
          console.log(item);
          item.validate = 3;
          item.show=false;
          this.sampleApply(item);
       },
       confirm:function(){
        this.param.callback=this.param.callback;
        this.param.callback(this.param);
        this.param.show = false;
       }
    }
  }
</script>
<style scoped>

  .del_modal_con{
    z-index:1082;
  }
  .modal {
    z-index:1081;
    opacity: 0.5;
    background-color: #000;
    display: block;
  }
  .big-font {
    font-size: 36px;
  }
  .top-title {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: -28px;
    margin-right: -22px;
  }

  .top-title span {
    font-size: 30px;
    color: #fff;
  }
</style>
