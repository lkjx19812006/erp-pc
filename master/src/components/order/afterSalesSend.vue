<template>
    <div>
        <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
        <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con client_body" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="order_contain">发货</div>
            <!-- <div class="navbar-client" style="margin-top:0">
                <div class="message">
                    <p class="order-message">{{$t('static.order_message')}}</p>
                    <p class="clearfix space_15">
                        <img src="/static/images/tips.png" height="30" width="30" class="left" />
                        <span class="tips">{{param.tips}}</span>
                    </p>
                </div>
            </div> -->
            <!-- 订单销售发货上传物流信息 -->
            <div class="navbar-client">
                <validator name="sale">
                    <div class="message clearfix">
                        <p class="order-message">{{$t('static.logistics_info')}}</p>
                        <!-- 国内物流发货方式  -->
                        <div style="clear:both">
                            <p class="intl-title">国内物流</p>
                            <!-- 选择发货方式 -->
                            <div class="clearfix col-md-6 intl">
                                <span class="pull-left">{{$t('static.shipped_method')}}：</span>
                                <select v-model="salesLogistic.way" class="form-control left">
                                    <option value="0" selected>{{$t('static.thrid_logistics')}}</option>
                                    <option value="1">{{$t('static.driver_self')}}</option>
                                    <option value="5">国内自提</option>
                                </select>
                            </div>
                            <!--第三方物流 -->
                            <div class=" clearfix col-md-12 intl" v-if="salesLogistic.way==0">
                                <!-- 物流公司 -->
                                <div class="logical_color clearfix col-md-6">
                                    <span class="pull-left">{{$t('static.logistics_company')}} <span class="system_danger" v-if="$sale.logisticname.required">{{$t('static.required')}}</span></span>
                                    <input type="text" v-model="salesLogistic.b" v-show="false" v-validate:logisticname="{required:true}" />
                                    <select v-model="salesLogistic.b" class="form-control left">
                                        <option v-for="item in initExpresslist" value="{{item.id + ',' + item.name +','+item.code}}">{{item.name}}{{item.code}}</option>
                                    </select>
                                </div>
                                <!-- 物流单号 -->
                                <div class="logical_color clearfix col-md-6">
                                    <span class="pull-left">{{$t('static.logistics_no')}} <span class="system_danger" v-if="$sale.logisticno.required">{{$t('static.required')}}</span></span>
                                    <input type="text" class="form-control left" placeholder="{{$t('static.willpay')}}" v-model="salesLogistic.number" v-validate:logisticno="{required:true}" />
                                </div>
                                <!-- 上传图片 -->
                                <div class="logical_color col-md-12">
                                    <span class="editlabel">{{$t('static.upload_logistcs')}} <span class="system_danger" v-if="$sale.img.required">{{$t('static.required')}}</span></span>
                                    <input type="text" class="form-control left" v-show="false" v-model="param.images" v-validate:img="{required:true}" />
                                    <div class="editpage-input clearfix" style="max-height:200px;overflow-y:auto;">
                                        <press-image :value.sync="param.images" :type="type" :param="imageParam"></press-image>
                                    </div>
                                </div>
                            </div>
                            <!-- 司机信息（包车自运） -->
                            <div class=" clearfix col-md-12 intl" v-if="salesLogistic.way==1">
                                <!-- 司机姓名 -->
                                <div class="logical_color clearfix col-md-6">
                                    <span class="pull-left">{{$t('static.driver_name')}} <span class="system_danger" v-if="$sale.drivername.required">{{$t('static.required')}}</span></span>
                                    <input type="text" class="form-control left" placeholder="{{$t('static.driver_name')}}" v-model="salesLogistic.driverName" v-validate:drivername="{required:true}" />
                                </div>
                                <!-- 司机身份证 -->
                                <div class="logical_color clearfix col-md-6">
                                    <span class="pull-left">{{$t('static.ID_number')}} <span class="system_danger" v-if="$sale.drivernumber.IdentityCard">{{$t('static.required')}}</span></span>
                                    <input type="text" class="form-control left" placeholder="{{$t('static.ID_number')}}" v-model="salesLogistic.driverPid" v-validate:drivernumber="['IdentityCard']" />
                                </div>
                                <!-- 司机电话 -->
                                <div class="logical_color clearfix col-md-6">
                                    <span class="pull-left">{{$t('static.driver_phone')}} <span class="system_danger" v-if="$sale.drivertel.phone">{{$t('static.required')}}</span></span>
                                    <input type="tel" class="form-control left" placeholder="{{$t('static.driver_phone')}}" v-model="salesLogistic.driverTel" v-validate:drivertel="['phone']" />
                                </div>
                                <!-- 车牌号 -->
                                <div class="logical_color clearfix col-md-6">
                                    <span class="pull-left">{{$t('static.license_number')}} <span class="system_danger" v-if="$sale.driverno.required">{{$t('static.required')}}</span></span>
                                    <input type="text" class="form-control left" placeholder="{{$t('static.license_number')}}" v-model="salesLogistic.vehicleNo" v-validate:driverno="{required:true}" />
                                </div>
                                <!-- 上传图片 -->
                                <div class="logical_color col-md-12">
                                    <span class="editlabel">{{$t('static.upload_logistcs')}} <span class="system_danger" v-if="$sale.img1.required">{{$t('static.required')}}</span></span>
                                    <input type="text" class="form-control left" v-show="false" v-model="param.images" v-validate:img1="{required:true}" />
                                    <div class="editpage-input clearfix" style="max-height:200px;overflow-y:auto;">
                                        <press-image :value.sync="param.images" :type="type" :param="imageParam"></press-image>
                                    </div>
                                </div>
                            </div>
                            <!-- 国内自提 -->
                            <div class=" clearfix col-md-12 intl" v-if="salesLogistic.way==5">
                                <!-- 自提人姓名 -->
                                <div class="logical_color clearfix col-md-6">
                                    <span class="pull-left">{{$t('static.name')}} <span class="system_danger" v-if="$sale.sinecename.required">{{$t('static.required')}}</span></span>
                                    <input type="text" class="form-control left" placeholder="{{$t('static.name')}}" v-model="salesLogistic.driverName" v-validate:sinecename="{required:true}" />
                                </div>
                                <!-- 自提人电话 -->
                                <div class="logical_color clearfix col-md-6">
                                    <span class="pull-left">联系方式 <span class="system_danger" v-if="$sale.sinecetel.required">{{$t('static.required')}}</span></span>
                                    <input type="tel" class="form-control left" placeholder="联系方式" v-model="salesLogistic.driverTel" v-validate:sinecetel="{required:true}" />
                                </div>
                                <!-- 身份证 -->
                                <div class="logical_color clearfix col-md-6">
                                    <span class="pull-left">{{$t('static.ID_number')}} </span>
                                    <input type="text" class="form-control left" placeholder="{{$t('static.ID_number')}}" v-model="salesLogistic.driverPid" />
                                </div>
                                <!-- 自提备注 -->
                                <div class="logical_color clearfix col-md-6">
                                    <span class="pull-left">{{$t('static.comment')}} </span>
                                    <!--  <input type="tel" class="form-control left" placeholder="{{$t('static.comment')}}" v-model="salesLogistic.description"  /> -->
                                    <textarea class="form-control left" v-model="salesLogistic.description"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix logical_color">
                        <input type="button" class="btn  btn-confirm right" @click="deliverGoods(-2)" v-if="$sale.valid" value="拒绝发货" />
                        <input type="button" class="btn  btn-confirm right" @click="deliverGoods(2)" v-if="$sale.valid" value="{{$t('static.confirmation_delivery')}}" />
                        <input type="button" class="btn  btn-confirm right" v-else disabled="true" value="{{$t('static.confirmation_delivery')}}" />
                    </div>
                </validator>
            </div>
        </div>
    </div>
