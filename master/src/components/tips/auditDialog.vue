<template>
  <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
  <div class="container del_modal_con" v-show="param.show">
    <div class="model-header">
      <h4>{{param.title}}</h4>
      <div class="model-tips clearfix" v-if="param.key!=='mySampleList'">
        <!-- <label class="left" style="font-size: 14px;font-weight: 100">{{param.title}}</label> -->
        <textarea v-model='param.auditComment' class="form-control" style="width:100%;overflow:auto;word-break:break-all" rows="5" value="{{param.auditComment}}"></textarea>
      </div>
      <div class="model-tips clearfix" v-if="param.key=='mySampleList'">
        <img src="/static/images/bee.png" height="158" width="131" />
      </div>
      <div class="model-footer" v-if="param.confirm">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
        <input type="button" class="btn  btn-confirm"  @click="confirm()" value="{{$t('static.confirm')}}" />
      </div>
      <div class="model-footer" v-if="param.supplier">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
        <input type="button" class="btn  btn-confirm"  @click="param.callback(),param.show = false" value="{{$t('static.confirm')}}" />
      </div>
      
      <div class="model-footer" v-if="param.audit===true">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
        <input type="button" class="btn  btn-confirm"  @click="param.reject(),param.show = false" value="{{$t('static.reject')}}" />
        <input type="button" class="btn  btn-confirm"  @click="param.pass(),param.show = false" value="{{$t('static.pass')}}" />
      </div>

      <div class="model-footer" v-if="param.tracking">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
        <input type="button" class="btn  btn-confirm"  @click="param.wait(),param.show = false" value="跟进中" />
        <input type="button" class="btn  btn-confirm"  @click="param.pass(),param.show = false" value="有效" />
        <input type="button" class="btn  btn-confirm"  @click="param.reject(),param.show = false" value="无效" />
      </div>

      <div class="model-footer" v-if="param.taskKey=='employee_handle'">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
        <input type="button" class="btn  btn-confirm"  @click="param.reject(),param.show = false" value="{{$t('static.reapply')}}" />
        <input type="button" class="btn  btn-confirm"  @click="param.pass(),param.show = false" value="取消订单" />
      </div>
    <!-- 审核发货申请 -->
      <div class="model-footer" v-if="param.titles=='审核发货申请'">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
        <input type="button" class="btn  btn-confirm"  @click="param.sendRefuse(),param.show = false" value="{{$t('static.reject')}}" />
        <input type="button" class="btn  btn-confirm"  @click="param.sendPass(),param.show = false" value="{{$t('static.pass')}}" />
      </div>
     <!-- 审核补充合同 -->
      <div class="model-footer" v-if="param.taskKey=='supplementary_contract_employee_handle'">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
        <input type="button" class="btn  btn-confirm"  @click="param.sendRefuse(),param.show = false" value="取消补充合同" />
        <input type="button" class="btn  btn-confirm"  @click="param.sendPass(),param.show = false" value="{{$t('static.reapply')}}" />
      </div>
    <!-- 重新或取消发货申请 -->
      <div class="model-footer" v-if="param.title=='重新申请发货'||param.taskKey=='order_send_employee_handle'">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
        <!-- <input type="button" class="btn  btn-confirm"  @click="cancelApply(param)" value="取消发货" /> -->
        <input type="button" class="btn  btn-confirm"  @click="confirmApply(param)" value="{{$t('static.confirm')}}" />
      </div>
      <div class="model-footer" v-if="param.key=='mySampleList'&&param.url!='/sample/validate/cancel/'">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
        <input type="button" class="btn  btn-confirm"  @click="param.link(param),param.show = false" value="{{$t('static.review_application')}}" />
      </div>
      <div class="model-footer" v-if="param.key=='mySampleList'&&param.url=='/sample/validate/cancel/'">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
        <input type="button" class="btn  btn-confirm"  @click="param.link(param),param.show = false" value="取消申请" />
      </div>
      <div class="model-footer" v-if="param.key=='orgSampleList'">
        <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
        <input type="button" class="btn  btn-confirm"  @click="refuse(param)" value="{{$t('static.reject')}}" />
        <input type="button" class="btn  btn-confirm"  @click="param.link(param),param.show = false" value="{{$t('static.pass')}}" />
      </div>
    </div>
  </div>
</template>
<script>
  import {
    sampleApply,
    sendRestart,
    sendCancel
  } from '../../vuex/actions'
  export default {
    props: ['param'],
    vuex:{
      actions:{
        sampleApply,
        sendRestart,
        sendCancel
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
          this.param.callback(this.param);
          this.param.show = false;
       },
       confirmApply:function(item){
          this.param.show = false;
          this.sendRestart(item);
       },
       cancelApply:function(item){
          this.param.show = false;
          this.sendCancel(item);
       }
    },
    created(){
         
    }

  }
</script>
<style scoped>

  .del_modal_con{
    z-index:1083;
  }
  .modal {
    z-index:1083;
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
