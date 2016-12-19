  <template>
    <editorder-model :param="dialogParam" v-if="dialogParam.show"></editorder-model>
    <detail-model :param.sync="detailParam" v-if="detailParam.show"></detail-model>
    <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
    <dispose-model :param.sync="disposeParam" v-if="disposeParam.show"></dispose-model>
    <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <div>
      <div class="order_search">
        <div class="clear">
            <div class="right">
                <!-- <button class="new_btn transfer" @click="createSearch()">{{$t('static.search')}}</button> -->
                <!-- <button class="btn btn-default transfer" @click="orgCheck()">{{$t('static.review')}}</button> -->
                <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
            </div>
            <div class="clear left">
              <dl class="clear left transfer">
                 <dt class="left transfer marg_top">{{$t('static.order_type')}}：</dt>
                 <dd class="left">
                      <select class="form-control" v-model="loadParam.type" @change="selectSearch()">
                          <option value="">{{$t('static.please_select')}}</option>
                          <option value="0">{{$t('static.purchase')}}</option>
                          <option value="1">{{$t('static.sell')}}</option>
                      </select>
                 </dd>
              </dl>
              <dl class="clear left transfer">
                 <dt class="left transfer marg_top">{{$t('static.order_status')}}：</dt>
                 <dd class="left">
                       <select v-model="loadParam.orderStatus"  class="form-control" @change="selectSearch()">
                              <option value="">{{$t('static.please_select')}}</option>
                              <option value="0">{{$t('static.create_order')}}</option>
                              <!-- <option value="10">{{$t('static.pending')}}</option> -->
                              <option value="20">{{$t('static.wait_for_payment')}}</option>
                              <option value="30">{{$t('static.wait_for_audit')}}</option>
                              <option value="40">{{$t('static.wait_for_delivery')}}</option>
                              <option value="50">{{$t('static.wait_for_receiving')}}</option>
                              <option value="60">{{$t('static.awaiting_comment')}}</option>
                              <option value="70">{{$t('static.completed')}}</option>
                      </select>
                 </dd>
              </dl>
              <dl class="clear left transfer">
                 <dt class="left transfer marg_top">{{$t('static.trading_patterns')}}：</dt>
                 <dd class="left">
                       <select v-model="loadParam.mode"  class="form-control" @change="selectSearch()">
                          <option value="">{{$t('static.please_select')}}</option>
                          <option value="1">{{$t('static.together')}}</option>
                          <option value="2">{{$t('static.three_side')}}</option>
                          <option value="3">{{$t('static.self_support')}}</option>
                      </select>
                 </dd>
              </dl>
              <dl class="clear left transfer">
                 <dt class="left transfer marg_top">{{$t('static.consignee_name')}}：</dt>
                 <dd class="left">
                    <input type="text"  class="form-control" v-model="loadParam.consignee"  @keyup.enter="selectSearch()"/>
                 </dd>
              </dl>
              <dl class="clear left transfer">
                 <dt class="left transfer marg_top">{{$t('static.consignee_phone')}}：</dt>
                 <dd class="left">
                    <input type="text"  class="form-control" v-model="loadParam.consigneePhone"  @keyup.enter="selectSearch()"/>
                 </dd>
              </dl>
              <button type="button" class="new_btn"  @click="resetTime()">{{$t('static.clear_all')}}</button>
                <button class="new_btn transfer" @click="selectSearch()">{{$t('static.search')}}</button>
            </div>
        </div>
      </div>
      <div class="order_table" id="table_box">
        <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <table class="table table-hover table_color table-striped " v-cloak id="tab">
            <thead>
                <tr>
                    <!-- <th><label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}"  @click="select()"></label></th> -->
                    <th>{{$t('static.transcation')}}</th>
                    <th>{{$t('static.order_type')}}</th>
                    <th>{{$t('static.trading_patterns')}}</th>
                    <th>{{$t('static.sample_order')}}</th>
                    <th>{{$t('static.breed')}}</th>
                    <th>{{$t('static.transcation_amount')}}</th>
                    <th>{{$t('static.client_name')}}</th>
                    <th>{{$t('static.supplier_name')}}</th>
                    <th>{{$t('static.salesman')}}</th>
                    <th>{{$t('static.consignee_name')}}</th>
                    <th>{{$t('static.consignee_phone')}}</th>
                    <th style="width:300px">{{$t('static.consignee_address')}}</th>
                    <th>{{$t('static.payment_method')}}</th>
                    <th>{{$t('static.order_status')}}</th>
                    <th>{{$t('static.order_source')}}</th>
                    <th>{{$t('static.review_status')}}</th>
                    <th></th> 
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initOrgOrderlist"  v-cloak>
                  <!-- <td  @click.stop="">
                    <label v-if="item.validate==1" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="onlyselected($index)"></label>
                  </td> -->
                  <td>{{item.ctime}}</td>
                  <td v-if="item.type==1">{{$t('static.sell')}}</td>
                  <td v-if="item.type==0">{{$t('static.purchase')}}</td>
                  <td v-if="item.mode==1">{{$t('static.together')}}</td>
                  <td v-if="item.mode==2">{{$t('static.three_side')}}</td>
                  <td v-if="item.mode==3">{{$t('static.self_support')}}</td>
                  <td v-if="item.sample==0">{{$t('static.no')}}</td>
                  <td v-if="item.sample==1">{{$t('static.yes')}}</td>
                  <td>{{item.goodsDesc}}</td>
                  <td>{{item.total}}</td>
                  <td><a @click="clickOn({
                                show:true,
                                id:item.id,
                                loading:false,
                                 key:'orderDetail',
                                orderStatus:item.orderStatus,
                                contact:''
                        })">{{item.customerName}}</a></td>
                  <td></td>
                  <td>{{item.employeeName}}</td>
                  <td>{{item.consignee}}</td>
                  <td>{{item.consigneePhone}}</td>
                  <td>{{item.consigneeAddr}}</td>
                  <td v-if="item.payWay===0">{{$t('static.offline')}}</td>
                  <td v-if="item.payWay==1">{{$t('static.alipay')}}</td>
                  <td v-if="item.payWay==2">{{$t('static.pingan')}}</td>
                  <td v-if="item.payWay==3">{{$t('static.yaokuan')}}</td>
                  <td v-if="item.payWay!=0&&item.payWay!=1&&item.payWay!=2&&item.payWay!=3">{{$t('static.none')}}</td>
                  <td v-if="item.orderStatus==0">{{$t('static.create_order')}}</td>
                  <td v-if="item.orderStatus==10">{{$t('static.order_procing')}}</td>
                  <td v-if="item.orderStatus==20">{{$t('static.waiting_order')}}</td>
                  <td v-if="item.orderStatus==30">{{$t('static.awaiting_review')}}</td>
                  <td v-if="item.orderStatus==40">{{$t('static.wait_ship')}}</td>
                  <td v-if="item.orderStatus==50">{{$t('static.wait_receipt')}}</td>
                  <td v-if="item.orderStatus==60">{{$t('static.order_over')}}</td>
                  <td v-if="item.orderStatus==70">{{$t('static.order_over')}}</td>
                  <td v-if="item.orderStatus==-1">{{$t('static.cancle_order')}}</td>
                  <td v-if="item.orderStatus==-2">{{$t('static.expired_order')}}</td>
                  <td v-if="item.sourceType==0">{{$t('static.new')}}</td>
                  <td v-if="item.sourceType==1">{{$t('static.intention')}}</td>
                  <td v-if="item.sourceType==2">{{$t('static.quote')}}</td>
                  <td v-if="item.sourceType==3">{{$t('static.sample_order')}}</td>
                  <td v-if="item.validate==2" style="background:green;color:#fff">{{$t('static.approved')}}</td>
                  <td v-if="item.validate==-2" style="background:red;color:#fff">{{$t('static.unapproved')}}</td>
                  <td v-if="item.validate==0">{{$t('static.wait_approval')}}</td>
                  <td v-if="item.validate==1">{{$t('static.approving')}}</td>
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
                 <td><a class="operate" v-if="item.validate==1&&(item.verifier == $store.state.table.login.id)" @click="orderCheck(item.id,$index)">
                     <img src="/static/images/orgcheck.png"  title="审核" alt="审核" />
                 </a></td>
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
    import auditModel  from '../../components/tips/auditDialog'
    import filter from '../../filters/filters'
    import common from '../../common/common'
    import changeMenu from '../../components/tools/tabs/tabs.js'
    import {
        getList,
        initOrgOrderlist,
        initLogin
    } from '../../vuex/getters'
    import {
        getOrgOrder,
        alterOrder,
        createOrder,
        orderStatu,
        getOrderDetail,
        orderOrgAudit
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
                    org:this.initLogin.orgId,
                    link:'/order/sectionList',
                    key:'orgOrderList',
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
                show:true,
                checked:false,
                auditParam:{
                    show:false,
                    audit:true,
                    indexs:[],    //批量审核使用,暂停用
                    ids:[],       //批量审核使用,暂停用
                    id:'',
                    index:'',
                    auditComment:'',
                    validate:'',
                    title:"部门订单审核",
                    key:"orgOrderList",
                    pass:this.auditPass,
                    reject:this.auditReject,
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
                initOrgOrderlist,
                initLogin
            },
            actions: {
                getOrgOrder,
                alterOrder,
                createOrder,
                orderStatu,
                getOrderDetail,
                orderOrgAudit
            }
        },
        created() {
            changeMenu(this.$store.state.table.isTop,this.getOrgOrder,this.loadParam,localStorage.orgOrderParam); 
            /*if(!this.$store.state.table.isTop){
                console.log("刷新数据");
                this.getOrgOrder(this.loadParam);
            }else{
                console.log("不刷新数据");
                this.loadParam = JSON.parse(localStorage.orgOrderParam);
                this.$store.state.table.basicBaseList.orderList = JSON.parse(localStorage.orgOrderList);
            }
            */
        },
        methods: {
            selectSearch:function(){
                this.getOrgOrder(this.loadParam)
            },
            editClick: function(sub) {
                if(this.$store.state.table.basicBaseList.orgOrderList[sub].show){
                    this.$store.state.table.basicBaseList.orgOrderList[sub].show=!this.$store.state.table.basicBaseList.orgOrderList[sub].show;
                }else{
                     this.$store.state.table.basicBaseList.orgOrderList[sub].show=true;
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
              this.getOrgOrder(this.loadParam);
            },
            /*orgCheck:function(){
                var _this = this;
                _this.auditParam.ids = [];
                _this.auditParam.indexs = [];
               _this.checked=false;
                for(var i=0;i<this.initOrgOrderlist.length;i++){
                    if(this.$store.state.table.basicBaseList.orgOrderList[i].checked){
                        _this.auditParam.ids.push(this.$store.state.table.basicBaseList.orgOrderList[i].id);
                        _this.auditParam.indexs.push(i);
                        _this.auditParam.validate = this.$store.state.table.basicBaseList.orgOrderList[i].validate;
                    }
                }
                if(this.auditParam.ids.length>0){
                    this.auditParam.show = true;
                }else{
                    this.tipsParam.show = true;
                }
                 _this.auditParam.callback = _this.applyBack;
            },*/
            applyBack:function(title){
                this.tipsParam.show = true;
                this.tipsParam.name=title;
                this.tipsParam.alert=true;
                this.getOrgOrder(this.loadParam);
            },
            orderCheck:function(id,index){ 
                
                this.auditParam.id = id;
                this.auditParam.index = index;
                
                this.auditParam.show = true;
                this.auditParam.title = '审核订单';
                this.auditParam.callback = this.applyBack;
            },
            auditPass:function(){
                this.auditParam.validate = 1; 
                this.orderOrgAudit(this.auditParam);             
            },
            auditReject:function(){
                this.auditParam.validate = 0;  
                this.orderOrgAudit(this.auditParam);
            },
            onlyselected: function(index){
                  const _self=this;
                    this.$store.state.table.basicBaseList.orgOrderList[index].checked=!this.$store.state.table.basicBaseList.orgOrderList[index].checked;
                    if(_self.checked){
                      _self.checked=false;
                    }else {
                      _self.checked=true;
                      this.$store.state.table.basicBaseList.orgOrderList.forEach(function (item) {
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
                  this.$store.state.table.basicBaseList.orgOrderList.forEach(function(item){
                    if(item.validate==1)item.checked=checked;
                  })

            },
            newOrder:function(param){
                 this.dialogParam=param;
            },
            createSearch:function(){
                console.log(this.loadParam)
                 this.loadParam.show=true;
                 this.loadParam.loading=false;
            },
            clickOn:function(param){
                
                this.detailParam=param;
            },
            updateOrder:function(param){
                
                this.dialogParam=param;
            },

        },
        filter:(filter,{}),
        ready(){
          common('tab','table_box',1);
        },
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
        padding: 35px 10px 0 10px;
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
        margin-right: 15px;
    }
    .order_table {
        margin-top: 0px;
        position: relative;
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

    .v-spinner {
        text-align: center;
    }
    .order_pagination{
        text-align: center;
    }
  </style>
