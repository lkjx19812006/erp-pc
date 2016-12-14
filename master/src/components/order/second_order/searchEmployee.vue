<template>
	<div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>
	<div class="container modal_con" v-show="param.show">
        <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
	    <div class="model-header">
	    	<h4>业务员信息</h4>
			<div class="trans_service clearfix">
    			<div class="cover_loading">
	                <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
	            </div>
	            <div class="col-xs-4">
		            <div class="name_search clearfix" style="border:none">
	                   <select  class="form-control" v-model="loadParam.orgId" @change="employNameSearch()">
	                        <option selected value="">请选择业务员部门</option>
	                  	    <option v-for="item in initOrgList" value="{{item.id}}">{{item.name}}</option>
	                  </select> 
	                </div>
	            </div>
				<div class="col-xs-8">
	                <div class="name_search clearfix">
	                    <img src="/static/images/search.png" height="24" width="24">
	                    <input type="text" class="search_input" v-model="loadParam.name" placeholder="请输入业务员名字" @change="employNameSearch()">
	                </div>
	                 <div class="name_search clearfix">
	                    <img src="/static/images/search.png" height="24" width="24">
	                    <input type="text" class="search_input" v-model="loadParam.mobile" placeholder="请输入业务员手机号"  @change="employNameSearch()">
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
	                    <tr v-for="item in initEmployeeList" @click="serviceselected($index,item.id,item.name)">
	                       <td >
	                           <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"></label>
	                        </td>
	                        <td>{{item.name}}</td>
	                        <td>{{item.orgName}}</td>
	                        <td>{{item.mobile}}</td>
	                    </tr>
	                </tbody>
	            </table>
		        <!-- <div class="edit_footer">
		    		<button type="button" class="btn btn-close"  @click="param.show = false">取消</button>
		    		<input  type="button" class="btn btn-orange" @click="selected(param,param.show=false)" value="确定"/>
		    	</div> -->
			</div>
			<div class="base_pagination">
	            <pagination :combination="loadParam"></pagination>
	        </div>
	    </div>
	</div>
</template>
<script>
import pagination from '../../pagination'
import {
    initEmployeeList,
    initOrgList
} from '../../../vuex/getters'
import {
    getEmployeeList,
    transferInfo,
    getOrgList
} from '../../../vuex/actions'
export default{
	props:['param'],
	data(){
		return {
			loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                name:'',
                mobile:'',
                orgId:this.$store.state.table.login.orgId,
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
			initEmployeeList,
			initOrgList
		},
		actions:{
			getEmployeeList,
			transferInfo,
			getOrgList
		}
	},
	methods:{
		serviceselected:function(sub,id,name){
			this.$store.state.table.basicBaseList.employeeList[sub].checked=!this.$store.state.table.basicBaseList.employeeList[sub].checked;
			for(var key in this.initEmployeeList){
				if(key!=sub){
					if(this.$store.state.table.basicBaseList.employeeList[key].checked==true){
						this.$store.state.table.basicBaseList.employeeList[key].checked=false;
					}
				}
			}
			this.param.employeeId = id;
			this.param.employeeName = name;
			this.param.show=false;
			this.$dispatch('a',this.param);
		},
		employNameSearch: function() {
            this.getEmployeeList(this.loadParam);
        }
	},
    events: {
	    fresh: function(input) {
	        this.loadParam.cur = input;
	        this.getEmployeeList(this.loadParam);
	    }
    },
	created(){
		this.getEmployeeList(this.loadParam);
		this.getOrgList(this.loadParam);
	}
}
</script>
<style scoped>
.modal{
	z-index: 1111;
}
.modal_con{
	z-index: 1111;
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
th,td{
	width: 200px;
	min-width: 200px;
}
</style>