<template>
    <div>
        <div v-show="param.show" id="myModal" class="modal modal-main fade account-modal" role="dialog"></div>
        <div class="container modal_con" v-show="param.show">
            <div @click="param.show=false" class="top-title">
                <span class="glyphicon glyphicon-remove-circle"></span>
            </div>
            <div class="edit-content">
                <h3>{{param.titles}}</h3>
            </div>
            <validator name="validation">
                <div class="edit-model">
                    <section class="editsection clearfix" v-cloak>
                        <div class="editpage-input col-md-12" v-if="param.titles=='确认收款'||param.titles=='确认付款'">
                            <label class="editlabel">{{$t('static.pay_no')}} <span class="system_danger" v-if="$validation.prno.required">{{$t('static.required')}}</span></label>
                            <input type="text" class="form-control" v-validate:prno="{required:true}" v-model='param.prNo' value="{{param.prNo}}" />
                        </div>
                        <div class="editpage-input col-md-12" v-if="param.titles=='确认收款'||param.titles=='确认付款'">
                            <label class="editlabel">{{$t('static.comment')}}</label>
                            <textarea v-model='param.description' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5" value="{{param.description}}"></textarea>
                        </div>
                        <div class="editpage-input col-md-12" v-if="param.titles=='审核合同'||param.titles=='售后审核'||param.titles=='确认收货'">
                            <label class="editlabel">{{$t('static.approve_comment')}}</label>
                            <textarea v-model='param.description' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5"></textarea>
                        </div>
                        <div class="editpage-input col-md-12" v-if="param.titles==this.$t('static.review_application')">
                            <label class="editlabel">{{$t('static.approve_comment')}}</label>
                            <textarea v-model='param.comment' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5"></textarea>
                        </div>
                        <div class="editpage-input col-md-12" v-if="param.titles=='售后异议处理'">
                            <label class="editlabel">{{$t('static.objection_handl')}}{{$t('details')}}</label>
                            <textarea v-model='param.description' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5"></textarea>
                        </div>
                        <div class="editpage-input col-md-12" v-if="param.titles=='重新申请审核'">
                            <label class="editlabel">{{$t('static.comment')}}</label>
                            <textarea v-model='param.comment' class="form-control" style="width:100%;overflow:auto;word-break:break-all;resize:none;" rows="5"></textarea>
                        </div>
                        <div class="editpage-input col-md-12" v-if="param.titles!='审核合同'&&param.titles!='重新申请审核'&&param.titles!='售后审核'&&param.titles!='售后异议处理'&&param.titles!=='确认收货'" style="max-height:200px;overflow-y:auto;">
                            <label class="editlabel">{{$t('static.payment')}}</label>
                            <press-image :value.sync="param.image_f" :type.sync="type" :param="imageParam"></press-image>
                        </div>
                    </section>
                </div>
                <div class="edit_footer" v-if="param.titles=='确认收款'||param.titles=='确认付款'">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="reject(param)">{{$t('static.reject')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="agree(param)">{{$t('static.confirm')}}</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.approved')}}</button>
                </div>
                <div class="edit_footer" v-if="param.titles=='审核合同'||param.titles=='售后审核'">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="bargainReject(param)">{{$t('static.reject')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="bargainPass(param)">{{$t('static.confirm')}}</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.approved')}}</button>
                </div>
                <div class="edit_footer" v-if="param.titles=='重新申请审核'">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="cancelContract(param)">{{$t('static.cancel_order')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="referTo(param)">{{$t('static.submit')}}</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.submit')}}</button>
                </div>
                <div class="edit_footer" v-if="param.titles==this.$t('static.confirm_income')||param.titles==this.$t('static.review_application')">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid" @click="param.link(param,param.show=false)">{{$t('static.confirm')}}</button>
                    <button type="button" class="btn  btn-confirm" v-else disabled="true">{{$t('static.confirm')}}</button>
                </div>
                <div class="edit_footer" v-if="param.titles=='售后异议处理'||param.titles=='确认收货'">
                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid&&param.titles=='售后异议处理'" @click="param.link(param,param.show=false)">{{$t('static.objection_handl')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid&&param.titles=='确认收货'" @click="bargainReject(param)">{{$t('static.unqualified')}}</button>
                    <button type="button" class="btn  btn-confirm" v-if="$validation.valid&&param.titles=='确认收货'" @click="bargainPass(param)">{{$t('static.satisfied')}}</button>
                </div>
            </validator>
        </div>
    </div>
</template>
<script>
import pressImage from '../../tools/upload/imagePressMul.vue'
export default {
    components: {
        pressImage
    },
    props: ['param'],
    data() {
        return {
            type: "",
            imageParam: {
                url: '/crm/api/v1/file/',
                qiniu: false
            }
        }
    },
    events: {
        getImageData: function(imageData) {
            var paths = new Array();
            this.param.path = imageData.result.path;
        },
        getFiles: function(files) {
            this.param.images = '';
            for (let i = 0; i < files.length; i++) {
                if (i == 0) {
                    this.param.images = files[0].path;
                } else {
                    this.param.images = this.param.images + "," + files[i].path;
                }
            }
        }
    },
    methods: {
        agree: function(item) {
            this.param.validate = 2;
            this.param.show = false;
            this.param.link(item);
        },
        reject: function(item) {
            this.param.validate = 3;
            this.param.link(item);
            this.param.show = false;
        },
        bargainPass: function() { //审核合同/售后通过
            this.param.show = false;
            this.param.validate = 2;
            console.log(this.param)
            this.param.link(this.param);
        },
        cancelContract: function() { //取消申请
            this.param.show = false;
            this.param.validate = -1;
            console.log(this.param)
            this.param.link(this.param);
        },
        referTo: function() { //重新申请
            this.param.show = false;
            this.param.validate = 1;
            console.log(this.param)
            this.param.link(this.param);
        },
        bargainReject: function() { //审核合同、售后未通过
            this.param.show = false;
            this.param.validate = -2;
            console.log(this.param)
            this.param.link(this.param);
        }
    },
    created() {

    }

}
</script>
<style scoped>
.modal {
    z-index: 1085;
}

.modal_con {
    z-index: 1086;
    width: 600px;
    max-height: 600px;
    overflow-y: auto;
}

.edit_footer {
    position: absolute;
    bottom: 0px;
    width: 600px;
}

.top-title {
    width: 100%;
    position: absolute;
    top: 0;
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
