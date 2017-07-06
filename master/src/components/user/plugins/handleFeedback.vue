<template>
    <Modal :visible.sync="param.show" width="500">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>输入回复内容</span>
        </p>
        <div style="text-align:center">
           <textarea class="form-control" rows="8" v-model="param.message"></textarea>
        </div>
        <div slot="footer">
		    <i-button type="warning" @click="param.show=false">取消</i-button>
		    <i-button type="primary" @click.once="confirm()">确认</i-button>
        </div>
    </Modal>
</template>

<script>
	import {handleFeedbackInfo} from '../../../vuex/actions'
	 export default {
        data () {
            return {
                sendData:{}
            }
        },
        vuex:{
        	actions:{
        		handleFeedbackInfo
        	}
        },
        props:['param'],
        methods: {
           confirm:function(){
           		this.handleFeedbackInfo(this.param)
           		
           },
           callback:function(data){
	           	if(data.code == '1c01'){
	           		this.$Modal.success({
	           			content:data.msg,
	           			onOk:() => {
	           				this.param.show = false
	           			}
	           		})
	           	}else{
	           		this.$Modal.error({
	           			content:data.msg,
	           			onOk:() => {
	           				this.param.show = false
	           			}
	           		})
	           	}
	           	this.param.fresh()	
           }
        },
        created(){
        	this.param.callback = this.callback
        }
    }
</script>

<style>
	.ivu-modal-content{
		top:200px!important
	}
</style>