<template>
    <div>
        <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
        <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="edit-content">
                <h3 v-if="param.times==0">{{$t('static.International_intention_inquiry')}}</h3>
                <h3 v-if="param.times>0">{{$t('static.intl_require')}}</h3>
            </div>
            <validator name="validation">
                <div class="edit-model">
                    <section class="editsection" v-cloak>
                        <div class="editpage">
                            <input type="hidden" class="form-control edit-input" value="{{param.id}}" />
                            <div class="editpageleft">
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.inquire_type')}} <span class="system_danger" v-if="$validation.type.required">{{$t('static.required')}}</span></label>
                                    <input type="text" v-show="false" v-model="param.inquireType" class="form-control edit-input" v-validate:type="{required:true}" />
                                    <select class="form-control edit-input" v-model="param.inquireType">
                                        <option>FOB</option>
                                        <option>CIF</option>
                                        <option>EXW</option>
                                        <option>FCA</option>
                                        <option>FAS</option>
                                        <option>CPT</option>
                                        <option>CFR</option>
                                        <option>CIP</option>
                                        <option>DAT</option>
                                        <option>DAP</option>
                                        <option>DDP</option>
                                        <option>FEDEX</option>
                                        <option>DHL</option>
                                        <option>UPS</option>
                                        <option>TNT</option>
                                        <option>EMS</option>
                                        <option>Post Office-by Sea</option>
                                        <option>Post Office-by Air</option>
                                        <option>E-Post</option>
                                        <option>Border Trade</option>
                                        <option>other</option>
                                    </select>
                                </div>
                                <!-- 目的港口 -->
                                <div class="editpage-input" v-if="param.inquireType=='CIF'||param.inquireType=='FCA'||param.inquireType=='FAS'||param.inquireType=='CPT'||param.inquireType=='CFR'||param.inquireType=='CIP'||param.inquireType=='DAT'||param.inquireType=='DAP'||param.inquireType=='DDP'||param.inquireType=='Border Trade'">
                                    <label class="editlabel">{{$t('static.destination')}} <span class="system_danger" v-if="$validation.destination.required">{{$t('static.required')}}</span></label>
                                    <input type="text" v-validate:destination="{required:true}" v-model='param.port' class="form-control edit-input" />
                                </div>
                                <!-- 邮编 -->
                                <div class="editpage-input" v-if="param.inquireType=='FEDEX'||param.inquireType=='DHL'||param.inquireType=='UPS'||param.inquireType=='TNT'||param.inquireType=='EMS'||param.inquireType=='Post Office-by Sea'||param.inquireType=='Post Office-by Air'||param.inquireType=='E-Post'||param.inquireType=='other'||param.inquireType=='Border Trade'">
                                    <label class="editlabel">{{$t('static.postcodes')}} <span class="system_danger" v-if="$validation.postcode.required">{{$t('static.required')}}</span></label>
                                    <input type="text" v-validate:postcode="{required:true}" v-model='param.postcode' class="form-control edit-input" />
                                </div>
                                <div class="editpage-input" v-if="param.inquireType=='FOB'||param.inquireType=='EXW'">
                                    <label class="editlabel">{{$t('static.destination')}} </label>
                                    <input type="text" v-model='param.port' class="form-control edit-input" />
                                </div>
                                <div class="editpage-input">
                                    <label class="editlabel">{{$t('static.comment')}}</label>
                                    <textarea v-model='param.comment' class="form-control" style="width:100%;overflow:auto;word-break:break-all" rows="5" placeholder="you can choose by sea or by air"></textarea>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="edit_footer">
                    <button type="button" class="btn btn-default btn-close" @click="param.show=false">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" v-show="false">{{$t('static.confirm')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="confirm()">{{$t('static.confirm')}}</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.confirm')}}</button>
                </div>
            </validator>
        </div>
    </div>
</template>
<script>
import tipsdialogModel from '../tips/tipDialog'
import {
    intlIntentionInquire
} from '../../vuex/actions'
export default {
    components: {
        tipsdialogModel
    },
    props: ['param'],
    data() {
        return {
            tipsParam: {
                show: false,
                confirm: true,
                name: "",
                callback: ''
            }
        }
    },
    vuex: {
        actions: {
            intlIntentionInquire
        }
    },
    methods: {
        confirm: function() {
            this.param.show = false;
            this.intlIntentionInquire(this.param);
        },

    },
    created() {
        console.log(this.param)
        if (this.param.destination && this.param.destination !== '' && this.param.destination !== 'undefined') {
            this.param.port = this.param.destination;
        }

    }

}
</script>
<style scoped>
.modal {
    z-index: 1085;
}

.modal_con {
    z-index: 1086;
    width: 400px;
    height: 445px;
    top: 0;
}

.edit_footer {
    position: absolute;
    bottom: 0px;
    width: 400px;
}

.top-title {
    width: 100%;
    position: absolute;
    top: 0;
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
    font-size: 15px;
    color: #fa6705;
    margin: 0;
}

.edit-model {
    overflow: hidden;
    overflow-y: auto;
    padding: 10px 30px 30px 30px;
}

.editsection {
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
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    width: 50%;
}

.editlabel {
    color: #333;
    font-size: 14px;
    display: block;
}

.edit-input {
    height: 36px;
    line-height: 36px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
}

.edit-input:focus {
    border-color: #fa6705;
}

.addblack span {
    color: #333;
    font-size: 14px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
}

.btn-confirm {
    background-color: #fa6705;
    color: #fff;
}

.btn-close {
    color: #fa6705;
}

.editpage_img {
    width: 90%;
}

.editpage_img img {
    display: inline-block;
    background: #ccc;
}

.editpage-image {
    display: inline-block;
}
</style>
