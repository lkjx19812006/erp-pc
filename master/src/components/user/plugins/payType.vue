<template>
	<Radio-group :model.sync="payType" vertical class="radio_con">
        <Radio value="apple">
            <span>合同签订后，预付<input type="number" max="100" min="0" class="pay_input" />%定金</span>
        </Radio>
        <Radio value="android">
            <span>验收合格后，立即付款</span>
        </Radio>
        <Radio value="windows">
            <span>验收合格后，<input type="number" max="100" min="0" class="pay_input"/>天内付款</span>
        </Radio>
        <Radio value="window">
            <span>其他</span><input type="text" class="pay_input"/>
        </Radio>
    </Radio-group>
</template>

<script>
	export default{
		components:{},
		data(){
			return {
				payType:''
			}
		}
	}
</script>
<style scoped>
	.radio_con{
		width: 100%;
		border:1px solid #ccc;
		border-radius: 5px;
		padding-left: 5px;
	}
	.pay_input{
		border-bottom: 1px solid #ccc;
		color:red;
		text-align: center
	}
</style>