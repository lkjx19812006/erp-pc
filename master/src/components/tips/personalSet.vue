<template>
    <div>
        <div class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container del_modal_con" v-show="param.show">
            <div class="model-header">
                <validator name="validation">
                    <form novalidate>
                        <h4>{{$t('static.personal_info')}}
                            <span v-if="param.weixinId" style="color:#19be6b">（已绑定微信）</span>
                            <span v-else style="color:red">（未绑定微信）</span>
                        </h4>
                        <div class="edit-model">
                            <div class="clearfix">
                                <div>
                                    <div class="clearfix col-md-6 col-xs-6" style="padding:0">
                                        <div class="client-detailInfo  col-md-12" style="height:150px;padding-bottom:0">
                                            <label>{{$t('static.photo')}}</label>
                                            <press-image :value.sync="param.image_f" :showurl.sync="param.photo" :type.sync="param.fileType" :param="imageParam" style="width:120px" v-if="param.photo!==''"></press-image>
                                            <press-image :value.sync="param.image_f" :showurl.sync="param.image_f_show" :type.sync="param.fileType" :param="imageParam" style="width:120px" v-else></press-image>
                                        </div>
                                    </div>
                                    <div class="clearfix col-md-6  col-xs-6" style="padding:0">
                                        <div class="client-detailInfo  col-md-12 col-xs-12">
                                            <label>{{$t('static.name')}}</label>
                                            <input type="text" class="form-control" v-model="param.name" readonly="true" />
                                        </div>
                                        <div class="client-detailInfo  col-md-12 col-xs-12">
                                            <label>{{$t('static.sex')}}</label>
                                            <select class="form-control" v-model="param.gender">
                                                <option value="0">{{$t('static.female')}}</option>
                                                <option value="1">{{$t('static.male')}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="client-detailInfo  col-md-6 col-xs-12">
                                    <label>{{$t('static.cellphone')}} <span class="system_danger" v-if="$validation.phone.phone">{{$t('static.validate_cellphone')}}</span></label>
                                    <input type="email" class="form-control" v-model="param.mobile" v-validate:phone="['phone']" />
                                </div>
                                <div class="client-detailInfo  col-md-6 col-xs-12">
                                    <label>{{$t('static.landline')}}</label>
                                    <input type="text" class="form-control" v-model="param.extno" />
                                </div>
                                <div class="client-detailInfo  col-md-6 col-xs-12">
                                    <label>QQ <span class="system_danger" v-if="$validation.chat.qq">{{$t('static.validate_qq')}}</span></label>
                                    <input type="text" class="form-control" v-validate:chat="['qq']" v-model="param.qq" />
                                </div>
                                <!-- <div class="client-detailInfo  col-md-6 col-xs-12">
                                <label>{{$t('static.wechat')}} <span class="system_danger" v-if="$validation.wechart.wechart">{{$t('static.validate_wechat')}}</span></label>
                                <input type="text" class="form-control" v-validate:wechart="['wechart']" v-model="param.wechat" />
                                </div> -->
                                <div class="client-detailInfo  col-md-6 col-xs-12">
                                    <label>{{$t('static.client_email')}} <span class="system_danger" v-if="$validation.email.email">{{$t('static.enter_email')}}</span></label>
                                    <input type="text" class="form-control" v-validate:email="['email']" v-model="param.email" />
                                </div>
                                <div class="client-detailInfo  col-md-12  col-xs-12">
                                    <label>擅长领域 </label>
                                    <textarea class="textarea" type="text" rows="5" v-model="param.goodfield"></textarea>
                                </div>
                            </div>
                            <div class="edit_footer">
                                <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                                <button type="button" class="btn btn-confirm" v-if="$validation.valid" @click="confirm(param)">{{$t('static.save')}}</button>
                                <button type="button" class="btn btn-confirm" v-else v-else disabled="disabled">{{$t('static.save')}}</button>
                            </div>
                        </div>
                    </form>
                </validator>
            </div>
        </div>
    </div>
</template>
<script>
import pressImage from '../imagePress'
import {
    initLogin
} from '../../vuex/getters'
import {
    updateEmploy
} from '../../vuex/actions'
export default {
    props: ['param'],
    components: {
        pressImage
    },
    vuex: {
        getters: {
            initLogin
        },
        actions: {
            updateEmploy
        }
    },
    data() {
        return {
            imageParam: {
                url: '/crm/api/v1/file/',
                qiniu: false
            },
            type: "image/*"
        }
    },
    methods: {
        confirm: function(param) {
            param.show = false;
            this.updateEmploy(param);
        }
    },
    events: {
        getImageData: function(imageData) {
            var paths = new Array();
            this.param.path = imageData.result.path;
        }
    },
    created() {
        console.log(this.param.photo)
    }
}
</script>
<style scoped>
.model-header {
    position: relative;
}

.del_modal_con {
    z-index: 1091;
    width: 650px;
}

.model-tips {
    border-bottom: none;
    padding: 15px 10px;
    position: relative;
}

.edit_footer {
    position: absolute;
    width: 640px;
    bottom: 0;
}

.modal {
    z-index: 1090;
}

.client-detailInfo {
    text-align: left;
}

.client-detailInfo label {
    display: inline-block;
}

.textarea {
    resize: none;
    border: 1px solid #ddd;
    width: 100%;
    border-radius: 3px;
}
</style>
