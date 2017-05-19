<template>
	<div>
		<div class="bg"></div>
		<div class='box'>
			<h4 class="title">
				{{param.breedName}}
				<button type="button" class="close" aria-label="Close" @click="close()"><span aria-hidden="true">&times;</span></button>
			</h4>
			<div class="contain">
				<table class='table table-bordered table-hover'>
					<tr>
						<th>客户名称</th>
						<th>订单类型</th>
						<th>订单性质</th>
						<th>成交金额</th>
						<th>成本总价</th>
						<th>待支付</th>
						<th>付款</th>
						<th>币种</th>
						<th>收货人姓名</th>
						<th>收货人手机</th>
						<th>收货地址</th>
						<th>订单来源</th>
						<th>成交时间</th>
					</tr>
					<tbody>
						<tr v-for="item in initBreedOrderDetail">
							<td>{{item.customerName}}</td>
							<td>
								<div v-if="item.type==1&&item.pre==0">{{$t('static.sell')}}</div>
	                            <div v-if="item.type==0&&item.pre==0">{{$t('static.purchase')}}</div>
	                            <div v-if="item.type==1&&item.pre==1">预售</div>
							</td>
							<td v-if="item.mode==1">{{$t('static.together')}}</td>
                            <td v-if="item.mode==2">{{$t('static.three_side')}}</td>
                            <td v-if="item.mode==3">{{$t('static.self_support')}}</td>
							<td>{{item.total}}</td>
							<td>{{item.cost}}</td>
							<td>{{item.unpaid}}</td>
							<td>{{item.prepaid}}</td>
							<td>{{item.currency | Currency}}</td>
							<td>{{item.consignee}}</td>
							<td>{{item.consigneePhone}}</td>
							<td>{{item.consigneeAddr}}</td>
							<td v-if="item.sourceType==0">{{$t('static.new')}}</td>
                            <td v-if="item.sourceType==1">{{$t('static.intention')}}</td>
                            <td v-if="item.sourceType==2">{{$t('static.quote')}}</td>
                            <td v-if="item.sourceType==3">{{$t('static.sample_order')}}</td>
							<td>{{item.tradeTime.substring(0,19)}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	
</template>
<script>
import pagination from '../../pagination'
import filter from '../../../filters/filters'
import {
	initBreedOrderDetail
} from '../../../vuex/getters'
export default{
	components:{},
	props:['param'],
	vuex:{
		getters:{
			initBreedOrderDetail
		},
		actions:{

		}
	},
	methods:{
		close:function(){
			this.param.show = false
		}
	},
	filter: (filter, {}),
}
	
</script>

<style scoped>
.bg{
	width: 100%;
	height: 100%;
	position: absolute;
	opacity: 0.6;
	background: #000;
	z-index:9998;
}
.box{
	width: 1000px;
	height: 600px;
	background: #fff;
	position: absolute;
	z-index: 9999;
	left: 50%;
	margin-left: -500px;
	margin-top: 100px;
	border-radius: 10px;
}
.title{
	padding: 15px 10px;
	border-bottom: 1px solid #ccc;
}
.contain{
	height:540px;
	width: 100%;
	overflow: auto
}
</style>