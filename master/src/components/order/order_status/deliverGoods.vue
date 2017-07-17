<!-- 发货组件，
    (1)销售单发货(走发货流程order/sendFlow)，国内订单只发国内物流，国际订单发国内和国际物流，国际物流为可选项
    (2)采购订单发货(不走发货流程order/send)
    以前的发货只是被注释了，代码还未删除，待测试通过后删除 -->
<template>
    <order-status :param="statusParam" v-if="statusParam.show">
        <div class="cover_loading">
            <pulse-loader :loading="deliverParam.loading||uploadLogistic.loading" :color="color" :size="size"></pulse-loader>
        </div>
        <!-- 订单采购发货上传物流信息 -->
        <div class="navbar-client" v-if="initOrderDetail.type==0">
            <validator name="purchase">
                <div class="message clearfix">
                    <p class="order-message">{{$t('static.logistics_info')}}</p>
                    <div class="clearfix col-md-6">
                        <span class="pull-left">{{$t('static.shipped_method')}}：</span>
                        <select v-model="uploadLogistic.way" class="form-control left">
                            <option value="0" selected>{{$t('static.thrid_logistics')}}</option>
                            <option value="1">{{$t('static.driver_self')}}</option>
                        </select>
                    </div>
                    <!-- 上传物流（第三方物流） -->
                    <div class="space_15 clearfix col-md-12" v-if="uploadLogistic.way==0">
                        <!-- 物流公司 -->
                        <div class="logical_color clearfix col-md-6">
                            <span class="pull-left">{{$t('static.logistics_company')}} <span class="system_danger" v-if="$purchase.logisticname.required">{{$t('static.required')}}</span></span>
                            <input type="text" v-model="uploadLogistic.b" v-show="false" v-validate:logisticname="{required:true}" />
                            <select v-model="uploadLogistic.b" class="form-control left">
                                <option v-for="item in initExpresslist" value="{{item.id + ',' + item.name+','+item.code}}">{{item.name}}{{item.code}}</option>
                            </select>
                        </div>
                        <!-- 物流单号 -->
                        <div class="logical_color clearfix col-md-6">
                            <span class="pull-left">{{$t('static.logistics_no')}} <span class="system_danger" v-if="$purchase.logisticno.required">{{$t('static.required')}}</span></span>
                            <input type="text" class="form-control left" placeholder="{{$t('static.willpay')}}" v-model="uploadLogistic.lcompanyNo" v-validate:logisticno="{required:true}" />
                        </div>
                        <!-- 上传图片 -->
                        <div class="logical_color col-md-12">
                            <label class="editlabel">{{$t('static.upload_logistcs')}}
                                <span class="system_danger" v-if="$purchase.img.required">{{$t('static.required')}}</span>
                            </label>
                            <input type="text" class="form-control left" v-show="false" v-model="uploadLogistic.images" v-validate:img="{required:true}" />
                            <div class="editpage-input clearfix" style="max-height:200px;overflow-y:auto;">
                                <press-image :value.sync="uploadLogistic.images" :type="type" :param="imageParam" style="float:left;width:15%"></press-image>
                            </div>
                        </div>
                    </div>
                    <!-- 司机信息（包车自运） -->
                    <div class="space_15 clearfix col-md-12" v-if="uploadLogistic.way==1">
                        <!-- 司机姓名 -->
                        <div class="logical_color clearfix col-md-6">
                            <span class="pull-left">{{$t('static.driver_name')}} <span class="system_danger" v-if="$purchase.drivername.required">{{$t('static.required')}}</span></span>
                            <input type="text" class="form-control left" placeholder="{{$t('static.driver_name')}}" v-model="uploadLogistic.driverName" v-validate:drivername="{required:true}" />
                        </div>
                        <!-- 司机身份证 -->
                        <div class="logical_color clearfix col-md-6">
                            <span class="pull-left">{{$t('static.ID_number')}} <span class="system_danger" v-if="$purchase.drivernumber.IdentityCard">{{$t('static.required')}}</span></span>
                            <input type="text" class="form-control left" placeholder="{{$t('static.ID_number')}}" v-model="uploadLogistic.driverPid" v-validate:drivernumber="['IdentityCard']" />
                        </div>
                        <!-- 司机电话 -->
                        <div class="logical_color clearfix col-md-6">
                            <span class="pull-left">{{$t('static.driver_phone')}} <span class="system_danger" v-if="$purchase.drivertel.phone">{{$t('static.required')}}</span></span>
                            <input type="tel" class="form-control left" placeholder="{{$t('static.driver_phone')}}" v-model="uploadLogistic.driverTel" v-validate:drivertel="['phone']" />
                        </div>
                        <!-- 车牌号 -->
                        <div class="logical_color clearfix col-md-6">
                            <span class="pull-left">{{$t('static.license_number')}} <span class="system_danger" v-if="$purchase.driverno.required">{{$t('static.required')}}</span></span>
                            <input type="text" class="form-control left" placeholder="{{$t('static.license_number')}}" v-model="uploadLogistic.vehicleNo" v-validate:driverno="{required:true}" />
                        </div>
                        <!-- 上传图片 -->
                        <div class="logical_color col-md-12">
                            <span class="editlabel">{{$t('static.upload_logistcs')}} <span class="system_danger" v-if="$purchase.img.required">{{$t('static.required')}}</span></span>
                            <input type="text" class="form-control left" v-show="false" v-model="uploadLogistic.images" v-validate:img="{required:true}" />
                            <div class="editpage-input clearfix" style="max-height:200px;overflow-y:auto;">
                                <press-image :value.sync="uploadLogistic.images" :type="type" :param="imageParam"></press-image>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 采购订单客户发货 -->
                <div class="clearfix logical_color">
                    <input type="button" class="btn  btn-confirm right" @click="accept()" v-if="$purchase.valid" value="{{$t('static.confirmation_delivery')}}" />
                    <input type="button" class="btn  btn-confirm right" v-else disabled="true" value="{{$t('static.confirmation_delivery')}}" />
                </div>
            </validator>
        </div>
        <!-- 订单销售发货上传物流信息 -->
        <div class="navbar-client" v-if="initOrderDetail.type==1">
            <validator name="sale">
                <div class="message clearfix">
                    <p class="order-message">{{$t('static.logistics_info')}}</p>
                    <!-- 国内物流发货方式  -->
                    <div v-if="initOrderDetail.intl == 1 || initOrderDetail.intl == 0" style="clear:both">
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
                                <input type="text" class="form-control left" v-show="false" v-model="salesLogistic.images" v-validate:img="{required:true}" />
                                <div class="editpage-input clearfix" style="max-height:200px;overflow-y:auto;" @click="selectImg(0)">
                                    <press-image :value.sync="salesLogistic.images" :type="type" :param="imageParam"></press-image>
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
                                <input type="text" class="form-control left" v-show="false" v-model="salesLogistic.images" v-validate:img1="{required:true}" />
                                <div class="editpage-input clearfix" style="max-height:200px;overflow-y:auto;" @click="selectImg(0)">
                                    <press-image :value.sync="salesLogistic.images" :type="type" :param="imageParam"></press-image>
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
                    <!-- 国际物流的发货方式-->
                    <div v-if="initOrderDetail.intl == 1" style="clear:both">
                        <p class="intl-title">{{$t('static.international_logistics')}}</p>
                        <!-- 选择发货方式 -->
                        <div class="clearfix col-md-6 intl">
                            <span class="pull-left">{{$t('static.shipped_method')}}：</span>
                            <select v-model="intlLogistic.way" class="form-control left">
                                <option value="2">国际快递</option>
                                <option value="4">{{$t('static.air_transport')}}</option>
                                <option value="3">{{$t('static.Ocean_Shipping')}}</option>
                            </select>
                        </div>
                        <!-- 国际快递 -->
                        <div class=" clearfix col-md-12 intl" v-if="intlLogistic.way==2">
                            <div class="logical_color clearfix col-md-6">
                                <span class="pull-left">国际快递<span class="system_danger" v-if="$sale.intlexpress.required">{{$t('static.required')}}</span></span>
                                <input type="text" v-model="intlLogistic.name" v-show="false" v-validate:intlexpress="{required:true}" />
                                <select class="form-control left" v-model="intlLogistic.name">
                                    <option>FEDEX</option>
                                    <option>DHL</option>
                                    <option>TNT</option>
                                    <option>UPS</option>
                                    <option>EMS</option>
                                </select>
                            </div>
                            <!-- 国际快递 -->
                            <div class="fedex">
                                <div class="logical_color clearfix col-md-6">
                                    <span class="pull-left">{{$t('static.Tracking_numbers')}}<span class="system_danger" v-if="$sale.expressnumber.required">{{$t('static.required')}}</span></span>
                                    <input type="text" class="form-control left" placeholder="{{$t('static.Tracking_numbers')}}" v-model="intlLogistic.number" v-validate:expressnumber="{required:true}" />
                                </div>
                                <!-- 上传图片 -->
                                <div class="logical_color col-md-12">
                                    <span class="editlabel">{{$t('static.upload_logistcs')}} </span>
                                    <input type="text" class="form-control left" v-show="false" />
                                    <div class="editpage-input clearfix" style="max-height:200px;overflow-y:auto;" @click="selectImg(1)">
                                        <press-image :value.sync="intlLogistic.images" :type="type" :param="imageParam"></press-image>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 空运 -->
                        <div class="ocean clearfix col-md-12 intl" v-if="intlLogistic.way==4">
                            <div class="logical_color clearfix col-md-6">
                                <span class="pull-left">{{$t('static.Air_freightWaybill')}}<span class="system_danger" v-if="$sale.airfreight.required">{{$t('static.required')}}</span></span>
                                <input type="text" class="form-control left" placeholder="{{$t('static.Air_freightWaybill')}}" v-model="intlLogistic.number" v-validate:airfreight="{required:true}" />
                            </div>
                            <!-- 上传图片 -->
                            <div class="logical_color col-md-12">
                                <span class="editlabel">{{$t('static.upload_logistcs')}} </span>
                                <input type="text" class="form-control left" v-show="false" />
                                <div class="editpage-input clearfix" style="max-height:200px;overflow-y:auto;" @click="selectImg(1)">
                                    <press-image :value.sync="intlLogistic.images" :type="type" :param="imageParam"></press-image>
                                </div>
                            </div>
                        </div>
                        <!-- 海运 -->
                        <div class="fly clearfix col-md-12 intl" v-if="intlLogistic.way==3">
                            <div class="logical_color clearfix col-md-6">
                                <span class="pull-left">{{$t('static.Ocean_bill')}}<span class="system_danger" v-if="$sale.billnumber.required">{{$t('static.required')}}</span></span>
                                <input type="text" class="form-control left" placeholder="{{$t('static.Ocean_bill')}}" v-model="intlLogistic.number" v-validate:billnumber="{required:true}" />
                            </div>
                            <div class="logical_color clearfix col-md-6">
                                <span class="pull-left">{{$t('static.Name_essel')}}<span class="system_danger" v-if="$sale.oceanname.required">{{$t('static.required')}}</span></span>
                                <input type="text" class="form-control left" placeholder="{{$t('static.Name_essel')}}" v-model="intlLogistic.name" v-validate:oceanname="{required:true}" />
                            </div>
                            <div class="logical_color clearfix col-md-6">
                                <span class="pull-left">{{$t('static.Ship_number')}}</span>
                                <input type="text" class="form-control left" placeholder="{{$t('static.Ship_number')}}" v-model="intlLogistic.vesselNo" />
                            </div>
                            <!-- 上传图片 -->
                            <div class="logical_color col-md-12">
                                <span class="editlabel">{{$t('static.upload_logistcs')}}</span>
                                <input type="text" class="form-control left" v-show="false" />
                                <div class="editpage-input clearfix" style="max-height:200px;overflow-y:auto;" @click="selectImg(1)">
                                    <press-image :value.sync="intlLogistic.images" :type="type" :param="imageParam"></press-image>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 销售订单发货 -->
                <div class="clearfix logical_color">
                    <input type="button" class="btn  btn-confirm right" @click="deliverGoods()" v-if="$sale.valid" value="{{$t('static.confirmation_delivery')}}" />
                    <input type="button" class="btn  btn-confirm right" v-else disabled="true" value="{{$t('static.confirmation_delivery')}}" />
                </div>
            </validator>
        </div>
    </order-status>
