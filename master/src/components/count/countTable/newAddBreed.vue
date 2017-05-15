<template>
	<div class="newAdd">
		<h4 class='detail_title'>新增品种</h4>
		<table class="table table-hover table_color table-bordered table-striped ">
			<thead>
				<tr>
					<td style="width: 146px">品种名称</td>
					<td style="width: 148px">品种详情</td>
					<td style="width: 146px">区域</td>
					<td style="width: 148px">时间</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
				</tr>
			</tbody>
		</table>
		<div class="pages">
			<pagination :combination="loadParam" slot="page"></pagination>
		</div>
	</div>
</template>

<script>
import pagination from '../../pagination'
export default{
	components:{
		pagination
	},
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