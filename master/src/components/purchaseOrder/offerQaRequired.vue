<template>
	<div>
		<div style="width: 100%;">
			<span v-for="item in qualitydata" class="qa_tags" @click="choose(item)">{{item}}</span>
		</div>
		<textarea class="form-control" rows="5" v-model="param.quality" placeholder="例：黄芪统个货，符合药典、干货、无虫蛀，含量在2.0左右请简明的阐述您产品的质量信息"></textarea>	    
	</div>
</template>

<script>
	export default{
		components:{},
		data(){
			return {

			}
		},
		props:['param','qualitydata'],
		methods:{
			choose:function(item){
				this.param.quality +=item+' '
			}		
		}
	}
</script>

<style scoped>
	.qa_tags{
		line-height: 16px;
		background: #2d8cf0;
		padding: 0 2px;
		border-radius: 2px;
		color:#fff;
		margin:0px 5px 5px 0px;
		display:block;
		white-space: pre-wrap;
		float:left;
		cursor: pointer;
	}
</style>