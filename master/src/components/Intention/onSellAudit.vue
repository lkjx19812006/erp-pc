<!-- 主管审核、业务员收货确认 -->
<template>
    <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
    <custom-dialog :param="customParam" v-if="customParam.show"></custom-dialog>
</template>
<script>
import tipsdialogModel from '../tipsDialog'
import customDialog from '../tips/customDialog'
import {
    intentionUpAndDown
} from '../../vuex/actions'
export default {
    props: ['param'],
    components: {
        tipsdialogModel,
        customDialog
    },
    data() {
        return {
            customParam: {
                ids: "",
                onSell: "",
                comments: "",
                callback: "",
                title: "",
                show: true,
                //操作按钮
                items: [{
                    name: "取消",
                    handle: this.back,
                    style: "btn-warning"
                }, {
                    name: "通过",
                    handle: this.pass,

                }, {
                    name: "不通过",
                    handle: this.reject,

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
            intentionUpAndDown
        }
    },
    methods: {
        //取消
        back: function() {
            this.param.show = false;
        },
        //通过
        pass: function() {
            if (this.param.flag == 1) { //下架审核通过
                this.customParam.onSell = 4;
            } else { //上架审核通过
                this.customParam.onSell = 2;
            }
            this.customParam.onUnValidateDescription = this.customParam.comments;
            this.intentionUpAndDown(this.customParam);
        },
        //不通过
        reject: function() {
            if (this.param.flag == 1) { //下架审核不通过
                this.customParam.onSell = 2;
            } else { //上架审核不通过
                this.customParam.onSell = -2;
                if (!this.customParam.comments) {
                    this.tipsParam.show = true;
                    this.tipsParam.name = "请填写原因!";
                    return;
                }
            }
            this.customParam.onUnValidateDescription = this.customParam.comments;
            this.intentionUpAndDown(this.customParam);
        },

    },
    created() {
        this.customParam.ids = this.param.ids;
        if (this.param.flag == 1) {
            this.customParam.title = "意向下架审核";
        } else {
            this.customParam.title = "意向上架审核";
        }

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