</template>
<script>
import orderStatus from '../orderStatusModel.vue'
import pressImage from '../../tools/upload/imagePressMul.vue'
import {
    initOrderDetail,
    initExpresslist,
} from '../../../vuex/getters'
import {
    getExpressList,
    orderStatu,
    orderDeliverGoods
} from '../../../vuex/actions'
export default {
    components: {
        orderStatus,
        pressImage
    },
    vuex: {
        getters: {
            initOrderDetail,
            initExpresslist
        },
        actions: {
            getExpressList,
            orderStatu,
            orderDeliverGoods
        }
    },
    props: {
        param: {

        },
    },
    data() {
        return {
            loadParam: {
                loading: true
            },
            statusParam: {
                show: true,
                tips: "财务核查通过，请等待卖家发货！",
                id: this.param.id,
                close: this.close
            },
            //最终传给后台的数据,采购订单的发货
            uploadLogistic: {
                loading: false,
                images: '',
                b: '',
                orderStatus: '',
                lcompanyId: '',
                lcompanyNo: '',
                id: this.param.id,
                show: true,
                link: '/order/send',
                way: 0,
                driverName: '',
                driverPid: '',
                driverTel: '',
                vehicleNo: '',
                key: this.param.key,
                code: '',
                name: '',
                callback: this.param.callback
            },
            //销售订单国内物流
            salesLogistic: {
                code: '',
                way: '',
                b: '',
                orderId: this.param.id,
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
            //销售订单国际物流
            intlLogistic: {
                way: '',
                number: '',
                name: '',
                vesselNo: '',
                images: ''
            },
            //最终传给后台的数据,销售订单的发货
            deliverParam: {
                loading: false,
                id: '',
                logisticses: [],
                link: '/order/sendflowSend',
                callback: this.param.callback,
                key: this.param.key
            },
            imageParam: {
                url: '/crm/api/v1/file/',
                qiniu: false
            },


        }
    },
    methods: {
        close: function() {
            this.param.show = false;
        },
        accept: function() { //采购发货，反正我不知道为什么会这么写？？
            this.orderStatu(this.uploadLogistic);
        },
        deliverGoods: function() { //销售发货
            let salesLogistic = {

            };
            let intlLogistic = {

            }

            if (this.salesLogistic.images) {
                salesLogistic.images = this.salesLogistic.images;
            }


            if (this.salesLogistic.orderId) {
                salesLogistic.orderId = this.salesLogistic.orderId;
            }

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
                salesLogistic.way = this.salesLogistic.way;
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
                salesLogistic.way = this.salesLogistic.way;

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
                salesLogistic.way = this.salesLogistic.way;
            }


            if (this.intlLogistic.way) {
                intlLogistic.way = this.intlLogistic.way;
            }
            if (this.intlLogistic.number) {
                intlLogistic.number = this.intlLogistic.number;
            }
            if (this.intlLogistic.name) {
                intlLogistic.name = this.intlLogistic.name;
            }
            if (this.intlLogistic.images) {
                intlLogistic.images = this.intlLogistic.images;
            }
            if (this.intlLogistic.vesselNo) {
                intlLogistic.vesselNo = this.intlLogistic.vesselNo;
            }

            if (this.intlLogistic) {

                intlLogistic.images = this.intlLogistic.images;
            }
            this.deliverParam.id = this.salesLogistic.orderId;

            if (this.intlLogistic.way == '') {
                this.deliverParam.logisticses = [
                    salesLogistic
                ]
            } else {
                this.deliverParam.logisticses = [
                    salesLogistic,
                    intlLogistic
                ];
            }

            this.orderDeliverGoods(this.deliverParam);

        },

    },
    events: {

    },
    created() {
        this.getExpressList(this.loadParam);
        this.statusParam.show = true;



    },


}
</script>
<style scoped>
.navbar-client {
    margin-bottom: 0;
    padding-top: 10px;
    background-color: #fff;
    padding: 0 20px;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    margin-top: 20px;
}
</style>
