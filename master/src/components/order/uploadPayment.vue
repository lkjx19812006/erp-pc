<template>
    <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div class="model-header">
            <h4>{{$t('static.upload_voucher')}}</h4>
            <p class="orange">
                {{$t('static.line_description')}}
            </p>
            <div class="editpage-input">
                <label class="editlabel">{{$t('static.upload_voucher')}}</label>
                <press-image :value.sync="param.image_f" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:20%"></press-image>
                <press-image :value.sync="param.image_s" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:20%"></press-image>
                <press-image :value.sync="param.image_t" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:20%"></press-image>
            </div>
            <div class="edit_footer">
                <button type="button" class="btn btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
                <button type="button" class="btn btn-orange" @click="param.callback(param),param.callback = param.callback,param.show=false">{{$t('static.confirm_payment')}}</button>
            </div>
        </div>
    </div>
</template>
<script>
import pressImage from '../imagePress'
export default {
    components: {
        pressImage
    },
    props: ['param'],
    data() {
        return {
            imageParam: {
                url: '/crm/api/v1/file/',
                qiniu: false
            },
            type: "",
        }
    },
    methods: {

    },
    events: {
        getImageData: function(imageData) {
            console.log('返回信息');
            console.log(imageData);
            console.log(this.param)
            var images = new Array();
            this.param.image = imageData.result.image;
        }
    }
}
</script>
<style scoped>
.modal {
    opacity: 0.5;
    background-color: #000;
    display: block;
    z-index: 1115;
}

.modal_con {
    z-index: 1116;
}

.big-font {
    font-size: 36px;
}

.top-title {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: -28px;
    margin-right: -22px;
}

.orange {
    color: #fa6705;
    font-size: 15px;
    padding: 10px 15px 30px;
    border-bottom: 1px solid #ddd;
    white-space: normal;
}

.model-tips input {
    border: 1px solid #ddd;
    width: 80%;
    border-radius: 5px;
    font-size: 18px;
    text-align: center;
}

.top-title span {
    font-size: 30px;
    color: #fff;
}

.editpage-input {
    margin-top: 15px;
}

.editlabel {
    color: #333;
    font-size: 14px;
    display: block;
    text-align: left;
    text-indent: 15px;
}
</style>
