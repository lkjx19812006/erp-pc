<template>
  <detail-model :param="changeParam" v-if="changeParam.show"></detail-model>
  <tips-model :param="tipsParam" v-if="tipsParam.show"></tips-model>
  <audit-model :param="financeParam" v-if="financeParam.show"></audit-model>
  <contract-model :param="contractParam" v-if="contractParam.show"></contract-model>
  <language-model v-show="false"></language-model>
  <mglist-model>
      <!-- 头部搜索 -->
      <div slot="top">
          <div class="clearfix">
            <dl class="clear left transfer">
               <dt class="left transfer marg_top">{{$t('static.order_type')}}：</dt>
               <dd class="left">
                  <select class="form-control" v-model="loadParam.orderType" @change="selectSearch()">
                    <option value="">{{$t('static.please_select')}}</option>
                    <option value="0">{{$t('static.purchase')}}</option>
                    <option value="1">{{$t('static.sell')}}</option>
                  </select>
               </dd>
            </dl>
            <dl class="clear left transfer">
               <dt class="left  marg_top">{{$t('static.breed')}}：</dt>
               <dd class="left">
                  <input type="text"  class="form-control" v-model="loadParam.orderDesc"  @keyup.enter="selectSearch()"/>
               </dd>
            </dl>
            <dl class="clear left transfer">
               <dt class="left transfer marg_top">{{$t('static.order_no')}}：</dt>
               <dd class="left">
                  <input type="text"  class="form-control" v-model="loadParam.orderNo"  @keyup.enter="selectSearch()"/>
               </dd>
            </dl>
           <dl class="clear left transfer">
             <dt class="left transfer marg_top">{{$t('static.client_id')}}：</dt>
             <dd class="left">
                <input type="text"  class="form-control" v-model="loadParam.customer"  @keyup.enter="selectSearch()"/>
             </dd>
          </dl> 
            <dl class="clear left transfer">
               <dt class="left transfer marg_top">{{$t('static.client_name')}}：</dt>
               <dd class="left">
                  <input type="text"  class="form-control" v-model="loadParam.customerName"  @keyup.enter="selectSearch()"/>
               </dd>
            </dl>
            <dl class="clear left transfer">
               <dt class="left transfer marg_top">{{$t('static.client_phone')}}：</dt>
               <dd class="left">
                  <input type="text"  class="form-control" v-model="loadParam.customerPhone"  @keyup.enter="selectSearch()"/>
               </dd>
            </dl>
            <button type="button" class="new_btn transfer pull-left"  @click="resetTime()">{{$t('static.clear_all')}}</button>
            <button class="new_btn transfer pull-left" @click="selectSearch()">{{$t('static.search')}}</button>
            <div class="clearfix right" >
              <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
            </div>
          </div>
      </div>
      <!-- 中间列表 -->
      <div slot="form">
          <div class="cover_loading">
              <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
          </div>
          <table class="table table-hover table_color table-striped" v-cloak id="tab">
            <thead>
                <tr>
                  <th>{{$t('static.date')}}</th>
                  <th>{{$t('static.client_id')}}</th>
                  <th>{{$t('static.client_name')}}</th>
                  <th>{{$t('static.client_phone')}}</th>
                  <th>{{$t('static.breed')}}</th>
                  <th>{{$t('static.order_no')}}</th>
                  <th>{{$t('static.order_type')}}</th>
                  <th>{{$t('static.diferencia')}}</th>
                  <th>{{$t('static.contract_note')}}</th>
                  <th>{{$t('static.comment')}}</th>
                  <th>{{$t('static.salesman')}}</th>
                  <th>{{$t('static.approve_comment')}}</th>
                  <th>{{$t('static.review_status')}}</th>
                  <th>{{$t('static.handle')}}</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="item in initOrgContractList">
                <td>{{item.ctime | dateTime}}</td>
                <td>{{item.customer}}</td>
                <td><a @click="details({
                    id:item.id,
                    show:true,
                    loading:false,
                    url:'/order/contract/details/',
                    index:$index
                  })">{{item.customerName}}</a>
                </td>
              <!-- <td><a @click="clickOn({
                    sub:$index,
                    id:item.id,
                    loading:true,
                    show:true,
                    key:'fundRecord'
                  })">{{item.customerName}}</a>
                </td> -->
                <td>{{item.customerPhone}}</td>
                <td>{{item.orderDesc}}</td>
                <td>{{item.orderNo}}</td>
                <td v-if="item.orderType==0">{{$t('static.purchase')}}</td>
                <td v-if="item.orderType==1">{{$t('static.sell')}}</td>
                <td>{{item.adjusted}}</td>
                <td>{{item.contractText}}</td>
                <td>{{item.comment}}</td>
                <td>{{item.handlerName}}</td>
                <td>{{item.description}}</td>
                <td v-if="this.language =='zh_CN'">{{item.validate | Auditing}}</td>
                <td v-if="this.language =='en'">{{item.validate | EnAuditing}}</td>
                <td>
                    <button class="btn btn-primary btn-gray" v-if="item.validate==1&&item.taskKey=='supplementary_contract_governor_validate'" @click="applyInfo({
                          show:true,
                          sub:$index,
                          id:item.id,
                          validate:item.validate,
                          adjusted:item.adjusted,
                          description:'',
                          url:'/order/quality/contract/validate',
                          titles:'审核合同',
                          link:contractCheck
                      })">{{$t('static.review')}}</button>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
       <!-- 底部分页 -->
      <pagination :combination="loadParam"  slot="page"></pagination>
  </mglist-model>

