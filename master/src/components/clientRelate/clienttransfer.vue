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
	    		<div class="con_trans"  v-cloak>
	    			<div class="trans_parten" v-show="currentView">
		    			<div class="cover_loading">
			                <pulse-loader :loading="loadParam1.loading" :color="color" :size="size"></pulse-loader>
			            </div>
	    				<table class="table table-hover table_head table-striped">
			                <thead>
			                    <tr>
			                        <th></th>
			                        <th>部门</th>
			                    </tr>
			                </thead>
			                <tbody>
			                    <tr v-for="item in initOrgList">
			                       <td  @click.stop="">
			                            <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="Partselected($index,item.id)" ></label>
			                        </td>
			                        <td>{{item.name}}</td>
			                    </tr>
			                </tbody>
			            </table>
			            <div class="edit_footer">
				    		<button type="button" class="btn btn-close"  @click="param.show = false">取消</button>
				    		<input  type="button" class="btn btn-orange" @click="transferInfo(param,param.show=false)" value="确定"/>
				    	</div>
	    			</div>
	    			<div class="trans_service clearfix" v-show="!currentView">
		    			<div class="cover_loading">
			                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
			            </div>
	    				<div class="col-xs-12">
			                <div class="name_search clearfix">
			                    <img src="/static/images/search.png" height="24" width="24">
			                    <input type="text" class="search_input" v-model="loadParam.name" placeholder="请输入业务员名字" v-on:keyup="employNameSearch(loadParam.name)">
			                </div>
			                 <div class="name_search clearfix">
			                    <img src="/static/images/search.png" height="24" width="24">
			                    <input type="text" class="search_input" v-model="loadParam.mobile" placeholder="请输入业务员手机号"  v-on:keyup="employPhoneSearch(loadParam.mobile)">
			                </div>
			                 <div class="name_search clearfix" style="border:none">
			                    <!-- <img src="/static/images/search.png" height="24" width="24"> -->
			                   <!--  <input type="text" class="search_input" v-model="loadParam.orgId" placeholder="请输入业务员部门" v-on:keyup="employNameSearch(loadParam.orgId)">  -->
			                   <select  class="form-control" v-model="loadParam.orgId" @change="employorgSearch(loadParam.orgId)">
			                        <option selected>请选择业务员部门</option>
			                  	   <option v-for="item in initOrgList" value="{{item.id}}">{{item.name}}</option>
			                  </select> 
			                </div>
			               
			            </div>
			            <table class="table table-hover table_head table-striped " v-cloak>
			                <thead>
			                    <tr>
			                        <th></th>
			                        <th>姓名</th>
			                        <th>部门</th>
			                        <th>手机号</th>
			                    </tr>
			                </thead>
			                <tbody>
			                    <tr v-for="item in initEmployeeList">
			                       <td  @click.stop="">
			                           <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="serviceselected($index,item.id,item.orgId)" ></label>
			                        </td>
			                        <td>{{item.name}}</td>
			                        <td>{{item.orgName}}</td>
			                        <td>{{item.mobile}}</td>
			                    </tr>
			                </tbody>
			            </table>
			             <div class="base_pagination">
				            <pagination :combination="loadParam"></pagination>
				        </div>
				        <div class="edit_footer">
				    		<button type="button" class="btn btn-close"  @click="param.show = false">取消</button>
				    		<input  type="button" class="btn btn-orange" @click="transferEmploy(param,param.show=false)" value="确定"/>
				    	</div>
	    			</div>
	    		</div>
	    	</div>
	    </div>
	</div>
</template>
<script>
import pagination from '../pagination'
import {
    initEmployeeList,
    initOrgList
} from '../../vuex/getters'
import {
    getEmployeeList,
    transferEmploy,
    getEmployNameSearch,
    getEmployOrgSearch,
	getEmployphoneSearch,
    transferInfo,
    getOrgList
} from '../../vuex/actions'
export default{
	props:['param'],
	data(){
		return {
			loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7
            },
            loadParam1:{
            	loading: true,
                color: '#5dc596',
                size: '15px'
            },
			currentView:true,
			isA:true,
			checked:false
		}
	},
	components:{
		pagination
	},
	vuex:{
		getters:{
			initEmployeeList,
			initOrgList
		},
		actions:{
			getEmployeeList,
			transferEmploy,
			getEmployNameSearch,
			getEmployOrgSearch,
			getEmployphoneSearch,
			transferInfo,
			getOrgList
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
		Partselected:function(sub,id){
          this.$store.state.table.basicBaseList.orgList[sub].checked=!this.$store.state.table.basicBaseList.orgList[sub].checked;
           this.param.orgId=id;
           console.log(id)
		},
		serviceselected:function(sub,id,orgId){
			this.$store.state.table.basicBaseList.employeeList[sub].checked=!this.$store.state.table.basicBaseList.employeeList[sub].checked;
			this.param.employeeId=id;
			this.param.orgId=orgId;
		},
		employNameSearch: function(name) {
            this.getEmployNameSearch(this.loadParam, this.loadParam.all);
        },
        employorgSearch:function(orgId){
        	this.getEmployOrgSearch(this.loadParam, this.loadParam.all);
        },
        employPhoneSearch:function(mobile){
        	this.getEmployphoneSearch(this.loadParam, this.loadParam.all);
        }
	},
    events: {
	    fresh: function(input) {
	        this.loadParam.cur = input;
	        this.getEmployeeList(this.loadParam);
	    }
    },
	created(){
		this.getEmployeeList(this.loadParam,this.loadParam.all)
		this.getOrgList(this.loadParam1)
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
	margin-bottom: 50px;
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
.trans_service .col-xs-12{
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
.edit_footer {
    border-top: 1px solid #ddd;
    text-align: right;
    padding: 10px 20px;
    margin-top: 50px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    width: 48%;
    background: #fff;
    margin: auto;
}
</style>