</template>
<script>
import pressImage from '../tools/upload/imagePressMul.vue'
import logisticsModel from '../order/logisticsDetail'
import alertModel from '../tips/tipDialog'
import pictureModel from '../tips/pictureDialog'

import {
    initExpresslist,
    initOrderDetail,
    initLogin
} from '../../vuex/getters'
import {
    getOrderDetail,
    orderCancle,
    orderStatu,
    yankuanPayorder,
    getExpressList,
    alterOrder,
    logisticsInfo,
    orderReceive,
    getEmpolyeeOrder,
    applyContract,
    afterSalesApply,
    afterSalesSend
} from '../../vuex/actions'
export default {
    components: {

        pressImage,
        logisticsModel,
        alertModel,
        pictureModel,

    },
    props: ['param'],
    data() {
        return {
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                key: 'orderDetail',
            },

            imageParam: {
                url: '/crm/api/v1/file/',
                qiniu: false
            },
            pictureParam: {
                show: false,
                img: ''
            },

            salesLogistic: { //国内物流
                code: '',
                way: '',
                b: '',
                number: '',
                images: '',
                driverName: '',
                driverPid: '',
                driverTel: '',
                vehicleNo: '',
                name: '',
                logistics: '',
                description: ''
            },


            tipParam: {
                show: false,
                alert: true,
                name: ''
            },

        }
    },

    vuex: {
        getters: {
            initExpresslist,
            initOrderDetail,
            initLogin
        },
        actions: {
            getOrderDetail,
            orderCancle,
            orderStatu,
            yankuanPayorder,
            getExpressList,
            alterOrder,
            logisticsInfo,
            orderReceive,
            getEmpolyeeOrder,
            applyContract,
            afterSalesApply,
            afterSalesSend
        }
    },
    methods: {

        clickBig: function(img) {
            this.pictureParam.show = true;
            this.pictureParam.img = img;
        },



        deliverGoods: function(validate) { //发货
            this.param.validate = validate;
            let salesLogistic = {};

            if (this.salesLogistic.way == 0) { // 第三方物流
                if (this.salesLogistic.b) {
                    var delArr = this.salesLogistic.b.split(",");
                    salesLogistic.logistics = delArr[0];
                    salesLogistic.name = delArr[1];
                    salesLogistic.code = delArr[2];
                }
                if (this.salesLogistic.number) {
                    salesLogistic.number = this.salesLogistic.number;
                }
            }

            if (this.salesLogistic.way == 1) { //包车自运
                if (this.salesLogistic.driverName) {
                    salesLogistic.driverName = this.salesLogistic.driverName;
                }

                if (this.salesLogistic.vehicleNo) {
                    salesLogistic.vehicleNo = this.salesLogistic.vehicleNo;
                }
                if (this.salesLogistic.driverPid) {
                    salesLogistic.driverPid = this.salesLogistic.driverPid;
                }
                if (this.salesLogistic.driverName) {
                    salesLogistic.driverName = this.salesLogistic.driverName;
                }
                if (this.salesLogistic.driverTel) {
                    salesLogistic.driverTel = this.salesLogistic.driverTel;
                }

            }

            if (this.salesLogistic.way == 5) { //国内自提
                if (this.salesLogistic.driverName) {
                    salesLogistic.driverName = this.salesLogistic.driverName;
                }

                if (this.salesLogistic.driverTel) {
                    salesLogistic.driverTel = this.salesLogistic.driverTel;
                }
                if (this.salesLogistic.driverPid) {
                    salesLogistic.driverPid = this.salesLogistic.driverPid;
                }
                if (this.salesLogistic.description) {
                    salesLogistic.description = this.salesLogistic.description;
                }

            }

            salesLogistic.way = this.salesLogistic.way;
            this.param.logisticsInfo = salesLogistic;

            this.afterSalesSend(this.param);

        },

        deliverCallback: function(title) {
            this.tipParam.show = true;
            this.tipParam.name = title;
        }


    },
    events: {

    },
    created() {
        this.getExpressList(this.loadParam);


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
