<template>
    <drugs-model :param="detailParam" v-if="detailParam.show"></drugs-model>
    <state-model :param="disposeParam" v-if="disposeParam.show"></state-model>
    <div class="service-nav clearfix">
      <div class="my_enterprise col-xs-1">{{$t('static.rollout')}}</div>
    </div>
    <div class="order_table">
      <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
      </div>
      <table class="table table-hover table_color table-striped " v-cloak>
        <thead>
            <tr>
              <th>{{$t('static.client_name')}}</th>
              <th>{{$t('static.account_number')}}</th>
              <th>{{$t('static.normal_amount')}}</th>
              <th>{{$t('static.freezing_amount')}}</th>
              <th>{{$t('static.transfer_amount')}}</th>
              <th>{{$t('static.application_time')}}</th>
              <th>{{$t('static.status')}}</th>
              <th></th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="item in initRolloutlist">
            <td><a @click.stop="clickOn({
                      show:true,
                      id:item.id,
                      moneyId:item.moneyId,
                      userId:item.userId,
                      loading:false,
                      status:item.status,
                      link:'/money/details/'
                })">{{item.name}}</a></td>
            <td>{{item.bank}}</td>
            <td>{{item.normalMoney}}</td>
            <td>{{item.freezeMoney}}</td>
            <td v-if="item.rollOutMoney">{{item.rollOutMoney}}</td>
            <td v-if="!item.rollOutMoney">0</td>
            <td>{{item.ctime}}</td>
            <td>{{item.status | drugsStatus}}</td>
            <td>
                <a class="operate" v-if="item.status==0" @click="drugs(item,$index)"><img src="/static/images/apply.png" height="18" width="47" /></a>
                <a class="operate" v-if="item.status==1" @click="drugs(item,$index)"><img src="/static/images/Financial.png" height="18" width="48" title="转账处理中" alt="转账处理中"></a>
                <a class="operate" v-if="item.status==2" @click="drugs(item,$index)"><img src="/static/images/Financialtransfer.png" height="18" width="48" title="转出成功" alt="转出成功"></a>
                <a class="operate" v-if="item.status==3" @click="drugs(item,$index)"><img src="/static/images/Financialover.png" height="18" width="48" ></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="base_pagination">
      <pagination :combination="loadParam"></pagination>
    </div>

</template>
<script>
  import  drugsModel  from  '../drugs/RolloutDetail' 
  import stateModel  from  '../drugs/drugsStatus'
  import pagination from '../pagination'
  import filter from '../../filters/filters'
  import {
    initRolloutlist
  } from '../../vuex/getters'
  import {
    getRolloutList
  } from '../../vuex/actions'

  export default {
    components: {
      pagination,
      filter,
      drugsModel,
      stateModel
    },
    vuex: {
      getters: {
        initRolloutlist
      },
      actions: {
        getRolloutList
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
          link:'/money/rollOut',
          name:'',
          type:'',
          status:'',
          total:0
        },
        checked:false,
        detailParam:{
          show:false
        },
        disposeParam:{
          show:false,
          title:'',
          link:'/money/rollOutHandle'
        }
      }
    },
    methods: {
        clickOn:function(initRolloutlist){
           console.log(initRolloutlist)
           this.detailParam = initRolloutlist;
        },
        drugs:function(item,sub){
          item.show=!item.show;
          item.sub = sub;
          this.disposeParam = item;
          console.log(this.disposeParam)
          this.disposeParam.show = true;
          this.disposeParam.title = '药款转出操作';
          this.disposeParam.link = '/money/rollOutHandle';
          if(item.status==0){
               this.disposeParam.tips='处理中';
          }else if(item.status==1){
               this.disposeParam.tips='审核通过，转账中';
          }else if(item.status==2){
               this.disposeParam.tips='转账成功';
          }else if(item.status==3){
               this.disposeParam.tips='操作已完成，药款已转出';
          }
          
        }
    },
    filter: (filter,{}),
    events: {
      fresh: function(input) {
        this.loadParam.cur = input;
        this.getRolloutList(this.loadParam);
      }
    },
    created() {
      this.getRolloutList(this.loadParam);
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
