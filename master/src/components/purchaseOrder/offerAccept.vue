<template>
    <tips-dialog :param="tipsParam" v-if="tipsParam.show"></tips-dialog>
    <custom-dialog :param="customParam" v-if="customParam.show">
        <Radio-group :model.sync="accept">
            <Radio value="1">采用</Radio>
            <Radio value="2">不采用</Radio>
            <Radio value="3">待采用</Radio>
        </Radio-group>
        <div style="clear:both" v-if="accept==2">
            <span style="float:left;font-size:12px">不采用原因：</span>
            <i-select style="width:250px;float:left" :model.sync="mainComment">
                <i-option v-for="item in refuseTexts" :value="item.text" @click="selectText(item.text,$index)">{{item.text}}</i-option>
            </i-select>
            <i-select style="width:150px;float:left;margin-left:10px" v-if="showSub" :model.sync="subComment">
                <i-option v-for="item in refuseTexts[textIndex].sub " :value="item.text" @click="selectSub(item.text)">{{item.text}}</i-option>
            </i-select>
        </div>
        <div style="clear:both" v-if="accept==3">
            <span style="float:left;font-size:12px">待采用原因：</span>
            <i-select style="width:250px;float:left" :model.sync="waitComment">
                <i-option v-for="item in waitTexts" :value="item">{{item}}</i-option>
            </i-select>
        </div>
        <div style="margin-top:50px;width:200px;"></div>
        <div style="clear:both" v-if="accept==2&&subComment=='其他'">
            <span style="float:left;font-size:12px">填写原因：</span>
            <input style="float:left;font-size:12px" type="text" v-model="customComment" class="custom_input"/>
            <span style="color:red;font-size:12px">至多填写十个字符！</span>
        </div>
        <div style="clear:both" v-if="accept==3&&waitComment=='其他'">
            <span style="float:left;font-size:12px">填写原因：</span>
            <input style="float:left;font-size:12px" type="text" v-model="customWaitComment" class="custom_input" />
            <span style="color:red;font-size:12px">至多填写十个字符！</span>
        </div>
        <div style="clear:both;margin-top:50px;width:600px;"></div>
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
                hidden: true,
                callback: " ",
                title: "处理报价 ",
                show: true,
                //操作按钮
                items: [{
                    name: "取消 ",
                    handle: this.acceptCancel,
                    style: "btn-warning "
                }, {
                    name: "确定",
                    handle: this.confirm
                }]

            },
            //不采用原因
            refuseTexts: [{
                text: "样品规格不符合要求",
                sub: [{
                    text: "形状不好"
                }, {
                    text: "外观不好"
                }, {
                    text: "产地不符"
                }, {
                    text: "其他"
                }]
            }, {
                text: "大货规格不符合要求",
                sub: [{
                    text: "形状不好"
                }, {
                    text: "外观不好"
                }, {
                    text: "产地不符"
                }, {
                    text: "其他"
                }]
            }, {
                text: "样品质量不符合要求",
                sub: [{
                    text: "含量不够"
                }, {
                    text: "杂质太多"
                }, {
                    text: "水分超标"
                }, {
                    text: "灰分超标"
                }, {
                    text: "其他"
                }]
            }, {
                text: "大货质量不符合要求",
                sub: [{
                    text: "含量不够"
                }, {
                    text: "杂质太多"
                }, {
                    text: "其他"
                }]
            }, {
                text: "付款方式无法达成一致",
                sub: [{
                    text: "其他"
                }]
            }, {
                text: "交货方式无法达成一致",
                sub: [{
                    text: "距离太远，不方便跨地区采购 "
                }, {
                    text: "其他"
                }]
            }, {
                text: "价格过高，不符合市场行情",
                sub: [{
                    text: "报价不符合市场价格 "
                }, {
                    text: "市场跌价导致报价过高 "
                }, {
                    text: "其他"
                }]
            }, {
                text: "货物数量不够",
                sub: [{
                    text: "其他"
                }]
            }, {
                text: "货物信息有误，无法核实真伪",
                sub: [{
                    text: "其他"
                }]
            }, {
                text: "样品与大货不同",
                sub: [{
                    text: "其他"
                }]
            }, {
                text: "资质不符合要求",
                sub: [{
                    text: "其他"
                }]
            }],
            textIndex: "", //当前选中的文本信息的索引
            showSub: false, //是否展示下一级下拉选择框

            mainComment: "", //不采用主要原因
            subComment: "", //不采用次级原因
            customComment: "", //不采用自定义原因
            //待采用原因
            waitTexts: ["外部竞标中", "内部比价中", "已经报价在等结果", "供应商货量不足", "资质互换中", "待买家资金协调", "规格确认中", "价格协商中", "样品寄送中", "待供应商匹配质量要求", "其他"],
            waitComment: "", //待采用原因
            customWaitComment: "", //自定义待采用原因
            tipsParam: {
                show: false,
                name: '',
                alert: true
            },
            accept: 1,
        }
    },
    vuex: {
        actions: {
            handleOfferAccept
        }
    },
    computed: {

    },
    methods: {

        selectText: function(text, index) {
            this.showSub = false;
            //选择主要原因后，次级原因和自定义原因置为空
            this.subComment = "";
            this.customComment = "";
            this.textIndex = index;
            if (this.refuseTexts[index].sub.length > 0) {
                this.showSub = true;
            }
            console.log("dadad");
        },
        selectSub: function(text) {
            //选择次级原因后，自定义原因置为空

            this.customComment = "";
        },
        //取消
        acceptCancel: function() {
            this.param.show = false;
        },
        confirm: function() {
            if (this.accept == 1) {
                this.acceptOffer();
            } else if (this.accept == 2) {
                this.refuseOffer();
            } else if (this.accept == 3) {
                this.trackOffer();
            }
        },
        //接受
        acceptOffer: function() {
            //不需要原因
            this.customParam.comments = "";
            this.customParam.accept = 1;
            this.handleOfferAccept(this.customParam);
        },
        //拒绝
        refuseOffer: function() {
            //一定要有原因，主要原因必选，次要原因必选，当次要原因为“其他”时，自定义原因必填，
            console.log(this.customComment.length)
            if (this.mainComment == "") {
                this.showTips("请选择主要原因！");
                return;
            }
            if (this.subComment == "") {
                this.showTips("请选择次要原因！");
                return;
            }
            if (this.subComment == "其他" && this.customComment == "") {
                this.showTips("请填写自定义原因！");
                return;
            }
            if (this.customComment.length > 10) {
                this.showTips("自定义原因不得超过十个字符！");
                return;
            }
            this.customParam.comments = this.mainComment + "；" + (this.subComment == "其他" ? this.customComment : this.subComment);
            this.customParam.accept = 2;
            this.handleOfferAccept(this.customParam);
        },
        //待采用
        trackOffer: function() {
            console.log(this.customWaitComment.length)
            if (this.waitComment == "") {
                this.showTips("请选择主要原因！");
                return;
            }
            if (this.waitComment == "其他" && this.customWaitComment == "") {
                this.showTips("请填写自定义原因！");
                return;
            }
            if (this.customWaitComment.length > 10) {
                this.showTips("自定义原因不得超过十个字符！");
                return;
            }
            this.customParam.comments = this.waitComment == "其他" ? this.customWaitComment : this.waitComment;
            this.customParam.accept = 3;
            this.handleOfferAccept(this.customParam);
        },
        showTips: function(name) {
            this.tipsParam.show = true;
            this.tipsParam.name = name;
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

.custom_input {
    border-bottom: 1px solid #ccc;
    width: 200px;
    text-align: center
}

.top-title span {
    font-size: 30px;
    color: #fff;
}

.btn {
    margin-left: 10px;
}
</style>
