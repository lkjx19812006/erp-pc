<template>
    <custom-dialog :param="customParam" v-if="customParam.show"></custom-dialog>
</template>
<script>
import customDialog from '../tips/customDialog'
import popup from '../tips/popup'
import {
    handleOfferAccept
} from '../../vuex/actions'
export default {
    props: ['param'],
    components: {
        popup,
        customDialog
    },
    data() {
        return {
            customParam: {
                id: "",
                accept: "",
                comments: "",
                callback: "",
                title: "处理报价",
                show: true,
                showText: true,
                //快速编辑文本
                quickText: [{
                    title: "未采用",
                    texts: ["检测不合格（样品已到厂）", "规格不符合（样品已到厂）", "价格太高", "货量不足", "样品和大货不是一个批次", "虚假信息", "临时涨价", "规格不符合（货未到厂）", "供应商付款交货方式未达成一致"]
                }, {
                    title: "待采用",
                    texts: ["外部竞标中", "内部比价", "资质互换中", "等待药厂资金协调"],
                }],
                //操作按钮
                items: [{
                    name: "取消",
                    handle: this.acceptCancel,
                    style: "btn-warning"
                }, {
                    name: "接受",
                    handle: this.acceptOffer,

                }, {
                    name: "不接受",
                    handle: this.refuseOffer,

                }, {
                    name: "待采用",
                    handle: this.trackOffer,
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
            handleOfferAccept
        }
    },
    methods: {
        //取消
        acceptCancel: function() {
            this.param.show = false;
        },
        //接受
        acceptOffer: function() {
            this.customParam.accept = 1;
            this.handleOfferAccept(this.customParam);
        },
        //拒绝
        refuseOffer: function() {
            this.customParam.accept = 2;
            this.handleOfferAccept(this.customParam);
        },
        //待采用
        trackOffer: function() {
            this.customParam.accept = 3;
            this.handleOfferAccept(this.customParam);
        }
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
