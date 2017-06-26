<template>
    <p class="title_info">
        <Icon type="ios-information" class="icon_c" :style="{color:(judge.isPassed==''?'#ff6600':'#00cc66')}"></Icon>当前选择：
        <span v-if="param.paymentWay==''">{{title}}<b style="color:#ff6600">（请选择并确认）</b></span>
        <span v-else>{{param.paymentWay}}
            <b style="color:#ff6600" v-if="judge.isPassed==''">（请点击空白处完成验证）</b>
            <b style="color:#00cc66" v-else>（验证成功）</b>
        </span>
    </p>
    <Radio-group :model.sync="param.paymentWay" vertical class="radio_con" :style="{width:width}">
        <Radio :value="one" @change="selectPayment('one')" @click="choose('one')">
            <span>合同签订后，预付<input type="number" max="100" min="0" class="pay_input" v-model="bookMoney" @change="choose('one')"/>%定金</span>
            <!-- <label v-if="selected=='one'&&bookMoney==''" class="system_danger">请填写预付比例</label> -->
        </Radio>
        <Radio :value="two" @change="selectPayment('two')" @click="choose('two')">
            <span>验收合格后，立即付款</span>
        </Radio>
        <Radio :value="three" @change="selectPayment('three')" @click="choose('three')">
            <span>验收合格后，<input type="number" max="100" min="0" class="pay_input" v-model="payDay" @change="choose('three')"/>天内付款</span>
            <!-- <label v-if="selected=='three'&&payDay==''" class="system_danger">请填写天数</label> -->
        </Radio>
        <Radio :value="four" @change="selectPayment('four')" @click="choose('four')">
            <span>其他</span>
            <input type="text" class="pay_input" v-model="otherWay" @change="choose('four')" />
            <!-- <label v-if="selected=='four'&&otherWay==''" class="system_danger">必填项</label> -->
        </Radio>
    </Radio-group>
    <!-- <input type="text" v-model="judge" v-show="false"/> -->
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
            selected: 'four',
            title:''
        }
    },
    props: ['width', 'param','judge'],
    methods: {
        selectPayment: function(selected) {
            this.selected = selected;
            

        },
        choose:function(selected){

        	if(selected=='one'){
            	this.judge.isPassed = this.bookMoney
            }
            if(selected=='two'){
            	this.judge.isPassed = "1"
            }
            if(selected=='three'){
            	this.judge.isPassed = this.payDay
            }
            if(selected=='four'){
            	this.judge.isPassed = this.otherWay
            }
        }
    },
    computed: { //改变输入框的值时，payType需要重新选中后值才会变化，所以当输入框发生改变的时候，直接赋值给payType，再返回这个值，使其选中
        one: function() {
            this.param.paymentWay = '合同签订后，预付' + this.bookMoney + '%定金';
            //this.judge = this.bookMoney
            //console.log(this.judge)
            return '合同签订后，预付' + this.bookMoney + '%定金';
        },
        two: function() {
        	//this.judge = '1'
            return '验收合格后，立即付款';
        },
        three: function() {
            this.param.paymentWay = '验收合格后,' + this.payDay + '天内付款';
            //this.judge = this.payDay
            return '验收合格后,' + this.payDay + '天内付款';
        },
        four: function() {
            this.param.paymentWay = this.otherWay;
            //this.judge = this.otherWay
            return this.otherWay;
        }
    },
    created(){
        this.title = this.param.paymentWay

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
.title_info{
    color:#464c5b;
    font-weight: bold
}
.icon_c{
    font-size:16px;
    line-height: 16px;
    margin-right: 5px;
}
</style>
