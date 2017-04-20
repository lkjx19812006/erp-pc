<template>
    <div>
        <cancle-model :param="cancleReason" v-if="cancleReason.show"></cancle-model>
        <alert-model :param="tipParam" v-if="tipParam.show"></alert-model>
        <undeline-model :param="undelinePay" v-if="undelinePay.show"></undeline-model>
        <logistics-model :param="logisticsDetail" v-if="logisticsDetail.show"></logistics-model>
        <editorder-model :param="editorder" v-if="editorder.show"></editorder-model>
        <contract-model :param="contractParam" v-if="contractParam.show"></contract-model>
        <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
        <saleapply-model :param="applicationParam" v-if="applicationParam.show"></saleapply-model>
        <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con client_body" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="order_contain">{{$t('static.order_status')}}</div>
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
                <!-- 处理订单0 -->
                <div class="clearfix logical_color" v-if="param.handle">
                    <input type="button" class="btn  btn-confirm right" @click="accept({
                    id:initOrderDetail.id,
                    show:true,
                    orderStatus:'',
                    link:'/order/handle',
                    key:param.key,
                    images:''
                   },param.show=false)" value="{{$t('static.take_order')}}" />
                    <button type="button" class="btn btn-default btn-close right" @click="cancleBtn({
                    id:initOrderDetail.id,
                    cancleCauses:'',
                    show:true,
                    reason:true,
                    headline:'取消订单原因',
                    orderStatus:'',
                    link:'/order/cancle',
                    key:param.key,
                    callback:cancel
                  })">{{$t('static.cancel_order')}}</button>
                </div>
                <!-- 订单确认10 -->
                <div class="clearfix logical_color" v-if="param.sales">
                    <input type="button" class="btn  btn-confirm right" @click="confirmEdit({
                        id:initOrderDetail.id,
                        show:true,
                        orderStatus:'',
                        link:'/order/confirm',
                        key:param.key,
                        images:'',
                       },param.show=false)" value="{{$t('static.confirm')}}" />
                    <button type="button" class="btn btn-default btn-close right" @click="param.show = false">{{$t('static.cancel')}}</button>
                </div>
                <!-- 订单财务审核 -->
                <div class="clearfix logical_color" v-if="param.Auditing">
                    <div class="clearfix">
                        <img v-for="item in initOrderDetail.payPics.arr" class="col-xs-3" v-bind:src="item.url" />
                    </div>
                    <input type="button" class="btn  btn-confirm right" @click="accept({
                    id:initOrderDetail.id,
                    show:true,
                    link:'/order/payConfirm',
                    key:param.key,
                    orderStatus:'',
                    images:'',
                    sub:$index
                   },param.show=false)" value="{{$t('static.pass_checked')}}" />
                    <button type="button" class="btn btn-default btn-close right" @click="param.show = false">{{$t('static.cancel')}}</button>
                </div>
            </div>
            <!-- 订单确认支付 -->
            <div class="navbar-client" v-if="param.confirmReceipt">
                <div class="clearfix logical_color">
                    <input type="button" class="btn  btn-confirm right" @click="accept({
                    id:initOrderDetail.id,
                    show:true,
                    link:'/order/payConfirm',
                    key:param.key,
                    orderStatus:'',
                    images:'',
                    sub:$index
                    }),param.show = false" value="{{$t('static.confirm_accept')}}" />
                    <button type="button" class="btn btn-default btn-close right" @click="param.show = false">{{$t('static.cancel')}}</button>
                </div>
            </div>
            <!-- 订单支付成功 -->
            <div class="navbar-client" v-if="param.payment">
                <div class="message clearfix">
                    <p class="order-message">{{$t('static.payment_method')}}</p>
                    <div class="space_15 clearfix">
                        <div class="col-xs-6 clearfix" @click="paychoice(3)">
                            <img src="/static/images/checked.png" v-if="yaokuanPaySelected" height="25" width="25" class="left margin-10" />
                            <img src="/static/images/unchecked.png" height="25" width="25" class="left margin-10" v-else/>
                            <img src="/static/images/drugs.png" height="39" width="50" class="left margin-10" />
                            <p>
                                <span>{{$t('static.yaokuan')}}</span>
                                <br>
                                <span>{{$t('static.recommend_drugs')}}</span>
                            </p>
                        </div>
                        <div class="col-xs-6 clearfix" @click="paychoice(0)">
                            <img src="/static/images/checked.png" v-if="undelinePaySelect" height="25" width="25" class="left margin-10" />
                            <img src="/static/images/unchecked.png" height="25" width="25" class="left margin-10" v-else/>
                            <img src="/static/images/alipay.png" height="37" width="61" class="left margin-10" />
                            <p>
                                <span>{{$t('static.line_down')}}</span>
                                <br>
                                <span>{{$t('static.recommend_line')}}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="clearfix logical_color">
                    <input type="button" class="btn  btn-confirm right" @click="payOrder({
                    id:initOrderDetail.id,
                    show:true,
                    link:'/order/pay',
                    key:param.key,
                    payWay:'',
                    orderStatus:'',
                    images:'',
                    callback:underPay
                    })" value="{{payName}}" />
                    <button type="button" class="btn btn-default btn-close right" @click="param.show = false">{{$t('static.cancel')}}</button>
                </div>
            </div>
            <!-- 订单采购发货上传物流信息 -->
            <div class="navbar-client" v-if="param.sendoff&&initOrderDetail.type==0">
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
                    <div class="clearfix logical_color">
                        <input type="button" class="btn  btn-confirm right" @click="accept(uploadLogistic,param.show=false)" v-if="$purchase.valid" value="{{$t('static.confirmation_delivery')}}" />
                        <input type="button" class="btn  btn-confirm right" v-else disabled="true" value="{{$t('static.confirmation_delivery')}}" />
                    </div>
                </validator>
            </div>
            <!-- 订单销售发货上传物流信息 -->
            <div class="navbar-client" v-if="param.sendoff&&initOrderDetail.type==1">
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
                    <div class="clearfix logical_color">
                        <input type="button" class="btn  btn-confirm right" @click="deliverGoods()" v-if="$sale.valid" value="{{$t('static.confirmation_delivery')}}" />
                        <input type="button" class="btn  btn-confirm right" v-else disabled="true" value="{{$t('static.confirmation_delivery')}}" />
                    </div>
                </validator>
            </div>
            <!-- 订单确认收货以及查看物流 -->
            <div class="navbar-client" v-if="param.delivery">
                <div class="message clearfix">
                    <p class="order-message">{{$t('static.logistics_info')}}</p>
                    <div class="space_15 clearfix">
                        <div class="logical_color">
                            <span>{{$t('static.logistics_company')}}：{{initOrderDetail.logisticses.arr[0].name}}</span>
                        </div>
                        <div class="logical_color">
                            <span>{{$t('static.logistics_no')}}：{{initOrderDetail.logisticses.arr[0].number}}</span>
                        </div>
                        <div class="logical_color clearfix">
                            <p>{{$t('static.logistics')}}：</p>
                            <div v-for="item in initOrderDetail.sendPics.arr">
                                <img v-if="item.url | file" class="picture" v-bind:src="item.url" width="150px" @click="clickBig(item.url)" />
                                <a v-else style="width: 109px;display: inline-block;white-space: normal;" href="{{item.url}}" download="">{{$t('static.file_down')}}</a>
                            </div>
                        </div>
                    </div>
                    <div class="order_info clearfix">
                        <input type="button" class="btn  btn-confirm right" @click="accept({
                            id:param.id,
                            show:true,
                            orderStatus:'',
                            link:'/order/receiveConfirm',
                            key:param.key
                          },param.show=false)" value="{{$t('static.confirm_receipt')}}" />
                        <input type="button" class="btn  btn-confirm right margin-10" @click="Viewlogistics({
                            id:initOrderDetail.logisticses.arr[0].id,
                            lcompanyId:initOrderDetail.logisticses.arr[0].logistics,
                            lcompanyCode:initOrderDetail.logisticses.arr[0].code,
                            number:initOrderDetail.logisticses.arr[0].number,
                            show:true,
                            loading:true,
                            callback:logisticsInfo
                            })" value="{{$t('static.view_logistics')}}" />
                    </div>
                </div>
            </div>
            <!-- 买家订单等待收货查看物流 -->
            <div class="navbar-client" v-if="param.express&&initOrderDetail.logisticses.arr[0].way!==1">
                <div class="message clearfix">
                    <p class="order-message">{{$t('static.logistics_info')}}</p>
                    <div class="space_15 clearfix">
                        <div class="logical_color">
                            <span>{{$t('static.logistics_company')}}：{{initOrderDetail.logisticses.arr[0].name}}</span>
                        </div>
                        <div class="logical_color">
                            <span>{{$t('static.logistics_no')}}：{{initOrderDetail.logisticses.arr[0].number}}</span>
                        </div>
                        <div class="logical_color clearfix">
                            <p>{{$t('static.logistics')}}：</p>
                            <div v-for="item in initOrderDetail.sendPics.arr">
                                <img v-if="item.url | file" class="picture" v-bind:src="item.url" width="150px" @click="clickBig(item.url)" />
                                <a v-else href="{{item.url}}" style="width: 109px;display: inline-block;white-space: normal;" download="">{{$t('static.non_image')}}</a>
                            </div>
                            <!-- <img class="picture" v-for="item in initOrderDetail.sendPics.arr" v-bind:src="item.url" width="150px" @click="clickBig(item.url)" /> -->
                        </div>
                    </div>
                    <div class="order_info clearfix">
                        <input type="button" class="btn  btn-confirm right" @click="accept({
                            id:param.id,
                            show:true,
                            orderStatus:'',
                            link:'/order/receiveConfirm',
                            key:param.key
                          },param.show=false)" value="{{$t('static.condirm_receive')}}" />
                        <input type="button" class="btn  btn-confirm right margin-10" @click="Viewlogistics({
                              id:initOrderDetail.logisticses.arr[0].id,
                              lcompanyId:initOrderDetail.logisticses.arr[0].logistics,
                              lcompanyCode:initOrderDetail.logisticses.arr[0].code,
                              number:initOrderDetail.logisticses.arr[0].number,
                              key:param.key,
                              show:true,
                              loading:true,
                              callback:logisticsInfo
                              })" value="{{$t('static.view_logistics')}}" />
                    </div>
                </div>
            </div>
            <!-- 买家订单等待收货查看物流（司机自运） -->
            <div class="navbar-client" v-if="param.express&&initOrderDetail.logisticses.arr[0].way==1">
                <div class="message clearfix">
                    <p class="order-message">{{$t('static.logistics_info')}}</p>
                    <div class="space_15 clearfix">
                        <div class="logical_color col-md-6">
                            <span>{{$t('static.driver_name')}}：{{initOrderDetail.logisticses.arr[0].driverName}}</span>
                        </div>
                        <div class="logical_color col-md-6">
                            <span>{{$t('static.ID_number')}}：{{initOrderDetail.logisticses.arr[0].driverPid}}</span>
                        </div>
                        <div class="logical_color col-md-6">
                            <span>{{$t('static.driver_phone')}}：{{initOrderDetail.logisticses.arr[0].driverTel}}</span>
                        </div>
                        <div class="logical_color col-md-6">
                            <span>{{$t('static.license_number')}}：{{initOrderDetail.logisticses.arr[0].vehicleNo}}</span>
                        </div>
                        <div class="logical_color clearfix col-md-12">
                            <p>{{$t('static.logistics')}}：</p>
                            <div v-for="item in initOrderDetail.sendPics.arr">
                                <img v-if="item.url | file" class="picture" v-bind:src="item.url" width="150px" @click="clickBig(item.url)" />
                                <a v-else style="width: 109px;display: inline-block;white-space: normal;" href="{{item.url}}" download="">{{$t('static.file_down')}}</a>
                            </div>
                        </div>
                    </div>
                    <div class="order_info clearfix">
                        <input type="button" class="btn  btn-confirm right" @click="accept({
                    id:param.id,
                    show:true,
                    orderStatus:'',
                    link:'/order/receiveConfirm',
                    key:param.key
                  },param.show=false)" value="确认客户收货" />
                    </div>
                </div>
            </div>
            <!-- 销售订单等待评价 -->
            <div class="navbar-client" v-if="param.estimate&&(initOrderDetail.logistics==3||initOrderDetail.logistics==2)">
                <div class="clearfix logical_color">
                    <button type="button" class="btn btn-success margin-10 right" @click="satisfied({
               id:param.id,
               show:true,
               link:'/order/quality/qualified',
               key:param.key
              })">{{$t('static.confirm')}}</button>
                    <!-- <button type="button" class="btn btn-info margin-10 right"  @click="addContract({
                show:true,
                orderId:param.id,
                total:initOrderDetail.total,
                adjusted:'',
                comment:'',
                contractText:'',
                url:'/order/quality/contract/start',
                link:applyContract,
                titles:'订单补充合同',
                images:'',
              })">补充合同</button>
            <button type="button" class="btn btn-warning margin-10 right"  @click="afterSales({
                show:true,
                orderId:param.id,
                consignee:'',
                comment:'',
                shipper:'',
                type:'',
                url:'/order/quality/after/sales/start',
                link:afterSalesApply,
                titles:'售后申请',
                images:'',
              })">售后申请</button> -->
                    <button type="button" class="btn btn-default btn-close right" @click="param.show = false">{{$t('static.cancel')}}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import cancleModel from '../order/cancleMsg'
