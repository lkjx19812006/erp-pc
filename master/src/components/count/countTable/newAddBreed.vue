<template>
	<div class="newAdd">
		<h4 class='detail_title'>新增品种</h4>
		<table class="table table-hover table_color table-bordered table-striped ">
			<thead>
				<tr>
					<td style="width: 300px">品种名称</td>					
					<td style="width: 300px">报价次数</td>
					<td style="width: 300px">产地</td>
					<td style="width: 300px">时间</td>
				</tr>
			</thead>
			<tbody v-if="param.name=='我的品种统计'">
				<tr v-for="item in initAddBreedDetail">
					<td>{{item.breedName}}</td>
					<td>{{item.offerTotal}}</td>
					<td>{{item.location}}</td>
					<td>{{item.ctime | time}}</td>
				</tr>
			</tbody>
			<tbody v-if="param.name=='部门品种统计'">
				<tr v-for="item in initOrgAddBreedDetail">
					<td>{{item.breedName}}</td>
					<td>{{item.offerTotal}}</td>
					<td>{{item.location}}</td>
					<td>{{item.ctime | time}}</td>
				</tr>
			</tbody>
			<tbody v-if="param.name=='全部品种统计'">
				<tr v-for="item in initAllAddBreedDetail">
					<td>{{item.breedName}}</td>
					<td>{{item.offerTotal}}</td>
					<td>{{item.location}}</td>
					<td>{{item.ctime | time}}</td>
				</tr>
			</tbody>
		</table>
		<div class="pages">
			<pagination :combination="param" slot="page"></pagination>
		</div>
	</div>
</template>

<script>
import pagination from '../../pagination'
import {
	initAddBreedDetail,
	initOrgAddBreedDetail,
	initAllAddBreedDetail
} from '../../../vuex/getters'
import {
	getAddBreedData,
	getOrgAddBreedData,
	getAllAddBreedData
} from '../../../vuex/actions'
export default{
	components:{
		pagination
	},
	vuex:{
		getters:{
			initAddBreedDetail,
			initOrgAddBreedDetail,
			initAllAddBreedDetail
		},
		actions:{
			getAddBreedData,
			getOrgAddBreedData,
			getAllAddBreedData
		}
	},
	props:['param'],
	data(){
		return {
			loadParam:{
				cur:1,
				all:1,
				total:3,
			}
		}
	},
	created:function(){
		
	},
	events:{
		fresh: function(input) {
			if(this.param.name == '我的品种统计'){
				this.param.cur = input;
	            this.getAddBreedData(this.param)
			}
			if(this.param.name == '部门品种统计'){
				this.param.cur = input;
	            this.getOrgAddBreedData(this.param)
			}
			if(this.param.name == '全部品种统计'){
				this.param.cur = input;
	            this.getAllAddBreedData(this.param)
			}
            
        },
	},
	filters:{
		time:function(data){
			return data?data.substring(0,19):data
		}
	}
}
</script>

<style>
.newAdd{
	height: 100%;
	position: relative;
}
.pages{
	position: absolute;
	bottom: 20px;
	left:20%
}
.detail_title{
    padding-left:20px;
    line-height: 50px;
    background: #fafafa
}
</style>