  <template>
    <editorder-model :param.sync="dialogParam" v-if="dialogParam.show"></editorder-model>
    <createorder-model :param="createParam" v-if="createParam.show"></createorder-model>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
    <dispose-model :param="disposeParam" v-if="disposeParam.show"></dispose-model>
    <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
      <div class="order_search">
        <div class="clear">
            <div class="my_order col-xs-2">{{$t('static.my_orders')}}</div>
            <div class="right">
                <button class="new_btn" @click="newOrder()">{{$t('static.new')}}</button>
                <button class="new_btn transfer" @click="createSearch()">{{$t('static.search')}}</button>
                <button class="new_btn transfer" @click="orgCheck()">{{$t('static.review_application')}}</button>
                <button type="button" class="new_btn transfer"  @click="resetTime()">{{$t('static.clear_all')}}</button>
            </div>
        </div>
        <div class="clear" style="margin-top:10px;">
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
                     <select    v-model="loadParam.orderStatus"  class="form-control" @change="selectSearch()">
                            <option value="">{{$t('static.please_select')}}</option>
                            <option value="0">{{$t('static.create_order')}}</option>
                            <option value="10">{{$t('static.order_procing')}}}</option>
                            <option value="20">{{$t('static.waiting_order')}}</option>
                            <option value="30">{{$t('static.awaiting_review')}}</option>
                            <option value="40">{{$t('static.wait_ship')}}</option>
                            <option value="50">{{$t('static.wait_receipt')}}</option>
                            <option value="60">{{$t('static.awaiting_comment')}}</option>
                            <option value="70">{{$t('static.order_over')}}</option>
                            <option value="-1">{{$t('static.cancle_order')}}</option>
                            <option value="-2">{{$t('static.expired_order')}}</option>
                    </select>
               </dd>
            </dl>
            <!-- <dl class="clear left transfer">
               <dt class="left transfer marg_top">{{$t('static.payment_method')}}：</dt>
               <dd class="left">
                     <select v-model="loadParam.payWay"  class="form-control" @change="selectSearch()">
                            <option value="">{{$t('static.please_select')}}</option>
                            <option value="0">{{$t('static.offline')}}</option>
                            <option value="1">{{$t('static.alipay')}}</option>
                            <option value="2">{{$t('static.pingan')}}</option>
                            <option value="3">{{$t('static.yaokuan')}}</option>
                    </select>
               </dd>
            </dl> -->
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
        </div>
      </div>
      <div class="order_table" id="table_box">
        <div class="cover_loading">
            <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <table class="table table-hover table_color table-striped " v-cloak id="tab">
            <thead>
                <tr>
                    <th><label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}"  @click="select()"></label></th>
                    <th>{{$t('static.transcation')}}</th>
                    <th>{{$t('static.order_type')}}</th>
                    <th>{{$t('static.trading_patterns')}}</th>
                    <th>{{$t('static.sample_order')}}</th>
                    <th>{{$t('static.breed')}}</th>
                    <th>{{$t('static.transcation_amount')}}</th>
                    <th>{{$t('static.client_name')}}</th>
                    <th>{{$t('static.supplier_name')}}</th>
                    <th>{{$t('static.consignee_name')}}</th>
                    <th>{{$t('static.consignee_phone')}}</th>
                    <th>{{$t('static.consignee_address')}}</th>
                    <th>{{$t('static.payment_method')}}</th>
                    <th>{{$t('static.order_status')}}</th>
                    <th>{{$t('static.order_source')}}</th>
                    <th>{{$t('static.review_status')}}</th>
                    <th>{{$t('static.edit')}}</th>
                    <th>{{$t('static.handle')}}</th> 

                    <!-- <th>{{$t('static.order_no')}}</th>
                    <th>{{$t('static.country')}}</th>
                    <th>{{$t('static.province')}}</th>
                    <th>{{$t('static.city')}}</th>
                    <th>{{$t('static.comment')}}</th>
                    <th>{{$t('static.client_source')}}</th>
                    <th>{{$t('static.currency')}}</th>-->
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initMyOrderlist"  v-cloak>
                  <td  @click.stop="">
                    <label v-if="item.validate<=0&&(item.orderStatus==0||item.orderStatus==70)" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="onlyselected($index)"></label>
                  </td>
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
                                contact:'/order/myList'
                        })">{{item.customerName}}</a></td>
                  <td></td>
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
      

                  <!-- <td></td>
                  <td>{{item.country}}</td>
                  <td>{{item.province}}</td>
                  <td>{{item.city}}</td>
                  <td>{{item.comments}}</td>
                  <td v-if="item.clients===0" style="background:red;color:#fff">PC</td>
                  <td v-if="item.clients==1" style="background:green;color:#fff">android</td>
                  <td v-if="item.clients==2" style="background:blue;color:#fff">wechart</td>
                  <td v-if="item.clients==3" style="background:#444444;color:#fff">ios</td>
                  <td v-if="item.clients!=0&&item.clients!=1&&item.clients!=2&&item.clients!=3"  style="background:#000;color:#fff">未说明</td>
                  <td>{{item.currency | Currency}}</td> -->
                  
                  <td @click="updateOrder({
                        show:true,
                        id:item.id,
                        index:$index,
                        type:item.type,
                        sourceType:0,
                        sample:item.sample,
                        intl:item.intl,
                        customer:item.costomer,
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
                        validate:item.validate,
                        incidentalsDesc:item.incidentalsDesc,
                        preferential:item.preferential,
                        preferentialDesc:item.preferentialDesc,
                        status:item.status,
                        key:'myOrderList',
                        link:alterOrder,
                        url:'/order/',
                        goods:item.goods,
                        goodsBack:[]
                        },item.goods)"><a class="operate"><img src="/static/images/{{$t('static.img_edit')}}.png"   alt="编辑" title="编辑"/></a></td>
                  <td>
                      <div v-if="item.validate==2">
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="(item.orderStatus==20||item.orderStatus==10)&&item.type==0">
                             <img src="/static/images/{{$t('static.img_payorder')}}.png"  title="待财务付款" alt="待财务付款"/>
                        </a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==30&&item.type==0">
                              <img src="/static/images/{{$t('static.img_paid')}}.png"  title="待客户收款" alt="待客户收款" />
                        </a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==40&&item.type==0">
                            <img src="/static/images/{{$t('static.img_deliver')}}.png"  title="待客户发货" alt="待客户发货"/>
                        </a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==50&&item.type==0">
                            <img src="/static/images/{{$t('static.img_take')}}.png"  title="待收货" alt="等待收货"/>
                        </a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus >=60">
                           <img src="/static/images/{{$t('static.img_finish')}}.png"   title="已完成订单" alt="已完成订单"/>
                        </a>

                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==10&&item.type==1">
                            <img src="/static/images/{{$t('static.img_payorder')}}.png"  title="待客户付款" alt="待客户付款"/>
                        </a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==20&&item.type==1">
                            <img src="/static/images/{{$t('static.img_collection')}}.png"  title="申请收款" alt="申请收款"/>
                        </a>
                        <!--<a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==30&&item.type==1"><img src="/static/images/uncheck.png" height="18" width="38" title="申请收款" alt="申请收款"/></a>-->
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==40&&item.type==1">
                             <img src="/static/images/{{$t('static.img_deliver')}}.png" title="待发货" alt="待发货"/>
                        </a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==50&&item.type==1">
                            <img src="/static/images/{{$t('static.img_take')}}.png"  title="待客户收货" alt="待客户收货"/>
                        </a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==0">
                            <img src="/static/images/{{$t('static.img_handle')}}.png"  title="订单待处理" alt="订单待处理"/>
                        </a>
                      </div>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==-1">
                             <img src="/static/images/{{$t('static.img_canceled')}}.png" title="订单已取消" alt="订单已取消"/>
                        </a>
                        <a class="operate" @click="pendingOrder(item,$index)" v-if="item.orderStatus==-2">
                            <img src="/static/images/{{$t('static.deadline')}}.png"  title="订单已过期" alt="订单已过期"/>
                        </a>
                        <a class="operate" @click="orderCheck(item.id,$index,item.validate)" v-if="item.validate==-2">
                            <img src="/static/images/{{$t('static.img_reset')}}.png"  title="重新申请" alt="重新申请" />
                        </a>
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
    import common from '../../common/common'
    import changeMenu from '../../components/tools/tabs/tabs.js'
    import {
        getList,
        initMyOrderlist,
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
                    key:'myOrderList',
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
                  show: false,
                },
                createParam:{
                    show:false,
                    title1:'新建订单',
                    type:'',
                    sourceType:0,
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
                    goods:[ //多个商品

                    ],
                    link:createOrder,
                    key:'myOrderList',
                    
                },
                detailParam: {
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
                    confirmReceipt:false,
                    key:'myOrderList'

                },
                show:true,
                checked:false,
                auditParam:{
                    show:false,
                    indexs:[],
                    ids:[],
                    description:'',
                    validate:'',
                    title:"申请订单审核",
                    key:'myOrderList'
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
                initMyOrderlist,
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
            selectSearch:function(){
                this.getEmpolyeeOrder(this.loadParam);
            },
            editClick: function(sub) {
                if(this.$store.state.table.basicBaseList.myOrderList[sub].show){
                    this.$store.state.table.basicBaseList.myOrderList[sub].show=!this.$store.state.table.basicBaseList.myOrderList[sub].show;
                }else{
                     this.$store.state.table.basicBaseList.myOrderList[sub].show=true;
                }
            },
            orgCheck:function(){
                var _this = this;
                _this.auditParam.ids = [];
                _this.auditParam.indexs = [];
               _this.checked=false;
                for(var i=0;i<this.initMyOrderlist.length;i++){
                    if(this.$store.state.table.basicBaseList.myOrderList[i].checked){
                        _this.auditParam.ids.push(this.$store.state.table.basicBaseList.myOrderList[i].id);
                        _this.auditParam.indexs.push(i);
                        _this.auditParam.validate = this.$store.state.table.basicBaseList.myOrderList[i].validate;
                    }
                }
                if(this.auditParam.ids.length>0){
                    this.auditParam.show = true;
                }else{
                    this.tipsParam.show = true;
                }
                _this.auditParam.callback = _this.applyBack;
            },
            applyBack:function(title){
                this.tipsParam.show = true;
                this.tipsParam.name=title;
                this.tipsParam.alert=true;
            },
            orderCheck:function(id,sub,validate){
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
                _this.auditParam.callback = _this.applyBack;
            },
            onlyselected: function(index){
                  const _self=this;
                    this.$store.state.table.basicBaseList.myOrderList[index].checked=!this.$store.state.table.basicBaseList.myOrderList[index].checked;
                    if(_self.checked){
                      _self.checked=false;
                    }else {
                      _self.checked=true;
                      this.$store.state.table.basicBaseList.myOrderList.forEach(function (item) {
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
                  this.$store.state.table.basicBaseList.myOrderList.forEach(function(item){
                    if(item.validate==0)item.checked=checked;
                  })

            },
            newOrder:function(){
                 this.createParam.show = true;
                 this.createParam.callback = this.newBack;
            },
            newBack:function(title){
              this.tipsParam.show = true;
              this.tipsParam.name=title;
              this.tipsParam.alert=true;
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
            clickOn:function(param){
                this.detailParam=param;
            },

            updateOrder:function(param,goods){
                this.dialogParam=param;
                var _this = this;
                if(goods==null){
                   goods=[];
                }
                for(var i=0;i<goods.length;i++){
                    this.dialogParam.goodsBack[i] = {};
                    for(var key in goods[i]){
                        this.dialogParam.goodsBack[i][key] = goods[i][key];
                    }
                }
                this.dialogParam.callback=this.updateBack;
            },
            updateBack:function(title){
              this.tipsParam.show = true;
              this.tipsParam.name=title;
              this.tipsParam.alert=true;
            },
            pendingOrder:function(item,sub){
                item.show=!item.show;
                item.sub = sub;
                this.disposeParam = item;
                this.disposeParam.key = "myOrderList";
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
                this.disposeParam.callback = this.orderBack;
            },
            orderBack:function(title){
                this.tipsParam.show = true;
                this.tipsParam.name=title;
                this.tipsParam.alert=true;
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
        ready(){
          common('tab','table_box',1);
        },
        created() {

            changeMenu(this.$store.state.table.isTop,this.getEmpolyeeOrder,this.loadParam,localStorage.myOrderParam); 
            /*if(!this.$store.state.table.isTop){
                console.log("刷新数据");
                this.getEmpolyeeOrder(this.loadParam);
            }else{
                console.log("不刷新数据");
                this.loadParam = JSON.parse(localStorage.myOrderParam);
                this.$store.state.table.basicBaseList.orderList = JSON.parse(localStorage.myOrderList);
            }*/
            
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
        margin-right: 10px;
    }
    .order_table {
        position: relative;
    }
    .marg_top{
        margin-top: 8px;
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
