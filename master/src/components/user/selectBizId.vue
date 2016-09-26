<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3 v-if="param.bizType==0">选择客户</h3>
            <h3 v-if="param.bizType==1">选择意向</h3>
            <h3 v-if="param.bizType==2">选择订单</h3>
        </div>

        <div class="trans_service clearfix" v-show="param.bizType==0">
                               

              <div class="col-xs-8">
                      <div class="name_search clearfix">
                          <img src="/static/images/search.png" height="24" width="24">
                          <input type="text" class="search_input" v-model="customerParam.name" placeholder="请输入客户名字" @keyup.enter="customerSearch()">
                      </div>
                      <div class="name_search clearfix">
                          <img src="/static/images/search.png" height="24" width="24">
                          <input type="text" class="search_input" v-model="customerParam.tel" placeholder="请输入客户手机号"  @keyup.enter="customerSearch()">
                      </div>

                      
                  </div>
                  <table class="table table-hover table_head table-striped " v-cloak>
                      <thead>
                          <tr>
                              <th></th>
                              <th>姓名</th>
                              <th>客户ID</th>
                              <th>手机<th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="item in initCustomerlist">
                             <td  @click.stop="">
                                 <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="selectCustomer($index)" ></label>
                              </td>
                              <td>{{item.name}}</td>
                              <td>{{item.id}}</td>
                              <td>{{item.tel}}</td>
                          </tr>

                      </tbody>
                  </table>
                  
            </div>

        <div class="trans_service clearfix" v-show="param.bizType==1">
            <div class="col-xs-4">
              
            </div>                     

              <div class="col-xs-8">
                      

                      
                  </div>
                  <table class="table table-hover table_head table-striped " v-cloak>
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
                                 <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="selectIntention($index)" ></label>
                              </td>
                              <td>{{item.breedName}}</td>
                              <td>{{item.spec}}</td>
                              <td>{{item.number}}</td>
                              <td>{{item.unit}}</td>
                          </tr>

                      </tbody>
                  </table>
                  
            </div>

<!--         <div class="trans_service clearfix" v-show="param.bizType==2">
    <div class="col-xs-4">
      <select  class="form-control" v-model="" @change="employSearch()">
                    <option selected value="">请选择业务员部门</option>
                    <option v-for="item in initOrgList" value=""></option>
                </select>
    </div>                     

      <div class="col-xs-8">
              <div class="name_search clearfix">
                  <img src="/static/images/search.png" height="24" width="24">
                  <input type="text" class="search_input" v-model="customerParam.name" placeholder="请输入客户名字" @keyup.enter="customerSearch()">
              </div>
              <div class="name_search clearfix">
                  <img src="/static/images/search.png" height="24" width="24">
                  <input type="text" class="search_input" v-model="customerParam.tel" placeholder="请输入客户手机号"  @keyup.enter="customerSearch()">
              </div>

              
          </div>
          <table class="table table-hover table_head table-striped " v-cloak>
              <thead>
                  <tr>
                      <th></th>
                      <th>姓名</th>
                      <th>部门</th>
                      <th>手机<th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="item in initCustomerlist">
                     <td  @click.stop="">
                         <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="selectOrder($index)" ></label>
                      </td>
                      <td>{{item.name}}</td>
                      <td>{{item.id}}</td>
                      <td>{{item.tel}}</td>
                  </tr>

              </tbody>
          </table>
          
    </div>

 -->

        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <!-- <button type="button" class="btn  btn-confirm" @click="">确定</button> -->
        </div>
    </div>
</template>
<script>
import {
  initCustomerlist,
  initIntentionList  
    
} from '../../vuex/getters'
import {   
     getClientList,
     getIntentionList
} from '../../vuex/actions'
export default {
    props: ['param'],
    data() {
        return {
          customerParam:{
                loading: true,
                color: '#5dc596',
                size: '15px',
                name: '',
                tel: '',
                cur: 1,
                all: 7
          },
          intentionParam:{
                loading: true,
                color: '#5dc596',
                size: '15px',
                //userId: this.param.userId,
                cur: 1,
                all: 7
          }
        }
    },
    vuex: {
       getters: {
          initCustomerlist,
          initIntentionList  
            
        },
        actions: {
            getClientList,
            getIntentionList
        } 
    },
    route: {
        activate: function(transition) {
            console.log('hook-example activated!')
            transition.next()
        },
        deactivate: function(transition) {
            console.log('hook-example deactivated!')
            transition.next()
        }
    },

    methods: {
      customerSearch:function(){
        this.getClientList(this.customerParam);
      },
      intentionSearch:function(){
        this.getIntentionList(this.intentionParam);
      },
      selectCustomer:function(index){
        console.log(index);
          this.$store.state.table.basicBaseList.customerList[index].checked=!this.$store.state.table.basicBaseList.customerList[index].checked;
          this.$dispatch('getBizId',this.initCustomerlist[index].id);
          this.param.show=false;
          console.log(this.initCustomerlist[index].id);
      },
      selectIntention:function(index){
          
          this.$store.state.table.basicBaseList.intentionList[index].checked=!this.$store.state.table.basicBaseList.intentionList[index].checked;
          this.$dispatch('getBizId',this.initIntentionList[index].id);
          this.param.show=false;
          console.log(this.initIntentionList[index].id);
      },
      selectOrder:function(){

      }
      
    },
    created(){
      this.getClientList(this.customerParam);
      this.getIntentionList(this.intentionParam);
    }
}
</script>
<style scoped>
.modal{
  z-index: 1081;
}
.modal_con{
  z-index: 1082;
}
.big-font {
    font-size: 36px;
}
.top-title span {
    font-size: 28px;
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