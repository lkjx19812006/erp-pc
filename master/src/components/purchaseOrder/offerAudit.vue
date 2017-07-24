<template>
	<div class="modal modal-main fade account-modal"></div>
	<validator name="validation">
		<div class="box">
			<h4 class="title">
				报价审核				
				<button type="button" class="close" aria-label="Close" @click="close()"><span aria-hidden="true">&times;</span></button>
			</h4>
			<textarea cols="70" rows="10" class="form-control" v-model="param.comment" v-validate:comment='{required:true}' placeholder="必填项"></textarea>
			<div style="margin-top:10px;">
				<button class="btn btn-success right" style="margin:0px 10px" @click="handle(2)" :disabled="$validation.invalid">通过</button>
				<button class="btn btn-danger right"  @click="handle(3)" :disabled="$validation.invalid">不通过</button>
				<button class="btn btn-default btn-warning right" style="margin:0px 10px" @click="close()">取消</button>
			</div>
		</div>
	</validator>
</template>

<script>
	import filter from "../../filters/filters"
	import {handleOfferAudit} from "../../vuex/actions"
	export default{
		components:{

		},
		vuex:{
			getters:{},
			actions:{
				handleOfferAudit
			}
		},
		props:['param'],
		data(){
			return {
				

			}
		},
		methods:{
			close:function(){
				this.param.show = false
			},
			handle:function(num){
				this.param.validate = num
				this.handleOfferAudit(this.param)
				this.param.show = false
			}
		},
		filter:(filter,{})
	}
</script>

<style scoped>
	.box{
		width: 500px;
		overflow: hidden;
		background: #fff;
		position: absolute;
		z-index: 1083;
		left: 50%;
		margin-left: -350px;
		margin-top: 100px;
		border-radius: 10px;
		padding:0 10px 20px 10px;
	}
	.title{
		padding: 15px 10px;
		border-bottom: 1px solid #ccc;
		text-align: center;
	}
	.form-control{
		width:100%!important
	}
	.sortNum{
		display: inline-block;
		width:20px;
		height:20px;
		border:1px solid #666;
		text-align: center;
		line-height: 18px;
		border-radius: 50%;
	}
	.modal{
		z-index: 1082!important
	}
</style>