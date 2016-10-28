<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>订单搜索</h3>
        </div>
        <div class="edit-model">
             <div class="cover_loading">
                <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
             </div>
            <section class="editsection" v-cloak>
                <div class="clearfix">
                     <div class="client-detailInfo  col-xs-12">
                        <label>名称：</label>
                        <input type="text"  class="form-control" v-model="param.consignee"  placeholder="按收货人名称搜索"/>
                    </div>
                    <div class="client-detailInfo col-xs-12">
                        <label>联系方式：</label>
                        <input type="text"  class="form-control" v-model="param.consigneePhone"  placeholder="按收货人联系方式搜索"/>
                    </div>
                    <div class="client-detailInfo col-xs-12">
                        <label>订单流水号：</label>
                        <input type="text"  class="form-control" v-model="param.no"  placeholder="按订单流水号搜索"/>
                    </div>
                    <div class="client-detailInfo col-xs-6">
                        <label>订单类别</label>
                        <select class="form-control" v-model="param.type">
                            <option value="">请选择订单类别</option>
                            <option value="0">采购</option>
                            <option value="1">销售</option>
                        </select>
                    </div>
                    <div class="client-detailInfo col-xs-6">
                        <label>订单数据状态：</label>
                         <select v-model="param.orderStatus"  class="form-control">
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
                    </div>
                    <div class="client-detailInfo col-xs-6">
                        <label>支付方式：</label>
                         <select v-model="param.payWay"  class="form-control">
                                <option value="">请选择支付方式</option>
                                <option value="0">线下</option>
                                <option value="1">支付宝</option>
                                <option value="2">平安</option>
                                <option value="3">药款</option>
                        </select>
                    </div>
                    <div class="client-detailInfo col-xs-6">
                        <label>订单审核状态：</label>
                        <select v-model="param.dataStatus"  class="form-control">
                            <option value="">请选择数据状态</option>
                            <option value="0">无效</option>
                            <option value="1">待审</option>
                            <option value="2">审核通过</option>
                        </select>
                    </div>
                    <div class="client-detailInfo col-xs-6">
                        <label>客户端来源</label>
                        <select v-model="param.clients"  class="form-control">
                            <option value="">请选择客户端来源</option>
                            <option value="0">pc</option>
                            <option value="1">android</option>
                            <option value="2">wechart</option>
                            <option value="3">ios</option>
                        </select>
                    </div>
                    <div class="client-detailInfo col-xs-6">
                        <label>交易模式</label>
                        <select v-model="param.mode"  class="form-control">
                            <option value="">请选择交易模式</option>
                            <option value="1">撮合</option>
                            <option value="2">三方</option>
                            <option value="3">自营</option>
                        </select>
                    </div>
                    <div class="client-detailInfo col-xs-6" v-if="param.link='/order/'">
                        <label>下单时间开始：</label>
                        <mz-datepicker :time.sync="param.ctime" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                    <div class="client-detailInfo col-xs-6" v-else>
                        <label>下单时间开始：</label>
                        <mz-datepicker :time.sync="param.ctime" format="yyyy-MM-dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                    <div class="client-detailInfo col-xs-6" v-if="param.link='/order/'">
                        <label>下单时间结束：</label>
                        <mz-datepicker :time.sync="param.ftime" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                    <div class="client-detailInfo col-xs-6" v-else>
                        <label>下单时间结束：</label>
                        <mz-datepicker :time.sync="param.ftime" format="yyyy-MM-dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                    <div class="client-detailInfo col-xs-6">
                         <button type="button" class="btn btn-default" height="24" width="24" @click="resetTime()">清空</button> 
                    </div>
                </div>
            </section>
        </div>
        <div class="edit_footer">
            <button type="button" class="btn btn-default btn-close" @click="param.show = false">取消</button>
            <input type="button" class="btn  btn-confirm"  @click="clientSearch(param,param.show = false)" value="确定">
        </div>
    </div>
</template>
<script>
import calendar from '../calendar/vue.datepicker'
import {
   initOrderlist
} from '../../vuex/getters'
import {
    getOrderList,
    getEmpolyeeOrder,
    getOrgOrder
} from '../../vuex/actions'
export default {
    components: {
        calendar
    },
    props: ['param'],
    data() {
        return {
          loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
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
                mode:''
            }
        }
    },
    vuex: {
        getters: {
            initOrderlist
        },
        actions: {
            getOrderList,
            getEmpolyeeOrder,
            getOrgOrder
        }
    },
    methods:{
        clientSearch:function(){
            console.log(this.param)
            if(this.param.link=='/order/'){
                this.getOrderList(this.param);
            }
            if(this.param.link=='/order/myList'){
                this.getEmpolyeeOrder(this.param);
            }
            if(this.param.link=='/order/sectionList'){
                this.getOrgOrder(this.param);
            }
        },
        resetTime:function(){
            console.log(this.param)
            this.param.ctime = "";
            this.param.ftime = "";
            this.param.consigneePhone = "";
        }
    },
    route: {
        activate: function(transition) {
            console.log('hook-example activated!')
            transition.next()
        },
        deactivate: function(transition) {
            console.log('hook-example deactivated!')
            transition.next()
        }
    }
}
</script>
<style scoped>
.modal_con{
    width: 600px;
}
.top-title{
    position: absolute;
    width: 100%;
    top: 0;
}
.edit_footer{
    position: fixed;
    bottom: 20px;
    width: 600px;
}
.empSearch{
    position: absolute;
    right: 15px;
    top: 26px;
    width: 6%;
    height: 34px;
    cursor: pointer;
    border-left: 1px solid #ddd;
}
.empSearch >img{
    margin: auto;
    position: relative !important;
    vertical-align: middle;
}
.big-font {
    font-size: 36px;
}

.top-title span {
    font-size: 28px;
}

.edit-content {
    padding: 19px 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.edit-content h3 {
    font-size: 20px;
    color: #fa6705;
    margin: 0;
}

.edit-model {
    padding: 10px 30px 30px 30px;
}

.editsection {
    position:relative;
    width: 100%;
    box-sizing: border-box;
}

.editpage {
    display: -webkit-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -ms-box-orient: horizontal;
    box-orient: horizontal;
}

.editpageleft,
.editpageright {
129    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    width: 50%;
}

.editpage-input {
    margin-top: 15px;
}

.editlabel {
    color: #333;
    font-size: 14px;
    display: block;
}

.edit-input {
    height: 36px;
    line-height: 36px;
    width: 90%;
    border: 1px solid #ddd;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.edit-input:focus {
    border-color: #fa6705;
}
.client-detailInfo img{
    position: absolute;
    top: 6px;
}
</style>