</template>
<script>
  import pagination from '../pagination'
  import detailModel from '../order/second_order/fundDetail'
  import common from '../../common/common'
  import changeMenu from '../../components/tools/tabs/tabs.js'
  import auditModel  from './second_order/financeAudit'
  import tipsModel from '../../components/tips/tipDialog'
  import mglistModel from '../mguan/mgListComponent.vue'
  import languageModel from '../tools/language.vue'
  import contractModel from '../order/second_order/orderReceiveDetail'
  import {
    initOrgContractList
  } from '../../vuex/getters'
  import {
    getMyContractList,
    paymentConfirm,
    contractCheck
  } from '../../vuex/actions'
  export default {
    components: {
      pagination,
      detailModel,
      auditModel,
      tipsModel,
      languageModel,
      mglistModel,
      contractModel
    },
    vuex: {
      getters: {
        initOrgContractList
      },
      actions: {
        getMyContractList,
        paymentConfirm,
        contractCheck
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
          all: 1,
          link:'/order/contract/list/org',
          orderDesc:'',
          customerName:'',
          customerPhone:'',
          orderNo:'',
          orderType:'',
          validate:'',
          total:0
        },
        language:'',
        changeParam: {
          show: false
        },
        contractParam:{
          show:false
        },
        tipsParam:{
          show:false,
          alert:true,
          name:''
        },
        financeParam:{
          show:false
        },
        checked:false
      }
    },
    methods: {
      clickOn: function(initOrgContractList) {
        this.changeParam = initOrgContractList;
        this.changeParam.show = true;
      },
      selectSearch:function(){
           this.getMyContractList(this.loadParam);
      },
      clickday:function(validate){
         this.loadParam.validate = validate;
         this.getMyContractList(this.loadParam);
      },
      resetTime:function(){
        this.loadParam.orderDesc='';
        this.loadParam.customer='';
        this.loadParam.customerName='';
        this.loadParam.customerPhone='';
        this.loadParam.orderNo='';
        this.loadParam.orderType='';
        this.getMyContractList(this.loadParam);
      },
      applyInfo:function(item){
        this.financeParam.show = true;
        this.financeParam = item;
        this.financeParam.callback = this.callback;
      },
      details:function(item){
         this.contractParam = item;
      },
      callback:function(title){
          this.tipsParam.show= true;
          this.tipsParam.alert= true;
          this.tipsParam.name= title;
      }
    },
    events: {
      fresh: function(input) {
        this.loadParam.cur = input;
        this.getMyContractList(this.loadParam);
      }
    },
    ready(){
        common('tab','table_box',1);
      },
    created() {
        changeMenu(this.$store.state.count.isTop,this.getMyContractList,this.loadParam,localStorage.myFundParam);
        this.language = localStorage.lang;
    }
  }
</script>
<style scoped>
  .transfer{
    margin-right: 10px;
  }
  .service-nav{
    padding-bottom:0px;
    padding-left:10px;
    padding-right:10px;
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
    width:131px;
    min-width: 131px;
  }
</style>
