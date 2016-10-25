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
	    				<!-- <a class="tabs" v-bind:class="{ 'tabs_active': isA&&isB, 'tab1': !isA }" @click="bindCustomer()">绑定客户</a> -->
	    				<a class="tabs" v-bind:class="{ 'tabs_active': isA, 'tab1': isA }"  @click="employee()">业务员</a>
	    				<a class="tabs" v-bind:class="{ 'tabs_active': !isA, 'tab1': isA }"  @click="department()">部门</a>
	    			</div>
	    		</div>
    			<div class="trans_service clearfix" v-show="currentView==1">
					<div class="col-xs-4">
						<select  class="form-control" v-model="employeeParam.orgId" @change="employSearch()">
	                        <option selected value="">请选择业务员部门</option>
	                  	    <option v-for="item in initOrgList" value="{{item.id}}">{{item.name}}</option>
	                  	</select>
					</div>

    				<div class="col-xs-8">
		                <div class="name_search clearfix">
		                    <img src="/static/images/search.png" height="24" width="24">
		                    <input type="text" class="search_input" v-model="employeeParam.name" placeholder="请输入业务员名字" @keyup.enter="employSearch()">
		                </div>
		                <div class="name_search clearfix">
		                    <img src="/static/images/search.png" height="24" width="24">
		                    <input type="text" class="search_input" v-model="employeeParam.mobile" placeholder="请输入业务员手机号"  @keyup.enter="employSearch()">
		                </div>


		            </div>
		            <table class="table table-hover table_head table-striped " v-cloak>
		                <thead>
		                    <tr>
		                        <th></th>
		                        <th>姓名</th>
		                        <th>部门</th>
		                        <th>手机<th>
		                    </tr>
		                </thead>
		                <tbody>
		                    <tr v-for="item in initEmployeeList">
		                       <td  @click.stop="">
		                           <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="selectEmployee($index)" ></label>
		                        </td>
		                        <td>{{item.name}}</td>
		                        <td>{{item.orgName}}</td>
		                        <td>{{item.mobile}}</td>
		                    </tr>

		                </tbody>
		            </table>
                    <div class="edit_footer">
                        <button type="button" class="btn btn-close"  @click="param.show = fasle">取消</button>
                        <button type="button" class="btn btn-orange" @click="confirmEmp()">确定</button>
                    </div>
    			</div>
	    		<div class="con_trans">
	    			<div class="trans_parten" v-show="currentView==2">
	    				<!-- <table class="table table-hover table_head table-striped " v-cloak>
                                                    <thead>
                                                        <tr>
                                                            <th></th>
                                                            <th>部门名称</th>
                        
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item in initOrgList">
                                                           <td  @click.stop="">
                                                                <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="selectDepartment($index)" ></label>
                                                            </td>
                                                            <td>{{item.name}}</td>
                        
                                                        </tr>
                                                    </tbody>
                                                </table>  -->
                        <div>
                            <treeview :value.sync="id"
                                :model="$store.state.table.basicBaseList.orgList"
                                class="form-control"
                                labelname="name"
                                valuename="id"
                                children="lowerList"
                            ></treeview>
                        </div> 
                        <div class="edit_footer">
                            <button type="button" class="btn btn-close"  @click="param.show = fasle">取消</button>
                            <button type="button" class="btn btn-orange" @click="confirmOrg()">确定</button>
                        </div>                    
	    			</div>

	    		</div>
                
	    	</div>
	    	
	    </div>
	</div>
