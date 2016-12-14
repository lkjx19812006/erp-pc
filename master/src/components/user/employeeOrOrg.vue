<template>
  <tree-dialog v-if="treeParam.show" :param="treeParam" ></tree-dialog>
	 <div v-show="param.show"  class="modal modal-main fade account-modal" tabindex="-1" role="dialog"></div>

     <div class="cover_loading">
         <pulse-loader :loading="loadParam.loading||orgParam.loading" :color="color" :size="size"></pulse-loader>
     </div>

	 <div class="container modal_con" v-show="param.show">
       <div @click="param.show = false" class="top-title">
            <span class="glyphicon glyphicon-remove-circle"></span>
        </div>
	    <div class="model-header">
	    	<h4 v-if="param.choice=='选择'">选择业务员/部门</h4>
            <h4 v-else>划转</h4>
	    	<div class="con_list">
	    		<!-- <div class="change_trans">
                    <div class="tans_tab clearfix">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn_shape" v-bind:class="{ 'btn-orange': isA}" @click="employee()">业务员</button>
                                        <button type="button" class="btn btn_shape" v-bind:class="{ 'btn-orange':!isA}" @click="department()">部门</button>
                        <a class="tabs" v-bind:class="{ 'tabs_active': isA&&isB, 'tab1': !isA }" @click="bindCustomer()">绑定客户</a>
                        <a class="tabs" v-bind:class="{ 'tabs_active': isA, 'tab1': isA }"  @click="employee()">业务员</a>
                                        <a class="tabs" v-bind:class="{ 'tabs_active': !isA, 'tab1': isA }"  @click="department()">部门</a>
                
                    </div>
                </div> -->
    			<div class="trans_service clearfix" v-show="currentView==1">
                    <div style="margin:30px 10px 15px 10px" class="clearfix">
                        <div class="input-group col-xs-4 pull-left" @click="treeParam.show=true">
                            <div class="input-group-addon"><img src="/static/images/search.png" height="20" width="20"></div>
                            <input type="text" class="form-control"  placeholder="点击选择部门"   value="{{treeParam.orgName}}">
                            <!--<input type="button" class="form-control" value="根据部门查找" @click="treeParam.show=true"/>-->
                        </div> 
                        <div class="col-xs-1 pull-left"></div>
                        <div class="input-group col-xs-4 pull-left">
                            <div class="input-group-addon"><img src="/static/images/search.png" height="20" width="20"></div>
                            <input type="text" class="form-control" v-model="loadParam.name" placeholder="{{$t('static.enter_salesman')}}" @keyup.enter="employSearch()">

                        </div>
                        <button type="button" class="new_btn" @click="reset()">{{$t('static.clear_all')}}</button>
                        <button type="button" class="new_btn" style="margin-right:10px;" @click="employSearch()">{{$t('static.search')}}</button>
                    </div>
                    <div class="cover_loading">
                        <pulse-loader :loading="loadParam.loading" :color="color" :size="size"></pulse-loader>
                    </div>    
		            <table class="table table-hover table_color table-striped" style="text-align:center" v-cloak>
		                <thead>
		                    <tr>
		                        <th></th>
		                        <th>姓名</th>
		                        <th>部门</th>
		                        <th>手机</th>
		                    </tr>
		                </thead>
		                <tbody>
		                    <tr v-for="item in initEmployeeList"  @click="selectEmployee($index,item)">
		                       <td  @click.stop="">
		                           <label  class="checkbox_unselect" v-bind:class="{'checkbox_unselect':!item.checked,'checkbox_select':item.checked}"  @click="selectEmployee($index,item)"></label>
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
                        <button type="button" class="btn btn-close"  @click="param.show = fasle">取消</button>
                        <button type="button" class="btn btn-orange" @click="confirmEmp()">确定</button>
                    </div>
    			</div>
	    		<!-- <div class="con_trans">
                    <div class="trans_parten" v-show="currentView==2">
                        <div>
                            <treeview :value.sync="id"
                                :model="initOrgList"
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
                </div> -->

	    	</div>
	    </div>
	</div>
