<template>
    <editorder-model :param="dialogParam" v-if="dialogParam.show"></editorder-model>
    <update-model :param="updateParam" v-if="updateParam.show"></update-model>
    <detail-model :param.sync="detailParam" v-if="detailParam.show"></detail-model>

    <div v-show="!detailParam.show">
        <div class="myOrder">
            <div class="order_search">
                <div class="clear">
                    <div class="my_order col-xs-2">我的订单</div>
                    <div class="col-xs-8 my_order_search">
                        <div class="name_search clearfix">
                            <img src="/static/images/search.png" height="24" width="24">
                            <input type="text" class="search_input" v-model="loadParam.orderName" placeholder="按名字搜索"  @keyup.enter="orderSearch()">
                        </div>
                        <div class="ordertel_search clearfix">
                            <img src="/static/images/search.png" height="24" width="24">
                            <input type="text" class="search_input" v-model="loadParam.orderNum" placeholder="按订单号搜索"  @keyup.enter="orderSearch()">
                        </div>
                        <div class="tel_search clearfix">
                            <img src="/static/images/search.png" height="24" width="24">
                            <input type="text" maxlength="11" class="search_input" v-model="loadParam.orderTel" placeholder="按电话搜索" @keyup.enter="orderSearch()">
                        </div>
                    </div>
                    <div class="right col-xs-2">
                        <button class="new_btn" @click="newOrder('new')" data-toggle="modal" data-target="#myModal">新建</button>
                    </div>
                </div>
            </div>

            <div class="order_table">
                <table class="table table-hover table_color table-striped " v-cloak>
                    <thead>
                        <tr>  
                            <th></th>
                            <th>订单号</th>
                            <th>收货人</th>
                            <th>收货人电话</th>
                            <th>收货人地址</th>
                            <th>备注</th>
                            
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initOrderlist"  v-cloak >
                          <td></td>
                          <!--  <td  @click.stop="">
                             <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"   @click="onlyselected($index,item.id)" ></label>
                           </td> -->
                          <td><a @click="clickOn({
                                                    show:true,
                                                    id:item.id
                                                })">{{item.no }}</a></td>
                          <td>{{item.consignee}}</td>
                          <td>{{item.consigneePhone}}</td>
                          <td>{{item.consigneeAddr}}</td>
                          <td>{{item.comments}}</td>
                         
                          <td @click="editClick($index)">
                              <img height="24" width="24" src="/static/images/default_arrow.png" />
                              <div class="component_action" v-show="item.show">
                                   <ul>
                                       <li @click="editor()">编辑</li>
                                       <li>删除</li>
                                   </ul>
                               </div>
                          </td>
                        </tr>
                    </tbody>
                  </table>
               
            </div>
        </div>
        <div class="order_pagination">
            <pagination :combination="loadParam"></pagination>
        </div>
    </div>   
</template>
<script>
import pagination from '../components/pagination'
import editorderModel from '../components/order/orderInformationDialog'
import updateModel from '../components/order/orderUpdate'
import detailModel from '../components/order/orderDetail'

import {
    getList,
    initOrderlist
} from '../vuex/getters'
import {
    getOrderList,
    //changeShowStatue
} from '../vuex/actions'

export default {
    components: {
        editorderModel,
        pagination,
        updateModel,
        detailModel
    },
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                orderName:'',
                orderNum:'',
                orderTel:''
            },
            dialogParam:{
                 show: false,
                 name: 'new'
            },
            updateParam: {
                 show:false,   
            },
            detailParam: {
                 show:false, 

            },
            show:true
        }
    },
    vuex: {
        getters: {
            getList,
            initOrderlist
        },
        actions: {
            getOrderList,
            //changeShowStatue
        }
    },
    created() {
        this.getOrderList(this.loadParam);
       /* this.changeShowStatue();*/
        if (this.$route.query.id > this.getList[6].subcategory.length || isNaN(this.$route.query.id)) {
            this.$route.query.id = 0;
        }
    },
    methods: {
        editClick: function(sub) {
            if(this.$store.state.table.orderList[sub].show){
                this.$store.state.table.orderList[sub].show=!this.$store.state.table.orderList[sub].show;
            }else{
                 this.$store.state.table.orderList[sub].show=true;
            }
            //console.log(this.$store.state.table.orderList[sub].show)       
        },
        newOrder:function(value){
             this.dialogParam.name=value;
             this.dialogParam.show=true;
        },
        orderSearch:function(){
          this.getOrderList(this.loadParam);
        },
        clickOn:function(item){
            console.log(item);
            this.detailParam=item;
        },
        editor:function(){
            console.log("editor");
            this.updateParam.show=true;
        },

    },
     route: {
        activate: function (transition) {
          console.log('hook-example activated!')
          transition.next()
        },
        deactivate: function (transition) {
          console.log('hook-example deactivated!')
          transition.next()
      }
    },
    events: {
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getOrderList(this.loadParam);
        }
    }
}
</script>
<style scoped>
.myOrder {
    width: 100%;
    white-space: nowrap;
}

.order_search {
    padding: 25px 30px 0 40px;
}

.my_order {
    float: left;
    color: #fa6705;
    font-size: 20px;
    padding: 0;
}


.new_btn {
    float: right;
    border: 1px solid #ccc;
    color: #003077;
    padding: 4px 10px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    background: #fff;
}

.order_table {
    margin-top: 20px;
    position: relative;
}

.order_table .table {
    background: #fff;
    position: relative;
    margin-bottom: 10px;
    border-top: 1px solid #ddd;
}

.order_table .table > ul {
    position: relative;
    width: 100%;
    display: table;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0;
}

.order_table .table > ul >li {
    float: left;
    padding: 7.5px 0;
    text-align: center;
    width: 11.1%;
    display: table-cell;
}

.order_table .table > ul >li a {
    color: #003077;
}

.order_table .table_hover > ul:hover {
    background: #f5f5f5;
}

.order_table .table > ul >li img {
    margin: auto;
}

.order_action {
    position: absolute;
    right: 97px;
    padding: 10px 0;
    top: 32px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 10;
    min-width: 90px;
    max-width: 200px;
}

.order_show {
    position: absolute;
    right: 20px;
    padding: 10px 0;
    top: 32px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    z-index: 10;
    min-width: 90px;
    max-width: 200px;
    display: block;
}

.order_action ul,
.order_show ul {
    margin-bottom: 0;
}

.order_action ul li a,
.order_show ul li a {
    color: #003077;
    padding: 5px 5px 5px 10px;
    display: block;
}

.expand-transition {
    transition: all .3s ease;
    overflow: inherit;
}

.expand-enter,
.expand-leave {
    opacity: 0;
    height: 0;
}

.v-spinner {
    text-align: center;
}
.order_pagination{
    position: absolute;;
    bottom: 50px;
    left:0;
    right: 0;
    text-align: center;
}
</style>
