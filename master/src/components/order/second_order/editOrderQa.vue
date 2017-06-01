<template>
	<div class="bg"></div>
	<div class="box">
		<validator name="validation">
		<h4 class="title">
			{{param.breedName}}			
			<button type="button" class="close" aria-label="Close" @click="close()"><span aria-hidden="true">&times;</span></button>
		</h4>

       <div class="container">
       <div v-if="param.type=='qaStandard'">
	       	<h5 class="s_title">是否通过药典检测？（药典）</h5>
	   		<div class="radio">
			  <label>
			    <input type="radio" name="pharmacopoeia" value="1" v-model="param.qa_standard" :checked="param.qa_standard==1">
			    是
			  </label>
			</div>
			<div class="radio">
			  <label>
			    <input type="radio" name="pharmacopoeia" value="0" v-model="param.qa_standard" :checked="param.qa_standard==0">
			     否
			  </label>
			</div>
       </div>

       <div v-if="param.type=='qaSelf'">
	       	<h5 class="s_title">是否通过厂家检测？（内控）</h5>
	   		<div class="radio">
			  <label>
			    <input type="radio" name="InternalControl" value="1" v-model="param.qa_self" :checked="param.qa_self==1">
			    是
			  </label>
			</div>
			<div class="radio">
			  <label>
			    <input type="radio" name="InternalControl" value="0" v-model="param.qa_self" :checked="param.qa_self==0">
			     否
			  </label>
			</div>
       </div>

       <div v-if="param.sample == 1&&param.type=='sample'">
	       	<h5 class="s_title">样品订单是否转为大货订单？</h5>
	   		<div class="radio">
			  <label>
			    <input type="radio" name="sample" value="1" v-model="param.sample_traded" :checked="param.sample_traded==1">
			    是
			  </label>
			</div>
			<div class="radio">
			  <label>
			    <input type="radio" name="sample" value="0" v-model="param.sample_traded" :checked="param.sample_traded==0">
			     否
			  </label>
			</div>
       </div>
       		
       </div>
		<div>
			<button class="btn btn-default btn-warning right" style="margin:0px 10px" @click="confirm()" :disabled="$validation.invalid">确定</button>
			<button class="btn btn-default btn-warning right"  @click="close()">取消</button>
		</div>
		</validator>
	</div>
</template>

<script>
	import {setQaStandard,setQaSelf,setSampleTraded} from "../../../vuex/actions"
	export default{
		components:{

		},
		vuex:{
			getters:{},
			actions:{
				setQaStandard,
				setQaSelf,
				setSampleTraded
			}
		},
		props:['param'],
		data(){
			return {
				qaInfo:{
					pharmacopoeia:'',
					InternalControl:'',
					sample:'',
				},
				

			}
		},
		methods:{
			close:function(){
				this.param.show = false
			},
			confirm:function(){
				console.log("确认")
				this.param.show = false
				if(this.param.type=='qaStandard'){
					this.setQaStandard(this.param)
				}
				if(this.param.type=='qaSelf'){
					this.setQaSelf(this.param)
				}
				if(this.param.type=='sample'){
					this.setQaStandard(this.param)
				}
			}
		}
	}
</script>

<style scoped>
	.bg{
		width: 100%;
		height:100%;
		position: absolute;
		left: 0;
		top: 0;
		background: #000;
		z-index: 9998;
		opacity: 0.5
	}
	.box{
		width: 500px;
		overflow: hidden;
		background: #fff;
		position: absolute;
		z-index: 9999;
		left: 50%;
		margin-left: -250px;
		margin-top: 100px;
		border-radius: 10px;
		padding-bottom: 20px;
	}
	.title{
		padding: 15px 10px;
		border-bottom: 1px solid #ccc;
	}
	.s_title{
		border-bottom:1px solid #ccc;
		line-height: 30px;
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
</style>