<template>
    <div>
        <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click="close()" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="client_nav">
                <validator name="validation">
                    <div class="message clearfix">
                        <p class="order-message">{{$t('static.logistics_info')}}</p>
                        <div class="clearfix col-md-6">
                            <span class="pull-left">{{$t('static.shipped_method')}}：</span>
                            <select v-model="param.way" class="form-control left" @change="clickSwitch()">
                                <option value="0" selected>{{$t('static.thrid_logistics')}}</option>
                                <option value="1">{{$t('static.driver_self')}}</option>
                            </select>
                        </div>
                        <!-- 上传物流 -->
                        <div class="space_15 clearfix col-md-12" v-if="param.way==0" style="padding:0">
                            <div class="logical_color clearfix col-md-6">
                                <span class="pull-left">{{$t('static.logistics_company')}} <span class="system_danger" v-if="$validation.logisticname.required">{{$t('static.required')}}</span></span>
                                <input type="text" v-model="salesLogistic.b" v-show="false" v-validate:logisticname="{required:true}" />
                                <select v-model="salesLogistic.b" class="form-control left">
                                    <option v-for="item in initExpresslist" value="{{item.id + ',' + item.name +','+item.code}}">{{item.name}}{{item.code}}</option>
                                </select>
                            </div>
                            <div class="logical_color clearfix col-md-6">
                                <span class="pull-left">{{$t('static.logistics_no')}} <span class="system_danger" v-if="$validation.logisticno.required">{{$t('static.required')}}</span></span>
                                <input type="number" class="form-control left" placeholder="{{$t('static.willpay')}}" v-model="param.number" v-validate:logisticno="{required:true}" />
                            </div>
                        </div>
                        <!-- 司机信息 -->
                        <div class="space_15 clearfix col-md-12" v-if="param.way==1" style="padding:0">
                            <div class="logical_color clearfix col-md-6">
                                <span class="pull-left">{{$t('static.driver_name')}} <span class="system_danger" v-if="$validation.drivername.required">{{$t('static.required')}}</span></span>
                                <input type="text" class="form-control left" placeholder="请输入司机姓名" v-model="param.driverName" v-validate:drivername="{required:true}" />
                            </div>
                            <div class="logical_color clearfix col-md-6">
                                <span class="pull-left">{{$t('static.ID_number')}} <span class="system_danger" v-if="$validation.drivernumber.IDCard">{{$t('static.required')}}</span></span>
                                <input type="text" class="form-control left" placeholder="请输入司机身份证号" v-model="param.driverPid" v-validate:drivernumber="['IDCard']" />
                            </div>
                            <div class="logical_color clearfix col-md-6">
                                <span class="pull-left">{{$t('static.driver_phone')}} <span class="system_danger" v-if="$validation.drivertel.phone">{{$t('static.required')}}</span></span>
                                <input type="tel" class="form-control left" placeholder="请输入司机联系方式" v-model="param.driverTel" v-validate:drivertel="['phone']" />
                            </div>
                            <div class="logical_color clearfix col-md-6">
                                <span class="pull-left">{{$t('static.license_number')}} <span class="system_danger" v-if="$validation.driverno.required">{{$t('static.required')}}</span></span>
                                <input type="text" class="form-control left" placeholder="请输入车牌号" v-model="param.vehicleNo" v-validate:driverno="{required:true}" />
                            </div>
                        </div>
                        <div class="logical_color col-md-12">
                            <span class="editlabel">{{$t('static.logistics')}} <span class="system_danger" v-if="$validation.img1.required">{{$t('static.required')}}</span></span>
                            <input type="text" class="form-control left" v-show="false" v-model="param.image_f" v-validate:img1="{required:true}" />
                            <div class="clearfix">
                                <press-image :value.sync="param.image_f" :type="type" :param="imageParam"></press-image>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix order_info">
                        <input type="button" class="btn  btn-confirm right" @click="accept(param)" v-if="$validation.valid" value="{{$t('static.confirmation_delivery')}}" />
                        <input type="button" class="btn  btn-confirm right" v-else disabled="true" value="{{$t('static.confirmation_delivery')}}" />
                        <input type="button" class="btn  btn-confirm right" style="margin-right:10px;" @click="param.show=false" value="{{$t('static.cancel')}}" />
                    </div>
                </validator>
            </div>
        </div>
    </div>
</template>
<script>
import pressImage from '../../tools/upload/imagePressMul'
import {
    initExpresslist
} from '../../../vuex/getters'
import {
    getExpressList,
    afterResend
} from '../../../vuex/actions'
export default {
    components: {
        pressImage
    },
    data() {
        return {
            type: "image/jpeg,image/jpg,image/png",
            imageParam: {
                url: '/crm/api/v1/file/',
                qiniu: false
            },
            changeShow: true,
            salesLogistic: {
                b: '',
            }
        }
    },
    props: ['param'],
    vuex: {
        getters: {
            initExpresslist
        },
        actions: {
            getExpressList,
            afterResend
        }
    },
    methods: {
        close: function() {
            this.param.show = false;
        },
        clickSwitch: function() {
            if (this.param.way == 0) {
                this.param.driverName = '';
                this.param.driverPid = '';
                this.param.driverTel = '';
                this.param.vehicleNo = '';
            } else if (this.param.way == 1) {
                this.salesLogistic.b = ''
                this.param.number = '';
            }
        },
        accept: function() {
            this.param.show = false;
            var strs = this.salesLogistic.b.split(",");
            this.param.logistics = strs[0];
            this.param.name = strs[1];
            this.param.code = strs[2];
            this.param.validate = 2;
            console.log(this.param)
            this.afterResend(this.param)
        },
    },
    created() {
        this.getExpressList(this.param)
    }
}
</script>
<style scoped>
.modal_con {
    max-height: 600px;
}

.order-message {
    border-bottom: 1px solid #ddd;
    line-height: 45px;
    font-size: 16px;
    text-align: center;
    color: #fa6705;
}

.top-title {
    right: 0;
    position: absolute;
}

.order_info {
    border-top: 1px solid #ddd;
    padding: 10px 20px;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
}

.space_15 {
    margin: 15px 0;
}
</style>