import undelineModel from '../order/uploadPayment'
import contractModel from '../order/second_order/contractItems'
import pressImage from '../tools/upload/imagePressMul.vue'
import logisticsModel from '../order/logisticsDetail'
import editorderModel from '../order/ordergoods'
import alertModel from '../tips/tipDialog'
import pictureModel from '../tips/pictureDialog'
import saleapplyModel from '../order/second_order/afterSalesApply'
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
    orderDeliverGoods
} from '../../vuex/actions'
export default {
    components: {
        cancleModel,
        undelineModel,
        pressImage,
        logisticsModel,
        editorderModel,
        alertModel,
        contractModel,
        pictureModel,
        saleapplyModel
    },
    props: ['param'],
    data() {
        return {
            changeShow: true,
            loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                key: 'orderDetail',
                id: this.param.id
            },
            myOrderParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                show: false,
                cur: 1,
                all: 1,
                link: '/order/myList',
                key: 'myOrderList',
                employee: this.initLogin.id,
                org: this.initLogin.orgId,
                total: 0,
                method: 0
            },
            cancleReason: {
                show: false,
                key: this.param.key
            },
            undelinePaySelect: false,
            yaokuanPaySelected: false,
            undelinePay: {
                show: false,
                images: '',
                callback: '',
                id: '',
                link: '',
                payWay: '',
                orderStatus: '',
                key: this.param.key
            },
            payorder: {
                show: false,
                key: this.param.key
            },
            imageParam: {
                url: '/crm/api/v1/file/',
                qiniu: false
            },
            pictureParam: {
                show: false,
                img: ''
            },
            logisticsDetail: {
                show: false,
                key: this.param.key
            },
            editorder: {
                show: false,
                key: this.param.key
            },
            payName: "去支付/To pay",
            type: "",
            uploadLogistic: {
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
                name: ''
            },
            salesLogistic: {
                code: '', //国内物流
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
            intlLogistic: { //国际物流
                way: '',
                number: '',
                name: '',
                vesselNo: '',
                images: ''
            },
            imgType: null,
            deliverParam: {
                id: '',
                logisticses: [],
                link: '/order/sendflowSend',
                callback: this.deliverCallback,
                key: this.param.key
            },
            tipParam: {
                show: false,
                alert: true,
                name: ''
            },
            contractParam: {
                show: false
            },
            applicationParam: {
                show: false
            }
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
            orderDeliverGoods
        }
    },
    methods: {
        cancleBtn: function(cancle) {
            console.log(cancle)
            this.cancleReason = cancle;
            this.param.reason = true;
            /*this.orderCancle(this.cancleReason)*/
        },
        clickBig: function(img) {
            this.pictureParam.show = true;
            this.pictureParam.img = img;
        },
        cancel: function() {
            this.orderCancle(this.cancleReason, this.param);
        },
        satisfied: function(checkout) { //收货
            this.param.show = false;
            checkout.callback = this.param.callback;
            this.orderReceive(checkout);
        },
        addContract: function(contract) {
            this.contractParam.show = true;
            this.contractParam = contract;
            this.contractParam.callback = this.contractCallback;
        },
        afterSales: function(sales) {
            this.applicationParam.show = true;
            this.applicationParam = sales;
            this.applicationParam.callback = this.contractCallback;
        },
        accept: function(confirm) {
            confirm.callback = this.param.callback;
            this.orderStatu(confirm);
        },
        deliverGoods: function() { //发货
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
        selectImg: function(param) { //将上传的图片分别付给不同的变量
            this.imgType = param;
            console.log(this.imgType+"哈哈哈")
        },
        deliverCallback: function(title) {
            this.tipParam.show = true;
            this.tipParam.name = title;
        },
        confirmEdit: function(confirm) {
            confirm.callback = this.param.callback;
            this.orderStatu(confirm)
        },
        orderEdit: function(edit) {
            this.editorder = edit;
        },
        Viewlogistics: function(logistics) {
            this.logisticsDetail = logistics;
            this.logisticsInfo(this.logisticsDetail)
        },
        paychoice: function(payWay) {
            this.payWay = payWay;
            if (payWay == 0) {
                this.undelinePaySelect = true; //线下
                this.yaokuanPaySelected = false;
                this.payName = "申请审核";
            } else if (payWay == 3) {
                this.yaokuanPaySelected = true; //药款
                this.undelinePaySelect = false;
                this.payName = "去支付/To pay";
            }
        },
        payOrder: function(payorder) {
            payorder.payWay = this.payWay;
            console.log(payorder.payWay)

            if (payorder.payWay == 0) { //线下打款
                this.undelinePay = payorder;
                console.log(payorder)
                this.$broadcast('getImageData');
            } else if (payorder.payWay == 3) { //药款支付
                payorder.callback = this.param.callback;
                this.yankuanPayorder(this.param, payorder);
            } else {
                this.tipParam.show = true;
                this.tipParam.name = '请选择支付方式/Select order status';
                this.tipParam.alert = true;
            }
        },
        underPay: function() {
            this.yankuanPayorder(this.param, this.undelinePay);
        },
        checkCallback: function(title) {
            this.tipParam.show = true;
            this.tipParam.name = title;
            this.getEmpolyeeOrder(this.myOrderParam);
        },
        contractCallback: function(title) {
            this.tipParam.show = true;
            this.tipParam.alert = true;
            this.tipParam.name = title;
            this.param.show = false;
            this.getEmpolyeeOrder(this.myOrderParam);
        }
    },
    events: {
        getImageData: function(imageData) {
            var paths = new Array();
            this.param.path = imageData.result.path;
        },
        getFiles: function(files) {


        }
    },
    created() {
        this.getExpressList(this.loadParam);
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
