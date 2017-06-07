<template>
	<div>
		<textarea class="form-control inline" rows="1" v-model="param.quality"></textarea>
		<button class="btn btn-default check" @click="choose()">
			<span v-if="!show">选择</span>
			<span v-else>收起</span>
		</button>
		<div style="margin-top:-20px;" v-if="show">
			<i-select :model.sync="info" style="width:280px;">
		        <i-option v-for="item in qualityData" :value="item" @click="addInfo(item)">{{ item }}</i-option>
		    </i-select>
		    <span class="system_danger">可多选</span>
		</div>			    
	</div>
</template>

<script>
	export default{
		components:{},
		data(){
			return {
				qualityData:["符合药典","硫不超标","无虫蛀","无霉","无变色","无走油","干度好","杂质少","含量够"],
				info:'',
				show:false
			}
		},
		props:['param'],
		methods:{
			choose:function(){
				this.show = !this.show
			},
			addInfo:function(item){
				this.param.quality += item+' '
			}
		}
	}
</script>

<style scoped>
	.inline{
		display: inline-block;
		margin-top:-50px;
	}
	.check{
		margin-bottom: 24px;
	}
</style>