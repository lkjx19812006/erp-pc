<template>
	<div class="newAdd">
		<h4 class='detail_title'>成交品种</h4>
		<table class="table table-hover table_color table-bordered table-striped ">
			<thead>
				<tr>
					<td style="width: 146px">品种名称</td>
					<td style="width: 148px">成交次数</td>
					<td style="width: 146px">区域</td>
					<td style="width: 148px">时间</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in initDealBreedDetail">
					<td>{{item.breedName}}</td>
					<td>{{item.province}}</td>
					<td>{{item.breedName}}</td>
					<td>{{item.breedName}}</td>
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
import {initDealBreedDetail} from '../../../vuex/getters'
export default{
	components:{
		pagination
	},
	vuex:{
		getters:{
			initDealBreedDetail
		},
		action:{

		}
	},
	props:['param'],
	data(){
		return {
			loadParam:{
				cur:1,
				all:1,
				total:3
			}
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
	bottom: 40px;
	left:10%
}
.detail_title{
    padding-left:20px;
    line-height: 50px;
    background: #fafafa
}
</style>