<template>
    <tips-dialog :param="tipsParam" v-if="tipsParam.show"></tips-dialog>
    <custom-dialog :param="customParam" v-if="customParam.show"></custom-dialog>
</template>
<script>
import customDialog from '../tips/customDialog'
import tipsDialog from '../tips/tipDialog'
import {
    customerTransferBlacklist
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
                customerIds: "",
                supplier: "",
                supplierComments:'',
                callback: "",
                title: "客户提取为供应商",
                show: true,
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
            customerTransferBlacklist
        }
    },
    methods: {
        //取消
        cancel: function() {
            this.param.show = false;
        },
        //确定
        confirm: function() {
            this.customerTransferBlacklist(this.customParam);
        },

    },
    //获取输入的comments
    events: {
        Comment: function(input) {
            this.customParam.supplierComments = input;
            console.log(this.customParam.supplierComments )
        }
    },
    created() {
        this.customParam.customerIds = this.param.customerIds;
        if (this.param.title) {
            this.customParam.title = this.param.title;
        }
        this.customParam.supplier = this.param.supplier;
        this.customParam.link = this.param.link;
        this.customParam.comments = this.param.comments;
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
