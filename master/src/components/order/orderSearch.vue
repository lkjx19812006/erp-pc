<template>
    <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div @click="param.show=false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
        <div class="edit-content">
            <h3>{{$t('static.search')}}</h3>
        </div>                                                                                
        <div class="edit-model">
             <div class="cover_loading">
                <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
             </div>
            <section class="editsection" v-cloak>
                <div class="clearfix">
                     <div class="client-detailInfo  col-xs-12">
                        <label>{{$t('static.consignee_name')}}：</label>
                        <input type="text"  class="form-control" v-model="param.consignee"  placeholder="{{$t('static.enter_name')}}"/>
                    </div>
                    <div class="client-detailInfo col-xs-12">
                        <label>{{$t('static.consignee_phone')}}：</label>
                        <input type="text"  class="form-control" v-model="param.consigneePhone"  placeholder="{{$t('static.enter_phone')}}"/>
                    </div>
                    <div class="client-detailInfo col-xs-12">
                        <label>{{$t('static.order_no')}}：</label>
                        <input type="text"  class="form-control" v-model="param.no"  placeholder="{{$t('static.enter_orderno')}}"/>
                    </div>
                    <div class="client-detailInfo col-xs-6">
                        <label>{{$t('static.order_type')}}</label>
                        <select class="form-control" v-model="param.type">
                            <option value="">{{$t('static.select_order_type')}}</option>
                            <option value="0">{{$t('static.purchase')}}</option>
                            <option value="1">{{$t('static.sell')}}</option>
                        </select>
                    </div>
                    <div class="client-detailInfo col-xs-6">
                        <label>{{$t('static.order_status')}}：</label>
                         <select v-model="param.orderStatus"  class="form-control">
                            <option value="">{{$t('static.select_order_status')}}</option>
                            <option value="0">{{$t('static.order_generation')}}</option>
                            <!-- <option value="10">{{$t('static.pending')}}</option> -->
                            <option value="20">{{$t('static.wait_for_payment')}}</option>
                            <option value="30">{{$t('static.wait_for_audit')}}</option>
                            <option value="40">{{$t('static.wait_for_delivery')}}</option>
                            <option value="50">{{$t('static.wait_for_receiving')}}</option>
                            <option value="60">{{$t('static.awaiting_comment')}}</option>
                            <option value="70">{{$t('static.completed')}}</option>
                            <option value="-1">{{$t('static.canceled')}}</option>
                            <option value="-2">{{$t('static.out_of_date')}}</option>
                        </select>
                    </div>
                    <div class="client-detailInfo col-xs-6">
                        <label>{{$t('static.payment_method')}}：</label>
                         <select v-model="param.payWay"  class="form-control">
                            <option value="">{{$t('static.select_payment_method')}}</option>
                            <option value="0">{{$t('static.offline')}}</option>
                            <option value="1">{{$t('static.alipay')}}</option>
                            <option value="2">{{$t('static.pingan')}}</option>
                            <option value="3">{{$t('static.yaokuan')}}</option>
                        </select>
                    </div>
                    <!-- <div class="client-detailInfo col-xs-6">
                        <label>{{$t('static.order_validity')}}：</label>
                        <select v-model="param.dataStatus"  class="form-control">
                            <option value="">{{$t('static.select_order_validity')}}</option>
                            <option value="0">{{$t('static.available')}}</option>
                            <option value="1">{{$t('static.useless')}}</option>
                        </select>
                    </div> -->
                    <div class="client-detailInfo col-xs-6">
                        <label>{{$t('static.client_source')}}：</label>
                        <select v-model="param.clients"  class="form-control">
                            <option value="">{{$t('static.select_client_source')}}</option>
                            <option value="0">PC</option>
                            <option value="1">Android</option>
                            <option value="2">Wechat</option>
                            <option value="3">IOS</option>
                        </select>
                    </div>
                    <div class="client-detailInfo col-xs-6">
                        <label>{{$t('static.trading_patterns')}}：</label>
                        <select v-model="param.mode"  class="form-control">
                            <option value="">{{$t('static.select_trading_patterns')}}</option>
                            <option value="1">{{$t('static.together')}}</option>
                            <option value="2">{{$t('static.three_side')}}</option>
                            <option value="3">{{$t('static.self_support')}}</option>
                        </select>
                    </div>
                    <div class="client-detailInfo col-xs-6" v-if="param.link=='/order/'">
                        <label>{{$t('static.stime')}}：</label>
                        <mz-datepicker :time.sync="param.ctime" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                    <div class="client-detailInfo col-xs-6" v-else>
                        <label>{{$t('static.stime')}}：</label>
                        <mz-datepicker :time.sync="param.ctime" format="yyyy-MM-dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                    <div class="client-detailInfo col-xs-6" v-if="param.link=='/order/'">
                        <label>{{$t('static.endtime')}}：</label>
                        <mz-datepicker :time.sync="param.ftime" format="yyyy/MM/dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                    <div class="client-detailInfo col-xs-6" v-else>
                        <label>{{$t('static.endtime')}}：</label>
                        <mz-datepicker :time.sync="param.ftime" format="yyyy-MM-dd HH:mm:ss">
                        </mz-datepicker>
                    </div>
                    <div class="client-detailInfo pull-right col-xs-6">
                         <button type="button" class="btn btn-default" height="24" width="24" @click="resetTime()">{{$t('static.clear_all')}}</button>
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
         
        }
    },
    vuex: {
        getters: {

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
            this.param.consignee = "";
            this.param.orderStatus="";
            this.param.dataStatus="";
            this.param.no="";
            this.param.mode="";
            this.param.type="";
            this.param.clients="";
            this.param.payWay="";
        }
    },
    created(){

    }
}
</script>
<style scoped>
.modal_con{
    width: 600px;
    bottom: 125px
}
.top-title{
    position: fixed;
    width: 600px;
    top: 91px;
    margin: auto;
    left: 0;
    right: 0;
}
.edit_footer{
    width: 600px;
    bottom: 125px
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
