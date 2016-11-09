<template>
    <drugs-model :param="detailParam" v-if="detailParam.show"></drugs-model>
    <div class="service-nav clearfix">
      <div class="my_enterprise col-xs-1">药款转出</div>
    </div>
    <div class="order_table">
      <div class="cover_loading">
        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
      </div>
      <table class="table table-hover table_color table-striped " v-cloak>
        <thead>
            <tr>
              <th>客户姓名</th>
              <th>银行卡号</th>
              <th>正常金额</th>
              <th>冻结金额</th>
              <th>转出金额</th>
              <th>申请时间</th>
              <th>状态</th>
              <!-- <th></th> -->
            </tr>
        </thead>
        <tbody>
          <tr v-for="item in initRolloutlist">
            <td><a @click.stop="clickOn({
                      show:true,
                      id:item.id,
                      loading:false,
                      orderStatus:item.status,
                      contact:'/money/'
                })">{{item.name}}</a></td>
            <td>{{item.bank}}</td>
            <td>{{item.normalMoney}}</td>
            <td>{{item.freezeMoney}}</td>
            <td v-if="item.rollOutMoney">{{item.rollOutMoney}}</td>
            <td v-if="!item.rollOutMoney">0</td>
            <td>{{item.ctime}}</td>
            <td>{{item.status | drugsStatus}}</td>
            <!-- <td>
                <a class="operate" v-if="item.status==0" @click="drugs(item,$index)"><img src="/static/images/application.png" height="18" width="28" title="药款转出处理" alt="药款转出处理"></a>
                <a class="operate" v-if="item.status==1" @click="drugs(item,$index)"><img src="/static/images/Financial.png" height="18" width="48" title="转出审核" alt="转出审核"></a>
                <a class="operate" v-if="item.status==2" @click="drugs(item,$index)"><img src="/static/images/Financialtransfer.png" height="18" width="48" title="转账处理中" alt="转账处理中"></a>
                <a class="operate" v-if="item.status==3" @click="drugs(item,$index)"><img src="/static/images/Financialover.png" height="18" width="48" title="转出成功" alt="转出成功"></a>
            </td> -->
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
      drugsModel
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
        }
      }
    },
    methods: {
        clickOn:function(initRolloutlist){
           console.log(initRolloutlist)
           this.detailParam = initRolloutlist;
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
