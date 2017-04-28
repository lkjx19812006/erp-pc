<template>
	<order-data :param="orderData" v-if="orderData.show"></order-data>
	<stock-cart :param="cartData" v-if="cartData.show&&cartData.leng"></stock-cart>
	<breed-search :param='loadParam' v-if='loadParam.show'></breed-search>
	<create-stock :param='createParam' v-if='createParam.show'></create-stock>
	<import-excel :param='importParam' v-if='importParam.show'></import-excel>
	<deletestock-model :param='deleteParam' v-if='deleteParam.show'></deletestock-model>
	<mglist-model>
		<!-- 头部搜索-->
        <div slot="top">
            <div class="clear" style="margin-top:3px;">
                <dl class="clear left transfer">
                    <dt class="left transfer marg_top">药品名称：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.breedName" readonly="readonly" placeholder="按回车键搜索" @keyup.enter="selectSearch()" @click='openBreedSearch()'/>
                    </dd>
                    <dt class="left transfer marg_top" style="margin-left: 20px">仓库地：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.breedName" readonly="readonly" placeholder="按回车键搜索" @keyup.enter="selectSearch()" @click='openBreedSearch()'/>
                    </dd>
                    <dt class="left transfer marg_top" style="margin-left: 20px">库存类型：</dt>
                    <dd class="left margin_right">
                        <input type="text" class="form-control" v-model="loadParam.breedName" readonly="readonly" placeholder="按回车键搜索" @keyup.enter="selectSearch()" @click='openBreedSearch()'/>
                    </dd>
                </dl>
                <dl class="clear left transfer" style="margin-left:20px">
                    <button type="button" class="btn btn-default margin_right" height="24" width="24" @click="selectSearch()">搜索</button>
                    <button type="button" class="btn btn-default" height="24" width="24" @click="resetCondition()">清空条件</button>
                </dl>
               <!--  <dd class="pull-right" style="margin-right:10px">
                   <button type="button" class="btn btn-primary" @click="selectSearch()">刷新</button>
               </dd> -->
                <dd class="pull-right" style="margin-right:200px">
                	<button type='button' class='btn btn-default cartbtn' :class={cartbtnAct:cartData.leng} height="24" width="24" @click="showCartList()">购物车({{cartData.leng}})</button>
                	<!-- 库存模板下载 -->
                	<button type="button" class="btn btn-default" style="margin-right:10px" height="24" width="24" class="new_btn">
                        <a href="http://erp.yaocaimaimai.net/local/template/Resource_template.xlsx">
                            EXCEL库存模板下载
                        </a>
                    </button>
                	<!-- EXCEL导入客户 -->
                    <button type="button" class="btn btn-primary" @click="excelImport()">excel导入社会库存</button>
					<!-- 新建社会库存 -->
                    <button type="button" class="btn btn-default" @click="createStock({
                                            show:true,
                                            flag:0,                                            
                                            breedName:'',
                                            breedId:'',
                                            employeeName:'',
                                            specification:'',
                                            specAttribute:'',
                                            location:'',
                                            depotName:'',
                                            usableNum:'',
                                            unit:'',
                                            canProcess:'',
                                            canDeposite:'',
                                            price:'',
                                            dueDate:'',
                                            comment:'',
                                            key:''
                                            })">{{$t("static.new")}}</button>
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
                        <th style="min-width:150px;text-align: center;">药材名称</th>
                        <th style="min-width:150px;text-align: center;">入库时间</th>
                        <th style="min-width:150px;text-align: center;">规格</th>
                        <th style="min-width:150px;text-align: center;">片型</th>
                        <th style="min-width:150px;text-align: center;">产地</th>
                        <th style="min-width:150px;text-align: center;">库存可用量</th>
                        <th style="min-width:150px;text-align: center;">库存单位</th>
                        <th style="min-width:150px;text-align: center;">仓库名称</th> 
                        <th style="min-width:150px;text-align: center;">库存类型</th>                    
                        <th style="min-width:300px;text-align: center;">操作</th>
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
                        <td>{{item.ctime}}</td>
                        <td>{{item.specAttribute | specFilter_a}}</td>
                        <td>{{item.specAttribute | specFilter_b}}</td>
                        <td>{{item.location}}</td>
                        <td>{{item.usableNum}}</td>
                        <td>{{item.unitId | Unit}}</td>
                        <td>{{item.depotName}}</td>
                        <td>{{item.depotType}}</td>
                       	<td><button class="btn btn-default" @click="addToCart($index,{
                       			breedName:item.breedName,
                       			id:item.id,
                       			specAttribute:item.specAttribute,
                       			location:item.location,
                       			usableNum:item.usableNum,
                       			unitId:item.unitId
                       		})">加入购物车</button>
							<button class="btn btn-default" v-if="item.depotType=='社会库存'" @click="updataStock({
                                            show:true,
                                            flag:1,                                            
                                            breedName:item.breedName,
                                            breedId:item.breedId,
                                            id:item.id,
                                            employeeName:item.employeeName,
                                            specification:item.specAttribute,
                                            specAttribute:item.specAttribute,
                                            location:item.location,
                                            depotName:item.depotName,
                                            usableNum:item.usableNum,
                                            unit:item.unitId,
                                            canProcess:item.canProcess,
                                            canDeposite:item.canDeposite,
                                            price:item.price,
                                            dueDate:item.dueDate,
                                            comment:item.comment,
                                            key:''
                                            })">编辑</button>
							<button class="btn btn-default" v-if="item.depotType=='社会库存'" @click="deleteStock({
											id:item.id,
                                            sub:$index,
                                            show:true,
                                            link:deleteStockInfo
                                            })">删除</button>
                       		</td>
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
import importExcel from '../../components/purchaseOrder/indentExcelImport.vue'
import deletestockModel from '../stock/deleteStockTip'
import breedSearch from '../../components/Intention/breedsearch.vue'
import changeMenu from '../../components/tools/tabs/tabs.js'
import common from '../../common/common'
import pagination from '../pagination'
import orderData from '../stock/orderData'
import stockCart from '../stock/stockCart'
import createStock from '../stock/createNewStock'
import filter from '../../filters/filters'
import {getStockList , importStock, deleteStockInfo} from '../../vuex/actions'
import {initStockList} from '../../vuex/getters'
export default {
	components:{
		mglistModel,
		pagination,
		orderData,
		stockCart,
		breedSearch,
		importExcel,
		createStock,
		deletestockModel
	},
	vuex:{
		actions:{
			getStockList,
			importStock,
			deleteStockInfo
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
				breedId:'',
				cur:1,
				all:1,
				total:'',
				show:false				
			},
			cartData:{
				loading: false,
                show: false,
                //link: '/intention/addSellOrderByOffer',
                callback: this.callback,
                orderStatus:0,
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
				id:'',
                breedName:'',
                specAttribute:'',
                location:'',
                usableNum:'',
                unitId:'',
                callback:this.callback ,
                index:''               
			},
			importParam: {
                loading: false,
                show: false,
                link: this.importStock,
                callback: this.selectSearch,
                success: 0, //上传后，返回码的解析，0/1/2/3，初始/成功/错误（1000）/其他错误
                mFile: "", //excel文件
                result: "" // 导入成功后的返回信息
            },
            deleteParam:{
            	show:false
            },
            createParam:{
            	show:false
            },
			breedSearchParam:{
				show:false
			},
			checked:false
		}
	},
	methods:{
		selectSearch:function(){
			this.getStockList(this.loadParam)
		},
		openBreedSearch:function(){
			this.loadParam.show = true
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
		excelImport:function(){//导入库存
			this.importParam.success = 0;
            this.importParam.mFile = "";
            this.importParam.result = "";
            this.importParam.show = true;
            console.log(this.importStock)
		},
		addToCart:function($index,data){
			this.orderData.show=true;
			this.orderData.breedName = data.breedName;
			this.orderData.id = data.id;
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
		deepCopy:function(source) {  // 深拷贝
			var result={};
			for (var key in source) {
			      result[key] = typeof source[key]==='object'? this.deepCopy(source[key]): source[key];
			} 
			return result; 
		},
		callback:function(){//生成订单后，清空购物车
			this.$store.state.table.stockCartList = [];
			this.cartData.leng=0
		},
		watachStock:function(){ //
			this.$store.state.table.stockCartList = [];
			this.cartData.leng=0
		},
		resetCondition:function(){
			this.loadParam.breedName='';
			this.loadParam.breedId='';
			this.getStockList(this.loadParam)
		},
		createStock:function(data){
			this.createParam = data;
		},
		updataStock:function(data){

			this.createParam = data;
			console.log(data);
		},
		deleteStock:function(data){
			this.deleteParam.show = true
			this.deleteParam = data
		}
	},
	created(){
		this.getStockList(this.loadParam)
		this.watachStock()
	},
	ready() {
        common('tab', 'table_box', 1);
    },
	watch:{
		'$route':"watchStock" //监听路由变化，当离开此页面的时候清空购物车
	},
	events:{
		'addOrderDetail':function(msg){
			console.log(msg)
			this.orderData.priceAndNumber = msg;
			//console.log(this.orderData)
			var product = this.deepCopy(this.orderData); //将每次添加到购物车的数据深拷贝，加到购物车列表里面
			this.$store.state.table.stockCartList.push(product)
			console.log(this.$store.state.table.stockCartList)
			this.cartData.goods = this.$store.state.table.stockCartList
			//console.log(this.$store.state.table.stockCartList.length)
			this.cartData.leng = this.$store.state.table.stockCartList.length
		},
		breed: function(breed) {
			console.log(breed.breedId)
            this.loadParam.breedId = breed.breedId;
            this.loadParam.breedName = breed.breedName;
            this.selectSearch();
        },
        fresh:function(page){
        	this.getStockList(this.loadParam)
        }
	},
	filters:{
		specFilter_a:function(data){
			if(data){
				data = JSON.parse(data)
				for(var key in data){
					return data[key]['规格']
				}
			}
			
		},
		specFilter_b:function(data){
			if(data){
				data = JSON.parse(data)
				for(var key in data){
					return data[key]['片型']
				}
			}
			
		}
	},
	filter: (filter, {})
}
</script>

<style>
.cartbtn{
	background: #ccc;
}

.cartbtnAct{
	background: #fff;
	color:#fa6705
}
.cartbtnAct:hover{
	background: #fa6705;
	color:#fff
}
</style>