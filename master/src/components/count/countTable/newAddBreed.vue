<template>
	<div class="newAdd">
		<h4 class='detail_title'>新增品种</h4>
		<table class="table table-hover table_color table-bordered table-striped ">
			<thead>
				<tr>
					<td style="width: 146px">品种名称</td>					
					<td style="width: 148px">报价次数</td>
					<td style="width: 146px">产地</td>
					<td style="width: 148px">时间</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in initAddBreedDetail">
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
import {initAddBreedDetail} from '../../../vuex/getters'
import {} from '../../../vuex/actions'
export default{
	components:{
		pagination
	},
	vuex:{
		getters:{
			initAddBreedDetail,
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
				total:3,
			}
		}
	},
	created:function(){

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
	bottom: 40px;
	left:10%
}
.detail_title{
    padding-left:20px;
    line-height: 50px;
    background: #fafafa
}
</style>