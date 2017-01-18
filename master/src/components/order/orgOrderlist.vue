  <template>
    <editorder-model :param="dialogParam" v-if="dialogParam.show"></editorder-model>
    <detail-model :param.sync="detailParam" v-if="detailParam.show"></detail-model>
    <search-model  :param="loadParam" v-if="loadParam.show"></search-model>
    <dispose-model :param.sync="disposeParam" v-if="disposeParam.show"></dispose-model>
    <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
    <breedsearch-model :param="breedSearchParam" v-if="breedSearchParam.show"></breedsearch-model>
    <employee-model  :param="employeeParam" v-if="employeeParam.show"></employee-model>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <language-model v-show="false"></language-model>
    <mglist-model :param="mgListParam">
        <!-- 头部搜索 -->
        <div slot="top">
            <div class="clear">
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
                                <option value="10">{{$t('static.order_procing')}}</option>
                                <option value="20">{{$t('static.waiting_order')}}</option>
                                <option value="30">{{$t('static.awaiting_review')}}</option>
                                <option value="40">{{$t('static.wait_ship')}}</option>
                                <option value="50">{{$t('static.wait_receipt')}}</option>
                                <option value="60">{{$t('static.awaiting_comment')}}</option>
                                <option value="70">{{$t('static.order_over')}}</option>
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

                <!-- 单个业务员搜索 -->
                <dl class="clear left transfer">
                   <dt class="left transfer marg_top" style="letter-spacing:3px" >所属业务员：</dt>
                   <dd class="left">
                        <input type="text" class="form-control" v-model="loadParam.employeeName" placeholder="请选择业务员" @click="selectEmployee()">
                   </dd>
                </dl>

                <dl class="clear left transfer">
                    <div class="col-xs-6">
                        <dt class="left transfer marg_top">起始时间：</dt>
                        <mz-datepicker :time.sync="loadParam.startTime" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                </dl>
              </div>
            </div>
            <div class="clear">
              <div class="right">
                <!-- <button class="new_btn transfer" @click="createSearch()">{{$t('static.search')}}</button> -->
                  <!-- <button class="btn btn-default transfer" @click="orgCheck()">{{$t('static.review')}}</button>
                 -->
                  <button class="btn btn-primary" @click="selectSearch()">{{$t('static.refresh')}}</button>
              </div>
              <div class="left">
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
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">{{$t('static.breed')}}：</dt>
                    <dd class="left">
                          <input type="text" class="form-control" v-model="loadParam.breedName" readonly="true" @click="breedSearch()" />
                    </dd>
                </dl>

                <dl class="clear left" style="margin-left:-20px;">
                    <div class="col-xs-6">
                        <dt class="left transfer marg_top">结束时间：</dt>
                        <mz-datepicker :time.sync="loadParam.endTime" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                </dl>
                <button type="button" class="new_btn"  @click="resetTime()">{{$t('static.clear_all')}}</button>
                <button class="new_btn transfer" @click="selectSearch()"><a href="/crm/api/v1/order/exportExcel?{{exportUrl}}">导出订单</a></button>
                <button class="new_btn transfer" @click="selectSearch()">{{$t('static.search')}}</button>
              </div>  
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
                      <!-- <th><label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}"  @click="select()"></label></th> -->
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
                      <th style="width:300px">{{$t('static.consignee_address')}}</th>
                      <!-- <th>{{$t('static.payment_method')}}</th> -->
                      <th>{{$t('static.order_status')}}</th>
                      <th>{{$t('static.order_source')}}</th>
                      <th>{{$t('static.review_status')}}</th>
                      <th>{{$t('static.handle')}}</th> 
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
                    <!-- <td v-if="item.payWay===0">{{$t('static.offline')}}</td>
                    <td v-if="item.payWay==1">{{$t('static.alipay')}}</td>
                    <td v-if="item.payWay==2">{{$t('static.pingan')}}</td>
                    <td v-if="item.payWay==3">{{$t('static.yaokuan')}}</td>
                    <td v-if="item.payWay==4">WeChat</td>
                    <td v-if="item.payWay!=0&&item.payWay!=1&&item.payWay!=2&&item.payWay!=3&&item.payWay!=4">{{$t('static.none')}}</td> -->
                    <td v-if="this.language=='zh_CN'">{{item.orderStatus | assess item.type item.logistics item.verifierName}}</td>
                    <td v-if="this.language=='en'">{{item.orderStatus | Enassess item.type item.logistics item.verifierName}}</td>
                    <!-- <td v-if="item.orderStatus==0">{{$t('static.create_order')}}</td>
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
                   <td>
                      <a class="operate" v-if="item.validate==1&&(item.verifier == $store.state.table.login.id)" @click="orderCheck(item.id,$index)">
                        <img src="/static/images/orgcheck.png"  title="审核" alt="审核" />
                      </a>
                      <button class="btn btn-warning" v-if="item.validate==2&&(item.verifier == $store.state.table.login.id)&&item.logistics==1&&(item.taskKey=='order_send_governor_validate'||item.taskKey=='financial_validate')" @click="orderSend(item.id,$index)" style="background:#fff;color:#eea236;padding:1px 3px;">审核发货</button>
                   </td>
                  </tr>
              </tbody>
            </table>
        </div>
        <!-- 底部分页 -->
        <pagination :combination="loadParam" slot="page"></pagination>
    </mglist-model>

      <div style="font-size:14px;">
        <span style="margin-left:1%;color:red">总金额：{{initOrgOrderStatis.totalSum | money}}元</span>
        <span style="margin-left:1%;color:red">已支付金额：{{initOrgOrderStatis.prepaidSum | money}}元</span>
        <span style="margin-left:1%;color:red">未支付金额：{{initOrgOrderStatis.unpaidSum | money}}元</span>
        <span style="margin-left:1%;">成本总金额：{{initOrgOrderStatis.costSum | money}}元</span>
        <span style="margin-left:1%;">商品总金额：{{initOrgOrderStatis.amountSum  | money}}元</span>
        <span style="margin-left:1%;">订单数量：{{initOrgOrderStatis.orderCount | money}}笔</span>
        <span style="margin-left:1%;">特惠总金额：{{initOrgOrderStatis.preferentialSum  | money}}元</span>
        <span style="margin-left:1%;">杂费总金额：{{initOrgOrderStatis.incidentalsSum | money}}元</span>
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
    //单个业务员搜索
    import employeeModel  from  '../clientRelate/searchEmpInfo'
    import breedsearchModel from '../intention/breedsearch'
    import filter from '../../filters/filters'
    import common from '../../common/common'
    import changeMenu from '../../components/tools/tabs/tabs.js'
    import mglistModel from '../mguan/mgListComponent.vue'
    import languageModel from '../tools/language.vue'
    import {
        getList,
        initOrgOrderlist,
        initOrgOrderStatis,
        initLogin
    } from '../../vuex/getters'
    import {
        getOrgOrder,
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
            languageModel,
            pagination,
            mglistModel,
            filter,
            detailModel,
            searchModel,
            breedsearchModel,
            employeeModel,
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
                    breedId:'',
                    breedName:'',
                    employeeId:'',
                    employeeName:'',
                    consignee:'',
                    consigneePhone:'',
                    type:'',
                    orderStatus:'',
                    startTime:'',
                    endTime:'',
                    payWay:'',
                    clients:'',
                    dataStatus:'',
                    no:'',
                    ctime:'',
                    ftime:'',
                    mode:'',
                    total:0
                },
                language:'',
                mgListParam:{
                  pagestyle:'padding-top:100px'
                },
                breedSearchParam:{
                  show:false
                },
                employeeParam:{
                  show:false,
                  org:true,
                  orgId:this.initLogin.orgId,
                  //单个业务员搜索
                  employeeId:'',
                  employeeName:'',  
                  
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
                term:2,
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
                initOrgOrderlist,
                initOrgOrderStatis,
                initLogin
            },
            actions: {
                getOrgOrder,
                getOrderStatistical,
                alterOrder,
                createOrder,
                orderStatu,
                getOrderDetail,
                orderOrgAudit
            }
        },
        created() {
            changeMenu(this.$store.state.table.isTop,this.getOrgOrder,this.loadParam,localStorage.orgOrderParam); 
            changeMenu(this.$store.state.table.isTop,this.getOrderStatistical,this.loadParam,localStorage.orgOrderParam); 
            this.language = localStorage.lang;
            
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
                this.getOrgOrder(this.loadParam);
                this.getOrderStatistical(this.loadParam);
            },
            editClick: function(sub) {
                if(this.$store.state.table.basicBaseList.orgOrderList[sub].show){
                    this.$store.state.table.basicBaseList.orgOrderList[sub].show=!this.$store.state.table.basicBaseList.orgOrderList[sub].show;
                }else{
                     this.$store.state.table.basicBaseList.orgOrderList[sub].show=true;
                }
            },
            breedSearch:function(){
                this.breedSearchParam.show = true;
            },
            selectEmployee:function(){
                this.employeeParam.show = true;
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
              this.loadParam.breedId = "";
              this.loadParam.breedName = "";
              this.loadParam.employeeId = "";
              this.loadParam.employeeName = "";
              this.loadParam.startTime = "";
              this.loadParam.endTime = "";
              this.selectSearch();
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
                this.selectSearch();
            },
            orderCheck:function(id,index){ 
                this.auditParam.id = id;
                this.auditParam.index = index;
                this.auditParam.show = true;
                this.auditParam.title = '审核订单';
                this.auditParam.callback = this.applyBack;
            },
            orderSend:function(id,index){
                this.auditParam.id = id;
                this.auditParam.index = index;
                this.auditParam.show = true;
                this.auditParam.title = '审核发货订单';
                this.auditParam.callback = this.applyBack;
            },
            auditPass:function(){  //通过
                this.auditParam.validate = 1; 
                this.orderOrgAudit(this.auditParam);             
            },
            auditReject:function(){  //拒绝
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
    .base_pagination{
        position: fixed;
        bottom: 20px;
        padding-top: 50px;
    }
  </style>
