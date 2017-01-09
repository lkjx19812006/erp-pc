  <template>
   <editorder-model :param="dialogParam" v-if="dialogParam.show"></editorder-model>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
    <dispose-model :param="disposeParam" v-if="disposeParam.show"></dispose-model>
    <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <selectorg-model :param="selectOrgParam" v-if="selectOrgParam.show"></selectorg-model>
    <div>
      <div class="order_search clearfix">
          <div class="right">
                <!-- <button class="new_btn transfer" @click="createSearch()">{{$t('static.search')}}</button> -->
                
          </div>
          <div class="clear left">
             <dl class="clear left transfer">
                <dt class="left transfer marg_top">部门：</dt>
                <dd class="left">
                    <input type="text"  class="form-control" v-model="loadParam.orgName"  placeholder="请选择部门"  readonly="true"  @click="selectOrg()"/>
                </dd>
             </dl>
             <dl class="clear left transfer">
                 <dt class="left transfer marg_top">{{$t('static.consignee_name')}}：</dt>
                 <dd class="left">
                    <input type="text"  class="form-control" v-model="loadParam.consignee"  @keyup.enter="selectSearch()"/>
                 </dd>
              </dl>
              <dl class="clear left transfer" style="margin-right:280px">
                 <dt class="left transfer marg_top">{{$t('static.consignee_phone')}}：</dt>
                 <dd class="left">
                    <input type="text"  class="form-control" v-model="loadParam.consigneePhone"  @keyup.enter="selectSearch()"/>
                 </dd>
              </dl>
              <button type="button" class="new_btn transfer"  @click="resetCondition()">{{$t('static.clear_all')}}</button>
              <button class="new_btn transfer" @click="selectSearch()">{{$t('static.search')}}</button>
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
            <!-- <dl class="clear left transfer">
               <dt class="left transfer marg_top">{{$t('static.order_type')}}：</dt>
               <div class="btn-group">
                   <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===''}" @click="selectType('')">
                      {{$t('static.please_select')}}
                   </button>
                   <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===0}" @click="selectType(0)">
                      {{$t('static.purchase')}}
                   </button>
                   <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.type===1}" @click="selectType(1)">
                      {{$t('static.sell')}}
                   </button>
               </div>
            </dl> -->

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
                <div class="client-detailInfo col-xs-6">
                    <dt class="left transfer marg_top">起始时间：</dt>
                    <mz-datepicker :time.sync="loadParam.startTime" format="yyyy/MM/dd HH:mm:ss">
                    </mz-datepicker>
                </div>
            </dl>

            <dl class="clear left transfer" style="margin-left:-33px;">
                <div class="client-detailInfo col-xs-6">
                    <dt class="left transfer marg_top">结束时间：</dt>
                    <mz-datepicker :time.sync="loadParam.endTime" format="yyyy/MM/dd HH:mm:ss">
                    </mz-datepicker>
                </div>
            </dl>
          </div>

          <div class="right">
              <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
          </div>

      </div>
      <div class="order_table" id="table_box">
          <div class="cover_loading">
              <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
          </div>
        <table class="table table-hover table_color table-striped " v-cloak id="tab">
            <thead>
                <tr>
                    <th>{{$t('static.transcation')}}</th>
                    <th>{{$t('static.order_type')}}</th>
                    <th>{{$t('static.trading_patterns')}}</th>
                    <th>{{$t('static.sample_order')}}</th>
                    <th>{{$t('static.breed')}}</th>
                    <th>{{$t('static.transcation_amount')}}</th>
                    <th>{{$t('static.client_name')}}</th>
                    <!-- <th>{{$t('static.supplier_name')}}</th> -->
                    <th>{{$t('static.salesman')}}</th>
                    <th>{{$t('static.consignee_name')}}</th>
                    <th>{{$t('static.consignee_phone')}}</th>
                    <th>{{$t('static.consignee_address')}}</th>
                    <th>{{$t('static.payment_method')}}</th>
                    <th>{{$t('static.order_status')}}</th>
                    <th>{{$t('static.order_source')}}</th>
                    <th>{{$t('static.review_status')}}</th>
                    <!-- <th>{{$t('static.order_no')}}</th>
                      <th>{{$t('static.order_type')}}</th>
                      <th>{{$t('static.order_source')}}</th>
                      <th>{{$t('static.consignee_name')}}</th>
                      <th>{{$t('static.consignee_phone')}}</th>
                      <th>{{$t('static.consignee_address')}}</th>
                      <th>{{$t('static.country')}}</th>
                      <th>{{$t('static.province')}}</th>
                      <th>{{$t('static.city')}}</th>
                      <th>{{$t('static.salesman')}}</th>
                      <th>{{$t('static.comment')}}</th>
                      <th>{{$t('static.client_source')}}</th>
                      <th>{{$t('static.order_status')}}</th>
                      <th>{{$t('static.review_status')}}</th>
                      <th>{{$t('static.currency')}}</th>
                      <th>{{$t('static.payment_method')}}</th> 
                    -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initAllOrderlist"  v-cloak>
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
                  <td>{{item.employeeName}}</td>
                  <td>{{item.consignee}}</td>
                  <td>{{item.consigneePhone}}</td>
                  <td>{{item.country}} {{item.province}} {{item.city}} {{item.district}} {{item.consigneeAddr}}</td>
                  <td v-if="item.payWay===0">{{$t('static.offline')}}</td>
                  <td v-if="item.payWay==1">{{$t('static.alipay')}}</td>
                  <td v-if="item.payWay==2">{{$t('static.pingan')}}</td>
                  <td v-if="item.payWay==3">{{$t('static.yaokuan')}}</td>
                  <td v-if="item.payWay==4">WeChat</td>
                  <td v-if="item.payWay!=0&&item.payWay!=1&&item.payWay!=2&&item.payWay!=3">{{$t('static.none')}}</td>
                  <td v-if="item.orderStatus==0">{{$t('static.create_order')}}</td>
                  <td v-if="item.orderStatus==10">{{$t('static.order_procing')}}</td>
                  <td v-if="item.orderStatus==20">{{$t('static.waiting_order')}}</td>
                  <td v-if="item.orderStatus==30">{{$t('static.awaiting_review')}}</td>
                  <td v-if="item.orderStatus==40">等待{{item.verifierName}}发货</td> <!-- {{$t('static.wait_ship')}} -->
                  <td v-if="item.orderStatus==50">{{$t('static.wait_receipt')}}</td>
                  <td v-if="item.orderStatus==60&&item.type==1&&item.logistics==3">{{$t('static.awaiting_comment')}}</td>
                  <td v-if="item.orderStatus==60&&item.type==1&&item.logistics==40">{{$t('static.order_over')}}（质量合格）</td>
                  <td v-if="item.orderStatus==60&&item.type==1&&item.logistics==2">已重新发货（仓库审核）</td>
                  <td v-if="item.orderStatus==60&&item.type==1&&item.logistics==50">{{$t('static.order_over')}}（补充合同申请）</td>
                  <td v-if="item.orderStatus==60&&item.type==1&&item.logistics==60">{{$t('static.order_over')}}（售后处理中）</td>
                  <td v-if="item.orderStatus==60&&item.type==0">{{$t('static.order_over')}}</td>
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
                  <td v-if="item.validate==1">{{$t('static.approving')}}(待{{item.verifierName}}审核)</td>
                  <!-- <td><a class="operate" v-if="item.validate==1&&(item.verifier == $store.state.table.login.id)" @click="orderCheck(item.id,$index)">
                     <img src="/static/images/orgcheck.png"  title="审核" alt="审核" />
                                   </a></td> -->
                <!-- 
                        <td><a @click="clickOn({
                                show:true,
                                id:item.id,
                                loading:false,
                                orderStatus:item.orderStatus
                        })">{{item.no}}</a></td>
                        <td v-if="item.type==1">销售</td>
                        <td v-if="item.type==0">采购</td>
                        <td v-if="item.sourceType==0">交易员新建</td>
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
                -->
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
    import selectorgModel  from '../../components/tips/treeDialog'
    import filter from '../../filters/filters'
    import common from '../../common/common'
    import changeMenu from '../../components/tools/tabs/tabs.js'
    import {
        getList,
        initAllOrderlist
    } from '../../vuex/getters'
    import {
        getOrderList,
        alterOrder,
        createOrder,
        orderStatu,
        getOrderDetail,
        orderOrgAudit
    } from '../../vuex/actions'

    export default {
        components: {
            editorderModel,
            filter,
            pagination,
            detailModel,
            searchModel,
            deletebreedModel,
            disposeModel,
            tipsdialogModel,
            auditModel,
            selectorgModel
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
                    key:'allOrderList',
                    consignee:'',
                    consigneePhone:'',
                    type:'',
                    orderStatus:'',
                    payWay:'',
                    clients:'',
                    dataStatus:'',
                    no:'',
                    org:'',
                    orgName:'',
                    startTime:'',
                    endTime:'',
                    mode:'',
                    total:0
                },
                selectOrgParam:{
                    show:false,
                    orgId:'',
                    orgName:'',
                    callback:this.callback,
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
                },
                show:true
            }
        },
        vuex: {
            getters: {
                getList,
                initAllOrderlist
            },
            actions: {
                getOrderList,
                alterOrder,
                createOrder,
                orderStatu,
                getOrderDetail,
                orderOrgAudit
            }
        },
        methods: {

            selectOrg:function(){
                this.selectOrgParam.show = true;
            },
            callback:function(){
              if(this.selectOrgParam.orgId){
                this.loadParam.org=this.selectOrgParam.orgId;
                this.loadParam.orgName=this.selectOrgParam.orgName;
                this.selectSearch();
                
              }
            },
            selectSearch:function(){
                this.getOrderList(this.loadParam);
            },
            selectType:function(type){
              this.loadParam.type = type;
              this.selectSearch();
            },
            editClick: function(sub) {
                if(this.$store.state.table.basicBaseList.allOrderList[sub].show){
                    this.$store.state.table.basicBaseList.allOrderList[sub].show=!this.$store.state.table.basicBaseList.allOrderList[sub].show;
                }else{
                     this.$store.state.table.basicBaseList.allOrderList[sub].show=true;
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
            clickOn:function(param){
                
                this.detailParam=param;
            },
            updateOrder:function(param){
             
                this.dialogParam=param;
            },
            resetCondition:function(){
              this.loadParam.startTime = "";
              this.loadParam.endTime = "";
              this.loadParam.consigneePhone = "";
              this.loadParam.consignee = "";
              this.loadParam.orderStatus="";
              this.loadParam.dataStatus="";
              this.loadParam.no="";
              this.loadParam.mode="";
              this.loadParam.type="";
              this.loadParam.clients="";
              this.loadParam.payWay="";
              this.loadParam.org="";
              this.loadParam.orgName="";
              this.getOrderList(this.loadParam);
            },
            applyBack:function(title){
                this.tipsParam.show = true;
                this.tipsParam.name=title;
                this.tipsParam.alert=true;
                this.getOrderList(this.loadParam);
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
        ready(){
          common('tab','table_box',1);
        },
        created() {
            changeMenu(this.$store.state.table.isTop,this.getOrderList,this.loadParam,localStorage.allOrderParam); 
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
    .transfer{
        margin-right: 20px;
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
     #table_box  table th,#table_box  table td{
      width: 114px;
      min-width: 114px;
    }
  </style>
