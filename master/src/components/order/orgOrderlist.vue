  <template>
    <editorder-model :param="dialogParam" v-if="dialogParam.show"></editorder-model>
    <detail-model :param.sync="detailParam" v-if="detailParam.show"></detail-model>
    <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
    <dispose-model :param.sync="disposeParam" v-if="disposeParam.show"></dispose-model>
    <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <div v-show="!detailParam.show&&!disposeParam.show">
      <div class="order_search">
        <div class="clear">
            <div class="my_order col-xs-2">部门订单</div>
            <div class="right">
                <button class="new_btn transfer" @click="createSearch()">搜索</button>
                <button class="new_btn transfer" @click="orgCheck()">审核</button>
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
                    <th><label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}"  @click="select()"></label></th>
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
                    <th>支付方式</th>
                    <!-- <th></th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initOrderlist"  v-cloak>
                  <td  @click.stop="">
                    <label v-if="item.validate==1" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="onlyselected($index)"></label>
                  </td>
                  <td><a @click="clickOn({
                                show:true,
                                id:item.id,
                                loading:false,
                                contact:'/order/sectionList'
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

                  <td>{{item.orderStatus | orderstatus}}</td>
                  <td>{{item.validate | Auditing}}</td>

                  <td v-if="item.payWay===0">线下打款</td>
                  <td v-if="item.payWay==1">支付宝</td>
                  <td v-if="item.payWay==2">平安支付</td>
                  <td v-if="item.payWay==3">药款支付</td>
                  <td v-if="item.payWay==null">无</td>
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
                                       goods:[{
                                               sourceType:item.goods[0].sourceType,
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
    import tipsdialogModel  from '../tips/tipDialog'
    import auditModel  from '../order/orgAudit'
    import filter from '../../filters/filters'
    import {
        getList,
        initOrderlist,
        initLogin
    } from '../../vuex/getters'
    import {
        getOrgOrder,
        alterOrder,
        createOrder,
        orderStatu,
        getOrderDetail
    } from '../../vuex/actions'

    export default {
        components: {
            editorderModel,
            pagination,
            filter,
            detailModel,
            searchModel,
            deletebreedModel,
            disposeModel,
            tipsdialogModel,
            auditModel
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
                    org:this.initLogin.orgId,
                    link:'/order/sectionList',
                    consigneePhone:'',
                    type:'',
                    orderStatus:'',
                    payWay:'',
                    clients:'',
                    dataStatus:'',
                    aaa:'/order/sectionList'
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
                show:true,
                checked:false,
                auditParam:{
                    show:false,
                    indexs:[],
                    ids:[],
                    description:'',
                    validate:'',
                    title:"部门订单审核"                    
                },
                tipsParam:{
                    show:false,
                    alert:true,
                    name:"请选择要审核的订单"
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
                getOrgOrder,
                alterOrder,
                createOrder,
                orderStatu,
                getOrderDetail
            }
        },
        created() {
            this.getOrgOrder(this.loadParam)
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
            onlyselected: function(index){
                  const _self=this;
                    this.$store.state.table.basicBaseList.orderList[index].checked=!this.$store.state.table.basicBaseList.orderList[index].checked;
                    if(_self.checked){
                      _self.checked=false;
                    }else {
                      _self.checked=true;
                      this.$store.state.table.basicBaseList.orderList.forEach(function (item) {
                        if(!item.checked){
                          if(item.validate==1){
                            _self.checked=item.checked;
                            _self.validate = item.validate;
                          } 
                        }
                      })
                    }
            },
            select:function(){
                  this.checked=!this.checked;
                  const checked=this.checked;
                  this.$store.state.table.basicBaseList.orderList.forEach(function(item){
                    if(item.validate==1)item.checked=checked;
                  })

            },
            newOrder:function(initOrderlist){
                 this.dialogParam=initOrderlist;
            },
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
                console.log(initOrderlist.goods)
                this.dialogParam=initOrderlist;
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
        filter:(filter,{}),
        events: {
            fresh: function(input) {
                this.loadParam.cur = input;
                this.getOrgOrder(this.loadParam);
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
