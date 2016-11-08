  <template>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
    <dispose-model :param="disposeParam" v-if="disposeParam.show"></dispose-model>
    <div>
      <div class="order_search">
        <div class="clear">
            <div class="my_order col-xs-2">订单审核</div>
           <!--  <div class="right">
               <button class="new_btn transfer" @click="createSearch()">搜索</button>
           </div> -->
        </div>
      </div>
      <div class="order_table">
        <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
        </div>
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
                    <th>备注</th>
                    <th>客户端类型</th>
                    <th>订单状态</th>
                    <th>审核状态</th>
                    <th>货币类型</th>
                    <th>支付方式</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initOrderlist"  v-cloak>
                  <td><a @click="clickOn({
                                show:true,
                                id:item.id,
                                loading:false,
                                orderStatus:item.orderStatus
                        })">{{item.no }}</a></td>
                  <td v-if="item.type==1">销售</td>
                  <td v-if="item.type==0">采购</td>
                  <td v-if="item.sourceType==0">新建</td>
                  <td v-if="item.sourceType==1">意向</td>
                  <td v-if="item.sourceType==2">报价</td>
                  <td>{{item.consignee}}</td>
                  <td>{{item.consigneePhone}}</td>
                  <td>{{item.consigneeAddr}}</td>
                  <td>{{item.country}}</td>
                  <td>{{item.province}}</td>
                  <td>{{item.city}}</td>
                  <td>{{item.employeeName}}</td>
                  <td>{{item.comments}}</td>
                  <td v-if="item.clients==0" style="background:red;color:#fff">PC</td>
                  <td v-if="item.clients==1" style="background:green;color:#fff">android</td>
                  <td v-if="item.clients==2" style="background:blue;color:#fff">wechart</td>
                  <td v-if="item.clients==3" style="background:#444444;color:#fff">ios</td>
                  <td v-if="item.clients==null">未说明</td>

                  <td v-if="item.orderStatus==30">已支付，等待审核</td>
                  <td v-if="item.orderStatus==40">已审核</td>
                  <td>{{item.validate | Auditing}}</td>
                  <td>{{item.currency | Currency}}</td>
                  <td v-if="item.payWay==0">线下打款</td>
                  <td v-if="item.payWay==1">支付宝</td>
                  <td v-if="item.payWay==2">平安支付</td>
                  <td v-if="item.payWay==3">药款支付</td>
                  <td v-if="item.payWay==null">其他</td>
                  <!-- <td v-if="item.payWay==''">其他</td> -->
                  <td>
                      <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==30&&item.type==1"><img src="/static/images/uncheck.png" height="18" width="38" title="等待核查" alt="等待核查" @click="pendingOrder(item,$index)" /></a>
                      <a class="operate" v-if="item.orderStatus==40&&item.type==1&&item.validate==2"><img src="/static/images/unorderStatus.png" height="18" width="18" title="暂无处理" alt="暂无处理" @click="pendingOrder(item,$index)" /></a>
                  </td>
                  <!-- <td @click="editClick($index)">
                      <img height="24" width="24" src="/static/images/default_arrow.png" />
                      <div class="component_action" v-show="item.show">
                           <ul>
                                <li v-if="item.orderStatus==30&&item.type==1&&item.validate==2" @click="pendingOrder(item,$index)">等待核查</li>
                           </ul>
                       </div>
                  </td> -->
                </tr>
            </tbody>
        </table>
      </div>
      <div class="order_pagination">
          <pagination :combination="loadParam"></pagination>
      </div>
    </div>
  </template>
  <script>
    import pagination from '../pagination'
    import detailModel from '../order/orderDetail'
    import searchModel from '../order/orderSearch'
    import disposeModel  from  '../order/orderStatus'
    import filter from '../../filters/filters'
    import {
        getList,
        initOrderlist
    } from '../../vuex/getters'
    import {
        getOrderCheckList,
        alterOrder,
        createOrder,
        orderStatu,
        getOrderDetail
    } from '../../vuex/actions'

    export default {
        components: {
            pagination,
            detailModel,
            searchModel,
            disposeModel,
            filter
        },
        data() {
            return {
                loadParam: {
                    loading: true,
                    color: '#5dc596',
                    size: '15px',
                    show:false,
                    cur: 1,
                    all: 1,
                    consignee:'',
                    link:'/order/',
                    consigneePhone:'',
                    orderStatus:'',
                    payWay:'',
                    clients:'',
                    dataStatus:'',
                    total:0,
                    type:1,
                    orderStatus:30
                },
                dialogParam:{
                    show: false
                },
                updateParam: {
                    show:false,
                },
                detailParam: {
                    show:false
                },
                updateorderParam:{
                    show:false
                },
                disposeParam:{ //订单处理各个状态
                    show:false,
                    sales:false,
                    handle:false,
                    payment:false,
                    Auditing:false,
                    sendoff:false,
                    express:false,
                    delivery:false,
                    aaaa:'/order/payConfirm'
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
                getOrderCheckList,
                alterOrder,
                createOrder,
                orderStatu,
                getOrderDetail
            }
        },
        created() {
            this.getOrderCheckList(this.loadParam)
        },
        methods: {
            editClick: function(sub) {
                if(this.$store.state.table.basicBaseList.orderList[sub].show){
                    this.$store.state.table.basicBaseList.orderList[sub].show=!this.$store.state.table.basicBaseList.orderList[sub].show;
                }else{
                     this.$store.state.table.basicBaseList.orderList[sub].show=true;
                }
            },
            newOrder:function(initOrderlist){
                 this.dialogParam=initOrderlist;
            },
            createSearch:function(){
                 this.loadParam.show=true;
                 this.loadParam.loading=false;
            },
            clickOn:function(initOrderlist){
                console.log(initOrderlist);
                this.detailParam=initOrderlist;
            },
            updateOrder:function(initOrderlist){
                console.log(initOrderlist)
                console.log(initOrderlist.goods)
                this.dialogParam=initOrderlist;
            },
            pendingOrder:function(item,sub){
                item.show=!item.show;
                item.sub = sub;
                this.disposeParam = item;
                this.disposeParam.show = true;
                /*--采购状态type==0--*/
                if(item.orderStatus==30&&item.type==0){
                    this.disposeParam.tips="订单买家已付款，商家正在核查！";
                    /*this.disposeParam.Auditing = true;*/
                }
                /*--销售状态type==1--*/
                if(item.orderStatus==30&&item.type==1){
                    this.disposeParam.tips="订单买家已付款，商家正在核查,！";
                    this.disposeParam.Auditing = true;
                }
            }
        },
        filter:(filter,{}),
        events: {
            fresh: function(input) {
                this.loadParam.cur = input;
                this.getOrderCheckList(this.loadParam);
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
    .transfer{
        margin-right: 20px;
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
    .component_action{
        right: 43px;
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
        text-align: center;
    }
  </style>
