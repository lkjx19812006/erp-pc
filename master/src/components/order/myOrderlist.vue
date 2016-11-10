  <template>
    <editorder-model :param="dialogParam" v-if="dialogParam.show"></editorder-model>
    <createorder-model :param="createParam" v-if="createParam.show"></createorder-model>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
    <dispose-model :param="disposeParam" v-if="disposeParam.show"></dispose-model>
    <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <div>
      <div class="order_search">
        <div class="clear">
            <div class="my_order col-xs-2">我的订单</div>
            <div class="right">
                <button class="new_btn" @click="newOrder({
                    show:true,
                    title1:'新建订单',
                    type:'',
                    sourceType:'',
                    sample:'',
                    intl:'',
                    customer:'',
                    currency:'',
                    consignee:'',
                    consigneePhone:'',
                    zipCode:'',
                    country:'',
                    province:'',
                    city:'',
                    employee:this.initLogin.id,
                    org:this.initLogin.orgId,
                    district:'',
                    consigneeAddr:'',
                    customerName:'',
                    comments:'',
                    incidentals:'',
                    incidentalsDesc:'',
                    preferential:'',
                    preferentialDesc:'',
                    payWay:'',
                    orderStatus:'',
                    goods:[{
                            sourceType:'',
                            sourceId:'',
                            title:'',
                            breedId:'',
                            brredName:'',
                            quality:'',
                            location:'',
                            spec:'',
                            price:'',
                            unit:'',
                            number:''
                        }],
                    key:'orderList',
                    link:createOrder
                    })">新建</button>
                <button class="new_btn transfer" @click="createSearch()">搜索</button>
                <button class="new_btn transfer" @click="orgCheck()">申请审核</button>
                <button type="button" class="new_btn transfer"  @click="resetTime()">清空条件</button>
            </div>
        </div>
      </div>
      <div class="order_table">
        <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <table class="table table-hover table_color table-striped " v-cloak>
            <thead>
                <tr>
                    <th><label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}"  @click="select()"></label></th>
                    <th>订单号</th>
                    <th>订单类别</th>
                    <th>订单来源</th>
                    <th>收货人名称</th>
                    <th>收货人电话</th>
                    <th>收货人地址</th>
                    <th>国家</th>
                    <th>所在省</th>
                    <th>所在市</th>
                    <th>备注</th>
                    <th>客户端类型</th>
                    <th>订单状态</th>
                    <th>审核状态</th>
                    <th>货币类型</th>
                    <th>支付方式</th>
                    <th>编辑</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initOrderlist"  v-cloak>
                  <td  @click.stop="">
                    <label v-if="item.validate<=0&&(item.orderStatus==0||item.orderStatus==70)" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="onlyselected($index)"></label>
                  </td>
                  <td><a @click="clickOn({
                                show:true,
                                id:item.id,
                                loading:false,
                                orderStatus:item.orderStatus,
                                contact:'/order/myList'
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
                  <td>{{item.comments}}</td>
                  <td v-if="item.clients===0" style="background:red;color:#fff">PC</td>
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
                  <td v-if="item.payWay!=0&&item.payWay!=1&&item.payWay!=2&&item.payWay!=3">未支付</td>
                  <td @click="updateOrder({
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
                                        employee:item.employee,
                                        customerName:item.customerName,
                                        org:item.org,
                                        district:item.district,
                                        orderStatus:item.orderStatus,
                                        consigneeAddr:item.consigneeAddr,
                                        comments:item.comments,
                                        incidentals:item.incidentals,
                                        orderStatus:item.orderStatus,
                                        validate:item.validate,
                                        incidentalsDesc:item.incidentalsDesc,
                                        preferential:item.preferential,
                                        preferentialDesc:item.preferentialDesc,
                                        goods:[{
                                                sourceType:item.goods[0].sourceType,
                                                id:item.goods[0].id,
                                                sourceId:item.goods[0].sourceId,
                                                title:item.goods[0].title,
                                                breedId:item.goods[0].breedId,
                                                brredName:item.goods[0].brredName,
                                                quality:item.goods[0].quality,
                                                location:item.goods[0].location,
                                                spec:item.goods[0].spec,
                                                price:item.goods[0].price,
                                                unit:item.goods[0].unit,
                                                number:item.goods[0].number
                                            }],
                                        key:'orderList',
                                        link:alterOrder,
                                        url:'/order/'
                                        })"><a class="operate"><img src="/static/images/edit.png" height="18" width="30"  alt="编辑" title="编辑"/></a></td>
                  <td>
                      <div v-if="item.validate==2">
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="(item.orderStatus==20||item.orderStatus==10)&&item.type==0"><img src="/static/images/payorder.png" height="18" width="38" title="待财务付款" alt="待财务付款"/></a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==30&&item.type==0"><img src="/static/images/paid.png" height="18" width="37" title="待客户收款" alt="待客户收款" /></a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==40&&item.type==0"><img src="/static/images/deliver.png" height="18" width="38" title="待客户发货" alt="待客户发货"/></a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==50&&item.type==0"><img src="/static/images/take.png" height="18" width="38" title="待收货" alt="等待收货"/></a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus >=60"><img src="/static/images/finish.png" height="18" width="38" title="已完成订单" alt="已完成订单"/></a>

                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==10&&item.type==1"><img src="/static/images/payorder.png" height="18" width="38" title="待客户付款" alt="待客户付款"/></a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==20&&item.type==1"><img src="/static/images/collection.png" height="18" width="38" title="申请收款" alt="申请收款"/></a>
                        <!--<a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==30&&item.type==1"><img src="/static/images/uncheck.png" height="18" width="38" title="申请收款" alt="申请收款"/></a>-->
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==40&&item.type==1"><img src="/static/images/deliver.png" height="18" width="38" title="待发货" alt="待发货"/></a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==50&&item.type==1"><img src="/static/images/take.png" height="18" width="38" title="待客户收货" alt="待客户收货"/></a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==0"><img src="/static/images/handle.png" height="18" width="38" title="订单待处理" alt="订单待处理"/></a>
                      </div>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==-1"><img src="/static/images/cancle.png" height="18" width="38" title="订单已取消" alt="订单已取消"/></a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==-2"><img src="/static/images/deadline.png" height="18" width="38" title="订单已过期" alt="订单已过期"/></a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.validate==1"><img src="/static/images/wait.png" height="18" width="37" title="审核中" alt="审核中" /></a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.validate==0"><img src="/static/images/audited.png" height="18" width="34" title="未申请审核" alt="未申请审核"  /></a>
                        <a class="operate" @click="orderCheck(item.id,$index,item.validate)" v-if="item.validate==-2"><img src="/static/images/reset.png" height="18" width="48" title="重新申请" alt="重新申请" /></a>

                  </td>
               
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
    import filter from '../../filters/filters'
    import editorderModel from '../order/orderInformationDialog'
    import createorderModel from '../order/createOrderDialog'
    import detailModel from '../order/orderDetail'
    import searchModel from '../order/orderSearch'
    import deletebreedModel from  '../serviceBaselist/breedDetailDialog/deleteBreedDetail'
    import disposeModel  from  '../order/orderStatus'
    import tipsdialogModel  from '../tips/tipDialog'
    import auditModel  from '../order/orgAudit'
    import {
        getList,
        initOrderlist,
        initLogin
    } from '../../vuex/getters'
    import {
        getEmpolyeeOrder,
        alterOrder,
        createOrder,
        orderStatu,
        getOrderDetail
    } from '../../vuex/actions'

    export default {
        components: {
            editorderModel,
            pagination,
            createorderModel,
            detailModel,
            searchModel,
            deletebreedModel,
            disposeModel,
            auditModel,
            tipsdialogModel,
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
                    all:1,
                    consignee:'',
                    link:'/order/myList',
                    employee:this.initLogin.id,
                    org:this.initLogin.orgId,
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
                createParam: {
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
                    confirmReceipt:false
                },
                show:true,
                checked:false,
                auditParam:{
                    show:false,
                    indexs:[],
                    ids:[],
                    description:'',
                    validate:'',
                    title:"申请订单审核"
                },
                tipsParam:{
                    show:false,
                    alert:true,
                    name:"请选择要申请审核的订单",
                }
            }
        },
        vuex: {
            getters: {
                getList,
                initOrderlist,
                initLogin
            },
            actions: {
                getEmpolyeeOrder,
                alterOrder,
                createOrder,
                orderStatu,
                getOrderDetail
            }
        },
        methods: {
            editClick: function(sub) {
                if(this.$store.state.table.basicBaseList.orderList[sub].show){
                    this.$store.state.table.basicBaseList.orderList[sub].show=!this.$store.state.table.basicBaseList.orderList[sub].show;
                }else{
                     this.$store.state.table.basicBaseList.orderList[sub].show=true;
                }
            },
            orgCheck:function(){
                var _this = this;
                _this.auditParam.ids = [];
                _this.auditParam.indexs = [];
               _this.checked=false;
                for(var i=0;i<this.initOrderlist.length;i++){
                    if(this.$store.state.table.basicBaseList.orderList[i].checked){
                        _this.auditParam.ids.push(this.$store.state.table.basicBaseList.orderList[i].id);
                        _this.auditParam.indexs.push(i);
                        _this.auditParam.validate = this.$store.state.table.basicBaseList.orderList[i].validate;
                    }
                }
                if(this.auditParam.ids.length>0){
                    this.auditParam.show = true;
                }else{
                    this.tipsParam.show = true;
                }
            },
            orderCheck:function(id,sub,validate){
              console.log(id)
              console.log(sub)
              console.log(validate)
                var _this = this;
                _this.auditParam.ids = [];
                _this.auditParam.indexs = [];
              /* _this.checked=false;*/
                _this.auditParam.ids.push(id);
                _this.auditParam.indexs.push(sub);
                _this.auditParam.validate = validate;
                if(this.auditParam.ids.length>0){
                    this.auditParam.show = true;
                    this.auditParam.title = '重新申请订单审核';
                }
            },
            onlyselected: function(index){
                  const _self=this;
                    this.$store.state.table.basicBaseList.orderList[index].checked=!this.$store.state.table.basicBaseList.orderList[index].checked;
                    if(_self.checked){
                      _self.checked=false;
                    }else {
                      _self.checked=true;
                      this.$store.state.table.basicBaseList.orderList.forEach(function (item) {
                        if(!item.checked){
                          if(item.validate==0){
                            _self.checked=item.checked;
                            _self.validate = item.validate;
                          }
                        }
                      })
                    }
            },
            select:function(){
              console.log(this.checked)
                  this.checked=!this.checked;
                  const checked=this.checked;
                  this.$store.state.table.basicBaseList.orderList.forEach(function(item){
                    if(item.validate==0)item.checked=checked;
                  })

            },
            newOrder:function(initOrderlist){
                 this.createParam=initOrderlist;
            },
            createSearch:function(){
                 this.loadParam.show=true;
                 /*console.log(this.loadParam.link)
                 this.loadParam.loading=false;*/
                 this.loadParam.link='/order/myList';
                /* console.log(this.loadParam)
                 console.log(this.loadParam.link)
                 console.log(this.loadParam)*/
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
                if(item.orderStatus==0&&item.type==0){
                    this.disposeParam.tips="订单已提交，请审核！";
                    /*this.disposeParam.handle = true;*/
                    /*this.disposeParam.sendoff = true;*/
                    /*this.orderStatu(this.disposeParam);*/
                }
                if(item.orderStatus==10&&item.type==0){
                    this.disposeParam.tips="订单处理完成，待财务付款！";

                    /*this.disposeParam.delivery = true;*/
                    /*this.orderStatu(this.disposeParam);*/
                }
                if(item.orderStatus==-1){
                    this.disposeParam.tips="订单已取消！";
                   /* this.disposeParam.link='/order/cancle';*/
                }
                if(item.orderStatus==-2){
                    this.disposeParam.tips="订单已过期！";
                }
                if(item.orderStatus==20&&item.type==0){
                    this.disposeParam.tips="订单处理完成，待财务付款！";

                }
                if(item.orderStatus==30&&item.type==0){
                    this.disposeParam.tips="订单已付款，待客户收款";
                  this.disposeParam.confirmReceipt=true;
                    /*this.disposeParam.Auditing = true;*/
                }
                if(item.orderStatus==40&&item.type==0){
                    this.disposeParam.tips="待客户发货！";
                    this.disposeParam.sendoff=true;
                    /*this.disposeParam.sendoff = true; */
                }
                if(item.orderStatus==50&&item.type==0){
                    this.disposeParam.tips="您的订单已发货，请注意保持电话通畅，等待收货确认！";
                    this.disposeParam.delivery = true;
                }
                if(item.orderStatus==60&&item.type==0){
                    this.disposeParam.tips="买家已收货，订单已完成！";
                    /*this.disposeParam.link='/order/receiveConfirm';*/
                }
                if(item.orderStatus==70&&item.type==0){
                    this.disposeParam.tips="买家已收货，订单已完成！";
                    /*this.disposeParam.link='/order/receiveConfirm';*/
                }
                /*--销售状态type==1--*/
                if(item.orderStatus==0&&item.type==1){
                    this.disposeParam.tips="订单已提交，请审核！";
                    this.disposeParam.handle = true;
                    /*this.orderStatu(this.disposeParam);*/
                }
                if(item.orderStatus==10&&item.type==1){
                    this.disposeParam.tips="订单处理完成，等待客户付款！";
                    this.disposeParam.sales = true;
                    /*this.orderStatu(this.disposeParam);*/
                }
                if(item.orderStatus==20&&item.type==1){
                    this.disposeParam.tips="客户已付款，等待申请财务核查！";
                    this.disposeParam.payment=true;
                }
                if(item.orderStatus==30&&item.type==1){
                    this.disposeParam.tips="客户已付款，等待财务核查！";
                    this.disposeParam.Auditing = true;
                }
                if(item.orderStatus==40&&item.type==1){
                    this.disposeParam.tips="财务核查通过，请等待卖家发货！";
                    this.disposeParam.sendoff = true;
                }
                if(item.orderStatus==50&&item.type==1){
                    this.disposeParam.tips="订单已发货，请等待收货确认！";
                    this.disposeParam.express = true;
                }
                if(item.orderStatus==60&&item.type==1){
                    this.disposeParam.tips="买家已收货，订单已完成！";
                }
                if(item.orderStatus==70&&item.type==1){
                    this.disposeParam.tips="订单已完成！";
                }
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
              this.getEmpolyeeOrder(this.loadParam);
            }
        },
        events: {
            fresh: function(input) {
                this.loadParam.cur = input;
                this.getEmpolyeeOrder(this.loadParam);
            }
        },
        filter:(filter,{}),
        created() {
            this.getEmpolyeeOrder(this.loadParam)
            console.log(this.loadParam)
            console.log(this.loadParam.link)
            console.log(this.initLogin)
            console.log(this.initLogin.no)
            console.log(this.initLogin.orgId)
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
   .component_action{
        right: 43px;
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
