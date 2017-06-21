<template>
    <Radio-group :model.sync="param.paymentWay" vertical class="radio_con" :style="{width:width}">
        <Radio :value="one" @change="selectPayment('one')">
            <span>合同签订后，预付<input type="number" max="100" min="0" class="pay_input" v-model="bookMoney"/>%定金</span>
            <label v-if="selected=='one'&&bookMoney==''" class="system_danger">请填写预付比例</label>
        </Radio>
        <Radio :value="two" @change="selectPayment('two')">
            <span>验收合格后，立即付款</span>
        </Radio>
        <Radio :value="three" @change="selectPayment('three')">
            <span>验收合格后，<input type="number" max="100" min="0" class="pay_input" v-model="payDay"/>天内付款</span>
            <label v-if="selected=='three'&&payDay==''" class="system_danger">请填写天数</label>
        </Radio>
        <Radio :value="four" @change="selectPayment('four')">
            <span>其他</span>
            <input type="text" class="pay_input" v-model="otherWay" />
            <label v-if="selected=='four'&&otherWay==''" class="system_danger">必填项</label>
        </Radio>
    </Radio-group>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            payType: '',
            bookMoney: '',
            payDay: '',
            otherWay: '',
            selected: 'four'
        }
    },
    props: ['width', 'param'],
    methods: {
        selectPayment: function(selected) {
            this.selected = selected;
        }
    },
    computed: { //改变输入框的值时，payType需要重新选中后值才会变化，所以当输入框发生改变的时候，直接赋值给payType，再返回这个值，使其选中
        one: function() {
            this.param.paymentWay = '合同签订后，预付' + this.bookMoney + '%定金';
            return '合同签订后，预付' + this.bookMoney + '%定金';
        },
        two: function() {
            return '验收合格后，立即付款';
        },
        three: function() {
            this.param.paymentWay = '验收合格后，' + this.payDay + '天内付款';
            return '验收合格后，' + this.payDay + '天内付款';
        },
        four: function() {

            this.param.paymentWay = this.otherWay;
            return this.otherWay;
        }
    }
}
</script>
<style scoped>
.radio_con {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding-left: 5px;
}

.pay_input {
    border-bottom: 1px solid #ccc;
    color: red;
    text-align: center
}
</style>
