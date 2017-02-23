  <template>
    <language-model v-show="false"></language-model>
    <orderdetail-model :param="orderDetailParam" v-if="orderDetailParam.show"></orderdetail-model>
    <senddetail-model :param="sendDetailParam" v-if="sendDetailParam.show"></senddetail-model>
    <receivedetail-model :param="receiveDetailParam" v-if="receiveDetailParam.show"></receivedetail-model>
    <record-model :param="recordParam" v-if="recordParam.show"></record-model>
    <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
    <deliver-model :param="deliverParam" v-if="deliverParam.show"></deliver-model>
    <tip-model :param="tipParam" v-if="tipParam.show"></tip-model>
    <mglist-model>

      <!-- 头部搜索 -->
      <div slot="top">

        <dl class="clear left transfer">
           <dt class="left transfer marg_top">任务状态：</dt>
           <div class="btn-group">
               <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.link=='/order/toDoOrderList'}" @click="selectLink('/order/toDoOrderList')">
                  待处理任务
               </button>
               <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.link==='/order/doneOrderList'}" @click="selectLink('/order/doneOrderList')">
                  已处理任务
               </button>
               
           </div>
        </dl>

        <dl class="clear left transfer">
           <dt class="left transfer marg_top">业务类型：</dt>
           <div class="btn-group">
               <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.processDefineKey==''}" @click="selectType('')">
                  {{$t('static.please_select')}}
               </button>
               <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.processDefineKey=='order_validate'}" @click="selectType('order_validate')">
                  订单审核
               </button>
               <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.processDefineKey==='order_send'}" @click="selectType('order_send')">
                  发货审核
               </button>
               <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.processDefineKey=='order_supplementary_contract'}" @click="selectType('order_supplementary_contract')">
                  补充合同审核
               </button>
               <button type="button" class="btn btn-default" v-bind:class="{ 'btn-warning': this.loadParam.processDefineKey==='order_after_sales'}" @click="selectType('order_after_sales')">
                  售后审核
               </button>
               
           </div>
        </dl>

        <dl class="clear left transfer">
            <div class="left">
                <dt class="left transfer marg_top">起止时间：</dt>
                <mz-datepicker :time.sync="loadParam.startTime" format="yyyy-MM-dd HH:mm:ss">
                </mz-datepicker>
            </div>

            <div class="left">
                <dt class="left marg_top">~~</dt>
                <mz-datepicker :time.sync="loadParam.endTime" format="yyyy-MM-dd HH:mm:ss">
                </mz-datepicker>
            </div>
        </dl>

        <button type="button" class="new_btn transfer"  @click="resetCondition()">{{$t('static.clear_all')}}</button>
                
        <button class="new_btn transfer" @click="selectSearch()">{{$t('static.search')}}</button>
      </div>
      <!-- 中间列表 -->
      <div slot="form">
          <div class="cover_loading">
              <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
          </div>
          <table class="table table-hover table_color table-striped " v-cloak id="tab">
            <thead>
                <tr>
                    <!-- <th><label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}"  @click="select()"></label></th> -->
                    <th>业务类型</th>
                    <th>任务阶段</th>
                    <th>任务描述</th>
                    <th>{{$t('static.create_time')}}</th>
                    
                    <th>{{$t('static.handle')}}</th> 
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in initToDoOrderlist"  v-cloak>
                  <!-- <td  @click.stop="">
                    <label v-if="item.validate<=0&&(item.orderStatus==0||item.orderStatus==70)" class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="onlyselected($index)"></label>
                  </td> -->
                  <td>
                    <div v-if="item.bizType=='order_validate'">订单审核</div>
                    <div v-if="item.bizType=='order_send'">发货审核</div>
                    <div v-if="item.bizType=='order_supplementary_contract'">补充合同审核</div>
                    <div v-if="item.bizType=='order_after_sales'">售后审核</div>
                  </td>
                  <td>
                    <!-- 订单审核 -->
                    <div v-if="item.taskKey=='governor_validate'">主管审核</div>
                    <div v-if="item.taskKey=='employee_handle'">业务员处理</div>
                    <div v-if="item.taskKey=='law_validate'">法务审核</div>
                    <div v-if="item.taskKey=='supply_validate'">供应部审核</div>
                    <div v-if="item.taskKey=='warehouse_validate'">仓库审核</div>
                    <div v-if="item.taskKey=='manager_validate'">经理审核</div>
                    <div v-if="item.taskKey=='financial_validate'">财务审核</div>
                    <!-- 发货审核-->
                    <div v-if="item.taskKey=='order_send_governor_validate'">主管审核</div>
                    <div v-if="item.taskKey=='order_send_employee_handle'">业务员处理</div>
                    <div v-if="item.taskKey=='order_send_warehouse_validate'">业务员/仓库发货</div>
                    <!-- 合同审核-->
                    <div v-if="item.taskKey=='supplementary_contract_governor_validate'">主管审核</div>
                    <div v-if="item.taskKey=='supplementary_contract_employee_handle'">补充合同修改</div>
                    <div v-if="item.taskKey=='supplementary_contract_refund'">退款</div>
                    <!-- 售后申请-->
                    <div v-if="item.taskKey=='after_sales_governor_validate'">主管审核</div>
                    <div v-if="item.taskKey=='after_sales_employee_handle'">业务员处理</div>
                    <div v-if="item.taskKey=='after_sales_receipt'">收货确认</div>
                    <div v-if="item.taskKey=='after_sales_disputed_handle'">收货异议处理</div>
                    <div v-if="item.taskKey=='after_sales_refund'">退货退款</div>
                    <div v-if="item.taskKey=='after_sales_resend'">重新发货</div>
                      
                  </td>
                  <td>{{item.taskDesc}}</td>
                  <td>{{item.date}}</td>

                  <td>
                      <div><a @click="showRecord(item)">记录</a></div>
                      <div><a @click="showDetail(item.bizId,item.bizType)">{{$t('static.details')}}</a></div>
                      <div v-if="item.bizType=='order_validate'&&loadParam.link=='/order/toDoOrderList'">
                          <a v-if="item.taskKey!='employee_handle'" @click="showAudit(item)">{{$t('static.review')}}</a>
                          <a v-else @click="showAudit(item)">{{$t('static.reapply')}}</a>
                      </div>
                      <div v-if="item.bizType=='order_send'&&loadParam.link=='/order/toDoOrderList'">
                          <a  v-if="item.taskKey=='order_send_governor_validate'"  @click="sendAudit(item)">{{$t('static.review')}}</a>
                          <a v-if="item.taskKey=='order_send_warehouse_validate'"  @click="deliverGoods(item)">发货</a>
                          <a  v-if="item.taskKey=='order_send_employee_handle'"  @click="sendAudit(item)">{{$t('static.reapply')}}</a>
                      </div>
                      <div v-if="item.bizType=='order_supplementary_contract'&&loadParam.link=='/order/toDoOrderList'">
                          <a v-if="item.taskKey=='supplementary_contract_governor_validate'" @click="receiveAudit(item)">合同审核</a>
                          <a v-if="item.taskKey=='supplementary_contract_employee_handle'"  @click="showAudit(item)">{{$t('static.reapply')}}</a>
                      </div>
                      <div v-if="item.bizType=='order_after_sales'&&loadParam.link=='/order/toDoOrderList'">
                          <a v-if="item.taskKey=='after_sales_governor_validate'" @click="showAudit(item)">售后审核</a>
                          <a v-if="item.taskKey=='after_sales_receipt'" @click="showAudit(item)">收货确认</a>
                          <a v-if="item.taskKey=='after_sales_resend'" @click="showAudit(item)">重新发货</a>
                          <a v-if="item.taskKey=='after_sales_employee_handle'" @click="showAudit(item)">{{$t('static.reapply')}}</a>
                          <a v-if="item.taskKey=='after_sales_disputed_handle'" @click="showAudit(item)">业务员异议处理</a>
                      </div>
                  </td>
                </tr>
            </tbody>
          </table>
      </div>
       <!-- 底部分页 -->
      <pagination :combination="loadParam"  slot="page"></pagination>
    </mglist-model>

  </template>
  <script>
    import orderdetailModel from '../order/orderDetail'
    import senddetailModel from '../order/second_order/orderSendDetail'
    import receivedetailModel from  '../order/second_order/orderReceiveDetail'
    import pagination from '../pagination'
    import filter from '../../filters/filters'
    import common from '../../common/common'
    import changeMenu from '../../components/tools/tabs/tabs.js'
    import mglistModel from '../mguan/mgListComponent.vue'
    import languageModel  from '../tools/language.vue'
    import recordModel from '../record/record'
    import deliverModel from '../order/orderStatus'
    import auditModel from '../tips/auditDialog'
    import tipModel from '../tips/tipDialog'
    import {
        getList,
        initToDoOrderlist,
        initLogin
    } from '../../vuex/getters'
    import {
        getToDoOrderList,
        alterOrder,
        createOrder,
        orderStatu,
        getOrderDetail,
        finishFlow
        
    } from '../../vuex/actions'
    export default {
        components: {
            orderdetailModel,
            senddetailModel,
            receivedetailModel,
            pagination,
            filter,
            mglistModel,
            languageModel,
            recordModel,
            deliverModel,
            auditModel,
            tipModel
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
                    total:0,
                    processDefineKey:'',
                    startTime:'',
                    endTime:'',
                    link:'/order/toDoOrderList',
                    //link:'/order/doneOrderList',
                    key:'toDoOrderList'
                },
                language:'',
                line_height:0,
                orderDetailParam: {
                    loading:true,
                    show:false,
                    key:'orderDetail',
                    id:'',
                    orderStatus:'',
                    contact:''
                },
                sendDetailParam:{
                    loading:true,
                    show:false,
                    key:'orderDetail',
                    id:'',
                    orderStatus:'',
                    contact:''
                },
                receiveDetailParam:{  //收货详情(合同和售后)
                    id:'',
                    show:false,
                    url:'',
                    loading:true
                },
                recordParam:{
                    loading:true,
                    link:'/flow/flowRecord',
                    bizType:'',
                    bizId:'',
                    show:false,
                },
                auditParam:{
                    loading:true,
                    show:false,
                    link:'/flow/',
                    title:'审核订单',
                    audit:true,
                    taskKey:'',
                    taskId:'',
                    result:'',
                    auditComment:'',
                    reject: this.reject,      //拒绝申请
                    pass:this.pass,       //通过申请
                    callback:this.callback,
                    sendPass:this.sendPass, //发货审核成功
                    sendRefuse:this.sendRefuse, //发货审核失败
                },
                deliverParam:{
                    show:false,
                    key:'myOrderList',
                    id:'',
                    orderStatus:'',
                    contact:'',
                    sendoff:false
                },
                tipParam:{
                    show:false,
                    alert:true,
                    name:"",
                }
                
            }
        },
        vuex: {
            getters: {
                getList,
                initToDoOrderlist,
                initLogin
            },
            actions: {
                getToDoOrderList,
                alterOrder,
                createOrder,
                orderStatu,
                getOrderDetail,
                finishFlow
            }
        },
        methods: {
            selectLink:function(link){
                this.loadParam.link = link;
                this.getToDoOrderList(this.loadParam);
            },
            selectType:function(type){
                this.loadParam.processDefineKey = type;
                this.getToDoOrderList(this.loadParam);
            },
            selectSearch:function(){
                this.getToDoOrderList(this.loadParam);
            },
            resetCondition:function(){
                this.loadParam.processDefineKey = '';
                this.loadParam.startTime = '';
                this.loadParam.endTime = '';
                this.getToDoOrderList(this.loadParam);
            },
            showRecord:function(item){
                this.recordParam.bizType = item.bizType;
                this.recordParam.bizId = item.bizId;
                this.recordParam.show = true;
            },
            showDetail:function(id,type){
                if(type=="order_validate"){
                   this.orderDetailParam.id = id;
                   this.orderDetailParam.show = true; 
                }
                if(type=="order_send"){
                   this.sendDetailParam.id = id;
                   this.sendDetailParam.show = true;
                }
                if(type=="order_supplementary_contract"){
                   this.receiveDetailParam.id = id;
                   this.receiveDetailParam.show = true;
                   this.receiveDetailParam.url='/order/contract/details/';
                }
                if(type=="order_after_sales"){
                   this.receiveDetailParam.id = id;
                   this.receiveDetailParam.show = true;
                   this.receiveDetailParam.url='/order/quality/after/sales/details/';
                }

            },
            showAudit:function(item){ //订单
                if(item.taskKey=='employee_handle'||item.taskKey=='supplementary_contract_employee_handle'){
                    this.auditParam.audit = false;
                    this.auditParam.title = '重新申请审核';
                }else{
                    this.auditParam.audit = true;
                    this.auditParam.title = '审核订单';
                }
                this.auditParam.taskKey = item.taskKey;
                this.auditParam.taskId = item.taskId;
                this.auditParam.show = true;
            },
            sendAudit:function(item){ //发货
                if(item.taskKey=='order_send_employee_handle'){
                    this.auditParam.audit = false;
                    this.auditParam.title = '重新申请审核';
                }else if(item.taskKey=='order_send_governor_validate'){
                    this.auditParam.audit = true;
                    this.auditParam.title = '审核发货申请';
                }else if(item.taskKey=='order_send_warehouse_validate'){
                    this.auditParam.audit = true;
                    this.auditParam.title = '发货';
                }
                this.auditParam.taskKey = item.taskKey;
                this.auditParam.taskId = item.taskId;
                this.auditParam.bizId = item.bizId;
                this.auditParam.show = true;
            },
            deliverGoods:function(item){
                this.deliverParam.id = item.bizId;
                this.deliverParam.show = true;
                this.deliverParam.sendoff = true;
                this.deliverParam.tips="财务核查通过，请等待卖家发货！";
                this.deliverParam.callback = this.callback;
            },
            receiveAudit:function(item){  //合同补充
                if(item.taskKey=='supplementary_contract_employee_handle'){
                    this.auditParam.audit = false;
                    this.auditParam.title = '重新申请审核';
                }else if(item.taskKey=='supplementary_contract_governor_validate'){
                    this.auditParam.audit = true;
                    this.auditParam.title = '审核补充合同';
                }
                this.auditParam.taskKey = item.taskKey;
                this.auditParam.taskId = item.taskId;
                this.auditParam.bizId = item.bizId;
                this.auditParam.show = true;
            },

            pass:function(){
                this.auditParam.result = 1;
                this.finishFlow(this.auditParam);
            },
            reject:function(){
                this.auditParam.result = 0;
                this.finishFlow(this.auditParam);
            },
            sendPass:function(){ //发货审核成功
                this.auditParam.result = 1;
                this.finishFlow(this.auditParam);
            },
            sendRefuse:function(){ //发货审核不通过
                this.auditParam.result = 0;
                this.finishFlow(this.auditParam);
            },
            callback:function(name){
                this.tipParam.show = true;
                this.tipParam.name = name;
                //审核完成后刷新页面
                this.getToDoOrderList(this.loadParam);
            },
            
            
        },
        
        events: {
            fresh: function(input) {
                this.loadParam.cur = input;
                this.getToDoOrderList(this.loadParam);
            }
        },
        filter:(filter,{}),
        ready(){
          common('tab','table_box',1);
        },
        created() {
            changeMenu(this.$store.state.table.isTop,this.getToDoOrderList,this.loadParam,localStorage.toDoOrderParam); 
            this.language = localStorage.lang;
        }
    }
  </script>
  <style scoped>
    .myOrder {
        width: 100%;
        white-space: nowrap;
    }
    .order_search {
        padding:35px 10px 0 10px;
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
    }
    #table_box table th,#table_box table td{
      width: 340px;
      min-width:340px;
    }
    .order_pagination{
        text-align: center;
    }
  </style>
