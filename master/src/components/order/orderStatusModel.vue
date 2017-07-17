<template>
    <div>
        <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con client_body" v-show="param.show">
            <div @click="param.close" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="order_contain">{{$t('static.order_status')}}1</div>
            <div class="navbar-client" style="margin-top:0">
                <div class="message">
                    <p class="order-message">{{$t('static.order_message')}}</p>
                    <p class="clearfix space_15">
                        <img src="/static/images/tips.png" height="30" width="30" class="left" />
                        <span class="tips">{{param.tips}}</span>
                    </p>
                </div>
            </div>
            <div class="navbar-client">
                <div class="message clearfix">
                    <p class="order-message">{{$t('static.order_info')}}</p>
                    <div class="space_15 clearfix">
                        <div class="left message_front" style="margin-top:5px;">{{$t('static.order_no')}}：{{initOrderDetail.no}}</div>
                        <div class="left message_front"><img src="/static/images/contacter.png" height="30" width="23" class="left" /><span class="tips">{{$t('static.consignee')}}：{{initOrderDetail.consignee}} | {{initOrderDetail.consigneePhone}}</span></div>
                        <div class="left message_front"><img src="/static/images/address.png" class="left" height="34" width="24" /><span class="tips">{{$t('static.consignee_address')}}：{{initOrderDetail.consigneeAddr}}</span></div>
                    </div>
                </div>
                <div class="order_info clearfix">
                    <div class="col-xs-8 pull-left clearfix">
                        <div class="col-xs-3 col-md-4 pull-left" style="white-space: normal;" v-for="item in initOrderDetail.goods.arr">
                            <p style="font-weight:700">{{item.breedName}}</p>
                            <p>{{item.price}}元/{{item.unit | Unit}}</p>
                            <p>{{$t('static.quantity')}}：{{item.number}}</p>
                            <p>{{$t('static.order_time')}}：{{item.ctime}}</p>
                        </div>
                    </div>
                    <div class="col-xs-4 pull-left" style="padding-left:10%;border-left: 1px solid #ddd;">
                        <div>
                            <label>{{$t('static.sundry_fees')}}：</label><span style="color:#fa6705">¥{{initOrderDetail.incidentals}}</span>
                            <br>
                            <label>{{$t('static.fee_explain')}}：</label><span style="color:#fa6705">{{initOrderDetail.incidentalsDesc}}</span>
                            <br>
                            <label>{{$t('static.preferential')}}：</label><span style="color:#fa6705">¥{{initOrderDetail.preferential}}</span>
                            <br>
                            <label>{{$t('static.discount_note')}}：</label><span style="color:#fa6705">{{initOrderDetail.preferentialDesc}}</span>
                        </div>
                        <p><span style="color:#fa6705">{{$t('static.total')}}：¥{{initOrderDetail.total.toFixed(2)}}</span></p>
                    </div>
                </div>
            </div>
            <slot></slot>
            <div style="margin-bottom:10px"></div>
        </div>
    </div>
</template>
<script>
import {
    initOrderDetail,
    initLogin
} from '../../vuex/getters'
import {
    getOrderDetail,

} from '../../vuex/actions'
export default {
    components: {

    },
    props: ['param'],
    data() {
        return {

            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                key: 'orderDetail',
                id: this.param.id
            },



        }
    },

    vuex: {
        getters: {
            initOrderDetail,
            initLogin
        },
        actions: {
            getOrderDetail,


        }
    },
    methods: {


    },
    events: {

    },
    created() {
        this.getOrderDetail(this.loadParam);

    }
}
</script>
<style scoped>
.client_body {
    background-color: #f5f5f5;
}

.modal {
    z-index: 1090;
}

.modal_con {
    z-index: 1090;
    width: 60%;
}

.intl-title {
    width: 150px;
    margin-left: 15px;
    margin-bottom: 5px;
    padding: 15px 10px 2px 0;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
}

.intl {
    margin-left: 30px
}

.top-title {
    position: fixed;
    right: 0;
    width: 60%;
    margin: auto;
    left: 0;
}

.order_contain {
    text-align: center;
    padding: 20px 0 20px 0;
    font-size: 16px;
}

.logical_color {
    margin: 10px 0;
}

.logical_color input {
    border: 1px solid #ddd;
}

.logical_color select {
    border: 1px solid #ddd;
}

.picture {
    float: left;
    width: 150px;
    margin-right: 15px;
}

.navbar-client {
    margin-bottom: 0;
    padding-top: 10px;
    background-color: #fff;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    margin-top: 20px;
}

.btn-confirm {
    margin-right: 10px;
}

.order-message {
    border-bottom: 1px solid #ddd;
    line-height: 45px;
    font-size: 14px;
}

.message_front {
    width: 33.33%;
}

.edit-input {
    width: 30%;
}

.tips {
    margin-left: 13px;
    margin-top: 5px;
    display: inline-block;
    white-space: normal;
}

.btn-close,
.margin-10 {
    margin-right: 10px;
}

.btn-base {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #003077;
    margin-right: 5px;
    font-size: 14px;
}

.space_15 {
    margin: 15px 0;
}

.order_info {
    border-top: 1px solid #ddd;
    padding: 20px 0;
}
</style>
