<template>
	<div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
	<div class="container modal_con" v-show="param.show">
        <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
	    <div class="model-header">
	    	<h4>产品信息</h4>
			<div class="trans_service clearfix">
    			<div class="cover_loading">
	                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
	            </div>
	            <div class="col-xs-4">
		            <div class="name_search clearfix" style="border:none">
	                   <select  class="form-control" v-model="loadParam.type" @change="searchProduct()">
	                        <option selected value="">请选择产品类型</option>
	                  	    <option>药材</option>
                            <option>提取物</option>
                            <option>饮片</option>
	                  </select> 
	                </div>
	                <div class="name_search clearfix" style="border:none">
	                   <select  class="form-control" v-model="loadParam.status" @change="searchProduct()">
	                        <option selected value="">请选择产品状态</option>
	                  	    <option value="0">无效</option>
                            <option value="1">可用</option>
	                  </select> 
	                </div>
	            </div>
				<div class="col-xs-8">
	                <div class="name_search clearfix">
	                    <img src="/static/images/search.png" height="24" width="24">
	                    <input type="text" class="search_input" v-model="loadParam.name" placeholder="按产品名称全称搜索" @keyup.enter="searchProduct()">
	                </div>
	            </div>
	            <table class="table table-hover table_head table-striped " v-cloak>
	                <thead>
	                    <tr>
	                    	<th></th>
	                        <th>产品类型</th>
	                        <th>产品名称</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="item in initProductlist">
	                    	<td  @click.stop="">
	                           <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="serviceselected($index,item.id,item.name)" ></label>
	                        </td>
	                        <td>{{item.type}}</td>
	                        <td>{{item.name}}</td>
	                    </tr>
	                </tbody>
	            </table>
			</div>
			<div class="base_pagination">
	            <pagination :combination="loadParam"></pagination>
	        </div>
	    </div>
	</div>
</template>
<script>
import pagination from '../pagination'
import {
    initProductlist
} from '../../vuex/getters'
import {
    getProductList
} from '../../vuex/actions'
export default{
	props:['param'],
	data(){
		return {
			loadParam: {
	            loading: true,
	            show:false,
	            color: '#5dc596',
	            size: '15px',
	            cur: 1,
	            all: 7,
	            link:'/customer/product',
	            name:'',
		        type:'',
		        status:''
            },
			checked:false,
			show:true
		}
	},
	components:{
		pagination
	},
	vuex:{
		getters:{
			initProductlist
		},
		actions:{
			getProductList
		}
	},
	methods:{
		serviceselected:function(sub,id,name){
			this.$store.state.table.basicBaseList.productList[sub].checked=!this.$store.state.table.basicBaseList.productList[sub].checked;
			for(var key in this.initproductList){
				if(key!=sub){
					if(this.$store.state.table.basicBaseList.productList[key].checked==true){
						this.$store.state.table.basicBaseList.productList[key].checked=false;
					}
				}
			}
			this.param.cid= id;
			this.param.customerName = name;
			this.param.show=false;
			this.$dispatch('product',this.param);
		},
		searchProduct: function() {
            this.getProductList(this.loadParam);
        }
	},
    events: {
	    fresh: function(input) {
	        this.loadParam.cur = input;
	        this.getProductList(this.loadParam);
	    }
    },
	created(){
		if("id" in this.param){
            this.loadParam.cid = this.param.id;
        }
		this.getProductList(this.loadParam);
	}
}
</script>
<style scoped>
.modal{
	z-index: 1081;
}
.modal_con{
	z-index: 1082;
}
.change_trans{
	margin-top: 20px;
}
.con_trans{
	margin-top: 40px;
}
.tans_tab{
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #fa6705;
	text-align: left;
}
.tans_tab > .tabs{
	width: 100px;
	display: inline-block;
	font-size:16px;
	text-align: center;
	background-color: #f5f5f5;
	color: #333;
	float: left;
	height: 40px;
	border-bottom: 1px solid #fa6705;
	cursor: pointer;
}
.tans_tab .tabs_active{
	background-color: #fff;
	color: #fa6705;
	border: 1px solid #fa6705;
	border-bottom: 0;
}
.checkbox_unselect{
    background-image: url(/static/images/unselect.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}
.checkbox_select{
    background-image: url(/static/images/selected.png);
    display: inline-block;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
    background-size: 80%;
    margin: auto;
    text-align: center;
    background-position: 5px;
}
.trans_service{
	margin-top: 20px;
}
.trans_service .col-xs-8{
	margin-bottom: 20px;
}
.table{
	margin-bottom: 5px;
}
.table_head>thead>tr{
	background-color: #f5f5f5;
	color: #333;
	font-size: 18px;
}
.base_pagination{
	margin-top: 0;
}
</style>