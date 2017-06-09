<!-- 主管审核、业务员收货确认 -->
<template>
    <custom-dialog :param="customParam" v-if="customParam.show"></custom-dialog>
</template>
<script>
import customDialog from '../tips/customDialog'
import {
    afterSalesFlow
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
                description: "", //原因
                callback: "",
                link: '/order/flow/afterSales/reapply',
                title: "重新申请",
                show: true,
                //操作按钮
                items: [{
                    name: "取消",
                    handle: this.back,
                    style: "btn-warning"
                }, {
                    name: "确定",
                    handle: this.pass,

                }, {
                    name: "退出流程",
                    handle: this.reject,

                }]

            },

        }
    },
    vuex: {
        actions: {
            afterSalesFlow
        }
    },
    methods: {
        //取消
        back: function() {
            this.param.show = false;
        },
        //通过
        pass: function() {
            this.customParam.validate = 2;
            this.customParam.description = this.customParam.comments;
            this.afterSalesFlow(this.customParam);
        },
        //不通过
        reject: function() {
            this.customParam.validate = -2;
            this.customParam.description = this.customParam.comments;
            this.afterSalesFlow(this.customParam);
        },

    },
    created() {
        this.customParam.id = this.param.id;

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
