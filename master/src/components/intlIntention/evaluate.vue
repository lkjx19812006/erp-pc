<template>
    <tips-dialog :param="tipsParam" v-if="tipsParam.show"></tips-dialog>
    <custom-dialog :param="customParam" v-if="customParam.show"></custom-dialog>
</template>
<script>
import customDialog from '../tips/customDialog'
import tipsDialog from '../tips/tipDialog'
import {
    evaluateInquire
} from '../../vuex/actions'
export default {
    props: ['param'],
    components: {
        customDialog,
        tipsDialog
    },
    data() {
        return {
            customParam: {
                intentionId:'',
                ids: "",
                comments: "",
                callback: "",
                title: "您的的评价",
                show: true,
                page:"",
                //操作按钮
                items: [{
                    name: "取消",
                    handle: this.cancel,
                    style: "btn-warning"
                }, {
                    name: "确定",
                    handle: this.confirm,
                }]

            },
            tipsParam: {
                show: false,
                name: '',
                alert: true
            },
        }
    },
    vuex: {
        actions: {
        evaluateInquire
        }
    },
    methods: {
        //取消
        cancel: function() {
            this.param.show = false;
        },
        //确定
        confirm: function() {
            this.evaluateInquire(this.customParam);
        },

    },
    events: {
        
    },
    created() {
        this.customParam.ids = this.param.ids;
        this.customParam.page = this.param.page;
        this.customParam.intentionId=this.param.intentionId;
        this.customParam.orderId=this.param.orderId;
        this.customParam.link = this.param.link;
        this.customParam.callback = this.param.callback;
    }

}
</script>
<style scoped>
.del_modal_con {
    z-index: 1083;
}

.modal {
    z-index: 1083;
    opacity: 0.5;
    background-color: #000;
    display: block;
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

.top-title span {
    font-size: 30px;
    color: #fff;
}

.btn {
    margin-left: 10px;
}
</style>