</template>
<script>
import pagination from '../pagination'
import treeDialog from '../tips/treeDialog'
import {
    initCustomerlist,
    initEmployeeList,
    initOrgList,
    initLogin
} from '../../vuex/getters'
import {
    getClientList,
    getEmployeeList,
    getOrgList,

} from '../../vuex/actions'
export default{
	components:{
        pagination,
        treeDialog
	},
	props:['param'],
	data(){
		return {
			currentView:1,
			isA:true,
			checked:false,
			customerFlag:0,
            id: undefined, // Binded to component.
			orgParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                cur: 1,
                all: 7,
                total:''
            },
              loadParam: {
                loading: true,
                color: '#5dc596',
                size: '15px',
                mobile:'',
                orgId:this.$store.state.table.login.orgId,
                cur: 1,
                all: 7,
                total:'',
                name:''
              },
              treeParam:{
                show:false,
                callback:this.callback,
                orgId:'',
                orgName:''
              }

		}
	},

	vuex:{
		getters:{
			initCustomerlist,
			initEmployeeList,
			initOrgList,
            initLogin
		},
		actions:{
			getClientList,
			getEmployeeList,
			getOrgList,

		}
	},
	methods:{
        callback:function(){
          console.log(this.treeParam);
          if(this.treeParam.orgId){
            this.loadParam.orgId=this.treeParam.orgId;
            this.loadParam.orgName=this.treeParam.orgName;
            this.employSearch();
          }
        },
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
        reset:function(){
            this.loadParam.name="";
            this.loadParam.orgId="";
            this.treeParam.orgId="";
            this.treeParam.orgName="";
            this.getEmployeeList(this.loadParam);
        },
		department:function(){
			this.currentView=2;
			//this.isA=!this.isA;
			this.isA=false;
		},
		employSearch:function(){
        	/*this.getEmployOrgSearch(this.orgParam);*/
        	this.getEmployeeList(this.loadParam);
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

		selectEmployee:function(id,item){
			this.$store.state.table.basicBaseList.employeeList[id].checked=!this.$store.state.table.basicBaseList.employeeList[id].checked;
			for(var key in this.initEmployeeList){
				if(key!=id){
					if(this.$store.state.table.basicBaseList.employeeList[key].checked==true){
						this.$store.state.table.basicBaseList.employeeList[key].checked=false;
					}
				}
			}
            console.log(item)
            console.log(this.treeParam.orgName)
            this.treeParam.orgName = item.orgName;
            this.loadParam.name = item.name;
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
		/*confirm:function(){
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

		},*/
        confirmEmp:function(){
            console.log('选业务员');
            console.log(this.param);
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
            this.param.callback = this.param.callback;

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
        fresh: function(input) {
            this.loadParam.cur = input;
            this.getEmployeeList(this.loadParam);
            this.checked=false;

        },
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
      //this.getClientList(this.orgParam, this.orgParam.all);
      this.getEmployeeList(this.loadParam);
      this.getOrgList(this.orgParam);
      console.log(this.$store.state.table.login);
    }
}
</script>
<style scoped>
.modal {
	z-index:1085;
}
.modal_con {
    width: 900px;
    z-index: 1085;
}
.top-title{
	width: 900px;
	z-index: 1083;
    position: fixed;
    right: 0;
    left: 0;
    margin:auto;
}
.edit_footer{
	width:900px;
    z-index: 1000;
}
.trans_service{
	margin-top: 10px;
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
.name_search{
    margin-top:30px;
}
.btn_shape{
    width:175px;
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
	font-size:14px;
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
	/* background-color: #f5f5f5; */
	color: #333;
	font-size: 18px;
}

.trans_parten{
    text-align: left;
}
.treeview{
    height:500px;
    border:0px;
}
.table{
    display: table;
}
</style>
