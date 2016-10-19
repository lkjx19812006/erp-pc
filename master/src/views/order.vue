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
                            <input type="text" class="search_input" v-model="loadParam.consignee" placeholder="按收货人姓名搜索"  @keyup.enter="orderSearch()">
                        </div>
                        <div class="ordertel_search clearfix">
                            <img src="/static/images/search.png" height="24" width="24">
                            <input type="text" class="search_input" v-model="loadParam.consigneePhone" placeholder="按收货人联系方式搜索"  @keyup.enter="orderSearch()">
                        </div>
                        <div class="ordertel_search clearfix" style="border:none;line-height:20px;">
                            <button class="new_btn" @click="orderSearch()">搜索</button>
                        </div>
                        <!-- <div class="tel_search clearfix">
                            <img src="/static/images/search.png" height="24" width="24">
                            <input type="text" maxlength="11" class="search_input" v-model="loadParam.orderTel" placeholder="按电话搜索" @keyup.enter="orderSearch()">
                        </div> -->
                    </div>
                    <div class="right col-xs-2">
                        <button class="new_btn" @click="newOrder('new')" data-toggle="modal" data-target="#myModal">新建</button>
                    </div>
                </div>
            </div>
             <div class="service-nav clearfix">
            <div class="my_order_search">
               <div class="filter_search clearfix">
                    <dl class="clearfix">
                        <dt>订单类别：</dt>
                        <dd>
                            <select  v-model="loadParam.type" @change="orderSearch()">
                                <option value="">请选择订单类别</option>
                                <option value="0">采购</option>
                                <option value="1">销售</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt>订单状态：</dt>
                        <dd>
                            <select v-model="loadParam.orderStatus" @change="orderSearch()">
                                <option value="">请选择订单状态</option>
                                <option value="0">0</option>
                                <option value="1">10</option>
                                <option value="2">20</option>
                                <option value="3">30</option>
                                <option value="4">40</option>
                                <option value="5">50</option>
                                <option value="6">60</option>
                                <option value="7">70</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt>支付方式：</dt>
                        <dd>
                            <select v-model="loadParam.payWay" @change="orderSearch()">
                                <option value="">请选择支付方式</option>
                                <option value="0">线下</option>
                                <option value="1">支付宝</option>
                                <option value="2">平安</option>
                                <option value="3">药款</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt>数据状态：</dt>
                        <dd>
                            <select v-model="loadParam.dataStatus" @change="orderSearch()">
                                <option value="">请选择数据状态</option>
                                <option value="0">无效</option>
                                <option value="1">待审</option>
                                <option value="2">审核通过</option>
                            </select>
                        </dd>
                    </dl>
                    <dl class="clearfix">
                        <dt>客户端来源：</dt>
                        <dd>
                            <select v-model="loadParam.clients" @change="orderSearch()">
                                <option value="">请选择客户端来源</option>
                                <option value="0">pc</option>
                                <option value="1">android</option>
                                <option value="2">wechart</option>
                                <option value="3">ios</option>
                            </select>
                        </dd>
                    </dl>
               </div>
           </div>
        </div>
            <div class="order_table">
                <table class="table table-hover table_color table-striped " v-cloak>
                    <thead>
                        <tr>  
                            <th>订单号</th>
                            <th>订单类别</th>
                            <th>订单来源</th>
                            <th>收货人名称</th>
                            <th>收货人电话</th>
                            <th>收货人地址</th>
                            <th>国家</th>
                            <th>所在省</th>
                            <th>所在市</th>
                            <th>业务员</th>
                            <th>物流单号</th>
                            <th>备注</th>
                            <th>客户端类型</th>
                            <th>订单状态</th>
                            <th>审核状态</th>
                            <th>支付方式</th>
                            <th>支付状态</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in initOrderlist"  v-cloak >
                          <td><a @click="clickOn({
                                                    show:true,
                                                    id:item.id
                                                })">{{item.no }}</a></td>
                          <td>{{item.type}}</td>
                          <td>{{item.sourceType}}</td>
                          <td>{{item.consignee}}</td>
                          <td>{{item.consigneePhone}}</td>
                          <td>{{item.consigneeAddr}}</td>
                          <td>{{item.country}}</td>
                          <td>{{item.province}}</td>
                          <td>{{item.city}}</td>
                          <td>{{item.employee}}</td>
                          <td>{{item.logisticsNo}}</td>
                          <td>{{item.comments}}</td>

                          <td v-if="item.clients==0||item.clients==null" style="background:red;color:#fff">{{item.clients}}</td>
                          <td v-if="item.clients==1" style="background:green;color:#fff">{{item.clients}}</td>
                          <td v-if="item.clients==2" style="background:blue;color:#fff">{{item.clients}}</td>
                          <td v-if="item.clients==3" style="background:#444444;color:#fff">{{item.clients}}</td>
                          <td>{{item.orderStatus}}</td>
                          <td>{{item.status}}</td>
                          <td>{{item.payWay}}</td>
                          <td>{{item.pay}}</td>
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
                consignee:'',
                consigneePhone:'',
                type:'',
                orderStatus:'',
                payWay:'',
                clients:'',
                dataStatus:'',
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
        }
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
