<template>
	<div class="modal modal-main fade account-modal"></div>
	<div class="box">
		<validator name="validation">
		<h4 class="title">
		设置<span class="text-primary">{{param.breedName}}</span>价格				
			<button type="button" class="close" aria-label="Close" @click="close()"><span aria-hidden="true">&times;</span></button>
		</h4>

        <table class="table table-hover table_color table-striped " v-cloak id="tab">
            <thead>
                <tr>
                	<th style="width: 60px;font-weight: bold">序号</th>			    
                    <th style="width: 200px;font-weight: bold">起订量<span class="text-danger">(库存：{{param.usableNum}})</span></th>
                    <th style="width: 200px;font-weight: bold">价格<span class="text-danger">(单位：元/{{param.unitId | Unit}})</span></th>
                    <th style="width: 40px;font-weight: bold"><button class="btn btn-default"  @click="addPrice()">新增</button></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in param.ladderPrice">
                    <td><span class="sortNum">{{$index+1}}</span></td>
                    <td><input type="number" class="form-control" v-model="item.minNumber" v-validate:number="{'required':true}"/></td>
                    <td><input type="number" class="form-control" v-model="item.ladder" v-validate:price="{'required':true}"/></td>
                    <td><button type="button" class="btn btn-default" @click="deletePrice($index)">删除</button></td>
                </tr>
            </tbody>
        </table>
		<div>
			<button class="btn btn-default btn-warning right" style="margin:0px 10px" @click="setPrice()" :disabled="$validation.invalid||param.ladderPrice.length==0">确定</button>
			<button class="btn btn-default btn-warning right"  @click="close()">取消</button>
		</div>
		</validator>
	</div>
</template>

<script>
	import filter from "../../filters/filters"
	import {setLadderPrice} from "../../vuex/actions"
	export default{
		components:{

		},
		vuex:{
			getters:{},
			actions:{
				setLadderPrice
			}
		},
		props:['param'],
		data(){
			return {
				priceData:{
					firstPrice:{
						price:'',
						num:''
					},
					secondPrice:{
						price:'',
						num:''
					},
					thirdPrice:{
						price:'',
						num:''
					}
				},
				mock:[/*{"ladder":30,"minNumber":200}, {"ladder":25,"minNumber":300}, {"ladder":20,"minNumber":400}*/]

			}
		},
		methods:{
			close:function(){
				this.param.show = false
			},
			setPrice:function(){
				console.log(this.mock)
				this.setLadderPrice(this.param)
				this.param.show = false
				this.$dispatch("freshList")
			},
			addPrice:function(){
				this.param.ladderPrice.push({"ladder":'',"minNumber":''})
			},
			deletePrice:function($index){
				this.param.ladderPrice.splice($index,1)
			}
		},
		filter:(filter,{})
	}
</script>

<style scoped>
	.box{
		width: 500px;
		overflow: hidden;
		background: #fff;
		position: absolute;
		z-index: 9999;
		left: 50%;
		margin-left: -250px;
		margin-top: 100px;
		border-radius: 10px;
		padding-bottom: 20px;
	}
	.title{
		padding: 15px 10px;
		border-bottom: 1px solid #ccc;
	}
	.form-control{
		width:100%!important
	}
	.sortNum{
		display: inline-block;
		width:20px;
		height:20px;
		border:1px solid #666;
		text-align: center;
		line-height: 18px;
		border-radius: 50%;
	}
</style>