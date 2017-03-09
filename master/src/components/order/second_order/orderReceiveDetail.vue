<template>
    <div>
        <picture-model :param="pictureParam" v-if="pictureParam.show"></picture-model>
        <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container modal_con" v-show="param.show" @click="param.show=false">
            <div @click="close()" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="cover_loading">
                <pulse-loader :loading="param.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <div class="client_nav">
                <nav class="navbar navbar-client" role="navigation">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <img class="navbar-img" src="/static/images/personPhoto.png" height="38" width="37" />
                            <span class="navbar-brand navbar-name" href="#">{{initReceiptDetail.customerName}}</span>
                        </div>
                    </div>
                </nav>
            </div>
            <section>
                <div class="client-section clearfix" @click.stop="">
                    <h4 class="section_title">{{$t('static.details')}}</h4>
                    <ul class="clearfix" style="margin-top:20px;font-size: 13px; white-space: normal;">
                        <li class="col-md-6 col-xs-6">{{$t('static.breed')}}：
                            <label>{{initReceiptDetail.orderDesc}}</li>
                        <li class="col-md-6 col-xs-6">{{$t('static.client_name')}}：
                            <label>{{initReceiptDetail.customerName}}</label>
                        </li>
                        <li class="col-md-6 col-xs-6">{{$t('static.client_phone')}}：
                            <label>{{initReceiptDetail.customerPhone}}</label>
                        </li>
                        <li class="col-md-6 col-xs-6">{{$t('static.pay_no')}}：
                            <label>{{initReceiptDetail.orderNo}}</label>
                        </li>
                        <li class="col-md-6 col-xs-6" v-if="param.url=='/order/contract/details/'">{{$t('static.contract_note')}}：
                            <label>{{initReceiptDetail.contractText}}</label>
                        </li>
                        <li class="col-md-6 col-xs-6" v-if="param.url=='/order/contract/details/'">{{$t('static.diferencia')}}：
                            <label>{{initReceiptDetail.adjusted}}</label>
                        </li>
                        <li class="col-md-6 col-xs-6">{{$t('static.comment')}}：
                            <label>{{initReceiptDetail.comment}}</label>
                        </li>
                        <li class="col-md-6 col-xs-6">{{$t('static.create_time')}}：
                            <label>{{initReceiptDetail.ctime | dateTime}}</label>
                        </li>
                    </ul>
                    <ul class="col-md-12  clearfix">
                        <li v-for="img in initReceiptDetail.images" class="navbar-img">
                            <img v-if="img | file" :src="img" alt="图片" height="100px" @click="bigPicture(img)" />
                            <a v-else href="{{img}}" download="" style="display: inline-block;width: 100px;margin-top: 10%"><img src="/static/images/{{$t('static.img_upload')}}.png" style="margin:auto" /></a>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import pictureModel
from '../../tips/pictureDialog'
import {
    initReceiptDetail
} from '../../../vuex/getters'
import {
    getReceiptDetail
} from '../../../vuex/actions'
export default {
    components: {
        pictureModel
    },
    data() {
        return {
            changeShow: true,
            pictureParam: {
                show: false
            }
        }
    },
    props: ['param'],
    vuex: {
        getters: {
            initReceiptDetail
        },
        actions: {
            getReceiptDetail
        }
    },
    methods: {
        close: function() {
            console.log(this.param)
            this.param.show = false;
        },
        bigPicture: function(item) {
            this.pictureParam.show = true;
            this.pictureParam.img = item;
        }
    },
    created() {
        this.getReceiptDetail(this.param);
    }
}
</script>
<style scoped>
.navbar-client {
    margin-bottom: 0;
    padding-top: 10px;
    background-color: #f5f5f5;
}

.modal_con {
    height: 600px;
}

.navbar-img {
    float: left;
    margin-right: 10px;
    margin-bottom: 5px;
}

.client-line {
    border-left: 1px solid #ddd;
}

.navbar-name {
    color: #fa6705;
    font-size: 20px;
}

.top-title {
    width: 800px;
    left: 0;
    right: 0;
    z-index: 1081;
}
</style>