</template>
<script>
import {
    initCustomerlist,
    initEmployeeList,
    initOrgList
} from '../../vuex/getters'
import {
    getClientList,
    getEmployeeList,
    getOrgList,

} from '../../vuex/actions'
export default{
	components:{

	},
	props:['param'],
	data(){
		return {
			currentView:1,
			isA:true,
			//isB:true,
			checked:false,
			customerFlag:0,
            id: undefined, // Binded to component.
			loadParam: {
                  loading: true,
                  color: '#5dc596',
                  size: '15px',
                  cur: 1,
                  all: 7
              },

              employeeParam: {
                  loading: true,
                  color: '#5dc596',
                  size: '15px',
                  name:'',
                  mobile:'',
                  orgId:'',
                  cur: 1,
                  all: 7
              },


		}
	},

	vuex:{
		getters:{
			initCustomerlist,
			initEmployeeList,
			initOrgList
		},
		actions:{
			getClientList,
			getEmployeeList,
			getOrgList,

		}
	},
	methods:{
		/*bindCustomer:function(){
			this.currentView=1;
			//this.isA=!this.isA;
			this.isA=true;
			this.isB=true;
		},*/
		employee:function(){
			this.currentView=1;
			//this.isA=!this.isA;
			this.isA=true;
		},
		department:function(){
			this.currentView=2;
			//this.isA=!this.isA;
			this.isA=false;
		},
		employSearch:function(){
        	/*this.getEmployOrgSearch(this.loadParam);*/
        	this.getEmployeeList(this.employeeParam);
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

		selectEmployee:function(id){
			this.$store.state.table.basicBaseList.employeeList[id].checked=!this.$store.state.table.basicBaseList.employeeList[id].checked;
			for(var key in this.initEmployeeList){
				if(key!=id){
					if(this.$store.state.table.basicBaseList.employeeList[key].checked==true){
						this.$store.state.table.basicBaseList.employeeList[key].checked=false;
					}

				}
			}

		},
		selectDepartment:function(id){
			this.$store.state.table.basicBaseList.orgList[id].checked=!this.$store.state.table.basicBaseList.orgList[id].checked;
			for(var key in this.initOrgList){
				if(key!=id){
					if(this.$store.state.table.basicBaseList.orgList[key].checked==true){
						this.$store.state.table.basicBaseList.orgList[key].checked=false;
					}

				}
			}

		},
		confirm:function(){
			this.param.employeeId = '';
			this.param.employeeName = '';
			this.param.orgId = '';
			this.param.orgName = '';

			for(var key in this.initEmployeeList){
				if(this.$store.state.table.basicBaseList.employeeList[key].checked == true){
					this.param.employeeId = this.$store.state.table.basicBaseList.employeeList[key].id;
					this.param.employeeName = this.$store.state.table.basicBaseList.employeeList[key].name;
				}
			}
			for(var key in this.initOrgList){
				if(this.$store.state.table.basicBaseList.orgList[key].checked == true){
					this.param.orgId = this.$store.state.table.basicBaseList.orgList[key].id;
					this.param.orgName = this.$store.state.table.basicBaseList.orgList[key].name;
				}
			}

			this.$dispatch('selectEmpOrOrg', this.param);
			this.param.show = false;

		},
        confirmEmp:function(){
            console.log('选业务员');
            this.param.employeeId = '';
            this.param.employeeName = '';
            this.param.orgId = '';
            this.param.orgName = '';
            for(var key in this.initEmployeeList){
                if(this.$store.state.table.basicBaseList.employeeList[key].checked == true){
                    this.param.employeeId = this.$store.state.table.basicBaseList.employeeList[key].id;
                    this.param.employeeName = this.$store.state.table.basicBaseList.employeeList[key].name;
                    this.param.orgId = this.$store.state.table.basicBaseList.employeeList[key].orgid;
                    this.param.orgName = this.$store.state.table.basicBaseList.employeeList[key].orgName;
                }
            }
            console.log(this.param);
            this.$dispatch('selectEmpOrOrg', this.param);
            this.param.show = false;

        },
        confirmOrg:function(){
            console.log('选部门');
            this.param.employeeId = '';
            this.param.employeeName = '';
            console.log(this.param);
            this.$dispatch('selectEmpOrOrg', this.param);
            this.param.show = false;

        }

	},
    events: {
      treeview_click:function(param){
            console.log(param);
            if(param.children.length==0){
                console.log(param.value);
                console.log(param.label);
                this.param.orgId = param.value;
                this.param.orgName = param.label;
            }
      }
    },
	created() {
      //this.getClientList(this.loadParam, this.loadParam.all);
      this.getEmployeeList(this.employeeParam, this.employeeParam.all);
      this.getOrgList(this.loadParam, this.loadParam.all);

    }
}
</script>
<style scoped>
.modal {
	z-index:1081;
}
.modal_con {
    display: block;
    position: fixed;
    top: 91px;
    margin: auto;
    width: 44%;
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
    z-index: 1082;
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
.tans_tab .tabs_active_1{
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
.edit_footer{
	width:44%;
}
.trans_parten{
    text-align: left;
}
.treeview{
    height:500px;
    border:0px;
}
</style>
