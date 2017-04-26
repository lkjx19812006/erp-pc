<template>
	<order-data :param="orderData" v-if="orderData.show"></order-data>
	<stock-cart :param="cartData" v-if="cartData.show"></stock-cart>
	<mglist-model>
		<!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">药品名称：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.breedName" placeholder="按回车键搜索" @keyup.enter="selectSearch()">
                    </dd>
                </dl>
                <dl class="clear left transfer" style="margin-left:20px">
                    <button type="button" class="btn btn-default margin_right" height="24" width="24" @click="selectSearch()">搜索</button>
                    <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">清空条件</button>
                </dl>
                <dd class="pull-right" style="margin-right:10px">
                    <button type="button" class="btn btn-primary" @click="selectSearch()">刷新</button>
                </dd>
                <dd class="pull-right" style="margin-right:10px">
                	<button type='button' class='btn btn-default margin_right' height="24" width="24" @click="showCartList()">购物车({{cartData.leng}})</button>
                    
                </dd>
            </div>
        </div>
        <!--中间列表-->
        <div slot="form">
            <div class="cover_loading">
                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
            </div>
            <table class="table table-hover table_color table-striped " v-cloak id="tab">
                <thead>
                    <tr>
                        <th></th>
                        <th>药材名称</th>
                        <th>规格/片形</th>
                        <th>产地</th>
                        <th>库存可用量</th>
                        <th>库存单位</th>
                        <th>仓库名称</th> 
                        <th>仓库类型</th>                    
                        <th style="min-width:200px;text-align: center;">操作</th>
                    </tr>
                </thead>
                <tr>
                    <th>
                        <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}" id="client_ids" @click="checkedAll()"></label>
                    </th>
                    <th style="color:#fa6705;font-size: 14px">全选</th>
                    <th colspan="13"></th>
                </tr>
                <tbody>
                    <tr v-for="item in initStockList">
                        <td @click.stop="">
                            <label class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}" @click="onlyselected($index)"></label>
                        </td>
                        <td>{{item.breedName}}</td>
                        <td>{{item.specAttribute | specFilter}}</td>
                        <td>{{item.location}}</td>
                        <td>{{item.usableNum}}</td>
                        <td>{{item.unitId | Unit}}</td>
                        <td>{{item.depotName}}</td>
                        <td>{{item.depotType}}</td>
                       	<td><a @click="addToCart($index,{
                       			breedName:item.breedName,
                       			breedId:item.breedId,
                       			specAttribute:item.specAttribute,
                       			location:item.location,
                       			usableNum:item.usableNum,
                       			unitId:item.unitId
                       		})">加入购物车</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--底部分页-->
        <pagination :combination="loadParam" slot="page"></pagination>
	</mglist-model>
</template>

<script>
import mglistModel from '../mguan/mgListComponent.vue'
import pagination from '../pagination'
import orderData from '../stock/orderData'
import stockCart from '../stock/stockCart'
import filter from '../../filters/filters'
import {getStockList} from '../../vuex/actions'
import {initStockList} from '../../vuex/getters'
export default {
	components:{
		mglistModel,
		pagination,
		orderData,
		stockCart
	},
	vuex:{
		actions:{
			getStockList
		},
		getters:{
			initStockList
		}
	},
	data(){
		return {
			loadParam:{
				loading:false,
				breedName:"",
				cur:3,				
			},
			cartData:{
				loading: false,
                show: false,
                //link: '/intention/addSellOrderByOffer',
                //callback: this.callback,
                customer: '', //客户ID
                customerName: '', //客户名称
                consignee: '', //收货人
                consigneeAddr: '', //收货地址
                consigneePhone: '', //收货人手机
                incidentals: '', //杂费
                incidentalsDesc: '', //杂费说明
                preferential: '', //优惠金额
                preferentialDesc: '', //优惠说明
                province: '',
                city: '',
                district: '',
                goods: [], //用于前端显示
                //intentionOfferList: [] //传入后台，由goods生成
				leng:0
			},
			orderData:{
				show: false,
                breedName:'',
                specAttribute:'',
                location:'',
                usableNum:'',
                unitId:'',
                callback:this.callback ,
                index:''               
			},
			checked:false
		}
	},
	methods:{
		selectSearch:function(){
			this.getStockList(this.loadParam)
		},
		checkedAll:function(){
			this.checked = !this.checked;
			if (this.checked) {
                this.$store.state.table.stockList.forEach(function(item) {
                    item.checked = true;
                })
            } else {
                this.$store.state.table.stockList.forEach(function(item) {
                    item.checked = false;
                })
            }
		},
		onlyselected:function($index){
			let _this = this;
			this.$store.state.table.stockList[$index].checked = !this.$store.state.table.stockList[$index].checked
			if (!this.$store.state.table.stockList[$index].checked) {
                _this.checked = false;
            } else {
                _this.checked = true;
                this.$store.state.table.stockList.forEach(function(item) {
                    if (!item.checked) {
                        _this.checked = false;
                    }
                })
            }
		},
		addToCart:function($index,data){
			this.orderData.show=true;
			this.orderData.breedName = data.breedName;
			this.orderData.breedId = data.breedId;
			this.orderData.specAttribute = data.specAttribute;
			this.orderData.location = data.location;
			this.orderData.usableNum = data.usableNum;
			this.orderData.unitId = data.unitId;
			this.orderData.index = $index;
			console.log(this.$store.state.table.stockCartList)
		},
		showCartList:function(){
			this.cartData.show=true
		},
		deepCopy:function(source) { 
			var result={};
			for (var key in source) {
			      result[key] = typeof source[key]==='object'? this.deepCopy(source[key]): source[key];
			} 
			return result; 
		}
	},
	created(){
		this.getStockList(this.loadParam)
	},
	events:{
		'addOrderDetail':function(msg){
			console.log(msg)
			this.orderData.priceAndNumber = msg;
			//console.log(this.orderData)
			var product = this.deepCopy(this.orderData);
			this.$store.state.table.stockCartList.push(product)
			console.log(this.$store.state.table.stockCartList)
			this.cartData.goods = this.$store.state.table.stockCartList
			//console.log(this.$store.state.table.stockCartList.length)
			this.cartData.leng = this.$store.state.table.stockCartList.length
		}
	},
	filters:{
		specFilter:function(data){
			if(data){
				data = JSON.parse(data)
				for(var key in data){
					return data[key]['规格']+'/'+data[key]['片型']
				}
			}
			
		}
	},
	filter: (filter, {})
}
</script>

<style>
</style>