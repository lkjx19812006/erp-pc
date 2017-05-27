<template>
    <custom-dialog :param="customParam" v-if="customParam.show"></custom-dialog>
</template>
<script>
import customDialog from '../tips/customDialog'
import {
    orderCancleFlow
} from '../../vuex/actions'
export default {
    props: ['param'],
    components: {
        customDialog
    },
    data() {
        return {
            customParam: {
                id: "",
                validate: "",
                comments: "",
                cancleCauses: "", //取消原因
                callback: "",
                link: '/order/flow/cancel/reapply',
                title: "重新申请取消订单",
                show: true,
                //操作按钮
                items: [{
                    name: "取消",
                    handle: this.back,
                    style: "btn-warning"
                }, {
                    name: "退出流程",
                    handle: this.quit,

                }, {
                    name: "确定",
                    handle: this.confirm,

                }]

            },

        }
    },
    vuex: {
        actions: {
            orderCancleFlow
        }
    },
    methods: {
        //取消
        back: function() {
            this.param.show = false;
        },
        //退出流程
        quit: function() {
            this.customParam.validate = -2;
            this.customParam.cancleCauses = this.customParam.comments;
            this.orderCancleFlow(this.customParam);
        },
        //通过
        confirm: function() {
            this.customParam.validate = 2;
            this.customParam.cancleCauses = this.customParam.comments;
            this.orderCancleFlow(this.customParam);
        }

    },
    created() {
        this.customParam.id = this.param.id;
        this.customParam.taskKey = this.param.taskKey;
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
