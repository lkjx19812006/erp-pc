<template>
     <detail-model :param="orderDetailParam" v-if="orderDetailParam.show"></detail-model>
     <record-model :param="recordParam" v-if="recordParam.show"></record-model>
     <audit-model :param="auditParam" v-if="auditParam.show"></audit-model>
     <tip-model :param="tipParam" v-if="tipParam.show"></tip-model>
     <send-detail :param="sendDetailParam" v-if="sendDetailParam.show"></send-detail>
     <deliver-model :param="deliverParam" v-if="deliverParam.show"></deliver-model>
	 <div class="employee clear" >
        <div class="employee_left col-md-8">
            <div class="employee_top" @click="freshLinecharts(getLinechart)">
                <a class="select_btn clear">
                    <span class="select_btn_person">个人业绩</span>
                    <span class="select_btn_img"><img src="/static/images/down_arrow.png" height="13" width="24" /></span>
                </a>
                <a class="select_btn">
                    <span class="select_btn_date">2016年7月</span>
                    <span class="select_btn_img"><img src="/static/images/down_arrow.png" height="13" width="24" /></span>
                </a>
            </div>
            <div class="employee_line">
                <div class="linechart" v-echarts="getLinechart.options" :loading="getLinechart.load"></div>
            </div>
            <div class="complete_rate">
                <span>个人业绩完成率</span>
                <a class="select_btn"  @click="freshPiecharts(getPiechart)"> 
                    <span class="select_btn_date">2016年7月</span>
                    <span class="select_btn_img"><img src="/static/images/down_arrow.png" height="13" width="24" /></span>
                </a>
            </div>
            <div class="pie_chart">
                 <div class="Piechart" v-echarts="getPiechart.options" :loading="getPiechart.load"></div>
            </div>
        </div>
        <div class="employee_right col-md-4">
            <p class="employee_right_title">消息
                <button class="btn btn-primary right" @click="refresh()">刷新</button>
            </p>
            <div class="employee_right_message">
                <div class="cover_loading">
                    <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                  </div>
                <div class="employee_message_view" v-for="item in initBacklogList">
                    <div class="message_view_left">
                         <span></span>
                         <p>{{item.taskDesc}}</p>
                         <time>2016-07-25 12:23:36</time>
                    </div>
                    <div class="message_view_right" v-if="item.bizType=='order_validate'">
                        <!-- <img src="/static/images/default_arrow.png" height="24" width="24"> -->
                        <a @click="showOrderDetail(item.bizId)">详情</a>
                        <a @click="showRecord(item)">记录</a>
                        <a v-if="item.taskKey!='employee_handle'" @click="showAudit(item)">审核</a>
                        <a v-else @click="showAudit(item)">重新申请</a>
                    </div>
                    <div class="message_view_right" v-if="item.bizType=='order_send'">
                        <a @click="orderSend(item.bizId)">详情</a>
                        <a @click="showRecord(item)">记录</a>
                        <a  v-if="item.taskKey=='order_send_governor_validate'"  @click="sendAudit(item)">审核</a>
                        <a v-if="item.taskKey=='order_send_warehouse_validate'"  @click="deliverGoods(item)">发货</a>
                        <a  v-if="item.taskKey=='order_send_employee_handle'"  @click="sendAudit(item)">重新申请</a>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import detailModel from '../components/order/orderDetail'
import recordModel from '../components/record/record'
import auditModel from '../components/tips/auditDialog'
import tipModel from '../components/tips/tipDialog'
import sendDetail from '../components/order/second_order/orderSendDetail'
import deliverModel from '../components/order/orderStatus'
import {
    getList,
    getLinechart,
    getPiechart,
    initBacklogList
} from '../vuex/getters'
import {
    freshLinecharts,
    freshPiecharts,
    getBacklogList,
    finishFlow
} from '../vuex/actions'
export default {
    components: {
        detailModel,
        recordModel,
        auditModel,
        tipModel,
        sendDetail,
        deliverModel
    },
    data() {
        return {
            loadParam: {
                loading: true,
                show:false,
                link:'/flow/',
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total:0
            },
            orderDetailParam:{
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
            deliverParam:{
                show:false,
                key:'myOrderList',
                id:'',
                orderStatus:'',
                contact:'',
                sendoff:false
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
            getLinechart,
            getPiechart,
            initBacklogList
        },
        actions: {
            freshLinecharts,
            freshPiecharts,
            getBacklogList,
            finishFlow
        },
    },
    methods:{
        showOrderDetail:function(id){
            this.orderDetailParam.id = id;
            this.orderDetailParam.show = true;
        },
        orderSend:function(id){
            this.sendDetailParam.id = id;
            this.sendDetailParam.show = true;
        },
        deliverGoods:function(item){
            this.deliverParam.id = item.bizId;
            this.deliverParam.show = true;
            this.deliverParam.sendoff = true;
            this.deliverParam.tips="财务核查通过，请等待卖家发货！";
            console.log(this.deliverParam)
        },
        showRecord:function(item){
            this.recordParam.bizType = item.bizType;
            this.recordParam.bizId = item.bizId;
            this.recordParam.show = true;
        },
        showAudit:function(item){
            if(item.taskKey=='employee_handle'){
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
        sendAudit:function(item){
            console.log(item)
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
            console.log(this.auditParam)
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
            this.getBacklogList(this.loadParam);
        },
        refresh:function(){
            this.getBacklogList(this.loadParam);
        }

    },
    created() {
        console.log("this.$store.state.table.login=====");
        console.log(this.$store.state.table.login.orgId);
        this.freshLinecharts();
        this.freshPiecharts();
        if (this.$route.query.id > this.getList[0].subcategory.length || isNaN(this.$route.query.id)||!this.$route.query.id) {
            this.$route.query.id = 0;
        }
        //获取待办事项
        this.getBacklogList(this.loadParam);
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
    }
}
</script>
<style scoped>
.employee {
    position: relative;
    padding: 25px 30px 0 40px;
    background: #fff;
}

.employee_left {
    position: relative;
    /* width: 950px; */
    border-right: 1px solid #ccc;
    padding-right: 30px;
}

.employee_right {
    float: left;
   /*  width: calc(100% - 1000px); */
}
.employee_right_title{
    color: #333;
    font-size:18px;
}
.employee_right_message{
    padding-top: 20px;
    border-top: 1px solid #ddd;
    white-space: nowrap;
}
.employee_message_view{
    position: relative;
    border: 1px solid #ddd;
    padding:10px 8px;
    border-radius: 8px;
    -webkit-border-radius: 8px;
    margin-bottom: 10px;
}
.message_view_left{
    color: #333;
    font-size: 16px;
}
.message_view_left span{
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
.message_view_left time{
    color: #999;
    font-size: 14px;
}
.message_view_right{
    position: absolute;
    right: 14px;
    top: 23px;
    vertical-align: middle;
}
.message_view_right a {
    font-size: 13px;
}
.employee_top{
    margin-bottom: 20px;
}
.employee_line {
    height: 420px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.linechart {
    width: 100%;
    height: 420px;
}

.select_btn {
    display: inline-block;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.select_btn_person,
.select_btn_date {
    display: inline-block;
    color: #333;
    font-size: 14px;
    float: left;
    padding: 5px 10px 5px 5px;
}

.select_btn_img {
    display: inline-block;
    text-align: center;
    margin-top: 12px;
    padding: 0 8px;
}
.pie_chart{
    width: 370px;
    height: 370px;
    text-align: center;
    margin: auto;
}
.Piechart{
    width: 100%;
    height: 100%;
}
</style>