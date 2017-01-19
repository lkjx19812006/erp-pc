  <template>
   <editorder-model :param="dialogParam" v-if="dialogParam.show"></editorder-model>
    <detail-model :param="detailParam" v-if="detailParam.show"></detail-model>
    <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
    <dispose-model :param="disposeParam" v-if="disposeParam.show"></dispose-model>
    <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <selectorg-model :param="selectOrgParam" v-if="selectOrgParam.show"></selectorg-model>
    <employee-model  :param="employeeParam" v-if="employeeParam.show"></employee-model>
    <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
    <mglist-model>
        <!-- 头部搜索 -->
        <div slot="top">
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
                          <option value="70">{{$t('static.order_over')}}</option>
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
                  <dt class="left transfer marg_top">{{$t('static.breed')}}：</dt>
                  <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.breedName" readonly="true" @click="breedSearch()" />
                  </dd>
              </dl>

              <dl class="clear left transfer">
                  <div class="left">
                      <dt class="left transfer marg_top">起止时间：</dt>
                      <mz-datepicker :time.sync="loadParam.startTime" format="yyyy/MM/dd HH:mm:ss">
                      </mz-datepicker>
                  </div>
                  <div class="left">
                      <dt class="left marg_top">~~</dt>
                      <mz-datepicker :time.sync="loadParam.endTime" format="yyyy/MM/dd HH:mm:ss">
                      </mz-datepicker>
                  </div>
              </dl>

              
          </div>
          <div class="clear left">
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
                <dt class="left transfer marg_top">审核状态：</dt>
                <dd class="left">
                    <select v-model="loadParam.validate"  class="form-control" @change="selectSearch()">
                        <option value="">{{$t('static.please_select')}}</option>
                        <option value="0">未审核</option>
                        <option value="1">待审核</option>
                        <option value="2">审核通过</option>
                        <option value="-2">审核未通过</option>
                    </select>
                </dd>
            </dl>
            
            <dl class="clear left transfer">
                <dt class="left transfer marg_top">{{$t('static.consignee_phone')}}：</dt>
                <dd class="left">
                  <input type="text"  class="form-control" v-model="loadParam.consigneePhone"  @keyup.enter="selectSearch()"/>
                </dd>
            </dl>
            <dl class="clear left transfer">
              <dt class="left transfer marg_top">部门：</dt>
              <dd class="left">
                  <input type="text"  class="form-control" v-model="loadParam.orgName"  placeholder="请选择部门"  readonly="true"  @click="selectOrg()"/>
              </dd>
            </dl>
            
            <!-- 单个业务员搜索 -->
            <dl class="clear left transfer">
               <dt class="left transfer marg_top" style="letter-spacing:3px" >所属业务员：</dt>
               <dd class="left">
                    <input type="text" class="form-control" v-model="loadParam.employeeName" placeholder="请选择业务员" @click="selectEmployee()">
               </dd>
            </dl>
            
            <button class="new_btn transfer" @click="selectSearch()"><a href="/crm/api/v1/order/exportExcel?{{exportUrl}}">导出订单</a></button>
            <button type="button" class="new_btn transfer"  @click="resetCondition()">{{$t('static.clear_all')}}</button>

            <button class="new_btn transfer" @click="selectSearch()">{{$t('static.search')}}</button>

          </div>
          <div class="right">
              <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
          </div>
        </div>
        <!-- 中间列表 -->
        <div slot="form">
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
                      <th>{{$t('static.client_name')}}</th>
                      <th>{{$t('static.breed')}}</th>
                      <th>{{$t('static.transcation_amount')}}</th>
                      <th>{{$t('static.wait_payment')}}</th>
                      <th>{{$t('static.paid')}}</th>
                      <!-- <th>{{$t('static.supplier_name')}}</th> -->
                      <th>{{$t('static.salesman')}}</th>
                      <th>{{$t('static.consignee_name')}}</th>
                      <th>{{$t('static.consignee_phone')}}</th>
                      <th>{{$t('static.consignee_address')}}</th>
                      <th>{{$t('static.payment_method')}}</th>
                      <th>{{$t('static.order_status')}}</th>
                      <th>{{$t('static.order_source')}}</th>
                      <th>{{$t('static.review_status')}}</th>
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
                    <td><a @click="clickOn({
                                  show:true,
                                  id:item.id,
                                  loading:false,
                                   key:'orderDetail',
                                  orderStatus:item.orderStatus,
                                  contact:''
                          })">{{item.customerName}}</a></td>
                    <td>{{item.goodsDesc}}</td>
                    <td>{{item.total}}</td>
                    <td>{{item.unpaid}}</td>
                    <td>{{item.prepaid}}</td>
                    
                    <td>{{item.employeeName}}</td>
                    <td>{{item.consignee}}</td>
                    <td>{{item.consigneePhone}}</td>
                    <td>{{item.country}} {{item.province}} {{item.city}} {{item.district}} {{item.consigneeAddr}}</td>
                    <td v-if="item.payWay===0">{{$t('static.offline')}}</td>
                    <td v-if="item.payWay==1">{{$t('static.alipay')}}</td>
                    <td v-if="item.payWay==2">{{$t('static.pingan')}}</td>
                    <td v-if="item.payWay==3">{{$t('static.yaokuan')}}</td>
                    <td v-if="item.payWay==4">WeChat</td>
                    <td v-if="item.payWay!=0&&item.payWay!=1&&item.payWay!=2&&item.payWay!=3&&item.payWay!=4">{{$t('static.none')}}</td>
                    <td>{{item.orderStatus | assess item.type item.logistics item.verifierName}}</td>          
                    <!--<td v-if="item.orderStatus==0">{{$t('static.create_order')}}</td>
                    <td v-if="item.orderStatus==10">{{$t('static.order_procing')}}</td>
                    <td v-if="item.orderStatus==20">{{$t('static.waiting_order')}}</td>
                    <td v-if="item.orderStatus==30">{{$t('static.awaiting_review')}}</td>
                    <td v-if="item.orderStatus==40">等待{{item.verifierName}}发货</td> {{$t('static.wait_ship')}}
                    <td v-if="item.orderStatus==50">{{$t('static.wait_receipt')}}</td>
                    <td v-if="item.orderStatus==60&&item.type==1&&item.logistics==3">{{$t('static.awaiting_comment')}}</td>
                    <td v-if="item.orderStatus==60&&item.type==1&&item.logistics==40">{{$t('static.order_over')}}（质量合格）</td>
                    <td v-if="item.orderStatus==60&&item.type==1&&item.logistics==2">已重新发货（仓库审核）</td>
                    <td v-if="item.orderStatus==60&&item.type==1&&item.logistics==50">{{$t('static.order_over')}}（补充合同申请）</td>
                    <td v-if="item.orderStatus==60&&item.type==1&&item.logistics==60">{{$t('static.order_over')}}（售后处理中）</td>
                    <td v-if="item.orderStatus==60&&item.type==0">{{$t('static.order_over')}}</td>
                    <td v-if="item.orderStatus==70">{{$t('static.order_over')}}</td>
                    <td v-if="item.orderStatus==-1">{{$t('static.cancle_order')}}</td>
                    <td v-if="item.orderStatus==-2">{{$t('static.expired_order')}}</td> -->
                    <td v-if="item.sourceType==0">{{$t('static.new')}}</td>
                    <td v-if="item.sourceType==1">{{$t('static.intention')}}</td>
                    <td v-if="item.sourceType==2">{{$t('static.quote')}}</td>
                    <td v-if="item.sourceType==3">{{$t('static.sample_order')}}</td>
                    <td v-if="item.validate==2" ><div style="background:green;color:#fff">{{$t('static.approved')}}</div></td>
                    <td v-if="item.validate==-2"><div style="background:red;color:#fff">{{$t('static.unapproved')}}</div></td>
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
         <!-- 底部分页 -->
        <pagination :combination="loadParam"  slot="page"></pagination>
    </mglist-model>

    <div style="font-size:14px;">
        <span style="margin-left:1%;color:red">总金额：{{initAllOrderStatis.totalSum | money}}元</span>
        <span style="margin-left:1%;color:red">已支付金额：{{initAllOrderStatis.prepaidSum | money}}元</span>
        <span style="margin-left:1%;color:red">未支付金额：{{initAllOrderStatis.unpaidSum | money}}元</span>
        <span style="margin-left:1%;">成本总金额：{{initAllOrderStatis.costSum | money}}元</span>
        <span style="margin-left:1%;">商品总金额：{{initAllOrderStatis.amountSum  | money}}元</span>
        <span style="margin-left:1%;">订单数量：{{initAllOrderStatis.orderCount | money}}笔</span>
        <span style="margin-left:1%;">特惠总金额：{{initAllOrderStatis.preferentialSum  | money}}元</span>
        <span style="margin-left:1%;">杂费总金额：{{initAllOrderStatis.incidentalsSum | money}}元</span>
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
    import breedsearchModel from '../intention/breedsearch'
    import selectorgModel  from '../../components/tips/treeDialog'
     //单个业务员搜索
    import employeeModel  from  '../clientRelate/searchEmpInfo'
    import filter from '../../filters/filters'
    import common from '../../common/common'
    import changeMenu from '../../components/tools/tabs/tabs.js'
    import mglistModel from '../mguan/mgListComponent.vue'
    import {
        getList,
        initAllOrderlist,
        initAllOrderStatis
    } from '../../vuex/getters'
    import {
        getOrderList,
        getOrderStatistical,
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
            mglistModel,
            selectorgModel,
            employeeModel,
            breedsearchModel,
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
                    breedId:'',
                    breedName:'',
                    employeeId:'',
                    employeeName:'',
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
                    validate:'',
                    total:0
                },
                selectOrgParam:{
                    show:false,
                    orgId:'',
                    orgName:'',
                    callback:this.callback,
                },
                employeeParam:{
                  show:false,
                  org:true,
                  orgId:"",
                  //单个业务员搜索
                  employeeId:'',
                  employeeName:'',  
                  
                },
                breedSearchParam:{
                  show:false
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
        computed: {
            exportUrl:function(){
                let url = "org=" + this.loadParam.org;
                if(this.loadParam.orderStatus){
                  url  +=  "&orderStatus=" + this.loadParam.orderStatus;
                }
                if(this.loadParam.type){
                  url  +=  "&type=" + this.loadParam.type;
                }
                if(this.loadParam.consignee){
                  url  +=  "&consignee=" + this.loadParam.consignee;
                }
                if(this.loadParam.consigneePhone){
                  url  +=  "&consigneePhone=" + this.loadParam.consigneePhone;
                }
                if(this.loadParam.mode){
                  url  +=  "&mode=" + this.loadParam.mode;
                }
                if(this.loadParam.validate){
                  url  +=  "&validate=" + this.loadParam.validate;
                }
                if(this.loadParam.breedId){
                  url  +=  "&breedId=" + this.loadParam.breedId;
                }
                if(this.loadParam.employeeId){
                  url  +=  "&employee=" + this.loadParam.employeeId;
                }
                if(this.loadParam.startTime){
                  url  +=  "&startTime=" + this.loadParam.startTime;
                }
                if(this.loadParam.endTime){
                  url  +=  "&endTime=" + this.loadParam.endTime;
                }
                return url;
            }
        },
        vuex: {
            getters: {
                getList,
                initAllOrderlist,
                initAllOrderStatis
            },
            actions: {
                getOrderList,
                getOrderStatistical,
                alterOrder,
                createOrder,
                orderStatu,
                getOrderDetail,
                orderOrgAudit
            }
        },
        methods: {
            breedSearch:function(){
                this.breedSearchParam.show = true;
            },
            selectOrg:function(){
                this.selectOrgParam.show = true;
            },
            selectEmployee:function(){
                this.employeeParam.show = true;
            },
            callback:function(){
              if(this.selectOrgParam.orgId){
                this.loadParam.org=this.selectOrgParam.orgId;
                this.loadParam.orgName=this.selectOrgParam.orgName;

                this.employeeParam.orgId = this.selectOrgParam.orgId;

                this.selectSearch();
                
              }
            },
            selectSearch:function(){
                this.getOrderList(this.loadParam);
                this.getOrderStatistical(this.loadParam);  
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
              this.loadParam.validate = "";
              this.loadParam.type="";
              this.loadParam.clients="";
              this.loadParam.payWay="";
              this.loadParam.org="";
              this.loadParam.orgName="";
              this.loadParam.employeeId="";
              this.loadParam.employeeName="";
              this.employeeParam.orgId = "";   //保证employeeParam.orgId与loadParam.org同步变化
              this.loadParam.breedId="";
              this.loadParam.breedName="";

              this.selectSearch();
            },
            applyBack:function(title){
                this.tipsParam.show = true;
                this.tipsParam.name=title;
                this.tipsParam.alert=true;
                this.selectSearch();
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
        },
        events: {
            fresh: function(input) {
                this.loadParam.cur = input;
                this.selectSearch();
            },
            breed:function(breed){
                this.loadParam.breedId=breed.breedId;
                this.loadParam.breedName=breed.breedName;
                this.selectSearch(); 
            },
            a:function(employee){
              this.loadParam.employeeId = employee.employeeId;
              this.loadParam.employeeName = employee.employeeName;
              this.selectSearch();
            },
        },
        filter:(filter,{}),
        ready(){
          common('tab','table_box',1);
        },
        created() {
            changeMenu(this.$store.state.table.isTop,this.getOrderList,this.loadParam,localStorage.allOrderParam); 
            changeMenu(this.$store.state.table.isTop,this.getOrderStatistical,this.loadParam,localStorage.allOrderParam);
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
        margin-right:16px;
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
