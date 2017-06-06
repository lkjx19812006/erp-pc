<template>
    <div class="box">
        <div v-show="param.show" class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
        <div class="container del_modal_con" v-show="param.show">
	        <validator name="validation">
	            <div class="model-header">
	                <h4>请输入价格和数量</h4>
	                <div class="model-tips clearfix">
	                    <table class="table table-hover table_color table-striped " v-cloak id="tab">
			                <thead>
			                    <tr>			    
			                        <th style="width: 100px;">药材名称</th>
			                        <th style="width: 100px;">规格/片形</th>
			                        <th style="width: 100px;">产地</th>
			                        <th style="width: 100px;">库存可用量</th>
			                        <th style="width: 100px;">库存单位</th>                   
			                    </tr>
			                </thead>

			                <tbody>
			                    <tr>
			                        <td>{{param.breedName}}</td>
			                        <td>{{param.specAttribute | specFilter}}</td>
			                        <td>{{param.locationName}}</td>
			                        <td>{{param.usableNum}}</td>
			                        <td>{{param.unitId | Unit}}</td>
			                    </tr>
			                </tbody>
			            </table>
	                    <div class="good-num">
	                    	<span class="tip-title">商品数量:</span>
	                    	<input type="number" name="" class="tip-input" v-model="orderDetail.breedNum" v-validate:number="{'required':true,min:0,max:param.usableNum}">
	                    	<p class="error-tip" v-if="$validation.number.required">数量不能为空</p>
	                    	<p class="error-tip" v-if="$validation.number.min">数量不能小于0</p>
	                    	<p class="error-tip" v-if="$validation.number.max">数量不能大于库存数量</p>
	                    </div>
						<div class="good-price">
							<span class="tip-title">销售价格:</span>
	                    	<input type="number" name="" class="tip-input" v-model="orderDetail.breedPrice" v-validate:price="{'required':true,min:0}">
	                    	<p class="error-tip" v-if="$validation.price.required">价格不能为空</p>
	                    	<p class="error-tip" v-if="$validation.price.min">价格不能小于0</p>
						</div>
	                    
	                </div>               
	                <div class="model-footer">
	                    <button type="button" class="btn btn-default btn-close" @click="param.show = false">{{$t('static.cancel')}}</button>
	                    <input type="button" class="btn  btn-confirm" @click="addToCart(),param.show = false" value="{{$t('static.confirm')}}" 
						:disabled="$validation.invalid" 
	                    />
	                </div>
	            </div>
	        </validator>
        </div>
    </div>
</template>
<script>
import filter from "../../filters/filters"
export default {
    props: ['param'],
    data(){
    	return {
    		orderDetail:{
    			breedNum:'',
    			breedPrice:'',
    		}
    	}
    },
    methods:{
        hidden:function(){
            this.param.show = false;
            // this.$parent.param.show =false
        },
        addToCart:function(){
        	this.$dispatch('addOrderDetail',this.orderDetail)
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
	filter:(filter,{})
}
</script>
<style scoped>
.modal {
    opacity: 0.5;
    background-color: #000;
    display: block;
    z-index: 1102;
}
.tip-input{
	border:1px solid #ccc
}
.tip-title{
	font-size:12px;
	text-align: left;
	font-weight: bold
}
.good-num{
	margin-bottom: 30px;height: 50px
}
.good-price{
	height: 50px
}
.error-tip{
	font-size: 12px;
	text-align: right;
	color:#d9534f;
	padding-right:80px
}
.del_modal_con {
    z-index: 1102;
}

.big-font {
    font-size: 36px;
}

.top-title {
    position: absolute;
    right: 0;
    top: 0;
    margin-top: -28px;
    margin-right: -22px;
}

.top-title span {
    font-size: 30px;
    color: #fff;
}

.tips_name {
    color: #fa6705;
    font-size: 20px;
    margin-top: 40px;
    display: inline-block;
    width: 60%;
    white-space: normal;
}
</style>