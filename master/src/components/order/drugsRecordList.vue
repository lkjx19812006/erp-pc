<template>

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
              <th></th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="item in initRolloutlist">
            <td>{{item.name}}</td>
            <td>{{item.bank}}</td>
            <td>{{item.normalMoney}}</td>
            <td>{{item.freezeMoney}}</td>
            <td v-if="item.rollOutMoney">{{item.rollOutMoney}}</td>
            <td v-if="!item.rollOutMoney">0</td>
            <td>{{item.ctime}}</td>
            <td>{{item.status | drugsStatus}}</td>
            <td><a class="operate"><img src="/static/images/unsure.png" height="18" width="38" title="药款转出处理" alt="药款转出处理"></a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="base_pagination">
      <pagination :combination="loadParam"></pagination>
    </div>

</template>
<script>
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
      filter
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
        checked:false
      }
    },
    methods: {

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
