<template>
	<div>
		<textarea class="form-control inline" :rows="rows" v-model="param.description"></textarea>
		<button class="btn btn-default check" @click="choose()">
			<span v-if="!show">选择</span>
			<span v-else>收起</span>
		</button>
		<div v-if="show">
			<i-select :model.sync="info" style="width:280px;">
		        <i-option v-for="item in markData" :value="item" @click="addInfo(item)">{{ item }}</i-option>
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
				markData:["时间紧","价格合适立即合作","现款无账期","常年需求可合作"],
				info:'',
				show:false
			}
		},
		props:['param','rows'],
		methods:{
			choose:function(){
				this.show = !this.show
			},
			addInfo:function(item){
				this.param.description += item+' '
			}
		}
	}
</script>

<style scoped>
	.inline{
		display: inline-block;

	}
	.check{
		margin-top:-20px;
	}
</style>