  <template>
   <editorder-model :param="dialogParam" v-if="dialogParam.show"></editorder-model>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
    <dispose-model :param="disposeParam" v-if="disposeParam.show"></dispose-model>
    <div>
      <div class="order_search">
        <div class="clear">
            <div class="my_order col-xs-2">全部订单</div>
            <div class="right">
                <button class="new_btn transfer" @click="createSearch()">搜索</button>
                <button type="button" class="new_btn transfer"  @click="resetTime()">清空条件</button>
            </div>
        </div>
        <div class="clear" style="margin-top:10px;">
            <dl class="clear left transfer">
               <dt class="left transfer marg_top">订单类别：</dt>
               <dd class="left">
                    <select class="form-control" v-model="loadParam.type" @change="selectSearch()">
                        <option value="">请选择订单类别</option>
                        <option value="0">采购</option>
                        <option value="1">销售</option>
                    </select>
               </dd>
            </dl>
            <dl class="clear left transfer">
               <dt class="left transfer marg_top">订单数据状态：</dt>
               <dd class="left">
                     <select v-model="loadParam.orderStatus"  class="form-control" @change="selectSearch()">
                            <option value="">请选择订单状态</option>
                            <option value="0">订单生成</option>
                            <option value="10">等待处理</option>
                            <option value="20">等待支付</option>
                            <option value="30">等待审核</option>
                            <option value="40">等待发货</option>
                            <option value="50">等待收货</option>
                            <option value="60">已完成</option>
                            <option value="70">已完成</option>
                            <option value="-1">已取消</option>
                            <option value="-2">已过期</option>
                    </select>
               </dd>
            </dl>
            <dl class="clear left transfer">
               <dt class="left transfer marg_top">支付方式：</dt>
               <dd class="left">
                     <select v-model="loadParam.payWay"  class="form-control" @change="selectSearch()">
                            <option value="">请选择支付方式</option>
                            <option value="0">线下</option>
                            <option value="1">支付宝</option>
                            <option value="2">平安</option>
                            <option value="3">药款</option>
                    </select>
               </dd>
            </dl>
            <dl class="clear left transfer">
               <dt class="left transfer marg_top">订单数据状态：</dt>
               <dd class="left">
                     <select v-model="loadParam.dataStatus"  class="form-control" @change="selectSearch()">
                        <option value="">请选择数据状态</option>
                        <option value="0">无效</option>
                        <option value="1">可用</option>
                    </select>
               </dd>
            </dl>
            <dl class="clear left transfer">
               <dt class="left transfer marg_top">客户端来源：</dt>
               <dd class="left">
                     <select v-model="loadParam.clients"  class="form-control" @change="selectSearch()">
                        <option value="">请选择客户端来源</option>
                        <option value="0">pc</option>
                        <option value="1">android</option>
                        <option value="2">wechart</option>
                        <option value="3">ios</option>
                    </select>
               </dd>
            </dl>
            <dl class="clear left transfer">
               <dt class="left transfer marg_top">交易模式：</dt>
               <dd class="left">
                     <select v-model="loadParam.mode"  class="form-control" @change="selectSearch()">
                        <option value="">请选择交易模式</option>
                        <option value="1">撮合</option>
                        <option value="2">三方</option>
                        <option value="3">自营</option>
                    </select>
               </dd>
            </dl>
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
                    <!-- <th></th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initOrderlist"  v-cloak>
                  <td><a @click="clickOn({
                                show:true,
                                id:item.id,
                                loading:false,
                                orderStatus:item.orderStatus
                        })">{{item.no}}</a></td>
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
                  <td v-if="item.clients!=0&&item.clients!=1&&item.clients!=2&&item.clients!=3"  style="background:#000;color:#fff">未说明</td>
                  <td>{{item.orderStatus | orderstatus}}</td>
                  <td v-if="item.validate==2" style="background:green;color:#fff">{{item.validate | Auditing}}</td>
                  <td v-if="item.validate==-2" style="background:red;color:#fff">{{item.validate | Auditing}}</td>
                  <td v-if="item.validate!=-2&&item.validate!=2">{{item.validate | Auditing}}</td>
                  <td>{{item.currency | Currency}}</td>
                  <td v-if="item.payWay===0">线下打款</td>
                  <td v-if="item.payWay==1">支付宝</td>
                  <td v-if="item.payWay==2">平安支付</td>
                  <td v-if="item.payWay==3">药款支付</td>
                  <td v-if="item.payWay==null">未支付</td>
                 <!--  <td @click="editClick($index)">
                     <img height="24" width="24" src="/static/images/default_arrow.png" />
                     <div class="component_action" v-show="item.show">
                          <ul>
                              <li @click="updateOrder({
                                       sub:$index,
                                       id:item.id,
                                       show:true,
                                       title1:'修改订单',
                                       type:item.type,
                                       sourceType:item.sourceType,
                                       sample:item.sample,
                                       intl:item.intl,
                                       customer:item.customer,
                                       currency:item.currency,
                                       consignee:item.consignee,
                                       consigneePhone:item.consigneePhone,
                                       zipCode:item.zipCode,
                                       country:item.country,
                                       province:item.province,
                                       city:item.city,
                                       district:item.district,
                                       consigneeAddr:item.consigneeAddr,
                                       comments:item.comments,
                                       orderStatus:item.orderStatus,
                                       incidentals:item.incidentals,
                                       incidentalsDesc:item.incidentalsDesc,
                                       preferential:item.preferential,
                                       preferentialDesc:item.preferentialDesc,
                                       goods:item.goods,
                                       key:'orderList',
                                       link:alterOrder,
                                       url:'/order/'
                                       })">编辑</li>
                               <li v-if="item.orderStatus==-1&&item.type==0&&item.validate==2"  @click="pendingOrder(item,$index)">订单已取消</li>
                               <li v-if="item.orderStatus==-2&&item.type==0" @click="pendingOrder(item,$index)">订单已过期</li>
                               <li v-if="item.orderStatus==0&&item.type==0&&item.validate==2"  @click="pendingOrder(item,$index)">待处理订单</li>
                               <li v-if="item.orderStatus==10&&item.type==0&&item.validate==2"  @click="pendingOrder(item,$index)">订单处理中</li>
                               <li v-if="item.orderStatus==20&&item.type==0&&item.validate==2" @click="pendingOrder(item,$index)">等待支付</li>
                               <li v-if="item.orderStatus==30&&item.type==0&&item.validate==2" @click="pendingOrder(item,$index)">等待核查</li>
                               <li v-if="item.orderStatus==40&&item.type==0&&item.validate==2"  @click="pendingOrder(item,$index)">等待发货</li>
                               <li v-if="item.orderStatus==50&&item.type==0&&item.validate==2"  @click="pendingOrder(item,$index)">等待收货</li>
                               <li v-if="item.orderStatus==60&&item.type==0&&item.validate==2" @click="pendingOrder(item,$index)">已完成订单</li>
                               <li v-if="item.orderStatus==70&&item.type==0&&item.validate==2" @click="pendingOrder(item,$index)">已完成订单</li>
                               <li v-if="item.orderStatus==-1&&item.type==1&&item.validate==2"  @click="pendingOrder(item,$index)">订单已取消</li>
                               <li v-if="item.orderStatus==-2&&item.type==1" @click="pendingOrder(item,$index)">订单已过期</li>
                               <li v-if="item.orderStatus==0&&item.type==1&&item.validate==2"  @click="pendingOrder(item,$index)">待处理订单</li>
                               <li v-if="item.orderStatus==10&&item.type==1&&item.validate==2"  @click="pendingOrder(item,$index)">订单处理中</li>
                               <li v-if="item.orderStatus==20&&item.type==1&&item.validate==2" @click="pendingOrder(item,$index)">等待支付</li>
                               <li v-if="item.orderStatus==30&&item.type==1&&item.validate==2" @click="pendingOrder(item,$index)">等待核查</li>
                               <li v-if="item.orderStatus==40&&item.type==1&&item.validate==2"  @click="pendingOrder(item,$index)">等待发货</li>
                               <li v-if="item.orderStatus==50&&item.type==1&&item.validate==2"  @click="pendingOrder(item,$index)">等待收货</li>
                               <li v-if="item.orderStatus==60&&item.type==1&&item.validate==2" @click="pendingOrder(item,$index)">已完成订单</li>
                               <li v-if="item.orderStatus==70&&item.type==1&&item.validate==2" @click="pendingOrder(item,$index)">已完成订单</li>
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
    import editorderModel from '../order/orderInformationDialog'
    import detailModel from '../order/orderDetail'
    import searchModel from '../order/orderSearch'
    import deletebreedModel from  '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
    import disposeModel  from  '../order/orderStatus'
    import filter from '../../filters/filters'
    import {
        getList,
        initOrderlist
    } from '../../vuex/getters'
    import {
        getOrderList,
        alterOrder,
        createOrder,
        orderStatu,
        getOrderDetail
    } from '../../vuex/actions'

    export default {
        components: {
            editorderModel,
            filter,
            pagination,
            detailModel,
            searchModel,
            deletebreedModel,
            disposeModel
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
                    link:'/order/',
                    consignee:'',
                    consigneePhone:'',
                    type:'',
                    orderStatus:'',
                    payWay:'',
                    clients:'',
                    dataStatus:'',
                    no:'',
                    ctime:'',
                    ftime:'',
                    mode:'',
                    total:0
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
                    delivery:false
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
                alterOrder,
                createOrder,
                orderStatu,
                getOrderDetail
            }
        },
        methods: {
            selectSearch:function(){
                this.getOrderList(this.loadParam);
            },
            editClick: function(sub) {
                if(this.$store.state.table.basicBaseList.orderList[sub].show){
                    this.$store.state.table.basicBaseList.orderList[sub].show=!this.$store.state.table.basicBaseList.orderList[sub].show;
                }else{
                     this.$store.state.table.basicBaseList.orderList[sub].show=true;
                }
            },
            /*newOrder:function(initOrderlist){
                 this.dialogParam=initOrderlist;
            },*/
            createSearch:function(){
              console.log(this.loadParam)
                 this.loadParam.show=true;
                 this.loadParam.loading=false;
            },
            clickOn:function(initOrderlist){
                console.log(initOrderlist);
                this.detailParam=initOrderlist;
            },
            updateOrder:function(initOrderlist){
                console.log(initOrderlist)
                this.dialogParam=initOrderlist;
            },
            resetTime:function(){
              this.loadParam.ctime = "";
              this.loadParam.ftime = "";
              this.loadParam.consigneePhone = "";
              this.loadParam.consignee = "";
              this.loadParam.orderStatus="";
              this.loadParam.dataStatus="";
              this.loadParam.no="";
              this.loadParam.mode="";
              this.loadParam.type="";
              this.loadParam.clients="";
              this.loadParam.payWay="";
              this.getOrderList(this.loadParam);
            },
            pendingOrder:function(item,sub){
              console.log(item)
                item.show=!item.show;
                item.sub = sub;
                this.disposeParam = item;
                this.disposeParam.id = item.id;
                this.disposeParam.show = true;
                /*--采购状态type==0--*/
                if(item.orderStatus==0&&item.type==0){
                    this.disposeParam.tips="订单已提交，请审核！";
                }
                if(item.orderStatus==10&&item.type==0){
                    this.disposeParam.tips="订单正在处理，商家将进行电话确认，请保持电话通畅！";
                }
                if(item.orderStatus==-1&&item.type==0){
                    this.disposeParam.tips="订单已取消！";
                }
                if(item.orderStatus==-2&&item.type==0){
                    this.disposeParam.tips="订单已过期！";
                }
                if(item.orderStatus==20&&item.type==0){
                    this.disposeParam.tips="订单处理完成，等待买家付款！";
                    this.disposeParam.payment=true;
                }
                if(item.orderStatus==30&&item.type==0){
                    this.disposeParam.tips="订单买家已付款，商家正在核查！";
                    /*this.disposeParam.Auditing = true;*/
                }
                if(item.orderStatus==40&&item.type==0){
                    this.disposeParam.tips="您的订单已支付，请等待卖家发货！";
                    /*this.disposeParam.sendoff = true; */
                }
                if(item.orderStatus==50&&item.type==0){
                    this.disposeParam.tips="您的订单已发货，请注意保持电话通畅，等待收货确认！";
                    this.disposeParam.delivery = true;
                }
                if(item.orderStatus==60&&item.type==0){
                    this.disposeParam.tips="买家已收货，订单已完成！";
                }
                if(item.orderStatus==70&&item.type==0){
                    this.disposeParam.tips="买家已收货，订单已完成！";
                }
                /*--销售状态type==1--*/
                if(item.orderStatus==0&&item.type==1){
                    this.disposeParam.tips="订单已提交，请审核！";
                    this.disposeParam.handle = true;
                }
                if(item.orderStatus==10&&item.type==1){
                    this.disposeParam.tips="订单正在处理，商家将进行电话确认，请保持电话通畅！";
                    this.disposeParam.sales = true;
                }
                if(item.orderStatus==-1&&item.type==1){
                    this.disposeParam.tips="订单已取消！";
                }
                if(item.orderStatus==-2&&item.type==0){
                    this.disposeParam.tips="订单已过期！";
                }
                if(item.orderStatus==20&&item.type==1){
                    this.disposeParam.tips="订单处理完成，等待买家付款！";
                    this.disposeParam.payment=true;
                }
                if(item.orderStatus==30&&item.type==1){
                    this.disposeParam.tips="订单买家已付款，商家正在核查！";
                    this.disposeParam.Auditing = true;
                }
                if(item.orderStatus==40&&item.type==1){
                    this.disposeParam.tips="订单已支付，请等待卖家发货！";
                    this.disposeParam.sendoff = true;
                }
                if(item.orderStatus==50&&item.type==1){
                    this.disposeParam.tips="订单已发货，请等待买家收货确认！";
                    this.disposeParam.express = true;
                }
                if(item.orderStatus==60&&item.type==1){
                    this.disposeParam.tips="买家已收货，订单已完成！";
                }
                if(item.orderStatus==70&&item.type==1){
                    this.disposeParam.tips="买家已收货，订单已完成！";
                }
            }
        },
        events: {
            fresh: function(input) {
                this.loadParam.cur = input;
                this.getOrderList(this.loadParam);
            }
        },
        filter:(filter,{}),
        created() {
            this.getOrderList(this.loadParam)
        },
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
