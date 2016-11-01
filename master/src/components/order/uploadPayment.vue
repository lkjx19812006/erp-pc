<template>
    <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
    <div class="container modal_con" v-show="param.show">
        <div class="model-header">
            <h4>上传支付凭证</h4>
            <p class="orange">
                您选择的是线下支付，请在转账备注中填写该订单号，以方便我们对您的转账确认收款！
            </p>
            <div class="editpage-input">
                <label class="editlabel">请上传支付凭证</label>
                <press-image :value.sync="param.image_f" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:30%"></press-image>
               <press-image :value.sync="param.image_s" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:30%"></press-image>
               <press-image :value.sync="param.image_t" :type="type" :param="imageParam" style="float:left;margin-left:15px;width:30%"></press-image>
            </div>
            <div class="edit_footer">
                <button type="button" class="btn btn-close"    @click="param.show = false">再想想</button>
                <button type="button" class="btn btn-orange" @click="param.callback(param),param.show=false">确认支付</button>
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
            imageParam:{
                url:'/crm/api/v1/file/',
                qiniu:false
            },
            type:"image/*"
        } 
    },
    methods:{

    },
    route: {
        activate: function(transition) {
            console.log('hook-example activated!')
            transition.next()
        },
        deactivate: function(transition) {
            console.log('hook-example deactivated!')
            transition.next()
        }
    },
    events: {
        getImageData: function(imageData) {
            console.log('返回信息');
            console.log(imageData);
            console.log(this.param)
            var images = new Array();
            this.param.image=imageData.result.image;
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
.modal_con{
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
.orange{
    color: #fa6705;
    font-size: 15px;
    padding-top: 10px;
    padding-bottom: 30px;
    border-bottom: 1px solid #ddd;
}
.model-tips input{
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
