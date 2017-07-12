<template>
    <tips-dialog :param="tipsParam" v-if="tipsParam.show"></tips-dialog>
    <custom-dialog :param="customParam" v-if="customParam.show">
        <span style="float:left;font-size:12px">不采用原因：</span>
        <i-select style="width:200px;float:left">
            <i-option v-for="item in texts" :value="item.text" @click="selectText(item.text,$index)">{{item.text}}</i-option>
        </i-select>
        <i-select style="width:150px;float:left;margin-left:10px" v-if="showSub">
            <i-option v-for="item in texts[textIndex].sub " :value="item.text" @click="selectSub(item.text)">{{ item.text }}</i-option>
        </i-select>
        <div style="margin-top:50px;width:180px;"></div>
    </custom-dialog>
</template>
<script>
import customDialog from '../tips/customDialog'
import tipsDialog from '../tips/tipDialog'
import {
    handleOfferAccept
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
                id: " ",
                accept: " ",
                comments: " ",
                callback: " ",
                title: "处理报价 ",
                show: true,
                //showText: true,
                editType: "replace ", //编辑方式,replace替换，link拼接
                //快速编辑文本
                /*quickText: [{
                    title: "未采用 ",
                    texts: ["检测不合格（样品已到厂） ", "规格不符合（样品已到厂） ", "价格太高 ", "货量不足 ", "样品和大货不是一个批次 ", "虚假信息 ", "临时涨价 ", "规格不符合（货未到厂） ", "供应商付款交货方式未达成一致 "]
                }, {
                    title: "待采用 ",
                    texts: ["外部竞标中 ", "内部比价 ", "资质互换中 ", "等待药厂资金协调 "],
                }],*/
                //操作按钮
                items: [{
                    name: "取消 ",
                    handle: this.acceptCancel,
                    style: "btn-warning "
                }, {
                    name: "采用 ",
                    handle: this.acceptOffer,

                }, {
                    name: "不采用 ",
                    handle: this.refuseOffer,

                }, {
                    name: "待采用 ",
                    handle: this.trackOffer,
                }]

            },


            texts: [{
                text: "样品规格不符合客户要求",
                sub: [{
                    text: "形状不好"
                }, {
                    text: "外观不好"
                }, {
                    text: "产地不符"
                }]
            }, {
                text: "大货规格不符合客户要求",
                sub: [{
                    text: "形状不好"
                }, {
                    text: "外观不好"
                }, {
                    text: "产地不符"
                }]
            }, {
                text: "样品质量不符合客户要求",
                sub: [{
                    text: "含量不够"
                }, {
                    text: "杂质太多"
                }, {
                    text: "水分超标"
                }, {
                    text: "灰分超标"
                }]
            }, {
                text: "大货质量不符合客户要求",
                sub: [{
                    text: "含量不够"
                }, {
                    text: "杂质太多"
                }]
            }, {
                text: "付款方式无法达成一致",
                sub: []
            }, {
                text: "交货方式无法达成一致",
                sub: [{
                    text: "距离太远，客户不愿跨地区采购 "
                }]
            }, {
                text: "价格过高，客户不接受此价格",
                sub: [{
                    text: "报价不符合市场价格 "
                }, {
                    text: "市场跌价导致报价过高 "
                }]
            }, {
                text: "货物数量不够",
                sub: []
            }, {
                text: "货物信息有误，无法核实真伪",
                sub: []
            }, {
                text: "样品与大货不同",
                sub: []
            }, {
                text: "资质不符合客户要求",
                sub: []
            }],
            textIndex: "", //当前选中的文本信息的索引
            showSub: false, //是否展示下一级下拉选择框
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
        selectText: function(text, index) {
            this.showSub = false;
            this.customParam.comments = text;
            this.textIndex = index;
            if (this.texts[index].sub.length > 0) {
                this.showSub = true;
            }
        },
        selectSub: function(text) {
            this.customParam.comments += "；" + text;
        },
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
            if (this.customParam.comments === " ") {
                this.tipsParam.show = true;
                this.tipsParam.name = "请填写不接受原因 ";
                return;
            }
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
