<template>
    <div  class="modal modal-main fade account-modal" role="dialog"></div>
    <div id="scroll" class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>订单分期申请记录</h3>
        </div>
          <div>
            <div class="cover_loading">
              <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
            </div>
             <section class="editsection" v-cloak>
                 <table class="table table-hover table_color table-striped ">
                     <thead>
                        <tr>
                          <th>分期类型</th> 
                          <th>支付金额</th>
                          <th>业务类型</th>
                          <th>支付名称</th>
                          <th>用户名</th>
                          <th>账号</th>
                          <th>支付分行</th> 
                          <th>审核状态</th> 
                          <th>收付状态</th>
                          <th>创建时间</th>  
                        </tr>
                     </thead>
                     <tbody>
                         <tr v-for="item in initRecordList">
                             <td v-if="item.type==0">付款</td>
                             <td v-if="item.type==1">收款</td>
                             <td>{{item.amount}}</td>
                             <td>{{item.bizType}}</td>
                             <td>{{item.payName}}</td>
                             <td>{{item.payUserName}}</td>
                             <td>{{item.payNumber}}</td>
                             <td>{{item.paySubName}}</td>
                             <td>{{item.validate}}</td>
                             <td>{{item.pr}}</td>
                             <td>{{item.ctime}}</td> 
                         </tr>
                     </tbody>
                 </table>
             </section>
          </div>
          <!-- <div class="edit_footer">
              <button type="button" class="btn  btn-confirm" @click="param.show = false">{{$t('static.confirm')}}</button>
          </div> -->
    </div>
</template>
<script>
import {
    initRecordList
} from '../../../vuex/getters'
import {
    getRequestRecord
} from '../../../vuex/actions'
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {
          imageParam:{
            url:'/crm/api/v1/file/',
            qiniu:false
          },
          type:"image/*"
        }
    },
    vuex: {
       getters: {
          initRecordList
        },
        actions: {
          getRequestRecord
        }
    },
    methods: {
      
  
    },
    events:{
        
    },
    created(){
      console.log(this.param)
      console.log(this.initRecordList)
      this.getRequestRecord(this.param);
      
    }
}
</script>
<style scoped>
.modal{
  z-index: 1083
}
.modal_con{
  z-index: 1084
}

.edit-model {
  padding: 10px 30px 80px 30px;
}

.top-title{
    position: absolute;
    top: 0;
    right:0;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}
.editpage-input {
    margin-top: 15px;
}
table{
  display: table;
}
a{
    cursor:pointer;
}
</style>
