<template>
	<div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
	<div class="container modal_con" v-show="param.show">
        <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
	    <div class="model-header">
	    	<h4>供应商信息</h4>
			<div class="trans_service clearfix">
    			<div class="cover_loading">
	                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
	            </div>
	            <div class="left"  style="margin-left: 14px">
		            <div class="left clearfix" style="border:none">
	                   <select  class="form-control" v-model="loadParam.type" @change="employNameSearch()">
                            <option value="">{{$t('static.please_select')}}</option>
                            <option v-for="item in initUserType" value="{{item.id}}" >{{item.name}}</option>
	                  </select> 
	                </div>
	                <div class="name_search clearfix" style="margin-left: 14px">
	                    <img src="/static/images/search.png" height="24" width="24">
	                    <input type="text" class="search_input" v-model="loadParam.name" placeholder="请输入供应商名字" @keyup.enter="employNameSearch()">
	                </div>
	                <!--  <div class="name_search clearfix">
	                   <img src="/static/images/search.png" height="24" width="24">
	                   <input type="text" class="search_input" v-model="loadParam.phone" placeholder="请输入客户手机号"  @keyup.enter="employNameSearch()">
	                	                </div> -->
	            </div>
	            <table class="table table-hover table_head table-striped " v-cloak>
	                <thead>
	                    <tr>
	                    	<th></th>
	                        <th>类型</th>
	                        <th>名称</th>
	                        <th>电话</th>
	                        <th>分类</th>
	                    </tr>
	                </thead>
	                <tbody>
	                    <tr v-for="item in initCustomerlist">
	                    	<td  @click.stop="">
	                           <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="serviceselected($index,item.id,item.name)" ></label>
	                        </td>
	                        <td>{{item.typeDesc}}</td>
	                        <td>{{item.name}}</td>
	                        <td>{{item.mainPhone}}</td>
	                        <td>{{item.classifyDesc | classify}}</td>
	                    </tr>
	                </tbody>
	            </table>
			</div>
			<div class="order_pagination">
	            <pagination :combination="loadParam"></pagination>
	        </div>
	    </div>
	</div>
</template>
<script>
import pagination from '../pagination'
import {
    initCustomerlist,
    initUserType
} from '../../vuex/getters'
import {
    getClientList,
    getUserTypeList
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
	            link:'/customer/suppliers',
	            name:'',
	            type:''
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
			initCustomerlist,
			initUserType
		},
		actions:{
			getClientList,
			getUserTypeList
		}
	},
	methods:{
		serviceselected:function(sub,id,name){
			this.$store.state.table.basicBaseList.customerList[sub].checked=!this.$store.state.table.basicBaseList.customerList[sub].checked;
			for(var key in this.initCustomerlist){
				if(key!=sub){
					if(this.$store.state.table.basicBaseList.customerList[key].checked==true){
						this.$store.state.table.basicBaseList.customerList[key].checked=false;
					}
				}
			}
			this.param.cid= id;
			this.param.customerName = name;
			this.param.show=false;
			this.$dispatch('supply',this.param);
		},
		employNameSearch: function() {
            this.getClientList(this.loadParam);
        }
	},
    events: {
	    fresh: function(input) {
	        this.loadParam.cur = input;
	        this.getClientList(this.loadParam);
	    }
    },
	created(){
		if("id" in this.param){
            this.loadParam.cid = this.param.id;
        }
		this.getClientList(this.loadParam);
		this.getUserTypeList(this.loadParam)
	}
}
</script>
<style scoped>
.modal{
	z-index: 1085;
}
.modal_con{
	z-index: 1085;
}
.top-title{
	right: 0;
	left: 0;
	width: 800px;
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
.table{
	margin-bottom: 5px;
	display: table;
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