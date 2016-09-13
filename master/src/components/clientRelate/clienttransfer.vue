<template>
	 <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
	 <div class="container modal_con" v-show="param.show">
       <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
	    <div class="model-header">
	    	<h4>划转</h4>
	    	<div class="con_list">
	    		<div class="change_trans">
	    			<div class="tans_tab clearfix">
	    				<a class="tabs tabs_active" v-bind:class="{ 'tabs_active': isA, 'tab1': !isA }" @click="department()">部门</a>
	    				<a class="tabs" v-bind:class="{ 'tabs_active': !isA, 'tab1': isA }"  @click="salesman()">业务员</a>
	    			</div>
	    		</div>
	    		<div class="con_trans">
	    			<div class="trans_parten" v-show="currentView">
	    				<table class="table table-hover table_head table-striped " v-cloak>
			                <thead>
			                    <tr>
			                        <th></th>
			                        <th>姓名</th>
			                        <th>部门</th>
			                    </tr>
			                </thead>
			                <tbody>
			                    <tr>
			                       <td  @click.stop="">
			                            <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!checked,'checkbox_select':checked}"  @click="Partselected()" ></label>
			                        </td>
			                        <td>fffff</td>
			                        <td>fdff</td>
			                    </tr>
			                </tbody>
			            </table>
	    			</div>
	    			<div class="trans_service clearfix" v-show="!currentView">
	    				<div class="col-xs-8">
			                <div class="name_search clearfix">
			                    <img src="/static/images/search.png" height="24" width="24">
			                    <input type="text" class="search_input" placeholder="请输入业务员名字">
			                </div>
			                <div class="name_search clearfix">
			                    <img src="/static/images/search.png" height="24" width="24">
			                    <input type="text" class="search_input" v-model="" placeholder="请输入业务员名字" v-on:keyup="categoryNameSearch()">
			                </div>
			                 <div class="name_search clearfix">
			                    <img src="/static/images/search.png" height="24" width="24">
			                    <input type="text" class="search_input" v-model="" placeholder="请输入业务员名字" v-on:keyup="categoryNameSearch()">
			                </div>
			            </div>
			            <table class="table table-hover table_head table-striped " v-cloak>
			                <thead>
			                    <tr>
			                        <th></th>
			                        <th>姓名</th>
			                        <th>部门</th>
			                    </tr>
			                </thead>
			                <tbody>
			                    <tr v-for="item in initCustomerlist">
			                       <td  @click.stop="">
			                           <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="serviceselected($index)" ></label>
			                        </td>
			                        <td>{{item.name}}</td>
			                        <td>{{item.employee_id}}</td>
			                    </tr>
			                </tbody>
			            </table>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="edit_footer">
	    		<button type="button" class="btn btn-close"  @click="param.show = false">取消</button>
	    		<button type="button" class="btn btn-orange" @click="deleteCompanyStatus(param.id,param.show=false)">确定</button>
	    	</div>
	    </div>
	</div>
</template>
<script>
import {
    initCustomerlist
} from '../../vuex/getters'
import {
    getClientList
} from '../../vuex/actions'
export default{
	props:['param'],
	data(){
		return {
			currentView:true,
			isA:true,
			checked:false
		}
	},
	components:{
		
	},
	vuex:{
		getters:{
			initCustomerlist
		},
		actions:{
			getClientList
		}
	},
	methods:{
		department:function(){
			this.currentView=true;
			this.isA=!this.isA;
		},
		salesman:function(){
			this.currentView=false;
			this.isA=!this.isA;
		},
		Partselected:function(){
			this.checked=!this.checked;
           if(this.checked){
                 this.$store.state.table.basicBaseList.customerList.forEach(function(item){
                    item.checked=true;
             })
           }else{
                this.$store.state.table.basicBaseList.customerList.forEach(function(item){
                    item.checked=false;
             })
           }
		},
		serviceselected:function(id){
			this.$store.state.table.basicBaseList.customerList[id].checked=!this.$store.state.table.basicBaseList.customerList[id].checked;
		}
	}
}
</script>
<style scoped>
.modal {
    opacity: 0.5;
    background-color: #000;
    display: block;
}
.modal_con {
    display: block;
    position: fixed;
    top: 91px;
    margin: auto;
    width: 48%;
    left: 0;
    right: 0;
    min-width: 300px;
    bottom: 50px;
    padding: 0;
    background-color: #fff;
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    z-index: 1080;
    overflow: hidden;
    overflow-y: auto;
}
.con_list{
	position: relative;
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
.trans_service .col-xs-8{
	margin-bottom: 20px;
}
.table_head>thead>tr{
	background-color: #f5f5f5;
	color: #333;
	font-size: 18px;
}
</style>