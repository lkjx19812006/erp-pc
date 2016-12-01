<template>
	 <tipsdialog-model :param="tipsParam" v-if="tipsParam.show"></tipsdialog-model>
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
	    				<!-- <table class="table table-hover table_head table-striped">
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
                                                </table> -->
                        <div class="trans_parten" >
                            <treeview :value.sync="id"
                                :model="$store.state.table.basicBaseList.orgList"
                                class="form-control"
                                labelname="name"
                                valuename="id"
                                children="lowerList"
                            ></treeview>
                        </div> 
			            <div class="edit_footer">
				    		<button type="button" class="btn btn-close"  @click="param.show = false">取消</button>
				    		<input  type="button" class="btn btn-orange" @click="orgtransfer(param.show=false)" value="确定"/>
				    	</div>
	    			</div>
	    			<div class="trans_service clearfix" v-show="!currentView">
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
			                    <input type="text" class="search_input" v-model="loadParam.name" placeholder="{{$t('static.enter_salesman')}}" @keyup.enter="employNameSearch()">
			                </div>
			                 <div class="name_search clearfix">
			                    <img src="/static/images/search.png" height="24" width="24">
			                    <input type="text" class="search_input" v-model="loadParam.mobile" placeholder="请输入业务员手机号"  @keyup.enter="employNameSearch()">
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
			                           <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="serviceselected($index,item.id,item.orgid)" ></label>
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
				    		<input  type="button" class="btn btn-orange" @click="transfer(param,param.show=false)" value="确定"/>
				    	</div>
	    			</div>
	    		</div>
	    	</div>
	    </div>
	</div>
</template>
<script>
import pagination from '../pagination'
import tipsdialogModel  from '../tipsDialog'
import {
    initEmployeeList,
    initOrgList
} from '../../vuex/getters'
import {
    getEmployeeList,
    transferEmploy,
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
                all: 7,
                name:'',
                mobile:'',
                orgId:''
            },
            loadParam1:{
            	loading: true,
                color: '#5dc596',
                size: '15px'
            },
			currentView:true,
			isA:true,
			checked:false,
            id: undefined, // Binded to component.
			tipsParam:{
                show:false,
                name:'划转成功'
            },
		}
	},
	components:{
		pagination,
		tipsdialogModel
	},
	vuex:{
		getters:{
			initEmployeeList,
			initOrgList
		},
		actions:{
			getEmployeeList,
			transferEmploy,
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
	          for(var key in this.initOrgList){
				if(key!=sub){
					if(this.$store.state.table.basicBaseList.orgList[key].checked==true){
						this.$store.state.table.basicBaseList.orgList[key].checked=false;
					}
				}
			 }
	          this.param.orgId=id;
		},
		serviceselected:function(sub,id,orgId){
			this.$store.state.table.basicBaseList.employeeList[sub].checked=!this.$store.state.table.basicBaseList.employeeList[sub].checked;
			for(var key in this.initEmployeeList){
				if(key!=sub){
					if(this.$store.state.table.basicBaseList.employeeList[key].checked==true){
						this.$store.state.table.basicBaseList.employeeList[key].checked=false;
					}
				}
			}

			this.param.employeeId=id;
            this.param.employeeName=this.$store.state.table.basicBaseList.employeeList[sub].name;

			this.param.orgId=orgId;
		},
		employNameSearch: function(name) {
            this.getEmployeeList(this.loadParam);
        },
        orgtransfer:function(){   //划转到部门
           console.log(this.param); 
           this.tipsParam.show= true;
           this.transferInfo(this.param);
        },  
        transfer:function(param){    //划转到业务员
           this.tipsParam.show= true;
           this.transferEmploy(param);
        }
	},
    events: {
	    fresh: function(input) {
	        this.loadParam.cur = input;
	        this.getEmployeeList(this.loadParam);
	    },
        treeview_click:function(param){
            console.log(param);
            if(param.children.length==0){
                this.param.orgId = param.value;
            }
      }
    },
	created(){
        this.param.employeeId = '';
        this.param.orgId = '';
        this.param.employeeName = '';
		this.getEmployeeList(this.loadParam);
		this.getOrgList(this.loadParam1)
	}
}
</script>
<style scoped>
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
.trans_parten{
    text-align: left;
}
.treeview{
    height:500px;
    border:0px;
}
th,td{
	width: 200px;
	min-width: 200px;
}
</style>
