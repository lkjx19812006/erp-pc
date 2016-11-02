<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false,cancel()" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3 v-if="param.bizType==1">选择意向</h3>
            <h3 v-if="param.bizType==2">选择订单</h3>
        </div>



        <div class="trans_service clearfix" v-show="param.bizType==1">
          <div class="cover_loading">
            <pulse-loader :loading="intentionParam.loading" :color="color" :size="size"></pulse-loader>
          </div>
                  <table class="table table-hover table_head table-striped "  v-cloak>
                      <thead>
                          <tr>
                              <th></th>
                              <th>品种名</th>
                              <th>规格</th>
                               <th>数量</th>
                              <th>单位</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="item in initIntentionList">
                             <td  @click.stop="">
                                 <label  class="checkbox_unselect"  @click="selectIntention($index)" ></label>
                              </td>
                              <td>{{item.breedName}}</td>
                              <td>{{item.spec}}</td>
                              <td>{{item.number}}</td>
                              <td>{{item.unit}}</td>
                          </tr>

                      </tbody>
                  </table>
          <div class="order_pagination" style="margin-bottom:60px">
            <pagination :combination="intentionParam"></pagination>
          </div>
            </div>


      <div class="trans_service clearfix" v-show="param.bizType==2">
        <div class="cover_loading">
          <pulse-loader :loading="orderParam.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <table class="table table-hover table_head table-striped "  v-cloak>
          <thead>
          <tr>
            <th></th>
            <th>订单流水号</th>
            <th>订单金额</th>
            <th>商品</th>
            <th>创建时间</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in initOrderlist">
            <td  @click.stop="">
              <label  class="checkbox_unselect"   @click="selectOrder(item)" ></label>
            </td>
            <td>{{item.no}}</td>
            <td>{{item.amount}}</td>
            <td>{{item.goods}}</td>
            <td>{{item.ctime}}</td>
          </tr>

          </tbody>
        </table>
        <div class="order_pagination" style="margin-bottom:60px">
          <pagination :combination="orderParam"></pagination>
        </div>
      </div>




        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false,cancel()">取消</button>
            <!-- <button type="button" class="btn  btn-confirm" @click="">确定</button> -->
        </div>
    </div>
</template>
<script>
import {
  initOrderlist,
  initIntentionList

} from '../../vuex/getters'
import {
      getOrderList,
     getIntentionList
} from '../../vuex/actions'
import pagination from '../pagination'
export default {
  components: {
    pagination
  },
    props: ['param'],
    data() {
        return {
          orderParam:{
                loading: true,
                color: '#5dc596',
                size: '15px',
                customerId: this.param.userId,
                cur: 1,
                all: 7
          },
          intentionParam:{
                loading: true,
                color: '#5dc596',
                size: '15px',
                userId: this.param.userId,
                cur: 1,
                all: 7,
                link:'/intention/'
          }
        }
    },
    vuex: {
       getters: {
          initOrderlist,
          initIntentionList

        },
        actions: {
            getOrderList,
            getIntentionList
        }
    },

    methods: {
      orderSearch:function(){
        this.getOrderList(this.customerParam);
      },
      intentionSearch:function(){
        this.getIntentionList(this.intentionParam);
      },
      selectOrder:function(item){
          this.$dispatch('getBiz',item);
          this.param.show=false;

      },
      selectIntention:function(index){
          this.$store.state.table.basicBaseList.intentionList[index].checked=!this.$store.state.table.basicBaseList.intentionList[index].checked;
          this.$dispatch('getBiz',this.initIntentionList[index]);
          this.param.show=false;
          console.log(this.initIntentionList[index]);
      },
      cancel:function(){
        this.$dispatch('cancel');
      }

    },
    events: {
    fresh: function(input) {
      if(param.bizType==1){
        this.intentionParam.cur = input;
        this.getIntentionList(this.intentionParam);}
      else if(param.bizType==2){
        this.orderParam.cur = input;
        this.getOrderList(this.orderParam);
      }
    }
  },
    created(){
      if(this.param.bizType==2)this.getOrderList(this.orderParam);
      if(this.param.bizType==1){this.getIntentionList(this.intentionParam);}
    }
}
</script>
<style scoped>
.modal{
  z-index: 1085;
}
.modal_con{
  z-index: 1085;
}
.big-font {
    font-size: 36px;
}
.top-title span {
    font-size: 28px;
}

.order_pagination{
  margin: 0 auto;
  text-align: center;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.edit-content h3 {
    font-size: 20px;
    color: #fa6705;
    margin: 0;
}

.edit-model {
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 30px 30px 30px;
}

.editsection {
    width: 100%;
    box-sizing: border-box;
}

.editpage {
    display: -webkit-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -ms-box-orient: horizontal;
    box-orient: horizontal;
}

.editpageleft,
.editpageright {
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    width: 50%;
}

.editpage-input {
    margin-top: 15px;
}

.editlabel {
    color: #333;
    font-size: 14px;
    display: block;
}

.edit-input {
    height: 36px;
    line-height: 36px;
    width: 90%;
    border: 1px solid #ddd;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.edit-input:focus {
    border-color: #fa6705;
}

.addblack span {
    color: #333;
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
}

.edit_footer button {
    margin-left: 15px;
}

.btn-confirm {
    background-color: #fa6705;
    color: #fff;
}

.btn-close {
    color: #fa6705;
}

.editpage_img {
    width: 90%;
}

.editpage_img img {
    display: inline-block;
    background: #ccc;
}

.editpage-image {
    display: inline-block;
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
